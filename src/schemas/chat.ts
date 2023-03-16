import { z } from 'zod';

export const createPMOptionsSchema = z.object({
  body: z.object({
    /** ID of the user to send a PM */
    target_id: z.number(),
    /** Message to send */
    message: z.string(),
    /** Is the message an action? */
    is_action: z.boolean().default(false),
    /** Client side message identifier which will be sent back in response and websocket JSON */
    uuid: z.string().uuid()
  })
});

const channelDetails = {
  /** Channel name */
  name: z.string(),
  /** Channel description */
  description: z.string()
};

export const createPMChannelOptionsSchema = z.object({
  body: z.object({
    /** Message to send */
    message: z.string().optional(),
    /** Channel details */
    channel: z.object(channelDetails).partial().optional(),
    /** Target user ID */
    target_id: z.number()
  })
});

export const createAnnounceChannelOptionsSchema = z.object({
  body: z.object({
    /** Message to send with the announcement */
    message: z.string(),
    /** Channel details */
    channel: z.object(channelDetails),
    /** Target user IDs */
    target_ids: z.number().array()
  })
});
