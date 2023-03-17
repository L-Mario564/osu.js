import Base from './Base';
import { Cursor, ForumPost, ForumPostBody, ForumTopic } from '../types';
import { z } from 'zod';
import { CreateTopicOptions, GetTopicOptions, ReplyToTopicOptions } from '../types/options';
import { createTopicOptionsSchema, getTopicOptionsSchema, replyToTopicOptionsSchema } from '../schemas/forum';

export default class Forum extends Base {
  constructor(accessToken: string) {
    super(accessToken);
  }

  /**
   * Makes a POST request to the `/forums/topics/{topic}/reply` endpoint
   * @param topic ID of the topic to reply to
   * @returns A forum post
   */
  public async replyToTopic(topic: number, options: ReplyToTopicOptions): Promise<ForumPost & {
    body: ForumPostBody;
  }> {
    topic = z.number().parse(topic);
    options = replyToTopicOptionsSchema.parse(options);
    return await this.fetch(`forums/topics/${topic}/reply`, 'POST', options);
  }

  /**
   * Makes a POST request to the `/forums/topics` endpoint
   * @returns A forum topic and the post attached to it
   */
  public async createTopic(options: CreateTopicOptions): Promise<{
    topic: ForumTopic;
    post: ForumPost & {
      body: ForumPostBody;
    };
  }> {
    options = createTopicOptionsSchema.parse(options);
    let poll = options.body.forum_topic_poll as Record<string, unknown> | undefined;
    let parsedPoll: Record<string, unknown> | undefined;

    if (poll) {
      parsedPoll = {};

      for (let key in poll) {
        parsedPoll[`forum_topic_poll[${key}]`] = poll[key];
      }
    }

    let parsed = {
      body: {
        ... options.body,
        ... parsedPoll
      }
    };

    delete parsed.body.forum_topic_poll;
    return await this.fetch('forums/topics', 'POST', parsed);
  }

  /**
   * Makes a GET request to the `/forums/topics/{topic}` endpoint
   * @param topic ID of the topic to get its data and posts from
   * @returns An object containing the cursor string, posts and the topic itself
   */
  public async getTopic(topic: number, options?: GetTopicOptions): Promise<{
    cursor_string: Cursor;
    posts: (ForumPost & {
      body: ForumPostBody;
    })[];
    topic: ForumTopic;
  }> {
    topic = z.number().parse(topic);
    options = getTopicOptionsSchema.parse(options);
    return await this.fetch(`forums/topics/${topic}/reply`, 'GET', options);
  }
}
