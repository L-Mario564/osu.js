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

export const modsSchema = z.array(
  z.union([
    z.literal('NF'),
    z.literal('EZ'),
    z.literal('TD'),
    z.literal('HD'),
    z.literal('HR'),
    z.literal('SD'),
    z.literal('DT'),
    z.literal('RX'),
    z.literal('HT'),
    z.literal('NC'),
    z.literal('FL'),
    z.literal('AT'),
    z.literal('SO'),
    z.literal('AP'),
    z.literal('PF'),
    z.literal('FI'),
    z.literal('RN'),
    z.literal('CN'),
    z.literal('TR'),
    z.literal('KC'),
    z.literal('SV2'),
    z.literal('MR'),
    z.literal('K1'),
    z.literal('K2'),
    z.literal('K3'),
    z.literal('K4'),
    z.literal('K5'),
    z.literal('K6'),
    z.literal('K7'),
    z.literal('K8'),
    z.literal('K9')
  ])
);

export const searchOptionsSchema = z
  .object({
    query: z.object({
      mode: z.union([z.literal('all'), z.literal('user'), z.literal('wiki_page')]),
      query: z.string(),
      page: z.number()
    })
  })
  .deepPartial()
  .optional();
