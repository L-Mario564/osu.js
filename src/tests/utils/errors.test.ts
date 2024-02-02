import { OsuJSGeneralError, OsuJSUnexpectedResponse, isOsuJSError } from '../..';
import { describe, expect, it } from 'vitest';

describe('Test error handling', () => {
  it('Throws an "invalid_json_syntax" error', () => {
    let caughtErr: OsuJSGeneralError | undefined;

    try {
      throw new OsuJSGeneralError('invalid_json_syntax', 'An error occurred while trying to parse the response as JSON');
    } catch(err) {
      if (isOsuJSError(err) && err.type !== 'unexpected_response') {
        caughtErr = err;
      }
    }

    expect(caughtErr?.type).toBe('invalid_json_syntax');
  });

  it('Throws an "network_error" error', () => {
    let caughtErr: OsuJSGeneralError | undefined;

    try {
      throw new OsuJSGeneralError('network_error', 'A network error occurred while trying to request the API');
    } catch(err) {
      if (isOsuJSError(err) && err.type !== 'unexpected_response') {
        caughtErr = err;
      }
    }

    expect(caughtErr?.type).toBe('network_error');
  });

  it('Throws an "network_error" error', () => {
    let caughtErr: OsuJSUnexpectedResponse | undefined;
    let resp: Response | undefined;

    try {
      const resp = new Response('Test', {
        status: 404,
        statusText: 'Not Found'
      });

      throw new OsuJSUnexpectedResponse('Received an unexpected response from the API', resp);
    } catch(err) {
      if (isOsuJSError(err) && err.type === 'unexpected_response') {
        caughtErr = err;
        resp = err.response();
      }
    }

    expect([caughtErr?.type, resp?.status]).toStrictEqual(['unexpected_response', 404]);
  });
});
