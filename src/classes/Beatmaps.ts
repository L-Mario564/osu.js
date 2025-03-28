import Base from './Base';
import type polyfillFetch from 'node-fetch';
import type {
  Beatmap,
  Beatmapset,
  BeatmapUserScore,
  BeatmapUserScoreV2,
  Country,
  Cover,
  Fails,
  FruitsBeatmapDifficultyAttributes,
  GameMode,
  ManiaBeatmapDifficultyAttributes,
  OsuBeatmapDifficultyAttributes,
  Score,
  ScoreV2,
  TaikoBeatmapDifficultyAttributes,
  UserCompact
} from '../types';
import type {
  GetBeatmapAttributesOptions,
  GetBeatmapTopNonLegacyScoresOptions,
  GetBeatmapScoresOptions,
  GetBeatmapsOptions,
  LookupBeatmapOptions
} from '../types/options';

/**
 * Class that wraps all beatmap related endpoints
 */
export default class Beatmaps<
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
   * Makes a GET request to the `/beatmaps/lookup` endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/lookup-beatmap}
   * @returns A beatmap
   */
  public async lookupBeatmap(options?: LookupBeatmapOptions): Promise<
    | (Beatmap & {
        beatmapset: Beatmapset & {
          ratings: number[];
        };
        checksum: string | null;
        failtimes: Fails;
        max_combo: number;
      })
    | null
  > {
    return await this.request('beatmaps/lookup', 'GET', {
      ...options,
      returnNullOn404: true
    });
  }

  private getBeatmapUserScoreBase<Version extends 'v1' | 'v2'>(version: Version) {
    return async (
      beatmap: number,
      user: number,
      options?: GetBeatmapScoresOptions
    ): Promise<Version extends 'v2' ? BeatmapUserScoreV2 : BeatmapUserScore> => {
      return await this.request(`beatmaps/${beatmap}/scores/users/${user}`, 'GET', {
        ...options,
        apiVersion: version === 'v2' ? '20220705' : undefined
      });
    };
  }

  /**
   * Makes a GET request to the `/beatmaps/{beatmap}/scores/users/{user}` endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-beatmap-user-score}
   * @param beatmap ID of the beatmap to get scores from
   * @param user ID of the user to get scores from
   * @returns A user score on a beatmap
   */
  public getBeatmapUserScore = this.getBeatmapUserScoreBase('v1');

  /**
   * Makes a GET request to the `/beatmaps/{beatmap}/scores/users/{user}` endpoint with the `x-api-version` header set to `20220705`
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-beatmap-user-score}
   * @param beatmap ID of the beatmap to get scores from
   * @param user ID of the user to get scores from
   * @returns A user score on a beatmap
   */
  public getBeatmapUserScoreV2 = this.getBeatmapUserScoreBase('v2');

  private getBeatmapUserScoresBase<Version extends 'v1' | 'v2'>(version: Version) {
    return async (
      beatmap: number,
      user: number,
      options?: GetBeatmapScoresOptions
    ): Promise<Version extends 'v2' ? ScoreV2[] : Score[]> => {
      const scores = await this.request<{
        scores: any;
      }>(`beatmaps/${beatmap}/scores/users/${user}/all`, 'GET', {
        ...options,
        apiVersion: version === 'v2' ? '20220705' : undefined
      });

      return scores.scores;
    };
  }

  /**
   * Makes a GET request to the `/beatmaps/{beatmap}/scores/users/{user}/all` endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-beatmap-user-scores}
   * @param beatmap ID of the beatmap to get scores from
   * @param user ID of the user to get scores from
   * @returns An array of user scores on a beatmap
   */
  public getBeatmapUserScores = this.getBeatmapUserScoresBase('v1');

  /**
   * Makes a GET request to the `/beatmaps/{beatmap}/scores/users/{user}/all` endpoint with the `x-api-version` header set to `20220705`
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-beatmap-user-scores}
   * @param beatmap ID of the beatmap to get scores from
   * @param user ID of the user to get scores from
   * @returns An array of user scores on a beatmap
   */
  public getBeatmapUserScoresV2 = this.getBeatmapUserScoresBase('v2');

  private getBeatmapTopScoresBase<Version extends 'v1' | 'v2'>(version: Version) {
    return async (
      beatmap: number,
      options?: GetBeatmapScoresOptions
    ): Promise<
      ((Version extends 'v2' ? ScoreV2 : Score) & {
        user: UserCompact & {
          country: Country;
          cover: Cover;
        };
      })[]
    > => {
      const scores = await this.request<{
        scores: any;
      }>(`beatmaps/${beatmap}/scores`, 'GET', {
        ...options,
        apiVersion: version === 'v2' ? '20220705' : undefined
      });

      return scores.scores;
    };
  }

  /**
   * Makes a GET request to the `/beatmaps/{beatmap}/scores` endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-beatmap-top-scores}
   * @param beatmap ID of the beatmap to get top scores from
   * @returns An array of user scores on a beatmap
   */
  public getBeatmapTopScores = this.getBeatmapTopScoresBase('v1');

  /**
   * Makes a GET request to the `/beatmaps/{beatmap}/scores` endpoint with the `x-api-version` header set to `20220705`
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-beatmap-top-scores}
   * @param beatmap ID of the beatmap to get top scores from
   * @returns An array of user scores on a beatmap
   */
  public getBeatmapTopScoresV2 = this.getBeatmapTopScoresBase('v2');

  private getBeatmapTopNonLegacyScoresBase<Version extends 'v1' | 'v2'>(version: Version) {
    return async (
      beatmap: number,
      options?: GetBeatmapTopNonLegacyScoresOptions
    ): Promise<
      ((Version extends 'v2' ? ScoreV2 : Score) & {
        user: UserCompact & {
          country: Country;
          cover: Cover;
        };
      })[]
    > => {
      const scores = await this.request<{
        scores: any;
      }>(`beatmaps/${beatmap}/solo-scores`, 'GET', {
        ...options,
        apiVersion: version === 'v2' ? '20220705' : undefined
      });

      return scores.scores;
    };
  }

  /**
   * Makes a GET request to the `/beatmaps/{beatmap}/solo-scores` endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-beatmap-top-non-legacy-scores}
   * @param beatmap ID of the beatmap to get top scores from
   * @returns An array of user scores on a beatmap
   */
  public getBeatmapTopNonLegacyScores = this.getBeatmapTopNonLegacyScoresBase('v1');

  /**
   * Makes a GET request to the `/beatmaps/{beatmap}/solo-scores` endpoint with the `x-api-version` header set to `20220705`
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-beatmap-top-non-legacy-scores}
   * @param beatmap ID of the beatmap to get top scores from
   * @returns An array of user scores on a beatmap
   */
  public getBeatmapTopNonLegacyScoresV2 = this.getBeatmapTopNonLegacyScoresBase('v2');

  /**
   * Makes a GET request to the `/beatmaps` endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-beatmaps}
   * @returns An array of beatmaps
   */
  public async getBeatmaps(options?: GetBeatmapsOptions): Promise<
    (Beatmap & {
      failtimes: Fails;
      max_combo: number;
      checksum: string | null;
      beatmapset: Beatmapset & {
        ratings: number[];
      };
    })[]
  > {
    const beatmaps = await this.request<{
      beatmaps: Awaited<ReturnType<Beatmaps['getBeatmaps']>>;
    }>('beatmaps', 'GET', options);

    return beatmaps.beatmaps;
  }

  /**
   * Makes a GET request to the `/beatmaps/{beatmap}` endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-beatmap}
   * @param beatmap ID of the beatmap to get
   * @returns A beatmap
   */
  public async getBeatmap(beatmap: number): Promise<
    Beatmap & {
      beatmapset: Beatmapset & {
        ratings: number[];
      };
      checksum: string | null;
      failtimes: Fails;
      max_combo: number;
    }
  > {
    return await this.request(`beatmaps/${beatmap}`, 'GET');
  }

  /**
   * Makes a POST request to the `/beatmaps/{beatmap}/attributes` endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-beatmap-attributes}
   * @param beatmap ID of the beatmap to get its attributes
   * @param gamemode Gamemode attributes to get
   * @returns A beatmap's attributes
   */
  public async getBeatmapAttributes<T extends GameMode>(
    beatmap: number,
    gamemode: T,
    options?: GetBeatmapAttributesOptions
  ): Promise<
    T extends 'osu'
      ? OsuBeatmapDifficultyAttributes
      : T extends 'taiko'
      ? TaikoBeatmapDifficultyAttributes
      : T extends 'fruits'
      ? FruitsBeatmapDifficultyAttributes
      : ManiaBeatmapDifficultyAttributes
  > {
    const remapped = {
      body: {
        mods: options?.body?.mods,
        ruleset: gamemode
      }
    };

    const beatmap_ = await this.request<any>(`beatmaps/${beatmap}/attributes`, 'POST', remapped);
    return beatmap_.attributes;
  }
}
