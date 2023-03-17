import { z } from 'zod';

export const changelogStreamSchema = z.union([
  z.literal('stable40'),
  z.literal('beta40'),
  z.literal('cuttingedge'),
  z.literal('lazer'),
  z.literal('web')
]);

const messageFormatsSchema = z.array(z.union([z.literal('html'), z.literal('markdown')]));

export const getChangelogListingOptionsSchema = z.object({
  query: z.object({
    /** Minimum build version */
    from: z.string(),
    /** Maximum build ID */
    max_id: z.number(),
    /** Stream name to return builds from */
    stream: changelogStreamSchema,
    /** Maximum build version */
    to: z.string(),
    /** Changelog entry format (returns both by default) */
    message_formats: messageFormatsSchema
  })
}).deepPartial();

export const lookupChangelogBuildOptionsSchema = z.object({
  query: z.object({
    /** Unset to query by build version or stream name, or id to query by build ID */
    key: z.literal('id'),
    /** Changelog entry format (returns both by default) */
    message_formats: messageFormatsSchema
  })
}).deepPartial();