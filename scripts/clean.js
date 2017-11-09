// @flow
/* eslint-disable no-console */

const path = require('path');
const fs = require('fs');
const rimraf = require('rimraf');
const chalk = require('chalk');
const { argv } = require('yargs');

const possibleTargets = {
  coverage: '../coverage',
  dist: '../dist',
  flow: '../flow-typed/npm',
};

let target = possibleTargets[argv.target];

if (!target) {
  console.log(`${chalk.red('invalid target option')}`);
  process.exit();
}

if (!target) {
  console.log(`${chalk.red(`don't touch root`)}`);
  process.exit();
}

target = path.resolve(__dirname, target);

if (fs.existsSync(target)) {
  rimraf.sync(target);

  console.log(`clean ${argv.target} ${chalk.green('✓')}`);
} else {
  console.log(chalk.gray(`clean ${argv.target}`));
}
