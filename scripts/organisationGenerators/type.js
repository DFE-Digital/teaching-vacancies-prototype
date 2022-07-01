const faker =  require('@faker-js/faker').faker
faker.setLocale('en_GB');

module.exports = (params) => {
  const types = [
    'School',
    'MAT',
    'LA'
  ]

  return faker.helpers.arrayElement(types)
}
