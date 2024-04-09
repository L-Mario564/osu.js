import Base from './Base';
import Users from './Users';
import Wiki from './Wiki';
import Comments from './Comments';
import Multiplayer from './Multiplayer';
import Ranking from './Ranking';
import News from './News';
import Beatmaps from './Beatmaps';
import Changelog from './Changelog';
import Chat from './Chat';
import Forum from './Forum';
import BeatmapsetDiscussions from './BeatmapsetDiscussions';
import type polyfillFetch from 'node-fetch';
import type { SearchOptions, Options } from '../types/options';
import type { SearchResults } from '../types';

/**
 * Class that wraps all endpoints of the current API (API v2)
 *
 * Documentation: {@link https://osujs.mario564.com/current}
 */
export default class Client<
  TPolyfillFetch extends typeof polyfillFetch | undefined = undefined
> extends Base<TPolyfillFetch> {
  public beatmaps: Beatmaps<TPolyfillFetch>;
  public beatmapsetDiscussions: BeatmapsetDiscussions<TPolyfillFetch>;
  public changelog: Changelog<TPolyfillFetch>;
  public chat: Chat<TPolyfillFetch>;
  public comments: Comments<TPolyfillFetch>;
  public forum: Forum<TPolyfillFetch>;
  public multiplayer: Multiplayer<TPolyfillFetch>;
  public news: News<TPolyfillFetch>;
  public ranking: Ranking<TPolyfillFetch>;
  public users: Users<TPolyfillFetch>;
  public wiki: Wiki<TPolyfillFetch>;

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

    this.beatmaps = new Beatmaps(accessToken, options);
    this.beatmapsetDiscussions = new BeatmapsetDiscussions(accessToken, options);
    this.changelog = new Changelog(accessToken, options);
    this.chat = new Chat(accessToken, options);
    this.comments = new Comments(accessToken, options);
    this.forum = new Forum(accessToken, options);
    this.multiplayer = new Multiplayer(accessToken, options);
    this.news = new News(accessToken, options);
    this.ranking = new Ranking(accessToken, options);
    this.users = new Users(accessToken, options);
    this.wiki = new Wiki(accessToken, options);
  }

  /**
   * Set a new access token to be used by the current client.
   *
   * Documentation: {@link https://osujs.mario564.com/current/set-access-token}
   */
  public override setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
    this.beatmaps.setAccessToken(accessToken);
    this.beatmapsetDiscussions.setAccessToken(accessToken);
    this.changelog.setAccessToken(accessToken);
    this.chat.setAccessToken(accessToken);
    this.comments.setAccessToken(accessToken);
    this.forum.setAccessToken(accessToken);
    this.multiplayer.setAccessToken(accessToken);
    this.news.setAccessToken(accessToken);
    this.ranking.setAccessToken(accessToken);
    this.users.setAccessToken(accessToken);
    this.wiki.setAccessToken(accessToken);
  }

  /**
   * Makes a GET request to the `/search` endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/search}
   * @returns Users and wiki pages as results
   */
  public async search(options?: SearchOptions): Promise<SearchResults> {
    return await this.request('search', 'GET', options);
  }

  /**
   * Makes a DELETE request to the `/oauth/tokens/current` endpoint. Revokes the access token
   *
   * Documentation: {@link https://osujs.mario564.com/current/revoke-token}
   */
  public async revokeToken(): Promise<void> {
    await this.request('oauth/tokens/current', 'DELETE', {
      dontParseResp: true
    });
  }

  /**
   * Make a GET request to an undocumented endpoint
   *
   * Documentation: {@link https://osujs.mario564.com/current/get-undocumented}
   * @param endpoint The endpoint to make a request to
   */
  public async getUndocumented<T>(endpoint: string, options?: Omit<Options, 'body'>): Promise<T> {
    return await this.request(endpoint, 'GET', options);
  }
}
