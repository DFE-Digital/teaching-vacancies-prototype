const jobs = require('./jobs.json')

const contracts = ['Permanent', 'Fixed term', 'Yearly contract']
const schoolPhases = ['Primary school', 'Secondary school']

const researched = [
  {
    title: 'Teacher of Physical Education',
    organisation: "Eden Girls' School",
    town: 'Slough',
    county: 'Berkshire',
    postcode: 'SL1 4AA',
    phase: 'Secondary school',
    contract: 'Fixed term',
    workingPattern: 'Full time',
    hours: '32.5 hours',
    salary: '£32,140 to £43,685',
    ect: false,
    overseas: false,
    driving: false
  },
  {
    title: 'Teacher – maternity cover',
    organisation: 'Jerry Clay Academy',
    town: 'Wakefield',
    county: 'West Yorkshire',
    postcode: 'WF2 0NP',
    phase: 'Primary school',
    contract: 'Fixed term',
    workingPattern: 'Full time',
    salary: '£31,650 to £43,607',
    ect: true,
    overseas: false,
    driving: false
  },
  {
    title: 'Teacher – English (Literacy and ESOL)',
    organisation: 'Luminate Education Group',
    town: 'Leeds',
    county: 'West Yorkshire',
    postcode: 'LS3 1AA',
    phase: 'Secondary school',
    contract: 'Permanent',
    workingPattern: 'Full time',
    hours: '37 hours per week, Monday to Friday',
    salary: '£32,140 to £49,084',
    ect: true,
    overseas: true,
    driving: false
  },
  {
    title: 'Teacher of Mathematics',
    organisation: 'Cardinal Heenan Catholic High School',
    town: 'Leeds',
    county: 'West Yorkshire',
    postcode: 'LS6 4QE',
    phase: 'Secondary school',
    contract: 'Permanent',
    workingPattern: 'Full time',
    salary: '£32,140 to £49,084',
    ect: true,
    overseas: false,
    driving: false
  },
  {
    title: 'Teacher of Science',
    organisation: 'Cardinal Heenan Catholic High School',
    town: 'Leeds',
    county: 'West Yorkshire',
    postcode: 'LS6 4QE',
    phase: 'Secondary school',
    contract: 'Yearly contract',
    workingPattern: 'Full time',
    salary: '£32,140 to £49,084',
    ect: false,
    overseas: true,
    driving: false
  },
  {
    title: 'Teaching Assistant L1',
    organisation: 'Comberton Village College',
    town: 'Cambridge',
    county: 'Cambridgeshire',
    postcode: 'CB23 7NX',
    phase: 'Secondary school',
    contract: 'Permanent',
    workingPattern: 'Part time',
    salary: '£23,114 to £24,294',
    ect: false,
    overseas: false,
    driving: false
  },
  {
    title: 'Midday Supervisor',
    organisation: 'Comberton Village College',
    town: 'Cambridge',
    county: 'Cambridgeshire',
    postcode: 'CB23 7NX',
    phase: 'Primary school',
    contract: 'Permanent',
    workingPattern: 'Part time',
    salary: '£12.21 per hour',
    ect: false,
    overseas: false,
    driving: false
  },
  {
    title: 'Teacher of Mathematics – A Level experience an advantage',
    organisation: 'Chiswick School',
    town: 'London',
    county: '',
    postcode: 'W4 3UN',
    phase: 'Secondary school',
    contract: 'Permanent',
    workingPattern: 'Part time',
    salary: '£36,745 to £56,959',
    ect: false,
    overseas: true,
    driving: false
  },
  {
    title: 'Assistant Headteacher',
    organisation: 'Enhance Academy Trust',
    town: 'More than one location',
    county: '',
    postcode: '',
    phase: 'Primary school',
    contract: 'Permanent',
    workingPattern: 'Full time',
    salary: '£58,959 to £67,351',
    ect: false,
    overseas: false,
    driving: true
  }
]

const extraSchools = [
  ['Oakwood Primary School', 'Bristol', 'BS7 9HJ', 'Primary school'],
  ['Hillside Secondary School', 'Manchester', 'M14 6HN', 'Secondary school'],
  ['Riverside Academy', 'Birmingham', 'B5 7QU', 'Secondary school'],
  ['St Mary\'s Primary School', 'Norwich', 'NR2 1RJ', 'Primary school'],
  ['Kingswood High School', 'Sheffield', 'S10 2PW', 'Secondary school'],
  ['Meadow View Primary', 'Oxford', 'OX4 1LT', 'Primary school'],
  ['Harbour Secondary School', 'Plymouth', 'PL1 2AB', 'Secondary school'],
  ['Ash Grove Primary School', 'York', 'YO10 3DX', 'Primary school'],
  ['Castle Hill School', 'Lincoln', 'LN2 4PN', 'Secondary school'],
  ['Willow Bank Primary', 'Exeter', 'EX4 3SR', 'Primary school'],
  ['Northgate Academy', 'Newcastle', 'NE2 1XE', 'Secondary school'],
  ['Parkside Primary School', 'Reading', 'RG1 5RQ', 'Primary school'],
  ['Westfield High School', 'Coventry', 'CV1 2WT', 'Secondary school'],
  ['Green Lane Primary', 'Leicester', 'LE2 1WF', 'Primary school'],
  ['Southbank School', 'Brighton', 'BN1 4GH', 'Secondary school']
]

function location (alert) {
  return [alert.organisation, alert.town, alert.county, alert.postcode].filter(Boolean).join(', ')
}

function flags (alert) {
  const items = []
  if (alert.ect) items.push('ECT friendly')
  if (alert.overseas) items.push('Accepts overseas qualifications')
  if (alert.driving) items.push('Driving required')
  return items
}

function listing (alert, index) {
  return {
    title: alert.title,
    href: '/jobs/' + (alert.id || jobs[index % jobs.length].id),
    location: location(alert),
    phase: alert.phase,
    contract: alert.contract,
    workingPattern: alert.workingPattern,
    hours: alert.hours || '',
    salary: alert.salary,
    flags: flags(alert),
    alertHref: '/jobsfeonly_alert'
  }
}

function fromJob (job, index, overrides) {
  const org = job.organisation || {}
  const address = (job.locations && job.locations[0] && job.locations[0].address) || org.address || {}
  const phase = schoolPhases[index % 2]
  return Object.assign({
    id: job.id,
    title: job.title,
    organisation: org.name,
    town: address.town,
    county: '',
    postcode: address.postcode,
    phase: phase,
    contract: contracts[index % contracts.length],
    workingPattern: (job.workingPatterns || ['Full time']).join(', '),
    salary: job.actualSalaryDetails || 'Salary to be confirmed',
    ect: index % 5 === 0,
    overseas: index % 6 === 0,
    driving: index % 11 === 0
  }, overrides)
}

const alerts = []

researched.forEach((alert, index) => {
  alerts.push(listing(alert, index))
})

jobs.forEach((job, index) => {
  alerts.push(listing(fromJob(job, index), index))
})

let extraIndex = 0
while (alerts.length < 69) {
  const job = jobs[extraIndex % jobs.length]
  const school = extraSchools[extraIndex % extraSchools.length]
  alerts.push(listing(fromJob(job, alerts.length, {
    organisation: school[0],
    town: school[1],
    postcode: school[2],
    phase: school[3],
    contract: contracts[alerts.length % contracts.length],
    workingPattern: extraIndex % 2 === 0 ? 'Part time' : 'Full time'
  }), alerts.length))
  extraIndex += 1
}

module.exports = alerts
