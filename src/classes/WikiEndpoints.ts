import Base from './Base';
import { z } from 'zod';
import { WikiPage } from '../types';

export default class WikiEndpoints extends Base {
  constructor(accessToken: string) {
    super(accessToken);
  }

  /**
   * Makes a GET request to the `/wiki/{locale}/{path}` endpoint
   * @returns The wiki page
   */
  public async getWikiPage(locale: string, path: string): Promise<WikiPage> {
    locale = z.string().length(2).parse(locale);
    path = z.string().parse(path);

    return await this.fetch(`wiki/${locale}/${path}`, 'GET');
  }
}
