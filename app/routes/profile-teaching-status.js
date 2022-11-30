
module.exports = router => {

  //QTS STUFF

  router.get('/profile/teaching-status/qts', (req, res) => {
    let profile = req.session.user.profile

    let options = [{
      value: 'Yes',
      text: 'Yes',
      checked: profile.qts && profile.qts.includes('Yes')
    }, {
      value: 'No',
      text: 'No',
      checked: profile.qts && profile.qts.includes('No')
    }, {
      value: 'I’m on track to receive QTS',
      text: 'I’m on track to receive QTS',
      checked: profile.qts && profile.qts.includes('I’m on track to receive QTS')
    }]

    let qtsAwardedYear = profile.qtsAwardedYear

    res.render('profile/teaching-status/qts', {
      options,
      qtsAwardedYear
    })
  })

  router.post('/profile/teaching-status/qts', (req, res) => {
    let profile = req.session.user.profile
    profile.qts = req.body.profile.qts
    profile.qtsAwardedYear = req.body.profile.qtsAwardedYear

    if( profile.qts == 'No' ){
      res.redirect('/profile/teaching-status/review')
    }else{
      res.redirect('/profile/teaching-status/trn')
    }

  })

  //TRN details

  router.get('/profile/teaching-status/trn', (req, res) => {
    let trnNumber = req.session.user.profile.TRN

    let options = [{
      value: 'Yes',
      text: 'Yes',
      checked: req.session.user.profile.provideTRN == 'Yes'
    }, {
      value: 'No',
      text: 'No',
      checked: req.session.user.profile.provideTRN == 'No'
    }]

    res.render('profile/teaching-status/trn', {
      options,
      trnNumber
    })
  })

  router.post('/profile/teaching-status/trn', (req, res) => {
    req.session.user.profile.provideTRN = req.body.profile.provideTRN
    req.session.user.profile.TRN = req.body.profile.TRN
    res.redirect('/profile/teaching-status/review')
  })

  //// // REVIEW:

  router.get('/profile/teaching-status/review', (req, res) => {
    let profile = req.session.user.profile

    res.render('profile/teaching-status/review', {
      profile
    })
  })


}
