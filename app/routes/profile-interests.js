
module.exports = router => {

  router.get('/profile/interests', (req, res) => {
    let profile = req.session.user.profile
    res.render('profile/interests/index', {
      profile
    })
  })

  router.post('/profile/interests', (req, res) => {
    req.session.user.profile.interests = req.body.profile.interests
    res.redirect('/profile/interests/review')
  })

  router.get('/profile/interests/review', (req, res) => {
    let profile = req.session.user.profile

    res.render('profile/interests/review', {
      profile
    })
  })



}