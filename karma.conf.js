module.exports = config => {
  config.set({
    basePath: './src',
    frameworks: ['jasmine'],
    files: [
      {
        pattern: '**/*.spec.ts',
        include: true
      }
    ],
    exclude: [],
    preprocessors: {},
    reporters: ['progress'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadless'],
    singleRun: false,
    concurrency: Infinity
  });
};
