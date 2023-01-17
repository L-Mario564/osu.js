// eslint-disable-next-line
const fs = require('fs');

// Checks if the api.json file exists before running dev or build in src/docs
if (!fs.existsSync('src/docs/static/osu.js.api.json')) {
  throw new Error('osu.js.api.json file doesn\'t exist. To solve this issue, run "npm run document" to generate the file and try again');
}