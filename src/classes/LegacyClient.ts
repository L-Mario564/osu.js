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
import type polyfillFetch from 'node-fetch';
import type { Mod } from '../types';
import type {
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
import type {
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

/**
 * Class that wraps all endpoints of the legacy API (API v1)
 */
export default class LegacyClient {
  private apiKey: string;
  private fetch: typeof fetch | typeof polyfillFetch;

  /**
   * @param apiKey API key
   * @param options.polyfillFetch In case developing with a Node.js version prior to 18, you need to pass a polyfill for the fetch API. Install `node-fetch`
   */
  constructor(apiKey: string, options?: {
    polyfillFetch?: typeof polyfillFetch;
  }) {
    if (typeof fetch === 'undefined' && !options?.polyfillFetch) {
      // TODO: Throw error
    }

    this.apiKey = apiKey;
    this.fetch = options?.polyfillFetch || fetch;
  }

  private async request<T>(endpoint: string, urlParams: Record<string, any>): Promise<T> {
    const params = formatUrlParams(urlParams);
    const url = `https://osu.ppy.sh/api/${endpoint}?k=${this.apiKey}${params}`;

    // TODO: Better error handling
    const resp = await this.fetch(url);
    const data = await resp.json() as T;

    return data;
  }

  /**
   * Makes a GET request to the `get_beatmaps` endpoint
   * @returns An array of beatmaps
   */
  public async getBeatmaps(params: GetBeatmapsParams): Promise<LegacyBeatmap[]> {
    const mods: Mod[] = params.mods ? params.mods : [];
    const diffIncreaseMods: Mod[] = mods.filter((mod: Mod): boolean => {
      return ['HD', 'HR', 'DT', 'FL', 'FI'].includes(mod);
    });
    const validParams: GetBeatmapsValidParams = {
      ...params,
      since: params.since?.toISOString().slice(0, 19).replace('T', ' '),
      m: params.m && ModesEnum[params.m],
      a: Number(params.a),
      mods: getModsEnum(diffIncreaseMods)
    };

    const beatmaps = await this.request<ResponseBeatmap[]>('get_beatmaps', validParams);

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
    const validParams: GetUserValidParams = {
      ...params,
      m: params.m && ModesEnum[params.m]
    };

    const users = await this.request<ResponseUser[]>('get_user', validParams);
    return users.length > 0 ? map(users[0]) : null;
  }

  /**
   * Makes a GET request to the `get_scores` endpoint
   * @returns An array of scores on a beatmap
   */
  public async getBeatmapScores(params: GetBeatmapScoresParams): Promise<LegacyBeatmapScore[]> {
    const validParams: GetBeatmapScoresValidParams = {
      ...params,
      m: params.m && ModesEnum[params.m]
    };

    const scores = await this.request<ResponseBeatmapScore[]>('get_scores', validParams);

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
    const validParams: GetUserScoresValidParams = {
      ...params,
      m: params.m && ModesEnum[params.m]
    };

    const scores = await this.request<(ResponseUserBestScore | ResponseUserRecentScore)[]>(`get_user_${type}`, validParams);

    if (type === 'best') {
      const userScores = scores as ResponseUserBestScore[];

      return userScores.map((score) => {
        return map({
          ...score,
          perfect: score.perfect === '1',
          enabled_mods: getEnumMods(score.enabled_mods),
          replay_available: score.replay_available === '1'
        });
      });
    } else {
      const userScores = scores as ResponseUserRecentScore[];

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
   * @returns An object containing the match's information, games and each games' scores if the multiplayer lobby exists, otherwise null
   */
  public async getMultiplayerLobby(
    params: GetMultiplayerLobbyParams
  ): Promise<LegacyMultiplayerLobby | null> {
    const mpLobby = await this.request<ResponseMultiplayerLobby>('get_match', params);

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
   * @returns A string containing the Base64 encoded replay if the replay exists, otherwise null
   */
  public async getReplay<T extends 'score id' | 'user & beatmap id'>(
    by: T,
    params: T extends 'score id' ? GetReplayByScoreIdParams : GetReplayByBeatmapAndUserIdParams
  ) {
    const validParams: GetReplayValidParams<
      GetReplayByScoreIdParams | GetReplayByBeatmapAndUserIdParams
    > = {
      ...params,
      m: params.m && ModesEnum[params.m],
      mods: getModsEnum(params.mods ?? [])
    };

    const replay = await this.request<Replay>('get_replay', validParams);
    return replay.error ? null : replay.content;
  }
}
