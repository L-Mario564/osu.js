import { Client } from '../../index';
import { describe, expect, it } from 'vitest';
import { sleep } from '../../utils';
import { getExistingAccessToken, ms } from '.';

describe('Test user related endpoints', async () => {
  let accessToken: string = await getExistingAccessToken();
  let users = new Client(accessToken).users;

  it('Gets the user data of the current access token', async () => {
    let me = await users.getSelf({
      urlParams: {
        mode: 'osu'
      }
    });

    expect(me).toBeDefined();
  });
  await sleep(ms);

  it("Gets a user's kudosu", async () => {
    let kudosu = await users.getUserKudosu(3171691, {
      query: {
        limit: 1
      }
    });

    expect(kudosu.length).toBe(1);
  });
  await sleep(ms);

  it("Gets a user's best scores", async () => {
    let scores = await users.scores.getUserBestScores(14544646, {
      query: {
        mode: 'osu',
        limit: 3
      }
    });

    expect(scores.length).toBe(3);
  });
  await sleep(ms);

  it("Gets a user's recent scores", async () => {
    let scores = await users.scores.getUserRecentScores(14544646, {
      query: {
        mode: 'osu'
      }
    });

    expect(Array.isArray(scores)).toBe(true);
  });
  await sleep(ms);

  it("Gets a user's first place scores", async () => {
    let scores = await users.scores.getUserFirstPlaceScores(14544646, {
      query: {
        mode: 'osu'
      }
    });

    expect(Array.isArray(scores)).toBe(true);
  });
  await sleep(ms);

  it("Gets a user's beatmaps", async () => {
    let beatmapsets = await users.beatmaps.getUserBeatmaps(14544646, 'favourite', {
      query: {
        limit: 2
      }
    });

    expect(beatmapsets.length).toBe(2);
  });
  await sleep(ms);

  it("Gets a user's most played beatmaps", async () => {
    let beatmapsets = await users.beatmaps.getUserMostPlayed(14544646, {
      query: {
        limit: 2
      }
    });

    expect(beatmapsets.length).toBe(2);
  });
  await sleep(ms);

  it("Gets a user's recent activity", async () => {
    let events = await users.getUserRecentActivity(14544646);
    expect(Array.isArray(events)).toBe(true);
  });
  await sleep(ms);

  it('Gets a single user', async () => {
    let user = await users.getUser(14544646, {
      urlParams: {
        mode: 'osu'
      }
    });

    expect(user).toBeDefined();
  });
  await sleep(ms);

  it('Gets multiple users', async () => {
    let usersData = await users.getUsers({
      query: {
        ids: [14544646, 3171691]
      }
    });

    expect(usersData.length).toBe(2);
  });
  await sleep(ms);
});
