// Karma configuration
// Generated on Fri Sep 12 2014 15:17:40 GMT+1000 (EST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


      plugins: [
          'karma-ng-extjs-scenario'
          , 'karma-jasmine'
          , 'karma-chrome-launcher'
          , 'karma-firefox-launcher'],

//      frameworks: [
//          'ng-extjs-scenario'
//      ]
//      ,

    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
      frameworks: ['jasmine'],
//    frameworks: ['jasmine', 'ng-extjs-scenario'],
//    frameworks: ['ng-extjs-scenario'],


    // list of files / patterns to load in the browser
    files: [
      '*.js',
      'test/js/*.spec.js',
      '/test/js/*.spec.js',
      '/test/js/jasmine/*.spec.js',
      '/test/js/jasmine/specs/*.spec.js',
      '/test/js/jasmine/specs/*spec.js',
      '/test/js/jasmine/specs/*Spec.js',
      '/test/js/jasmine/specs/*.spec.js',
      'test/js/jasmine/specs/*.spec.js',
        'test/*.spec.js'
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
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome', 'Firefox', 'Safari', 'Opera', 'IE'],


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};
