import Base from './Base';
import {
  Beatmap,
  BeatmapsetCompact,
  BeatmapsetDiscussion,
  Cursor,
  DiscussionPost,
  DiscussionVote,
  UserCompact
} from '../types';
import {
  GetDiscussionPostsOptions,
  GetDiscussionsOptions,
  GetDiscussionVotesOptions
} from '../types/options';
import {
  getDiscussionPostsOptionsSchema,
  getDiscussionsOptionsSchema,
  getDiscussionVotesOptionsSchema
} from '../schemas/beatmapset-discussions';

export default class BeatmapsetDiscussions extends Base {
  constructor(accessToken: string) {
    super(accessToken);
  }

  /**
   * Makes a GET request to the `/beatmapsets/discussions/posts` endpoint
   * @returns An object containing a cursor and arrays of beatmapsets, users, discussions and posts
   */
  public async getDiscussionPosts(options?: GetDiscussionPostsOptions): Promise<{
    beatmapsets: BeatmapsetCompact[];
    cursor_string: Cursor;
    discussions: BeatmapsetDiscussion[];
    posts: DiscussionPost[];
    users: UserCompact[];
  }> {
    options = getDiscussionPostsOptionsSchema.optional().parse(options);
    return await this.fetch('beatmapsets/discussions/posts', 'GET', options);
  }

  /**
   * Makes a GET request to the `/beatmapsets/discussions/votes` endpoint
   * @returns An object containing a cursor and arrays of discussions, users and votes
   */
  public async getDiscussionVotes(options?: GetDiscussionVotesOptions): Promise<{
    cursor_string: Cursor;
    discussions: BeatmapsetDiscussion[];
    users: UserCompact[];
    votes: DiscussionVote[];
  }> {
    options = getDiscussionVotesOptionsSchema.optional().parse(options);
    return await this.fetch('beatmapsets/discussions/votes', 'GET', options);
  }

  /**
   * Makes a GET request to the `/beatmapsets/discussions` endpoint
   * @returns An object containing a cursor and arrays of beatmaps, discussions and users
   */
  public async getDiscussions(options?: GetDiscussionsOptions): Promise<{
    cursor_string: Cursor;
    users: UserCompact[];
    discussions: BeatmapsetDiscussion[];
    included_discussions: BeatmapsetDiscussion[];
    beatmapsets: BeatmapsetCompact[];
    beatmaps: (Beatmap & {
      checksum: string | null;
    })[];
    reviews_config: {
      max_blocks: number;
    };
  }> {
    options = getDiscussionsOptionsSchema.optional().parse(options);
    return await this.fetch('beatmapsets/discussions', 'GET', options);
  }
}
