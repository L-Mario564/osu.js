import { renameSync } from 'fs';

const dir = process.cwd();
renameSync(`${dir}/dist`, `${dir}/lib`);

console.log('Renamed "dist" folder to "lib"');
