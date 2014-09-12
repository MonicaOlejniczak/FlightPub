// Karma configuration
// Generated on Fri Sep 12 2014 22:17:49 GMT+1000 (EST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
//    frameworks: ['jasmine'],
//    frameworks: ['jasmine', 'ng-extjs-scenario'],
    frameworks: ['ng-extjs-scenario'],

    plugins: [
          'karma-ng-extjs-scenario'
          , 'karma-jasmine'
          , 'karma-chrome-launcher'
          , 'karma-firefox-launcher'
          , 'karma-safari-launcher'
          , 'karma-opera-launcher'
          , 'karma-ie-launcher'
          , 'karma-phantomjs-launcher'
          , 'karma-js-coverage'


    ],

    // list of files / patterns to load in the browser
    files: [
      'public/**/*.js',
      'test/js/jasmine/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
//    preprocessors: {
//    },
      preprocessors: { '*.js': ['coverage'] },



      // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        // js.jasmine.coverage reporter generates the js.jasmine.coverage
    reporters: ['progress', 'coverage'],


      // optionally, configure the reporter
      coverageReporter: {
          type : 'html',
//          dir : 'test/js/jasmine/coverage/'
          dir : 'test/js.jasmine.coverage/'

      },

    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_INFO,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    // phantom allows to test on html/js without a browser

      // phantom only mode
    browsers: ['PhantomJS'],

    // browser and phantom mode
//    browsers: ['Chrome', 'Firefox', 'Safari', 'Opera', 'IE', 'PhantomJS'],

      // browser only mode mac (no IE)
//    browsers: ['Chrome', 'Firefox', 'Safari', 'Opera'],

      // browser only mode windows (no Safari)
//    browsers: ['Chrome', 'Firefox', 'Opera', 'IE'],

      // browser only mode windows + safari
//    browsers: ['Chrome', 'Firefox', 'Safari', 'Opera', 'IE'],

    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: true
  });
};
