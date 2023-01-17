import axios, { AxiosResponse } from 'axios';
import { z } from 'zod';
import {
  GetBeatmapScoresParams,
  getBeatmapScoresParamsSchema,
  GetBeatmapScoresValidParams,
  GetBeatmapsParams,
  getBeatmapsParamsSchema,
  GetBeatmapsValidParams,
  GetMultiplayerLobbyParams,
  getMultiplayerLobbyParamsSchema,
  GetReplayParams,
  getReplayParamsSchema,
  GetReplayValidParams,
  GetUserParams,
  getUserParamsSchema,
  GetUserScoresParams,
  getUserScoresParamsSchema,
  GetUSerScoresValidParams,
  GetUserValidParams
} from '../schemas/v1';
import { Mod } from '../types';
import {
  Beatmap,
  BeatmapScore,
  MultiplayerLobby,
  Replay,
  ResponseBeatmap,
  ResponseBeatmapScore,
  ResponseMultiplayerLobby,
  ResponseUser,
  ResponseUserBestScore,
  ResponseUserRecentScore,
  User,
  UserBestScore,
  UserRecentScore
} from '../types/v1';
import { getEnumMods, getModsEnum, map } from '../utils';
import { GenresEnum, LanguagesEnum, ModesEnum, ScoringTypeEnum, StatusEnum, TeamColorEnum, TeamTypeEnum } from '../utils/enums';

/**
 * Initialize an instance of the legacy API (API v1) client
 * @param apiKey Your osu! api key
 */
export default class Client {
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = z.string().parse(apiKey);
  }

  /**
   * Makes a fetch request to a specified endpoint
   * @param endPoint API endpoint to fetch from
   * @param urlParams Object containing parameters for the endpoint (excluding the API key)
   * @returns Response data
   */
  private async fetch<T>(endPoint: string, urlParams: Record<string, unknown>): Promise<T> {
    let params: string = Object.entries(urlParams).reduce(
      (prev: string, [key, value]: [string, unknown]) => {
        return !value ? prev : `${prev}&${key}=${value}`;
      },
      ''
    );

    let url: string = `https://osu.ppy.sh/api/${endPoint}?k=${this.apiKey}${params}`;

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
   * @param params Object containing the parameters for the endpoint (excluding the API key)
   * @returns An array of beatmaps
   */
  public async getBeatmaps(params: GetBeatmapsParams): Promise<Beatmap[]> {
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
   * @param params Object containing the parameters for the endpoint (excluding the API key)
   * @returns A user if it exists, otherwise null
   */
  public async getUser(params: GetUserParams): Promise<User | null> {
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
   * @param params Object containing the parameters for the endpoint (excluding the API key)
   * @returns An array of scores on a beatmap
   */
  public async getBeatmapScores(params: GetBeatmapScoresParams): Promise<BeatmapScore[]> {
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
  ): Promise<(UserBestScore | UserRecentScore)[]> {
    let parsed = getUserScoresParamsSchema.parse(params);
    let validParams: GetUSerScoresValidParams = {
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
   * @param params Object containing the parameters for the endpoint (excluding the API key)
   * @returns An array of a user's top scores
   */
  public async getUserBestScores(params: GetUserScoresParams): Promise<UserBestScore[]> {
    return (await this.getUserScores('best', params)) as UserBestScore[];
  }

  /**
   * Makes a GET request to the `get_user_recent` endpoint
   * @param params Object containing the parameters for the endpoint (excluding the API key)
   * @returns An array of a user's most recent scores in 24 hours
   */
  public async getUserRecentScores(params: GetUserScoresParams): Promise<UserRecentScore[]> {
    return (await this.getUserScores('recent', params)) as UserRecentScore[];
  }

  /**
   * Makes a GET request to the `get_match` endpoint
   * @param params Object containing the parameters for the endpoint (excluding the API key)
   * @returns An array of scores on a beatmap
   */
  public async getMultiplayerLobby(params: GetMultiplayerLobbyParams): Promise<MultiplayerLobby | null> {
    let parsed = getMultiplayerLobbyParamsSchema.parse(params);
    let mpLobby: ResponseMultiplayerLobby = await this.fetch('get_match', parsed);

    if (!mpLobby.match)
      return null;

    return map({
      ... mpLobby,
      games: mpLobby.games.map((game) => {
        return {
          ... game,
          play_mode: ModesEnum[Number(game.play_mode)],
          scoring_type: ScoringTypeEnum[Number(game.scoring_type)],
          team_type: TeamTypeEnum[Number(game.team_type)],
          mods: getEnumMods(game.mods),
          scores: game.scores.map((score) => {
            delete score.rank;

            return {
              ... score,
              team: (score.team === '0') ? null : TeamColorEnum[Number(score.team)],
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
   * Makes a GET request to the `get_replay` endpoint
   * @param params Object containing the parameters for the endpoint (excluding the API key)
   * @returns A string containing the Base64 encoded replay
   */
  public async getReplay(params: GetReplayParams): Promise<string | null> {
    let parsed = getReplayParamsSchema.parse(params);
    let validParams: GetReplayValidParams = {
      ...parsed,
      m: parsed.m && ModesEnum[parsed.m],
      mods: getModsEnum(parsed.mods ?? [])
    };

    let replay: Replay = await this.fetch('get_replay', validParams);
    return (replay.error) ? null : replay.content;
  }
}
