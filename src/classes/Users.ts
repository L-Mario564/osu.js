import Base from './Base';
import type polyfillFetch from 'node-fetch';
import type {
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
  UserScore,
  LazerStructureType,
  LegacyUserBestScore,
  LegacyUserScore
} from '../types';
import type {
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
export default class Users<
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
   * Makes a GET request to the `me` endpoint (requires the `identify` scope)
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-self}
   * @returns The user corresponding to the access token provided in the constructor of this class
   */
  public async getSelf(options?: GetSelfOptions): Promise<
    UserExtended & {
      is_restricted: boolean;
      session_verified: boolean;
      statistics_rulesets: StatisticsRulesets;
    }
  > {
    let endpoint = 'me';

    if (options?.urlParams?.mode) {
      endpoint += `/${options.urlParams.mode}`;
    }

    return await this.request(endpoint, 'GET');
  }

  /**
   * Makes a GET request to the `/users/{user}/kudosu` endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-user-kudosu}
   * @param user ID of the user to get kudosu from
   * @param options
   * @returns An array containing the specified user's kudosu history
   */
  public async getUserKudosu(
    user: number,
    options?: GetUserKodosuOptions
  ): Promise<UserKudosuHistory[]> {
    return await this.request(`users/${user}/kudosu`, 'GET', options);
  }

  /**
   * Makes a GET request to the `/users/{user}/recent_activity` endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-user-recent-activity}
   * @param user ID of the user to get their recent activity from
   * @param options
   * @returns An array containing the specified user's recent activity (each event is a union, to discriminate, use the `type` key)
   */
  public async getUserRecentActivity(
    user: number,
    options?: GetUserRecentActivityOptions
  ): Promise<UserEvent[]> {
    return await this.request(`users/${user}/recent_activity`, 'GET', options);
  }

  /**
   * Makes a GET request to the `/users/{user}/scores/{type}` endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-user-scores}
   * @param user ID of the user to get their scores
   * @param type Score type
   * @param options
   * @returns An array of the specified user's scores
   */
  public async getUserScores<T extends UserScoreType>(
    user: number,
    type: T,
    options?: T extends 'recent' ? GetUserRecentScoresOptions : GetUserScoresOptions
  ): Promise<T extends 'best' ? UserBestScore[] : UserScore[]> {
    return await this.request(`users/${user}/scores/${type}`, 'GET', options);
  }

  /**
   * Makes a GET request to the `/users/{user}/beatmapsets/{type}` endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-user-beatmaps}
   * @param user ID of the user to get their beatmapsets
   * @param type Type of beatmapsets to return
   * @param options
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
    return await this.request(`users/${user}/beatmapsets/${type}`, 'GET', options);
  }

  /**
   * Makes a GET request to the `/users/{user}/{mode?}` endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-user}
   * @param user ID or username of the user to get
   * @param options
   * @returns A user
   */
  public async getUser(user: number | string, options?: GetUserOptions): Promise<UserExtended> {
    let endpoint = `users/${user}`;

    if (options?.urlParams?.mode) {
      endpoint += `/${options.urlParams.mode}`;
    }

    return await this.request(endpoint, 'GET', options);
  }

  /**
   * Makes a GET request to the `/users` endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-users}
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
    const users = await this.request<{
      users: Awaited<ReturnType<Users['getUsers']>>;
    }>('users', 'GET', options);

    return users.users;
  }
}
