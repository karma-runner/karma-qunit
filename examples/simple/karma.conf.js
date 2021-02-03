module.exports = function (config) {
  config.set({
    frameworks: ['qunit'],

    files: [
      'https://code.jquery.com/jquery-3.3.1.min.js',
      '*'
    ],

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: process.env.CI ? ['ChromeHeadless'] : ['Chrome'],

    singleRun: false,

    plugins: [
      require('../../lib/index.js'),
      'karma-chrome-launcher'
    ]
  })
}
