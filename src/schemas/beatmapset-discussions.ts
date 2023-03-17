import { z } from 'zod';

const baseQuerySchema = {
  /** Max. number of results */
  limit: z.number(),
  /** Search result page number */
  page: z.number(),
  /** Sort posts by newest (`id_desc`) or oldest (`id_desc`) */
  sort: z.union([z.literal('id_desc'), z.literal('id_asc')])
};

export const getDiscussionPostsOptionsSchema = z
  .object({
    query: z.object({
      ...baseQuerySchema,
      /** ID of the beatmapset discussion */
      beatmapset_discussion_id: z.number(),
      /** Post types */
      types: z.union([z.literal('first'), z.literal('reply'), z.literal('system')]).array(),
      /** ID of the user to get posts from */
      user: z.number()
    })
  })
  .deepPartial();

export const getDiscussionVotesOptionsSchema = z
  .object({
    query: z.object({
      ...baseQuerySchema,
      /** ID of the beatmapset discussion */
      beatmapset_discussion_id: z.number(),
      /** ID of the user receiving the votes */
      receiver: z.number(),
      /** `1` for up vote, `-1` for down vote */
      score: z.union([z.literal(1), z.literal(-1)]),
      /** ID of the user giving votes */
      user: z.number()
    })
  })
  .deepPartial();

export const discussionMessageTypeSchema = z.union([
  z.literal('suggestion'),
  z.literal('problem'),
  z.literal('mapper_note'),
  z.literal('praise'),
  z.literal('hype'),
  z.literal('review')
]);

export const getDiscussionsOptionsSchema = z
  .object({
    query: z.object({
      ...baseQuerySchema,
      /** ID of the beatmap to get discussions from */
      beatmap_id: z.number(),
      /** ID of the beatmapset to get discussions from */
      beatmapset_id: z.number(),
      /** Specify beatmapset status */
      beatmapset_status: z.union([
        z.literal('all'),
        z.literal('ranked'),
        z.literal('qualified'),
        z.literal('disqualified'),
        z.literal('never_qualified')
      ]),
      /** Specify message types, (unset for all) */
      message_types: discussionMessageTypeSchema.array(),
      /** Show only resolved issues? */
      only_unresolved: z.boolean(),
      /** ID of the user (documentation doesn't specify about what) */
      user: z.number()
    })
  })
  .deepPartial();
