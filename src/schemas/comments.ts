import { z } from 'zod';

export const commentSortSchema = z.union([z.literal('new'), z.literal('old'), z.literal('top')]);

export const commentableTypeSchema = z.union([
  z.literal('beatmapset'),
  z.literal('news_post'),
  z.literal('build')
]);

export const getCommentsOptionsSchema = z
  .object({
    query: z
      .object({
        /** Resource to get comments for */
        commentable: z.object({
          /** Type of the resource */
          type: commentableTypeSchema,
          /** ID of the resource */
          id: z.number()
        }),
        /** Get replies of a specific comment ID */
        parent_id: z.number(),
        /** Sort option */
        sort: commentSortSchema
      })
  }).deepPartial();
