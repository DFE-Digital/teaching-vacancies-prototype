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
  org.locations = params.locations || generateLocations({ type: org.type })

  return org
}

const generateOrgs = () => {
  const orgs = []

  orgs.push(generateOrg({
    type: 'school',
    name: 'Boom Primary School'
  }))

  orgs.push(generateOrg({
    type: 'mat',
    name: 'Boom Academy Trust'
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
