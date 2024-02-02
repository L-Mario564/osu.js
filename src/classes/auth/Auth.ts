import AuthCodeGrant from './AuthCodeGrant';
import Base from './Base';
import { OsuJSGeneralError, OsuJSUnexpectedResponseError } from '../Errors';
import type polyfillFetch from 'node-fetch';
import type { Response as PolyfillResponse } from 'node-fetch';
import type { GuestToken, Scope } from '../../types';

/**
 * Class that wraps all OAuth related endpoints
 *
 * Documentation: {@link https://osujs.mario564.com/oauth}
 */
export default class Auth extends Base {
  /**
   * @param clientId OAuth client ID
   * @param clientSecret OAuth client secret
   * @param redirectUri OAuth redirect URI
   * @param options.polyfillFetch In case developing with a Node.js version prior to 18, you need to pass a polyfill for the fetch API. Install `node-fetch`
   */
  constructor(
    clientId: number,
    clientSecret: string,
    redirectUri: string,
    options?: {
      polyfillFetch?: typeof polyfillFetch;
    }
  ) {
    super(clientId, clientSecret, redirectUri, options);
  }

  /**
   * @param scopes An array of scopes
   *
   * Documentation: {@link https://osujs.mario564.com/oauth/authorization-code-grant}
   */
  public authorizationCodeGrant(scopes: Scope[] = ['identify']): AuthCodeGrant {
    return new AuthCodeGrant(this.clientId, this.clientSecret, this.redirectUri, scopes);
  }

  /**
   * Gets a token
   *
   * Documentation: {@link https://osujs.mario564.com/oauth/client-credentials-grant}
   * @returns An API token (with guest permissions)
   */
  public async clientCredentialsGrant(): Promise<GuestToken> {
    let resp: Response | PolyfillResponse = new Response();

    try {
      resp = await this.fetch(`${this.oauthUrl}token`, {
        method: 'POST',
        body: JSON.stringify({
          client_id: this.clientId,
          client_secret: this.clientSecret,
          grant_type: 'client_credentials',
          scope: 'public'
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

    let token: GuestToken | undefined;

    try {
      token = (await resp.json()) as GuestToken;
    } catch (err) {
      if (err instanceof SyntaxError) {
        throw new OsuJSGeneralError('invalid_json_syntax');
      }
    }

    return token as GuestToken;
  }

  /**
   * Revokes a token
   *
   * Documentation: {@link https://osujs.mario564.com/oauth/revoke-token}
   * @param accessToken Access token to revoke
   */
  public async revokeToken(accessToken: string) {
    try {
      await this.fetch('https://osu.ppy.sh/api/v2/oauth/tokens/current', {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });
    } catch (err) {
      if (err instanceof TypeError) {
        throw new OsuJSGeneralError('network_error');
      }
    }
  }
}
