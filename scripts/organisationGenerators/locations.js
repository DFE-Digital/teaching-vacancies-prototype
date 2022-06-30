
const faker =  require('@faker-js/faker').faker
faker.setLocale('en_GB');

module.exports = (params) => {
  let locations = []

  // only generate one location
  if(params.type == 'school') {
    locations.push({
      id: faker.datatype.uuid(),
      name: 'Boom Primary School',
      address: {
        address1: '123 Main Street',
        town: 'Some town',
        postcode: 'AB1 2CD'
      }
    })
  // generate a few locations
  } else {
    locations.push({
      id: faker.datatype.uuid(),
      name: 'Boom Primary School',
      address: {
        address1: '123 Main Street',
        town: 'Some town',
        postcode: 'AB1 2CD'
      }
    })
    locations.push({
      id: faker.datatype.uuid(),
      name: 'Town Primary School',
      address: {
        address1: '321 Main Street',
        town: 'Some place',
        postcode: 'AB2 3CD'
      }
    })
  }

  return locations
}
