const chalk = require('chalk');
const glob = require('glob');
const path = require('path');
const server = require('webpack-dev-server');
const ts = require('awesome-typescript-loader');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');

module.exports = {
  cache: true,
  performance: {
    hints: false
  },
  context: path.resolve(__dirname, 'src'),
  entry: {
    app: ['ts-helpers', 'zone.js', './main.ts']
  },
  output: {
    chunkFilename: '[name].chunk',
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    sourceMapFilename: '[name].map'
  },
  devtool: 'sourcemap',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
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
      template: path.resolve(__dirname, 'src', 'index.html'),
      hash: true,
      inject: 'body'
    }),
    new ProgressBarWebpackPlugin({
      format: chalk.blue(':bar') + ' [' + chalk.red.bold(':percent') + ']',
      clear: true
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(path.resolve(
        __dirname,
        'dist',
        'vendor',
        'vendor-manifest.json'
      ))
    }),
    new webpack.NamedModulesPlugin(),
    new TypedocWebpackPlugin({
      target: 'es5',
      exclude: '**/node_modules/**/*.*',
      experimentalDecorators: true
    }),
    new ts.TsConfigPathsPlugin({
      configFile: path.resolve(__dirname, 'tsconfig.json')
    })
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    modules: ['node_modules', __dirname]
  }
};
