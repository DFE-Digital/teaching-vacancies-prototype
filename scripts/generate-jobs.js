const fs = require('fs')
const path = require('path')
const faker =  require('@faker-js/faker').faker
faker.setLocale('en_GB');

const organisationHelper = require('../app/helpers/organisation')
const organisations = require('../app/data/organisations.json')
const users = require('../app/data/users.json')
const roles = require('../app/data/roles.js')

// generators
const generateTitle = require('./jobGenerators/title')
const generateSubjects = require('./generators/subjects')
const generateKeyStages = require('./jobGenerators/key-stages')

const generateJob = (params = {}) => {
  let job = {}
  job.id = params.id || ('' + faker.datatype.number({min: 123456, max: 999999}))

  job.status = params.status || faker.helpers.arrayElement(['Draft', 'Scheduled', 'Active', 'Closed'])

  job.organisation = params.organisation || faker.helpers.arrayElement(organisations)

  // For now the default includes all possible locations but hiring stafff can select a subset.
  job.locations = params.locations || organisationHelper.getLocations(job.organisation)


  job.role = params.role || faker.helpers.arrayElement(roles)

  job.title = params.title || generateTitle({organisation: job.organisation, role: job.role})

  if(job.organisation.schools == 'School') {
    job.phase = job.organisation.schools[0].phase
  } else {
    job.phase = job.organisation.phase
  }
  if(!job.phase) {
    job.phase = 'Primary school'
  }

  if(job.phase == 'Nursery school') {

    job.schoolType = params.schoolType || faker.helpers.arrayElement([
      'Local authority maintained school, ages 3 to 11',
      'Local authority maintained school, ages 3 to 5'
    ])

    
    job.subjects = ''
  }
  
  job.keyStages = params.keyStages || generateKeyStages({phase: job.phase})

  job.subjects = params.subjects || generateSubjects()

  if(job.phase == 'Nursery school') {
    job.subjects = ''
  }

  job.contractType = params.contractType || faker.helpers.arrayElement([
    'Permanent',
    'Fixed term',
    'Maternity or parental leave cover'
  ])

  if(job.contractType == 'Fixed term' || job.contractType == 'Maternity or parental leave cover') {
    job.contractLength = params.contractLength || '6 months'
  }

  job.workingPatterns = params.workingPatterns || faker.helpers.arrayElements(['Full time', 'Part time'])

  if(job.workingPatterns.includes('Full time')) {
    job.fullTimeDetails = params.fullTimeDetails || '5 days a week'
  }

  if(job.workingPatterns.includes('Part time')) {
    job.partTimeDetails = params.partTimeDetails || '20 hours a week'
  }

  job.salaryDetails = params.salaryDetails || faker.helpers.arrayElements([
    'Full-time equivalent salary',
    'Actual salary',
    'Pay scale'
  ], faker.datatype.number({min: 1, max: 2}))

  if(job.salaryDetails.includes('Full-time equivalent salary')) {
    job.fullTimeEquivalentSalaryDetails = params.fullTimeEquivalentSalaryDetails || '£42,000'
  }

  if(job.salaryDetails.includes('Actual salary')) {
    job.actualSalaryDetails = params.actualSalaryDetails || '£31,000'
  }

  if(job.salaryDetails.includes('Pay scale')) {
    job.payScaleDetails = params.payScaleDetails || 'MP4 to MP6'
  }

  job.hasAdditionalAllowances = params.hasAdditionalAllowances || faker.helpers.arrayElement(['Yes', 'No'])

  if(job.hasAdditionalAllowances == 'Yes') {
    job.additionalAllowances = params.additionalAllowances || 'TLR is available.'
  }

  job.isUsingApplicationForm = params.isUsingApplicationForm || faker.helpers.arrayElement(['Yes', 'No'])

  if(job.isUsingApplicationForm == 'No') {

    job.applicationMethod = params.applicationMethod || faker.helpers.arrayElement(['By email', 'Through a website'])

    if(job.applicationMethod == 'By email') {

      job.applicationForm = params.applicationForm || {
        file: 'application-form.pdf',
        size: '2MB'
      }

      job.emailAddressForApplications = params.emailAddressForApplications || job.organisation.emailAddress || faker.helpers.arrayElement(users).emailAddress
    }

    if(job.applicationMethod == 'Through a website') {

      job.linkToWebsite = params.linkToWebsite || 'https://www.school.uk'

    }

  }

  job.offersSchoolVisits = params.offersSchoolVisits || faker.helpers.arrayElement(['Yes', 'No'])

  job.contactEmailAddress = params.contactEmailAddress || faker.helpers.arrayElement(users).username

  job.hasContactPhoneNumber = params.hasContactPhoneNumber || faker.helpers.arrayElement(['Yes', 'No'])

  if(job.hasContactPhoneNumber == 'Yes') {

    job.contactPhoneNumber = params.contactPhoneNumber || faker.phone.number('020# ### ###')

  }

  job.isRoleSuitableForEarlyCareeerTeachers = params.isRoleSuitableForEarlyCareeerTeachers || faker.helpers.arrayElement(['Yes', 'No'])

  job.skillsAndExperience = params.skillsAndExperience || '- Passion for learning and teaching and be committed to raising standards \n- Up to date with current pedagogical thinking \n- Able to inspire others to ensure the delivery of high-quality learning experiences for our students \n- Fantastic subject knowledge and understand how to teach highly challenging lessons so that students can reach the top grades in the subject. \n- High expectations of themselves and others Ambitious and committed to ongoing professional development'

  job.whatSchoolOffers = params.whatSchoolOffers || '- A bespoke curriculum offering students a strong core entitlement in English, Mathematics and Science \n- A full extra-curricular programme with opportunities for enrichment activities for all \n- An excellent opportunity for continued personal development through our Talent Pathway \n- A wide range of staff benefits \n- Excellent resources and facilities \n- A wonderful community that is involved within school life.'

  job.hasSafeguardingCommitment = params.hasSafeguardingCommitment || faker.helpers.arrayElement(['Yes', 'No'])

  if(job.hasSafeguardingCommitment == 'Yes') {

    job.safeguardingCommitment = params.safeguardingCommitment || 'This school is committed to safeguarding and promoting the welfare of children and young people and for ensuring that they are protected from harm.'

  }

  job.hasFurtherDetailsAboutTheRole = params.hasFurtherDetailsAboutTheRole || faker.helpers.arrayElement(['Yes', 'No'])

  if(job.hasFurtherDetailsAboutTheRole == 'Yes') {

    job.furtherDetailsAboutTheRole = params.furtherDetailsAboutTheRole || 'The candidate will be required to undergo a full enhanced DBS check and must be eligible to work in the UK.'

  }

  job.hasAdditionalDocuments = params.hasAdditionalDocuments || faker.helpers.arrayElement(['Yes', 'No'])

  if(job.hasAdditionalDocuments == 'Yes') {

    job.additionalDocuments = params.additionalDocuments || faker.helpers.arrayElements([
      {
        file: 'job-description.pdf',
        size: '6MB'
      },
      {
        file: 'person-specification.pdf',
        size: '5MB'
      }
    ])

  }

  job.publishDate = params.publishDate || faker.date.future(0)

  job.closingDate = params.publishDate || faker.date.future(0, job.publishDate)

  job.closingTime = params.closingTime || faker.helpers.arrayElement(['9am', '12pm (midday)', '5pm', '11:59pm'])

  job.startDate = params.startDate || faker.date.future(0, job.closingDate)

  job.distance = params.distance || faker.datatype.number({ min: 1, max: 30 })

  return job
}

const generateJobs = () => {
  const jobs = []

  jobs.push(generateJob({
    status: 'Active',
    title: 'Temporary teacher of modern foreign languages (German)',
    isUsingApplicationForm: 'Yes',
    hasSafeguardingCommitment: 'Yes',
    hasFurtherDetailsAboutTheRole: 'Yes',
    schoolType: 'Academy, ages 11 to 18',
    phase: 'Secondary school',
  }))
  jobs.push(generateJob({
    status: 'Active',
    title: 'Early years educator',
    isUsingApplicationForm: 'Yes',
    hasSafeguardingCommitment: 'Yes',
    hasFurtherDetailsAboutTheRole: 'Yes',
    schoolType: 'Local authority maintained school, ages 3 to 11',
    phase: 'Nursery school'
  }))
  jobs.push(generateJob({
    status: 'Active',
    isUsingApplicationForm: 'No',
    applicationMethod: 'Through a website',
    hasSafeguardingCommitment: 'Yes',
    hasFurtherDetailsAboutTheRole: 'Yes',
    phase: 'Nursery school'
  }))
  jobs.push(generateJob({
    status: 'Active',
    isUsingApplicationForm: 'No',
    applicationMethod: 'By email',
    hasSafeguardingCommitment: 'Yes',
    hasFurtherDetailsAboutTheRole: 'Yes'
  }))
  jobs.push(generateJob({ status: 'Active' }))
  jobs.push(generateJob({ status: 'Active' }))
  jobs.push(generateJob({ status: 'Active' }))
  jobs.push(generateJob({ status: 'Active' }))
  jobs.push(generateJob({ status: 'Active' }))
  jobs.push(generateJob({ status: 'Active' }))
  jobs.push(generateJob({ status: 'Active' }))
  jobs.push(generateJob({ status: 'Active' }))
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
