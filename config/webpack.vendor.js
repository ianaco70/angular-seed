/* utils */
const chalk = require('chalk');
// core
const autoprefixer = require('autoprefixer');
const path = require('path');
const webpack = require('webpack');
// plugins
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
// variables
const context = path.resolve(__dirname, '../');

module.exports = {
  mode: 'development',
  bail: true,
  cache: true,
  context: context,
  entry: {
    vendor: [path.resolve(context, 'src', 'vendor')]
  },
  output: {
    filename: '[name].dll.js',
    library: '[name]',
    path: path.resolve(context, 'dist', 'vendor')
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: 'css-loader'
      }
    ]
  },
  plugins: [
    new webpack.DllPlugin({
      name: '[name]',
      path: path.resolve(context, 'dist', 'vendor', '[name]-manifest.json')
    }),
    new webpack.NamedModulesPlugin(),
    new ProgressBarWebpackPlugin({
      format: chalk.blue(':bar') + ' [' + chalk.green.bold(':percent') + ']',
      clear: false
    })
  ],
  resolve: {
    extensions: ['.ts', '.js', '.css', '.scss'],
    modules: [path.resolve(context, 'node_modules')]
  }
};
