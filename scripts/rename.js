import { renameSync, rmSync } from 'fs';

const dir = process.cwd();
rmSync(`${dir}/lib`, {
  force: true,
  recursive: true
});
renameSync(`${dir}/dist`, `${dir}/lib`);

console.log('Renamed "dist" folder to "lib"');
