import { Client } from '../../index';
import { describe, expect, it } from 'vitest';
import { getExistingAccessToken } from '.';

describe('Test home related endpoints', async () => {
  const accessToken: string = await getExistingAccessToken();
  const client = new Client(accessToken);

  it('Searches for wikis and users corresponding to a search query', async () => {
    const results = await client.search({
      query: {
        query: 'peppy'
      }
    });

    expect(results.user?.data[0]).toBeDefined();
  });
});
