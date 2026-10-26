const MAX_LISTING_SALARY_LENGTH = 160

function normalizeCurrencyText (text) {
  return String(text || '').replace(/\u00a3/g, '£').trim()
}

function isSimpleSalaryRange (text) {
  const normalized = normalizeCurrencyText(text)
  return /^£[\d,\.\s\-£]+$/.test(normalized)
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

function pickRawSalary (job) {
  const actual = normalizeCurrencyText(job.actualSalaryDetails)
  const fte = normalizeCurrencyText(job.fullTimeEquivalentSalaryDetails)
  const payScale = normalizeCurrencyText(job.payScaleDetails)
  const band = joinSalaryDetails(job)

  if (actual) {
    if (/per hour/i.test(actual) || /\(Actual\)/i.test(actual)) {
      return actual
    }
    if (isPartTime(job) && fte) {
      return actual
    }
  }

  if (fte) {
    return fte
  }
  if (actual) {
    return actual
  }
  if (payScale) {
    return payScale
  }
  if (band) {
    return band
  }
  return ''
}

function appendPayScaleToSalaryLine (text, job) {
  const scale = joinSalaryDetails(job)
  const normalized = normalizeCurrencyText(text)
  if (!scale || !normalized) {
    return normalized
  }
  if (normalized.indexOf(scale) !== -1) {
    return normalized
  }
  if (/MPS\/UPS/i.test(scale) && /MPS\/UPS/i.test(normalized)) {
    return normalized
  }
  if (isSimpleSalaryRange(normalized)) {
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
  const scale = joinSalaryDetails(job)
  if (!scale || !listingText) {
    return false
  }
  if (listingText.indexOf(scale) !== -1) {
    return true
  }
  return /MPS\/UPS/i.test(scale) && /MPS\/UPS/i.test(listingText)
}

const filters = {}

filters.jobListingAddress = function (job) {
  if (!job || !job.organisation) {
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
  if (phase) {
    bits.push(phase)
  } else if (org.ageGroup) {
    bits.push('ages ' + org.ageGroup)
  }
  return bits.join(', ')
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
  return joinSalaryDetails(job)
}

exports.filters = filters
