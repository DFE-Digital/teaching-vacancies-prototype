
exports.signIn = (req, res) => {
  // if already authenticated just go home
  if (req.session.passport) {
    res.redirect('/jobs')
  } else {
    const flash = req.flash()
    res.render('../views/auth/index', {
      flash
    })
  }
}

exports.signOut = (req, res) => {
  delete req.session.data
  delete req.session.passport
  req.flash('success', 'Signed out')
  res.redirect('/sign-in')
}
