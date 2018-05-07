const { BABEL_ENV } = process.env;
const building = BABEL_ENV !== undefined && BABEL_ENV !== 'cjs';
const transformImports = require('babel-plugin-transform-imports');

const plugins = [[transformImports]];

if (BABEL_ENV === 'umd') {
  plugins.push('external-helpers');
}

if (process.env.NODE_ENV === 'production') {
  plugins.push('dev-expression', 'transform-react-remove-prop-types');
}

module.exports = {
  presets: [
    [
      'env',
      {
        loose: true,
        modules: building ? false : 'commonjs',
      },
    ],
    'stage-2',
    'react',
    'flow',
  ],
  plugins,
};
