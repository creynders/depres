'use strict';

var Node = require('../../src/depres' ).Node;

/*
    +–––+
    | A |
  +–+–––+––-+
  |         |
  v         v
+–+–+     +–+–+
| 1 |<-+  | 2 |
+–+–+  |  +–+–+
  |    |    |
  |    |    v
  |    |  +–+–+
  |    +- | C |
  |       +–+–+
  |         |
  v         v
+–+–+     +–+–+
| B +<–––-+ 3 |
+–––+     +–––+

 */

var nA = new Node( 'a' );
var nB = new Node( 'b' );
var nC = new Node( 'c' );
var n1 = new Node( '1' );
var n2 = new Node( '2' );
var n3 = new Node( '3' );

nA.add(n1, n2);
n1.add(nB);
n2.add(nC);
nC.add(n3, n1);
n3.add(nB);

module.exports = nA;

//['b', '1', '3', 'c', '2', 'a']