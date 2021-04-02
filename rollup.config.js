import path from 'path';
import babel from '@rollup/plugin-babel';
import resolve from '@rollup/plugin-node-resolve';
import typescript from '@rollup/plugin-typescript';
import esbuild from 'rollup-plugin-esbuild';
import { sizeSnapshot } from 'rollup-plugin-size-snapshot';

const createBabelConfig = require('./babel.config');
const { root } = path.parse(process.cwd());
const extensions = ['.js', '.ts', '.tsx'];

function external(id) {
  return !id.startsWith('.') && !id.startsWith(root);
}

function getBabelOptions(targets) {
  return {
    ...createBabelConfig({ env: (env) => env === 'build' }, targets),
    extensions,
    comments: false,
    babelHelpers: 'bundled',
  };
}

function getEsbuild(target) {
  return esbuild({
    minify: false,
    target,
    tsconfig: path.resolve('./tsconfig.json'),
  });
}

function createDeclarationConfig(input, output) {
  return {
    input,
    output: {
      dir: output,
    },
    external,
    plugins: [typescript({ declaration: true, outDir: output })],
  };
}

function createESMConfig(input, output) {
  return {
    input,
    output: { file: output, format: 'esm' },
    external,
    plugins: [resolve({ extensions }), getEsbuild('node12'), sizeSnapshot()],
  };
}

function createCommonJSConfig(input, output) {
  return {
    input,
    output: { file: output, format: 'cjs', exports: 'named' },
    external,
    plugins: [
      resolve({ extensions }),
      babel(getBabelOptions({ ie: 11 })),
      sizeSnapshot(),
    ],
  };
}

export default () => {
  return [
    createDeclarationConfig('src/index.ts', 'dist'),
    createCommonJSConfig('src/index.ts', 'dist/index.js'),
    createESMConfig('src/index.ts', 'dist/index.module.js'),
    createCommonJSConfig('src/reducer.ts', 'dist/reducer.js'),
    createESMConfig('src/reducer.ts', 'dist/reducer.module.js'),
    createCommonJSConfig(
      'src/ProgressBarProvider.tsx',
      'dist/ProgressBarProvider.js'
    ),
    createESMConfig(
      'src/ProgressBarProvider.tsx',
      'dist/ProgressBarProvider.module.js'
    ),
  ];
};
