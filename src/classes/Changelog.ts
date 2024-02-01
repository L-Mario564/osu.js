import Base from './Base';
import { z } from 'zod';
import {
  changelogStreamSchema,
  getChangelogListingOptionsSchema,
  lookupChangelogBuildOptionsSchema
} from '../schemas/changelog';
import type polyfillFetch from 'node-fetch';
import type { GetChangelogListingOptions, LookupChangelogBuildOptions } from '../types/options';
import type {
  Build,
  BuildVersions,
  ChangelogEntry,
  ChangelogStream,
  GithubUser,
  UpdateStream
} from '../types';

/**
 * Class that wraps all changelog related endpoints
 */
export default class Changelog extends Base {
  /**
   * @param accessToken OAuth access token
   * @param options.polyfillFetch In case developing with a Node.js version prior to 18, you need to pass a polyfill for the fetch API. Install `node-fetch`
   */
  constructor(accessToken: string, options?: {
    polyfillFetch?: typeof fetch | typeof polyfillFetch;
  }) {
    super(accessToken, options);
  }

  /**
   * Makes a GET request to the `/changelog/{stream}/{build}` endpoint
   * @param stream Update stream name
   * @param build Build version
   * @returns A changelog build
   */
  public async getChangelogBuild(
    stream: ChangelogStream,
    build: string
  ): Promise<
    Build & {
      changelog_entries: (ChangelogEntry & {
        github_user: GithubUser;
        message: string | null;
        message_html: string | null;
      })[];
      versions: BuildVersions;
    }
  > {
    stream = changelogStreamSchema.parse(stream);
    build = z.string().parse(build);
    return await this.request(`changelog/${stream}/${build}`, 'GET');
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
    return await this.request('changelog', 'GET', options);
  }

  /**
   * Makes a GET request to the `/changelog/{changelog}` endpoint
   * @param changelog Build version, update stream name, or build ID
   * @returns A changelog build
   */
  public async lookupChangelogBuild(
    changelog: string | number,
    options?: LookupChangelogBuildOptions
  ): Promise<
    | (Build & {
        changelog_entries: (ChangelogEntry & {
          github_user: GithubUser;
          message: string | null;
          message_html: string | null;
        })[];
        versions: BuildVersions;
      })
    | undefined
  > {
    changelog = z.union([z.string(), z.number()]).parse(changelog);
    options = lookupChangelogBuildOptionsSchema.optional().parse(options);

    return await this.request(`changelog/${changelog}`, 'GET', {
      ...options,
      returnUndefinedOn404: true
    });;
  }
}
