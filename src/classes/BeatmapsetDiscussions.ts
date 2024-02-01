import Base from './Base';
import {
  getDiscussionPostsOptionsSchema,
  getDiscussionsOptionsSchema,
  getDiscussionVotesOptionsSchema
} from '../schemas/beatmapset-discussions';
import type polyfillFetch from 'node-fetch';
import type {
  Beatmap,
  BeatmapsetCompact,
  BeatmapsetDiscussion,
  Cursor,
  DiscussionPost,
  DiscussionVote,
  UserCompact
} from '../types';
import type {
  GetDiscussionPostsOptions,
  GetDiscussionsOptions,
  GetDiscussionVotesOptions
} from '../types/options';

/**
 * Class that wraps all beatmapset discussion related endpoints
 */
export default class BeatmapsetDiscussions extends Base {
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
    return await this.request('beatmapsets/discussions/posts', 'GET', options);
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
    return await this.request('beatmapsets/discussions/votes', 'GET', options);
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
    return await this.request('beatmapsets/discussions', 'GET', options);
  }
}
