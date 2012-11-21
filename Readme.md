
# next-tick

  process.nextTick for browser.

## Installation

    $ component install timoxley/next-tick

## Example

```js

// This example sucks.

var nextTick = require('next-tick')

var i = 0;

nextTick(function() {
	i++ // i === 2
})

i++ // i === 1
```

## Credit

Adapted from [mocha codebase](https://github.com/visionmedia/mocha/blob/142c69991a2f39c0add38ba1d202c094e69d81f9/support/tail.js#L19).

## License

  MIT
