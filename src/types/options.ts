import type {
  ChangelogStream,
  CommentSort,
  CommentableType,
  DiscussionMessageType,
  GameMode,
  Mod,
  MultiplayerScoresSort
} from '.';

export interface Options {
  query?: Record<string, any>;
  body?: Record<string, any> | string;
}

export interface LookupBeatmapOptions {
  query?: {
    /** A beatmap checksum */
    checksum?: string;
    /** A beatmap file name */
    filename?: string;
    /** ID of a beatmap */
    id?: number;
  };
}

export interface GetBeatmapScoresOptions {
  query?: {
    /** Gamemode of the scores to return */
    mode?: GameMode;
  };
}

export interface GetBeatmapsOptions {
  query?: {
    /** An array of beatmap IDs (can only take up to 50 IDs) */
    ids?: number[];
  };
}

export interface GetBeatmapAttributesOptions {
  body?: {
    /** Mods to apply (can be either the bitwise representation or an array of acronyms) */
    mods?: number | Mod[];
  };
}

interface GetDiscussionBaseQuery {
  /** Max. number of results */
  limit?: number;
  /** Search result page number */
  page?: number;
  /** Sort posts by newest (`id_desc`) or oldest (`id_desc`) */
  sort?: 'id_desc' | 'id_asc';
}

export interface GetDiscussionPostsOptions {
  query?: GetDiscussionBaseQuery & {
    /** ID of the beatmapset discussion */
    beatmapset_discussion_id?: number;
    /** Post types */
    types?: ('first' | 'reply' | 'system')[];
    /** ID of the user to get posts from */
    user?: number;
  };
}

export interface GetDiscussionVotesOptions {
  query?: GetDiscussionBaseQuery & {
    /** ID of the beatmapset discussion */
    beatmapset_discussion_id?: number;
    /** ID of the user receiving the votes */
    receiver?: number;
    /** `1` for up vote, `-1` for down vote */
    score?: 1 | -1;
    /** ID of the user giving votes */
    user?: number;
  };
}

export interface GetDiscussionsOptions {
  query?: GetDiscussionBaseQuery & {
    /** ID of the beatmap to get discussions from */
    beatmap_id?: number;
    /** ID of the beatmapset to get discussions from */
    beatmapset_id?: number;
    /** Specify beatmapset status */
    beatmapset_status?: 'all' | 'ranked' | 'qualified' | 'disqualified' | 'never_qualified';
    /** Specify message types, (unset for all) */
    message_types?: DiscussionMessageType[];
    /** Show only resolved issues? */
    only_unresolved?: boolean;
    /** ID of the user (documentation doesn't specify about what) */
    user?: number;
  };
}

export interface GetChangelogListingOptions {
  query?: {
    /** Minimum build version */
    from?: string;
    /** Maximum build ID */
    max_id?: number;
    /** Stream name to return builds from */
    stream?: ChangelogStream;
    /** Maximum build version */
    to?: string;
    /** Changelog entry format (returns both by default) */
    message_formats?: ('html' | 'markdown')[];
  };
}

export interface LookupChangelogBuildOptions {
  query?: {
    /** Unset to query by build version or stream name, or id to query by build ID */
    key?: 'id';
    /** Changelog entry format (returns both by default) */
    message_formats?: ('html' | 'markdown')[];
  };
}

export interface CreatePMOptions {
  body: {
    /** ID of the user to send a PM */
    target_id: number;
    /** Message to send */
    message: string;
    /** Is the message an action? */
    is_action: boolean;
    /** Client side message identifier which will be sent back in response and websocket JSON */
    uuid?: string;
  };
}

export interface CreatePMChannelOptions {
  body: {
    /** Message to send */
    message?: string;
    /** Channel details */
    channel?: {
      /** Channel name */
      name?: string;
      /** Channel description */
      description?: string;
    };
    /** Target user ID */
    target_id: number;
  };
}

export interface CreateAnnounceChannelOptions {
  body: {
    /** Message to send with the announcement */
    message: string;
    /** Channel details */
    channel: {
      /** Channel name */
      name: string;
      /** Channel description */
      description: string;
    };
    /** Target user IDs */
    target_ids: number[];
  };
}

export interface GetCommentsOptions {
  query?: {
    /** Resource to get comments for */
    commentable?: {
      /** Type of the resource */
      type?: CommentableType;
      /** ID of the resource */
      id?: number;
    };
    /** Get replies of a specific comment ID */
    parent_id?: number;
    /** Sort option */
    sort?: CommentSort;
  };
}

export interface ReplyToTopicOptions {
  body: {
    /** Content of the reply */
    body: string;
  };
}

export interface CreateTopicOptions {
  body: {
    /** Content of the topic */
    body: string;
    /** ID of the forum to create the topic in */
    forum_id: number;
    /** Title of the topic */
    title: string;
    /** Create a poll with the topic? */
    with_poll?: boolean;
    /** Poll details */
    forum_topic_poll?: {
      /** Hide result (until voting period ends)? (Default: false) */
      hide_results?: boolean;
      /** Length of the voting period in days. 0 means that the voting will never end (default: 0). This parameter is required if `hide_results` option is enabled */
      length_days?: number;
      /** Max. number of votes each user can cast (default: 1) */
      max_options?: number;
      /** Newline-separated list of voting options. BBCode is supported */
      options: string;
      /** Title of the poll */
      title: string;
      /** Can a user change their votes? (Default: false) */
      vote_change?: boolean;
    };
  };
}

export interface GetTopicOptions {
  query?: {
    /** Pagination cursor */
    cursor_string?: string;
    /** Sort posts by */
    sort?: 'id_asc' | 'id_desc';
    /** Max. number of posts to be returned (caps at 50) */
    limit?: number;
    /** First post ID to be returned with `sort` set to `id_asc`. This parameter is ignored if `cursor_string` is specified */
    start?: number;
    /** First post ID to be returned with `sort` set to `id_desc`. This parameter is ignored if `cursor_string` is specified */
    end?: number;
  };
}

export interface UpdateTopicOptions {
  body?: {
    /** Forum topic details */
    forum_topic?: {
      /** Title of the topic */
      topic_title?: string;
    };
  };
}

export interface UpdatePostOptions {
  body: {
    /** Content of the post in BBCode format */
    body: string;
  };
}

export interface SearchOptions {
  query?: {
    /** Search only users, only wiki pages or both */
    mode?: 'all' | 'user' | 'wiki_page';
    /** Query string to search */
    query?: string;
    /** Page number */
    page?: number;
  };
}

export interface GetPlaylistScoresOptions {
  query?: {
    /** Limit number of results */
    limit?: number;
    /** Sort option */
    sort?: MultiplayerScoresSort;
    /** Pagination cursor */
    cursor_string?: string;
  };
}

export interface GetNewsListingOptions {
  query?: {
    /** Limit number of results */
    limit?: number;
    /** Filter news posts by a specific year */
    year?: number;
    /** Pagination cursor */
    cursor_string?: string;
  };
}

export interface GetNewsPostOptions {
  query?: {
    /** Specify whether the query must be done with a news post ID (`id`) or a slug (unset value) */
    key?: 'id';
  };
}

export interface GetRankingOptions {
  query?: {
    /** Filter by country code (only available for type `performance`) */
    country?: string;
    /** Show all users or friend ranking */
    filter?: 'all' | 'friends';
    /** ID of the spotlight (if type is `charts`) */
    spotlight?: number;
    /** Filter ranking by specified mode variant (only available for type `performance`) */
    variant?: string;
  };
}

export interface GetSelfOptions {
  urlParams?: {
    /** Gamemode of the proile to return */
    mode: GameMode;
  };
}

export interface GetUserKodosuOptions {
  query?: {
    /** Limit number of results */
    limit?: number;
    /** Pagination offset */
    offset?: number;
  };
}

export interface GetUserScoresOptions {
  query?: {
    /** Limit number of results */
    limit?: number;
    /** Pagination offset */
    offset?: number;
    /** Gamemode of the scores to return */
    mode?: GameMode;
  };
}

export interface GetUserRecentScoresOptions {
  query?: {
    /** Limit number of results */
    limit?: number;
    /** Pagination offset */
    offset?: number;
    /** Gamemode of the scores to return */
    mode?: GameMode;
    /** Include failed scores? */
    include_fails?: boolean | number;
  };
}

export interface GetUserBeatmapsOptions {
  query?: {
    /** Limit number of results */
    limit?: number;
    /** Pagination offset */
    offset?: number;
  };
}

export interface GetUserRecentActivityOptions {
  query?: {
    /** Limit number of results */
    limit?: number;
    /** Pagination offset */
    offset?: number;
  };
}

export interface GetUserOptions {
  urlParams?: {
    /** Gamemode of the proile to return */
    mode?: GameMode;
  };
  query?: {
    /** Specify if the `user` param is an `id` or a `username` */
    key: 'id' | 'username';
  };
}

export interface GetUsersOptions {
  query?: {
    /** An array of user IDs (can only take up to 50 IDs) */
    ids: number[];
  };
}
