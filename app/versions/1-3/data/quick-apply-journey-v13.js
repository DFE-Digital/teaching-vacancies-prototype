/**
 * Jobseeker Quick Apply (KCSIE) journey map — v1.3 prototype routes.
 * Reference: publication/applications mapping (JS1–JS24, REL1–2).
 */

const VERSION_PREFIX = '/1-3'
const EXAMPLE_JOB_ID = '67663'

const journeyTypeLabels = {
  all: 'All journeys',
  start: 'Start journey',
  kcsie: 'KCSIE Quick Apply',
  religious: 'Religious form',
  end: 'End journey'
}

const stepsRaw = [
  {
    id: 'JS1',
    name: 'List of jobs',
    route: '/jobs · /search/applications',
    type: 'all',
    path: '/jobs',
    extraLinks: [{ path: '/search/applications', label: 'Search applications' }]
  },
  { id: 'JS2', name: 'Job details; Apply for this job', route: '/jobs/:id', type: 'all', pathPattern: '/jobs/:id' },
  { id: 'JS3', name: 'Before you start', route: 'GET /jobs/:id/apply', type: 'start', pathPattern: '/jobs/:id/apply' },
  { id: 'JS4', name: 'Task list (index)', route: '/jobs/:id/apply/task-list', type: 'kcsie', pathPattern: '/jobs/:id/apply/task-list' },
  { id: 'JS5', name: 'Personal details', route: '/jobs/:id/apply/personal-details', type: 'kcsie', pathPattern: '/jobs/:id/apply/personal-details' },
  { id: 'JS6', name: 'Professional status', route: '/jobs/:id/apply/professional-status', type: 'kcsie', pathPattern: '/jobs/:id/apply/professional-status' },
  { id: 'JS7', name: 'Qualifications', route: '/jobs/:id/apply/qualifications', type: 'kcsie', pathPattern: '/jobs/:id/apply/qualifications' },
  { id: 'JS8', name: 'Add qualification', route: '/jobs/:id/apply/qualifications/new', type: 'kcsie', optional: true, pathPattern: '/jobs/:id/apply/qualifications/new' },
  { id: 'JS7b', name: 'Training and CPD', route: '/jobs/:id/apply/training', type: 'kcsie', pathPattern: '/jobs/:id/apply/training' },
  { id: 'JS9', name: 'Professional body memberships', route: '/jobs/:id/apply/memberships', type: 'kcsie', pathPattern: '/jobs/:id/apply/memberships' },
  { id: 'JS10', name: 'Add membership', route: '/jobs/:id/apply/memberships/new', type: 'kcsie', optional: true, pathPattern: '/jobs/:id/apply/memberships/new' },
  { id: 'JS11', name: 'Work history', route: '/jobs/:id/apply/work-history', type: 'kcsie', pathPattern: '/jobs/:id/apply/work-history' },
  { id: 'JS12', name: 'Add job', route: '/jobs/:id/apply/work-history/job', type: 'kcsie', optional: true, pathPattern: '/jobs/:id/apply/work-history/job' },
  { id: 'JS13', name: 'Updated work history', route: '/jobs/:id/apply/work-history', type: 'kcsie', pathPattern: '/jobs/:id/apply/work-history' },
  { id: 'JS14', name: 'Add gap', route: '/jobs/:id/apply/work-history/gap', type: 'kcsie', optional: true, pathPattern: '/jobs/:id/apply/work-history/gap' },
  { id: 'JS15', name: 'Gap / education bridge', route: '/jobs/:id/apply/work-history/gap', type: 'kcsie', optional: true, pathPattern: '/jobs/:id/apply/work-history/gap' },
  { id: 'JS16', name: 'Personal statement', route: '/jobs/:id/apply/personal-statement', type: 'kcsie', pathPattern: '/jobs/:id/apply/personal-statement' },
  {
    id: 'REL1–2',
    name: 'Religious form',
    route: 'views/apply/religion_* (not on main route chain)',
    type: 'religious',
    optional: true,
    note: 'Faith school only',
    path: '/prototypes/apply/religion-cofe-1'
  },
  { id: 'JS17', name: 'References', route: '/jobs/:id/apply/references', type: 'kcsie', pathPattern: '/jobs/:id/apply/references' },
  { id: 'JS18', name: 'Add a reference', route: '/jobs/:id/apply/references/new', type: 'kcsie', optional: true, pathPattern: '/jobs/:id/apply/references/new' },
  { id: 'JS19', name: 'References confirmation', route: '/jobs/:id/apply/references', type: 'kcsie', pathPattern: '/jobs/:id/apply/references' },
  { id: 'JS20', name: 'Equal opportunities', route: '/jobs/:id/apply/equal-opportunities', type: 'kcsie', pathPattern: '/jobs/:id/apply/equal-opportunities' },
  { id: 'JS21', name: 'Support or adjustments', route: '/jobs/:id/apply/support', type: 'kcsie', pathPattern: '/jobs/:id/apply/support' },
  { id: 'JS22', name: 'Declarations', route: '/jobs/:id/apply/declarations', type: 'kcsie', pathPattern: '/jobs/:id/apply/declarations' },
  { id: 'JS23', name: 'Review and submit', route: '/jobs/:id/apply/review', type: 'end', pathPattern: '/jobs/:id/apply/review' },
  { id: 'JS24', name: 'Confirmation', route: '/jobs/:id/apply/submitted', type: 'kcsie', pathPattern: '/jobs/:id/apply/submitted' }
]

function versionedPath (path) {
  if (!path || path.indexOf('/') !== 0) {
    return path
  }
  if (path.indexOf(VERSION_PREFIX + '/') === 0 || path === VERSION_PREFIX) {
    return path
  }
  return VERSION_PREFIX + path
}

function resolveOpenHref (step, jobId) {
  if (step.path) {
    return versionedPath(step.path)
  }
  if (step.pathPattern) {
    return versionedPath(step.pathPattern.replace(':id', jobId))
  }
  return null
}

function buildSteps (jobId) {
  return stepsRaw.map(function (step) {
    const extraLinks = (step.extraLinks || []).map(function (link) {
      return {
        label: link.label,
        href: versionedPath(link.path)
      }
    })
    return Object.assign({}, step, {
      mapType: journeyTypeLabels[step.type] || step.type,
      openHref: resolveOpenHref(step, jobId),
      extraLinks: extraLinks.length ? extraLinks : undefined
    })
  })
}

function buildGuide () {
  return {
    pageTitle: 'Quick Apply journey (v1.3)',
    lead:
      'Step-by-step map from job listing to submitted application. Step labels match the service mapping (JS1–JS24). Open links go to v1.3 prototype routes under application-flow.js.',
    entryExample: VERSION_PREFIX + '/jobs/:id/apply',
    exampleJobId: EXAMPLE_JOB_ID,
    versionPrefix: VERSION_PREFIX,
    journeyTypeLabels,
    steps: buildSteps(EXAMPLE_JOB_ID)
  }
}

module.exports = buildGuide
