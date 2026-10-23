const listingJobs = require('../data/jobs.json')

const SAMPLE_LISTING_SAVED_JOB_IDS = [
  '676686861',
  '67668686122',
  '676676691',
  '676676692',
  '6766766931',
  '676676694',
  '676676695',
  '676676696'
]

const SAMPLE_LISTING_ADDED_DATES = [
  { added: '4 October 2026', addedSort: '2026-10-04' },
  { added: '3 October 2026', addedSort: '2026-10-03' },
  { added: '2 October 2026', addedSort: '2026-10-02' },
  { added: '1 October 2026', addedSort: '2026-10-01' },
  { added: '30 September 2026', addedSort: '2026-09-30' },
  { added: '29 September 2026', addedSort: '2026-09-29' },
  { added: '28 September 2026', addedSort: '2026-09-28' },
  { added: '27 September 2026', addedSort: '2026-09-27' }
]

const ALLOWED_SAVED_JOB_SORTS = ['added', 'deadline', 'title']
const SAVED_JOBS_PATH = '/jobseekers/saved_jobs'

function formatClosingDay (value) {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return ''
  return date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    timeZone: 'UTC'
  })
}

function savedJobFromListingJob (job, addedMeta) {
  const address = job.organisation && job.organisation.address
  const closingDay = formatClosingDay(job.closingDate)
  return {
    id: String(job.id),
    title: job.title,
    organisation: job.organisation && job.organisation.name,
    location: [address && address.town, address && address.postcode].filter(Boolean).join(', '),
    added: addedMeta.added,
    addedSort: addedMeta.addedSort,
    deadline: closingDay ? `${closingDay} at ${job.closingTime || '5pm'}` : '',
    deadlineSort: job.closingDate ? String(job.closingDate).slice(0, 10) : '',
    href: '/jobs/' + job.id
  }
}

function buildSampleSavedJobs () {
  const fixed = [
    {
      id: 'sample-hlta',
      title: 'HLTA (higher level teaching assistant) 8',
      organisation: 'Lift Bexleyheath',
      location: 'Bexleyheath, Kent',
      added: '5 October 2026',
      addedSort: '2026-10-05',
      deadline: '2 April 2027 at 9am',
      deadlineSort: '2027-04-02',
      href: '/jobs/676676693'
    },
    {
      id: 'sample-headteacher',
      title: 'Headteacher (Health and social care, Law, Psychology) 1',
      organisation: 'Lift Bexleyheath',
      location: 'Bexleyheath, Kent',
      added: '5 October 2026',
      addedSort: '2026-10-05',
      deadline: '2 April 2027 at 9am',
      deadlineSort: '2027-04-02',
      href: '/jobs/676676690'
    }
  ]
  const fromListing = SAMPLE_LISTING_SAVED_JOB_IDS.map((jobId, index) => {
    const job = listingJobs.find(item => String(item.id) === jobId && item.status === 'Active')
    if (!job) return null
    return savedJobFromListingJob(job, SAMPLE_LISTING_ADDED_DATES[index])
  }).filter(Boolean)
  return fixed.concat(fromListing)
}

function savedJobsQueryString (session) {
  const params = new URLSearchParams()
  params.set('savedJobState', session.data.savedJobState || 'saved')
  if (session.data.savedJobSort) params.set('savedJobSort', session.data.savedJobSort)
  const query = params.toString()
  return query ? `?${query}` : ''
}

function applySavedJobsQuery (req) {
  if (req.query.savedJobState === 'empty') {
    req.session.data.savedJobState = 'empty'
  } else if (req.query.savedJobState === 'saved' || req.query.savedJobState === undefined) {
    req.session.data.savedJobState = 'saved'
  }

  if (req.query.savedJobSort && ALLOWED_SAVED_JOB_SORTS.includes(req.query.savedJobSort)) {
    req.session.data.savedJobSort = req.query.savedJobSort
  }
}

function getSavedJobList (req) {
  const sampleSavedJobs = buildSampleSavedJobs()
  const hidden = (req.session.data.hiddenSampleSavedJobs || []).map(String)
  const state = req.session.data.savedJobState
  let savedJobList = []

  if (state === 'saved') {
    savedJobList = sampleSavedJobs.filter(job => !hidden.includes(job.id))
  }

  const savedJobSort = req.session.data.savedJobSort || 'added'
  savedJobList.sort((a, b) => {
    if (savedJobSort === 'title') return a.title.localeCompare(b.title)
    if (savedJobSort === 'deadline') return String(a.deadlineSort).localeCompare(String(b.deadlineSort))
    return String(b.addedSort).localeCompare(String(a.addedSort))
  })

  return { savedJobList, savedJobSort }
}

function handleSavedJobsGet (req, res) {
  if (req.query.deleteJob) {
    const id = String(req.query.deleteJob)
    if (!Array.isArray(req.session.data.hiddenSampleSavedJobs)) req.session.data.hiddenSampleSavedJobs = []
    if (!req.session.data.hiddenSampleSavedJobs.includes(id)) {
      req.session.data.hiddenSampleSavedJobs.push(id)
    }
    if (Array.isArray(req.session.data.savedJobs)) {
      req.session.data.savedJobs = req.session.data.savedJobs.filter(savedId => String(savedId) !== id)
    }
    delete req.session.data.deleteJob
    return res.redirect(SAVED_JOBS_PATH + savedJobsQueryString(req.session))
  }

  applySavedJobsQuery(req)
  const { savedJobList, savedJobSort } = getSavedJobList(req)

  res.render('jobseekers/saved-jobs', {
    activeNav: 'applications',
    showSavedJobsToggle: true,
    accountAreaMain: true,
    savedJobList,
    savedJobSort
  })
}

module.exports = {
  SAVED_JOBS_PATH,
  buildSampleSavedJobs,
  handleSavedJobsGet
}
