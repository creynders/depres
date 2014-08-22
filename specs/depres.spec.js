/* jshint -W024, expr:true */
/*global describe, it*/
'use strict';

var expect = require( 'chai' ).expect;
var depres = require( '../src/depres' );
var util = require( 'util' );
var _ = require( 'lodash' );
var fx = require( './fixtures' );

//console.log( util.inspect( fx.simpleGraph, {depth : 3} ) );

describe( 'depres', function(){

  describe( 'spec', function(){

    it( 'should run', function(){
      expect( true ).to.equal( true );
    } );

  } );

  describe( 'module', function(){

    it( 'should export an object', function(){
      expect( depres ).to.be.an( 'object' );
    } );

    it( 'should expose a Node function', function(){
      expect( depres.Node ).to.be.a( 'function' );
    } );

  } );

  describe( '#resolveTree', function(){

    it( 'should be exposed as a function', function(){
      expect( depres.resolveTree ).to.be.a( 'function' );
    } );

    it( 'should resolve correctly', function(){
      var result = depres.resolveTree( fx.refs_simpleGraph );
      expect( result.aborted ).to.be.false;
      expect( _.pluck( result.resolved, 'id' ) ).to.deep.equal( ['b', '1', '3', 'c', '2', 'a'] );
    } );

    it( 'should bail on circular deps', function(){
      var result = depres.resolveTree( fx.refs_circularGraph );
      expect( result.aborted ).to.be.true;
      expect( result.resolved ).to.have.length( 0 );
    } );

  } );

  describe( '#resolveMap', function(){

    it( 'should be exposed as a function', function(){
      expect( depres.resolveMap ).to.be.a( 'function' );
    } );

    it( 'should resolve correctly', function(){
      var result = depres.resolveMap( fx.ids_simpleGraph );
      expect( result.aborted ).to.be.false;
      expect( result.resolved ).to.deep.equal( ['b', '1', '3', 'c', '2', 'a'] );
    } );

    it( 'should bail on circular deps', function(){
      var result = depres.resolveMap( fx.ids_circularGraph );
      expect( result.aborted ).to.be.true;
      expect( result.resolved ).to.have.length( 0 );
    } );

    it( 'should resolve complex graphs', function(){
      var result = depres.resolveMap( fx.ids_complexGraph );
      expect( result.aborted ).to.be.false;
      expect( result.resolved ).to.deep.equal( [
        'F',
        'U',
        'W',
        'I',
        'O',
        'L',
        'T',
        'C',
        'B',
        'D',
        'Q',
        'K',
        'N',
        'Z',
        'S',
        'R',
        'M',
        'J',
        'E',
        'P',
        'V',
        'G',
        'H',
        'A',
        'X',
        'Y'
      ] );
    } );

  } );
} );
