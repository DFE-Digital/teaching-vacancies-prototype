const fs = require('fs')
const path = require('path')
const faker =  require('@faker-js/faker').faker
faker.setLocale('en_GB');

// generators
const generateType = require('./organisationGenerators/type')
const generateLocations = require('./organisationGenerators/locations')

const generateOrg = (params = {}) => {
  let org = {}

  org.type = params.type || generateType()
  org.name = params.name || faker.company.companyName({format: 5})
  org.phase = params.phase || 'Primary school'
  org.isSpecialSchool = params.isSpecialSchool || false
  org.locations = params.locations || generateLocations({ org })
  org.address = params.address || null
  return org
}

const generateOrgs = () => {
  const orgs = []

  orgs.push(generateOrg({
    type: 'school',
    name: 'Courtland Primary School',
    phase: 'Primary',
    isSpecialSchool: false,
    address: {
      line1: 'Friendship Way',
      town: 'London',
      county: 'London',
      postcode: 'E15 2JQ'
    }
  }))

  orgs.push(generateOrg({
    type: 'mat',
    name: 'Tamsin Academy',
    phase: 'Secondary',
    isSpecialSchool: false,
    address: {
      line1: 'c/o Tile Kiln Lane',
      town: 'Palmers Green',
      county: 'London',
      postcode: 'N13 6BY'
    }
  }))

  orgs.push(generateOrg({
    type: 'school',
    name: 'Leadenham Church of England Primary School',
    phase: 'Primary',
    isSpecialSchool: false,
    address: {
      line1: '52 The Crescent',
      line2: 'Tavistock',
      town: 'Mill Hill',
      county: 'Barnet',
      postcode: 'NW7 4NA'
    }
  }))

  orgs.push(generateOrg({
    type: 'mat',
    name: 'Sommerset Secondary School',
    phase: 'Secondary',
    isSpecialSchool: false,
    address: {
      line1: 'tratford Road',
      town: 'Henley-in-Arden',
      county: 'Warwickshire',
      postcode: 'C95 6AD'
    }
  }))

  return orgs
}

/**
 * Generate JSON file
 *
 * @param {String} filePath Location of generated file
 * @param {String} count Number of applications to generate
 *
 */
const generateOrgsFile = (filePath) => {
  const orgs = generateOrgs()
  const filedata = JSON.stringify(orgs, null, 2)
  fs.writeFile(
    filePath,
    filedata,
    (error) => {
      if (error) {
        console.error(error)
      }
      console.log(`Orgs data file generated: ${filePath}`)
    }
  )
}

generateOrgsFile(path.join(__dirname, '../app/data/orgs.json'))
