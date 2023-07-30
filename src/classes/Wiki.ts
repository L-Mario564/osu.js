import Base from './Base';
import { z } from 'zod';
import { WikiPage } from '../types';

/**
 * Class that wraps all wiki related endpoints
 */
export default class Wiki extends Base {
  /**
   * @param accessToken OAuth access token
   */
  constructor(accessToken: string) {
    super(accessToken);
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
    return await this.fetch(`wiki/${locale}/${path}`, 'GET');
  }
}
