import { Client } from '../../index';
import { describe, expect, it } from 'vitest';
import { getExistingAccessToken, ms } from '.';
import { sleep } from '../test-utils';

describe('Test ranking related endpoints', async () => {
  const accessToken: string = await getExistingAccessToken();
  const ranking = new Client(accessToken).ranking;

  it('Gets ranking', async () => {
    const usCountryRanking = await ranking.getRanking('osu', 'performance', {
      query: {
        country: 'US'
      }
    });

    expect(usCountryRanking).toBeDefined();
  });
  await sleep(ms);

  it('Gets spotlights', async () => {
    const spotlights = await ranking.getSpotlights();
    expect(Array.isArray(spotlights)).toBeDefined();
  });
});
