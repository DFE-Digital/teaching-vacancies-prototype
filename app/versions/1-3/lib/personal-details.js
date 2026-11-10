const demoPersonalDetails = require('../data/demo-personal-details')

function getTrn (profile) {
  if (!profile) return ''
  const value = profile.trn != null && profile.trn !== ''
    ? profile.trn
    : profile.TRN
  return value ? String(value).trim() : ''
}

function setTrn (profile, value) {
  const trimmed = normaliseTrnInput(value)
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

function normaliseTrnInput (value) {
  return String(value || '').replace(/\s/g, '')
}

function validateTrn (value) {
  const normalised = normaliseTrnInput(value)
  if (!normalised) return null
  if (!/^\d{7}$/.test(normalised)) {
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

function normaliseNiNumber (value) {
  return (value || '').replace(/\s/g, '').toUpperCase()
}

function validateNationalInsuranceNumber (value) {
  const ni = normaliseNiNumber(value)
  if (!ni) {
    return 'Enter your National Insurance number'
  }
  const pattern = /^[A-CEGHJ-PR-TW-Z]{2}\d{6}[A-D]$/
  if (!pattern.test(ni)) {
    return 'Enter a National Insurance number in the correct format, like AB 12 34 56 C'
  }
  return null
}

function parseDateParts (day, month, year) {
  return {
    day: (day || '').trim(),
    month: (month || '').trim(),
    year: (year || '').trim()
  }
}

function ageInWholeYears (birthDate, asOfDate) {
  let age = asOfDate.getFullYear() - birthDate.getFullYear()
  const monthDiff = asOfDate.getMonth() - birthDate.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && asOfDate.getDate() < birthDate.getDate())) {
    age -= 1
  }
  return age
}

const MIN_DATE_OF_BIRTH_AGE = 17
const MAX_DATE_OF_BIRTH_AGE = 99

function dateOfBirthMustIncludeMessage (missingParts) {
  if (missingParts.length === 1) {
    return `Date of birth must include a ${missingParts[0]}`
  }
  if (missingParts.length === 2) {
    return `Date of birth must include a ${missingParts[0]} and ${missingParts[1]}`
  }
  return 'Date of birth must include a day, month and year'
}

function setDateOfBirthFieldHighlights (errors, fields) {
  fields.forEach(field => {
    errors[`dateOfBirthHighlight${field.charAt(0).toUpperCase()}${field.slice(1)}`] = true
  })
}

function dateOfBirthErrorSummaryHref (errors) {
  const day = errors.dateOfBirthHighlightDay
  const month = errors.dateOfBirthHighlightMonth
  const year = errors.dateOfBirthHighlightYear
  const count = [day, month, year].filter(Boolean).length
  if (count === 1) {
    if (day) return '#dateOfBirth-day'
    if (month) return '#dateOfBirth-month'
    return '#dateOfBirth-year'
  }
  return '#dateOfBirth'
}

function validateDateOfBirth (day, month, year) {
  const parts = parseDateParts(day, month, year)
  const errors = {}
  const hasDay = !!parts.day
  const hasMonth = !!parts.month
  const hasYear = !!parts.year

  if (!hasDay && !hasMonth && !hasYear) {
    errors.dateOfBirth = 'Enter your date of birth'
    return { errors, dateOfBirth: null }
  }

  const missing = []
  if (!hasDay) missing.push('day')
  if (!hasMonth) missing.push('month')
  if (!hasYear) missing.push('year')

  if (missing.length) {
    errors.dateOfBirth = dateOfBirthMustIncludeMessage(missing)
    setDateOfBirthFieldHighlights(errors, missing)
    return { errors, dateOfBirth: null }
  }

  if (!/^\d{4}$/.test(parts.year)) {
    errors.dateOfBirth = 'Year must include 4 numbers'
    errors.dateOfBirthHighlightYear = true
    return { errors, dateOfBirth: null }
  }

  const d = parseInt(parts.day, 10)
  const m = parseInt(parts.month, 10)
  const y = parseInt(parts.year, 10)

  if (Number.isNaN(d) || Number.isNaN(m) || Number.isNaN(y)) {
    errors.dateOfBirth = 'Date of birth must be a real date'
    return { errors, dateOfBirth: null }
  }

  const date = new Date(y, m - 1, d)
  if (
    date.getFullYear() !== y ||
    date.getMonth() !== m - 1 ||
    date.getDate() !== d
  ) {
    errors.dateOfBirth = 'Date of birth must be a real date'
    return { errors, dateOfBirth: null }
  }

  const today = new Date()
  today.setHours(0, 0, 0, 0)
  if (date >= today) {
    errors.dateOfBirth = 'Date of birth must be in the past'
    return { errors, dateOfBirth: null }
  }

  const age = ageInWholeYears(date, today)
  if (age < MIN_DATE_OF_BIRTH_AGE) {
    errors.dateOfBirth = 'You must be at least 17 years old'
    return { errors, dateOfBirth: null }
  }
  if (age > MAX_DATE_OF_BIRTH_AGE) {
    errors.dateOfBirth = 'Enter a date of birth for someone under 100 years old'
    return { errors, dateOfBirth: null }
  }

  return { errors, dateOfBirth: { day: parts.day, month: parts.month, year: parts.year } }
}

const UK_POSTCODE_PATTERN = /^[A-Z]{1,2}[0-9][A-Z0-9]?[0-9][A-Z]{2}$/i

function normalisePostcode (value) {
  const compact = (value || '').replace(/\s/g, '').toUpperCase()
  if (!compact) return ''
  if (compact.length <= 3) return compact
  return `${compact.slice(0, -3)} ${compact.slice(-3)}`
}

function resolveLocationOnProfile (profile) {
  if (!profile) return
  const hasTown = !!(profile.town || '').trim()
  const hasPostcode = !!(profile.postcode || '').trim()
  if (hasTown || hasPostcode) return

  const legacy = (profile.townOrPostcode || '').trim()
  if (!legacy) return

  const compactLegacy = legacy.replace(/\s/g, '')
  if (UK_POSTCODE_PATTERN.test(compactLegacy)) {
    profile.postcode = normalisePostcode(legacy)
  } else {
    profile.town = legacy
  }
}

function validateTownWhenProvided (value) {
  const trimmed = (value || '').trim()
  if (!trimmed) return null
  const letterCount = trimmed.replace(/[^a-zA-Z]/g, '').length
  if (letterCount < 3) {
    return 'Town must be at least 3 letters'
  }
  return null
}

function validatePostcode (value) {
  const trimmed = (value || '').trim()
  if (!trimmed) {
    return null
  }
  const compact = trimmed.replace(/\s/g, '')
  if (!UK_POSTCODE_PATTERN.test(compact)) {
    return 'Enter a postcode in the correct format, for example SW1A 1AA'
  }
  return null
}

function validateTownAndPostcode (town, postcode) {
  const errors = {}
  const townTrimmed = (town || '').trim()
  const postcodeTrimmed = (postcode || '').trim()

  const postcodeError = validatePostcode(postcode)
  if (postcodeError) errors.postcode = postcodeError

  const townFormatError = validateTownWhenProvided(town)
  if (townFormatError) errors.town = townFormatError

  if (!townTrimmed && !postcodeTrimmed) {
    errors.town = 'Enter your town or postcode'
  }

  return errors
}

function validateJobseekerProfileCapture (fields) {
  const errors = Object.assign(
    {},
    validateName(fields.firstName, fields.lastName)
  )

  Object.assign(errors, validateTownAndPostcode(fields.town, fields.postcode))

  const niError = validateNationalInsuranceNumber(fields.nationalInsuranceNumber)
  if (niError) errors.nationalInsuranceNumber = niError

  const dobResult = validateDateOfBirth(
    fields.dateOfBirthDay,
    fields.dateOfBirthMonth,
    fields.dateOfBirthYear
  )
  Object.assign(errors, dobResult.errors)

  return { errors, dateOfBirth: dobResult.dateOfBirth }
}

function validateJobseekerProfileCaptureV2 (fields) {
  const errors = Object.assign(
    {},
    validateName(fields.firstName, fields.lastName)
  )

  Object.assign(errors, validateTownAndPostcode(fields.town, fields.postcode))

  const trnError = validateTrn(fields.trn)
  if (trnError) errors.trn = trnError

  const dobResult = validateDateOfBirth(
    fields.dateOfBirthDay,
    fields.dateOfBirthMonth,
    fields.dateOfBirthYear
  )
  Object.assign(errors, dobResult.errors)

  return { errors, dateOfBirth: dobResult.dateOfBirth }
}

function dateOfBirthErrorSummaryList (errors) {
  if (!errors.dateOfBirth) return []
  return [{
    text: errors.dateOfBirth,
    href: dateOfBirthErrorSummaryHref(errors)
  }]
}

function niErrorSummaryList (message) {
  return message ? [{ text: message, href: '#nationalInsuranceNumber' }] : []
}

function locationErrorSummaryList (errors) {
  const list = []
  if (errors.town) list.push({ text: errors.town, href: '#town' })
  if (errors.postcode) list.push({ text: errors.postcode, href: '#postcode' })
  return list
}

function jobseekerProfileCaptureErrorSummaryList (errors) {
  const list = []
  if (errors.firstName) list.push({ text: errors.firstName, href: '#firstName' })
  if (errors.lastName) list.push({ text: errors.lastName, href: '#lastName' })
  if (errors.dateOfBirth) {
    list.push({
      text: errors.dateOfBirth,
      href: dateOfBirthErrorSummaryHref(errors)
    })
  }
  if (errors.nationalInsuranceNumber) {
    list.push({ text: errors.nationalInsuranceNumber, href: '#nationalInsuranceNumber' })
  }
  if (errors.town) list.push({ text: errors.town, href: '#town' })
  if (errors.postcode) list.push({ text: errors.postcode, href: '#postcode' })
  return list
}

function jobseekerProfileCaptureV2ErrorSummaryList (errors) {
  const list = []
  if (errors.firstName) list.push({ text: errors.firstName, href: '#firstName' })
  if (errors.lastName) list.push({ text: errors.lastName, href: '#lastName' })
  if (errors.dateOfBirth) {
    list.push({
      text: errors.dateOfBirth,
      href: dateOfBirthErrorSummaryHref(errors)
    })
  }
  if (errors.trn) list.push({ text: errors.trn, href: '#trn' })
  if (errors.town) list.push({ text: errors.town, href: '#town' })
  if (errors.postcode) list.push({ text: errors.postcode, href: '#postcode' })
  return list
}

function padDatePart (value) {
  const text = String(value).trim()
  return text.length === 1 ? `0${text}` : text
}

function formatDateOfBirthForDisplay (profile) {
  const dob = profile && profile.dateOfBirth
  if (!dob || !dob.day || !dob.month || !dob.year) return 'Not provided'
  return `${padDatePart(dob.day)}/${padDatePart(dob.month)}/${dob.year}`
}

function formatNiForDisplay (profile) {
  const ni = normaliseNiNumber(profile && profile.nationalInsuranceNumber)
  if (!ni) return 'Not provided'
  if (ni.length === 9) {
    return `${ni.slice(0, 2)} ${ni.slice(2, 4)} ${ni.slice(4, 6)} ${ni.slice(6, 8)} ${ni.slice(8)}`
  }
  return ni
}

function formatTownForDisplay (profile) {
  resolveLocationOnProfile(profile)
  const value = profile && profile.town
  return (value && String(value).trim()) || 'Not provided'
}

function formatPostcodeForDisplay (profile) {
  resolveLocationOnProfile(profile)
  const value = profile && profile.postcode
  if (!value || !String(value).trim()) return 'Not provided'
  return normalisePostcode(value)
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
  if (!normaliseNiNumber(profile.nationalInsuranceNumber) && demoPersonalDetails.nationalInsuranceNumber) {
    profile.nationalInsuranceNumber = demoPersonalDetails.nationalInsuranceNumber
  }
  resolveLocationOnProfile(profile)
  if (!(profile.town || '').trim() && demoPersonalDetails.town) {
    profile.town = demoPersonalDetails.town
  }
  if (!(profile.postcode || '').trim() && demoPersonalDetails.postcode) {
    profile.postcode = demoPersonalDetails.postcode
  }
  const dob = profile.dateOfBirth
  const hasDob = dob && dob.day && dob.month && dob.year
  if (!hasDob && demoPersonalDetails.dateOfBirth) {
    profile.dateOfBirth = { ...demoPersonalDetails.dateOfBirth }
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
  normaliseNiNumber,
  normaliseTrnInput,
  validateNationalInsuranceNumber,
  validateDateOfBirth,
  normalisePostcode,
  resolveLocationOnProfile,
  validateTownWhenProvided,
  validatePostcode,
  validateTownAndPostcode,
  validateJobseekerProfileCapture,
  validateJobseekerProfileCaptureV2,
  dateOfBirthErrorSummaryList,
  niErrorSummaryList,
  locationErrorSummaryList,
  jobseekerProfileCaptureErrorSummaryList,
  jobseekerProfileCaptureV2ErrorSummaryList,
  formatDateOfBirthForDisplay,
  formatNiForDisplay,
  formatTownForDisplay,
  formatPostcodeForDisplay,
  applyDemoPersonalDetails,
  demoPersonalDetails
}
