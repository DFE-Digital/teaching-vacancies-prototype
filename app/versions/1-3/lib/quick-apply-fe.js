const SECTIONS = [
  { id: 'personal-details', text: 'Personal details' },
  { id: 'professional-status', text: 'Professional status' },
  { id: 'qualifications', text: 'Qualifications' },
  { id: 'training', text: 'Training and continuing professional development (CPD)' },
  { id: 'memberships', text: 'Professional body memberships' },
  { id: 'work-history', text: 'Work history' },
  { id: 'personal-statement', text: 'Personal statement' },
  { id: 'references', text: 'References' },
  { id: 'equal-opportunities', text: 'Equal opportunities and recruitment monitoring' },
  { id: 'support', text: 'Do you need support or adjustments for your interview?' },
  { id: 'declarations', text: 'Declarations' }
]

function isFurtherEducationJob (job) {
  if (!job) return false
  const phase = job.phase || (job.organisation && job.organisation.phase) || ''
  if (phase === 'Further education') return true
  const orgType = job.organisation && job.organisation.type
  return orgType === 'College'
}

function showAdditionalAllowancesOnJobListing (job) {
  if (!job || isFurtherEducationJob(job)) return false
  return job.hasAdditionalAllowances === 'Yes' && Boolean(job.additionalAllowances)
}

function displaySectionStatus (status) {
  if (status === 'Imported' || status === 'Needs review') return 'Needs review'
  return status
}

function validateApplicationForSubmit (application, jobId) {
  const errors = []
  SECTIONS.forEach((section) => {
    const status = application.statuses[section.id]
    if (status !== 'Completed') {
      errors.push({
        text: `Complete ${section.text}`,
        href: `/jobs/${jobId}/apply/${section.id}`
      })
    }
  })
  if (!application.declarations.safeguarding) {
    errors.push({
      text: 'Select an answer for the safeguarding declaration',
      href: `/jobs/${jobId}/apply/declarations`
    })
  }
  if (!application.declarations.relationship) {
    errors.push({
      text: 'Select an answer for the relationship with the organisation question',
      href: `/jobs/${jobId}/apply/declarations`
    })
  }
  return errors
}

function canSubmitApplication (application) {
  return validateApplicationForSubmit(application, '0').length === 0
}

module.exports = {
  SECTIONS,
  isFurtherEducationJob,
  showAdditionalAllowancesOnJobListing,
  displaySectionStatus,
  validateApplicationForSubmit,
  canSubmitApplication
}
