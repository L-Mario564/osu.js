import Base from './Base';
import { z } from 'zod';
import {
  getSelfOptionsSchema,
  getUserBeatmapsOptionsSchema,
  getUserKudosuOptionsSchema,
  getUserOptionsSchema,
  getUserRecentActivityOptionsSchema,
  getUserRecentScoresOptionsSchema,
  getUserScoresOptionsSchema,
  getUsersOptionsSchema,
  userBeatmapsTypeSchema,
  userScoreTypeSchema
} from '../schemas/users';
import {
  UserExtended,
  UserKudosuHistory,
  UserCompact,
  Country,
  Cover,
  UserGroup,
  StatisticsRulesets,
  UserEvent,
  Beatmap,
  Beatmapset,
  UserBeatmapsType,
  BeatmapPlaycount,
  UserScoreType,
  UserBestScore,
  UserScore
} from '../types';
import {
  GetSelfOptions,
  GetUserKodosuOptions,
  GetUserOptions,
  GetUsersOptions,
  GetUserRecentActivityOptions,
  GetUserBeatmapsOptions,
  GetUserRecentScoresOptions,
  GetUserScoresOptions
} from '../types/options';

/**
 * Class that wraps all user related endpoints
 */
export default class Users extends Base {
  /**
   * @param accessToken OAuth access token
   */
  constructor(accessToken: string) {
    super(accessToken);
  }

  /**
   * Makes a GET request to the `me` endpoint (requires the `identify` scope)
   * @returns The user corresponding to the access token provided in the constructor of this class
   */
  public async getSelf(options?: GetSelfOptions): Promise<
    UserExtended & {
      is_restricted: boolean;
      statistics_rulesets: StatisticsRulesets;
    }
  > {
    options = getSelfOptionsSchema.optional().parse(options);
    let endpoint: string = 'me';

    if (options?.urlParams?.mode) {
      endpoint += `/${options.urlParams.mode}`;
    }

    return await this.fetch(endpoint, 'GET');
  }

  /**
   * Makes a GET request to the `/users/{user}/kudosu` endpoint
   * @param user ID of the user to get kudosu from
   * @returns An array containing the specified user's kudosu history
   */
  public async getUserKudosu(
    user: number,
    options?: GetUserKodosuOptions
  ): Promise<UserKudosuHistory[]> {
    user = z.number().parse(user);
    options = getUserKudosuOptionsSchema.optional().parse(options);
    return await this.fetch(`users/${user}/kudosu`, 'GET', options);
  }

  /**
   * Makes a GET request to the `/users/{user}/recent_activity` endpoint
   * @param user ID of the user to get their recent activity from
   * @returns An array containing the specified user's recent activity (each event is a union, to discriminate, use the `type` key)
   */
  public async getUserRecentActivity(
    user: number,
    options?: GetUserRecentActivityOptions
  ): Promise<UserEvent[]> {
    user = z.number().parse(user);
    options = getUserRecentActivityOptionsSchema.optional().parse(options);
    return await this.fetch(`users/${user}/recent_activity`, 'GET', options);
  }

  /**
   * Makes a GET request to the `/users/{user}/scores/{type}` endpoint
   * @param user ID of the user to get their scores
   * @param type Score type
   * @returns An array of the specified user's scores
   */
  public async getUserScores<T extends UserScoreType>(
    user: number,
    type: T,
    options?: T extends 'recent' ? GetUserRecentScoresOptions : GetUserScoresOptions
  ): Promise<T extends 'best' ? UserBestScore[] : UserScore[]> {
    user = z.number().parse(user);
    type = userScoreTypeSchema.parse(type) as T;
    options =
      type === 'recent'
        ? getUserRecentScoresOptionsSchema.optional().parse(options)
        : getUserScoresOptionsSchema.optional().parse(options);

    return await this.fetch(`users/${user}/scores/${type}`, 'GET', options);
  }

  /**
   * Makes a GET request to the `/users/{user}/beatmapsets/{type}` endpoint
   * @param user ID of the user to get their beatmapsets
   * @param type Type of beatmapsets to return
   * @returns An array of a user's beatmapsets
   */
  public async getUserBeatmaps<T extends UserBeatmapsType>(
    user: number,
    type: T,
    options?: GetUserBeatmapsOptions
  ): Promise<
    T extends 'most_played'
      ? BeatmapPlaycount[]
      : (Beatmapset & {
          beatmaps: (Beatmap & {
            checksum: string | null;
          })[];
        })[]
  > {
    user = z.number().parse(user);
    type = userBeatmapsTypeSchema.parse(type) as T;
    options = getUserBeatmapsOptionsSchema.optional().parse(options);

    return await this.fetch(`users/${user}/beatmapsets/${type}`, 'GET', options);
  }

  /**
   * Makes a GET request to the `/users/{user}/{mode?}` endpoint
   * @param user ID or username of the user to get
   * @returns A user
   */
  public async getUser(user: number | string, options?: GetUserOptions): Promise<UserExtended> {
    if(typeof user === "number") user = z.number().parse(user);
    else user = z.string().parse(user);
    options = getUserOptionsSchema.optional().parse(options);
    let endpoint: string = `users/${user}`;

    if (options?.urlParams?.mode) {
      endpoint += `/${options.urlParams.mode}`;
    }

    return await this.fetch(endpoint, 'GET', options);
  }

  /**
   * Makes a GET request to the `/users` endpoint
   * @returns An array of users
   */
  public async getUsers(options?: GetUsersOptions): Promise<
    (UserCompact & {
      country: Country;
      cover: Cover;
      groups: UserGroup[];
      statistics_rulesets: StatisticsRulesets;
    })[]
  > {
    options = getUsersOptionsSchema.optional().parse(options);

    let obj: {
      users: (UserCompact & {
        country: Country;
        cover: Cover;
        groups: UserGroup[];
        statistics_rulesets: StatisticsRulesets;
      })[];
    } = await this.fetch('users', 'GET', options);

    return obj.users;
  }
}
