const { v4: uuidv4 } = require('uuid');

module.exports = router => {

  router.get('/profile/qualifications/:id/type', (req, res) => {
    let id = req.params.id
    let profile = req.session.user.profile

    let options = [  {
      value: "A level",
      text: "A level",
      checked: profile.qualifications[id] && profile.qualifications[id].type == 'A level'
    },
    {
      value: "AS level",
      text: "AS level",
      checked: profile.qualifications[id] && profile.qualifications[id].type == 'AS level'
    },
    {
      value: "GCSE",
      text: "GCSE",
      checked: profile.qualifications[id] && profile.qualifications[id].type == 'GCSE'
    },
    {
      value: "Another UK qualification",
      text: "Another UK qualification",
      checked: profile.qualifications[id] && profile.qualifications[id].type == 'Another UK qualification'
    },
    {
      value: "A qualification not from the UK",
      text: "A qualification not from the UK",
      checked: profile.qualifications[id] && profile.qualifications[id].type == 'A qualification not from the UK'
    }]

    let anotherUKQualification = profile.qualifications[id] && profile.qualifications[id].anotherUKQualification
    let nonUKQualification = profile.qualifications[id] && profile.qualifications[id].nonUKQualification

    res.render('profile/qualifications/type', {
      id,
      options,
      anotherUKQualification,
      nonUKQualification
    })
  })

  router.post('/profile/qualifications/:id/type', (req, res) => {
    req.session.user.profile.qualifications = req.body.profile.qualifications

    // req.body.qualifications.type // AS level

    // req.session.user.profile.qualifications.push({
    //   id: uuidv4(),
    //   type: req.body.qualifications.type
    // })


    res.redirect(`/profile/qualifications/${req.params.id}/details`)
  })

  router.get('/profile/qualifications/:id/details', (req, res) => {
    let id = req.params.id
    let profile = req.session.user.profile
    let subject = profile.qualifications[id] && profile.qualifications[id].subject
    let country = profile.qualifications[id] && profile.qualifications[id].country
    let grade = profile.qualifications[id] && profile.qualifications[id].grade
    let year = profile.qualifications[id] && profile.qualifications[id].year

    res.render('profile/qualifications/details', {
      id,
      subject,
      country,
      grade,
      year
    })
  })

  router.post('/profile/qualifications/:id/details', (req, res) => {
    req.session.user.profile.qualifications = req.session.data.profile.qualifications
    res.redirect('/profile/qualifications/review')
  })

  router.get('/profile/qualifications/review', (req, res) => {
    let qualificationId = uuidv4()
    let profile = req.session.user.profile

    res.render('profile/qualifications/review', {
      qualificationId,
      profile
    })
  })

}