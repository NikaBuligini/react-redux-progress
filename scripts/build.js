/* eslint-disable no-console */

const fs = require('fs');
const { execSync } = require('child_process');
const prettyBytes = require('pretty-bytes');
const gzipSize = require('gzip-size');

const exec = (command, extraEnv) =>
  execSync(command, {
    stdio: 'inherit',
    env: Object.assign({}, process.env, extraEnv),
  });

console.log('Building CommonJS modules ...');

exec('babel src -d . --ignore src/__tests__', {
  BABEL_ENV: 'cjs',
});

console.log('\nBuilding ES modules ...');

exec('babel src -d es --ignore src/__tests__', {
  BABEL_ENV: 'es',
});

console.log('\nBuilding react-redux-progress.js ...');

exec('rollup -c -f umd -o umd/react-redux-progress.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'development',
});

console.log('\nBuilding react-redux-progress.min.js ...');

exec('rollup -c -f umd -o umd/react-redux-progress.min.js', {
  BABEL_ENV: 'umd',
  NODE_ENV: 'production',
});

const size = gzipSize.sync(fs.readFileSync('umd/react-redux-progress.min.js'));

console.log('\ngzipped, the UMD build is %s', prettyBytes(size));
