const express = require('express')
const router = express.Router()
const users = require('./data/users.json')

router.all('*', (req, res, next) => {
  res.locals.referrer = req.query.referrer
  res.locals.query = req.query
  res.locals.user = req.session.user
  res.locals.flash = req.flash('success') // pass through 'success' messages only
  next()
})

router.post('/sign-in', (req, res) => {
  res.locals.user = req.session.user = users[0]
  res.redirect('/jobs')
})

router.get('/sign-out', (req, res) => {
  res.locals.user = req.session.user = null
  res.redirect('/')
})

router.post('/create-account', (req, res) => {
  res.locals.user = req.session.user = {
    username: req.body.emailAddress,
    password: req.body.password,
    profile: {
      qualifications: []
    }
  }
  res.redirect('/create-account/confirmation')
})

require('./routes/profile')(router)
require('./routes/profile-personal-details')(router)
require('./routes/profile-job-preferences')(router)
require('./routes/profile-teaching-status')(router)
require('./routes/profile-about')(router)
require('./routes/profile-qualifications')(router)

require('./routes/jobs')(router)
require('./routes/schools')(router)

module.exports = router
