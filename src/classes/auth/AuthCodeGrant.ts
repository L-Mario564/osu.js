import Base from './Base';
import { OsuJSGeneralError, OsuJSUnexpectedResponseError } from '../Errors';
import type polyfillFetch from 'node-fetch';
import type { Response as PolyfillResponse } from 'node-fetch';
import type { Scope, Token } from '../../types';

/**
 * Class that handles auth code grant flow related actions
 *
 * Documentation: {@link https://osujs.mario564.com/oauth/authorization-code-grant}
 */
export default class AuthCodeGrant extends Base {
  private scopes: Scope[];

  /**
   * @param clientId OAuth client ID
   * @param clientSecret OAuth client secret
   * @param redirectUri OAuth redirect URI
   * @param scopes An array of OAuth scopes
   * @param options.polyfillFetch In case developing with a Node.js version prior to 18, you need to pass a polyfill for the fetch API. Install `node-fetch`
   */
  constructor(
    clientId: number,
    clientSecret: string,
    redirectUri: string,
    scopes: Scope[],
    options?: {
      polyfillFetch?: typeof polyfillFetch;
    }
  ) {
    super(clientId, clientSecret, redirectUri, options);
    this.scopes = scopes;
  }

  /**
   * Gets a token
   *
   * Documentation: {@link https://osujs.mario564.com/oauth/authorization-code-grant}
   * @param code The string received after a user authorizes the app
   * @returns An API token
   */
  public async requestToken(code: string): Promise<Token> {
    let resp: Response | PolyfillResponse = new Response();

    try {
      resp = await this.fetch(`${this.oauthUrl}token`, {
        method: 'POST',
        body: JSON.stringify({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code,
          grant_type: 'authorization_code',
          redirect_uri: this.redirectUri
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      if (err instanceof TypeError) {
        throw new OsuJSGeneralError('network_error');
      }
    }

    if (!resp.ok) {
      throw new OsuJSUnexpectedResponseError(resp);
    }

    let token: Token | undefined;

    try {
      token = (await resp.json()) as Token;
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new OsuJSGeneralError('invalid_json_syntax');
      }
    }

    return token as Token;
  }

  /**
   * Refreshes a token
   *
   * Documentation: {@link https://osujs.mario564.com/oauth/authorization-code-grant}
   * @param refreshToken The token used to refresh
   * @returns An API token
   */
  public async refreshToken(refreshToken: string): Promise<Token> {
    let resp: Response | PolyfillResponse = new Response();

    try {
      resp = await this.fetch(`${this.oauthUrl}token`, {
        method: 'POST',
        body: JSON.stringify({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          refresh_token: refreshToken,
          grant_type: 'refresh_token',
          scope: this.scopes
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (err) {
      if (err instanceof TypeError) {
        throw new OsuJSGeneralError('network_error');
      }
    }

    if (!resp.ok) {
      throw new OsuJSUnexpectedResponseError(resp);
    }

    let token: Token | undefined;

    try {
      token = (await resp.json()) as Token;
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new OsuJSGeneralError('invalid_json_syntax');
      }
    }

    return token as Token;
  }
}
