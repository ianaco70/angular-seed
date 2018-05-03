/* core */
const chalk = require('chalk');
const glob = require('glob');
const path = require('path');
const server = require('webpack-dev-server');
const ts = require('awesome-typescript-loader');
const webpack = require('webpack');
/* plugin */
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
/* variables */
const context = path.join(__dirname, '../');
const mode = 'development';

module.exports = {
  mode: mode,
  cache: true,
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
  devtool: 'sourcemap',
  devServer: {
    contentBase: path.resolve(context, 'dist'),
    compress: true,
    inline: true,
    historyApiFallback: true,
    hot: true,
    https: false,
    port: 3000,
    quiet: false,
    stats: {
      buildAt: true,
      chunks: true,
      env: true,
      hash: true
    }
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
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(path.resolve(
        context,
        'dist',
        'vendor',
        'vendor-manifest.json'
      ))
    }),
    new webpack.NamedModulesPlugin(),
    new ts.TsConfigPathsPlugin({
      configFile: path.resolve(context, 'tsconfig.json')
    })
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['node_modules', context]
  }
};
