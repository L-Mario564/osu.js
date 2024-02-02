import Base from './Base';
import type polyfillFetch from 'node-fetch';
import type { GameMode, Rankings, RankingType, Spotlight } from '../types';
import type { GetRankingOptions } from '../types/options';

/**
 * Class that wraps all ranking related endpoints
 */
export default class Ranking extends Base {
  /**
   * @param accessToken OAuth access token
   * @param options.polyfillFetch In case developing with a Node.js version prior to 18, you need to pass a polyfill for the fetch API. Install `node-fetch`
   */
  constructor(accessToken: string, options?: {
    polyfillFetch?: typeof polyfillFetch;
  }) {
    super(accessToken, options);
  }

  /**
   * Makes a GET request to the `/rankings/{mode}/{type}` endpoint
   * 
   * Documentation: {@link https://osujs.mario564.com/current/get-ranking}
   * @param mode Ranking gamemode
   * @param type Ranking type
   * @returns An object containing ranking data
   */
  public async getRanking(
    mode: GameMode,
    type: RankingType,
    options?: GetRankingOptions
  ): Promise<Rankings> {
    if (options?.query?.country) {
      options.query.country = options.query.country.toUpperCase();
    }

    return await this.request(`rankings/${mode}/${type}`, 'GET', options);
  }

  /**
   * Makes a GET request to the `/spotights` endpoint
   * 
   * Documentation: {@link https://osujs.mario564.com/current/get-spotlights}
   * @returns An array of spotlights
   */
  public async getSpotlights(): Promise<Spotlight[]> {
    const spotlights = await this.request<{
      spotlights: Spotlight[];
    }>('spotlights', 'GET');

    return spotlights.spotlights;
  }
}
