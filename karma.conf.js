var FIREFOX = process.env.CI ? ['FirefoxHeadless'] : ['Firefox']
var CHROME = process.env.CI ? ['ChromeHeadless'] : ['Chrome']

module.exports = function (config) {
  config.set({
    frameworks: ['jasmine'],

    files: [
      'src/*.js',
      'test/src/*.js'
    ],

    browsers: process.env.CI ? FIREFOX : CHROME,

    customLaunchers: {
      FirefoxHeadless: {
        base: 'Firefox',
        flags: ['-headless']
      }
    },

    autoWatch: true
  })
}
