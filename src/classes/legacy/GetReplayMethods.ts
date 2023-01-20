import Base from './Base';
import { GetReplay, GetReplayByBeatmapAndUserIdParams, getReplayByBeatmapAndUserIdParamsSchema, GetReplayByScoreIdParams, getReplayByScoreIdParamsSchema, GetReplayValidParams } from '../../schemas/legacy';
import { Replay as ReplayT } from '../../types/legacy';
import { getModsEnum } from '../../utils';
import { ModesEnum } from '../../utils/enums';

export default class GetReplayMethods extends Base {
  constructor(apiKey: string) {
    super(apiKey);
  }

  private async fetchReplay<T extends GetReplay>(params: T): Promise<string | null> {
    let validParams: GetReplayValidParams<T> = {
      ...params,
      m: params.m && ModesEnum[params.m],
      mods: getModsEnum(params.mods ?? [])
    };

    let replay: ReplayT = await this.fetch('get_replay', validParams);
    return replay.error ? null : replay.content;
  }

  /**
   * Makes a GET request to the `get_replay` endpoint (using a score ID)
   * @returns A string containing the Base64 encoded replay
   */
  public async byScoreId(params: GetReplayByScoreIdParams): Promise<string | null> {
    let parsed = getReplayByScoreIdParamsSchema.parse(params);
    return await this.fetchReplay(parsed);
  }

  /**
   * Makes a GET request to the `get_replay` endpoint (using a beatmap ID and a user ID or username)
   * @returns A string containing the Base64 encoded replay
   */
  public async byBeatmapAndUserId(params: GetReplayByBeatmapAndUserIdParams): Promise<string | null> {
    let parsed = getReplayByBeatmapAndUserIdParamsSchema.parse(params);
    return await this.fetchReplay(parsed);
  }
}