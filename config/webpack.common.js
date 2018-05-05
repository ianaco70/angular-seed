// core
const chalk = require('chalk');
const path = require('path');
const ts = require('awesome-typescript-loader');
// plugin
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
// variables
const context = path.join(__dirname, '../');
const postcssConfig = {
  autoprefixer: {
    browsers: ['last 2 versions'],
    plugins: autoprefixer
  },
  sourceMap: true
};

module.exports = {
  cache: true,
  bail: true,
  context: path.resolve(context, 'src'),
  entry: {
    vendor: './vendor',
    app: ['./main'],
    styles: './styles/main'
  },
  resolve: {
    extensions: ['.js', '.ts', '.css', '.scss'],
    modules: ['node_modules', context]
  },
  module: {
    rules: [
      // typescript
      {
        test: /\.ts$/,
        loaders: ['awesome-typescript-loader', 'angular2-template-loader']
      },
      // html
      {
        test: /\.html$/,
        loader: 'html-loader'
      },
      // css / scss project style
      {
        test: /\.(css|scss)$/,
        exclude: path.resolve(context, 'src', 'app'),
        loaders: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: postcssConfig
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true
            }
          }
        ]
      },
      // css / scss app styles
      {
        test: /\.(css|scss)/,
        include: path.resolve(context, 'src', 'app'),
        loaders: [
          'raw-loader',
          'resolve-url-loader',
          {
            loader: 'postcss-loader',
            options: postcssConfig
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
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css'
    }),
    new ProgressBarWebpackPlugin({
      format: chalk.blue(':bar') + ' [' + chalk.green.bold(':percent') + ']',
      clear: true
    }),
    new ts.TsConfigPathsPlugin({
      configFile: path.resolve(context, 'tsconfig.json')
    })
  ]
};
