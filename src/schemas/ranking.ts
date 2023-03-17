import { z } from 'zod';

export const rankingTypeSchema = z.union([
  z.literal('charts'),
  z.literal('country'),
  z.literal('performance'),
  z.literal('score')
]);

export const getRankingOptionsSchema = z
  .object({
    query: z.object({
      /** Filter by country code (only available for type `performance`) */
      country: z
        .string()
        .length(2)
        .transform((str) => str.toUpperCase()),
      /** Show all users or friend ranking */
      filter: z.union([z.literal('all'), z.literal('friends')]),
      /** ID of the spotlight (if type is `charts`) */
      spotlight: z.number(),
      /** Filter ranking by specified mode variant (only available for type `performance`) */
      variant: z.string()
    })
  })
  .deepPartial();
