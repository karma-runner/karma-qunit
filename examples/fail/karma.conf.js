module.exports = function (config) {
  config.set({
    plugins: [
      require('../../lib/index.js'),
      'karma-firefox-launcher',
      'karma-mocha-reporter'
    ],
    browsers: ['FirefoxHeadless'],
    frameworks: ['qunit'],
    reporters: ['mocha'],

    files: [
      'test.js'
    ],

    autoWatch: false,
    singleRun: true
  })
}
