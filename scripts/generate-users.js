const fs = require('fs')
const path = require('path')
const faker =  require('@faker-js/faker').faker
faker.setLocale('en_GB');
const _ = require('lodash');
const { v4: uuidv4 } = require('uuid');
const { DateTime } = require('luxon')

const generateUser = (params = {}) => {
  let user = {}

  user.emailAddress = params.emailAddress
  user.password = params.password || 'tv'

  user.profile = params.profile || {}

  user.profile.status = _.get(params, 'profile.status')

  // Personal details
  user.profile.firstName = _.get(params, 'profile.firstName')
  user.profile.lastName = _.get(params, 'profile.lastName')
  user.profile.providePhoneNumber = _.get(params, 'profile.providePhoneNumber')
  user.profile.phoneNumber = _.get(params, 'profile.phoneNumber')

  // Roles
  user.profile.roles = _.get(params, 'profile.roles')

  // Phase
  user.profile.phases = _.get(params, 'profile.phases')

  // Key stages
  user.profile.keyStages = _.get(params, 'profile.keyStages')

  // Working patterns
  user.profile.workingPatterns = _.get(params, 'profile.workingPatterns')

  // QTS
  user.profile.qts = _.get(params, 'profile.qts')

  // ECT
  user.profile.ect = _.get(params, 'profile.ect')

  // Qualifications
  user.profile.qualifications = _.get(params, 'profile.qualifications') || {}

  // Work history
  user.profile.workHistory = _.get(params, 'profile.workHistory') || {}

  // About
  user.profile.about = _.get(params, 'profile.about')

  return user
}

const generateUsers = () => {
  const users = []

  users.push(generateUser({
    emailAddress: 'anne.smith@example.com'
  }))

  let qualifications = {}

  let q1 = {
    id: uuidv4(),
    type: 'GCSE',
    subject: 'Maths',
    grade: 'A',
    year: '2020'
  }

  let q2 = {
    id: uuidv4(),
    type: 'AS level',
    subject: 'English',
    grade: 'B',
    year: '2022'
  }

  qualifications[q1.id] = q1
  qualifications[q2.id] = q2

  let workHistory = {}

  let r1 = {
    id: uuidv4(),
    employer: 'Colindale Primary School',
    role: 'Teacher',
    description: 'Some description',
    startDate: DateTime.fromObject({ year: 2018, month: 1 }).toISO(),
    endDate: DateTime.fromObject({ year: 2019, month: 12 }).toISO()
  }

  let r2 = {
    id: uuidv4(),
    employer: 'Courtland Primary School',
    role: 'Teacher',
    description: 'Some description',
    startDate: DateTime.fromObject({ year: 2020, month: 1 }).toISO(),
    currentRole: 'Yes'
  }

  workHistory[r1.id] = r1
  workHistory[r2.id] = r2

  users.push(generateUser({
    emailAddress: 'susy@example.com',
    profile: {
      status: 'Active',
      firstName: 'Susy',
      lastName: 'Gamora',
      providePhoneNumber: 'No',
      roles: ['Teacher'],
      phases: ['Primary'],
      keyStages: ['KS1', 'KS2'],
      workingPatterns: ['Full time'],
      qts: 'Yes',
      ect: 'Yes',
      qualifications,
      workHistory,
      about: 'Fusce non nisl sapien. Fusce nulla lorem, elementum in rutrum eu, feugiat eu lectus. Integer sit amet sagittis risus. Cras sollicitudin volutpat felis, quis faucibus nisi tempus gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;\n\nDuis id congue ligula. Nullam blandit iaculis est, vitae lacinia ex aliquam sed. Duis nec turpis eu mauris suscipit congue. Praesent non accumsan sem, et bibendum nibh. Duis nec ante justo. Etiam vestibulum ac dolor ac efficitur. Sed a egestas purus.'
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
