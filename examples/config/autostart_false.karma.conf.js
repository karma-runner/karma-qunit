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

    client: {
      qunit: {
        autostart: false
      }
    },

    files: [
      'autostart_false.test.js'
    ],

    autoWatch: false,
    singleRun: true
  })
}
