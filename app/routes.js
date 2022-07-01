const express = require('express')
const router = express.Router()
const users = require('./data/users.json')

router.all('*', (req, res, next) => {
  res.locals.referrer = req.query.referrer
  res.locals.query = req.query
  res.locals.user = req.session.user = users[0]
  res.locals.flash = req.flash('success') // pass through 'success' messages only
  next()
})

require('./routes/profile')(router)
require('./routes/profile-personal-details')(router)
require('./routes/profile-job-preferences')(router)
require('./routes/profile-teaching-status')(router)
require('./routes/profile-experience')(router)
require('./routes/profile-qualifications')(router)

module.exports = router
