const express = require('express')
const router = express.Router()
const flash = require('connect-flash')
router.use(flash())

router.all('*', (req, res, next) => {
  res.locals.referrer = req.query.referrer
  res.locals.query = req.query
  res.locals.user = req.session.user
  res.locals.flash = req.flash('success') // pass through 'success' messages only
  next()
})

require('./routes/account')(router)

require('./routes/profile')(router)
require('./routes/profile-personal-details')(router)
require('./routes/profile-job-preferences')(router)
require('./routes/profile-teaching-status')(router)
require('./routes/profile-qualifications')(router)
require('./routes/profile-work-history')(router)
require('./routes/profile-about')(router)
require('./routes/profile-hide-profile')(router)
require('./routes/profile-errors')(router)

require('./routes/jobs')(router)
require('./routes/schools')(router)

module.exports = router
