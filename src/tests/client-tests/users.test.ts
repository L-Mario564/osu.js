import { Client } from '../../index';
import { describe, expect, it } from 'vitest';
import { sleep } from '../../utils';
import { getExistingAccessToken, ms } from '.';

describe('Test user related endpoints', async () => {
  const accessToken: string = await getExistingAccessToken();
  const users = new Client(accessToken).users;

  it('Gets the user data of the current access token', async () => {
    const me = await users.getSelf({
      urlParams: {
        mode: 'osu'
      }
    });

    expect(me).toBeDefined();
  });
  await sleep(ms);

  it("Gets a user's kudosu", async () => {
    const kudosu = await users.getUserKudosu(3171691, {
      query: {
        limit: 1
      }
    });

    expect(kudosu.length).toBe(1);
  });
  await sleep(ms);

  it("Gets a user's best scores", async () => {
    const scores = await users.getUserScores(14544646, 'best', {
      query: {
        mode: 'osu',
        limit: 3
      }
    });

    expect(scores.length).toBe(3);
  });
  await sleep(ms);

  it("Gets a user's beatmaps", async () => {
    const beatmapsets = await users.getUserBeatmaps(14544646, 'favourite', {
      query: {
        limit: 2
      }
    });

    expect(beatmapsets.length).toBe(2);
  });
  await sleep(ms);

  it("Gets a user's recent activity", async () => {
    const events = await users.getUserRecentActivity(14544646);
    expect(Array.isArray(events)).toBe(true);
  });
  await sleep(ms);

  it('Gets a single user', async () => {
    const user = await users.getUser(14544646, {
      urlParams: {
        mode: 'osu'
      }
    });

    expect(user).toBeDefined();
  });
  await sleep(ms);

  it('Gets multiple users', async () => {
    const usersData = await users.getUsers({
      query: {
        ids: [14544646, 3171691]
      }
    });

    expect(usersData.length).toBe(2);
  });
});
