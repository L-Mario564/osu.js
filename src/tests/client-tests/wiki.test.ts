import { Client } from '../../index';
import { describe, expect, it } from 'vitest';
import { getExistingAccessToken } from '.';

describe('Test wiki related endpoints', async () => {
  let accessToken: string = await getExistingAccessToken();
  let wiki = new Client(accessToken).wiki;

  it('Gets a wiki page', async () => {
    let page = await wiki.getWikiPage('en', 'Tournaments/OWC/2022');
    expect(page).toBeDefined();
  });
});
