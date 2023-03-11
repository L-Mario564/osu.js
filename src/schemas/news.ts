import { z } from 'zod';

export const getNewsListingOptionsSchema = z
  .object({
    query: z.object({
      /** Limit number of results */
      limit: z.number(),
      /** Filter news posts by a specific year */
      year: z.number(),
      /** Pagination cursor */
      cursor_string: z.string()
    })
  })
  .deepPartial()
  .optional();

export const getNewsPostOptionsSchema = z
  .object({
    query: z.object({
      /** Specify whether the query must be done with a news post ID (`id`) or a slug (unset value) */
      key: z.literal('id')
    })
  })
  .deepPartial()
  .optional();
