import { Client } from '../legacy';
import { describe, expect, it } from 'vitest';
import { config } from 'dotenv';
import { sleep } from '../utils';

describe('Test legacy client', async () => {
  config();
  let apiKey: string | undefined = process.env.API_KEY;

  if (!apiKey) throw new Error('"API_KEY" environment variable is undefined');

  let ms: number = 500;
  let client: Client = new Client(apiKey);

  it('Gets beatmaps', async () => {
    let beatmaps = await client.getBeatmaps({ b: 1816113 });
    expect(Array.isArray(beatmaps) && beatmaps.length > 0).toBe(true);
  });
  await sleep(ms);

  it('Gets a user', async () => {
    let user = await client.getUser({ u: 14544646 });
    expect(user).toBeDefined();
  });
  await sleep(ms);

  it('Gets a user that doesn\'t exist', async () => {
    let user = await client.getUser({ u: 0 });
    expect(user).toBeNull();
  });
  await sleep(ms);

  it('Gets beatmap scores', async () => {
    let scores = await client.getBeatmapScores({ b: 1816113 });
    expect(Array.isArray(scores) && scores.length > 0).toBe(true);
  });
  await sleep(ms);

  it('Gets user best scores', async () => {
    let scores = await client.getUserBestScores({ u: 14544646 });
    expect(Array.isArray(scores)).toBe(true);
  });
  await sleep(ms);

  it('Gets user recent scores', async () => {
    let scores = await client.getUserRecentScores({ u: 14544646 });
    expect(Array.isArray(scores)).toBe(true);
  });
  await sleep(ms);

  it('Gets a multiplayer lobby', async () => {
    let mpLobby = await client.getMultiplayerLobby({ mp: 105297522 });
    expect(mpLobby).toBeDefined();
  });
  await sleep(ms);

  it("Gets a multiplayer lobby that doesn't exist", async () => {
    let mpLobby = await client.getMultiplayerLobby({ mp: 0 });
    expect(mpLobby).toBeNull();
  });
  await sleep(ms);

  it('Gets a replay (by score ID)', async () => {
    let replay = await client.getReplay.byScoreId({ s: 3812908497 });
    expect(replay).toBeTypeOf('string');
  });
  await sleep(ms);

  // it('Gets a replay (by a beatmap ID and user ID)', async () => {
  //   let replay = await client.getReplay.byBeatmapAndUserId({
  //     b: 131891,
  //     u: 5182050
  //   });
  //   expect(replay).toBeTypeOf('string');
  // });
  // await sleep(ms);

  // it("Gets replays that don't exist", async () => {
  //   let replay1 = await client.getReplay.byScoreId({ s: 0 });
  //   let replay2 = await client.getReplay.byBeatmapAndUserId({
  //     b: 0,
  //     u: 0
  //   });

  //   expect(replay1 === null && replay2 === null).toBe(true);
  // });
});
