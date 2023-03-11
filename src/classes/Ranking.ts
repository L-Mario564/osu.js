import Base from './Base';
import { GameMode, Rankings, RankingType, Spotlight } from '../types';
import { GetRankingOptions } from '../types/options';
import { gameModeSchema } from '../schemas';
import { getRankingOptionsSchema, rankingTypeSchema } from '../schemas/ranking';

export default class Ranking extends Base {
  constructor(accessToken: string) {
    super(accessToken);
  }

  /**
   * Makes a GET request to the `/rankings/{mode}/{type}` endpoint
   * @param mode Ranking gamemode
   * @param type Ranking type
   * @returns An object containing ranking data
   */
  public async getRanking(
    mode: GameMode,
    type: RankingType,
    options?: GetRankingOptions
  ): Promise<Rankings> {
    mode = gameModeSchema.parse(mode);
    type = rankingTypeSchema.parse(type);
    options = getRankingOptionsSchema.parse(options);

    return await this.fetch(`rankings/${mode}/${type}`, 'GET', options);
  }

  /**
   * Makes a GET request to the `/spotights` endpoint
   * @returns An array of spotlights
   */
  public async getSpotlights(): Promise<Spotlight[]> {
    let spotlights: {
      spotlights: Spotlight[];
    } = await this.fetch('spotlights', 'GET');

    return spotlights.spotlights;
  }
}
