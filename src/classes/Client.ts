import { searchOptionsSchema } from '../schemas';
import { SearchResults } from '../types';
import { SearchOptions, UndocumentedEndpointOptions } from '../types/options';
import Base from './Base';
import Users from './Users';
import Wiki from './Wiki';
import Comments from './Comments';
import Multiplayer from './Multiplayer';
import Ranking from './Ranking';
import News from './News';
import Beatmaps from './Beatmaps';
import Changelog from './Changelog';

export default class Client extends Base {
  public beatmaps: Beatmaps;
  // public beatmapsets: any;
  public changelog: Changelog;
  // public chat: any;
  public comments: Comments;
  // public forums: any;
  public multiplayer: Multiplayer;
  public news: News;
  public ranking: Ranking;
  public users: Users;
  public wiki: Wiki;

  constructor(accessToken: string) {
    let token = accessToken;
    super(token);

    this.beatmaps = new Beatmaps(token);
    this.changelog = new Changelog(token);
    this.comments = new Comments(token);
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
  public async getUndocumented<T>(
    endpoint: string,
    options?: UndocumentedEndpointOptions
  ): Promise<T> {
    return await this.fetch(endpoint, 'GET', options);
  }
}
