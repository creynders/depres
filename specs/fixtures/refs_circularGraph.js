'use strict';

var Node = require('../../src/depres' ).Node;

/*
    +–––+
    | A |
  +–+–––+––+
  |        ^
  v        |
+–+–+    +–+–+
| 1 |    | 2 |
+–+–+    +–+–+
  |        ^
  v        |
+–+–+      |
| B +------+
+–––+

 */

var nA = new Node( 'a' );
var nB = new Node( 'b' );
var n1 = new Node( '1' );
var n2 = new Node( '2' );

nA.add(n1);
n1.add(nB);
nB.add(n2);
n2.add(nA);

module.exports = nA;