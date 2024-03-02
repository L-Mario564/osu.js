<div align="center" style="padding: 32px 0;">
  <img src="https://i.imgur.com/eFERZWb.png" width="350" alt="osu.js" />
</div>

## About

[osu.js](https://osujs.mario564.com) is an unofficial Javascript and Typescript SDK for the browser-facing portion of [osu!](https://osu.ppy.sh/home) with type safety in mind.

**Why this API wrapper?**

- Extremely lightweight (less than 6kb when minified + gzipped).
- Supports both versions of the API.
- Every response from the APIs are fully typed.
- Handles errors in a developer-friendly way.
- Fully documented in its own website.
- In addition to the API wrapping, it includes some extra utilities.

## Installation

```bash
# npm
npm i osu-web.js
# yarn
yarn add osu-web.js
# pnpm
pnpm add osu-web.js
```

## Quickstart

```js
import { Client, LegacyClient } from 'osu-web.js';

// Client for the current API (API v2)
const client = new Client('OAUTH ACCESS TOKEN');
// Client for the legacy API (API v1)
const legacy = new LegacyClient('API KEY');

// Get a user

// API v2
let v2User = await client.users.getUser(14544646, {
  urlParams: {
    mode: 'osu'
  }
});

// API v1
let v1User = await legacy.getUser({
  u: 14544646,
  m: 'osu'
});
```

## Coverage

osu.js has 100% coverage over the legacy API.

For the current API, all documented endpoints with a `GET` request have been implemented and tested. All endpoints with `POST` and `PATCH` requests have been implemented, but most aren't tested. None of the undocumented endpoints have been implemented.

## Links

### Project

- [Documentation](https://osujs.mario564.com)
- [Github](https://github.com/L-Mario564/osu.js)
- [npm](https://www.npmjs.com/package/osu-web.js)

### Other

- [Legacy API Documentation](https://github.com/ppy/osu-api/wiki)
- [Current API Documentation](https://osu.ppy.sh/docs/index.html)

## Contributing

Read [CONTRIBUTING.md](https://github.com/L-Mario564/osu.js/blob/master/CONTRIBUTING.md)
