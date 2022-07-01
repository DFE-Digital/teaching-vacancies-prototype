const faker =  require('@faker-js/faker').faker
faker.setLocale('en_GB');

module.exports = (params) => {
  const roles = [
    'Teacher',
    'Leadership',
    'Middle leader',
    'Teaching assistant',
    'Education support',
    'SENDCo'
  ]

  return faker.helpers.arrayElement(roles)
}
