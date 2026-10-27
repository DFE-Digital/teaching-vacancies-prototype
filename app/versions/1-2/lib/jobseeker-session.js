const defaultAlerts = require('../data/jobseeker-alerts')
const { applyDemoPersonalDetails } = require('./personal-details')
const { applyFormToAlert, parseSubscriptionForm, criteriaFromForm, formatLocation } = require('./job-alert-form')
const { randomUUID } = require('crypto')

function cloneAlerts (alerts) {
  return JSON.parse(JSON.stringify(alerts))
}

function ensureJobseekerAlerts (session) {
  if (!session.data) session.data = {}
  if (!Array.isArray(session.data.jobseekerAlerts)) {
    session.data.jobseekerAlerts = cloneAlerts(defaultAlerts)
  }
  return session.data.jobseekerAlerts
}

function seedJobseekerAlerts (session, { empty = false } = {}) {
  if (!session.data) session.data = {}
  session.data.jobseekerAlerts = empty ? [] : cloneAlerts(defaultAlerts)
  return session.data.jobseekerAlerts
}

function mergeMissingDefaultAlerts (session) {
  const alerts = ensureJobseekerAlerts(session)
  for (const seedAlert of defaultAlerts) {
    if (!alerts.some(alert => alert.id === seedAlert.id)) {
      alerts.push(cloneAlerts([seedAlert])[0])
    }
  }
  return alerts
}

function importGuestAlertOnRegister (session) {
  const alerts = ensureJobseekerAlerts(session)
  const alreadyImported = alerts.some(a => a.id === 'alert-imported-guest')
  if (alreadyImported) return alerts

  alerts.unshift({
    id: 'alert-imported-guest',
    keyword: 'teacher, primary',
    location: 'Within 10 miles of Leeds',
    criteria: {
      ect: 'Yes',
      subjects: 'Primary',
      phases: 'Primary school',
      workingPatterns: 'Full time'
    },
    frequency: 'weekly',
    status: 'active',
    imported: true
  })
  return alerts
}

function addJobAlertFromForm (session, body) {
  const alerts = ensureJobseekerAlerts(session)
  const form = parseSubscriptionForm(body)
  const alert = {
    id: randomUUID(),
    keyword: form.keyword || 'teacher',
    location: formatLocation(form.location || 'London', form.radius),
    criteria: criteriaFromForm(form),
    form,
    frequency: form.frequency || 'weekly',
    status: 'active'
  }
  alerts.push(alert)
  return alerts
}

function updateAlertFromForm (session, id, body) {
  const alert = findAlert(session, id)
  if (!alert) return null
  return applyFormToAlert(alert, body)
}

function findAlert (session, id) {
  return ensureJobseekerAlerts(session).find(a => a.id === id)
}

function getAlertEditForm (alert) {
  if (!alert) return null
  if (alert.form) return alert.form
  const seed = defaultAlerts.find(a => a.id === alert.id)
  return seed && seed.form ? cloneAlerts([seed.form])[0] : null
}

function updateAlert (session, id, updates) {
  const alert = findAlert(session, id)
  if (!alert) return null
  Object.assign(alert, updates)
  return alert
}

function deleteAlert (session, id) {
  const alerts = ensureJobseekerAlerts(session)
  const index = alerts.findIndex(a => a.id === id)
  if (index === -1) return false
  alerts.splice(index, 1)
  return true
}

function ensureSignedInJobseeker (req, users) {
  req.session.data.signedIn = true
  if (!req.session.user) {
    req.session.user = users.find(u => u.emailAddress === 'rachael@example.com') || users[0]
  }
  if (!req.session.user.profile) req.session.user.profile = {}
  applyDemoPersonalDetails(req.session.user.profile)
  ensureJobseekerAlerts(req.session)
  return req.session.user
}

module.exports = {
  ensureJobseekerAlerts,
  seedJobseekerAlerts,
  mergeMissingDefaultAlerts,
  importGuestAlertOnRegister,
  addJobAlertFromForm,
  updateAlertFromForm,
  findAlert,
  getAlertEditForm,
  updateAlert,
  deleteAlert,
  ensureSignedInJobseeker
}
