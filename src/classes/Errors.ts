import type { Response as PolyfillResponse } from 'node-fetch';

export const isOsuJSErrorSymbol = Symbol.for('osu.js:OsuJSError');

export class OsuJSGeneralError extends Error {
  public readonly _ = {
    [isOsuJSErrorSymbol]: true
  };
  public type: 'invalid_json_syntax' | 'network_error';

  constructor(type: 'invalid_json_syntax' | 'network_error', message: string) {
    super(message);
    this.type = type;
  }
}

export class OsuJSUnexpectedResponse extends Error {
  public readonly _ = {
    [isOsuJSErrorSymbol]: true
  };
  public type = 'unexpected_response' as const;
  private response1: Response | PolyfillResponse;

  constructor(message: string, response: Response | PolyfillResponse) {
    super(message);
    this.response1 = response;
  }

  public response<
    T extends boolean | undefined = undefined
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  >(polyfill?: T): T extends true ? PolyfillResponse : Response {
    return this.response1 as any;
  }
}
