import Base from './Base';
import { MultiplayerScores } from '../types';
import { GetPlaylistScoresOptions } from '../types/options';
import { getPlaylistScoresOptionsSchema } from '../schemas/multiplayer';
import { z } from 'zod';

export default class Multiplayer extends Base {
  constructor(accessToken: string) {
    super(accessToken);
  }

  /**
   * Makes a GET request to the `/rooms/{room}/playlist/{playlist}/scores` endpoint
   * @param room ID of the room corresponding to the playlist
   * @param playlist ID of the playlist to get scores from
   * @returns An object containing playlist scores and metadata
   */
  public async getPlaylistScores(
    room: number,
    playlist: number,
    options?: GetPlaylistScoresOptions
  ): Promise<MultiplayerScores> {
    room = z.number().parse(room);
    playlist = z.number().parse(playlist);
    options = getPlaylistScoresOptionsSchema.parse(options);

    return await this.fetch(`rooms/${room}/playlist/${playlist}/scores`, 'GET', options);
  }
}
