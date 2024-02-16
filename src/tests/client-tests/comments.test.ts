import { Client } from '../../index';
import { describe, expect, it } from 'vitest';
import { getExistingAccessToken, ms } from '.';
import { sleep } from '../test-utils';

describe('Test comment related endpoints', async () => {
  const accessToken: string = await getExistingAccessToken();
  const comments = new Client(accessToken).comments;

  it('Gets multiple comments', async () => {
    const commentBundle = await comments.getComments({
      query: {
        commentable: {
          id: 742961,
          type: 'beatmapset'
        }
      }
    });

    expect(commentBundle).toBeDefined();
  });
  await sleep(ms);

  it('Gets a comment', async () => {
    const commentBundle = await comments.getComment(832359);
    expect(commentBundle).toBeDefined();
  });
});
