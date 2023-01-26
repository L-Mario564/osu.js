import { z } from 'zod';
import {
  getSelfOptionsSchema,
  getUserBeatmapsOptionsSchema,
  getUserKudosuOptionsSchema,
  getUserOptionsSchema,
  getUserRecentScoresOptionsSchema,
  getUserScoresOptionsSchema,
  getUsersOptionsSchema,
  getUserRecentActivityOptionsSchema
} from '../schemas';

export type GetSelfOptions = z.infer<typeof getSelfOptionsSchema>;
export type GetUserKodosuOptions = z.infer<typeof getUserKudosuOptionsSchema>;
export type GetUserScoresOptions = z.infer<typeof getUserScoresOptionsSchema>;
export type GetUserRecentScoresOptions = z.infer<typeof getUserRecentScoresOptionsSchema>;
export type GetUserBeatmapsOptions = z.infer<typeof getUserBeatmapsOptionsSchema>;
export type GetUserRecentActivityOptions = z.infer<typeof getUserRecentActivityOptionsSchema>;
export type GetUserOptions = z.infer<typeof getUserOptionsSchema>;
export type GetUsersOptions = z.infer<typeof getUsersOptionsSchema>;

export interface Options {
  query?: Record<string, unknown>;
  body?: Record<string, unknown>;
}
