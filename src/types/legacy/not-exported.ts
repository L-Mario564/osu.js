import { GetUserParams, GetBeatmapScoresParams, GetUserScoresParams, LegacyBeatmap, LegacyBeatmapScore, LegacyGame, LegacyMatch, LegacyMatchScore, LegacyUser, LegacyUserBestScore, LegacyUserRecentScore, LegacyEvent } from '.';

export type GetBeatmapsValidParams = Omit<GetUserParams, 'm'> & {
  since?: string;
  m?: number;
  a?: number;
  mods?: number;
};

export type GetUserValidParams = Omit<GetUserParams, 'm'> & {
  m?: number;
};

export type GetBeatmapScoresValidParams = Omit<GetBeatmapScoresParams, 'm'> & {
  m?: number;
};

export type GetUserScoresValidParams = Omit<GetUserScoresParams, 'm'> & {
  m?: number;
};

export type ResponseBeatmap = Record<
  keyof Omit<
    LegacyBeatmap & {
      download_unavailable: string;
      audio_unavailable: string;
      genre_id: string;
      language_id: string;
    },
    'download_available' | 'audio_available' | 'genre' | 'language'
  >,
  string
>;

export type ResponseUser = Omit<Record<keyof LegacyUser, string>, 'events'> & {
  events: ResponseEvent[];
};

export type ResponseEvent = Record<keyof LegacyEvent, string>;
export type ResponseBeatmapScore = Record<keyof LegacyBeatmapScore, string>;
export type ResponseUserRecentScore = Record<keyof LegacyUserRecentScore, string>;
export type ResponseUserBestScore = Record<keyof LegacyUserBestScore, string>;

export interface ResponseMultiplayerLobby {
  match: ResponseMatch;
  games: ResponseGame[];
}

export type ResponseMatch = Omit<Record<keyof LegacyMatch, string>, 'end_time'> & {
  end_time: string | null;
};

export type ResponseGame = Omit<Record<keyof LegacyGame, string>, 'scores'> & {
  scores: ResponseMatchScore[];
};

export type ResponseMatchScore = Omit<Record<keyof LegacyMatchScore, string>, 'enabled_mods'> & {
  enabled_mods: string | null;
  rank?: string;
};

export interface Replay {
  content: string;
  error?: string;
}