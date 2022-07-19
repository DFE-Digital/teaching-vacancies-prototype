const { v4: uuidv4 } = require('uuid');

module.exports = router => {

  router.get('/profile/qualifications/type', (req, res) => {
    let profile = req.session.user.profile

    let options = [  {
      value: "A level",
      text: "A level"
    },
    {
      value: "AS level",
      text: "AS level"
    },
    {
      value: "GCSE",
      text: "GCSE"
    },
    {
      value: "Another UK qualification",
      text: "Another UK qualification"
    },
    {
      value: "A qualification not from the UK",
      text: "A qualification not from the UK"
    }]

    let anotherUKQualification = profile.qualifications.anotherUKQualification
    let nonUKQualification = profile.qualifications.nonUKQualification

    res.render('profile/qualifications/type', {
      options,
      anotherUKQualification,
      nonUKQualification
    })
  })

  router.post('/profile/qualifications/type', (req, res) => {
    let qualification = {
      id: uuidv4(),
      type: req.body.profile.qualifications.type,
      anotherUKQualification: req.body.profile.qualifications.anotherUKQualification,
      nonUKQualification: req.body.profile.qualifications.nonUKQualification
    }
    req.session.user.profile.qualifications[qualification.id] = qualification
    res.redirect(`/profile/qualifications/${qualification.id}/details`)
  })

  router.get('/profile/qualifications/:id/type', (req, res) => {
    let id = req.params.id
    let profile = req.session.user.profile

    let qualification = profile.qualifications[id]

    let options = [  {
      value: "A level",
      text: "A level",
      checked: qualification.type == 'A level'
    },
    {
      value: "AS level",
      text: "AS level",
      checked: qualification.type == 'AS level'
    },
    {
      value: "GCSE",
      text: "GCSE",
      checked: qualification.type == 'GCSE'
    },
    {
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

    res.render('profile/qualifications/type', {
      options,
      anotherUKQualification,
      nonUKQualification
    })
  })

  router.post('/profile/qualifications/:id/type', (req, res) => {
    let id = req.params.id
    req.session.user.profile.qualifications[id].type = req.body.profile.qualifications.type
    req.session.user.profile.qualifications[id].anotherUKQualification = req.body.profile.qualifications.anotherUKQualification
    req.session.user.profile.qualifications[id].nonUKQualification = req.body.profile.qualifications.nonUKQualification
    res.redirect(`/profile/qualifications/${req.params.id}/details`)
  })

  router.get('/profile/qualifications/:id/details', (req, res) => {
    let id = req.params.id
    let profile = req.session.user.profile
    let type = profile.qualifications[id].type
    let subject = profile.qualifications[id].subject
    let country = profile.qualifications[id].country
    let grade = profile.qualifications[id].grade
    let year = profile.qualifications[id].year

    res.render('profile/qualifications/details', {
      type,
      subject,
      country,
      grade,
      year
    })
  })

  router.post('/profile/qualifications/:id/details', (req, res) => {
    req.session.user.profile.qualifications[req.params.id].subject = req.body.profile.qualifications.subject
    req.session.user.profile.qualifications[req.params.id].country = req.body.profile.qualifications.country
    req.session.user.profile.qualifications[req.params.id].grade = req.body.profile.qualifications.grade
    req.session.user.profile.qualifications[req.params.id].year = req.body.profile.qualifications.year
    req.session.user.profile.qualifications[req.params.id].country = req.body.profile.qualifications.country

    res.redirect('/profile/qualifications/review')
  })

  router.get('/profile/qualifications/review', (req, res) => {
    let profile = req.session.user.profile

    res.render('profile/qualifications/review', {
      profile
    })
  })

}