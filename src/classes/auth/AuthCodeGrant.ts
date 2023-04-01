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
