
module.exports = router => {

  //name

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

  //phone number

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
    res.redirect('/profile/personal-details/address')
  })

  //address

  router.get('/profile/personal-details/address', (req, res) => {
    let provideAddress = req.session.user.profile.provideAddress

    let options = [{
      value: 'Yes',
      text: 'Yes',
      checked: req.session.user.profile.provideAddress == 'Yes'
    }, {
      value: 'No',
      text: 'No',
      checked: req.session.user.profile.provideAddress == 'No'
    }]

    res.render('profile/personal-details/address', {
      provideAddress,
      options
    })
  })

  router.post('/profile/personal-details/address', (req, res) => {
    req.session.user.profile.provideAddress = req.body.profile.provideAddress
    let addressChoice = req.session.user.profile.provideAddress

    if(addressChoice == 'Yes'){
      res.redirect('/profile/personal-details/address-details')
    }else{
      res.redirect('/profile/personal-details/ni')
    }

  })

  //address Details

  router.get('/profile/personal-details/address-details', (req, res) => {
    let profile = req.session.user.profile
    let address1 = profile.address1
    let address2 = profile.address2
    let addressTown = profile.addressTown
    let addressCounty = profile.addressCounty
    let addressPostcode = profile.addressPostcode

    res.render('profile/personal-details/address-details', {
      address1,
      address2,
      addressTown,
      addressCounty,
      addressPostcode,
    })
  })

  router.post('/profile/personal-details/address-details', (req, res) => {
    req.session.user.profile.address1 = req.body.profile.address1
    req.session.user.profile.address2 = req.body.profile.address2
    req.session.user.profile.addressTown = req.body.profile.addressTown
    req.session.user.profile.addressCounty = req.body.profile.addressCounty
    req.session.user.profile.addressPostcode = req.body.profile.addressPostcode
    res.redirect('/profile/personal-details/ni')
  })

  //Nationsal insurance number NI

  router.get('/profile/personal-details/ni', (req, res) => {
    let niNumber = req.session.user.profile.NI

    let options = [{
      value: 'Yes',
      text: 'Yes',
      checked: req.session.user.profile.provideNI == 'Yes'
    }, {
      value: 'No',
      text: 'No',
      checked: req.session.user.profile.provideNI == 'No'
    }]

    res.render('profile/personal-details/ni', {
      options,
      niNumber
    })
  })

  router.post('/profile/personal-details/ni', (req, res) => {
    req.session.user.profile.provideNI = req.body.profile.provideNI
    req.session.user.profile.NI = req.body.profile.NI
    res.redirect('/profile/personal-details/review')
  })

  //review personal details

  router.get('/profile/personal-details/review', (req, res) => {
    const profile = req.session.user.profile

    res.render('profile/personal-details/review', {
      profile
    })
  })


}
