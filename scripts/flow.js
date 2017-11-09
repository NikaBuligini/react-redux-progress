/* eslint-disable no-console */

const path = require('path');
const { spawn } = require('child_process');

const extension = process.platform === 'win32' ? '.cmd' : '';

spawn(path.join('node_modules', '.bin', `flow${extension}`), ['check', '.'], {
  // Allow colors to pass through
  stdio: 'inherit',
}).on('close', code => {
  if (code !== 0) {
    console.log('Flow failed');
  } else {
    console.log('Flow passed');
  }

  process.exit(code);
});
