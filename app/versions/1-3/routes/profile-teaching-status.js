module.exports = router => {

  // QTS STUFF

  router.get('/profile/teaching-status/qts', (req, res) => {
    let profile = req.session.user.profile

    res.render('profile/teaching-status/qts', {
      profile
    })
  })

  router.post('/profile/teaching-status/qts', (req, res) => {
    let profile = req.session.user.profile
    profile.qts = req.body.profile.qts
    profile.ect = req.body.profile.ect
    profile.qtsAwardedYear = req.body.profile.qtsAwardedYear
    profile.skillsAndExperience = req.body.profile.skillsAndExperience
    profile.whatSchoolOffers = req.body.profile.whatSchoolOffers
    profile.addFurtherDetailsAboutRole = req.body.profile.addFurtherDetailsAboutRole

    if (profile.qts == 'Yes, QTS is required') {
      res.redirect('/profile/teaching-status/trn')
    } else {
      res.redirect('/profile/teaching-status/trn_optional')
    }
  })

  // TRN details

  router.get('/profile/teaching-status/trn_optional', (req, res) => {
    let trnNumber = req.session.user.profile.TRN

    res.render('profile/teaching-status/trn_optional', {
      trnNumber
    })
  })

  router.get('/profile/teaching-status/trn', (req, res) => {
    let trnNumber = req.session.user.profile.TRN

    res.render('profile/teaching-status/trn', {
      trnNumber
    })
  })

  router.post('/profile/teaching-status/trn', (req, res) => {
    req.session.user.profile.TRN = req.body.profile.TRN

    var addressData = req.body.profile.TRN

    if (addressData == "") {
      // create errorList array
      let errorList = []

      // if answer is blank, create an error message
      errorList.push({
        href: '#profile-provideAddress',
        text: 'You must enter your Teacher reference number to continue'
      })

      res.render('profile/teaching-status/trn', {
        user: req.session.user,
        errorList,
      })

    } else {
      res.redirect('/profile/teaching-status/review')
    }
  })

  //// REVIEW:

  router.get('/profile/teaching-status/review', (req, res) => {
    let profile = req.session.user.profile

    res.render('profile/teaching-status/review', {
      profile
    })
  })
}
