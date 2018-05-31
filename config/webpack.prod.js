// config
const commonConfig = require('./webpack.common.js');
// core
const webpackMerge = require('webpack-merge');
const path = require('path');
const webpack = require('webpack');
// plugins
const TypedocWebpackPlugin = require('typedoc-webpack-plugin');
const AngularCompilerPlugin = require('@ngtools/webpack').AngularCompilerPlugin;
// variables
const context = path.resolve(__dirname, '../');
const env = process.env.NODE_ENV;

module.exports = webpackMerge(commonConfig, {
  mode: 'production',
  performance: {
    hints: false
  },
  output: {
    chunkFilename: '[id].chunk.js',
    filename: '[name].js',
    path: path.resolve(context, 'dist'),
    publicPath: 'dist',
    sourceMapFilename: '[name].map'
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        loader: '@ngtools/webpack'
      }
    ]
  },
  plugins: [
    new AngularCompilerPlugin({
      tsConfigPath: path.resolve(context, 'tsconfig-prod.json'),
      entryModule: path.resolve(context, 'src/app/app.module#AppModule'),
      skipCodeGeneration: true
    }),
    new TypedocWebpackPlugin({
      out: path.resolve(context, 'docs'),
      target: 'es6',
      exclude: '**/node_modules/**/*.*',
      experimentalDecorators: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(env)
      }
    })
  ]
});
