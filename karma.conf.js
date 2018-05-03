/* core */
const path = require('path');
const webpack = require('webpack');
/* variables */
const mode = 'development';

module.exports = config => {
  config.set({
    frameworks: ['jasmine'],
    files: [
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      {
        pattern: path.resolve(__dirname, './src/**/*.spec.ts')
      }
    ],
    mime: { 'text/x-typescript': ['ts'] },
    preprocessors: {
      '*.js': ['sourcemap'],
      '**/*.spec.ts': ['sourcemap', 'webpack']
    },
    reporters: ['spec'],
    webpack: {
      mode: mode,
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
        new webpack.NamedModulesPlugin(),
        new webpack.SourceMapDevToolPlugin({
          filename: null,
          test: /\.(ts|js)($|\?)/i
        })
      ],
      resolve: {
        extensions: ['.ts', '.js']
      }
    },
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: Infinity
  });
};
