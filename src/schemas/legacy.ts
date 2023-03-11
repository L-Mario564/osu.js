import { z } from 'zod';
import { modsSchema } from '.';

const gameModeUnion = z
  .union([z.literal('STD'), z.literal('Taiko'), z.literal('CTB'), z.literal('Mania')])
  .optional();

const userTypeSchema = z.union([z.literal('string'), z.literal('id')]).optional();

export const getBeatmapsParamsSchema = z.object({
  /** Beatmaps ranked or loved since this date (in UTC) */
  since: z.date().optional(),
  /** Beatmaps with a specific beatmapset ID */
  s: z.number().optional(),
  /** Beatmap with a specific beatmap ID */
  b: z.number().optional(),
  /** Beatmaps created by user with a specific user ID or username */
  u: z.union([z.string(), z.number()]).optional(),
  /** Specify if `u` is a user ID (`id`) or a username (`string`) */
  type: userTypeSchema,
  /** Beatmaps from a specific gamemode */
  m: gameModeUnion,
  /** Include converted beatmaps? */
  a: z.boolean().optional(),
  /** Beatmap with a specific hash */
  h: z.string().optional(),
  /** Limit amount of beatmaps to return (500 max.) */
  limit: z.number().gte(0).lte(500).optional(),
  /** Mods to apply */
  mods: modsSchema.optional()
});

export const getUserParamsSchema = z.object({
  /** User with a specific user ID or username */
  u: z.union([z.string(), z.number()]).optional(),
  /** User gamemode profile  */
  m: gameModeUnion,
  /** Specify if `u` is a user ID (`id`) or a username (`string`) */
  type: userTypeSchema,
  /** Max. number of days between now and the last event's date (range: 1-31) */
  event_days: z.number().gte(1).lte(31).optional()
});

let getUserScores = {
  /** Scores from a specific gamemode  */
  m: gameModeUnion,
  /** Limit amount of scores to return (100 max.) */
  limit: z.number().gte(1).lte(100).optional(),
  /** Specify if `u` is a user ID (`id`) or a username (`string`) */
  type: userTypeSchema
};

export const getBeatmapScoresParamsSchema = z.object({
  ...getUserScores,
  /** Scores from a beatmap with a specific beatmap ID */
  b: z.number(),
  /** Scores from a user with a specific user ID or username */
  u: z.union([z.string(), z.number()]).optional()
});

export const getUserScoresParamsSchema = z.object({
  ...getUserScores,
  /** Scores from a user with a specific user ID or username */
  u: z.union([z.string(), z.number()])
});

export const getMultiplayerLobbyParamsSchema = z.object({
  /** Match with a specific match ID */
  mp: z.number()
});

let getReplayParams = {
  /** Replay gamemode */
  m: gameModeUnion,
  /** Replay with a specific list of mods */
  mods: modsSchema.optional()
};

export const getReplayParamsSchema = z.object(getReplayParams);

export const getReplayByScoreIdParamsSchema = z.object({
  ...getReplayParams,
  /** Replay from a score with a specific score ID */
  s: z.number()
});

export const getReplayByBeatmapAndUserIdParamsSchema = z.object({
  ...getReplayParams,
  /** Replay from a beatmap with a specific beatmap ID */
  b: z.number(),
  /** Replay from a user with a specific user ID or username */
  u: z.union([z.string(), z.number()]),
  /** Specify if `u` is a user ID (`id`) or a username (`string`) */
  type: userTypeSchema
});
