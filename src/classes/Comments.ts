import Base from './Base';
import { CommentBundle } from '../types';
import { GetCommentsOptions } from '../types/options';
import { getCommentsOptionsSchema } from '../schemas/comments';
import { z } from 'zod';

export default class Comments extends Base {
  constructor(accessToken: string) {
    super(accessToken);
  }

  /**
   * Makes a GET request to the `comments` endpoint
   * @returns An object containing comments, users and other related data
   */
  public async getComments(options?: GetCommentsOptions): Promise<CommentBundle> {
    options = getCommentsOptionsSchema
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

    return await this.fetch('comments', 'GET', options);
  }

  /**
   * Makes a GET request to the `comments/{comment}` endpoint
   * @param comment ID of the comment to get related data from
   * @returns An object containing comments, users and other related data to the comment with the specified ID
   */
  public async getComment(comment: number): Promise<CommentBundle> {
    comment = z.number().parse(comment);
    return await this.fetch(`comments/${comment}`, 'GET');
  }
}
