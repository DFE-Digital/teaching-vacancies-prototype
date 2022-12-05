
module.exports = router => {

  //disability

  router.get('/profile/equal-opportunities/disability', (req, res) => {
    let disability = req.session.user.profile.disability

    let options = [{
      value: 'Yes',
      text: 'Yes',
      checked: req.session.user.profile.disability == 'Yes'
    }, {
      value: 'No',
      text: 'No',
      checked: req.session.user.profile.disability == 'No'
    },
    {
      value: 'Prefer not to say',
      text: 'Prefer not to say',
      checked: req.session.user.profile.disability == 'Prefer not to say'
    }
  ]

    res.render('profile/equal-opportunities/disability', {
      options,
      disability
    })
  })

  router.post('/profile/equal-opportunities/disability', (req, res) => {
    req.session.user.profile.disability = req.body.profile.disability
    res.redirect('/profile/equal-opportunities/age')
  })


  //age

  router.get('/profile/equal-opportunities/age', (req, res) => {
    let age = req.session.user.profile.age

    let options = [{
      value: 'Under 25',
      text: 'Under 25',
      checked: req.session.user.profile.age == 'Under 25'
    },{
      value: '25 to 29',
      text: '25 to 29',
      checked: req.session.user.profile.age == '25 to 29'
    },{
      value: '30 to 39',
      text: '30 to 39',
      checked: req.session.user.profile.age == '30 to 39'
    },{
      value: '40 to 49',
      text: '40 to 49',
      checked: req.session.user.profile.age == '40 to 49'
    },
    {
      value: '50 to 59',
      text: '50 to 59',
      checked: req.session.user.profile.age == '50 to 59'
    },
    {
      value: '60 and over',
      text: '60 and over',
      checked: req.session.user.profile.age == '60 and over'
    },
    {
      value: 'Prefer not to say',
      text: 'Prefer not to say',
      checked: req.session.user.profile.age == 'Prefer not to say'
    }
  ]

    res.render('profile/equal-opportunities/age', {
      options,
      age
    })
  })

  router.post('/profile/equal-opportunities/age', (req, res) => {
    req.session.user.profile.age = req.body.profile.age
    res.redirect('/profile/equal-opportunities/gender')
  })




  //gender

  router.get('/profile/equal-opportunities/gender', (req, res) => {
    let gender = req.session.user.profile.gender

    let options = [{
      value: 'Man',
      text: 'Man',
      checked: req.session.user.profile.gender == 'Man'
    },{
      value: 'Woman',
      text: 'Woman',
      checked: req.session.user.profile.gender == 'Woman'
    },{
      value: 'Other gender identity',
      text: 'Other gender identity',
      checked: req.session.user.profile.gender == 'Other gender identity'
    },
    {
      value: 'Prefer not to say',
      text: 'Prefer not to say',
      checked: req.session.user.profile.gender == 'Prefer not to say'
    }
  ]

    res.render('profile/equal-opportunities/gender', {
      options,
      gender
    })
  })

  router.post('/profile/equal-opportunities/gender', (req, res) => {
    req.session.user.profile.gender = req.body.profile.gender
    res.redirect('/profile/equal-opportunities/orientation')
  })





  //orientation

  router.get('/profile/equal-opportunities/orientation', (req, res) => {
    let orientation = req.session.user.profile.orientation

    let options = [{
      value: 'Bisexual',
      text: 'Bisexual',
      checked: req.session.user.profile.orientation == 'Bisexual'
    },{
      value: 'Gay or lesbian',
      text: 'Gay or lesbian',
      checked: req.session.user.profile.orientation == 'Gay or lesbian'
    },{
      value: 'Straight or heterosexual',
      text: 'Straight or heterosexual',
      checked: req.session.user.profile.orientation == 'Straight or heterosexual'
    },
    {
      value: 'Other sexual orientation',
      text: 'Other sexual orientation',
      checked: req.session.user.profile.orientation == 'Other sexual orientation'
    },
    {
      value: 'Prefer not to say',
      text: 'Prefer not to say',
      checked: req.session.user.profile.orientation == 'Prefer not to say'
    }
  ]

    res.render('profile/equal-opportunities/orientation', {
      options,
      orientation
    })
  })

  router.post('/profile/equal-opportunities/orientation', (req, res) => {
    req.session.user.profile.orientation = req.body.profile.orientation
    res.redirect('/profile/equal-opportunities/ethnic-group')
  })






  //ethnic group

  router.get('/profile/equal-opportunities/ethnic-group', (req, res) => {
    let ethnicGroup = req.session.user.profile.ethnicGroup

    let options = [{
      value: 'Asian or Asian British',
      text: 'Asian or Asian British',
      hint: 'Includes Indian, Pakistani, Bangladeshi or Chinese',
      checked: req.session.user.profile.ethnicGroup == 'Asian or Asian British'
    },{
      value: 'Black African, Caribbean or Black British',
      text: 'Black African, Caribbean or Black British',
      checked: req.session.user.profile.ethnicGroup == 'Black African, Caribbean or Black British'
    },{
      value: 'Mixed or multiple ethnic group',
      text: 'Mixed or multiple ethnic group',
      hint: 'Includes White and Black Caribbean, White and Black African or White and Asian',
      checked: req.session.user.profile.ethnicGroup == 'Mixed or multiple ethnic group'
    },
    {
      value: 'White',
      text: 'White',
      hint: 'Includes English, Welsh, Scottish, Northern Irish, British, Irish Gypsy or Irish Traveller',
      checked: req.session.user.profile.ethnicGroup == 'White'
    },
    {
      value: 'Other ethnic group',
      text: 'Other ethnic group',
      checked: req.session.user.profile.ethnicGroup == 'Other ethnic group'
    },
    {
      value: 'Prefer not to say',
      text: 'Prefer not to say',
      checked: req.session.user.profile.ethnicGroup == 'Prefer not to say'
    }
    ]

    res.render('profile/equal-opportunities/ethnic-group', {
      options,
      ethnicGroup
    })
  })

  router.post('/profile/equal-opportunities/ethnic-group', (req, res) => {
    req.session.user.profile.ethnicGroup = req.body.profile.ethnicGroup
    res.redirect('/profile/equal-opportunities/religion')
  })





  //religion


  router.get('/profile/equal-opportunities/religion', (req, res) => {
    let religion = req.session.user.profile.religion

    let options = [{
      value: 'Buddhist',
      text: 'Buddhist',
      checked: req.session.user.profile.religion == 'Buddhist'
    },{
      value: 'Christian',
      text: 'Christian',
      checked: req.session.user.profile.religion == 'Christian'
    },{
      value: 'Hindu',
      text: 'Hindu',
      checked: req.session.user.profile.religion == 'Hindu'
    },
    {
      value: 'Jewish',
      text: 'Jewish',
      checked: req.session.user.profile.religion == 'Jewish'
    },
    {
      value: 'Muslim',
      text: 'Muslim',
      checked: req.session.user.profile.religion == 'Muslim'
    },
    {
      value: 'Sikh',
      text: 'Sikh',
      checked: req.session.user.profile.religion == 'Sikh'
    },
    {
      value: 'No religion, atheist or agnostic',
      text: 'No religion, atheist or agnostic',
      checked: req.session.user.profile.religion == 'No religion, atheist or agnostic'
    },
    {
      value: 'Other religion or belief',
      text: 'Other religion or belief',
      checked: req.session.user.profile.religion == 'Other religion or belief'
    },
    {
      value: 'Prefer not to say',
      text: 'Prefer not to say',
      checked: req.session.user.profile.religion == 'Prefer not to say'
    }
    ]

    res.render('profile/equal-opportunities/religion', {
      options,
      religion
    })
  })

  router.post('/profile/equal-opportunities/religion', (req, res) => {
    req.session.user.profile.religion = req.body.profile.religion
    res.redirect('/profile/equal-opportunities/review')
  })

  //review equality

  router.get('/profile/equality-opportunities/review', (req, res) => {
    const profile = req.session.user.profile

    res.render('profile/equality-opportunities/review', {
      profile
    })
  })


}
