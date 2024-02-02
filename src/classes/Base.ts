import { formatUrlParams } from '../utils';
import type polyfillFetch from 'node-fetch';
import type { Options } from '../types/options';

export default class Base {
  protected accessToken: string;
  private fetch: typeof fetch | typeof polyfillFetch;

  constructor(accessToken: string, options?: {
    polyfillFetch?: typeof polyfillFetch;
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
      returnNullOn404?: boolean;
    }
  ): Promise<T> {
    if (options?.query) {
      const query = formatUrlParams(options.query);
      endpoint += query.replace('&', '?');
    }

    // TODO: Better error handling
    const resp = await this.fetch(`https://osu.ppy.sh/api/v2/${endpoint}`, {
      method,
      body: options?.body ? JSON.stringify(options.body) : undefined,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.accessToken}`
      }
    });

    if (resp.status === 404 && options?.returnNullOn404) {
      return null as T;
    }

    const data = await resp.json() as T;
    return data;
  }
}
