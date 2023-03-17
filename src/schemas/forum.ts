import { z } from 'zod';

export const replyToTopicOptionsSchema = z.object({
  body: z.object({
    /** Content of the reply */
    body: z.string()
  })
});

export const createTopicOptionsSchema = z.object({
  body: z.object({
    /** Content of the topic */
    body: z.string(),
    /** ID of the forum to create the topic in */
    forum_id: z.number(),
    /** Title of the topic */
    title: z.string(),
    /** Create a poll with the topic? */
    with_poll: z.boolean().optional(),
    /** Poll details */
    forum_topic_poll: z
      .object({
        /** Hide result (until voting period ends)? */
        hide_results: z.boolean().default(false).optional(),
        /** Length of the voting period in days. 0 means that the voting will never end. This parameter is required if `hide_results` option is enabled */
        length_days: z.number().gte(0).default(0).optional(),
        /** Max. number of votes each user can cast */
        max_options: z.number().gte(1).default(1).optional(),
        /** Newline-separated list of voting options. BBCode is supported */
        options: z.string(),
        /** Title of the poll */
        title: z.string(),
        /** Can a user change their votes? */
        vote_change: z.boolean().default(false).optional()
      })
      .optional()
  })
});

export const getTopicOptionsSchema = z
  .object({
    query: z.object({
      /** Pagination cursor */
      cursor_string: z.string(),
      /** Sort posts by */
      sort: z.union([z.literal('id_asc'), z.literal('id_desc')]),
      /** Max. number of posts to be returned (caps at 50) */
      limit: z.number().lte(50),
      /** First post ID to be returned with `sort` set to `id_asc`. This parameter is ignored if `cursor_string` is specified */
      start: z.number(),
      /** First post ID to be returned with `sort` set to `id_desc`. This parameter is ignored if `cursor_string` is specified */
      end: z.number()
    })
  })
  .deepPartial();

export const updateTopicOptionsSchema = z
  .object({
    body: z.object({
      /** Forum topic details */
      forum_topic: z.object({
        /** Title of the topic */
        topic_title: z.string()
      })
    })
  })
  .deepPartial();

export const updatePostOptionsSchema = z.object({
  body: z.object({
    /** Content of the post in BBCode format */
    body: z.string()
  })
});
