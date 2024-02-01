import Base from './Base';
import { z } from 'zod';
import type polyfillFetch from 'node-fetch';
import type { WikiPage } from '../types';

/**
 * Class that wraps all wiki related endpoints
 */
export default class Wiki extends Base {
  /**
   * @param accessToken OAuth access token
   * @param options.polyfillFetch In case developing with a Node.js version prior to 18, you need to pass a polyfill for the fetch API. Install `node-fetch`
   */
  constructor(accessToken: string, options?: {
    polyfillFetch?: typeof fetch | typeof polyfillFetch;
  }) {
    super(accessToken, options);
  }

  /**
   * Makes a GET request to the `/wiki/{locale}/{path}` endpoint
   * @param locale Two-letter language code of the wiki page
   * @param path Path to the wiki page
   * @returns The wiki page
   */
  public async getWikiPage(locale: string, path: string): Promise<WikiPage> {
    locale = z.string().length(2).parse(locale);
    path = z.string().parse(path);
    return await this.request(`wiki/${locale}/${path}`, 'GET');
  }
}
