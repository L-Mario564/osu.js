import { Client } from '../../index';
import { describe, expect, it } from 'vitest';
import { getExistingAccessToken } from '.';

describe('Test forum related endpoints', async () => {
  const accessToken: string = await getExistingAccessToken();
  const forum = new Client(accessToken).forum;

  it('Gets a forum topic', async () => {
    const topic = await forum.getTopic(1715676);
    expect(topic).toBeDefined();
  });
});
