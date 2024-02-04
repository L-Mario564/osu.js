# Contributing

Interested in improving osu.js or found an issue using it? Learn how to contribute to this project through these guidelines.

## Issues

If you found a bug, make sure it hasn't already been reported, doesn't have a documented solution or doesn't have a pull request addressing it before you file an issue. The issue must describe where or how it's happening.

If you want to see a feature added to osu.js, **please file an issue before submitting a pull request**. I don't want to close a PR that had a lot of effort put into just because it wasn't something ever planned for osu.js or doesn't align with the goal of the library. The maintainer has to agree to these features or changes.

## Pull Requests

When filing a pull request, describe why it was created; if it's a bug fix, describe what issue it solves; if it's a new feature implementation, describe how it could enhance this library; so on and so forth.

If a feature is added or change is made, it would be of great help to update the documentation accordingly. The documentation is contained within the `docs` folder.

## Setup Environment

### Prerequisites

- Node.js (preferably v18 or above)
- PNPM
- An osu! account with a registered OAuth app (for testing)

### Setup

```bash
# Clone the repository
git clone https://github.com/L-Mario564/osu.js.git
cd osu.js
# Install dependencies
pnpm install
```

If you plan on running tests, rename or copy `.env.example`, rename it to `.env` and fill in all the environment variables.

If you're going to make changes to the docs and want to see them live:

```bash
# Go into the docs directory
cd docs
# Install dependencies
pnpm install
# Run dev server. The site is hosted at http://localhost:3000
pnpm dev
```

## package.json Scripts

Run these scripts by prefixing the script's name with `pnpm `.

### Global Scripts

- `build`: Compile the library.
- `fmt`: Format everything with Prettier.
- `lint`: Lint with ESLint and TSC and check for unused exports with ts-prune.
- `test:legacy`: Run tests related to the legacy API.
- `test:auth`: Run a local Express server to test authentication related functionality.
- `test:utils`: Run tests for smaller utlity functions and classes.
- `test:current`: Run all tests related to the current API.
- `test:client`: Run tests for methods within the `Client` class.
- `test:users`: Run tests for methods within the `Users` class.
- `test:wiki`: Run tests for methods within the `Wiki` class.
- `test:comments`: Run tests for methods within the `Comments` class.
- `test:ranking`: Run tests for methods within the `Ranking` class.
- `test:multiplayer`: Run tests for methods within the `Multiplayer` class.
- `test:news`: Run tests for methods within the `News` class.
- `test:beatmaps`: Run tests for methods within the `Beatmaps` class.
- `test:changelog`: Run tests for methods within the `Changelog` class.
- `test:forum`: Run tests for methods within the `Forum` class.
- `test:discussions`: Run tests for methods within the `BeatmapsetDiscussions` class.

### Docs Scripts

- `dev`: Start a local dev server.
- `build`: Compile the the website for production.
- `preview`: Start a local server for the production version of the site.
