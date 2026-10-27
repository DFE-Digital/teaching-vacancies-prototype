function applyNotificationPrototypeState (req) {
  if (req.query.notificationState === 'empty') {
    req.session.data.notificationState = 'empty'
  } else if (req.query.notificationState === 'populated') {
    req.session.data.notificationState = 'populated'
  }
}

function isNotificationsInboxEmpty (req) {
  return req.session.data.notificationState !== 'populated'
}

module.exports = {
  applyNotificationPrototypeState,
  isNotificationsInboxEmpty
}
