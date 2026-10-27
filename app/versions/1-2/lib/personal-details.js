const demoPersonalDetails = require('../data/demo-personal-details')

function getTrn (profile) {
  if (!profile) return ''
  const value = profile.trn != null && profile.trn !== ''
    ? profile.trn
    : profile.TRN
  return value ? String(value).trim() : ''
}

function setTrn (profile, value) {
  const trimmed = (value || '').trim()
  if (trimmed) {
    profile.trn = trimmed
    profile.TRN = trimmed
  } else {
    delete profile.trn
    delete profile.TRN
  }
}

function formatTrnForDisplay (profile) {
  const trn = getTrn(profile)
  return trn || 'Not provided'
}

function validateTrn (value) {
  const trimmed = (value || '').trim()
  if (!trimmed) return null
  if (!/^\d{7}$/.test(trimmed)) {
    return 'Enter a valid teacher reference number (TRN) — it must be 7 digits'
  }
  return null
}

function validateName (firstName, lastName) {
  const errors = {}
  if (!(firstName || '').trim()) {
    errors.firstName = 'Enter your first name'
  }
  if (!(lastName || '').trim()) {
    errors.lastName = 'Enter your last name'
  }
  return errors
}

function nameErrorSummaryList (errors) {
  const list = []
  if (errors.firstName) {
    list.push({ text: errors.firstName, href: '#firstName' })
  }
  if (errors.lastName) {
    list.push({ text: errors.lastName, href: '#lastName' })
  }
  return list
}

function trnErrorSummaryList (trnError) {
  return trnError ? [{ text: trnError, href: '#trn' }] : []
}

function applyDemoPersonalDetails (profile) {
  if (!profile) return
  if (!(profile.firstName || '').trim()) {
    profile.firstName = demoPersonalDetails.firstName
  }
  if (!(profile.lastName || '').trim()) {
    profile.lastName = demoPersonalDetails.lastName
  }
  if (!getTrn(profile)) {
    setTrn(profile, demoPersonalDetails.trn)
  }
}

module.exports = {
  getTrn,
  setTrn,
  formatTrnForDisplay,
  validateTrn,
  validateName,
  nameErrorSummaryList,
  trnErrorSummaryList,
  applyDemoPersonalDetails,
  demoPersonalDetails
}
