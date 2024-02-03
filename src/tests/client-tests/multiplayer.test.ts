import { Client } from '../../index';
import { describe, expect, it } from 'vitest';
import { getExistingAccessToken } from '.';

describe('Test multiplayer related endpoints', async () => {
  const accessToken: string = await getExistingAccessToken();
  const multiplayer = new Client(accessToken).multiplayer;

  it('Gets multiple comments', async () => {
    const scores = await multiplayer.getPlaylistScores(274844, 1852978, {
      query: {
        limit: 5
      }
    });

    expect(scores).toBeDefined();
  });
});
