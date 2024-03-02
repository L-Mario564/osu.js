import fetch from 'node-fetch';
import { LegacyClient } from '../';
import { describe, expect, it } from 'vitest';
import { config } from 'dotenv';
import { sleep } from './test-utils';

describe('Test legacy client', async () => {
  config();
  const apiKey: string | undefined = process.env.API_KEY;

  if (!apiKey) throw new Error('"API_KEY" environment variable is undefined');

  const ms: number = 500;
  const client = new LegacyClient(apiKey);
  const withPolyfillFetch = new LegacyClient(apiKey, {
    polyfillFetch: fetch
  });

  it('Gets beatmaps', async () => {
    const beatmaps = await client.getBeatmaps({ b: 1816113 });
    expect(Array.isArray(beatmaps) && beatmaps.length > 0).toBe(true);
  });
  await sleep(ms);

  it('Gets a user', async () => {
    const user = await client.getUser({ u: 14544646 });
    expect(user).toBeDefined();
  });
  await sleep(ms);

  it("Gets a user that doesn't exist", async () => {
    const user = await client.getUser({ u: 0 });
    expect(user).toBeNull();
  });
  await sleep(ms);

  it('Gets beatmap scores', async () => {
    const scores = await client.getBeatmapScores({ b: 1816113 });
    expect(Array.isArray(scores) && scores.length > 0).toBe(true);
  });
  await sleep(ms);

  it('Gets user best scores', async () => {
    const scores = await client.getUserBestScores({ u: 14544646 });
    expect(Array.isArray(scores)).toBe(true);
  });
  await sleep(ms);

  it('Gets user recent scores', async () => {
    const scores = await client.getUserRecentScores({ u: 14544646 });
    expect(Array.isArray(scores)).toBe(true);
  });
  await sleep(ms);

  it('Gets a multiplayer lobby', async () => {
    const mpLobby = await client.getMultiplayerLobby({ mp: 105297522 });
    expect(mpLobby).toBeDefined();
  });
  await sleep(ms);

  it("Gets a multiplayer lobby that doesn't exist", async () => {
    const mpLobby = await client.getMultiplayerLobby({ mp: 0 });
    expect(mpLobby).toBeNull();
  });
  await sleep(ms);

  it('Gets a replay (by score ID)', async () => {
    const replay = await client.getReplay('score id', { s: 3812908497 });
    expect(replay).toBeTypeOf('string');
  });
  await sleep(ms);

  it('Gets a replay (by a beatmap ID and user ID)', async () => {
    const replay = await client.getReplay('user & beatmap id', {
      b: 131891,
      u: 5182050
    });
    expect(replay).toBeTypeOf('string');
  });
  await sleep(ms);

  it("Gets replays that doesn't exist", async () => {
    const replay = await client.getReplay('score id', { s: 0 });
    expect(replay).toBeNull();
  });

  it('Gets a user (polyfill fetch API test)', async () => {
    const user = await withPolyfillFetch.getUser({ u: 14544646 });
    expect(user).toBeDefined();
  });
});
