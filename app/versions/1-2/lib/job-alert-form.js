const PHASE_LABELS = {
  nursery: 'Nursery',
  primary: 'Primary school',
  secondary: 'Secondary school',
  sixth_form_or_college: 'Sixth form or FE college',
  through: 'All through school'
}

const WORKING_PATTERN_LABELS = {
  full_time: 'Full time',
  part_time: 'Part time',
  job_share: 'Job share'
}

function asArray (value) {
  if (value == null || value === '') return []
  return Array.isArray(value) ? value : [value]
}

function parseSubscriptionForm (body) {
  const raw = body.jobseekers_subscription_form || {}
  return {
    keyword: raw.keyword || '',
    location: raw.location || '',
    radius: raw.radius != null ? String(raw.radius) : '0',
    phases: asArray(raw.phases),
    workingPatterns: asArray(raw.working_patterns),
    ectStatuses: asArray(raw.ect_statuses),
    international: asArray(raw.international),
    teachingJobRoles: asArray(raw.teaching_job_roles),
    supportJobRoles: asArray(raw.support_job_roles),
    subjects: asArray(raw.subjects),
    email: raw.email || '',
    frequency: raw.frequency || 'weekly'
  }
}

function formatLocation (location, radius) {
  if (!location) return ''
  if (radius === '0') return location
  const distance = radius === '1' ? '1 mile' : `${radius} miles`
  return `Within ${distance} of ${location}`
}

function criteriaFromForm (form) {
  return {
    ect: form.ectStatuses.includes('ect_suitable') ? 'Yes' : 'No',
    feQts: form.ectStatuses.includes('qts_not_required') ? 'Yes' : 'No',
    visa: form.international.includes('visa') ? 'Yes' : 'No',
    subjects: form.subjects.join(', '),
    phases: form.phases.map(phase => PHASE_LABELS[phase] || phase).join(', '),
    workingPatterns: form.workingPatterns.map(pattern => WORKING_PATTERN_LABELS[pattern] || pattern).join(', ')
  }
}

function applyFormToAlert (alert, body) {
  const form = parseSubscriptionForm(body)
  alert.keyword = form.keyword
  alert.location = formatLocation(form.location, form.radius)
  alert.frequency = form.frequency
  alert.form = form
  alert.criteria = criteriaFromForm(form)
  return alert
}

module.exports = {
  parseSubscriptionForm,
  applyFormToAlert,
  criteriaFromForm,
  formatLocation
}
