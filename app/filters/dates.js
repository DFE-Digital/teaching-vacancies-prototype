const { DateTime } = require("luxon")

const filters = {}

filters.monthAndYearOnly = (date) => {
  return DateTime.fromISO(date).toFormat('MMMM yyyy')
}

exports.filters = filters
