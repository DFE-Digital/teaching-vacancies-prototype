const { tagClassForStatus } = require('./application-status-tags')

function withMetadataBadges (notification) {
  if (!notification || !notification.detail || !Array.isArray(notification.detail.metadata)) {
    return notification
  }

  const metadata = notification.detail.metadata.map(row => {
    if (row.tagClass) return row

    if (row.key === 'Application status') {
      const tagClass = tagClassForStatus(row.value)
      if (tagClass) {
        return Object.assign({}, row, { tagClass })
      }
    }

    if (row.key === 'Action required') {
      return Object.assign({}, row, { tagClass: 'govuk-tag--red' })
    }

    return row
  })

  return Object.assign({}, notification, {
    detail: Object.assign({}, notification.detail, { metadata })
  })
}

module.exports = {
  withMetadataBadges
}
