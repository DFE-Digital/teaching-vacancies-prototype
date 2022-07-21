const fs = require('fs')
const path = require('path')
const faker =  require('@faker-js/faker').faker
faker.setLocale('en_GB');
const _ = require('lodash');

const generateUser = (params = {}) => {
  let user = {}

  user.username = params.username
  user.password = params.password || 'tv'

  user.profile = params.profile || {}

  user.profile.status = _.get('params.profile.status')

  // Personal details
  user.profile.firstName = params.profile && params.profile.firstName
  user.profile.lastName = params.profile && params.profile.lastName
  user.profile.providePhoneNumber = params.profile && params.profile.providePhoneNumber
  user.profile.phoneNumber = params.profile && params.profile.phoneNumber

  // Roles
  user.profile.roles = params.profile && params.profile.roles

  // Phase
  user.profile.phases = params.profile && params.profile.phases

  // Key stages
  user.profile.keyStages = params.profile && params.profile.keyStages

  // Working patterns
  user.profile.workingPatterns = params.profile && params.profile.workingPatterns

  // QTS
  user.profile.qts = params.profile && params.profile.qts

  // ECT
  user.profile.ect = params.profile && params.profile.ect

  // Qualifications
  user.profile.qualifications = params.profile && params.profile.qualifications || {}

  // Work history
  user.profile.workHistory = params.profile && params.profile.workHistory || {}

  // About
  user.profile.about = params.profile && params.profile.about

  return user
}

const generateUsers = () => {
  const users = []

  users.push(generateUser({
    username: 'anne@example.com'
  }))

  users.push(generateUser({
    username: 'susy@example.com',
    profile: {
      status: 'Started',
      firstName: 'Susy',
      lastName: 'Gamora'
    }
  }))

  return users
}

/**
 * Generate JSON file
 *
 * @param {String} filePath Location of generated file
 * @param {String} count Number of applications to generate
 *
 */
const generateUsersFile = (filePath) => {
  const users = generateUsers()
  const filedata = JSON.stringify(users, null, 2)
  fs.writeFile(
    filePath,
    filedata,
    (error) => {
      if (error) {
        console.error(error)
      }
      console.log(`Users data file generated: ${filePath}`)
    }
  )
}

generateUsersFile(path.join(__dirname, '../app/data/users.json'))
