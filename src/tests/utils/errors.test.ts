import { OsuJSGeneralError, OsuJSUnexpectedResponseError, isOsuJSError } from '../..';
import { describe, expect, it } from 'vitest';

describe('Test error handling', () => {
  it('Throws an "invalid_json_syntax" error', () => {
    let caughtErr: OsuJSGeneralError | undefined;

    try {
      throw new OsuJSGeneralError('invalid_json_syntax');
    } catch (err) {
      if (isOsuJSError(err) && err.type !== 'unexpected_response') {
        caughtErr = err;
      }
    }

    expect(caughtErr?.type).toBe('invalid_json_syntax');
  });

  it('Throws an "network_error" error', () => {
    let caughtErr: OsuJSGeneralError | undefined;

    try {
      throw new OsuJSGeneralError('network_error');
    } catch (err) {
      if (isOsuJSError(err) && err.type !== 'unexpected_response') {
        caughtErr = err;
      }
    }

    expect(caughtErr?.type).toBe('network_error');
  });

  it('Throws an "undefined_fetch" error', () => {
    let caughtErr: OsuJSGeneralError | undefined;

    try {
      throw new OsuJSGeneralError('undefined_fetch');
    } catch (err) {
      if (isOsuJSError(err) && err.type !== 'unexpected_response') {
        caughtErr = err;
      }
    }

    expect(caughtErr?.type).toBe('undefined_fetch');
  });

  it('Throws an "unexpected_response" error', () => {
    let caughtErr: OsuJSUnexpectedResponseError | undefined;
    let resp: Response | undefined;

    try {
      const resp = new Response('Test', {
        status: 404,
        statusText: 'Not Found'
      });

      throw new OsuJSUnexpectedResponseError(resp);
    } catch (err) {
      if (isOsuJSError(err) && err.type === 'unexpected_response') {
        caughtErr = err;
        resp = err.response();
      }
    }

    expect([caughtErr?.type, resp?.status]).toStrictEqual(['unexpected_response', 404]);
  });
});
