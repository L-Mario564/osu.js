import { Client } from '../../index';
import { describe, expect, it } from 'vitest';
import { getExistingAccessToken } from '.';

describe('Test forum related endpoints', async () => {
  let accessToken: string = await getExistingAccessToken();
  let forum = new Client(accessToken).forum;

  it('Gets a forum topic', async () => {
    let topic = await forum.getTopic(1715676);
    expect(topic).toBeDefined();
  });
});
