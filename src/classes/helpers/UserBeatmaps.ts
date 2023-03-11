import Base from '../Base';
import { z } from 'zod';
import { getUserBeatmapsOptionsSchema, userBeatmapsTypeSchema } from '../../schemas/users';
import { Beatmap, BeatmapPlaycount, Beatmapset, UserBeatmapsType } from '../../types';
import { GetUserBeatmapsOptions } from '../../types/options';

export default class UserBeatmaps extends Base {
  constructor(accessToken: string) {
    super(accessToken);
  }

  private async getAllUserBeatmaps<T>(
    user: number,
    type: UserBeatmapsType,
    options?: GetUserBeatmapsOptions
  ): Promise<T> {
    user = z.number().parse(user);
    type = userBeatmapsTypeSchema.parse(type);
    options = getUserBeatmapsOptionsSchema.parse(options);

    return await this.fetch(`users/${user}/beatmapsets/${type}`, 'GET', options);
  }

  /**
   * Makes a GET request to the `/users/{user}/beatmapsets/{type}` endpoint
   * @param user ID of the user to get their beatmapsets
   * @param type Type of beatmapsets to return (for `most_played`, use the `getUserMostPlayed` method)
   * @returns An array of a user's beatmapsets
   */
  public async getUserBeatmaps(
    user: number,
    type: Exclude<UserBeatmapsType, 'most_played'>,
    options?: GetUserBeatmapsOptions
  ): Promise<
    (Beatmapset<unknown> & {
      beatmaps: Beatmap<{
        checksum: string | null;
      }>[];
    })[]
  > {
    return await this.getAllUserBeatmaps(user, type, options);
  }

  /**
   * Makes a GET request to the `/users/{user}/beatmapsets/most_played` endpoint
   * @param user ID of the user to get their most played beatmapsets
   * @returns An array of a user's most played beatmapsets
   */
  public async getUserMostPlayed(
    user: number,
    options?: GetUserBeatmapsOptions
  ): Promise<BeatmapPlaycount[]> {
    return await this.getAllUserBeatmaps(user, 'most_played', options);
  }
}
