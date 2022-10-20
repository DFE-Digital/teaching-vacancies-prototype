const { DateTime } = require("luxon")

const filters = {}

filters.monthYear = (date) => {
  return DateTime.fromISO(date).toFormat('MMMM yyyy')
}

filters.date = date => {
  return DateTime.fromISO(date).toFormat('d MMMM yyyy')
}

filters.time = date => {
  let dt = DateTime.fromISO(date)
  if (dt.minute > 0) {
    dt = dt.toFormat('h:mma')
  } else {
    dt = dt.toFormat('ha')
  }
  return dt.toLowerCase()
}

filters.dateTime = date => {
  return filters.date(date) + ' at ' + filters.time(date)
}

exports.filters = filters
