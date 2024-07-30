
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
      value: 'I’m on track to or have requested QTS',
      text: 'I’m on track to or have requested QTS',
      checked: profile.qts && profile.qts.includes('I’m on track to or have requested QTS')
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
      res.redirect('/profile/teaching-status/trn_optional')
    }
    else if( profile.qts == "I’m on track to or have requested QTS" ){
      res.redirect('/profile/teaching-status/trn_optional')
    }else if( profile.qts == "I'm  not looking for a teaching job" ){
      res.redirect('/profile/teaching-status/review')
    }else{
      res.redirect('/profile/teaching-status/trn')
    }

  }) 

  //TRN details

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

    if( addressData == ""){

      //create errorList array
      let errorList = []

      //if answer is blank, create an error message
      errorList.push({
        href: '#profile-provideAddress',
        text: 'You must enter your Teacher reference number to continue'
      })

      res.render('profile/teaching-status/trn', {
        user: req.session.user,
        errorList,
      })

    }else{
      res.redirect('/profile/teaching-status/review')
    }

  })

  //// // REVIEW:

  router.get('/profile/teaching-status/review', (req, res) => {
    let profile = req.session.user.profile

    res.render('profile/teaching-status/review', {
      profile
    })
  })


}
