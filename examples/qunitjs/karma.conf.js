module.exports = function (config) {
  config.set({
    basePath: '..',

    frameworks: ['qunit'],

    files: [
      'https://code.jquery.com/jquery-3.3.1.min.js',
      '*.js'
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
    ],
    client: {
      qunit: {
        QUnitJS: true
      }
    }
  })
}
