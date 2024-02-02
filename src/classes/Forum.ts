import Base from './Base';
import type polyfillFetch from 'node-fetch';
import type { Cursor, ForumPost, ForumPostBody, ForumTopic } from '../types';
import type {
  CreateTopicOptions,
  GetTopicOptions,
  ReplyToTopicOptions,
  UpdatePostOptions,
  UpdateTopicOptions
} from '../types/options';

/**
 * Class that wraps all forum related endpoints
 */
export default class Forum extends Base {
  /**
   * @param accessToken OAuth access token
   * @param options.polyfillFetch In case developing with a Node.js version prior to 18, you need to pass a polyfill for the fetch API. Install `node-fetch`
   */
  constructor(accessToken: string, options?: {
    polyfillFetch?: typeof polyfillFetch;
  }) {
    super(accessToken, options);
  }

  /**
   * Makes a POST request to the `/forums/topics/{topic}/reply` endpoint
   * 
   * Documentation: {@link https://osujs.mario564.com/current/reply-to-topic}
   * @param topic ID of the topic to reply to
   * @returns A forum post
   */
  public async replyToTopic(
    topic: number,
    options: ReplyToTopicOptions
  ): Promise<
    ForumPost & {
      body: ForumPostBody;
    }
  > {
    return await this.request(`forums/topics/${topic}/reply`, 'POST', options);
  }

  /**
   * Makes a POST request to the `/forums/topics` endpoint
   * 
   * Documentation: {@link https://osujs.mario564.com/current/create-topic}
   * @returns A forum topic and the post attached to it
   */
  public async createTopic(options: CreateTopicOptions): Promise<{
    topic: ForumTopic;
    post: ForumPost & {
      body: ForumPostBody;
    };
  }> {
    const poll = options.body.forum_topic_poll as Record<string, unknown> | undefined;
    let parsedPoll: Record<string, unknown> | undefined;

    if (poll) {
      parsedPoll = {};

      for (const key in poll) {
        parsedPoll[`forum_topic_poll[${key}]`] = poll[key];
      }
    }

    const parsed = {
      body: {
        ...options.body,
        ...parsedPoll
      }
    };

    delete parsed.body.forum_topic_poll;
    return await this.request('forums/topics', 'POST', parsed);
  }

  /**
   * Makes a GET request to the `/forums/topics/{topic}` endpoint
   * 
   * Documentation: {@link https://osujs.mario564.com/current/get-topic}
   * @param topic ID of the topic to get its data and posts from
   * @returns An object containing the cursor string, posts and the topic itself
   */
  public async getTopic(
    topic: number,
    options?: GetTopicOptions
  ): Promise<{
    cursor_string: Cursor;
    posts: (ForumPost & {
      body: ForumPostBody;
    })[];
    topic: ForumTopic;
  }> {
    return await this.request(`forums/topics/${topic}`, 'GET', options);
  }

  /**
   * Makes a PATCH request to the `/forums/topics/{topic}` endpoint
   * 
   * Documentation: {@link https://osujs.mario564.com/current/update-topic}
   * @param topic ID of the topic to update
   * @returns A forum topic
   */
  public async updateTopic(topic: number, options?: UpdateTopicOptions): Promise<ForumTopic> {
    const forumTopic = options?.body?.forum_topic as Record<string, unknown> | undefined;
    let parsedForumTopic: Record<string, unknown> | undefined;

    if (forumTopic) {
      parsedForumTopic = {};

      for (const key in forumTopic) {
        parsedForumTopic[`forum_topic[${key}]`] = forumTopic[key];
      }
    }

    const parsed = {
      // prettier-ignore
      body: options?.body
        ?
        {
          ...options.body,
          ...parsedForumTopic
        }
        : undefined
    };

    delete parsed.body?.forum_topic;
    return await this.request(`forums/topics/${topic}`, 'PATCH', parsed);
  }

  /**
   * Makes a PATCH request to the `/forums/posts/{post}` endpoint
   * 
   * Documentation: {@link https://osujs.mario564.com/current/update-post}
   * @param post ID of the post to update
   * @returns A forum post
   */
  public async updatePost(
    post: number,
    options: UpdatePostOptions
  ): Promise<
    ForumPost & {
      body: ForumPostBody;
    }
  > {
    return await this.request(`forums/posts/${post}`, 'PATCH', options);
  }
}
