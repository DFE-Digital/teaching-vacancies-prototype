const faker =  require('@faker-js/faker').faker
faker.setLocale('en_GB');

module.exports = (params) => {
  const workingPatterns = [
    'Full time',
    'Part time',
    'Flexible',
    'Job share',
    'Term time'
  ]

  return faker.helpers.arrayElement(workingPatterns)
}

