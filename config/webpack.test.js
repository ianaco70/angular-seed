// core
const webpack = require('webpack');
const env = process.env.NODE_ENV;

module.exports = {
  mode: 'development',
  context: __dirname,
  devtool: 'sourcemap',
  module: {
    rules: [
      {
        test: /\.html$/,
        loader: 'html-loader',
      },
      {
        test: /\.scss$/,
        loaders: ['raw-loader', 'sass-loader'],
      },
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
      },
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        ENV: JSON.stringify(env),
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.SourceMapDevToolPlugin({
      filename: null,
      test: /\.(ts|js)($|\?)/i,
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
  },
};
