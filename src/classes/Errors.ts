import type { Response as PolyfillResponse } from 'node-fetch';

export const isOsuJSErrorSymbol = Symbol.for('osu.js:OsuJSError');

const errorMessageMap = {
  invalid_json_syntax:
    'A syntax error occurred while trying to parse the response as JSON. The API returned invalid JSON',
  network_error: 'A network error occurred while making a request to the API',
  undefined_fetch:
    'Global fetch is undefined. Please provide a polyfill for the fetch API by installing "node-fetch"',
  unexpected_response: 'Received an unexpected response from the API'
} as const;

/**
 * Documentation: {@link https://osujs.mario564.com/extras/error-handling}
 */
export class OsuJSGeneralError extends Error {
  public readonly _ = {
    [isOsuJSErrorSymbol]: true
  };
  public type: 'invalid_json_syntax' | 'network_error' | 'undefined_fetch';

  constructor(type: 'invalid_json_syntax' | 'network_error' | 'undefined_fetch') {
    super(errorMessageMap[type]);
    this.type = type;
  }
}

/**
 * Documentation: {@link https://osujs.mario564.com/extras/error-handling}
 */
export class OsuJSUnexpectedResponseError extends Error {
  public readonly _ = {
    [isOsuJSErrorSymbol]: true
  };
  public type = 'unexpected_response' as const;
  private response1: Response | PolyfillResponse;

  constructor(response: Response | PolyfillResponse) {
    super(errorMessageMap.unexpected_response);
    this.response1 = response;
  }

  public response<
    T extends boolean | undefined = undefined
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
  >(polyfill?: T): T extends true ? PolyfillResponse : Response {
    return this.response1 as any;
  }
}
