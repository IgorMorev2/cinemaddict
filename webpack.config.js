const path = require('path');
const webpack = require('webpack');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = (env) => {
  return {
    mode: env.mode ?? 'development',
    entry: path.resolve(__dirname, 'src', 'main.js'),
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'build.js',
      clean: true
    },
    plugins: [
      new webpack.SourceMapDevToolPlugin({}),
      new CopyPlugin({
        patterns: [
          { from: 'public' },
        ],
      }),
    ],
    module: {
      rules: [
        {
          test: /\\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader'],
        }
      ]
    }
  }
}
