// -------------------------------------------------------------------
// Imports and setup
// -------------------------------------------------------------------
var _ = require('lodash');
var filters = {}

// Utils has a bunch of shared functions used by filters and routes
const utils = require('../../lib/utils')

// expose general utils as filters
filters = utils

// Log to terminal
filters.debug = (item) => {
  console.log('Debug', item)
  return item;
}

// Expose all of lodash
filters.lodash = function(test, name, ...args) {
  return _[name](test, ...args)
}

// Adds an index for each object in array
filters.addIndexCount = array => {
  array.forEach((item, index) =>{
    item.index = index
  })
  return array;
}

// Search for an id in arrays
filters.getById = (items, id) => {
  return items.find(item => item.id == id)
}

// General purpose search in arrays
filters.find = (items, key, value) => {
  return items.find(item => item[key] == value)
}

// // Look up several records using UUID
// exports.getRecordsById = (records, array) => {
//   return exports.filterRecordsBy(records, 'id', array)
// }

// // Utility function to filter by a key
// // Basically identical to the ‘where’ filter
// exports.filterRecordsBy = (records, key, array) => {
//   array = [].concat(array) // force to array
//   let filtered = records.filter(record => {
//     return array.includes(record[key])
//   })
//   return filtered
// }


// Decorate attributes
// Add name, value, id, idPrefix and checked attributes to GOVUK form components
// Generate the attributes based on the application ID and the section they’re in

// Copied from Apply, but modified to work with data directly

/* Usage: 
{{ govukCheckboxes({
  fieldset: {
    legend: {
      text: "Nationality",
      classes: "govuk-fieldset__legend--s"
    }
  },
  items: [
    {
      text: "British"
    },
    {
      text: "Irish"
    },
    {
      text: "Other"
    }
  ]
} | decorateAttributes(data, "data.nationality"))}}

Will populate name and id, and add value and checked for each item
*/
filters.decorateAttributes = (obj, data, value) => {

  // Map dot or bracket notation to path parts
  pathParts = _.toPath(value)
  // Path parts includes the string name of data, which we don't need
  let storedValue = _.get(data, [...pathParts].splice(1) )

  // Strip data from path as autodata store auto-adds it.
  if (pathParts[0] === 'data'){
    pathParts.shift(1)
  }

  if (obj.items !== undefined) {
    obj.items = obj.items.map(item => {
      if (item.divider) return item

      var checked = storedValue ? '' : item.checked
      var selected = storedValue ? '' : item.selected
      if (typeof item.value === 'undefined') {
        item.value = item.text
      }

      // If data is an array, check it exists in the array
      if (Array.isArray(storedValue)) {
        if (storedValue.indexOf(item.value) !== -1) {
          checked = 'checked'
          selected = 'selected'
        }
      } else {
        // The data is just a simple value, check it matches
        if (storedValue === item.value) {
          checked = 'checked'
          selected = 'selected'
        }
      }

      item.checked = (item.checked !== undefined) ? item.checked : checked
      item.selected = (item.selected !== undefined) ? item.selected : selected
      return item
    })

    obj.idPrefix = pathParts.join('-')
  } else {
    // Check for undefined because the value may exist and be intentionally blank
    if (typeof obj.value === 'undefined') {
      obj.value = storedValue
    }
  }
  obj.id = (obj.id) ? obj.id : pathParts.join('-')
  obj.name = (obj.name) ? obj.name: pathParts.map(s => `[${s}]`).join('')
  return obj
}

// Return first x items of array / string
filters.limitTo = (input, limit) =>{

  if(typeof limit !== 'number'){
    limit = parseInt(limit) // assume limit is a string of a number
  }

  if(typeof input === 'string'){
    if(limit >= 0){
      return input.substring(0, limit);
    } else {
      return input.substr(limit);
    }
  }
  if(Array.isArray(input)){
    limit = Math.min(limit, input.length);
    if(limit >= 0){
      return input.slice(0, limit);
    } else {
      return input.slice(input.length + limit, input.length);
    }
  }
  return input;
}

filters.push = (array, item) => {
  array.push(item)
  return array
}

filters.trimEach = input => {
  if (!input) return

  if (_.isArray(input)) return input.map( item => {
    if (_.isString(item)) return item.trim()
    else return item
  } )
  else if (_.isString(input)) return input.trim()
  else return input
}


// Remove empty items from arrays / coerce empty to false
// Returns false if no items remaining
filters.removeEmpty = items => {

  // Handle empty
  if (!items) return

  // Handle strings
  if (_.isString(items) ) {
    if (items != null && items !== '') return items
    else return
  }

  // Handle arrys
  if (_.isArray(items)){
    var output = items.filter( item => {
      return (item && (item !==""))
    })
    // Don't return emtpy arrays
    if (output.length) return output
    else return
  }
}

// Remove empty, false and null items from array
filters.cleanArray = (array) => {
  let newArray = filters.trimEach(array)
  newArray = filters.removeEmpty(newArray)
  return newArray
}

const joinArray = (array, options={}) => {

  var defaults = {
    delimiter: ', ',
    append: '',
    prepend: ''
  }

  // Duck-type check for direct Nunjucks macro returns

  // Macro object string
  if (typeof array == 'object' && 'toString' in array && !_.isArray(array)) {
    console.log('Error in joinArray: not a string or array', array)
  }

  // Array contains object string
  if(_.isArray(array)){
    array.forEach (item => {
      if (typeof item == 'object' && 'toString' in item) {
        console.log('Error in joinArray: not a string or array', array)
      }
    })
  }

  // Deal with strings
  if (_.isString(array)) {
    array = [array]
  }
  if (_.isString(options)) options = {delimiter: options}

  // Merge options and defaults
  options = Object.assign({}, defaults, options)
  // Set to be options.delimiter if it doesn't already exist
  options.lastDelimiter = options.lastDelimiter || options.delimiter

  // Strip trailing space from delimiters and add breaks
  if (options.newlines){
    options.delimiter = options.delimiter.replace(/\s+$/g, '') + "\n"
    options.lastDelimiter = options.lastDelimiter.replace(/\s+$/g, '') + "\n"
  }

  // console.log('Input array is', array)
  // Clean up array
  array = filters.cleanArray(array)
  if (!_.isArray(array)) return

  // Don't output anything if no array or items
  if (!array || array.length == 0) return // return nothing if no items

  // No delimiters if only one item
  if (array.length == 1) {
    // console.log(array[0])
    return options.prepend + array[0] + options.append // just return item
  }

  // Create string
  // console.log(array)
  var last = array.pop();
  return options.prepend + array.join(options.delimiter) + options.lastDelimiter + last + options.append;
}

filters.joinArray = joinArray

filters.spaceSeparate = (items) => filters.joinArray(items, {delimiter:' '})

// -------------------------------------------------------------------
// keep the following line to return your filters to the app
// -------------------------------------------------------------------
exports.filters = filters
