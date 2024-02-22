import { formatUrlParams } from '../utils';
import { OsuJSGeneralError, OsuJSUnexpectedResponseError } from './Errors';
import { isOsuJSError } from '../utils/exported';
import type polyfillFetch from 'node-fetch';
import type { Response as PolyfillResponse } from 'node-fetch';
import type { Options } from '../types/options';
import type { SafeParse } from '../types';

export default class Base<
  TPolyfillFetch extends typeof polyfillFetch | undefined = undefined
> {
  protected accessToken: string;
  private fetch: typeof fetch | typeof polyfillFetch;
  private usingPolyfillFetch: boolean;

  constructor(
    accessToken: string,
    options?: {
      polyfillFetch?: TPolyfillFetch;
    }
  ) {
    if (typeof fetch === 'undefined' && !options?.polyfillFetch) {
      throw new OsuJSGeneralError('undefined_fetch');
    }

    this.accessToken = accessToken;
    this.fetch = options?.polyfillFetch || fetch;
    this.usingPolyfillFetch = !!options?.polyfillFetch;
  }

  protected async request<T>(
    endpoint: string,
    method: 'POST' | 'GET' | 'PATCH' | 'DELETE',
    options?: Options & {
      returnNullOn404?: boolean;
      dontParseResp?: boolean;
    }
  ): Promise<T> {
    if (options?.query) {
      const query = formatUrlParams(options.query);
      endpoint += query.replace('&', '?');
    }

    let resp!: Response | PolyfillResponse;

    try {
      resp = await this.fetch(`https://osu.ppy.sh/api/v2/${endpoint}`, {
        method,
        body: options?.body ? JSON.stringify(options.body) : undefined,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${this.accessToken}`
        }
      });
    } catch (err) {
      if (err instanceof TypeError) {
        throw new OsuJSGeneralError('network_error');
      }
    }

    if (resp.status === 404 && options?.returnNullOn404) {
      return null as T;
    }

    if (!resp.ok) {
      throw new OsuJSUnexpectedResponseError(resp);
    }

    if (options?.dontParseResp) {
      return undefined as T;
    }

    let data: T | undefined;

    try {
      data = (await resp.json()) as T;
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new OsuJSGeneralError('invalid_json_syntax');
      }
    }

    return data as T;
  }

  /**
   * Prevents a request done to the current API to throw an `OsuJSUnexpectedResponseError` error.
   *
   * Documentation: {@link https://osujs.mario564.com/current/safe-parse}
   */
  public async safeParse<T extends Promise<any>>(request: T): Promise<
    SafeParse<
      Awaited<T>,
      TPolyfillFetch extends typeof polyfillFetch ? true : false
    >
  > {
    let response!: PolyfillResponse | Response;
    let data!: Awaited<T>;
    let success = false;

    try {
      data = await request;
      success = true;
    } catch (err) {
      if (isOsuJSError(err) && err.type === 'unexpected_response') {
        response = err.response(this.usingPolyfillFetch);
      } else {
        throw err;
      }
    }

    return {
      success,
      response,
      data
    } as any;
  }
}
