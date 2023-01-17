

export default class Client {
  private accessToken: string;
  public beatmaps: any;
  public beatmapsets: any;
  public changelog: any;
  public chat: any;
  public comments: any;
  public forums: any;
  public search: any;
  public rooms: any;
  public news: any;
  public oauth: any;
  public rankings: any;
  public spotlights: any;
  public users: any;
  public wiki: any;
  public matches: any;
  public seasonalBackground: any;
  public scores: any;
  public friends: any;

  constructor(accessToken: string) {
    this.accessToken = accessToken;
    this.beatmaps = {
      // /beatmaps/lookup
      lookup: undefined,
      // /beatmaps/{beatmap}/scores/users/{user}
      getUserScore: undefined,
      // /beatmaps/{beatmap}/scores/users/{user}/all
      getUserScores: undefined,
      // /beatmaps/{beatmap}/scores
      getScores: undefined,
      // /beatmaps
      getList: undefined,
      // /beatmaps/{beatmap}
      get: undefined,
      // /beatmaps/{beatmap}/attributes
      getAttributes: undefined
    };
    this.beatmapsets = {
      discussions: {
        // /beatmapsets/discussions/votes
        getPosts: undefined,
        // /beatmapsets/discussions/posts
        getVotes: undefined,
        // /beatmapsets/discussions
        getList: undefined
      },
      events: {
        // /beatmapsets/events
        getList: undefined
      }
    };
    this.changelog = {
      // /changelog/{stream}/{build}
      getBuild: undefined,
      // /changelog
      get: undefined,
      // /changelog/{changelog}
      lookupBuild: undefined
    };
    this.chat = {
      // /chat/new
      createPM: undefined,
      // /chat/channels
      createChannel: undefined
    };
    this.comments = {
      // /comments
      getList: undefined,
      // /comments/{comment}
      get: undefined
    };
    this.forums = {
      
    };
  }
}