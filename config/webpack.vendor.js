/* utils */
const chalk = require('chalk');
const path = require('path');
const webpack = require('webpack');
/* plugins */
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
/* variables */
const context = path.resolve(__dirname, '../');
const mode = 'development';
const vendor = [
  '@angular/common',
  '@angular/compiler',
  '@angular/core',
  '@angular/forms',
  '@angular/http',
  '@angular/platform-browser',
  '@angular/platform-browser-dynamic',
  '@angular/router',
  'core-js',
  'rxjs',
  'ts-helpers',
  'zone.js'
];

module.exports = {
  mode: mode,
  cache: true,
  context: context,
  entry: {
    vendor: vendor
  },
  output: {
    filename: '[name].dll.js',
    library: '[name]',
    path: path.resolve(context, 'dist', 'vendor')
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
    extensions: ['.ts', '.js'],
    modules: [path.resolve(context, 'node_modules')]
  }
};
