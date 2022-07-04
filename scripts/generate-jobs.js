const fs = require('fs')
const path = require('path')
const faker =  require('@faker-js/faker').faker
faker.setLocale('en_GB');

const organisations = require('../app/data/orgs.json')

// generators
const generateJobRole = require('./jobGenerators/role')
const generateRoleIsSuitableForEarlyCareerTeachers = require('./jobGenerators/role-is-suitable-for-early-career-teachers')
const generateRoleHasSENDResponsibilities = require('./jobGenerators/role-has-send-responsibilites')
const generateTitle = require('./jobGenerators/title')
const generateSubjects = require('./jobGenerators/subjects')
const generateWorkingPatterns = require('./jobGenerators/working-patterns')


const generateJob = (params = {}) => {
  let job = {}

  job.id = params.id || ('' + faker.datatype.number({min: 123456, max: 999999}))

  job.organisation = params.organisation || faker.helpers.arrayElement(organisations)

  job.location = params.location || faker.helpers.arrayElement(job.organisation.locations)

  job.role = params.role || generateJobRole()

  job.isRoleSuitableForEarlyCareeerTeachers = params.isRoleSuitableForEarlyCareeerTeachers || generateRoleIsSuitableForEarlyCareerTeachers()

  job.roleHasSendResponsibilities = params.roleHasSendResponsibilities || generateRoleHasSENDResponsibilities()

  job.title = params.title || generateTitle()

  job.contractType = params.contractType || faker.helpers.arrayElement([
    'Permanent',
    'Fixed term',
    'Maternity or parental leave cover'
  ])

  job.subjects = params.subjects || generateSubjects()

  job.workingPatterns = params.workingPatterns || generateWorkingPatterns()

  // should be null if .workingPatterns is full time
  job.workingPatternDetails = params.workingPatternDetails || faker.helpers.arrayElement([
    null,
    '20 hours per week',
    'Monday to Wedensday'
  ])

  job.salary = params.salary || faker.helpers.arrayElement([
    'Main Pay Scale 1 -6/UPS 1-3',
    '£20,852 (pro rata)',
    'A1/B1 depending on experience',
    'Main pay range 1 to Main pay range 6, £25,714 to £36,961'
  ])

  job.salary = params.salary || {
    fullTimeEquivalentSalary: faker.helpers.arrayElement([
      '£16,000',
      '£25,000',
      '£33,000',
      '£42,000'
    ])
  }

  job.additionalAllowances = params.additionalAllowances || faker.helpers.arrayElement([
    null,
    'TLR',
    'SEN'
  ])

  // job.listingDate

  // Closing date

  // Closing time?

  // Start date

  // Application method (lots within)

  // Supporting documents

  // job details

  // school details

  return job
}

const generateJobs = () => {
  const jobs = []

  jobs.push(generateJob({
    title: 'Teacher of Geography'
  }))
  jobs.push(generateJob())
  jobs.push(generateJob())
  jobs.push(generateJob())
  jobs.push(generateJob())
  jobs.push(generateJob())
  jobs.push(generateJob())
  jobs.push(generateJob())
  jobs.push(generateJob())

  return jobs
}

/**
 * Generate JSON file
 *
 * @param {String} filePath Location of generated file
 * @param {String} count Number of applications to generate
 *
 */
const generateJobsFile = (filePath) => {
  const jobs = generateJobs()
  const filedata = JSON.stringify(jobs, null, 2)
  fs.writeFile(
    filePath,
    filedata,
    (error) => {
      if (error) {
        console.error(error)
      }
      console.log(`Jobs data file generated: ${filePath}`)
    }
  )
}

generateJobsFile(path.join(__dirname, '../app/data/jobs.json'))
