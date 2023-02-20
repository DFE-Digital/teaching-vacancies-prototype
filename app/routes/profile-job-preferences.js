const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

module.exports = router => {

  router.get('/profile/job-preferences/roles', (req, res) => {
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

    res.render('profile/job-preferences/roles', {
      options
    })
  })

  router.post('/profile/job-preferences/roles', (req, res) => {
    req.session.user.profile.roles = req.body.profile.roles
    res.redirect('/profile/job-preferences/education-phases')
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
    res.redirect('/profile/job-preferences/location')
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


  router.post('/profile/job-preferences/location', (req, res) => {
    let location = {}
    location.id = uuidv4()
    location.location = req.body.profile.location
    location.radius = req.body.profile.radius

    req.session.user.profile.locations[location.id] = location

    res.redirect('/profile/job-preferences/location-check')
  })

  router.get('/profile/job-preferences/location-check', (req, res) => {
    let locations = req.session.user.profile.locations

    res.render('profile/job-preferences/location-check', {
      locations
    })
  })

  router.post('/profile/job-preferences/location-check', (req, res) => {
    if(_.get(req, 'session.data.profile.addAnotherLocation') == 'Yes') {
      // TODO: set values to null

      res.redirect('/profile/job-preferences/location')
    } else {
      res.redirect('/profile/job-preferences/review')
    }
  })

  router.get('/profile/job-preferences/review', (req, res) => {
    let profile = req.session.user.profile

    res.render('profile/job-preferences/review', {
      profile
    })
  })


  //location delete

  router.get('/profile/job-preferences/location-delete', (req, res) => {
    let profile = req.session.user.profile

    res.render('profile/job-preferences/location-delete', {
      profile
    })
  })

  router.post('/profile/job-preferences/location-delete', (req, res) => {
    let id = req.params.id
    let profile = req.session.user.profile

    req.flash('success', 'Location deleted')
    res.redirect('/profile/job-preferences/location-check')
  })

}
