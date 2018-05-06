// config
const commonConfig = require('./webpack.common.js');
// core
const path = require('path');
const server = require('webpack-dev-server');
const webpack = require('webpack');
const webpackMerge = require('webpack-merge');
// plugins
const AddAssetHtmlWebpackPlugin = require('add-asset-html-webpack-plugin');
// variables
const context = path.join(__dirname, '../');

if (module.hot) {
  module.hot.accept();
}

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
  plugins: [
    new AddAssetHtmlWebpackPlugin({
      filepath: path.join(context, 'dist/vendor/vendor.dll.js'),
      hash: true,
      includeSourcemap: false
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
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  ]
});
