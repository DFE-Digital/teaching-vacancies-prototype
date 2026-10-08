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
require('./routes/onelogin')(router)

require('./routes/profile')(router)
require('./routes/profile-personal-details')(router)
require('./routes/profile-job-preferences')(router)
require('./routes/profile-teaching-status')(router)
require('./routes/profile-qualifications')(router)
require('./routes/profile-work-history')(router)
require('./routes/profile-about')(router)
require('./routes/profile-hide-profile')(router)
require('./routes/profile-references')(router)
require('./routes/profile-equality')(router)
require('./routes/profile-errors')(router)

require('./routes/application-flow')(router)
require('./routes/jobs')(router)
require('./routes/schools')(router)

//routing for filters
require('./routes/filtering')(router)

const jobAlerts = require('./data/job-alerts')

function asArray (value) {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

function filterJobAlerts (alerts, data) {
  const phases = asArray(data['filter-alert-phase'])
  const contracts = asArray(data['filter-alert-contract'])
  const patterns = asArray(data['filter-alert-workingPatterns'])
  const flags = asArray(data['filter-alert-flag'])

  return alerts.filter(alert => {
    if (phases.length && !phases.includes(alert.phase)) return false
    if (contracts.length && !contracts.includes(alert.contract)) return false
    if (patterns.length) {
      const alertPatterns = String(alert.workingPattern || '').split(',').map(part => part.trim())
      if (!patterns.some(pattern => alertPatterns.includes(pattern))) return false
    }
    if (flags.length) {
      const alertFlags = alert.flags || []
      if (!flags.every(flag => alertFlags.includes(flag))) return false
    }
    return true
  })
}

const alertFilterKeys = [
  'filter-alert-phase',
  'filter-alert-contract',
  'filter-alert-workingPatterns',
  'filter-alert-flag'
]

router.get('/jobseeker/job-alert-1', (req, res) => {
  res.render('jobseeker/job-alert-1', {
    alerts: jobAlerts
  })
})

router.get('/job-alert-via-email', (req, res) => {
  if (req.query['filters-applied'] === 'true') {
    alertFilterKeys.forEach(key => {
      if (req.query[key] === undefined) {
        delete req.session.data[key]
        if (res.locals.data) delete res.locals.data[key]
      }
    })
  }

  const filteredAlerts = filterJobAlerts(jobAlerts, req.session.data || {})
  res.render('jobseeker/job-alert-via-email', {
    alerts: jobAlerts,
    filteredAlerts
  })
})

router.get('/job-alert-via-email/clear-filters', (req, res) => {
  alertFilterKeys.forEach(key => {
    delete req.session.data[key]
  })
  res.redirect('/job-alert-via-email')
})

router.get('/job-alert-via-email/remove-filter', (req, res) => {
  const name = req.query.name
  const value = req.query.value

  if (name && value && alertFilterKeys.includes(name) && req.session.data[name]) {
    const current = req.session.data[name]

    if (Array.isArray(current)) {
      const updated = current.filter(item => item !== value)
      if (updated.length) {
        req.session.data[name] = updated
      } else {
        delete req.session.data[name]
      }
    } else if (current === value) {
      delete req.session.data[name]
    }
  }

  res.redirect('/job-alert-via-email')
})

module.exports = router
