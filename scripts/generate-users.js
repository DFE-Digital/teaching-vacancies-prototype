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

  // Subjects
  user.profile.subjects = _.get(params, 'profile.subjects')

  // Working patterns
  user.profile.workingPatterns = _.get(params, 'profile.workingPatterns')

  // Locations
  user.profile.locations = _.get(params, 'profile.locations') || {}

  // QTS
  user.profile.qts = _.get(params, 'profile.qts')

  user.profile.qtsAwardedYear = _.get(params, 'profile.qtsAwardedYear')

  // Qualifications
  user.profile.qualifications = _.get(params, 'profile.qualifications') || {}

  // Work history
  user.profile.workHistory = _.get(params, 'profile.workHistory') || {}

  // Hidden Places
  user.profile.hiddenPlaces = _.get(params, 'profile.hiddenPlaces') || {}

  // About
  user.profile.about = _.get(params, 'profile.about')

  // Previous Application
  user.profile.previousApplication = _.get(params, 'profile.previousApplication') || {}

  return user
}

const generateUsers = () => {
  const users = []

  users.push(generateUser({
    emailAddress: 'anne.smith@example.com'
  }))

  let rachaelQualifications = {}

  let rachaelQual1 = { id: uuidv4(), type: 'A level', subject: 'Maths', grade: 'C', year: '2015', organisation: 'Bushey Meads School' }
  let rachaelQual2 = { id: uuidv4(), type: 'A level' }
  let rachaelQual3 = { id: uuidv4(), type: 'A level', subject: 'Science', grade: 'B', year: '2013', organisation: 'Aldenham College' }

  rachaelQualifications[rachaelQual1.id] = rachaelQual1
  rachaelQualifications[rachaelQual2.id] = rachaelQual2
  rachaelQualifications[rachaelQual3.id] = rachaelQual3

  users.push(generateUser({
    emailAddress: 'rachael@example.com',
    profile: {
      status: 'Active',
      firstName: 'Adam',
      lastName: 'Silver',
      providePhoneNumber: null,
      roles: ['Teacher'],
      phases: null,
      keyStages: null,
      workingPatterns: null,
      subjects: null,
      locations: null,
      qts: 'Yes',
      qtsAwardedYear: '2022',
      qualifications: rachaelQualifications,
      workHistory: null,
      about: 'Fusce non nisl sapien. Fusce nulla lorem, elementum in rutrum eu, feugiat eu lectus. Integer sit amet sagittis risus. Cras sollicitudin volutpat felis, quis faucibus nisi tempus gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;\n\nDuis id congue ligula. Nullam blandit iaculis est, vitae lacinia ex aliquam sed. Duis nec turpis eu mauris suscipit congue. Praesent non accumsan sem, et bibendum nibh. Duis nec ante justo. Etiam vestibulum ac dolor ac efficitur. Sed a egestas purus.',
      previousApplication: 'No'
    }
  }))


  let qualifications = {}

  let g1 = { id: uuidv4(), type: 'GCSE', subject: 'Maths', grade: 'A', year: '2013', organisation: 'Bushey Meads School' }
  let g2 = { id: uuidv4(), type: 'GCSE', subject: 'English', grade: 'B', year: '2013', organisation: 'Bushey Meads School' }
  let g3 = { id: uuidv4(), type: 'GCSE', subject: 'Science', grade: 'B', year: '2013', organisation: 'Bushey Meads School' }
  let g4 = { id: uuidv4(), type: 'GCSE', subject: 'Geography', grade: 'B', year: '2013', organisation: 'Bushey Meads School' }
  let g5 = { id: uuidv4(), type: 'GCSE', subject: 'History', grade: 'B', year: '2013', organisation: 'Bushey Meads School' }
  let g6 = { id: uuidv4(), type: 'GCSE', subject: 'Statistics', grade: 'A', year: '2013', organisation: 'Bushey Meads School' }
  let g7 = { id: uuidv4(), type: 'GCSE', subject: 'French', grade: 'B', year: '2013', organisation: 'Bushey Meads School' }

  let a1 = { id: uuidv4(), type: 'A level', subject: 'English', grade: 'A', year: '2015', organisation: 'Bushey Meads School' }
  let a2 = { id: uuidv4(), type: 'A level', subject: 'Maths', grade: 'C', year: '2015', organisation: 'Bushey Meads School' }
  let a3 = { id: uuidv4(), type: 'A level', subject: 'Science', grade: 'B', year: '2013', organisation: 'Aldenham College' }

  let d1 = { id: uuidv4(), type: 'Degree', subject: 'Multimedia Technology BSc', grade: '1st', year: '2019', organisation: 'University of Hertfordshire' }
  let d2 = { id: uuidv4(), type: 'Degree', subject: 'Social science PhD', organisation: 'UCL' }

  qualifications[g1.id] = g1
  qualifications[g2.id] = g2
  qualifications[g3.id] = g3
  qualifications[g4.id] = g4
  qualifications[g5.id] = g5
  qualifications[g6.id] = g6
  qualifications[g7.id] = g7

  qualifications[a1.id] = a1
  qualifications[a2.id] = a2
  qualifications[a3.id] = a3

  qualifications[d1.id] = d1
  qualifications[d2.id] = d2

  let workHistory = {}

  let r1 = {
    id: uuidv4(),
    employer: 'Colindale Primary School',
    role: 'Teacher',
    startDate: DateTime.fromObject({ year: 2018, month: 1 }).toISO(),
    endDate: DateTime.fromObject({ year: 2019, month: 12 }).toISO(),
    currentRole: 'No'
  }

  let r2 = {
    id: uuidv4(),
    employer: 'Courtland Primary School',
    role: 'Teacher',
    startDate: DateTime.fromObject({ year: 2020, month: 1 }).toISO(),
    currentRole: 'Yes'
  }

  workHistory[r1.id] = r1
  workHistory[r2.id] = r2

  let locations = {}

  let l1 = {
    id: uuidv4(),
    location: 'London',
    radius: '5 miles',
  }

  locations[l1.id] = l1

  let hiddenPlaces = {}

  let h1 = {
    id: uuidv4(),
    hiddenPlace: 'Courtland Primary School, 10 Seed Street N19 4PT',
  }

  hiddenPlaces[h1.id] = h1

  users.push(generateUser({
    emailAddress: 'adam@example.com',
    profile: {
      status: 'Active',
      firstName: 'Adam',
      lastName: 'Silver',
      providePhoneNumber: 'Yes',
      phoneNumber: '01928 376 453',
      roles: ['Teacher'],
      phases: ['Primary school', 'Secondary school'],
      keyStages: ['Key stage 2', 'Key stage 3', 'Key stage 4'],
      workingPatterns: ['Full time'],
      subjects: ['Biology'],
      locations,
      qts: 'Yes',
      qtsAwardedYear: '2022',
      qualifications,
      workHistory,
      hasExperienceWithKeyStages: 'Yes',
      experiencedKeyStages: ['Key stage 1', 'Key stage 2'],
      hasExperienceWithSubjects: 'Yes',
      experiencedSubjects: ['Mathematics'],
      about: 'Fusce non nisl sapien. Fusce nulla lorem, elementum in rutrum eu, feugiat eu lectus. Integer sit amet sagittis risus. Cras sollicitudin volutpat felis, quis faucibus nisi tempus gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;\n\nDuis id congue ligula. Nullam blandit iaculis est, vitae lacinia ex aliquam sed. Duis nec turpis eu mauris suscipit congue. Praesent non accumsan sem, et bibendum nibh. Duis nec ante justo. Etiam vestibulum ac dolor ac efficitur. Sed a egestas purus.',
      previousApplication: 'No',
      provideSchoolsToHideFrom: 'Yes',
      hiddenPlaces
    }
  }))

  users.push(generateUser({
    emailAddress: 'ernest.hemingway@hotmail.com',
    profile: {
      status: null,
      firstName: 'Ernest',
      lastName: 'Hemingway',
      providePhoneNumber: 'Yes',
      phoneNumber: '01928 376 453',
      roles: null,
      phases: null,
      keyStages: null,
      workingPatterns: null,
      subjects: null,
      locations: null,
      qts: 'Yes',
      qtsAwardedYear: '2020',
      qualifications: rachaelQualifications,
      workHistory,
      about: 'Fusce non nisl sapien. Fusce nulla lorem, elementum in rutrum eu, feugiat eu lectus. Integer sit amet sagittis risus. Cras sollicitudin volutpat felis, quis faucibus nisi tempus gravida. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae;\n\nDuis id congue ligula. Nullam blandit iaculis est, vitae lacinia ex aliquam sed. Duis nec turpis eu mauris suscipit congue. Praesent non accumsan sem, et bibendum nibh. Duis nec ante justo. Etiam vestibulum ac dolor ac efficitur. Sed a egestas purus.',
      previousApplication: 'Yes'
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
