const MAX_LISTING_SALARY_LENGTH = 160

function normalizeCurrencyText (text) {
  return String(text || '').replace(/\u00a3/g, '£').trim()
}

function isSimpleSalaryRange (text) {
  const normalized = normalizeCurrencyText(text)
  return /^£[\d,\.\s\-£]+$/.test(normalized)
}

function isHourlyRate (text) {
  return /per hour/i.test(String(text || ''))
}

function hasAnnualMoney (text) {
  const normalized = normalizeCurrencyText(text)
  return /£/.test(normalized) && !isHourlyRate(normalized)
}

function isPartTime (job) {
  const patterns = job.workingPatterns || []
  return patterns.some(function (pattern) {
    return /part\s*time/i.test(String(pattern))
  })
}

function joinSalaryDetails (job) {
  if (!job.salaryDetails || !job.salaryDetails.length) {
    return ''
  }
  return job.salaryDetails.join(', ')
}

function isMpsUpsOnly (text) {
  return /^MPS\/UPS$/i.test(String(text || '').trim())
}

function listingScaleForJob (job) {
  const fromDetails = joinSalaryDetails(job)
  const payScale = normalizeCurrencyText(job.payScaleDetails)
  let scale = fromDetails || payScale
  if (!scale || isMpsUpsOnly(scale)) {
    return ''
  }
  scale = scale.replace(/\s*MPS\/UPS\s*/gi, ' ').replace(/\s+/g, ' ').trim()
  if (isMpsUpsOnly(scale)) {
    return ''
  }
  return scale
}

function hasMultipleLocations (job) {
  if (!job) {
    return false
  }
  if (job.multipleLocations) {
    return true
  }
  if (job.locations && job.locations.length > 1) {
    return true
  }
  const org = job.organisation || {}
  const addr = org.address || {}
  const locationHint = [addr.town, addr.address1, org.name].filter(Boolean).join(' ')
  return /more than one location/i.test(locationHint)
}

function pickRawSalary (job) {
  const actual = normalizeCurrencyText(job.actualSalaryDetails)
  const fte = normalizeCurrencyText(job.fullTimeEquivalentSalaryDetails)
  const payScale = normalizeCurrencyText(job.payScaleDetails)
  const band = joinSalaryDetails(job)
  const scaleForListing = listingScaleForJob(job)

  if (isPartTime(job) && hasAnnualMoney(actual) && fte) {
    return actual
  }

  if (hasAnnualMoney(fte)) {
    return fte
  }
  if (hasAnnualMoney(actual)) {
    return actual
  }

  if (scaleForListing && !hasAnnualMoney(fte) && !hasAnnualMoney(actual)) {
    return scaleForListing
  }
  if (payScale && !isMpsUpsOnly(payScale) && !hasAnnualMoney(fte) && !hasAnnualMoney(actual)) {
    return payScale
  }
  if (band && !isMpsUpsOnly(band) && !hasAnnualMoney(fte) && !hasAnnualMoney(actual)) {
    return band
  }

  if (isHourlyRate(actual)) {
    return actual
  }
  if (isHourlyRate(fte)) {
    return fte
  }

  if (fte) {
    return fte
  }
  if (actual) {
    return actual
  }
  return ''
}

function appendPayScaleToSalaryLine (text, job) {
  const scale = listingScaleForJob(job)
  const normalized = normalizeCurrencyText(text)
  if (!scale || !normalized) {
    return normalized
  }
  if (normalized.indexOf(scale) !== -1) {
    return normalized
  }
  if (isSimpleSalaryRange(normalized) || hasAnnualMoney(normalized)) {
    return normalized + ' (' + scale + ')'
  }
  return normalized
}

function shortenSalaryForListing (text) {
  if (!text || text.length <= MAX_LISTING_SALARY_LENGTH) {
    return text
  }
  if (/per hour/i.test(text)) {
    return text
  }

  const cutPoints = [
    text.indexOf('. The minimum'),
    text.indexOf('. FTE salary'),
    text.indexOf('. Actual salary')
  ].filter(function (index) {
    return index > 0
  })

  if (cutPoints.length) {
    return text.slice(0, Math.min.apply(null, cutPoints))
  }

  const firstSentence = text.indexOf('. ')
  if (firstSentence > 0 && firstSentence < MAX_LISTING_SALARY_LENGTH) {
    return text.slice(0, firstSentence)
  }

  return text.slice(0, MAX_LISTING_SALARY_LENGTH - 1).trim() + '…'
}

function salaryIncludedPayScale (listingText, job) {
  const scale = listingScaleForJob(job)
  if (!scale || !listingText) {
    return false
  }
  return listingText.indexOf(scale) !== -1
}

function capitalizePattern (text) {
  const s = String(text || '').trim()
  if (!s) {
    return ''
  }
  return s.charAt(0).toUpperCase() + s.slice(1)
}

const filters = {}

filters.jobListingAddress = function (job) {
  if (!job) {
    return ''
  }
  if (hasMultipleLocations(job)) {
    const orgName = job.organisation && job.organisation.name
    if (orgName) {
      return orgName + ', Multiple locations…'
    }
    return 'Multiple locations…'
  }
  if (!job.organisation) {
    return ''
  }
  const org = job.organisation
  const addr = org.address || {}
  const parts = []
  if (org.name) {
    parts.push(org.name)
  }
  ;['address1', 'town', 'county', 'postcode'].forEach(function (key) {
    if (addr[key]) {
      parts.push(addr[key])
    }
  })
  return parts.join(', ')
}

filters.jobListingSchoolType = function (job) {
  if (!job) {
    return ''
  }
  if (job.schoolType && String(job.schoolType).trim()) {
    return String(job.schoolType).trim()
  }
  const org = job.organisation || {}
  const bits = []
  if (org.type) {
    bits.push(org.type)
  }
  if (org.faith) {
    bits.push(org.faith)
  }
  const phase = job.phase || org.phase
  if (phase && !/^(Primary school|Secondary school)$/i.test(String(phase).trim())) {
    bits.push(phase)
  }
  if (org.ageGroup) {
    bits.push('ages ' + String(org.ageGroup).replace(/-/g, ' to '))
  }
  return bits.join(', ')
}

filters.jobListingCompactDetails = function (job) {
  if (!job) {
    return ''
  }
  const parts = []
  const schoolType = filters.jobListingSchoolType(job)
  if (schoolType) {
    parts.push(schoolType)
  }
  if (job.workingPatterns && job.workingPatterns.length) {
    parts.push(
      job.workingPatterns
        .map(function (pattern) {
          return capitalizePattern(pattern)
        })
        .join(', ')
    )
  }
  if (job.listingHours) {
    parts.push(job.listingHours)
  }
  const raw = pickRawSalary(job)
  const scale = listingScaleForJob(job)
  const hasMoney = Boolean(
    raw && (hasAnnualMoney(raw) || isHourlyRate(raw) || isSimpleSalaryRange(raw))
  )
  const hasScale = Boolean(scale)
  if (!hasMoney && !hasScale && job.contractType) {
    parts.push(job.contractType)
  }
  return parts.join(', ')
}

filters.jobListingSalaryFull = function (job) {
  const raw = pickRawSalary(job)
  if (!raw) {
    return ''
  }
  return appendPayScaleToSalaryLine(raw, job)
}

filters.jobListingSalary = function (job) {
  const full = filters.jobListingSalaryFull(job)
  return shortenSalaryForListing(full)
}

filters.jobListingSalaryLabel = function (job) {
  const text = filters.jobListingSalaryFull(job)
  const raw = pickRawSalary(job)
  if (job.salaryLabel) {
    return job.salaryLabel
  }
  if (/per hour/i.test(text)) {
    return 'Salary'
  }
  if (/\(Actual\)/i.test(text)) {
    return 'Salary'
  }
  if (isSimpleSalaryRange(raw) || isSimpleSalaryRange(text)) {
    return 'Salary'
  }
  return 'Full time equivalent salary'
}

filters.jobListingPayScale = function (job) {
  if (salaryIncludedPayScale(filters.jobListingSalaryFull(job), job)) {
    return ''
  }
  return listingScaleForJob(job)
}

exports.filters = filters
