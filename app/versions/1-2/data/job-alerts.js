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
    organisationType: 'Academy',
    ageRange: 'Ages 11 to 18',
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
    organisationType: 'Academy',
    ageRange: 'Ages 4 to 11',
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

// Matches hiring filter grouping: Academy (includes free schools) vs LA maintained
const schoolOrganisationTypes = [
  'Academy',
  'Academy',
  'Academy',
  'Local authority maintained school',
  'Voluntary aided school'
]

function phaseFromJob (job, index) {
  const raw = job.phase || (job.organisation && job.organisation.phase) || ''
  if (/primary/i.test(raw)) return 'Primary school'
  if (/secondary/i.test(raw)) return 'Secondary school'
  if (/further education|college|sixth form/i.test(raw)) return 'Further education'
  return schoolPhases[index % 2]
}

function normalizeOrganisationType (type) {
  if (!type) return ''
  if (type === 'School' || type === 'Maintained school') {
    return 'Local authority maintained school'
  }
  if (type === 'Free school') return 'Academy'
  if (type === 'College' || type === 'Corporate') return ''
  return type
}

function isAgeRangeIncompatibleWithPhase (text, phase) {
  const lower = String(text).toLowerCase()
  if (lower.includes('adult')) return true
  if (phase === 'Primary school' && /11\s*to\s*18/.test(lower) && !/4\s*to\s*19/.test(lower)) {
    return true
  }
  if (phase === 'Secondary school' && /4\s*to\s*11/.test(lower) && !/4\s*to\s*19/.test(lower)) {
    return true
  }
  if (phase === 'Primary school' && /16/.test(lower)) return true
  return false
}

function formatSchoolAgeRange (value, phase) {
  if (phase !== 'Primary school' && phase !== 'Secondary school') return ''

  let text = ''
  if (value) {
    const v = String(value).trim()
    if (/^ages\s/i.test(v)) text = v
    else if (/^\d+\s*-\s*\d+/.test(v)) {
      const parts = v.split('-').map(s => s.trim())
      text = 'Ages ' + parts[0] + ' to ' + parts[1]
    } else if (/^\d/.test(v)) text = 'Ages ' + v
    else text = v
  }

  if (text && isAgeRangeIncompatibleWithPhase(text, phase)) text = ''
  if (!text) {
    return phase === 'Primary school' ? 'Ages 4 to 11' : 'Ages 11 to 18'
  }
  return text
}

function defaultOrganisationType (phase, index) {
  if (phase === 'Primary school' || phase === 'Secondary school') {
    return schoolOrganisationTypes[index % schoolOrganisationTypes.length]
  }
  return ''
}

function schoolJobDetails (alert, index) {
  const phase = alert.phase
  if (phase !== 'Primary school' && phase !== 'Secondary school') {
    return { organisationType: '', ageRange: '' }
  }
  const organisationType = normalizeOrganisationType(alert.organisationType) ||
    defaultOrganisationType(phase, index)
  return {
    organisationType,
    ageRange: formatSchoolAgeRange(alert.ageRange, phase)
  }
}

function normalizeSalaryText (text) {
  return String(text || '').replace(/\u00a3/g, '£').trim()
}

function alertAsJob (alert, index) {
  const details = schoolJobDetails(alert, index)
  const organisationType = details.organisationType
  const ageRange = details.ageRange
  const town = alert.town || ''
  const multipleLocations =
    alert.multipleLocations || /more than one location/i.test(town)

  const schoolTypeParts = []
  if (organisationType) {
    schoolTypeParts.push(organisationType)
  }
  if (ageRange) {
    schoolTypeParts.push(String(ageRange).replace(/^Ages /, 'ages '))
  }

  const salary = normalizeSalaryText(alert.salary)
  const isHourly = /per hour/i.test(salary)
  const hasMoney = /£/.test(salary) && !isHourly

  return {
    organisation: {
      name: alert.organisation,
      address: {
        town: multipleLocations ? '' : town,
        county: alert.county || '',
        postcode: alert.postcode || ''
      },
      type: organisationType,
      ageGroup: ageRange ? String(ageRange).replace(/^ages\s/i, '').replace(/\s+to\s+/gi, '-') : ''
    },
    multipleLocations,
    locations: multipleLocations ? [{ address: {} }, { address: {} }] : undefined,
    schoolType: schoolTypeParts.length ? schoolTypeParts.join(', ') : undefined,
    phase: alert.phase,
    contractType: alert.contract,
    workingPatterns: String(alert.workingPattern || 'Full time')
      .split(/,\s*/)
      .filter(Boolean),
    fullTimeEquivalentSalaryDetails: hasMoney ? salary : '',
    actualSalaryDetails: isHourly ? salary : '',
    payScaleDetails: !hasMoney && !isHourly && salary ? salary : '',
    salaryDetails: alert.salaryDetails || [],
    listingHours: alert.hours || ''
  }
}

function resolveJobForAlert (alert, index) {
  if (alert.id) {
    const fromData = jobs.find(function (job) {
      return String(job.id) === String(alert.id)
    })
    if (fromData) {
      const copy = Object.assign({}, fromData)
      if (alert.hours) {
        copy.listingHours = alert.hours
      }
      return copy
    }
  }
  return alertAsJob(alert, index)
}

function listing (alert, index) {
  const details = schoolJobDetails(alert, index)
  const job = resolveJobForAlert(alert, index)
  return {
    title: alert.title,
    href: '/jobs/' + (alert.id || jobs[index % jobs.length].id),
    location: location(alert),
    phase: alert.phase,
    organisationType: details.organisationType,
    ageRange: details.ageRange,
    contract: alert.contract,
    workingPattern: alert.workingPattern,
    hours: alert.hours || '',
    salary: alert.salary,
    flags: flags(alert),
    alertHref: '/jobsfeonly_alert',
    job: job
  }
}

function fromJob (job, index, overrides = {}) {
  const org = job.organisation || {}
  const address = (job.locations && job.locations[0] && job.locations[0].address) || org.address || {}
  const phase = overrides.phase || phaseFromJob(job, index)
  return Object.assign({
    id: job.id,
    title: job.title,
    organisation: org.name,
    town: address.town,
    county: '',
    postcode: address.postcode,
    phase: phase,
    organisationType: org.type || '',
    ageRange: org.ageGroup || '',
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
    organisationType: '',
    ageRange: '',
    contract: contracts[alerts.length % contracts.length],
    workingPattern: extraIndex % 2 === 0 ? 'Part time' : 'Full time'
  }), alerts.length))
  extraIndex += 1
}

module.exports = alerts
