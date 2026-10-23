function tagClassForStatus (status) {
  return {
    Draft: 'govuk-tag--orange',
    Shortlisted: 'govuk-tag--green',
    Submitted: 'govuk-tag--green',
    Offered: 'govuk-tag--green',
    Rejected: 'govuk-tag--red',
    Interviewing: 'govuk-tag--orange'
  }[status] || ''
}

module.exports = {
  tagClassForStatus
}
