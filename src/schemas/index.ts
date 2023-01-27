import { z } from 'zod';

export const baseQuery = {
  /** Limit number of results */
  limit: z.number(),
  /** Pagination offset */
  offset: z.string()
};

export const gameModeSchema = z.union([
  z.literal('fruits'),
  z.literal('mania'),
  z.literal('osu'),
  z.literal('taiko')
]);

export const searchOptionsSchema = z.object({
  query: z.object({
    mode: z.union([z.literal('all'), z.literal('user'), z.literal('wiki_page')]),
    query: z.string(),
    page: z.number()
  })
}).deepPartial().optional();