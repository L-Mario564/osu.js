import axios, { AxiosResponse } from 'axios';
import { z } from 'zod';
import { formatUrlParams } from '../../utils';

export default class Base {
  protected apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = z.string().parse(apiKey);
  }

  protected async fetch<T>(endpoint: string, urlParams: Record<string, unknown>): Promise<T> {
    let params: string = formatUrlParams(urlParams);
    let url: string = `https://osu.ppy.sh/api/${endpoint}?k=${this.apiKey}${params}`;

    let resp: AxiosResponse = await axios.get(url, {
      headers: {
        'Accept-encoding': '*'
      }
    });
    let data: T = resp.data;

    return data;
  }
}
