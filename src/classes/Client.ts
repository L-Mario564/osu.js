import { searchOptionsSchema } from '../schemas';
import { SearchResults } from '../types';
import { SearchOptions, Options } from '../types/options';
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

  constructor(accessToken: string) {
    let token = accessToken;
    super(token);

    this.beatmaps = new Beatmaps(token);
    this.beatmapsetDiscussions = new BeatmapsetDiscussions(token);
    this.changelog = new Changelog(token);
    this.chat = new Chat(token);
    this.comments = new Comments(token);
    this.forum = new Forum(token);
    this.multiplayer = new Multiplayer(token);
    this.news = new News(token);
    this.ranking = new Ranking(token);
    this.users = new Users(token);
    this.wiki = new Wiki(token);
  }

  /**
   * Makes a GET request to the `/search` endpoint
   * @returns Users and wiki pages as results
   */
  public async search(options?: SearchOptions): Promise<SearchResults> {
    options = searchOptionsSchema.parse(options);
    return await this.fetch('search', 'GET', options);
  }

  /**
   * Make a GET request to an undocumented endpoint
   * @param endpoint The endpoint to make a request to
   */
  public async getUndocumented<T>(endpoint: string, options?: Options): Promise<T> {
    return await this.fetch(endpoint, 'GET', options);
  }
}
