var assertErr = require('assert-err')

module.exports = stringReduce

/**
 * reduce a string to a value
 * @param  {string}   string          string to reduce
 * @param  {function} reducerCb    reducer function
 * @param  {*}        initialValue reduce initial value
 * @return {*} result
 */
function stringReduce (string, reducerCallback, initialValue) {
  if (string.length === 0) {
    assertErr(initialValue, TypeError, 'Reduce of empty string with no initial value')
    return initialValue
  }
  var initialValuePassed = arguments.length === 3
  var result
  var startIndex
  if (initialValuePassed) {
    // initial value, initialize reduce state
    result = initialValue
    startIndex = 0
  } else {
    // no initial value
    if (string.length === 1) {
      return string.charAt(0)
    }
    // no initial value, initialize reduce state
    result = string.charAt(0)
    startIndex = 1
  }
  for (var i = startIndex; i < string.length; i++) {
    result = reducerCallback(result, string.charAt(i), i, string)
  }
  return result
}
