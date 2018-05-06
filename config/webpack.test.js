// core
const webpack = require('webpack');

module.exports = {
  mode: 'development',
  context: __dirname,
  devtool: 'sourcemap',
  module: {
    rules: [
      {
        test: /\.html$/,
        loaders: ['raw-loader', 'sass-loader']
      },
      {
        test: /\.scss$/,
        loaders: ['raw-loader', 'sass-loader']
      },
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      PRODUCTION: false
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: null,
      test: /\.(ts|js)($|\?)/i
    })
  ],
  resolve: {
    extensions: ['.ts', '.js']
  }
};
