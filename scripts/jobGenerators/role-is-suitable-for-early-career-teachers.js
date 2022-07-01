const faker =  require('@faker-js/faker').faker
faker.setLocale('en_GB');

module.exports = (params) => {
  return faker.helpers.arrayElement(['Yes', 'No'])
}
