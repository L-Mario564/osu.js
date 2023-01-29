import { Client } from '../../index';
import { describe, expect, it } from 'vitest';
import { getExistingAccessToken } from '.';

describe('Test multiplayer related endpoints', async () => {
  let accessToken: string = await getExistingAccessToken();
  let multiplayer = new Client(accessToken).multiplayer;

  it('Gets multiple comments', async () => {
    let scores = await multiplayer.getPlaylistScores(274844, 1852978, {
      query: {
        limit: 5
      }
    });

    expect(scores).toBeDefined();
  });
});
