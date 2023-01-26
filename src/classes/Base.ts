import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { Options } from '../types/options';
import { formatUrlParams } from '../utils';

export default class Base {
  protected axios: AxiosInstance;

  constructor(accessToken: string) {
    this.axios = axios.create({
      baseURL: 'https://osu.ppy.sh/api/v2/',
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Accept-encoding': '*'
      }
    });
  }

  protected async fetch<T>(
    endPoint: string,
    method: 'POST' | 'GET',
    options?: Options
  ): Promise<T> {
    let resp: AxiosResponse;

    if (options?.query) {
      let query: string = formatUrlParams(options.query);
      endPoint += query.replace('&', '?');
    }

    if (method === 'GET') {
      resp = await this.axios.get(endPoint);
    } else {
      resp = await this.axios.post(endPoint, options?.body);
    }

    let data: T = resp.data;
    return data;
  }
}
