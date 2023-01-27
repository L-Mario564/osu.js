import e from 'express';
import { Auth } from '../';
import { readFileSync, writeFileSync } from 'fs';
import { GuestToken, Token } from '../types';
import { tokenFileLocation, getClientData } from './client-tests';

let server = e();
let { clientId, clientSecret, redirectUri } = getClientData();

let client = new Auth(Number(clientId), clientSecret, redirectUri);
let authCodeGrant = client.authorizationCodeGrant([
  'identify',
  'public',
  'friends.read',
  'forum.write',
  'chat.write'
]);

server.get('/auth', (_, res) => {
  res.redirect(authCodeGrant.requestAuthorizationUrl());
});

server.get('/auth-callback', async (req, res) => {
  if (!req.query.code) {
    res.status(400).send('No code was provided');
    return;
  }

  let code: string = req.query.code as string;
  let token: Token | undefined;

  try {
    token = await authCodeGrant.requestToken(code);
  } catch (err) {
    res.status(500).send(err);
    return;
  }

  if (token) {
    writeFileSync(tokenFileLocation, JSON.stringify(token));

    res.status(200).json({
      message: 'To refresh this token, head to http://localhost:3000/refresh-token',
      token
    });
    return;
  }

  res.status(500).send('An unknown error ocurred while getting the API token');
});

server.get('/refresh-token', async (_, res) => {
  let file: string = readFileSync(tokenFileLocation, { encoding: 'utf-8' });
  let token: Token = JSON.parse(file);
  let newToken: Token | undefined;

  try {
    newToken = await authCodeGrant.refreshToken(token.access_token, token.refresh_token);
  } catch (err) {
    res.status(500).send(err);
    return;
  }

  if (newToken) {
    writeFileSync(tokenFileLocation, JSON.stringify(newToken));

    res.status(200).json({
      message: 'Authorization code grant flow completed',
      newToken
    });
    return;
  }

  res.status(500).send('An unknown error ocurred while refreshing the API token');
});

server.get('/revoke-token', async (_, res) => {
  let file: string = readFileSync(tokenFileLocation, { encoding: 'utf-8' });
  let token: Token = JSON.parse(file);

  try {
    await client.revokeToken(token.access_token);
  } catch (err) {
    res.status(500).send(err);
    return;
  }

  res.status(200).json('The current API token has been revoked');
});

server.get('/auth/guest', async (_, res) => {
  let token: GuestToken | undefined;

  try {
    token = await client.clientCredentialsGrant();
  } catch (err) {
    res.status(500).send(err);
    return;
  }

  if (token) {
    res.status(200).json({
      message: 'Client credentials grant flow completed',
      token
    });
    return;
  }

  res.status(500).send('An unknown error ocurred while getting the API token');
});

server.listen(3000);
console.log(
  '\nExpress server listening on port 3000. This server is used to test authentication with the API',
  '\n\nTo test the authorization code grant flow, head to http://localhost:3000/auth',
  '\nTo test the client credentials grant flow, head to http://localhost:3000/auth/guest',
  '\nTo revoke an existing token, head to http://localhost:3000/revoke-token'
);
