// Signed-in session timeout: after SESSION_TIMEOUT_MINUTES of inactivity the user is signed out
// and sent to the home page, which shows an "Your session expired" warning banner.
//
// Override for testing: SESSION_TIMEOUT_MINUTES=0.2 npm start   (0.2 = 12 seconds)

const DEFAULT_TIMEOUT_MINUTES = 30

function timeoutMs () {
  const minutes = parseFloat(process.env.SESSION_TIMEOUT_MINUTES)
  return (Number.isFinite(minutes) && minutes > 0 ? minutes : DEFAULT_TIMEOUT_MINUTES) * 60 * 1000
}

function isSignedIn (req) {
  return !!(req.session && req.session.data && req.session.data.signedIn === true)
}

function signOut (req, res) {
  req.session.user = null
  if (res) res.locals.user = null
  req.session.data.signedIn = false
  delete req.session.lastActivityAt
}

function expireSession (req, res) {
  signOut(req, res)
  req.session.sessionExpiredNotice = true
}

module.exports = function sessionTimeout (router) {
  const limit = timeoutMs()

  router.use((req, res, next) => {
    res.locals.sessionTimeoutMs = limit

    // Show the "session expired" banner once, on the page the user lands on after expiry.
    if (req.session.sessionExpiredNotice && req.method === 'GET') {
      res.locals.sessionExpired = true
      delete req.session.sessionExpiredNotice
    }

    next()
  })

  // Called by the browser timer when the user has been idle for the full period.
  router.get('/session-timeout', (req, res) => {
    if (isSignedIn(req)) expireSession(req, res)
    res.redirect('/home')
  })

  // Called by the browser while the user is active on a page (no navigation), to keep the session alive.
  router.post('/session-keepalive', (req, res) => {
    if (!isSignedIn(req)) return res.status(401).json({ expired: true })
    const last = req.session.lastActivityAt
    if (last && Date.now() - last > limit) {
      expireSession(req, res)
      return res.status(401).json({ expired: true })
    }
    req.session.lastActivityAt = Date.now()
    return res.json({ expired: false })
  })

  // Every other request from a signed-in user counts as activity, unless they have been idle too long.
  router.use((req, res, next) => {
    if (!isSignedIn(req)) {
      if (req.session.lastActivityAt) delete req.session.lastActivityAt
      return next()
    }

    const now = Date.now()
    const last = req.session.lastActivityAt

    if (last && now - last > limit) {
      expireSession(req, res)
      return res.redirect('/home')
    }

    req.session.lastActivityAt = now
    return next()
  })
}
