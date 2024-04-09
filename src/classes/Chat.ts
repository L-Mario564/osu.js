import Base from './Base';
import type polyfillFetch from 'node-fetch';
import type { Channel, ChatMessage } from '../types';
import type {
  CreateAnnounceChannelOptions,
  CreatePMChannelOptions,
  CreatePMOptions
} from '../types/options';

/**
 * Class that wraps all chat related endpoints
 */
export default class Chat<
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
   * Makes a POST request to the `/chat/new` endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/create-pm}
   * @returns An object containing the message sent and the channel it was sent to
   */
  public async createPM(options: CreatePMOptions): Promise<{
    channel: Channel;
    message: ChatMessage;
  }> {
    return await this.request('chat/new', 'POST', options);
  }

  /**
   * Makes a POST request to the `/chat/channels` endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/create-channel}
   * @param type Channel type to create or rejoin
   * @returns The created or rejoined channel
   */
  public async createChannel<T extends 'PM' | 'ANNOUNCE'>(
    type: T,
    options: T extends 'PM' ? CreatePMChannelOptions : CreateAnnounceChannelOptions
  ): Promise<Channel> {
    const remapped = {
      body: {
        ...options.body,
        type
      }
    };

    return await this.request('chat/channels', 'POST', remapped);
  }
}
