module.exports = router => {

  router.get('/profile/about', (req, res) => {
    let profile = req.session.user.profile
    res.render('profile/about/index', {
      profile
    })
  })

  router.post('/profile/about', (req, res) => {
    req.session.user.profile.about = req.body.profile.about
    res.redirect('/profile/about/review')
  })

  router.get('/profile/about/review', (req, res) => {
    let profile = req.session.user.profile
    res.render('profile/about/review', {
      profile
    })
  })

}