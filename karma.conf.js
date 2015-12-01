// Karma configuration
// Generated on Sun Nov 22 2015 23:45:41 GMT+0000 (GMT Standard Time)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
      'node_modules/angular/angular.min.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-aria/angular-aria.min.js',
      'node_modules/angular-cookies/angular-cookies.min.js',
      'node_modules/angular-animate/angular-animate.min.js',
      'node_modules/sugar/release/sugar-full.development.js',
      'app/libs/xml2json.min.js',
      'app/components/main/app.js',
      'app/components/utils/serviceURLs.js',
      'app/components/utils/utils.js',
      'app/components/forecast/forecast.js',
      'app/components/forecast/forecastFactory.js',
      'app/components/forecast/forecastService.js',
      'app/components/preferences/preferences.js',
      'app/components/preferences/preferencesFactory.js',
      'app/components/**/*.js',
      'test/**/*Spec.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
    reporters: ['progress'],


    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['PhantomJS'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false,

    // Concurrency level
    // how many browser should be started simultanous
    concurrency: Infinity
  })
}
