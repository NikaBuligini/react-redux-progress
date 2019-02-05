const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: ['@babel/polyfill', './src/index.js'],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'cheap-module-source-map',
  mode: 'production',
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
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Title',
      template: path.resolve(__dirname, './index.html'),
      filename: path.resolve(__dirname, './dist/index.html'),
    }),
  ],
};
