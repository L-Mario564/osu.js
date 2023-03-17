import Base from './Base';
import { Build, BuildVersions, ChangelogEntry, ChangelogStream, GithubUser, UpdateStream } from '../types';
import { z } from 'zod';
import { changelogStreamSchema, getChangelogListingOptionsSchema, lookupChangelogBuildOptionsSchema } from '../schemas/changelog';
import { GetChangelogListingOptions, LookupChangelogBuildOptionsSchema } from '../types/options';
import { isAxiosError } from 'axios';

export default class Changelog extends Base {
  constructor(accessToken: string) {
    super(accessToken);
  }

  /**
   * Makes a GET request to the `/changelog/{stream}/{build}` endpoint
   * @param stream Update stream name
   * @param build Build version
   * @returns A changelog build
   */
  public async getChangelogBuild(stream: ChangelogStream, build: string): Promise<Build & {
    changelog_entries: (ChangelogEntry & {
      github_user: GithubUser;
      message: string | null;
      message_html: string | null;
    })[];
    versions: BuildVersions;
  }> {
    stream = changelogStreamSchema.parse(stream);
    build = z.string().parse(build);
    return await this.fetch(`changelog/${stream}/${build}`, 'GET');
  }

  /**
   * Makes a GET request to the `/changelog` endpoint
   * @returns An object containing a array of builds, update stream and search parameters used
   */
  public async getChangelogListing(options?: GetChangelogListingOptions): Promise<{
    builds: (Build & {
      changelog_entries: (ChangelogEntry & {
        github_user: GithubUser;
        message: string | null;
        message_html: string | null;
      })[];
    })[];
    search: {
      from: string | null;
      limit: 21;
      max_id: number | null;
      stream: string | null;
      to: string | null;
    };
    streams: (UpdateStream & {
      latest_build: Build;
      user_count: number;
    })[];
  }> {
    options = getChangelogListingOptionsSchema.optional().parse(options);
    return await this.fetch('changelog', 'GET', options);
  }

  /**
   * Makes a GET request to the `/changelog/{changelog}` endpoint
   * @param changelog Build version, update stream name, or build ID
   * @returns A changelog build
   */
  public async lookupChangelogBuild(changelog: string | number, options?: LookupChangelogBuildOptionsSchema): Promise<Build & {
    changelog_entries: (ChangelogEntry & {
      github_user: GithubUser;
      message: string | null;
      message_html: string | null;
    })[];
    versions: BuildVersions;
  } | undefined> {
    changelog = z.union([z.string(), z.number()]).parse(changelog);
    options = lookupChangelogBuildOptionsSchema.optional().parse(options);

    let build: Build & {
      changelog_entries: (ChangelogEntry & {
        github_user: GithubUser;
        message: string | null;
        message_html: string | null;
      })[];
      versions: BuildVersions;
    } | undefined;

    try {
      build = await this.fetch(`changelog/${changelog}`, 'GET', options);
    } catch (err) {
      if (!isAxiosError(err) || err.response?.status !== 404) {
        throw err;
      }
    }

    return build;
  }
}
