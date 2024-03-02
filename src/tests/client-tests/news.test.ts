import { Client } from '../../index';
import { describe, expect, it } from 'vitest';
import { getExistingAccessToken, ms } from '.';
import { sleep } from '../test-utils';

describe('Test news related endpoints', async () => {
  const accessToken: string = await getExistingAccessToken();
  const news = new Client(accessToken).news;

  it('Gets multiple news posts', async () => {
    const newsList = await news.getNewsListing();
    expect(newsList).toBeDefined();
  });
  await sleep(ms);

  it('Gets a single news post', async () => {
    const newsPost = await news.getNewsPost('2023-01-19-gmt-apps-now-open');
    expect(newsPost).toBeDefined();
  });
});
