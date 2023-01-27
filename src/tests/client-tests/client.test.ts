import { Client } from '../../index';
import { describe, expect, it } from 'vitest';
import { getExistingAccessToken } from '.';

describe('Test home related endpoints', async () => {
  let accessToken: string = await getExistingAccessToken();
  let client = new Client(accessToken);

  it('Searches for wikis and users corresponding to a search query', async () => {
    let results = await client.search({
      query: {
        query: 'peppy'
      }
    });

    expect(results.user?.data[0]).toBeDefined();
  });
});
