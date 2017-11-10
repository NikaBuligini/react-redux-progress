const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'cheap-module-source-map',
  module: {
    rules: [
      {
        test: /\.js?$/,
        include: [path.resolve(__dirname, 'src')],
        loader: 'babel-loader',
        options: {
          presets: ['env', 'react', 'stage-2'],
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
