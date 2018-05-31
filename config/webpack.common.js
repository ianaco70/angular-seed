// core
const chalk = require('chalk');
const path = require('path');
// plugin
const Autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const ProgressBarWebpackPlugin = require('progress-bar-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
  .BundleAnalyzerPlugin;
// variables
const context = path.join(__dirname, '../');
const postcssConfig = {
  autoprefixer: {
    browsers: ['last 2 versions'],
    plugins: Autoprefixer
  },
  sourceMap: true
};

module.exports = {
  cache: true,
  bail: true,
  context: path.resolve(context, 'src'),
  entry: {
    pollyfills: './polyfills',
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
      },
      // assets
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file-loader?name=assets/[name].[hash].[ext]'
      }
    ]
  },
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false
    }),
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
    })
  ]
};
