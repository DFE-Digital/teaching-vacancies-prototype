module.exports = router => {

  router.get('/profile/about/key-stages', (req, res) => {
    let profile = req.session.user.profile
    res.render('profile/about/key-stages', {
      profile
    })
  })

  router.post('/profile/about/key-stages', (req, res) => {
    req.session.user.profile.hasExperienceWithKeyStages = req.body.profile.hasExperienceWithKeyStages
    req.session.user.profile.experiencedKeyStages = req.body.profile.experiencedKeyStages
    res.redirect('/profile/about/subjects')
  })

  router.get('/profile/about/subjects', (req, res) => {
    let profile = req.session.user.profile
    res.render('profile/about/subjects', {
      profile
    })
  })

  router.post('/profile/about/subjects', (req, res) => {
    req.session.user.profile.hasExperienceWithSubjects = req.body.profile.hasExperienceWithSubjects
    req.session.user.profile.experiencedSubjects = req.body.profile.experiencedSubjects
    res.redirect('/profile/about/about')
  })

  router.get('/profile/about/about', (req, res) => {
    let profile = req.session.user.profile
    res.render('profile/about/about', {
      profile
    })
  })

  router.post('/profile/about/about', (req, res) => {
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