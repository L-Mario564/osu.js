import { Client } from '../../index';
import { describe, expect, it } from 'vitest';
import { getExistingAccessToken, ms } from '.';
import { sleep } from '../test-utils';

describe('Test beatmapset discussion related endpoints', async () => {
  const accessToken: string = await getExistingAccessToken();
  const discussions = new Client(accessToken).beatmapsetDiscussions;

  it("Gets a discussion's posts", async () => {
    const discussion = await discussions.getDiscussionPosts({
      query: {
        beatmapset_discussion_id: 1816113
      }
    });

    expect(discussion).toBeDefined();
  });
  await sleep(ms);

  it("Gets a discussion's votes", async () => {
    const discussion = await discussions.getDiscussionVotes({
      query: {
        beatmapset_discussion_id: 1816113
      }
    });

    expect(discussion).toBeDefined();
  });
  await sleep(ms);

  it('Gets discussions', async () => {
    const discussion = await discussions.getDiscussions({
      query: {
        beatmapset_id: 742961
      }
    });

    expect(discussion).toBeDefined();
  });
});
