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
