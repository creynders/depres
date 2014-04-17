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

module.exports = {
  "a" : ['1'],
  "b" : ['2'],
  "1" : ['b'],
  "2" : ['a']
};