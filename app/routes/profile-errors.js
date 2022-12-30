const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

module.exports = router => {

  //////////////////
  //PERSONAL DETAILS
  //////////////////

  router.get('/profile/personal-details/errors/name', (req, res) => {
    res.render('profile/personal-details/errors/name')
  })

  router.get('/profile/personal-details/errors/phone-number', (req, res) => {
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

    res.render('profile/personal-details/errors/phone-number', {
      options,
      phoneNumber
    })
  })

  //////////////////
  //JOB PREFERENCES
  //////////////////



  router.get('/profile/job-preferences/errors/roles', (req, res) => {
    let options = [{
      value: 'Teacher',
      text: 'Teacher',
      checked: req.session.user.profile.roles && req.session.user.profile.roles.includes('Teacher')
    }, {
      value: 'Headteacher, deputy or assistant headteacher',
      text: 'Headteacher, deputy or assistant headteacher',
      checked: req.session.user.profile.roles && req.session.user.profile.roles.includes('Headteacher, deputy or assistant headteacher')
    }, {
      value: 'Head of year, department, curriculum or phase',
      text: 'Head of year, department, curriculum or phase',
      checked: req.session.user.profile.roles && req.session.user.profile.roles.includes('Head of year, department, curriculum or phase')
    }, {
      value: 'Teaching assistant',
      text: 'Teaching assistant',
      checked: req.session.user.profile.roles && req.session.user.profile.roles.includes('Teaching assistant')
    }, {
      value: 'Learning support, cover supervisor or tutor',
      text: 'Learning support, cover supervisor or tutor',
      checked: req.session.user.profile.roles && req.session.user.profile.roles.includes('Learning support, cover supervisor or tutor')
    }, {
      value: 'SENDCo (special educational needs and disabilities coordinator)',
      text: 'SENDCo (special educational needs and disabilities coordinator)',
      checked: req.session.user.profile.roles && req.session.user.profile.roles.includes('SENDCo (special educational needs and disabilities coordinator)')
    }]

    res.render('profile/job-preferences/errors/roles', {
      options
    })
  })

  router.get('/profile/job-preferences/errors/education-phases', (req, res) => {
    let profile = req.session.user.profile

    let options = [{
      value: 'Primary',
      text: 'Primary',
      checked: profile.phases && profile.phases.includes('Primary')
    }, {
      value: 'Middle',
      text: 'Middle',
      checked: profile.phases && profile.phases.includes('Middle')
    }, {
      value: 'Secondary',
      text: 'Secondary',
      checked: profile.phases && profile.phases.includes('Secondary')
    }, {
      value: 'Sixth form or college',
      text: 'Sixth form or college',
      checked: profile.phases && profile.phases.includes('Sixth form or college')
    }]

    res.render('profile/job-preferences/errors/education-phases', {
      options
    })
  })

  router.get('/profile/job-preferences/errors/key-stages', (req, res) => {
    let profile = req.session.user.profile

    let options = [{
      value: 'Early years',
      text: 'Early years',
      checked: profile.keyStages && profile.keyStages.includes('Early years')
    }, {
      value: 'Key stage 1',
      text: 'Key stage 1',
      checked: profile.keyStages && profile.keyStages.includes('Key stage 1')
    }, {
      value: 'Key stage 2',
      text: 'Key stage 2',
      checked: profile.keyStages && profile.keyStages.includes('Key stage 2')
    }]

    res.render('profile/job-preferences/errors/key-stages', {
      options
    })
  })

  router.get('/profile/job-preferences/errors/subjects', (req, res) => {
    let profile = req.session.user.profile

    let options = [{
      value: "Accounting",
      text: "Accounting",
      hint: {
        text: 'Includes Finance and accounting'
      },
      checked: profile.subjects && profile.subjects.includes('Accounting')
    },
    {
      value: "Art and design",
      text: "Art and design",
      checked: profile.subjects && profile.subjects.includes('Art and design')
    },
    {
      value: "Biology",
      text: "Biology",
      checked: profile.subjects && profile.subjects.includes('Biology')
    },
    {
      value: "Business studies",
      text: "Business studies",
      checked: profile.subjects && profile.subjects.includes('Business studies')
    },
    {
      value: "Chemistry",
      text: "Chemistry",
      checked: profile.subjects && profile.subjects.includes('Chemistry')
    },
    {
      value: "Citizenship",
      text: "Citizenship",
      checked: profile.subjects && profile.subjects.includes('Citizenship')
    },
    {
      value: "Classics",
      text: "Classics",
      hint: {
        text: 'Includes Latin'
      },
      checked: profile.subjects && profile.subjects.includes('Classics')
    },
    {
      value: "Computing",
      text: "Computing",
      hint: {
        text: 'Includes Computer science, Information technology, and ICT'
      },
      checked: profile.subjects && profile.subjects.includes('Computing')
    },
    {
      value: "Dance",
      text: "Dance",
      checked: profile.subjects && profile.subjects.includes('Dance')
    },
    {
      value: "Design and technology",
      text: "Design and technology",
      hint: {
        text: 'Includes Product design, Textiles and Systems and control'
      },
      checked: profile.subjects && profile.subjects.includes('Design and technology')
    },
    {
      value: "Drama",
      text: "Drama",
      hint: {
        text: 'Includes Theatre studies and Performing arts'
      },
      checked: profile.subjects && profile.subjects.includes('Drama')
    },
    {
      value: "Economics",
      text: "Economics",
      checked: profile.subjects && profile.subjects.includes('Economics')
    },
    {
      value: "Engineering",
      text: "Engineering",
      checked: profile.subjects && profile.subjects.includes('Engineering')
    },
    {
      value: "English",
      text: "English",
      hint: {
        text: 'Includes English language and literature'
      },
      checked: profile.subjects && profile.subjects.includes('English')
    },
    {
      value: "Food Technology",
      text: "Food Technology",
      hint: {
        text: 'Includes Hospitality and catering'
      },
      checked: profile.subjects && profile.subjects.includes('Food Technology')
    },
    {
      value: "French",
      text: "French",
      checked: profile.subjects && profile.subjects.includes('French')
    },
    {
      value: "Geography",
      text: "Geography",
      checked: profile.subjects && profile.subjects.includes('Geography')
    },
    {
      value: "German",
      text: "German",
      checked: profile.subjects && profile.subjects.includes('German')
    },
    {
      value: "Health and social care",
      text: "Health and social care",
      checked: profile.subjects && profile.subjects.includes('Health and social care')
    },
    {
      value: "History",
      text: "History",
      checked: profile.subjects && profile.subjects.includes('History')
    },
    {
      value: "Humanities",
      text: "Humanities",
      checked: profile.subjects && profile.subjects.includes('Humanities')
    },
    {
      value: "ICT",
      text: "ICT",
      checked: profile.subjects && profile.subjects.includes('ICT')
    },
    {
      value: "Law",
      text: "Law",
      checked: profile.subjects && profile.subjects.includes('Law')
    },
    {
      value: "Mandarin",
      text: "Mandarin",
      checked: profile.subjects && profile.subjects.includes('Mandarin')
    },
    {
      value: "Mathematics",
      text: "Mathematics",
      checked: profile.subjects && profile.subjects.includes('Mathematics')
    },
    {
      value: "Media studies",
      text: "Media studies",
      checked: profile.subjects && profile.subjects.includes('Media studies')
    },
    {
      value: "Music",
      text: "Music",
      checked: profile.subjects && profile.subjects.includes('Music')
    },
    {
      value: "Philosophy",
      text: "Philosophy",
      checked: profile.subjects && profile.subjects.includes('Philosophy')
    },
    {
      value: "Physical education",
      text: "Physical education",
      checked: profile.subjects && profile.subjects.includes('Physical education')
    },
    {
      value: "Physics",
      text: "Physics",
      checked: profile.subjects && profile.subjects.includes('Physics')
    },
    {
      value: "Politics",
      text: "Politics",
      checked: profile.subjects && profile.subjects.includes('Politics')
    },
    {
      value: "Psychology",
      text: "Psychology",
      checked: profile.subjects && profile.subjects.includes('Psychology')
    },
    {
      value: "Religious education",
      text: "Religious education",
      hint: {
        text: 'Includes religious studies'
      },
      checked: profile.subjects && profile.subjects.includes('Religious education')
    },
    {
      value: "Relationships and sex education",
      text: "Relationships and sex education",
      checked: profile.subjects && profile.subjects.includes('Relationships and sex education')
    },
    {
      value: "Science",
      text: "Science",
      checked: profile.subjects && profile.subjects.includes('Science')
    },
    {
      value: "Social sciences",
      text: "Social sciences",
      checked: profile.subjects && profile.subjects.includes('Social sciences')
    },
    {
      value: "Sociology",
      text: "Sociology",
      checked: profile.subjects && profile.subjects.includes('Sociology')
    },
    {
      value: "Spanish",
      text: "Spanish",
      checked: profile.subjects && profile.subjects.includes('Spanish')
    },
    {
      value: "Statistics",
      text: "Statistics",
      checked: profile.subjects && profile.subjects.includes('Statistics')
    }]

    res.render('profile/job-preferences/errors/subjects', {
      options
    })
  })

  router.get('/profile/job-preferences/errors/working-patterns', (req, res) => {
    let profile = req.session.user.profile

    let options = [{
      value: 'Full time',
      text: 'Full time',
      checked: profile.workingPatterns && profile.workingPatterns.includes('Full time')
    }, {
      value: 'Part time',
      text: 'Part time',
      checked: profile.workingPatterns && profile.workingPatterns.includes('Part time')
    }]

    res.render('profile/job-preferences/errors/working-patterns', {
      options
    })
  })

  router.get('/profile/job-preferences/errors/location', (req, res) => {
    let location = _.get(req, 'session.data.profile.location')

    let searchRadiusOptions = [
      {
        value: "This area only",
        text: "This area only",
        checked: _.get(req, 'session.data.profile.radius') == 'This area only'
      },
      {
        value: "1 mile",
        text: "1 mile",
        checked: _.get(req, 'session.data.profile.radius') == '1 mile'
      },
      {
        value: "5 miles",
        text: "5 miles",
        checked: _.get(req, 'session.data.profile.radius') == '5 miles'
      },
      {
        value: "10 miles",
        text: "10 miles",
        checked: _.get(req, 'session.data.profile.radius') == '10 miles'
      },
      {
        value: "15 miles",
        text: "15 miles",
        checked: _.get(req, 'session.data.profile.radius') == '15 miles'
      },
      {
        value: "20 miles",
        text: "20 miles",
        checked: _.get(req, 'session.data.profile.radius') == '20 miles'
      },
      {
        value: "25 miles",
        text: "25 miles",
        checked: _.get(req, 'session.data.profile.radius') == '25 miles'
      },
      {
        value: "50 miles",
        text: "50 miles",
        checked: _.get(req, 'session.data.profile.radius') == '50 miles'
      },
      {
        value: "100 miles",
        text: "100 miles",
        checked: _.get(req, 'session.data.profile.radius') == '100 miles'
      },
      {
        value: "200 miles",
        text: "200 miles",
        checked: _.get(req, 'session.data.profile.radius') == '200 miles'
      }
    ]

    res.render('profile/job-preferences/errors/location', {
      location,
      searchRadiusOptions
    })
  })


  router.get('/profile/job-preferences/errors/review', (req, res) => {
    let profile = req.session.user.profile

    res.render('profile/job-preferences/errors/review', {
      profile
    })
  })



  //////////////////
  //QTS
  //////////////////


  router.get('/profile/teaching-status/errors/qts', (req, res) => {
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

    res.render('profile/teaching-status/errors/qts', {
      options,
      qtsAwardedYear
    })
  })



  //////////////////
  //QUALIFICATIONS
  //////////////////


  router.get('/profile/qualifications/errors/type', (req, res) => {


    res.render('profile/qualifications/type', {


    })
  })



  router.get('/profile/qualifications/errors/:id/details', (req, res) => {
    let id = req.params.id
    let profile = req.session.user.profile

    let qualification = profile.qualifications[id]

    let options = [{
      value: "GCSE",
      text: "GCSE",
      checked: qualification.type == 'GCSE'
    }, {
      value: "AS level",
      text: "AS level",
      checked: qualification.type == 'AS level'
    }, {
      value: "A level",
      text: "A level",
      checked: qualification.type == 'A level'
    },
    {
      value: "Degree",
      text: "Degree",
      checked: qualification.type == 'Degree'
    }, {
      value: "Another UK qualification",
      text: "Another UK qualification",
      checked: qualification.type == 'Another UK qualification'
    },
    {
      value: "A qualification not from the UK",
      text: "A qualification not from the UK",
      checked: qualification.type == 'A qualification not from the UK'
    }]

    let anotherUKQualification = qualification.anotherUKQualification
    let nonUKQualification = qualification.nonUKQualification

    res.render('profile/qualifications/errors/details', {
      options,
      anotherUKQualification,
      nonUKQualification
    })
  })



  //////////////////
  //WORK HISTORY
  //////////////////


  router.get('/profile/errors/work-history', (req, res) => {
    let profile = req.session.user.profile

    let employer = _.get(req, 'session.data.profile.employer')
    let role = _.get(req, 'session.data.profile.role')

    let currentRoleOptions = [
      {
        value: "Yes",
        text: "Yes"
      },{
        value: "No",
        text: "No"
      }
    ]

    let currentRole = _.get(req, 'session.data.profile.currentRole')

    let startDate = {
      month: _.get(req, 'session.data.profile.startDate.month'),
      year: _.get(req, 'session.data.profile.startDate.year')
    }

    let endDate = {
      month: _.get(req, 'session.data.profile.endDate.month'),
      year: _.get(req, 'session.data.profile.endDate.year')
    }

    let description = _.get(req, 'session.data.profile.description')

    res.render('profile/work-history/errors/index', {
      employer,
      role,
      startDate,
      currentRoleOptions,
      currentRole,
      endDate,
      description
    })
  })



  //////////////////
  //ABOUT
  //////////////////

  router.get('/profile/about/errors/about', (req, res) => {
    let profile = req.session.user.profile
    res.render('profile/about/errors/about', {
      profile
    })
  })














  //////////////////
  //HIDE PROFILE
  //////////////////

  router.get('/profile/hide-profile/errors/', (req, res) => {
    res.render('profile/hide-profile/errors/index')
  })

  //add school/organisation
  router.get('/profile/hide-profile/errors/add', (req, res) => {
    let organisations = req.session.data.organisations

    res.render('profile/hide-profile/errors/add', {
      organisations
    })

  })

  //index

  router.get('/profile/hide-profile', (req, res) => {
    let organisations = req.session.data.organisations

    let hiddenPlace = _.get(req, 'session.data.profile.hiddenPlace')

    res.render('profile/hide-profile/errors/add', {
      hiddenPlace,
      organisations
    })
  })

  //schools

  router.get('/profile/hide-profile/errors/schools', (req, res) => {

    let profile = req.session.user.profile

    res.render('profile/hide-profile/errors/schools', {
      profile
    })
  })

  //review

  router.get('/profile/hide-profile/errors/review', (req, res) => {

    let profile = req.session.user.profile

    res.render('profile/hide-profile/errors/review', {
      profile
    })
  })


  //cant find school
  router.get('/profile/hide-profile/errors/cant-find-school', (req, res) => {

    let id = req.params.id
    let profile = req.session.user.profile
    let hiddenPlace = profile.hiddenPlaces[id]

    res.render('profile/hide-profile/errors/cantfindschool', {
      hiddenPlace
    })
  })

  //trusts

  router.get('/profile/hide-profile/errors/trusts', (req, res) => {
    let organisations = req.session.data.organisations

    let hiddenPlace = _.get(req, 'session.data.profile.hiddenPlace')

    res.render('profile/hide-profile/errors/trusts', {
      hiddenPlace,
      organisations
    })
  })

  router.post('/profile/hide-profile/errors/trusts', (req, res) => {

    res.redirect('/profile/hide-profile/errors/schools')
  })





  //////////////////
  //REFERENCES
  //////////////////



  router.get('/profile/references/errors/index', (req, res) => {

    let profile = req.session.user.profile

    let referenceName = _.get(req, 'session.data.profile.referenceName')
    let referenceTitle = _.get(req, 'session.data.profile.referenceTitle')
    let referenceOrganisation = _.get(req, 'session.data.profile.referenceOrganisation')
    let referenceEmail = _.get(req, 'session.data.profile.referenceEmail')
    let referenceNumber = _.get(req, 'session.data.profile.referenceNumber')

    res.render('profile/references/errors/index', {
      referenceName,
      referenceTitle,
      referenceOrganisation,
      referenceEmail,
      referenceNumber
    })
  })



  //////////////////
  //EQUAL OP
  //////////////////



  //disability

  router.get('/profile/equal-opportunities/errors/disability', (req, res) => {
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

    res.render('profile/equal-opportunities/errors/disability', {
      options,
      disability
    })
  })

  //age

  router.get('/profile/equal-opportunities/errors/age', (req, res) => {
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

    res.render('profile/equal-opportunities/errors/age', {
      options,
      age
    })
  })


  //gender

  router.get('/profile/equal-opportunities/errors/gender', (req, res) => {
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

    res.render('profile/equal-opportunities/errors/gender', {
      options,
      gender
    })
  })



    //orientation

    router.get('/profile/equal-opportunities/errors/orientation', (req, res) => {
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

      res.render('profile/equal-opportunities/errors/orientation', {
        options,
        orientation
      })
    })


    //ethnic group

    router.get('/profile/equal-opportunities/errors/ethnic-group', (req, res) => {
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

      res.render('profile/equal-opportunities/errors/ethnic-group', {
        options,
        ethnicGroup
      })
    })


    //religion


    router.get('/profile/equal-opportunities/errors/religion', (req, res) => {
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

      res.render('profile/equal-opportunities/errors/religion', {
        options,
        religion
      })
    })


}
