/* globals describe, it, beforeEach */

var reduce = require('string-reduce')

describe('stringReduce', function () {

  describe('no initial value', function () {
    it('should reduce "a" to "a"', function () {
      var str = 'a'
      var result = reduce(str, function () {
        throw new Error('should not be called')
      })
      expect(result).toBe(str)
    })

    it('should reduce a string', function () {
      var str = 'abc'
      var result = reduce(str, sumCharCodes)
      var expectedResult = str.split('').reduce(sumCharCodes)
      function sumCharCodes (sum, char) {
        sum = typeof sum === 'number' ? sum : sum.charCodeAt(0)
        return sum + char.charCodeAt(0)
      }
      expect(result).toBe(expectedResult)
      expect(result).toBe(
        str
          .split('')
          .map(function (char) {
            return char.charCodeAt(0)
          })
          .reduce(function (a, b) {
            return a + b
          }, 0)
      )
    })
  })

  describe('has initial value', function () {
    it('should reduce "" to initial value', function () {
      var initialValue = {}
      var result = reduce('', function () {
        throw new Error('should not be called')
      }, initialValue)
      expect(result).toBe(initialValue)
    })

    it('should reduce a string', function () {
      var initialValue = 10
      var str = 'abc'
      var result = reduce(str, sumCharCodes, initialValue)
      var expectedResult = str.split('').reduce(sumCharCodes, initialValue)
      function sumCharCodes (sum, char) {
        sum = typeof sum === 'number' ? sum : sum.charCodeAt(0)
        return sum + char.charCodeAt(0)
      }
      expect(result).toBe(expectedResult)
      expect(result).toBe(
        str
          .split('')
          .map(function (char) {
            return char.charCodeAt(0)
          })
          .reduce(function (a, b) {
            return a + b
          }, initialValue)
      )
    })
  })
})
