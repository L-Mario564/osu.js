import { Client } from '../../index';
import { describe, expect, it } from 'vitest';
import { getExistingAccessToken, ms } from '.';
import { sleep } from '../../utils';

describe('Test ranking related endpoints', async () => {
  let accessToken: string = await getExistingAccessToken();
  let ranking = new Client(accessToken).ranking;

  it('Gets ranking', async () => {
    let usCountryRanking = await ranking.getRanking('osu', 'performance', {
      query: {
        country: 'US'
      }
    });

    expect(usCountryRanking).toBeDefined();
  });
  await sleep(ms);

  it('Gets spotlights', async () => {
    let spotlights = await ranking.getSpotlights();
    expect(Array.isArray(spotlights)).toBeDefined();
  });
});
