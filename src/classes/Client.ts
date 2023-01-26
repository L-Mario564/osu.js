import Base from './Base';
import UserEndpoints from './UserEndpoints';

export default class Client extends Base {
  // public beatmaps: any;
  // public beatmapsets: any;
  // public changelog: any;
  // public chat: any;
  // public comments: any;
  // public forums: any;
  // public search: any;
  // public rooms: any;
  // public news: any;
  // public oauth: any;
  // public rankings: any;
  // public spotlights: any;
  public users: UserEndpoints;
  // public wiki: any;
  // public matches: any;
  // public seasonalBackground: any;
  // public scores: any;
  // public friends: any;

  constructor(accessToken: string) {
    super(accessToken);

    this.users = new UserEndpoints(accessToken);
  }
}
