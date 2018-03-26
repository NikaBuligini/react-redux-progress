const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/dist',
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
            presets: ['env', 'react', 'stage-2'],
          },
        },
      },
      {
        test: /\.svg$/,
        use: 'svg-inline-loader',
      },
      {
        test: /\.(ogg)(\?.*)?$/,
        use: 'file-loader?name=/audio/[name].[ext]',
      },
    ],
  },
};
