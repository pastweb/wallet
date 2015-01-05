// Karma configuration
// Generated on Sun Dec 21 2014 02:44:54 GMT+0000 (GMT)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [
    //  Dependencies
      '../lib/angular-1.3.8/angular.js',
      '../lib/angular-1.3.8/angular-mocks.js',
      '../lib/jquery/jquery-2.1.1.min.js',
      '../lib/bootstrap-ui/bootstrap-3.2.0-dist/js/bootstrap.min.js',
      '../lib/ngStorage/ngStorage.min.js',
      '../lib/angular-ui-router/angular-ui-router.min.js',
    //  My Code
      '../js/*.js',
      '../js/**/*.js',
    // Unit test
//      './unit/*.test.js',
      './unit/**/*.test.js'
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
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: false,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
