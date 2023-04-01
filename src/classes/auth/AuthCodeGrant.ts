import axios, { AxiosResponse } from 'axios';
import { Scope, Token } from '../../types';
import Base from './Base';

/**
 * Class that handles auth code grant flow related actions
 */
export default class AuthCodeGrant extends Base {
  private scopes: Scope[];

  /**
   * @param clientId OAuth client ID
   * @param clientSecret OAuth client secret
   * @param redirectUri OAuth redirect URI
   * @param scopes An array of OAuth scopes
   */
  constructor(clientId: number, clientSecret: string, redirectUri: string, scopes: Scope[]) {
    super(clientId, clientSecret, redirectUri);

    this.scopes = scopes;
  }

  /**
   * Builds the authorization request URL
   * @param state Data that will be returned when a temporary code is issued. It can be used to provide a token for protecting against cross-site request forgery attacks.
   * @returns A URL which the user can be redirected to request authorization
   */
  public requestAuthorizationUrl(state?: string): string {
    let url: string = `${this.oauthUrl}authorize`;
    url += `?client_id=${this.clientId}`;
    url += `&redirect_uri=${this.redirectUri}`;
    url += '&response_type=code';

    if (this.scopes.length === 0) {
      this.scopes = ['identify'];
    }

    url += `&scope=${this.scopes.reduce((prev: string, scope) => `${prev}${scope} `, '')}`.trim();

    if (state) {
      url += `&state=${state}`;
    }

    return url;
  }

  /**
   * Gets a token
   * @param code The string received after a user authorizes the app
   * @returns An API token
   */
  public async requestToken(code: string): Promise<Token> {
    let resp: AxiosResponse = await axios.post(
      `${this.oauthUrl}token`,
      {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        code,
        grant_type: 'authorization_code',
        redirect_uri: this.redirectUri
      },
      this.headers
    );

    let token: Token = resp.data;
    return token;
  }

  /**
   * Refreshes a token
   * @param refreshToken The token used to refresh
   * @returns An API token
   */
  public async refreshToken(refreshToken: string): Promise<Token> {
    let resp: AxiosResponse = await axios.post(
      `${this.oauthUrl}token`,
      {
        client_id: this.clientId,
        client_secret: this.clientSecret,
        refresh_token: refreshToken,
        grant_type: 'refresh_token',
        scope: this.scopes
      },
      this.headers
    );

    let token: Token = resp.data;
    return token;
  }
}
