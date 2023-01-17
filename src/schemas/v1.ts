import { z } from 'zod';

const gameModeUnion = z
  .union([
    z.literal('std'),
    z.literal('taiko'),
    z.literal('ctb'),
    z.literal('mania')
  ])
  .optional();

const userTypeUnion = z
  .union([z.literal('string'), z.literal('id')])
  .optional();
  
const modsArray = z
  .array(
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
  )
  .optional();

export const getBeatmapsParamsSchema = z.object({
  /** Beatmaps ranked or loved since this date (in UTC) */
  since: z.date().optional(),
  /** Beatmaps with a specific beatmapset ID */
  s: z.number().optional(),
  /** Beatmap with a specific beatmap ID */
  b: z.number().optional(),
  /** Beatmaps created by user with a specific user ID */
  u: z.number().optional(),
  /** Specify if `u` is a user ID (`id`) or a username (`string`) */
  type: userTypeUnion,
  /** Beatmaps from a specific gamemode */
  m: gameModeUnion,
  /** Include converted beatmaps? */
  a: z.boolean().optional(),
  /** Beatmap with a specific hash */
  h: z.string().optional(),
  /** Limit amount of beatmaps to return (500 max.) */
  limit: z.number().gte(0).lte(500).optional(),
  /** Mods to apply */
  mods: modsArray
});

/**
 * Parameters for a GET request at the `get_beatmaps` endpoint
 */
export type GetBeatmapsParams = z.infer<typeof getBeatmapsParamsSchema>;
export type GetBeatmapsValidParams = Omit<GetUserParams, 'm'> & {
  since?: string
  m?: number
  a?: number
  mods?: number
}

export const getUserParamsSchema = z.object({
  /** User with a specific user ID */
  u: z.union([z.number(), z.string()]).optional(),
  /** User gamemode profile  */
  m: gameModeUnion,
  /** Specify if `u` is a user ID (`id`) or a username (`string`) */
  type: userTypeUnion,
  /** Max. number of days between now and the last event's date (range: 1-31) */
  event_days: z.number().gte(1).lte(31).optional()
});

/**
 * Parameters for a GET request at the `get_user` endpoint
 */
export type GetUserParams = z.infer<typeof getUserParamsSchema>;
export type GetUserValidParams = Omit<GetUserParams, 'm'> & {
  m?: number
}

let getUserScores = {
  /** Scores from a specific gamemode  */
  m: gameModeUnion,
  /** Limit amount of scores to return (100 max.) */
  limit: z.number().gte(1).lte(100).optional(),
  /** Specify if `u` is a user ID (`id`) or a username (`string`) */
  type: userTypeUnion
};

export const getScoresParamsSchema = z.object({
  ... getUserScores,
  /** Scores from a beatmap with a specific beatmap ID */
  b: z.number(),
  /** Scores from a user with a specific user ID */
  u: z.number().optional(),
});

/**
 * Parameters for a GET request at the `get_scores` endpoint
 */
export type GetScoresParams = z.infer<typeof getScoresParamsSchema>;
export type GetScoresValidParams = Omit<GetScoresParams, 'm'> & {
  m?: number
}

export const getUserScoresParamsSchema = z.object({
  ... getUserScores,
  /** Scores from a user with a specific user ID */
  u: z.number()
});

/**
 * Parameters for a GET request at the `get_user_best` and `get_user_recent` endpoints
 */
export type GetUserScorestParams = z.infer<typeof getUserScoresParamsSchema>;

export const getMatchParamsSchema = z.object({
  /** Match with a specific match ID */
  mp: z.number()
});

/**
 * Parameters for a GET request at the `get_match` endpoint
 */
export type GetMatchParams = z.infer<typeof getMatchParamsSchema>;

export const getReplayParamsSchema = z.object({
  /** Replay from a beatmap with a specific beatmap ID (required if `s` is undefined) */
  b: z.number().optional(),
  /** Replay from a user with a specific user ID (required if `s` is undefined) */
  u: z.number().optional(),
  /** Replay gamemode  */
  m: gameModeUnion,
  /** Replay from a score with a specific score ID (required if `b` and `u` are undefined) */
  s: z.number().optional(),
  /** Specify if `u` is a user ID (`id`) or a username (`string`) */
  type: userTypeUnion,
  /** Replay with a specific list of mods */
  mods: modsArray
});

/**
 * Parameters for a GET request at the `get_replay` endpoint
 */
export type GetReplayParams = z.infer<typeof getReplayParamsSchema>;
