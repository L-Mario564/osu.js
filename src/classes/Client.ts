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

export default class Client extends Base {
  // public beatmaps: any;
  // public beatmapsets: any;
  // public changelog: any;
  // public chat: any;
  public comments: Comments;
  // public forums: any;
  // public search: any;
  public multiplayer: Multiplayer;
  public news: News;
  public ranking: Ranking;
  public users: Users;
  public wiki: Wiki;
  // public matches: any;
  // public seasonalBackground: any;
  // public scores: any;
  // public friends: any;

  constructor(accessToken: string) {
    let t = accessToken;
    super(t);

    this.comments = new Comments(t);
    this.multiplayer = new Multiplayer(t);
    this.news = new News(t);
    this.ranking = new Ranking(t);
    this.users = new Users(t);
    this.wiki = new Wiki(t);
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
  public async getUndocumented<T>(endpoint: string, options?: UndocumentedEndpointOptions): Promise<T> {
    return await this.fetch(endpoint, 'GET', options);
  }
}
