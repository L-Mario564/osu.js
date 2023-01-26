import { config } from 'dotenv';
import { readFileSync, writeFileSync, existsSync, statSync } from 'fs';
import { Auth } from '../../';
import { Token } from '../../types';

export const tokenFileLocation: string = `${process.cwd()}/api-token.json`;
export const ms: number = 500;

export function getClientData() {
  config();
  let clientId: string | undefined = process.env.CLIENT_ID;
  let clientSecret: string | undefined = process.env.CLIENT_SECRET;
  let redirectUri: string | undefined = process.env.REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error(
      '"CLIENT_ID", "CLIENT_SECRET" or "REDIRECT_URI" environment variables are undefined'
    );
  }

  return { clientId, clientSecret, redirectUri };
}

export async function getExistingAccessToken() {
  if (!existsSync(tokenFileLocation)) {
    throw new Error(
      'No file containing the API token was found. To generate this file, run "npm run test:auth" and completing the authorization code grant flow'
    );
  }

  let file: string = readFileSync(tokenFileLocation, { encoding: 'utf-8' });
  let fileData = statSync(tokenFileLocation);
  let token: Token = JSON.parse(file);
  let tokenRefreshed: boolean = false;

  if (new Date().getTime() - fileData.mtime.getTime() >= 86_000_000) {
    let { clientId, clientSecret, redirectUri } = getClientData();
    token = await new Auth(Number(clientId), clientSecret, redirectUri)
      .authorizationCodeGrant()
      .refreshToken(token.access_token, token.refresh_token);

    tokenRefreshed = true;
  }

  if (tokenRefreshed) {
    writeFileSync(tokenFileLocation, JSON.stringify(token));
  }

  return token.access_token;
}
