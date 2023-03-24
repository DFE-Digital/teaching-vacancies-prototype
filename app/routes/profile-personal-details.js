
module.exports = router => {

  router.get('/profile/personal-details/name', (req, res) => {
    let firstName = req.session.user.profile.firstName
    let lastName = req.session.user.profile.lastName

    res.render('profile/personal-details/name', {
      firstName,
      lastName
    })
  })

  router.post('/profile/personal-details/name', (req, res) => {
    req.session.user.profile.firstName = req.body.profile.firstName
    req.session.user.profile.lastName = req.body.profile.lastName
    res.redirect('/profile/personal-details/phone-number')
  })

  router.get('/profile/personal-details/phone-number', (req, res) => {
    let phoneNumber = req.session.user.profile.phoneNumber

    let options = [{
      value: 'Yes',
      text: 'Yes',
      checked: req.session.user.profile.providePhoneNumber == 'Yes'
    }, {
      value: 'No',
      text: 'No',
      checked: req.session.user.profile.providePhoneNumber == 'No'
    }]

    res.render('profile/personal-details/phone-number', {
      options,
      phoneNumber
    })
  })

  router.post('/profile/personal-details/phone-number', (req, res) => {
    req.session.user.profile.providePhoneNumber = req.body.profile.providePhoneNumber
    req.session.user.profile.phoneNumber = req.body.profile.phoneNumber
    res.redirect('/profile/personal-details/review')
  })

  //right to work

  router.get('/profile/personal-details/work', (req, res) => {
    let work = req.session.user.profile.work

    let options = [{
      value: 'Yes',
      text: 'Yes',
      checked: req.session.user.profile.provideWork == 'Yes'
    }, {
      value: 'No',
      text: 'No',
      checked: req.session.user.profile.provideWork == 'No'
    }]

    res.render('profile/personal-details/work', {
      options,
      work
    })
  })

  router.post('/profile/personal-details/work', (req, res) => {
    req.session.user.profile.provideWork = req.body.profile.provideWork
    res.redirect('/profile/personal-details/review')
  })

  router.get('/profile/personal-details/review', (req, res) => {
    const profile = req.session.user.profile

    res.render('profile/personal-details/review', {
      profile
    })
  })

}