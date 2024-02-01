import { Client } from '../../index';
import { describe, expect, it } from 'vitest';
import { getExistingAccessToken, ms } from '.';
import { sleep } from '../../utils';

describe('Test changelog related endpoints', async () => {
  const accessToken: string = await getExistingAccessToken();
  const changelog = new Client(accessToken).changelog;

  it('Gets a changelog build', async () => {
    const build = await changelog.getChangelogBuild('lazer', '2023.305.0');
    expect(build).toBeDefined();
  });
  await sleep(ms);

  it('Gets a listing of changelogs', async () => {
    const listing = await changelog.getChangelogListing();
    expect(listing).toBeDefined();
  });
  await sleep(ms);

  it('Looks up a changelog build', async () => {
    const build = await changelog.lookupChangelogBuild('2023.305.0');
    expect(build).toBeDefined();
  });
  await sleep(ms);

  it('Looks up a non-existant changelog build', async () => {
    const build = await changelog.lookupChangelogBuild('skjdaljdwjadlsa');
    expect(build).toBeUndefined();
  });
});
