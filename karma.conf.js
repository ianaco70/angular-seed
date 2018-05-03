module.exports = config => {
  config.set({
    frameworks: ['jasmine', 'karma-typescript'],
    files: [
      'node_modules/reflect-metadata/Reflect.js',
      'node_modules/zone.js/dist/zone.js',
      'node_modules/zone.js/dist/proxy.js',
      'node_modules/zone.js/dist/sync-test.js',
      'node_modules/zone.js/dist/async-test.js',
      'node_modules/zone.js/dist/jasmine-patch.js',
      'node_modules/zone.js/dist/long-stack-trace-zone.js',
      {
        pattern: './src/**/*.ts'
      }
    ],
    exclude: [],
    preprocessors: {
      '**/*.ts': 'karma-typescript',
      '**/*.ts': 'babel'
    },
    reporters: ['progress', 'karma-typescript'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: Infinity,
    babelPreprocessor: {
      options: {
        presets: ['env']
      },
      filename: function(file) {
        return file.originalPath.replace(/\.ts$/, '.es6.ts');
      },
      sourceFileName: function(file) {
        return file.originalPath;
      }
    }
  });
};
