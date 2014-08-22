/*!
 * depres v0.1.0
 * https://github.com/creynders/depres
 *
 * Copyright (c) 2014 Camille Reynders
 * Licensed under the MIT license.
 */
/* jshint undef: false, strict: false */
(function( root,
           factory ){
  // Turn off strict mode for this function so we can assign to global

  /*
   AMD/CommonJS compatibility largely stolen from https://github.com/kriskowal/q/blob/master/q.js
   */

  // This file will function properly as a <script> tag, or a module
  // using CommonJS and NodeJS or RequireJS module formats.  In
  // Common/Node/RequireJS, the module exports the depres API and when
  // executed as a simple <script>, it creates a depres global instead.

  // CommonJS
  if( typeof exports === "object" ){
    module.exports = factory( require( 'lodash' ) );

    // RequireJS
  }else if( typeof define === "function" && define.amd ){
    define( ["lodash"], factory );

    // <script>
  }else{
    root.depres = factory( root._ );
  }

})( this, function( _ ){
  "use strict";

  function Node( id ){
    this.id = id;
    this.deps = [];
  }

  Node.prototype.add = function(){
    var deps = arguments[0];
    if( !_.isArray( deps ) ){
      deps = _.toArray( arguments );
    }
    this.deps = this.deps.concat( deps );
  };

  function resolveNode( node,
                        res,
                        processor ){
    res.unresolved.push( node );
    var aborted = _.some( node.deps, function( dependency ){
      if( processor ){
        dependency = processor( dependency );
      }
      if( !_.find( res.resolved, {id : dependency.id} ) ){
        if( _.find( res.unresolved, {id : dependency.id} ) ){
          return true;
        }
        return resolveNode( dependency, res, processor );
      }
      return false;
    } );
    if( !aborted ){
      res.resolved.push( node );
      _.pull( res.unresolved, node );
    }
    return aborted;
  }

  function resolveTree( root ){

    var res = {
      resolved   : [],
      unresolved : []
    };
    res.aborted = resolveNode( root, res );

    return res;
  }

  function resolveMap( map ){
    var res = {
      resolved   : [],
      unresolved : []
    };

    var node = new Node( 'root' );
    node.add( _.keys( map ) );
    res.aborted = resolveNode( node, res, function( dependency ){
      if( _.isString( dependency ) ){
        dependency = new Node( dependency );
        dependency.add( map[dependency.id] );
      }
      return dependency;
    } );

    _.each( ['unresolved', 'resolved'], function( list ){
      _.remove( res[list], {id : "root"} );
      res[list] = _.pluck( res[list], 'id' );
    } );

    return res;
  }

  return {
    resolveTree : resolveTree,
    resolveMap  : resolveMap,
    Node        : Node
  };
} );