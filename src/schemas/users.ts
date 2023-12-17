import { z } from 'zod';
import { baseQuery, gameModeSchema } from '.';

export const getSelfOptionsSchema = z
  .object({
    urlParams: z.object({
      /** Gamemode of the proile to return */
      mode: gameModeSchema
    })
  })
  .deepPartial();

export const getUserKudosuOptionsSchema = z
  .object({
    query: z.object(baseQuery)
  })
  .deepPartial();

export const userScoreTypeSchema = z.union([
  z.literal('best'),
  z.literal('firsts'),
  z.literal('recent')
]);

const getUserScoresOptions = {
  ...baseQuery,
  /** Gamemode of the scores to return */
  mode: gameModeSchema
};

export const getUserScoresOptionsSchema = z
  .object({
    query: z.object(getUserScoresOptions)
  })
  .deepPartial();

export const getUserRecentScoresOptionsSchema = z
  .object({
    query: z.object({
      ...getUserScoresOptions,
      /** Include failed scores? */
      include_fails: z.union([z.boolean(), z.number()])
    })
  })
  .deepPartial();

export const getUserBeatmapsOptionsSchema = z
  .object({
    query: z.object(baseQuery)
  })
  .deepPartial();

export const userBeatmapsTypeSchema = z.union([
  z.literal('favourite'),
  z.literal('graveyard'),
  z.literal('guest'),
  z.literal('loved'),
  z.literal('most_played'),
  z.literal('nominated'),
  z.literal('pending'),
  z.literal('ranked')
]);

export const getUserRecentActivityOptionsSchema = z
  .object({
    query: z.object(baseQuery)
  })
  .deepPartial();

export const getUserOptionsSchema = z
  .object({
    urlParams: z.object({
      /** Gamemode of the proile to return */
      mode: gameModeSchema
    }),
    query: z.object({
      /** Specify if the `user` param is an `id` or a `username` */
      key: z.union([z.literal('id'), z.literal('username')])
    })
  })
  .deepPartial();

export const getUsersOptionsSchema = z
  .object({
    query: z.object({
      /** An array of user IDs (can only take up to 50 IDs) */
      ids: z.number().array().max(50)
    })
  })
  .deepPartial();
