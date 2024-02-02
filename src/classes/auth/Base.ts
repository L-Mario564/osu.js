import type polyfillFetch from 'node-fetch';

export default class Base {
  protected clientId: number;
  protected clientSecret: string;
  protected redirectUri: string;
  protected oauthUrl: string;
  protected fetch: typeof fetch | typeof polyfillFetch;

  constructor(clientId: number, clientSecret: string, redirectUri: string, options?: {
    polyfillFetch?: typeof polyfillFetch;
  }) {
    if (typeof fetch === 'undefined' && !options?.polyfillFetch) {
      // TODO: Throw error
    }

    this.clientId = clientId;
    this.clientSecret = clientSecret;
    this.redirectUri = redirectUri;
    this.oauthUrl = 'https://osu.ppy.sh/oauth/';
    this.fetch = options?.polyfillFetch || fetch;
  }
}
