import Base from './Base';
import { z } from 'zod';
import { getUserRecentScoresOptionsSchema, getUserScoresOptionsSchema } from '../schemas';
import {
  GetUserRecentScoresOptions,
  GetUserScoresOptions,
  UserBestScore,
  UserScore
} from '../types';

export default class UserScores extends Base {
  constructor(accessToken: string) {
    super(accessToken);
  }

  private async getUserScores<T>(
    user: number,
    type: 'best' | 'firsts' | 'recent',
    options?: {
      query?: Record<string, unknown>;
    }
  ): Promise<T> {
    user = z.number().parse(user);
    options =
      type === 'recent'
        ? getUserRecentScoresOptionsSchema.parse(options)
        : getUserScoresOptionsSchema.parse(options);

    return await this.fetch(`users/${user}/scores/${type}`, 'GET', options);
  }

  /**
   * Makes a GET request to the `/users/{user}/scores/best` endpoint
   * @param user ID of the user to get their best scores
   * @returns An array of the specified user's best scores
   */
  public async getUserBestScores(
    user: number,
    options?: GetUserScoresOptions
  ): Promise<UserBestScore[]> {
    return await this.getUserScores(user, 'best', options);
  }

  /**
   * Makes a GET request to the `/users/{user}/scores/firsts` endpoint
   * @param user ID of the user to get their first place scores
   * @returns An array of the specified user's first place scores
   */
  public async getUserFirstPlaceScores(
    user: number,
    options?: GetUserScoresOptions
  ): Promise<UserScore[]> {
    return await this.getUserScores(user, 'firsts', options);
  }

  /**
   * Makes a GET request to the `/users/{user}/scores/recent` endpoint
   * @param user ID of the user to get their recent scores
   * @returns An array of the specified user's recent scores
   */
  public async getUserRecentScores(
    user: number,
    options?: GetUserRecentScoresOptions
  ): Promise<UserScore[]> {
    return await this.getUserScores(user, 'recent', options);
  }
}
