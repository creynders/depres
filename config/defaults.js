'use strict';

module.exports = function( grunt,
                           opts ){
  return {
    tasks : {
      jshint : {
        options     : {
          reporter : require( 'jshint-stylish' ),
          jshintrc : true
        }
      }
    }
  };
};


