// config
const commonConfig = require('./webpack.common.js');
// core
const path = require('path');
const server = require('webpack-dev-server');
const ts = require('awesome-typescript-loader');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
// plugins
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
// variables
const context = path.join(__dirname, '../');
const env = process.env.NODE_ENV;

module.exports = webpackMerge(commonConfig, {
  mode: 'development',
  output: {
    chunkFilename: '[id].chunk.js',
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
    publicPath: '/',
    stats: {
      buildAt: true,
      chunks: true,
      env: true,
      hash: true
    }
  },
  module: {
    rules: [
      // typescript
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      }
    ]
  },
  plugins: [
    new AddAssetHtmlWebpackPlugin({
      filepath: path.join(context, 'dist/vendor/vendor.dll.js'),
      hash: true,
      includeSourcemap: false
    }),
    new ts.TsConfigPathsPlugin({
      configFile: path.resolve(context, 'tsconfig.json')
    }),
    new webpack.DllReferencePlugin({
      context: process.cwd(),
      manifest: require(path.resolve(
        context,
        'dist',
        'vendor',
        'vendor-manifest.json'
      ))
    }),
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(env)
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
});
