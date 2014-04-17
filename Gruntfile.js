/*global module:false*/
module.exports = function( grunt ){
  "use strict";
  require( 'time-grunt' )( grunt );
  require( 'jit-grunt' )( grunt );

  var config = {
    pkg   : grunt.file.readJSON( 'package.json' ),
    paths : {
      src   : 'src',
      specs : 'specs',
      dist  : 'dist'
    }
  };

  grunt.initConfig( require( 'load-grunt-configs' )( grunt, config ) );

  grunt.registerTask( 'test', ['jshint', 'mochaTest'] );
  grunt.registerTask( 'build', [
    'nice-package',
    'update_json',
    'test',
    'clean:distDir',
    'concat:sourceFiles',
    'uglify:sourceFiles',
    'replace:distFiles'
  ] );

  grunt.registerTask('default', ['build']);
};