import Base from './Base';
import type polyfillFetch from 'node-fetch';
import type { MultiplayerScores } from '../types';
import type { GetPlaylistScoresOptions } from '../types/options';

/**
 * Class that wraps all multiplayer related endpoints
 */
export default class Multiplayer extends Base {
  /**
   * @param accessToken OAuth access token
   * @param options.polyfillFetch In case developing with a Node.js version prior to 18, you need to pass a polyfill for the fetch API. Install `node-fetch`
   */
  constructor(accessToken: string, options?: {
    polyfillFetch?: typeof fetch | typeof polyfillFetch;
  }) {
    super(accessToken, options);
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
    return await this.request(`rooms/${room}/playlist/${playlist}/scores`, 'GET', options);
  }
}
