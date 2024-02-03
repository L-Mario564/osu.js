import { Mod, RankStatus, Rank, GameMode } from '../';
import {
  GenresEnum,
  LanguagesEnum,
  ScoringTypeEnum,
  TeamTypeEnum,
  TeamColorEnum
} from '../../utils/enums';

/**
 * Timestamp string in ODBC canonical format
 */
export type ODBCTimestamp = string;

export type Genre = keyof typeof GenresEnum;
export type Language = keyof typeof LanguagesEnum;
export type ScoringType = keyof typeof ScoringTypeEnum;
export type TeamType = keyof typeof TeamTypeEnum;
export type TeamColor = keyof typeof TeamColorEnum;

type UserType = 'id' | 'string';

export interface GetBeatmapsParams {
  /** Beatmaps ranked or loved since this date (in UTC) */
  since?: Date;
  /** Beatmaps with a specific beatmapset ID */
  s?: number;
  /** Beatmap with a specific beatmap ID */
  b?: number;
  /** Beatmaps created by user with a specific user ID or username */
  u?: string | number;
  /** Specify if `u` is a user ID (`id`) or a username (`string`) */
  type?: UserType;
  /** Beatmaps from a specific gamemode */
  m?: GameMode;
  /** Include converted beatmaps? */
  a?: boolean;
  /** Beatmap with a specific hash */
  h?: string;
  /** Limit amount of beatmaps to return (500 max.) */
  limit?: number;
  /** Mods to apply */
  mods?: Mod[];
}

export interface GetUserParams {
  /** User with a specific user ID or username */
  u?: string | number;
  /** User gamemode profile */
  m?: GameMode;
  /** Specify if `u` is a user ID (`id`) or a username (`string`) */
  type?: UserType;
  /** Max. number of days between now and the last event's date (range: 1-31) */
  event_days?: number;
}

interface GetUserScoresBaseParams {
  /** Scores from a specific gamemode */
  m?: GameMode;
  /** Limit amount of scores to return (100 max.) */
  limit?: number;
  /** Specify if `u` is a user ID (`id`) or a username (`string`) */
  type?: UserType;
}

export interface GetBeatmapScoresParams extends GetUserScoresBaseParams {
  /** Scores from a beatmap with a specific beatmap ID */
  b: number;
  /** Scores from a user with a specific user ID or username */
  u?: string | number;
}

export interface GetUserScoresParams extends GetUserScoresBaseParams {
  /** Scores from a user with a specific user ID or username */
  u: string | number;
}

export interface GetMultiplayerLobbyParams {
  /** Match with a specific match ID */
  mp: number;
}

interface GetReplayBaseParams {
  /** Replay gamemode */
  m?: GameMode;
  /** Replay with a specific list of mods */
  mods?: Mod[];
}

export interface GetReplayByScoreIdParams extends GetReplayBaseParams {
  /** Replay from a score with a specific score ID */
  s: number;
}

export interface GetReplayByBeatmapAndUserIdParams extends GetReplayBaseParams {
  /** Replay from a beatmap with a specific beatmap ID */
  b: number;
  /** Replay from a user with a specific user ID or username */
  u: string | number;
  /** Specify if `u` is a user ID (`id`) or a username (`string`) */
  type?: UserType;
}

export interface LegacyBeatmap {
  approved: RankStatus;
  submit_date: ODBCTimestamp;
  approved_date: ODBCTimestamp;
  last_update: ODBCTimestamp;
  artist: string;
  beatmap_id: number;
  beatmapset_id: number;
  bpm: number;
  creator: string;
  creator_id: number;
  difficultyrating: number;
  diff_aim: number;
  diff_speed: number;
  diff_size: number;
  diff_overall: number;
  diff_approach: number;
  diff_drain: number;
  hit_length: number;
  source: string;
  genre: Genre;
  language: Language;
  title: string;
  total_length: number;
  version: string;
  file_md5: string;
  mode: GameMode;
  tags: string[];
  favourite_count: number;
  rating: number;
  playcount: number;
  passcount: number;
  count_normal: number;
  count_slider: number;
  count_spinner: number;
  max_combo: number;
  storyboard: boolean;
  video: boolean;
  download_available: boolean;
  audio_available: boolean;
}

export interface LegacyUser {
  user_id: number;
  username: string;
  join_date: ODBCTimestamp;
  count300: number;
  count100: number;
  count50: number;
  playcount: number;
  ranked_score: number;
  total_score: number;
  pp_rank: number;
  level: number;
  pp_raw: number;
  accuracy: number;
  count_rank_ss: number;
  count_rank_ssh: number;
  count_rank_s: number;
  count_rank_sh: number;
  count_rank_a: number;
  country: string;
  total_seconds_played: number;
  pp_country_rank: number;
  events: LegacyEvent[];
}

export interface LegacyEvent {
  display_html: string;
  beatmap_id: number;
  beatmapset_id: number;
  date: ODBCTimestamp;
  epicfactor: number;
}

// LegacyBaseScore in docs
interface BaseScore {
  score: number;
  count300: number;
  count100: number;
  count50: number;
  countmiss: number;
  maxcombo: number;
  countkatu: number;
  countgeki: number;
  perfect: boolean;
  enabled_mods: Mod[];
}

export interface LegacyBeatmapScore extends BaseScore {
  score_id: number;
  username: string;
  user_id: number;
  date: ODBCTimestamp;
  rank: Rank;
  pp: number;
  replay_available: boolean;
}

export interface LegacyUserRecentScore extends BaseScore {
  beatmap_id: number;
  user_id: number;
  date: ODBCTimestamp;
  rank: Rank;
}

export interface LegacyUserBestScore extends LegacyUserRecentScore {
  score_id: number;
  pp: number;
  replay_available: boolean;
}

export interface LegacyMultiplayerLobby {
  match: LegacyMatch;
  games: LegacyGame[];
}

export interface LegacyMatch {
  match_id: number;
  name: string;
  start_time: ODBCTimestamp;
  end_time: ODBCTimestamp | null;
}

export interface LegacyGame {
  game_id: number;
  start_time: ODBCTimestamp;
  end_time: ODBCTimestamp | null;
  beatmap_id: number;
  play_mode: GameMode;
  scoring_type: ScoringType;
  team_type: TeamType;
  mods: Mod[];
  scores: LegacyMatchScore[];
}

export interface LegacyMatchScore extends Omit<BaseScore, 'enabled_mods'> {
  slot: number;
  team: TeamColor | null;
  user_id: number;
  pass: boolean;
  enabled_mods: Mod[];
}
