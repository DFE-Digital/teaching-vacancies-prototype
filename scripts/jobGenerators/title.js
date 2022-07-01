const faker =  require('@faker-js/faker').faker
faker.setLocale('en_GB');

module.exports = (params) => {
  const titles = [
    'Maths teacher',
    'Science teacher',
    'English teacher',
    'Class teacher',
    'Teacher of religious education',
    'Teacher of computing'
  ]

  return faker.helpers.arrayElement(titles)
}
