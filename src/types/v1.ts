import {
  ModesEnum,
  StatusEnum,
  GenresEnum,
  LanguagesEnum
} from '../utils/enums';

export type Mode = keyof typeof ModesEnum;
export type Status = keyof typeof StatusEnum;
export type Genre = keyof typeof GenresEnum;
export type Language = keyof typeof LanguagesEnum;
export type Scoring = 'score' | 'accuracy' | 'combo' | 'score v2';
export type Team = 'head to head' | 'tag co-op' | 'team' | 'tag team vs';
export type TeamColor = 'red' | 'blue' | null;
export type Rank = 'SS' | 'SSH' | 'S' | 'SH' | 'A';

export interface Beatmap {
  approved: Status;
  submit_date: Date;
  approved_date: Date;
  last_update: Date;
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
  genre_id: number;
  language_id: number;
  title: string;
  total_length: number;
  version: string;
  file_md5: string;
  mode: number;
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
    },
    'download_available' | 'audio_available'
  >,
  string
>;

export interface User {
  user_id: number;
  username: string;
  join_date: Date;
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
  events: ResponseEvent[]
}

export interface Event {
  display_html: string;
  beatmap_id: number;
  beatmapset_id: number;
  date: Date;
  epicfactor: number;
}

export type ResponseEvent = Record<keyof Event, string>

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
  enabled_mods: number;
}

export interface BeatmapScore extends BaseScore {
  score_id: number;
  username: string;
  user_id: number;
  date: Date;
  rank: Rank;
  pp: number;
  replay_available: boolean;
}

export type ResponseBeatmapScore = Record<keyof BeatmapScore, string>

export interface UserRecentScore extends BaseScore {
  beatmap_id: number;
  user_id: number;
  date: Date;
  rank: Rank;
}

export type ResponseUserRecentScore = Record<keyof UserRecentScore, string>

export interface UserBestScore extends UserRecentScore {
  score_id: number;
  pp: number;
  replay_available: boolean;
}

export type ResponseUserBestScore = Record<keyof UserBestScore, string>

export interface MultiplayerLobby {
  match: Match;
}

export interface Match {
  match_id: number;
  name: string;
  start_time: Date;
  end_time: Date | null;
}

export interface Game {
  game_id: number;
  start_time: Date;
  end_time: Date;
  beatmap_id: number;
  play_mode: Mode;
  scoring_type: Scoring;
  team_type: Team;
  mods: number;
  scores: Score[];
}

export interface Score extends Omit<BaseScore, 'enabled_mods'> {
  slot: number;
  team: TeamColor;
  user_id: number;
  pass: boolean;
  enabled_mods: number | null;
}

export interface Replay {
  content: string;
}
