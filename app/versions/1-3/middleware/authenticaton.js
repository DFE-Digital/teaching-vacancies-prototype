function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    const query = req.url && req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''
    res.redirect(`/account/sign-in?returnUrl=${encodeURIComponent(req.path + query)}`)
  }
}

exports.isAuthenticated = isAuthenticated