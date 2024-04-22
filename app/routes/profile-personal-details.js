
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
    res.redirect('/profile/personal-details/phone-number_static/')
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

  router.post('/profile/personal-details/phone-number_static', (req, res) => {
    req.session.user.profile.providePhoneNumber = req.body.profile.providePhoneNumber
    req.session.user.profile.phoneNumber = req.body.profile.phoneNumber
    res.redirect('/profile/personal-details/work/')
  })

  router.get('/profile/personal-details/phone-number_static', (req, res) => {
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

    res.render('profile/personal-details/phone-number_static', {
      options,
      phoneNumber
    })
  })

  router.post('/profile/personal-details/phone-number', (req, res) => {
    req.session.user.profile.providePhoneNumber = req.body.profile.providePhoneNumber
    req.session.user.profile.phoneNumber = req.body.profile.phoneNumber
    res.redirect('/profile/personal-details/work/')
  })


  //right to work

  router.get('/profile/personal-details/work', (req, res) => {
    let work = req.session.user.profile.work

    let options = [{
      value: 'No',
      text: 'No, I already have the right to work in the UK',
      checked: req.session.user.profile.provideAddress == 'No'
    },{
      value: 'Yes',
      text: 'Yes, I will need to apply for a visa giving me the right to work in the UK',
      checked: req.session.user.profile.provideAddress == 'Yes'
    }]

    res.render('profile/personal-details/work', {
      options
    })
  })


  router.post('/profile/personal-details/work', (req, res) => {
    req.session.user.profile.provideWork = req.body.profile.provideWork
    res.redirect('/profile/personal-details/address/')
  })


  //address
  router.get('/profile/personal-details/address', (req, res) => {

      var addressData = req.session.data['profile-provideAddress']

      if(addressData){
        let provideAddress = req.session.data['profile-provideAddress']
      }else{

      }
      
      let options = [{
        value: 'Yes',
        text: 'Yes',
        checked: req.session.data['profile-provideAddress'] == 'Yes'
      }, {
        value: 'No',
        text: 'No',
        checked: req.session.data['profile-provideAddress'] == 'No'
      }]
      res.render('profile/personal-details/address', {
        options
      })
  })


  router.post('/profile/personal-details/address', (req, res) => {

    // Make a variable and give it the value from 'how-many-balls'
    var addressAnswer = req.session.data['profile-provideAddress']

    // Check whether the variable matches a condition
    if (addressAnswer == "Yes"){
      // good
      req.session.user.profile.provideAddress = addressAnswer

      res.redirect('/profile/personal-details/address-details')

    } else if (addressAnswer == "No"){
      
      req.session.user.profile.provideAddress = addressAnswer

      res.redirect('/profile/personal-details/ni')

    }else {
      // bad

      //create errorList array
      let errorList = []

      //generate options for page (only needed if errors)
      let options = [{
        value: 'Yes',
        text: 'Yes',
        checked: req.session.user.profile.provideAddress == 'Yes'
      }, {
        value: 'No',
        text: 'No',
        checked: req.session.user.profile.provideAddress == 'No'
      }]

      //if answer is blank, create an error message
      errorList.push({
        href: '#profile-provideAddress',
        text: 'Select yes if you want to provide an address'
      })

      res.render('profile/personal-details/address', {
        user: req.session.user,
        errorList,
        options
      })

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
