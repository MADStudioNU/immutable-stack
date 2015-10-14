## Immutable Stack

An array-wrapper that provides immutable `push` and `pop` operations.

### Author
Jordan Timmerman (@skorlir)
at the Northwestern University WCAS Multimedia Learning Center (MMLC)

### License
ISC

## Usage

```js

// Initialize an ImmutableStack just by calling ImmutableStack without arguments
var items = ImmutableStack()

// ImmutableStack can also be initalized with a start stack
var items = ImmutableStack([ 1, 2, 3 ])

items.push(1) // => ImmutableStack [ 1, 2, 3, 1 ]
// ImmutableStack#stack returns the raw array
items.stack() // => [ 1, 2, 3 ]

// The ImmutableStack#push API is exactly the same as Array#push
var moreItems = items.push(4, 5, 6, 7)
moreItems.stack() // => [ 1, 2, 3, 4, 5, 6, 7 ]
items.stack()     // => [ 1, 2, 3 ]

// The ImmutableStack#pop API is not the same
// Currently, ImmutableStack#pop does not return the popped element
moreItems.pop()   // => ImmutableStack [ 1, 2, 3, 4, 5, 6 ]

// The use case for which ImmutableStack was written doesn't require that functionality
// But it would be possible to build it in

```
