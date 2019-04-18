const path = require('path');

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, 'src')],
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['babel-preset-nb'],
          },
        },
      },
    ],
  },
};
