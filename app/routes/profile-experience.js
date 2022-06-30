module.exports = router => {

  router.get('/profile/experience/experience', (req, res) => {
    let profile = req.session.user.profile
    res.render('profile/experience/experience', {
      profile
    })
  })

  router.post('/profile/experience/experience', (req, res) => {
    req.session.user.profile.experience = req.body.profile.experience
    res.redirect('/profile/experience/provide-send')
  })

  router.get('/profile/experience/provide-send', (req, res) => {
    let profile = req.session.user.profile

    let options = [{
      value: "Yes",
      text: "Yes",
      checked: profile.provideSENDExperience == 'Yes'
    },
    {
      value: "No",
      text: "No",
      checked: profile.provideSENDExperience == 'No'
    }]

    res.render('profile/experience/provide-send', {
      options
    })
  })

  router.post('/profile/experience/provide-send', (req, res) => {
    req.session.user.profile.provideSENDExperience = req.body.profile.provideSENDExperience

    if(req.session.user.profile.provideSENDExperience == 'Yes') {
      res.redirect('/profile/experience/send-experience')
    } else {
      res.redirect('/profile/experience/review')
    }
  })

  router.get('/profile/experience/send-experience', (req, res) => {
    let profile = req.session.user.profile

    res.render('profile/experience/send-experience', {
      profile
    })
  })

  router.post('/profile/experience/send-experience', (req, res) => {
    req.session.user.profile.SENDExperience = req.body.profile.SENDExperience
    res.redirect('/profile/experience/review')
  })

  router.get('/profile/experience/review', (req, res) => {
    let profile = req.session.user.profile
    res.render('profile/experience/review', {
      profile
    })
  })

}