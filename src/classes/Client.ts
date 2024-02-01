import { searchOptionsSchema } from '../schemas';
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
 */
export default class Client extends Base {
  public beatmaps: Beatmaps;
  public beatmapsetDiscussions: BeatmapsetDiscussions;
  public changelog: Changelog;
  public chat: Chat;
  public comments: Comments;
  public forum: Forum;
  public multiplayer: Multiplayer;
  public news: News;
  public ranking: Ranking;
  public users: Users;
  public wiki: Wiki;

  /**
   * @param accessToken OAuth access token
   * @param options.polyfillFetch In case developing with a Node.js version prior to 18, you need to pass a polyfill for the fetch API. Install `node-fetch`
   */
  constructor(accessToken: string, options?: {
    polyfillFetch?: typeof fetch | typeof polyfillFetch;
  }) {
    let token = accessToken;
    super(token, options);

    this.beatmaps = new Beatmaps(token, options);
    this.beatmapsetDiscussions = new BeatmapsetDiscussions(token, options);
    this.changelog = new Changelog(token, options);
    this.chat = new Chat(token, options);
    this.comments = new Comments(token, options);
    this.forum = new Forum(token, options);
    this.multiplayer = new Multiplayer(token, options);
    this.news = new News(token, options);
    this.ranking = new Ranking(token, options);
    this.users = new Users(token, options);
    this.wiki = new Wiki(token, options);
  }

  /**
   * Makes a GET request to the `/search` endpoint
   * @returns Users and wiki pages as results
   */
  public async search(options?: SearchOptions): Promise<SearchResults> {
    options = searchOptionsSchema.optional().parse(options);
    return await this.request('search', 'GET', options);
  }

  /**
   * Make a GET request to an undocumented endpoint
   * @param endpoint The endpoint to make a request to
   */
  public async getUndocumented<T>(endpoint: string, options?: Omit<Options, 'body'>): Promise<T> {
    return await this.request(endpoint, 'GET', options);
  }
}
