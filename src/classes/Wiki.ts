import Base from './Base';
import type polyfillFetch from 'node-fetch';
import type { WikiPage } from '../types';

/**
 * Class that wraps all wiki related endpoints
 */
export default class Wiki<
  TPolyfillFetch extends typeof polyfillFetch | undefined = undefined
> extends Base<TPolyfillFetch> {
  /**
   * @param accessToken OAuth access token
   * @param options.polyfillFetch In case developing with a Node.js version prior to 18, you need to pass a polyfill for the fetch API. Install `node-fetch`
   * @param options.lazerStructure Specify whether or not you want the newer Lazer's API structure. Defaults to false, which means it will return legacy structure.
   */
  constructor(
    accessToken: string,
    options?: {
      lazerStructure?: boolean;
      polyfillFetch?: TPolyfillFetch;
    }
  ) {
    super(accessToken, options);
  }

  /**
   * Makes a GET request to the `/wiki/{locale}/{path}` endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-wiki-page}
   * @param locale Two-letter language code of the wiki page
   * @param path Path to the wiki page
   * @returns The wiki page
   */
  public async getWikiPage(locale: string, path: string): Promise<WikiPage> {
    return await this.request(`wiki/${locale}/${path}`, 'GET');
  }
}
