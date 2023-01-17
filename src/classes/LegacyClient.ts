import axios, { AxiosResponse } from 'axios';
import { z } from 'zod';
import { GetBeatmapsParams, getBeatmapsParamsSchema, GetBeatmapsValidParams, GetScoresParams, getScoresParamsSchema, GetScoresValidParams, GetUserParams, getUserParamsSchema, GetUserValidParams } from '../schemas/v1';
import { AnyObject, Mod } from '../types';
import { Beatmap, BeatmapScore, ResponseBeatmap, ResponseBeatmapScore, ResponseUser, User } from '../types/v1';
import { getModsEnum, map } from '../utils';
import { ModesEnum } from '../utils/enums';

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
  private async fetch<T>(endPoint: string, urlParams: AnyObject): Promise<T> {
    let params: string = Object.entries(urlParams)
      .reduce((prev: string, [key, value]: [string, unknown]) => {
        return (!value) ? prev : `${prev}&${key}=${value}`;
      }, '');

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
    let parsed: GetBeatmapsParams = getBeatmapsParamsSchema.parse(params);
    let mods: Mod[] = (parsed.mods) ? parsed.mods : [];
    let diffIncreaseMods: Mod[] = mods.filter((mod: Mod): boolean => ['HD', 'HR', 'DT', 'FL', 'FI'].includes(mod));
    let validParams: GetBeatmapsValidParams = {
      ... parsed,
      since: parsed.since?.toISOString().slice(0, 19).replace('T', ' '),
      m: parsed.m && ModesEnum[parsed.m],
      a: (parsed.a) ? 1 : 0,
      mods: getModsEnum(diffIncreaseMods)
    };

    let beatmaps: ResponseBeatmap[] = await this.fetch('get_beatmaps', validParams);
    return beatmaps.map((beatmap: ResponseBeatmap): Beatmap => {
      return map({
        ... beatmap,
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
    let parsed: GetUserParams = getUserParamsSchema.parse(params);
    let validParams: GetUserValidParams = {
      ... parsed,
      m: parsed.m && ModesEnum[parsed.m]
    };
    
    let users: ResponseUser[] = await this.fetch('get_user', validParams);
    return (users.length > 0) ? map(users[0]) : null;
  }

  /**
   * Makes a GET request to the `get_scores` endpoint
   * @param params Object containing the parameters for the endpoint (excluding the API key)
   * @returns An array of scores on a beatmap
   */
  public async getScores(params: GetScoresParams): Promise<BeatmapScore[]> {
    let parsed: GetScoresParams = getScoresParamsSchema.parse(params);
    let validParams: GetScoresValidParams = {
      ... parsed,
      m: parsed.m && ModesEnum[parsed.m]
    };

    let scores: ResponseBeatmapScore[] = await this.fetch('get_scores', validParams);
    return scores.map((score: ResponseBeatmapScore): BeatmapScore => {
      return map({
        ... score,
        replay_available: score.replay_available === '1',
        perfect: score.perfect === '1',
      });
    });
  }


}