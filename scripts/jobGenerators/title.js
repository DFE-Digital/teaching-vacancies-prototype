const faker =  require('@faker-js/faker').faker
faker.setLocale('en_GB');

module.exports = ({organisation, role}) => {
  if(role == 'Teacher') {
    return faker.helpers.arrayElement([
      'Maths teacher',
      'Science teacher',
      'English teacher',
      'Class teacher',
      'Teacher of religious education',
      'Teacher of computing'
    ])
  }

  if(role == 'Headteacher, deputy or assistant headteacher') {
    return faker.helpers.arrayElement([
      'Head teacher',
      'Deputy headteacher',
      'Assistant headteacher'
    ])
  }

  if(role == 'Head of year, department, curriculum or phase') {
    return faker.helpers.arrayElement([
      'Head of modern foreign languages',
      'KS2 Phase leader'
    ])
  }

  if(role == 'Teaching assistant') {
    return faker.helpers.arrayElement([
      'Teaching assistant',
      'Level 2 teaching assistant'
    ])
  }

  if(role == 'HLTA (higher level teaching assistant)') {
    return faker.helpers.arrayElement([
      'HLTA'
    ])
  }

  if(role == 'Learning support, cover supervisor or tutor') {
    return faker.helpers.arrayElement([
      'Learning support assistant'
    ])
  }

  if(role == 'SENDCo (special educational needs and disabilities coordinator)') {
    return faker.helpers.arrayElement([
      'SENDCo'
    ])
  }

}
