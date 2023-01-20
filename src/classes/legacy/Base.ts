import axios, { AxiosResponse } from 'axios';
import { z } from 'zod';

export default class Base {
  protected apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = z.string().parse(apiKey);
  }

  protected async fetch<T>(endPoint: string, urlParams: Record<string, unknown>): Promise<T> {
    let params: string = Object.entries(urlParams).reduce(
      (prev: string, [key, value]: [string, unknown]) => {
        return !value ? prev : `${prev}&${key}=${value}`;
      },
      ''
    );

    let url: string = `https://osu.ppy.sh/api/${endPoint}?k=${this.apiKey}${params}`;

    let resp: AxiosResponse = await axios.get(url, {
      headers: {
        'Accept-encoding': '*'
      }
    });
    let data: T = resp.data;

    return data;
  }
}
