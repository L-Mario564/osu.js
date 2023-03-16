import Base from './Base';
import {
  Beatmap,
  Beatmapset,
  BeatmapUserScore,
  Country,
  Cover,
  Fails,
  FruitsBeatmapDifficultyAttributes,
  GameMode,
  ManiaBeatmapDifficultyAttributes,
  OsuBeatmapDifficultyAttributes,
  Score,
  TaikoBeatmapDifficultyAttributes,
  UserCompact
} from '../types';
import {
  GetBeatmapAttributesOptions,
  GetBeatmapScoresOptions,
  GetBeatmapsOptions,
  LookupBeatmapOptions
} from '../types/options';
import { z } from 'zod';
import {
  lookupBeatmapOptionsSchema,
  getBeatmapScoresOptionSchema,
  getBeatmapsOptionsSchema,
  getBeatmapAttributesOptionsSchema
} from '../schemas/beatmaps';
import { gameModeSchema } from '../schemas';
import { isAxiosError } from 'axios';

export default class Beatmaps extends Base {
  constructor(accessToken: string) {
    super(accessToken);
  }

  /**
   * Makes a GET request to the `/beatmaps/lookup` endpoint
   * @returns A beatmap
   */
  public async lookupBeatmap(options?: LookupBeatmapOptions): Promise<
    Beatmap & {
      beatmapset: Beatmapset & {
        ratings: number[];
      };
      checksum: string | null;
      failtimes: Fails;
      max_combo: number;
    } | undefined
  > {
    options = lookupBeatmapOptionsSchema.parse(options);

    let beatmap: Beatmap & {
      beatmapset: Beatmapset & {
        ratings: number[];
      };
      checksum: string | null;
      failtimes: Fails;
      max_combo: number;
    } | undefined;

    try {
      beatmap = await this.fetch('beatmaps/lookup', 'GET', options);
    } catch (err) {
      if (!isAxiosError(err) || err.response?.status !== 404) {
        throw err;
      }
    }

    return beatmap;
  }

  /**
   * Makes a GET request to the `/beatmaps/{beatmap}/scores/users/{user}` endpoint
   * @param beatmap ID of the beatmap to get scores from
   * @param user ID of the user to get scores from
   * @returns A user score on a beatmap
   */
  public async getBeatmapUserScore(
    beatmap: number,
    user: number,
    options?: GetBeatmapScoresOptions
  ): Promise<BeatmapUserScore> {
    beatmap = z.number().parse(beatmap);
    user = z.number().parse(user);
    options = getBeatmapScoresOptionSchema.parse(options);

    return await this.fetch(`beatmaps/${beatmap}/scores/users/${user}`, 'GET', options);
  }

  /**
   * Makes a GET request to the `/beatmaps/{beatmap}/scores/users/{user}/all` endpoint
   * @param beatmap ID of the beatmap to get scores from
   * @param user ID of the user to get scores from
   * @returns An array of user scores on a beatmap
   */
  public async getBeatmapUserScores(
    beatmap: number,
    user: number,
    options?: GetBeatmapScoresOptions
  ): Promise<Score[]> {
    beatmap = z.number().parse(beatmap);
    user = z.number().parse(user);
    options = getBeatmapScoresOptionSchema.parse(options);

    let scores: {
      scores: Score[];
    } = await this.fetch(`beatmaps/${beatmap}/scores/users/${user}/all`, 'GET', options);

    return scores.scores;
  }

  /**
   * Makes a GET request to the `/beatmaps/{beatmap}/scores` endpoint
   * @param beatmap ID of the beatmap to get top scores from
   * @returns An array of user scores on a beatmap
   */
  public async getBeatmapTopScores(
    beatmap: number,
    options?: GetBeatmapScoresOptions
  ): Promise<
    (Score & {
      user: UserCompact & {
        country: Country;
        cover: Cover;
      };
    })[]
  > {
    beatmap = z.number().parse(beatmap);
    options = getBeatmapScoresOptionSchema.parse(options);

    let scores: {
      scores: (Score & {
        user: UserCompact & {
          country: Country;
          cover: Cover;
        };
      })[];
    } = await this.fetch(`beatmaps/${beatmap}/scores`, 'GET', options);

    return scores.scores;
  }

  /**
   * Makes a GET request to the `/beatmaps` endpoint
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
    options = getBeatmapsOptionsSchema.parse(options);

    let beatmaps: {
      beatmaps: (Beatmap & {
        failtimes: Fails;
        max_combo: number;
        checksum: string | null;
        beatmapset: Beatmapset & {
          ratings: number[];
        };
      })[];
    } = await this.fetch('/beatmaps', 'GET', options);

    return beatmaps.beatmaps;
  }

  /**
   * Makes a GET request to the `/beatmaps/{beatmap}` endpoint
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
    beatmap = z.number().parse(beatmap);
    return await this.fetch(`beatmaps/${beatmap}`, 'GET');
  }

  /**
   * Makes a POST reques tot the `/beatmaps/{beatmap}/attributes` endpoint
   * @param beatmap ID of the beatmap to its attributes
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
    beatmap = z.number().parse(beatmap);
    gamemode = gameModeSchema.parse(gamemode) as T;
    options = getBeatmapAttributesOptionsSchema.parse(options);

    let remapped = {
      body: {
        mods: options?.body?.mods,
        ruleset: gamemode
      }
    };

    return await this.fetch(`beatmaps/${beatmap}/attributes`, 'POST', remapped);
  }
}
