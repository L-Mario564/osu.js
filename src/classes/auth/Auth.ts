import AuthCodeGrant from './AuthCodeGrant';
import Base from './Base';
import type polyfillFetch from 'node-fetch';
import type { GuestToken, Scope } from '../../types';

/**
 * Class that wraps all OAuth related endpoints
 */
export default class Auth extends Base {
  /**
   * @param clientId OAuth client ID
   * @param clientSecret OAuth client secret
   * @param redirectUri OAuth redirect URI
   * @param options.polyfillFetch In case developing with a Node.js version prior to 18, you need to pass a polyfill for the fetch API. Install `node-fetch`
   */
  constructor(clientId: number, clientSecret: string, redirectUri: string, options?: {
    polyfillFetch?: typeof polyfillFetch;
  }) {
    super(clientId, clientSecret, redirectUri, options);
  }

  /**
   * @param scopes An array of scopes
   */
  public authorizationCodeGrant(scopes: Scope[] = ['identify']): AuthCodeGrant {
    return new AuthCodeGrant(this.clientId, this.clientSecret, this.redirectUri, scopes);
  }

  /**
   * Gets a token
   * @returns An API token (with guest permissions)
   */
  public async clientCredentialsGrant(): Promise<GuestToken> {
    // TODO: Better error handling
    const resp = await this.fetch(`${this.oauthUrl}token`, {
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

    const token = await resp.json() as GuestToken;
    return token;
  }

  /**
   * Revokes a token
   * @param accessToken Access toke to revoke
   */
  // TODO: Clone to Client class
  public async revokeToken(accessToken: string) {
    // TODO: Better error handling
    await this.fetch('https://osu.ppy.sh/api/v2/oauth/tokens/current', {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${accessToken}`
      }
    });
  }
}
