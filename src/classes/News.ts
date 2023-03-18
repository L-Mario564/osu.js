import Base from './Base';
import { NewsListing, NewsNavigation, NewsPost } from '../types';
import { GetNewsListingOptions, GetNewsPostOptions } from '../types/options';
import { z } from 'zod';
import { getNewsListingOptionsSchema, getNewsPostOptionsSchema } from '../schemas/news';

/**
 * Class that wraps all news related endpoints
 */
export default class News extends Base {
  /**
   * @param accessToken OAuth access token
   */
  constructor(accessToken: string) {
    super(accessToken);
  }

  /**
   * Makes a GET request to the `/news` endpoint
   * @returns An object containing news posts and other additional data
   */
  public async getNewsListing(options?: GetNewsListingOptions): Promise<NewsListing> {
    options = getNewsListingOptionsSchema.optional().parse(options);
    return await this.fetch('news', 'GET', options);
  }

  /**
   * Makes a GET request to the `/news/{news}` endpoint
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
    news = z.union([z.string(), z.number()]).parse(news);
    options = getNewsPostOptionsSchema.optional().parse(options);

    return await this.fetch(`news/${news}`, 'GET', options);
  }
}
