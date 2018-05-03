/* core */
const chalk = require('chalk');
const glob = require('glob');
const path = require('path');
const server = require('webpack-dev-server');
const ts = require('awesome-typescript-loader');
const webpack = require('webpack');
/* plugins */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');
/* variables */
const context = path.resolve(__dirname, '../');
const mode = 'production';

module.exports = {
  mode: mode,
  cache: true,
  performance: {
    hints: false
  },
  context: path.resolve(context, 'src'),
  entry: {
    app: ['reflect-metadata', 'ts-helpers', 'zone.js', './main']
  },
  output: {
    chunkFilename: '[name].chunk',
    filename: '[name].js',
    path: path.resolve(context, 'dist'),
    sourceMapFilename: '[name].map'
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'awesome-typescript-loader'
          },
          {
            loader: 'angular2-template-loader'
          }
        ]
      },
      {
        test: /\.html$/,
        loader: 'raw-loader'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'raw-loader'
          },
          {
            loader: 'resolve-url-loader'
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(context, 'src', 'index.html'),
      hash: true,
      inject: 'body'
    }),
    new ProgressBarWebpackPlugin({
      format: chalk.blue(':bar') + ' [' + chalk.green.bold(':percent') + ']',
      clear: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new ts.TsConfigPathsPlugin({
      configFile: path.resolve(context, 'tsconfig.json')
    }),
    new TypedocWebpackPlugin({
      out: path.join(context, 'docs'),
      target: 'es6',
      exclude: '**/node_modules/**/*.*',
      experimentalDecorators: true
    })
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['node_modules', context]
  }
};
