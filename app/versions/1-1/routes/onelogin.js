const users = require('../data/users.json')
const listingJobs = require('../data/jobs.json')
const Validator = require('../helpers/validator')

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

module.exports = router => {

  router.get('/onelogin/journey/match', (req, res) => {
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
      const params = new URLSearchParams()
      params.set('savedJobState', req.session.data.savedJobState || 'saved')
      if (req.session.data.savedJobSort) params.set('savedJobSort', req.session.data.savedJobSort)
      const query = params.toString()
      return res.redirect('/onelogin/journey/match' + (query ? '?' + query : ''))
    }

    // Saved jobs page uses prototype mock data unless footer empty-state toggle is used.
    if (req.query.savedJobState === 'empty') {
      req.session.data.savedJobState = 'empty'
    } else {
      req.session.data.savedJobState = 'saved'
    }

    const allowedSavedJobSorts = ['added', 'deadline', 'title']
    if (req.query.savedJobSort && allowedSavedJobSorts.includes(req.query.savedJobSort)) {
      req.session.data.savedJobSort = req.query.savedJobSort
    }

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

    res.render('onelogin/journey/match', {
      activeNav: 'applications',
      jobseekerSubNavigation: true,
      jobseekerSubNavSection: 'saved-jobs',
      savedJobList,
      savedJobSort
    })
  })

  router.post('/onelogin/journey/choice', (req, res) => {
    if(req.body.emailAddress) {
      res.locals.user = req.session.user = users.find(user => user.emailAddress == req.body.emailAddress)
    } else {
      res.locals.user = req.session.user = users[0]
    }

    req.session.data.signedIn = true

    var choice = req.session.data['match']

    if (choice == "match"){
        res.redirect('/onelogin/journey/match')
    } else {
        res.redirect('/onelogin/journey/nomatch')
    }
 
  })

  router.post('/onelogin/journey/import', (req, res) => {
  
    var email = req.session.data['oneloginemail']

    if (email == "match@match.com"){
        res.redirect('/onelogin/journey/found')
    } else {
        
      
      const validator = new Validator(req, res);

      validator.add({
        name: 'onelogin.oneloginemail',
        rules: [{
          fn: (value) => {
            let valid = true;
            if(!value || value.trim().length == 0) {
              valid = false;
            }
            return valid;
          },
          message: 'No email address with that account has been found'
        }]
      })
    
      validator.validate();

      res.render('onelogin/journey/import');

    }
 
  })

  router.post('/onelogin/journey/not_found', (req, res) => {
  
    var email = req.session.data['oneloginemail']

    if (email == "match@match.com"){
        res.redirect('/onelogin/journey/found')
    } else {
        res.redirect('/onelogin/journey/not_found')
    }
 
  })

  router.post('/onelogin/journey/found', (req, res) => {
  
    var email = req.session.data['auth-code']

    if (email == "KJFJKFJK56DVDD"){
        res.redirect('/onelogin/journey/code_match')
    } else {

      const validator = new Validator(req, res);

      validator.add({
        name: 'onelogin.code',
        rules: [{
          fn: (value) => {
            let valid = true;
            if(!value || value.trim().length == 0) {
              valid = false;
            }
            return valid;
          },
          message: 'That authentication code is incorrect'
        }]
      })
    
      validator.validate();

      res.render('onelogin/journey/found');

    }
 
  })

  router.post('/onelogin/journey/code_error', (req, res) => {
  
    var email = req.session.data['auth-code']

    if (email == "KJFJKFJK56DVDD"){
        res.redirect('/onelogin/journey/code_match')
    } else {
        res.redirect('/onelogin/journey/code_error')
    }
 
  })

}
