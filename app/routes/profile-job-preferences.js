const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

module.exports = router => {

  router.get('/profile/job-preferences/roles', (req, res) => {

    res.render('profile/job-preferences/roles', {
      
    })
  })

  router.post('/profile/job-preferences/roles', (req, res) => {
    
    var accountType = req.session.data['accountType']

    if( accountType == 'teaching') {
      res.redirect('/profile/job-preferences/roles_teaching')
    } else {
      res.redirect('/profile/job-preferences/roles_non_teaching')
    }

  })

  router.post('/profile/job-preferences/roles_teaching', (req, res) => {
    req.session.user.profile.roles = req.body.profile.roles
    res.redirect('/profile/job-preferences/education-phases')
  })


  router.post('/profile/job-preferences/roles_non_teaching', (req, res) => {
    req.session.user.profile.roles = req.body.profile.roles
    res.redirect('/profile/job-preferences/working-patterns')
  })

  router.get('/profile/job-preferences/education-phases', (req, res) => {
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

    res.render('profile/job-preferences/education-phases', {
      options
    })
  })

  router.post('/profile/job-preferences/education-phases', (req, res) => {
    let profile = req.session.user.profile
    profile.phases = req.body.profile.phases
    res.redirect('/profile/job-preferences/key-stages')
  })

  router.get('/profile/job-preferences/key-stages', (req, res) => {
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
    }, {
      value: 'Key stage 3',
      text: 'Key stage 3',
      checked: profile.keyStages && profile.keyStages.includes('Key stage 3')
    }, {
      value: 'Key stage 4',
      text: 'Key stage 4',
      checked: profile.keyStages && profile.keyStages.includes('Key stage 4')
    }, {
      value: 'Key stage 5',
      text: 'Key stage 5',
      checked: profile.keyStages && profile.keyStages.includes('Key stage 5')
    }]

    res.render('profile/job-preferences/key-stages', {
      options
    })
  })

  router.post('/profile/job-preferences/key-stages', (req, res) => {
    let profile = req.session.user.profile
    profile.keyStages = req.body.profile.keyStages

    if(profile.phases.includes('Secondary') || profile.phases.includes('Sixth form or college')) {
      res.redirect('/profile/job-preferences/subjects')
    } else {
      res.redirect('/profile/job-preferences/working-patterns')
    }
  })

  router.get('/profile/job-preferences/subjects', (req, res) => {
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

    res.render('profile/job-preferences/subjects', {
      options
    })
  })

  router.post('/profile/job-preferences/subjects', (req, res) => {
    let profile = req.session.user.profile
    profile.subjects = req.body.profile.subjects
    res.redirect('/profile/job-preferences/working-patterns')
  })

  router.get('/profile/job-preferences/working-patterns', (req, res) => {
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

    res.render('profile/job-preferences/working-patterns', {
      options
    })
  })

  router.post('/profile/job-preferences/working-patterns', (req, res) => {

    req.session.user.profile.workingPatterns = req.body.profile.workingPatterns

    let profile = req.session.user.profile

    if( profile.allEnglandYes == 'Yes') {
      
      res.redirect('/profile/job-preferences/location-check');

    }else if( profile.allEnglandYes == 'No') {
    
      res.redirect('/profile/job-preferences/location-check');

    }else{
      res.redirect('/profile/job-preferences/location-all-of-england')
    }
    

  })

  router.post('/profile/job-preferences/alerts', (req, res) => {


    let alertAnswer = _.get(req, 'session.data.alerts')

    if( alertAnswer == 'Yes') {
      
      req.flash('success', 'Job alert created from job preferences')
      res.redirect('/profile/job-preferences/review');

    }else{
      res.redirect('/profile/job-preferences/review')
    }
    

  })

  router.post('/profile/job-preferences/alerts_location', (req, res) => {


    let alertAnswer = _.get(req, 'session.data.alerts')

    if( alertAnswer == 'Yes') {
      
      req.flash('success', 'Job alert created for London (10 miles)')
      res.redirect('/profile/job-preferences/location-check');

    }else{
      res.redirect('/profile/job-preferences/location-check');
    }
    

  })

  router.get('/profile/job-preferences/:id/location', (req, res) => {

    let id = req.params.id
    let profile = req.session.user.profile

    let location = profile.locations[id]

    let searchRadiusOptions = [
      {
        value: "This area only",
        text: "This area only",
        checked: location.radius == 'This area only'
      },
      {
        value: "1 mile",
        text: "1 mile",
        checked: location.radius == '1 mile'
      },
      {
        value: "5 miles",
        text: "5 miles",
        checked: location.radius == '5 miles'
      },
      {
        value: "10 miles",
        text: "10 miles",
        checked: location.radius == '10 miles'
      },
      {
        value: "15 miles",
        text: "15 miles",
        checked: location.radius == '15 miles'
      },
      {
        value: "20 miles",
        text: "20 miles",
        checked: location.radius == '20 miles'
      },
      {
        value: "25 miles",
        text: "25 miles",
        checked: location.radius == '25 miles'
      },
      {
        value: "50 miles",
        text: "50 miles",
        checked: location.radius == '50 miles'
      },
      {
        value: "100 miles",
        text: "100 miles",
        checked: location.radius == '100 miles'
      },
      {
        value: "200 miles",
        text: "200 miles",
        checked: location.radius == '200 miles'
      }
    ]

    res.render('profile/job-preferences/location', {
      location,
      searchRadiusOptions
    })
  })

  router.get('/profile/job-preferences/location', (req, res) => {
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

    res.render('profile/job-preferences/location', {
      location,
      searchRadiusOptions
    })
  })


  router.post('/profile/job-preferences/:id/location', (req, res) => {
    let location = {}
    location.id = uuidv4()
    location.location = req.body.profile.location
    location.radius = req.body.profile.radius
    location.alert = req.body.profile.alert

    req.session.user.profile.locations[location.id] = location

    if(_.get(req, 'session.data.profile-alert') == 'Yes') {
      req.flash('success', 'Job alert created for ' + location.location + ' (' + location.radius + ')')
    } 

    res.redirect('/profile/job-preferences/alerts_location')
  })

  

  router.get('/profile/job-preferences/location-check', (req, res) => {
    let locations = req.session.user.profile.locations
    let profile = req.session.user.profile


    res.render('profile/job-preferences/location-check', {
      locations,
      profile
    })
  })

  router.post('/profile/job-preferences/location', (req, res) => {

    let profile = req.session.user.profile

    let location = {}
    location.id = uuidv4()
    location.location = req.body.profile.location
    location.radius = req.body.profile.radius
    location.alert = req.body.profile.alert

    req.session.user.profile.locations[location.id] = location

    if(_.get(req, 'session.data.profile-alert') == 'Yes') {
      req.flash('success', 'Job alert created for ' + location.location + ' (' + location.radius + ')')
    } 

    profile.allEnglandYes = 'No'

    res.redirect('/profile/job-preferences/alerts_location')
  })

  router.get('/profile/job-preferences/location-check', (req, res) => {
    let locations = req.session.user.profile.locations
    let profile = req.session.user.profile


    res.render('profile/job-preferences/location-check', {
      locations,
      profile
    })
  })

  router.post('/profile/job-preferences/location-check', (req, res) => {

    let profile = req.session.user.profile

    if(_.get(req, 'session.data.profile.addAnotherLocation') == 'Yes') {

      res.redirect('/profile/job-preferences/location')

    } else if(_.get(req, 'session.data.profile.addAnotherLocation') == 'England') {
      //set to across England

      res.redirect('/profile/job-preferences/location-all-of-england-yes')

    } else if(_.get(req, 'session.data.profile.addAnotherLocation') == 'No') {
      //set to across England  
      res.redirect('/profile/job-preferences/review')
    } else{
      res.redirect('/profile/job-preferences/location')
    }


  })

  router.get('/profile/job-preferences/location-check-all', (req, res) => {
    let locations = req.session.user.profile.locations
    let profile = req.session.user.profile


    res.render('profile/job-preferences/location-check-all', {
      locations,
      profile
    })
  })

  router.post('/profile/job-preferences/location-check-all', (req, res) => {

    let profile = req.session.user.profile

    if ( req.session.data['all-of-england-question'] == "Yes"){

      profile.allEnglandYes = 'Yes'

      if(req.session.user.profile.locations){
        //REMOVE LOCATIONS
        delete req.session.user.profile.locations
        req.session.user.profile.locations = {}
        req.flash('success', 'Location preference set to across England')

      }
      
      res.redirect('/profile/job-preferences/review')

      
    } else {
      profile.allEnglandYes = 'No'
      res.redirect('/profile/job-preferences/location')

    }


  })

  router.get('/profile/job-preferences/review', (req, res) => {
    let profile = req.session.user.profile

    res.render('profile/job-preferences/review', {
      profile
    })
  })

  //location delete

  router.get('/profile/job-preferences/:id/location-delete', (req, res) => {

    let id = req.params.id
    let profile = req.session.user.profile
    let hiddenPlace = profile.locations[id]

    res.render('profile/job-preferences/location-delete', {
      hiddenPlace
    })
  })

  router.post('/profile/job-preferences/:id/location-delete', (req, res) => {
    let id = req.params.id
    let profile = req.session.user.profile

    req.flash('success', 'Location deleted')

    delete profile.locations[id]

    res.redirect('/profile/job-preferences/location-check')
  })


  //location all of england

  router.get('/profile/job-preferences/location-all-of-england', (req, res) => {
    let profile = req.session.user.profile

    res.render('profile/job-preferences/location-all-of-england', {
      profile
    })
  })

  router.post('/profile/job-preferences/location-all-of-england', (req, res) => {
    
    var allEngland = req.session.data['all-of-england']
    let locations = req.session.user.profile.locations
    //ADD ANSWER TO PROFILE

    let profile = req.session.user.profile
    profile.allEnglandYes = allEngland

    if (allEngland == "Yes"){

      res.redirect("alerts")
      
    } else {
        res.redirect("location")
    }

  })

  //location all of england yes

  router.get('/profile/job-preferences/location-all-of-england-yes', (req, res) => {
    let profile = req.session.user.profile

    res.render('profile/job-preferences/location-all-of-england-yes', {
      profile
    })
  })

  router.post('/profile/job-preferences/location-all-of-england-yes', (req, res) => {

    let location = {}
   
    var allEnglandYes = req.session.data['delete-all-locations-for-england']
    
    if (allEnglandYes == "Yes"){

      req.session.user.profile.allEnglandYes = 'Yes'

      //REMOVE LOCATIONS
      delete req.session.user.profile.locations
      req.session.user.profile.locations = {}

      location.id = uuidv4()
      location.location = 'England'
      location.radius = 'This area only'

      req.session.user.profile.locations[location.id] = location

      req.flash('success', 'Location preference set to across England')

      res.redirect('/profile/job-preferences/review')
        
    } else {
      res.redirect('/profile/job-preferences/location-check')
    }

  })

}
