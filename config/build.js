'use strict';
var path = require( 'path' );

module.exports = function( grunt,
                           opts ){
  var sourceFiles = path.join( opts.paths.src, '*.js' );
  var distFile = path.join( opts.paths.dist, opts.pkg.name + '.js' );
  var minFile = path.join( opts.paths.dist, opts.pkg.name + '.min.js' );
  var banner = '/*! <%= pkg.name %> - v<%= pkg.version %> - (c) <%= grunt.template.today("yyyy") %> ' + '<%= pkg.author.name %>; Licensed <%= pkg.licenses[0].type %> */';
  return {
    tasks : {

      jshint : {
        buildFiles  : ['Gruntfile.js'],
        sourceFiles : sourceFiles
      },

      concat : {
        sourceFiles : {
          src  : sourceFiles,
          dest : distFile
        }
      },

      uglify : {
        sourceFiles : {
          options : {
            banner: banner
          },
          src  : sourceFiles,
          dest : minFile
        }
      },

      clean : {
        distDir : opts.paths.dist
      },

      replace : {
        distFiles : {
          options : {
            variables : {
              'version' : opts.pkg.version
            }
          },
          files   : [
            {
              expand : true,
              flatten : true,
              src : sourceFiles,
              dest : opts.paths.dist + '/'
            }
          ]
        }
      },

      update_json :{
        bowerFile : {
          src : 'package.json',
          dest : 'bower.json',
          fields : [
              'name',
              'version',
              'description',
              'repository',
              'homepage'
          ]
        }
      }
    }
  }
};