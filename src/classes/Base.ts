import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { z } from 'zod';
import { Options } from '../types/options';
import { formatUrlParams } from '../utils';

export default class Base {
  protected axios: AxiosInstance;

  constructor(accessToken: string) {
    this.axios = axios.create({
      baseURL: 'https://osu.ppy.sh/api/v2/',
      headers: {
        'Authorization': `Bearer ${z.string().parse(accessToken)}`,
        'Accept-encoding': '*'
      }
    });
  }

  protected async fetch<T>(
    endpoint: string,
    method: 'POST' | 'GET',
    options?: Options
  ): Promise<T> {
    let resp: AxiosResponse;

    if (options?.query) {
      let query: string = formatUrlParams(options.query);
      endpoint += query.replace('&', '?');
    }

    if (method === 'GET') {
      resp = await this.axios.get(endpoint);
    } else {
      resp = await this.axios.post(endpoint, options?.body);
    }

    let data: T = resp.data;
    return data;
  }
}
