import open from 'open';
import axios, { AxiosResponse } from 'axios';
import { AuthorizationCodeGrant, GuestToken, Scope, Token } from '../types';

export default class Auth {
  private clientId: number;
  private clientSecret: string;
  private redirectUri: string;
  private oauthUrl: string;

  constructor(clientId: number, clientSecret: string, redirectUri: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.oauthUrl = 'https://osu.ppy.sh/oauth/';
  }

  public authorizationCodeGrant(scope: Scope = 'identify'): AuthorizationCodeGrant {
    return {
      requestAuthorization: (state?: string): void => {
        let url: string = `${this.oauthUrl}authorize`;
        url += `?client_id=${this.clientId}`;
        url += `&redirect_uri=${this.redirectUri}`;
        url += '&response_type=code';
        url += `&scope=${scope}`;

        if (state) url += `&state=${state}`;

        open(url);
      },
      requestToken: async (code: string): Promise<Token> => {
        let resp: AxiosResponse = await axios.post(`${this.oauthUrl}token`, {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          code,
          grant_type: 'authorization_code',
          redirect_uri: this.redirectUri
        });

        let token: Token = resp.data;
        return token;
      },
      refreshToken: async (accessToken: string, refreshToken: string): Promise<Token> => {
        let resp: AxiosResponse = await axios.post(`${this.oauthUrl}token`, {
          client_id: this.clientId,
          client_secret: this.clientSecret,
          access_token: accessToken,
          refresh_token: refreshToken,
          grant_type: 'refresh_token'
        });

        let token: Token = resp.data;
        return token;
      }
    };
  }

  public async clientCredentialsGrant(): Promise<GuestToken> {
    let resp: AxiosResponse = await axios.post(`${this.oauthUrl}token`, {
      client_id: this.clientId,
      client_secret: this.clientSecret,
      grant_type: 'authorization_code',
      scope: 'public'
    });

    let token: GuestToken = resp.data;
    return token;
  }
}
