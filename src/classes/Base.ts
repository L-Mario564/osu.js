import { z } from 'zod';
import { formatUrlParams } from '../utils';
import type polyfillFetch from 'node-fetch';
import type { Options } from '../types/options';

export default class Base {
  protected accessToken: string;
  private fetch: typeof fetch | typeof polyfillFetch;

  constructor(accessToken: string, options?: {
    polyfillFetch?: typeof fetch | typeof polyfillFetch;
  }) {
    if (typeof fetch === 'undefined' && !options?.polyfillFetch) {
      // TODO: Throw error
    }

    this.accessToken = accessToken;
    this.fetch = options?.polyfillFetch || fetch;
  }

  protected async request<T>(
    endpoint: string,
    method: 'POST' | 'GET' | 'PATCH' | 'DELETE',
    options?: Options & {
      returnUndefinedOn404?: boolean;
    }
  ): Promise<T> {
    if (options?.query) {
      let query = formatUrlParams(options.query);
      endpoint += query.replace('&', '?');
    }

    // TODO: Better error handling
    let resp = await this.fetch(`https://osu.ppy.sh/api/v2/${endpoint}`, {
      method,
      body: options?.body ? JSON.stringify(options.body) : undefined,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${z.string().parse(this.accessToken)}`
      }
    });

    if (resp.status === 404 && options?.returnUndefinedOn404) {
      return undefined as T;
    }

    let data = await resp.json() as T;
    return data;
  }
}
