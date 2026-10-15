const APPLICATION_STATUS_BADGES = {
  Draft: 'moj-badge--pink',
  Submitted: 'moj-badge--blue',
  Shortlisted: 'moj-badge--yellow',
  Interviewing: 'moj-badge--purple',
  Offered: 'moj-badge--green'
}

function withMetadataBadges (notification) {
  if (!notification || !notification.detail || !Array.isArray(notification.detail.metadata)) {
    return notification
  }

  const metadata = notification.detail.metadata.map(row => {
    if (row.mojBadge) return row

    if (row.key === 'Application status' && APPLICATION_STATUS_BADGES[row.value]) {
      return Object.assign({}, row, { mojBadge: APPLICATION_STATUS_BADGES[row.value] })
    }

    if (row.key === 'Action required') {
      return Object.assign({}, row, { mojBadge: 'moj-badge--red' })
    }

    return row
  })

  return Object.assign({}, notification, {
    detail: Object.assign({}, notification.detail, { metadata })
  })
}

module.exports = {
  withMetadataBadges,
  APPLICATION_STATUS_BADGES
}
