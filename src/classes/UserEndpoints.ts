import Base from './Base';
import UserScores from './UserScores';
import UserBeatmaps from './UserBeatmaps';
import { z } from 'zod';
import {
  getSelfOptionsSchema,
  getUserKudosuOptionsSchema,
  getUserOptionsSchema,
  getUserRecentActivityOptionsSchema,
  getUsersOptionsSchema
} from '../schemas/users';
import {
  UserExtended,
  UserKudosuHistory,
  UserCompact,
  Country,
  Cover,
  UserGroup,
  StatisticsRulesets,
  UserEvent
} from '../types';
import {
  GetSelfOptions,
  GetUserKodosuOptions,
  GetUserOptions,
  GetUsersOptions,
  GetUserRecentActivityOptions
} from '../types/options';

export default class UserEndpoints extends Base {
  public scores: UserScores;
  public beatmaps: UserBeatmaps;

  constructor(accessToken: string) {
    super(accessToken);

    this.scores = new UserScores(accessToken);
    this.beatmaps = new UserBeatmaps(accessToken);
  }

  /**
   * Makes a GET request to the `me` endpoint (requires the `identify` scope)
   * @returns The user corresponding to the access token provided in the constructor of this class
   */
  public async getSelf(options?: GetSelfOptions): Promise<
    UserExtended<{
      is_restricted: boolean;
      statistics_rulesets: StatisticsRulesets;
    }>
  > {
    options = getSelfOptionsSchema.parse(options);
    let endPoint: string = 'me';

    if (options?.urlParams?.mode) {
      endPoint += `/${options.urlParams.mode}`;
    }

    return await this.fetch(endPoint, 'GET');
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
    options = getUserKudosuOptionsSchema.parse(options);
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
    options = getUserRecentActivityOptionsSchema.parse(options);
    return await this.fetch(`users/${user}/recent_activity`, 'GET', options);
  }

  /**
   * Makes a GET request to the `/users/{user}/` endpoint
   * @param user ID or username of the user to get
   * @returns A user
   */
  public async getUser(
    user: number | string,
    options?: GetUserOptions
  ): Promise<UserExtended<unknown>> {
    user = z.number().parse(user);
    options = getUserOptionsSchema.parse(options);
    let endPoint: string = `users/${user}`;

    if (options?.urlParams?.mode) {
      endPoint += `/${options.urlParams.mode}`;
    }

    return await this.fetch(endPoint, 'GET', options);
  }

  /**
   * Makes a GET request to the `/users` endpoint
   * @returns An array of users
   */
  public async getUsers(options?: GetUsersOptions): Promise<
    UserCompact<{
      country: Country;
      cover: Cover;
      groups: UserGroup[];
      statistics_rulesets: StatisticsRulesets;
    }>[]
  > {
    options = getUsersOptionsSchema.parse(options);
    let obj: {
      users: UserCompact<{
        country: Country;
        cover: Cover;
        groups: UserGroup[];
        statistics_rulesets: StatisticsRulesets;
      }>[];
    } = await this.fetch('users', 'GET', options);
    return obj.users;
  }
}
