/* eslint-disable no-console */

const path = require('path');
const { spawn } = require('child_process');

const extension = process.platform === 'win32' ? '.cmd' : '';

spawn(
  path.join('node_modules', '.bin', `eslint${extension}`),
  ['.', '--max-warnings=0'],
  {
    // Allow colors to pass through
    stdio: 'inherit',
  },
).on('close', code => {
  if (code !== 0) {
    console.error('Lint failed');
  } else {
    console.log('Lint passed');
  }

  process.exit(code);
});
