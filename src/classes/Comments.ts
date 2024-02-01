import Base from './Base';
import { getCommentsOptionsSchema } from '../schemas/comments';
import { z } from 'zod';
import type polyfillFetch from 'node-fetch';
import type { CommentBundle } from '../types';
import type { GetCommentsOptions } from '../types/options';

/**
 * Class that wraps all comment related endpoints
 */
export default class Comments extends Base {
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
   * Makes a GET request to the `/comments` endpoint
   * @returns An object containing comments, users and other related data
   */
  public async getComments(options?: GetCommentsOptions): Promise<CommentBundle> {
    options = getCommentsOptionsSchema
      .optional()
      .transform((options) => {
        let query: Record<string, unknown> | undefined = options?.query;

        if (query?.commentable) {
          query = {
            ...query,
            commentable_type: options?.query?.commentable?.type,
            commentable_id: options?.query?.commentable?.id
          };

          delete query.commentable;
        }

        return { query };
      })
      .parse(options);

    return await this.request('comments', 'GET', options);
  }

  /**
   * Makes a GET request to the `/comments/{comment}` endpoint
   * @param comment ID of the comment to get related data from
   * @returns An object containing comments, users and other related data to the comment with the specified ID
   */
  public async getComment(comment: number): Promise<CommentBundle> {
    comment = z.number().parse(comment);
    return await this.request(`comments/${comment}`, 'GET');
  }
}
