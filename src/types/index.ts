import { ModsEnum, StatusEnum } from '../utils/enums';
import { z } from 'zod';
import {
  gameModeSchema,
  getSelfOptionsSchema,
  getUserBeatmapsOptionsSchema,
  userBeatmapsTypeSchema,
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

export type Mod = keyof typeof ModsEnum;
export type Scope =
  | 'chat.write'
  | 'delegate'
  | 'forum.write'
  | 'friends.read'
  | 'identify'
  | 'public';

export interface Token {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export type GuestToken = Omit<Token, 'refresh_token'>;
export type GameMode = z.infer<typeof gameModeSchema>;
export type UserBeatmapsType = z.infer<typeof userBeatmapsTypeSchema>;
export type RankStatus = keyof typeof StatusEnum;
export type Playstyle = 'mouse' | 'keyboard' | 'tablet' | 'touch';
export type ProfilePage =
  | 'me'
  | 'recent_activity'
  | 'beatmaps'
  | 'historical'
  | 'kudosu'
  | 'top_ranks'
  | 'medals';
export type UserAccountHistoryType = 'note' | 'restriction' | 'silence';
export type KudosuAction = 'give' | 'vote.give' | 'reset' | 'vote.reset' | 'revoke' | 'vote.revoke';
export type Rank = 'SS' | 'SSH' | 'S' | 'SH' | 'A' | 'B' | 'C' | 'D' | 'F';
export type UserEventTypes =
  | 'achievement'
  | 'beatmapPlaycount'
  | 'beatmapsetApprove'
  | 'beatmapsetDelete'
  | 'beatmapsetRevive'
  | 'beatmapsetUpdate'
  | 'beatmapsetUpload'
  | 'rank'
  | 'rankLost'
  | 'userSupportAgain'
  | 'userSupportFirst'
  | 'userSupportGift'
  | 'usernameChange';
export type AchievementGrouping = 'Skill' | 'Hush-Hush' | 'Dedication' | 'Mod Introduction';
export type EventBeatmapsetApprovedType = 'ranked' | 'approved' | 'qualified' | 'loved';

export type UserCompact<T> = T & {
  avatar_url: string;
  country_code: string;
  default_group: string;
  id: number;
  is_active: boolean;
  is_bot: boolean;
  is_deleted: boolean;
  is_online: boolean;
  is_supporter: boolean;
  last_visit: string;
  pm_friends_only: boolean;
  profile_colour: string | null;
  username: string;
};

export interface Country {
  code: string;
  name: string;
}

export interface Cover {
  custom_url: string | null;
  url: string;
  id: string | null;
}

interface UserKudosu {
  available: number;
  total: number;
}

export type User<T> = T &
  UserCompact<{
    country: Country;
    cover: Cover;
  }> & {
    discord: string | null;
    has_supported: boolean;
    interests: string | null;
    join_date: string;
    kudosu: UserKudosu;
    location: string | null;
    max_blocks: number;
    max_friends: number;
    occupation: string | null;
    playmode: GameMode;
    playstyle: Playstyle[];
    post_count: number;
    profile_order: ProfilePage[];
    title: string | null;
    title_url: string | null;
    twitter: string | null;
    website: string | null;
  };

export interface UserAccountHistory {
  description: string | null;
  id: number;
  length: number;
  permanent: boolean;
  timestamp: string;
  type: UserAccountHistoryType;
}

export interface UserActiveTournamentBanner {
  id: number;
  tournament_id: number;
  image: string;
}

export interface UserBadge {
  awarded_at: string;
  description: string;
  image_url: string;
  url: string;
}

interface Page {
  html: string;
  raw: string;
}

type Group<T> = T & {
  colour: string | null;
  has_listing: boolean;
  has_playmodes: boolean;
  id: number;
  identifier: string;
  is_probationary: boolean;
  name: string;
  short_name: string;
};

export type UserGroup = Group<{
  playmodes: GameMode[] | null;
}>;

export interface MonthlyPlaycount {
  start_date: string;
  count: number;
}

export interface RankHighest {
  rank: number;
  updated_at: string;
}

export interface RankHistory {
  mode: GameMode;
  data: number[];
}

export interface GradeCounts {
  a: number;
  s: number;
  sh: number;
  ss: number;
  ssh: number;
}

export interface UserLevel {
  current: number;
  progress: number;
}

export type UserStatistics<T> = T & {
  grade_counts: GradeCounts;
  hit_accuracy: number;
  is_ranked: boolean;
  level: UserLevel;
  maximum_combo: number;
  play_count: number;
  play_time: number;
  pp: number;
  global_rank: number;
  ranked_score: number;
  replays_watched_by_others: number;
  total_hits: number;
  total_score: number;
  country_rank: number;
};

export interface UserAchievement {
  achieved_at: string;
  achievement_id: number;
}

export type UserExtended<T> = T &
  User<{
    account_history: UserAccountHistory[];
    active_tournament_banner: UserActiveTournamentBanner | null;
    badges: UserBadge[];
    beatmap_playcounts_count: number;
    favourite_beatmapset_count: number;
    follower_count: number;
    graveyard_beatmapset_count: number;
    groups: UserGroup[];
    loved_beatmapset_count: number;
    mapping_follower_count: number;
    monthly_playcounts: MonthlyPlaycount[];
    page: Page;
    pending_beatmapset_count: number;
    previous_usernames: string[];
    rank_highest: RankHighest | null;
    rank_history: RankHistory;
    ranked_beatmapset_count: number;
    replays_watched_counts: MonthlyPlaycount[];
    scores_best_count: number;
    scores_first_count: number;
    scores_recent_count: number;
    statistics: UserStatistics<unknown>;
    support_level: number;
    user_achievements: UserAchievement[];
  }>;

export interface Giver {
  url: string;
  username: string;
}

export interface Post {
  url: string | null;
  title: string;
}

export interface UserKudosuHistory {
  id: number;
  action: KudosuAction;
  amount: number;
  model: string;
  created_at: string;
  giver: Giver | null;
  post: Post;
}

export type StatisticsRulesets = Record<GameMode, UserStatistics<unknown> | undefined>;

export type BeatmapCompact<T> = T & {
  beatmapset_id: number;
  difficulty_rating: number;
  id: number;
  mode: GameMode;
  status: RankStatus;
  total_length: number;
  user_id: number;
  version: string;
};

export interface ScoreStatistics {
  count_50: number;
  count_100: number;
  count_300: number;
  count_geki: number;
  count_katu: number;
  count_miss: number;
}

export type Score<T> = T & {
  id: number;
  user_id: number;
  accuracy: number;
  mods: Mod[];
  score: number;
  max_combo: number;
  perfect: boolean;
  passed: boolean;
  pp: number;
  rank: Rank;
  created_at: string;
  mode: GameMode;
  mode_int: number;
  replay: boolean;
};

export interface Covers {
  'cover': string;
  'cover@2x': string;
  'card': string;
  'card@2x': string;
  'list': string;
  'list@2x': string;
  'slimcover': string;
  'slimcover@2x': string;
}

export type BeatmapsetCompact<T> = T & {
  artist: string;
  artist_unicode: string;
  covers: Covers;
  creator: string;
  favourite_count: number;
  id: number;
  nsfw: boolean;
  play_count: number;
  preview_url: string;
  source: string;
  status: RankStatus;
  title: string;
  title_unicode: string;
  user_id: string;
  video: boolean;
};

export type UserScore = Score<{
  beatmap: BeatmapCompact<{
    checksum: string | null;
  }>;
  beatmapset: BeatmapsetCompact<unknown>;
  user: UserCompact<unknown>;
}>;

export interface Weight {
  percentage: number;
  pp: number;
}

export type UserBestScore = UserScore &
  Score<{
    weight: Weight;
  }>;

export interface BeatmapsetAvailability {
  download_disabled: boolean;
  more_information: string | null;
}

export interface BeatmapsetHype {
  current: number;
  required: number;
}

export interface Beatmapset extends BeatmapsetCompact<unknown> {
  availability: BeatmapsetAvailability;
  bpm: number;
  can_be_hyped: boolean;
  creator: string;
  discussion_locked: boolean;
  hype: BeatmapsetHype | null;
  is_scoreable: boolean;
  last_updated: string;
  legacy_thread_url: string | null;
  nominations_summary: BeatmapsetHype;
  ranked: number;
  ranked_date: string | null;
  source: string;
  storyboard: boolean;
  submitted_date: string | null;
  tags: string;
}

export type Beatmap<T> = T &
  BeatmapCompact<{
    accuracy: number;
    ar: number;
    beatmapset_id: number;
    bpm: number | null;
    convert: boolean;
    count_circles: number;
    count_sliders: number;
    count_spinners: number;
    cs: number;
    deleted_at: string | null;
    drain: number;
    hit_length: number;
    is_scoreable: boolean;
    last_updated: string;
    mode_int: number;
    passcount: number;
    playcount: number;
    ranked: number;
    url: string;
  }>;

export interface BeatmapPlaycount {
  beatmap_id: number;
  beatmap: BeatmapCompact<unknown> | null;
  beatmapset: BeatmapsetCompact<unknown> | null;
  count: number;
}

export interface EventAchievement {
  icon_url: string;
  id: number;
  name: string;
  grouping: AchievementGrouping;
  ordering: number;
  slug: string;
  description: string;
  mode: GameMode | null;
  instructions: string;
}

export interface EventUser {
  username: string;
  url: string;
}

export interface EventBeatmap {
  title: string;
  url: string;
}

interface BaseUserEvent {
  created_at: string;
  id: number;
  type: UserEventTypes;
}

export interface UserEventAchievement extends BaseUserEvent {
  type: 'achievement';
  achievement: EventAchievement;
  user: EventUser;
}

export interface UserEventBeatmapPlaycount extends BaseUserEvent {
  type: 'beatmapPlaycount';
  beatmap: EventBeatmap;
  count: number;
}

export interface UserEventBeatmapsetApprove extends BaseUserEvent {
  type: 'beatmapsetApprove';
  approval: EventBeatmapsetApprovedType;
  beatmapset: EventBeatmap;
}

export interface UserEventBeatmapsetDelete extends BaseUserEvent {
  type: 'beatmapsetDelete';
  beatmapset: EventBeatmap;
}

export interface UserEventBeatmapsetUpdate extends BaseUserEvent {
  type: 'beatmapsetRevive' | 'beatmapsetUpdate' | 'beatmapsetUpload';
  beatmapset: EventBeatmap;
  user: EventUser;
}

interface UserEventRank extends BaseUserEvent {
  mode: GameMode;
  beatmap: EventBeatmap;
  user: EventUser;
}

export interface UserEventRankAchieved extends BaseUserEvent, UserEventRank {
  type: 'rank';
  scoreRank: Rank;
}

export interface UserEventRankLost extends BaseUserEvent, UserEventRank {
  type: 'rankLost';
}

export interface UserEventUserUpdate extends BaseUserEvent {
  type: 'userSupportAgain' | 'userSupportFirst' | 'userSupportGift';
  user: EventUser;
}

export interface UserEventUsernameUpdate extends BaseUserEvent {
  type: 'usernameChange';
  user: EventUser & {
    previousUsername: string | null;
  };
}

export type UserEvent =
  | UserEventAchievement
  | UserEventBeatmapPlaycount
  | UserEventBeatmapsetApprove
  | UserEventBeatmapsetDelete
  | UserEventBeatmapsetUpdate
  | UserEventRankAchieved
  | UserEventRankLost
  | UserEventUserUpdate
  | UserEventUsernameUpdate;
