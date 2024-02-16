import fetch from 'node-fetch';
import { Client } from '../../index';
import { describe, expect, it } from 'vitest';
import { getExistingAccessToken, ms } from '.';
import { sleep } from '../test-utils';

describe('Test home related endpoints', async () => {
  const accessToken: string = await getExistingAccessToken();
  const client = new Client(accessToken);
  const withPolyfillFetch = new Client(accessToken, {
    polyfillFetch: fetch
  });

  it('Searches for wikis and users corresponding to a search query', async () => {
    const results = await client.search({
      query: {
        query: 'peppy'
      }
    });

    expect(results.user?.data[0]).toBeDefined();
  });
  await sleep(ms);

  it('Gets multiple users (polyfill fetch API test)', async () => {
    const usersData = await withPolyfillFetch.users.getUsers({
      query: {
        ids: [14544646, 3171691]
      }
    });

    expect(usersData.length).toBe(2);
  });
});
