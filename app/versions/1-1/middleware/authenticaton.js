function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.redirect(`/account/sign-in?returnUrl=${req.path}`)
  }
}

exports.isAuthenticated = isAuthenticated