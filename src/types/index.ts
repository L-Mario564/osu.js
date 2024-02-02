import type { OsuJSGeneralError, OsuJSUnexpectedResponseError } from '../classes/Errors';
import type { ModsEnum, StatusEnum } from '../utils/enums';

/**
 * Timestamp string in ISO 8601 format
*/
export type ISOTimestamp = string;
/**
 * Documentation: {@link https://osujs.mario564.com/extras/error-handling}
*/
export type OsuJSError = OsuJSGeneralError | OsuJSUnexpectedResponseError;
export type Cursor = string | null;

export type Mod = keyof typeof ModsEnum;
export type RankStatus = keyof typeof StatusEnum;

export type GameMode = 'fruits' | 'mania' | 'osu' | 'taiko';
export type UserBeatmapsType = 'favourite' | 'graveyard' | 'guest' | 'loved' | 'most_played' | 'nominated' | 'pending' | 'ranked';
export type CommentableType = 'beatmapset' | 'news_post' | 'build';
export type CommentSort = 'new' | 'old' | 'top';
export type MultiplayerScoresSort = 'score_asc' | 'score_desc';
export type RankingType = 'charts' | 'country' | 'performance' | 'score';
export type UserScoreType = 'best' | 'firsts' | 'recent';
export type ChangelogStream = 'stable40' | 'beta40' | 'cuttingedge' | 'lazer' | 'web';
export type DiscussionMessageType = 'suggestion' | 'problem' | 'mapper_note' | 'praise' | 'hype' | 'review';
export type Playstyle = 'mouse' | 'keyboard' | 'tablet' | 'touch';
export type Scope =
  | 'chat.write'
  | 'delegate'
  | 'forum.write'
  | 'friends.read'
  | 'identify'
  | 'public';
export type ProfilePageSection =
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
export type UserEventType =
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
export type SpotlightType = 'monthly' | 'spotlight' | 'theme' | 'special' | 'bestof';
export type ChannelType =
  | 'PUBLIC'
  | 'PRIVATE'
  | 'MULTIPLAYER'
  | 'SPECTATOR'
  | 'TEMPORARY'
  | 'PM'
  | 'GROUP'
  | 'ANNOUNCE';
export type ChatMessageType = 'action' | 'markdown' | 'plain';
export type ForumTopicType = 'normal' | 'sticky' | 'announcement';

export interface Token {
  token_type: string;
  expires_in: number;
  access_token: string;
  refresh_token: string;
}

export type GuestToken = Omit<Token, 'refresh_token'>;

export interface UserCompact {
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
}

export interface Country {
  code: string;
  name: string;
}

export interface Cover {
  custom_url: string | null;
  url: string;
  id: string | null;
}

export interface UserKudosu {
  available: number;
  total: number;
}

export interface User extends UserCompact {
  country: Country;
  cover: Cover;
  discord: string | null;
  has_supported: boolean;
  interests: string | null;
  join_date: ISOTimestamp;
  kudosu: UserKudosu;
  location: string | null;
  max_blocks: number;
  max_friends: number;
  occupation: string | null;
  playmode: GameMode;
  playstyle: Playstyle[];
  post_count: number;
  profile_order: ProfilePageSection[];
  title: string | null;
  title_url: string | null;
  twitter: string | null;
  website: string | null;
}

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
  awarded_at: ISOTimestamp;
  description: string;
  image_url: string;
  url: string;
}

export interface Page {
  html: string;
  raw: string;
}

export interface Group {
  colour: string | null;
  has_listing: boolean;
  has_playmodes: boolean;
  id: number;
  identifier: string;
  is_probationary: boolean;
  name: string;
  short_name: string;
}

export interface UserGroup extends Group {
  playmodes: GameMode[] | null;
}

export interface MonthlyPlaycount {
  start_date: ISOTimestamp;
  count: number;
}

export interface RankHighest {
  rank: number;
  updated_at: ISOTimestamp;
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

export interface UserStatistics {
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
}

export interface UserAchievement {
  achieved_at: ISOTimestamp;
  achievement_id: number;
}

export interface UserExtended extends User {
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
  statistics: UserStatistics;
  support_level: number;
  user_achievements: UserAchievement[];
}

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
  created_at: ISOTimestamp;
  giver: Giver | null;
  post: Post;
}

export type StatisticsRulesets = Record<GameMode, UserStatistics | undefined>;

export interface BeatmapCompact {
  beatmapset_id: number;
  difficulty_rating: number;
  id: number;
  mode: GameMode;
  status: RankStatus;
  total_length: number;
  user_id: number;
  version: string;
}

export interface ScoreStatistics {
  count_50: number;
  count_100: number;
  count_300: number;
  count_geki: number;
  count_katu: number;
  count_miss: number;
}

export interface Score {
  id: number;
  user_id: number;
  accuracy: number;
  mods: Mod[];
  score: number;
  max_combo: number;
  perfect: boolean;
  statistics: ScoreStatistics;
  passed: boolean;
  pp: number;
  rank: Rank;
  created_at: ISOTimestamp;
  mode: GameMode;
  mode_int: number;
  replay: boolean;
}

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

export interface BeatmapsetCompact {
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
}

export interface UserScore extends Score {
  beatmap: BeatmapCompact & {
    checksum: string | null;
  };
  beatmapset: BeatmapsetCompact;
  user: UserCompact;
}

export interface Weight {
  percentage: number;
  pp: number;
}

export interface UserBestScore extends UserScore, Score {
  weight: Weight;
}

export interface BeatmapsetAvailability {
  download_disabled: boolean;
  more_information: string | null;
}

export interface BeatmapsetHype {
  current: number;
  required: number;
}

export interface Beatmapset extends BeatmapsetCompact {
  availability: BeatmapsetAvailability;
  bpm: number;
  can_be_hyped: boolean;
  creator: string;
  discussion_locked: boolean;
  hype: BeatmapsetHype | null;
  is_scoreable: boolean;
  last_updated: ISOTimestamp;
  legacy_thread_url: string | null;
  nominations_summary: BeatmapsetHype;
  ranked: number;
  ranked_date: ISOTimestamp | null;
  source: string;
  storyboard: boolean;
  submitted_date: ISOTimestamp | null;
  tags: string;
}

export interface Beatmap extends BeatmapCompact {
  accuracy: number;
  ar: number;
  beatmapset_id: number;
  bpm: number | null;
  convert: boolean;
  count_circles: number;
  count_sliders: number;
  count_spinners: number;
  cs: number;
  deleted_at: ISOTimestamp | null;
  drain: number;
  hit_length: number;
  is_scoreable: boolean;
  last_updated: ISOTimestamp;
  mode_int: number;
  passcount: number;
  playcount: number;
  ranked: number;
  url: string;
}

export interface BeatmapPlaycount {
  beatmap_id: number;
  beatmap: BeatmapCompact | null;
  beatmapset: BeatmapsetCompact | null;
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
  created_at: ISOTimestamp;
  id: number;
  type: UserEventType;
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

export interface WikiPage {
  available_locales: string[];
  layout: string;
  locale: string;
  markdown: string;
  path: string;
  subtitle: string | null;
  tags: string[];
  title: string;
}

export type SearchResult<T> = {
  data: T[];
  total: number;
};

export interface SearchResults {
  user: SearchResult<UserCompact> | null;
  wiki_page: SearchResult<WikiPage> | null;
}

export interface CommentableMetadata {
  id: number;
  title: string;
  type: string;
  url: string;
}

export interface Comment {
  commentable_id: number;
  commentable_type: CommentableType;
  created_at: ISOTimestamp;
  deleted_at: ISOTimestamp | null;
  edited_at: ISOTimestamp | null;
  edited_by_id: number | null;
  id: number;
  legacy_name: string | null;
  message: string | null;
  message_html: string | null;
  parent_id: number | null;
  pinned: boolean;
  replies_count: number;
  updated_at: ISOTimestamp;
  user_id: number;
  votes_count: number;
}

export interface CommentBundle {
  commentable_meta: CommentableMetadata[];
  comments: Comment[];
  has_more: boolean;
  has_more_id: number | null;
  included_comments: Comment[];
  pinned_commnets: Comment[] | null;
  sort: CommentSort;
  top_level_count: number | null;
  total: number | null;
  user_follow: boolean;
  user_votes: number[];
  users: UserCompact[];
}

export interface MultiplayerScoresParams {
  limit: number;
  sort: MultiplayerScoresSort;
}

export interface MultiplayerScoreMod {
  acronym: Mod;
}

export interface MultiplayerScoreStatistics {
  Ok: number;
  Meh: number;
  Good: number;
  Miss: number;
  None: number;
  Great: number;
  Perfect: number;
  IgnoreHit: number;
  IgnoreMiss: number;
  LargeBonus: number;
  SmallBonus: number;
  LargeTickHit: number;
  SmallTickHit: number;
  LargeTickMiss: number;
  SmallTickMiss: number;
}

export interface MultiplayerScore {
  id: number;
  user_id: number;
  room_id: number;
  playlist_item_id: number;
  beatmap_id: number;
  rank: Rank;
  total_score: number;
  accuracy: number;
  max_combo: number;
  mods: MultiplayerScoreMod[];
  statistics: MultiplayerScoreStatistics;
  passed: boolean;
  position: number | null;
  user: UserCompact & {
    country: Country;
    cover: Cover;
  };
}

export interface MultiplayerScores {
  cursor_string: Cursor;
  params: MultiplayerScoresParams;
  scores: MultiplayerScore[];
  total: number | null;
  user_score: MultiplayerScore | null;
}

export interface Spotlight {
  end_date: ISOTimestamp;
  id: number;
  mode_specific: boolean;
  participant_count: number | null;
  name: string;
  start_date: ISOTimestamp;
  type: SpotlightType;
}

export interface Rankings {
  beatmapsets: Beatmapset[] | null;
  ranking: (UserStatistics & {
    user: UserCompact & {
      country: Country;
      cover: Cover;
    };
  })[];
  spotlight: Spotlight | null;
  total: number;
}

export interface NewsPost {
  author: string;
  edit_url: string;
  first_image: string | null;
  id: number;
  published_at: ISOTimestamp;
  slug: string;
  title: string;
  updated_at: ISOTimestamp;
}

export interface NewsSidebar {
  current_year: number;
  news_posts: NewsPost;
  years: number[];
}

export interface NewsSearch {
  limit: number;
  sort: 'published_desc';
}

export interface NewsListing {
  cursor_string: Cursor;
  news_posts: NewsPost & {
    preview: string;
  };
  news_sidebar: NewsSidebar;
  search: NewsSearch;
}

export interface NewsNavigation {
  newer: NewsPost | null;
  older: NewsPost | null;
}

export interface Fails {
  exit: number[] | null;
  fail: number[] | null;
}

export interface BeatmapUserScore {
  position: number;
  score: Score & {
    beatmap: Beatmap & {
      checksum: string | null;
    };
    user: UserCompact & {
      country: Country;
      cover: Cover;
    };
  };
}

interface BeatmapDifficultyAttributes {
  max_combo: number;
  star_rating: number;
  gamemode: GameMode;
}

export interface OsuBeatmapDifficultyAttributes extends BeatmapDifficultyAttributes {
  gamemode: 'osu';
  aim_difficulty: number;
  approach_rate: number;
  flashlight_difficulty: number;
  overall_difficulty: number;
  slider_factor: number;
  speed_difficulty: number;
}

export interface TaikoBeatmapDifficultyAttributes extends BeatmapDifficultyAttributes {
  gamemode: 'taiko';
  stamina_difficulty: number;
  rhythm_difficulty: number;
  colour_difficulty: number;
  approach_rate: number;
  great_hit_window: number;
}

export interface FruitsBeatmapDifficultyAttributes extends BeatmapDifficultyAttributes {
  gamemode: 'fruits';
  approach_rate: number;
}

export interface ManiaBeatmapDifficultyAttributes extends BeatmapDifficultyAttributes {
  gamemode: 'mania';
  great_hit_window: number;
  score_multiplier: number;
}

export interface UpdateStream {
  display_name: string | null;
  id: number;
  is_featured: boolean;
  name: string;
}

export interface Build {
  created_at: ISOTimestamp;
  display_version: string;
  id: number;
  update_stream: UpdateStream | null;
  users: number;
  version: string | null;
}

export interface BuildVersions {
  next: Build | null;
  previous: Build | null;
}

export interface ChangelogEntry {
  category: string;
  created_at: ISOTimestamp | null;
  github_pull_request_id: number | null;
  github_url: string | null;
  id: number | null;
  major: boolean;
  repository: string | null;
  title: string | null;
  type: string;
  url: string | null;
}

export interface GithubUser {
  display_name: string;
  github_url: string | null;
  id: number | null;
  osu_username: string | null;
  user_id: number | null;
  user_url: string | null;
}

export interface Channel {
  channel_id: number;
  name: string;
  description: string | null;
  icon: string | null;
  type: ChannelType;
  moderated: boolean;
  uuid: string | null;
}

export interface ChatMessage {
  channel_id: number;
  content: string;
  is_action: boolean;
  message_id: number;
  sender_id: number;
  timestamp: ISOTimestamp;
  type: ChatMessageType;
  uuid: string | null;
}

export interface ForumPost {
  created_at: ISOTimestamp;
  deleted_at: ISOTimestamp | null;
  edited_at: ISOTimestamp | null;
  edited_by_id: number | null;
  forum_id: number;
  id: number;
  topic_id: number;
  user_id: number;
}

export interface ForumPostBody {
  html: string;
  raw: string;
}

export interface ForumTopic {
  created_at: ISOTimestamp;
  deleted_at: ISOTimestamp | null;
  first_post_id: number;
  forum_id: number;
  id: number;
  is_locked: boolean;
  last_post_id: number;
  poll: ForumPoll | null;
  post_count: number;
  title: string;
  type: ForumTopicType;
  updated_at: ISOTimestamp;
  user_id: number;
}

export interface ForumPoll {
  allow_vote_change: boolean;
  ended_at: ISOTimestamp | null;
  hide_incomplete_results: boolean;
  last_vote_at: ISOTimestamp | null;
  max_votes: number;
  options: ForumPollOptions[];
  started_at: ISOTimestamp;
  title: {
    bbcode: string;
    html: string;
  };
  total_vote_count: number;
}

export interface ForumPollOptions {
  id: number;
  text: {
    bbcode: string;
    html: string;
  };
  vote_count: number | null;
}

export interface BeatmapsetDiscussion {
  beatmap_id: number | null;
  beatmapset_id: number | null;
  can_be_resolved: boolean;
  can_grant_kudosu: boolean;
  created_at: ISOTimestamp;
  deleted_at: ISOTimestamp | null;
  deleted_by_id: number | null;
  id: number;
  kudosu_denied: boolean;
  last_post_at: ISOTimestamp;
  message_type: DiscussionMessageType;
  parent_id: number | null;
  resolved: boolean;
  timestamp: number | null;
  updated_at: ISOTimestamp;
  user_id: number;
}

export interface DiscussionPost {
  beatmapset_discussion_id: number;
  created_at: ISOTimestamp;
  deleted_at: ISOTimestamp | null;
  deleted_by_id: number | null;
  id: number;
  last_editor_id: number | null;
  message: string;
  system: boolean;
  updated_at: ISOTimestamp;
  user_id: number;
}

export interface DiscussionVote {
  beatmapset_discussion_id: number;
  created_at: ISOTimestamp;
  id: number;
  score: number;
  updated_at: ISOTimestamp;
  user_id: number;
}
