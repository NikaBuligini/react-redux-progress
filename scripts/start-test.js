require('babel-core/register');

// Do this as the first thing so that any code reading it knows the right env.
process.env.BABEL_ENV = 'cjs';
process.env.NODE_ENV = 'test';

module.exports = require('./test.js');
