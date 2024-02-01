import { Client } from '../../index';
import { describe, expect, it } from 'vitest';
import { getExistingAccessToken, ms } from '.';
import { sleep } from '../../utils';

describe('Test beatmap related endpoints', async () => {
  const accessToken: string = await getExistingAccessToken();
  const beatmaps = new Client(accessToken).beatmaps;

  it('Looks up a beatmap', async () => {
    const beatmap = await beatmaps.lookupBeatmap({
      query: {
        id: 1816113
      }
    });

    expect(beatmap).toBeDefined();
  });
  await sleep(ms);

  it('Looks up a non-existant beatmap', async () => {
    const beatmap = await beatmaps.lookupBeatmap({
      query: {
        id: 0
      }
    });

    expect(beatmap).toBeUndefined();
  });
  await sleep(ms);

  it('Gets a beatmap user score', async () => {
    const score = await beatmaps.getBeatmapUserScore(1816113, 12408961, {
      query: {
        mode: 'osu'
      }
    });

    expect(score).toBeDefined();
  });
  await sleep(ms);

  it('Gets multiple beatmap user scores', async () => {
    const scores = await beatmaps.getBeatmapUserScores(1816113, 12408961, {
      query: {
        mode: 'osu'
      }
    });

    expect(Array.isArray(scores)).toBe(true);
  });
  await sleep(ms);

  it('Gets beatmap top user scores', async () => {
    const scores = await beatmaps.getBeatmapTopScores(1816113, {
      query: {
        mode: 'osu'
      }
    });

    expect(Array.isArray(scores)).toBe(true);
  });
  await sleep(ms);

  it('Gets beatmaps', async () => {
    const maps = await beatmaps.getBeatmaps({
      query: {
        ids: [1816113, 131891]
      }
    });

    expect(maps.length).toBe(2);
  });
  await sleep(ms);

  it('Gets a beatmap', async () => {
    const map = await beatmaps.getBeatmap(1816113);
    expect(map).toBeDefined();
  });
  await sleep(ms);

  it("Gets a beatmap's attributes", async () => {
    const attributes = await beatmaps.getBeatmapAttributes(1816113, 'fruits');
    expect(attributes).toBeDefined();
  });
});
