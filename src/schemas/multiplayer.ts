import { z } from 'zod';

export const multiplayerScoresSortSchema = z.union([
  z.literal('score_asc'),
  z.literal('score_desc')
]);

export const getPlaylistScoresOptionsSchema = z
  .object({
    query: z.object({
      /** Limit number of results */
      limit: z.number(),
      /** Sort option */
      sort: multiplayerScoresSortSchema,
      /** Pagination cursor */
      cursor_string: z.string()
    })
  })
  .deepPartial();
