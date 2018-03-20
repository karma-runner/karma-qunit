module.exports = function (config) {
  config.set({
    frameworks: ['qunit'],

    files: [
      '*'
    ],

    reporters: ['progress'],

    port: 9876,

    colors: true,

    logLevel: config.LOG_INFO,

    autoWatch: false,

    browsers: ['Chrome'],

    singleRun: false,

    plugins: [
      require('../../lib/index.js'),
      'karma-chrome-launcher'
    ]
  })
}
