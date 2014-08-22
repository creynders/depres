# DepRes

> Dependency graph resolution

## What?

A very small, simple module that allows you to resolve dependency graphs.
You can feed it with a tree or an id map and it will output an ordered array of nodes or id's sorted bottom-up.

## Example

Let's say you've got the following dependency graph:

```
      +–––+
      | A |
  +–––o–––o–––+
  |           |
  v           v
+–––+       +–––+
| B |<–––+  | C |
+–o–+    |  +–o–+
  |      |    |
  |      |    v
  |      |  +–––+
  |      +––o D |
  |         +–o–+
  |           |
  v           v
+–+–+       +–––+
| E |<––––––o F |
+–––+       +–––+
```

* A depends on B and C
* B depends on E
* C depends on D
* D depends on B and F
* E has no dependencies
* F depends on E

DepRes will output `['E', 'B', 'F', 'D', 'C', 'A']` since this is (one of two) safe ways to traverse the nodes making sure that dependencies are present before their dependants.

## Installation

### Npm

```shell
npm install depres
```

### Bower

```
bower install depres
```

### Download

Or you can download the files from the [/dist](/dist) directory

## Linking/requiring

### AMD

```js
define(['depres'], function(depres){
  //use depres here
});
```

### CommonJS / Node

```js
var depres = require('depres');
```

### Global object

```html
<script src="depres.min.js"></script>
```

Now `depres` is available as a global object.

## Dependencies

DepRes depends on the [Lodash][Lodash] lib, when using bower or npm the dependency will automatically downloaded.
If you choose to use the script-tag, please add the lodash js file in a similar fashion.

## Usage

DepRes exposes two methods: `depres.resolveTree` and `depres.resolveMap`. A tree should consist out of nodes with an `id` field and a `deps` field which contains its dependencies in an Array.
A `Node` object is also exposed as `depres.Node`, but you don't have to use it. As long as your objects contain a string `id` and an array `deps` you're good to go.

### Example with nodes

Let's generate the above dependency graph as a tree using the `Node` object:

```js
var N = depres.Node;

var A = new N( 'A' );
var B = new N( 'B' );
var C = new N( 'C' );
var D = new N( 'D' );
var E = new N( 'E' );
var F = new N( 'F' );

//Node objects have a `add` method which allows you to add one or more dependencies at once
A.add(B, C); //Note: these are Node instances, NOT id's [!]
B.add(E);
C.add(D);
D.add(B, F);
//E has no dependencies
F.add(E);

var result = depres.resolveTree( A ); //pass the root node
console.log(result.resolved);
/*
output:
[ { id: 'E', deps: [] },
  { id: 'B', deps: [Object] },
  { id: 'F', deps: [Object] },
  { id: 'D', deps: [Object] },
  { id: 'C', deps: [Object] },
  { id: 'A', deps: [Object] } ],
*/
```

### Example with an id map

```js
var map = {
  'A' : ['B', 'C'],
  'B' : ['E'],
  'C' : ['D'],
  'D' : ['B', 'F'],
  'E' : [],
  'F' : ['E']
};

var result = depres.resolveMap( map ); //pass the id map
console.log(result.resolved);

//outputs: ['E', 'B', 'F', 'D', 'C', 'A']
```

### Result

The result of `resolveTree` and `resolveMap` is an object with following properties:

* `resolved`: a sorted Array containing the resolved nodes or ids
* `unresolved`: a sorted Array containing the unresolved nodes or ids
* `aborted`: a Boolean to indicate the failure of the resolution

The `unresolved` array will only be populated when something went wrong, it contains the nodes/id's that were being processed before the script aborted, i.e. it shows you a path to the problematic node/id.
**Resolution is aborted whenever the script encounters a circular dependency.**

`resolved` contains the arrray with the nodes or ids in a safe-loading order.

## License

Released under [MIT license](/LICENSE-MIT)
