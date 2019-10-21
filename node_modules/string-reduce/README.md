# string-reduce [![Build Status](https://travis-ci.org/tjmehta/string-reduce.svg?branch=master)](https://travis-ci.org/tjmehta/string-reduce)
Reduce a string to a value

# Installation
```bash
npm i --save string-reduce
```

# Usage
```js
var reduce = require('string-reduce')

var sum = reduce('yolo', (sum, char) => {
  return sum + character.charCodeAt()
}, 0)
// sum: 451

var expectedSum = 0 +    
  'y'.charCodeAt(0) + // 121
  'o'.charCodeAt(0) + // 111
  'l'.charCodeAt(0) + // 108
  'o'.charCodeAt(0)   // 111
// expectedSum: 451
```

# License
MIT
