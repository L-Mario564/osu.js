import {
  getBeatmapScoresParamsSchema,
  getBeatmapsParamsSchema,
  getMultiplayerLobbyParamsSchema,
  getReplayByBeatmapAndUserIdParamsSchema,
  getReplayByScoreIdParamsSchema,
  getUserParamsSchema,
  getUserScoresParamsSchema
} from '../schemas/legacy';
import { Mod } from '../types';
import {
  LegacyBeatmap,
  LegacyBeatmapScore,
  GetBeatmapScoresParams,
  GetBeatmapsParams,
  GetMultiplayerLobbyParams,
  GetReplayByBeatmapAndUserIdParams,
  GetReplayByScoreIdParams,
  GetUserParams,
  GetUserScoresParams,
  LegacyMultiplayerLobby,
  LegacyUser,
  LegacyUserBestScore,
  LegacyUserRecentScore
} from '../types/legacy';
import {
  GetBeatmapScoresValidParams,
  GetBeatmapsValidParams,
  GetUserScoresValidParams,
  GetUserValidParams,
  Replay,
  ResponseBeatmap,
  ResponseBeatmapScore,
  ResponseMultiplayerLobby,
  ResponseUser,
  ResponseUserBestScore,
  ResponseUserRecentScore,
  GetReplayValidParams
} from '../types/legacy/not-exported';
import { formatUrlParams, getEnumMods, getModsEnum, map } from '../utils';
import {
  GenresEnum,
  LanguagesEnum,
  ModesEnum,
  ScoringTypeEnum,
  StatusEnum,
  TeamColorEnum,
  TeamTypeEnum
} from '../utils/enums';
import { z } from 'zod';
import axios, { AxiosResponse } from 'axios';

export default class LegacyClient {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = z.string().parse(apiKey);
  }

  private async fetch<T>(endpoint: string, urlParams: Record<string, unknown>): Promise<T> {
    let params: string = formatUrlParams(urlParams);
    let url: string = `https://osu.ppy.sh/api/${endpoint}?k=${this.apiKey}${params}`;

    let resp: AxiosResponse = await axios.get(url, {
      headers: {
        'Accept-encoding': '*'
      }
    });
    let data: T = resp.data;

    return data;
  }

  /**
   * Makes a GET request to the `get_beatmaps` endpoint
   * @returns An array of beatmaps
   */
  public async getBeatmaps(params: GetBeatmapsParams): Promise<LegacyBeatmap[]> {
    let parsed = getBeatmapsParamsSchema.parse(params);
    let mods: Mod[] = parsed.mods ? parsed.mods : [];
    let diffIncreaseMods: Mod[] = mods.filter((mod: Mod): boolean => {
      return ['HD', 'HR', 'DT', 'FL', 'FI'].includes(mod);
    });
    let validParams: GetBeatmapsValidParams = {
      ...parsed,
      since: parsed.since?.toISOString().slice(0, 19).replace('T', ' '),
      m: parsed.m && ModesEnum[parsed.m],
      a: Number(parsed.a),
      mods: getModsEnum(diffIncreaseMods)
    };

    let beatmaps: ResponseBeatmap[] = await this.fetch('get_beatmaps', validParams);
    return beatmaps.map((beatmap) => {
      return map({
        ...beatmap,
        approved: StatusEnum[Number(beatmap.approved)],
        genre: GenresEnum[Number(beatmap.genre_id)],
        language: LanguagesEnum[Number(beatmap.language_id)],
        mode: ModesEnum[Number(beatmap.mode)],
        storyboard: beatmap.storyboard === '1',
        video: beatmap.video === '1',
        download_available: beatmap.download_unavailable === '0',
        audio_available: beatmap.audio_unavailable === '0',
        tags: beatmap.tags.split(' ')
      });
    });
  }

  /**
   * Makes a GET request to the `get_user` endpoint
   * @returns A user if it exists, otherwise null
   */
  public async getUser(params: GetUserParams): Promise<LegacyUser | null> {
    let parsed = getUserParamsSchema.parse(params);
    let validParams: GetUserValidParams = {
      ...parsed,
      m: parsed.m && ModesEnum[parsed.m]
    };

    let users: ResponseUser[] = await this.fetch('get_user', validParams);
    return users.length > 0 ? map(users[0]) : null;
  }

  /**
   * Makes a GET request to the `get_scores` endpoint
   * @returns An array of scores on a beatmap
   */
  public async getBeatmapScores(params: GetBeatmapScoresParams): Promise<LegacyBeatmapScore[]> {
    let parsed = getBeatmapScoresParamsSchema.parse(params);
    let validParams: GetBeatmapScoresValidParams = {
      ...parsed,
      m: parsed.m && ModesEnum[parsed.m]
    };

    let scores: ResponseBeatmapScore[] = await this.fetch('get_scores', validParams);
    return scores.map((score) => {
      return map({
        ...score,
        replay_available: score.replay_available === '1',
        enabled_mods: getEnumMods(score.enabled_mods),
        perfect: score.perfect === '1'
      });
    });
  }

  private async getUserScores(
    type: 'best' | 'recent',
    params: GetUserScoresParams
  ): Promise<(LegacyUserBestScore | LegacyUserRecentScore)[]> {
    let parsed = getUserScoresParamsSchema.parse(params);
    let validParams: GetUserScoresValidParams = {
      ...parsed,
      m: parsed.m && ModesEnum[parsed.m]
    };

    let scores: (ResponseUserBestScore | ResponseUserRecentScore)[] = await this.fetch(
      `get_user_${type}`,
      validParams
    );

    if (type === 'best') {
      let userScores = scores as ResponseUserBestScore[];

      return userScores.map((score) => {
        return map({
          ...score,
          perfect: score.perfect === '1',
          enabled_mods: getEnumMods(score.enabled_mods),
          replay_available: score.replay_available === '1'
        });
      });
    } else {
      let userScores = scores as ResponseUserRecentScore[];

      return userScores.map((score) => {
        return map({
          ...score,
          perfect: score.perfect === '1',
          enabled_mods: getEnumMods(score.enabled_mods)
        });
      });
    }
  }

  /**
   * Makes a GET request to the `get_user_best` endpoint
   * @returns An array of a user's top scores
   */
  public async getUserBestScores(params: GetUserScoresParams): Promise<LegacyUserBestScore[]> {
    return (await this.getUserScores('best', params)) as LegacyUserBestScore[];
  }

  /**
   * Makes a GET request to the `get_user_recent` endpoint
   * @returns An array of a user's most recent scores in 24 hours
   */
  public async getUserRecentScores(params: GetUserScoresParams): Promise<LegacyUserRecentScore[]> {
    return (await this.getUserScores('recent', params)) as LegacyUserRecentScore[];
  }

  /**
   * Makes a GET request to the `get_match` endpoint
   * @returns An array of scores on a beatmap
   */
  public async getMultiplayerLobby(
    params: GetMultiplayerLobbyParams
  ): Promise<LegacyMultiplayerLobby | null> {
    let parsed = getMultiplayerLobbyParamsSchema.parse(params);
    let mpLobby: ResponseMultiplayerLobby = await this.fetch('get_match', parsed);

    if (!mpLobby.match) return null;

    return map({
      ...mpLobby,
      games: mpLobby.games.map((game) => {
        return {
          ...game,
          play_mode: ModesEnum[Number(game.play_mode)],
          scoring_type: ScoringTypeEnum[Number(game.scoring_type)],
          team_type: TeamTypeEnum[Number(game.team_type)],
          mods: getEnumMods(game.mods),
          scores: game.scores.map((score) => {
            delete score.rank;

            return {
              ...score,
              team: score.team === '0' ? null : TeamColorEnum[Number(score.team)],
              perfect: score.perfect === '1',
              pass: score.pass === '1',
              enabled_mods: getEnumMods(score.enabled_mods)
            };
          })
        };
      })
    });
  }

  /**
   * Makes a GET request to the `get_replay`
   * @param by Get replay by `score id` or `user & beatmap id`
   * @returns A string containing the Base64 encoded replay
   */
  public async getReplay<T extends 'score id' | 'user & beatmap id'>(
    by: T,
    params: T extends 'score id' ? GetReplayByScoreIdParams : GetReplayByBeatmapAndUserIdParams
  ) {
    let parsed =
      by === 'score id'
        ? getReplayByScoreIdParamsSchema.parse(params)
        : getReplayByBeatmapAndUserIdParamsSchema.parse(params);
    
    let validParams: GetReplayValidParams<
      GetReplayByScoreIdParams | GetReplayByBeatmapAndUserIdParams
    > = {
      ...parsed,
      m: parsed.m && ModesEnum[parsed.m],
      mods: getModsEnum(parsed.mods ?? [])
    };

    let replay: Replay = await this.fetch('get_replay', validParams);
    return replay.error ? null : replay.content;
  }
}
