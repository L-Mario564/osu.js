import { z } from 'zod';
import { Mod, RankStatus, Rank } from '.';
import {
  getBeatmapsParamsSchema,
  getUserParamsSchema,
  getBeatmapScoresParamsSchema,
  getUserScoresParamsSchema,
  getMultiplayerLobbyParamsSchema,
  getReplayByScoreIdParamsSchema,
  getReplayByBeatmapAndUserIdParamsSchema,
  getReplayParamsSchema
} from '../schemas/legacy';
import {
  ModesEnum,
  GenresEnum,
  LanguagesEnum,
  ScoringTypeEnum,
  TeamTypeEnum,
  TeamColorEnum
} from '../utils/enums';

/**
 * Timestamp string in ODBC canonical format
*/
export type ODBCTimestamp = string;

export type GetBeatmapsParams = z.infer<typeof getBeatmapsParamsSchema>;
export type GetBeatmapsValidParams = Omit<GetUserParams, 'm'> & {
  since?: string;
  m?: number;
  a?: number;
  mods?: number;
};

export type GetUserParams = z.infer<typeof getUserParamsSchema>;
export type GetUserValidParams = Omit<GetUserParams, 'm'> & {
  m?: number;
};

export type GetBeatmapScoresParams = z.infer<typeof getBeatmapScoresParamsSchema>;
export type GetBeatmapScoresValidParams = Omit<GetBeatmapScoresParams, 'm'> & {
  m?: number;
};

export type GetUserScoresParams = z.infer<typeof getUserScoresParamsSchema>;
export type GetUSerScoresValidParams = Omit<GetUserScoresParams, 'm'> & {
  m?: number;
};

export type GetMultiplayerLobbyParams = z.infer<typeof getMultiplayerLobbyParamsSchema>;

export type GetReplay = z.infer<typeof getReplayParamsSchema>;

export type GetReplayByScoreIdParams = z.infer<typeof getReplayByScoreIdParamsSchema>;

export type GetReplayByBeatmapAndUserIdParams = z.infer<
  typeof getReplayByBeatmapAndUserIdParamsSchema
>;

export type GetReplayValidParams<T> = Omit<T, 'm' | 'mods'> & {
  mods?: number;
  m?: number;
};

export type Mode = keyof typeof ModesEnum;
export type Genre = keyof typeof GenresEnum;
export type Language = keyof typeof LanguagesEnum;
export type ScoringType = keyof typeof ScoringTypeEnum;
export type TeamType = keyof typeof TeamTypeEnum;
export type TeamColor = keyof typeof TeamColorEnum;

export interface Beatmap {
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
  mode: Mode;
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

export type ResponseBeatmap = Record<
  keyof Omit<
    Beatmap & {
      download_unavailable: string;
      audio_unavailable: string;
      genre_id: string;
      language_id: string;
    },
    'download_available' | 'audio_available' | 'genre' | 'language'
  >,
  string
>;

export interface User {
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
  events: Event[];
}

export type ResponseUser = Omit<Record<keyof User, string>, 'events'> & {
  events: ResponseEvent[];
};

export interface Event {
  display_html: string;
  beatmap_id: number;
  beatmapset_id: number;
  date: ODBCTimestamp;
  epicfactor: number;
}

export type ResponseEvent = Record<keyof Event, string>;

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

export interface BeatmapScore extends BaseScore {
  score_id: number;
  username: string;
  user_id: number;
  date: ODBCTimestamp;
  rank: Rank;
  pp: number;
  replay_available: boolean;
}

export type ResponseBeatmapScore = Record<keyof BeatmapScore, string>;

export interface UserRecentScore extends BaseScore {
  beatmap_id: number;
  user_id: number;
  date: ODBCTimestamp;
  rank: Rank;
}

export type ResponseUserRecentScore = Record<keyof UserRecentScore, string>;

export interface UserBestScore extends UserRecentScore {
  score_id: number;
  pp: number;
  replay_available: boolean;
}

export type ResponseUserBestScore = Record<keyof UserBestScore, string>;

export interface MultiplayerLobby {
  match: Match;
  games: Game[];
}

export interface ResponseMultiplayerLobby {
  match: ResponseMatch;
  games: ResponseGame[];
}

export interface Match {
  match_id: number;
  name: string;
  start_time: ODBCTimestamp;
  end_time: ODBCTimestamp | null;
}

export type ResponseMatch = Omit<Record<keyof Match, string>, 'end_time'> & {
  end_time: string | null;
};

export interface Game {
  game_id: number;
  start_time: ODBCTimestamp;
  end_time: ODBCTimestamp;
  beatmap_id: number;
  play_mode: Mode;
  scoring_type: ScoringType;
  team_type: TeamType;
  mods: Mod[];
  scores: MatchScore[];
}

export type ResponseGame = Omit<Record<keyof Game, string>, 'scores'> & {
  scores: ResponseMatchScore[];
};

export interface MatchScore extends Omit<BaseScore, 'enabled_mods'> {
  slot: number;
  team: TeamColor | null;
  user_id: number;
  pass: boolean;
  enabled_mods: Mod[];
}

export type ResponseMatchScore = Omit<Record<keyof MatchScore, string>, 'enabled_mods'> & {
  enabled_mods: string | null;
  rank?: string;
};

export interface Replay {
  content: string;
  error?: string;
}
