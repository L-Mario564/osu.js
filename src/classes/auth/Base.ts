export default class Base {
  protected clientId: number;
  protected clientSecret: string;
  protected redirectUri: string;
  protected oauthUrl: string;
  protected headers;

  constructor(clientId: number, clientSecret: string, redirectUri: string) {
    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.oauthUrl = 'https://osu.ppy.sh/oauth/';
    this.headers = {
      headers: {
        'Accept-Encoding': '*'
      }
    };
  }
}
