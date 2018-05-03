const chalk = require('chalk');
const path = require('path');
const webpack = require('webpack');

const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');

const context = path.join(__dirname, '../../');

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
  'ts-helpers'
];

module.exports = {
  mode: 'none',
  cache: true,
  performance: {
    hints: false
  },
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
      format: chalk.blue(':bar') + ' [' + chalk.red.bold(':percent') + ']',
      clear: false
    })
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(context, 'node_modules')]
  }
};
