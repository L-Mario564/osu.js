import { Client } from '../../index';
import { describe, expect, it } from 'vitest';
import { getExistingAccessToken } from '.';

describe('Test wiki related endpoints', async () => {
  const accessToken: string = await getExistingAccessToken();
  const wiki = new Client(accessToken).wiki;

  it('Gets a wiki page', async () => {
    const page = await wiki.getWikiPage('en', 'Tournaments/OWC/2022');
    expect(page).toBeDefined();
  });
});
