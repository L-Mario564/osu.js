import Base from './Base';
import type polyfillFetch from 'node-fetch';
import type { GetNewsListingOptions, GetNewsPostOptions } from '../types/options';
import type { NewsListing, NewsNavigation, NewsPost } from '../types';

/**
 * Class that wraps all news related endpoints
 */
export default class News<
  TPolyfillFetch extends typeof polyfillFetch | undefined = undefined
> extends Base<TPolyfillFetch> {
  /**
   * @param accessToken OAuth access token
   * @param options.polyfillFetch In case developing with a Node.js version prior to 18, you need to pass a polyfill for the fetch API. Install `node-fetch`
   */
  constructor(
    accessToken: string,
    options?: {
      polyfillFetch?: TPolyfillFetch;
    }
  ) {
    super(accessToken, options);
  }

  /**
   * Makes a GET request to the `/news` endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-news-listing}
   * @returns An object containing news posts and other additional data
   */
  public async getNewsListing(options?: GetNewsListingOptions): Promise<NewsListing> {
    return await this.request('news', 'GET', options);
  }

  /**
   * Makes a GET request to the `/news/{news}` endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-news-post}
   * @param news ID or slug of the news post to get
   * @returns A news post
   */
  public async getNewsPost(
    news: string | number,
    options?: GetNewsPostOptions
  ): Promise<
    NewsPost & {
      content: string;
      navigation: NewsNavigation;
    }
  > {
    return await this.request(`news/${news}`, 'GET', options);
  }
}
