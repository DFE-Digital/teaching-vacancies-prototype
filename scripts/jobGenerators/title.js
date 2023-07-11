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

  if(role == 'Head of year or phase') {
    return faker.helpers.arrayElement([
      'Head of modern foreign languages'
    ])
  }

  if(role == 'Head of department or curriculum') {
    return faker.helpers.arrayElement([
      'KS2 Phase leader'
    ])
  }

  if(role == 'Assistant headteacher') {
    return faker.helpers.arrayElement([
      'Assistant headteacher'
    ])
  }

  if(role == 'Deputy headteacher') {
    return faker.helpers.arrayElement([
      'Deputy headteacher'
    ])
  }

  if(role == 'Headteacher') {
    return faker.helpers.arrayElement([
      'Head teacher',
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
