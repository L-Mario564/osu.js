import { z } from 'zod';
import { searchOptionsSchema } from '../schemas';
import { getCommentsOptionsSchema } from '../schemas/comments';
import {
  getSelfOptionsSchema,
  getUserBeatmapsOptionsSchema,
  getUserKudosuOptionsSchema,
  getUserOptionsSchema,
  getUserRecentScoresOptionsSchema,
  getUserScoresOptionsSchema,
  getUsersOptionsSchema,
  getUserRecentActivityOptionsSchema
} from '../schemas/users';

export interface Options {
  query?: Record<string, unknown>;
  body?: Record<string, unknown>;
}

export interface UndocumentedEndpointOptions {
  query: Record<string, unknown>;
  body: Record<string, unknown>;
}

export type GetSelfOptions = z.infer<typeof getSelfOptionsSchema>;
export type GetUserKodosuOptions = z.infer<typeof getUserKudosuOptionsSchema>;
export type GetUserScoresOptions = z.infer<typeof getUserScoresOptionsSchema>;
export type GetUserRecentScoresOptions = z.infer<typeof getUserRecentScoresOptionsSchema>;
export type GetUserBeatmapsOptions = z.infer<typeof getUserBeatmapsOptionsSchema>;
export type GetUserRecentActivityOptions = z.infer<typeof getUserRecentActivityOptionsSchema>;
export type GetUserOptions = z.infer<typeof getUserOptionsSchema>;
export type GetUsersOptions = z.infer<typeof getUsersOptionsSchema>;

export type GetCommentsOptions = z.infer<typeof getCommentsOptionsSchema>;

export type SearchOptions = z.infer<typeof searchOptionsSchema>;
