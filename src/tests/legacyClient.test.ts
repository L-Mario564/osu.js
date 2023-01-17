import { Beatmap, Client, User } from '../legacy';
import { describe, expect, it } from 'vitest';
import { config } from 'dotenv';
import { sleep } from '../utils';
import { BeatmapScore } from '../types/v1';

describe('Test legacy client', async (): Promise<void> => {
  config();

  let ms: number = 500;
  let apiKey: string | undefined = process.env.API_KEY;

  if (!apiKey) {
    throw new Error('"API_KEY" environment variable is undefined');
  }

  let client: Client = new Client(apiKey);

  it('Gets beatmaps', async (): Promise<void> => {
    let beatmaps: Beatmap[] = await client.getBeatmaps({ b: 1816113 });
    expect(Array.isArray(beatmaps)).toBe(true);
  });
  await sleep(ms);

  it('Gets a user', async (): Promise<void> => {
    let user: User | null = await client.getUser({ u: 2 });
    expect(user).toBeDefined();
  });
  await sleep(ms);

  it('Gets a user that doesn\'t exist', async (): Promise<void> => {
    let user: User | null = await client.getUser({ u: 0 });
    expect(user).toBeNull();
  });
  await sleep(ms);

  it('Gets beatmap scores', async (): Promise<void> => {
    let scores: BeatmapScore[] = await client.getScores({
      b: 1816113
    });
    console.log(scores[0]);
    expect(Array.isArray(scores)).toBe(true);
  })
});