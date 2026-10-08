const users = require('../data/users.json')
const Validator = require('../helpers/validator')

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
      if (req.session.data.savedJobState) params.set('savedJobState', req.session.data.savedJobState)
      if (req.session.data.savedJobSort) params.set('savedJobSort', req.session.data.savedJobSort)
      const query = params.toString()
      return res.redirect('/onelogin/journey/match' + (query ? '?' + query : ''))
    }

    const sampleSavedJobs = [
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
    const formatDay = value => {
      const date = new Date(value)
      if (Number.isNaN(date.getTime())) return ''
      return date.toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        timeZone: 'UTC'
      })
    }
    const jobs = req.session.data.jobs || []
    const hidden = (req.session.data.hiddenSampleSavedJobs || []).map(String)
    const state = req.session.data.savedJobState
    let savedJobList = []

    if (state === 'saved') {
      savedJobList = sampleSavedJobs.filter(job => !hidden.includes(job.id))
    } else if (state !== 'empty') {
      const savedIds = (req.session.data.savedJobs || []).map(String)
      savedJobList = savedIds.map(id => {
        const job = jobs.find(item => String(item.id) === id)
        if (!job) return null
        const address = job.organisation && job.organisation.address
        return {
          id: String(job.id),
          title: job.title,
          organisation: job.organisation && job.organisation.name,
          location: [address && address.town, address && address.postcode].filter(Boolean).join(', '),
          added: '5 October 2026',
          addedSort: '2026-10-05',
          deadline: `${formatDay(job.closingDate)} at ${job.closingTime || '5pm'}`,
          deadlineSort: job.closingDate || '',
          href: '/jobs/' + job.id
        }
      }).filter(Boolean)
    }

    const savedJobSort = req.session.data.savedJobSort || 'added'
    savedJobList.sort((a, b) => {
      if (savedJobSort === 'title') return a.title.localeCompare(b.title)
      if (savedJobSort === 'deadline') return String(a.deadlineSort).localeCompare(String(b.deadlineSort))
      return String(b.addedSort).localeCompare(String(a.addedSort))
    })

    res.render('onelogin/journey/match', {
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
