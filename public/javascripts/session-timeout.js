// Signs the user out after a period of inactivity (signed-in pages only).
// Activity = mouse, keyboard, touch or scroll. While the user is active the server session is refreshed,
// so reading a long page does not count as being idle.
(function () {
  'use strict'

  var script = document.currentScript
  var timeoutMs = script ? parseInt(script.getAttribute('data-timeout-ms'), 10) : 0
  if (!timeoutMs) return

  var match = window.location.pathname.match(/^\/(1-\d)(?=\/|$)/)
  var prefix = match ? '/' + match[1] : ''

  var lastActivity = Date.now()
  var lastPing = Date.now()
  var pingEvery = Math.min(5 * 60 * 1000, Math.max(1000, timeoutMs / 3))
  var expiring = false

  function expire () {
    if (expiring) return
    expiring = true
    window.location.href = prefix + '/session-timeout'
  }

  function onActivity () {
    var now = Date.now()
    if (now - lastActivity > timeoutMs) return expire()
    lastActivity = now
    if (now - lastPing > pingEvery) {
      lastPing = now
      fetch(prefix + '/session-keepalive', { method: 'POST', credentials: 'same-origin' })
        .then(function (response) { if (response.status === 401) expire() })
        .catch(function () {})
    }
  }

  ;['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll', 'click'].forEach(function (name) {
    window.addEventListener(name, onActivity, { passive: true })
  })

  // Interval (rather than one long timeout) so the check still fires after the device has been asleep.
  window.setInterval(function () {
    if (Date.now() - lastActivity > timeoutMs) expire()
  }, Math.min(5000, Math.max(500, timeoutMs / 10)))
})()
