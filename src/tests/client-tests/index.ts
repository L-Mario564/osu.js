import { config } from 'dotenv';
import { readFileSync, writeFileSync, existsSync, statSync } from 'fs';
import { Auth } from '../../';
import { Token } from '../../types';

export const tokenFileLocation: string = `${process.cwd()}/api-token.json`;
export const ms: number = 500;

export function getClientData() {
  config();
  const clientId: string | undefined = process.env.CLIENT_ID;
  const clientSecret: string | undefined = process.env.CLIENT_SECRET;
  const redirectUri: string | undefined = process.env.REDIRECT_URI;

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

  const file: string = readFileSync(tokenFileLocation, { encoding: 'utf-8' });
  const fileData = statSync(tokenFileLocation);
  let token: Token = JSON.parse(file);
  let tokenRefreshed: boolean = false;

  if (new Date().getTime() - fileData.mtime.getTime() >= 86_000_000) {
    const { clientId, clientSecret, redirectUri } = getClientData();
    token = await new Auth(Number(clientId), clientSecret, redirectUri)
      .authorizationCodeGrant()
      .refreshToken(token.refresh_token);

    tokenRefreshed = true;
  }

  if (tokenRefreshed) {
    writeFileSync(tokenFileLocation, JSON.stringify(token));
  }

  return token.access_token;
}
