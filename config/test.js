'use strict';

module.exports = function( grunt,
                           opts ){
  return {
    tasks : {
      jshint    : {
        testFiles : [opts.paths.specs + '/**/*.js']
      },
      mochaTest : {
        test : {
          options : {
            reporter : 'spec'
          },
          src     : [opts.paths.specs + '/*.spec.js']
        }
      }
    }
  }
}


