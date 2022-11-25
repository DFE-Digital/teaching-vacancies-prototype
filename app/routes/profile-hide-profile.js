const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

module.exports = router => {

  //preference on hiding

  router.get('/profile/hide-profile/', (req, res) => {
    res.render('profile/hide-profile/index')
  })

  router.post('/profile/hide-profile/', (req, res) => {

    let answer = req.body.profile.provideSchoolsToHideFrom

    req.session.user.profile.provideSchoolsToHideFrom = answer

    if (answer == "Yes"){
      res.redirect('/profile/hide-profile/add')
    } else {
      delete req.session.user.profile.hiddenPlaces
      req.session.user.profile.hiddenPlaces = {}
      res.redirect('/profile/hide-profile/review')
    }

  })

  //add school/organisation
  router.get('/profile/hide-profile/add', (req, res) => {
    let organisations = req.session.data.organisations

    res.render('profile/hide-profile/add', {
      organisations
    })

  })

  router.post('/profile/hide-profile/add', (req, res) => {

    let hiddenPlace = {
      id: uuidv4(),
      hiddenPlace: req.body.profile.hiddenPlace
    }

    req.session.user.profile.hiddenPlaces[hiddenPlace.id] = hiddenPlace

    let typeOfSchool = req.body.profile.hiddenPlace

    if(typeOfSchool.indexOf("Trust") >= 0){
      res.redirect('/profile/hide-profile/trusts')
    }else{
      res.redirect('/profile/hide-profile/schools')
    }

  })

  //index

  router.get('/profile/hide-profile', (req, res) => {
    let organisations = req.session.data.organisations

    let hiddenPlace = _.get(req, 'session.data.profile.hiddenPlace')

    res.render('profile/hide-profile/add', {
      hiddenPlace,
      organisations
    })
  })

  router.post('/profile/hide-profile', (req, res) => {

    let hiddenPlace = {}
    hiddenPlace.id = uuidv4()
    hiddenPlace.hiddenPlace = req.body.profile.hiddenPlace

    req.session.user.profile.hiddenPlaces[hiddenPlace.id] = hiddenPlace

    res.redirect('/profile/hide-profile/schools')
  })

  //schools

  router.get('/profile/hide-profile/schools', (req, res) => {

    let profile = req.session.user.profile

    res.render('profile/hide-profile/schools', {
      profile
    })
  })

  router.post('/profile/hide-profile/schools', (req, res) => {

    var answer = req.session.data['more-schools']

    if (answer == "Yes"){
      res.redirect('/profile/hide-profile/add')
    } else {
      res.redirect('/profile/hide-profile/review')
    }


    res.redirect(`/profile/hide-profile/schools`)
  })

  //review

  router.get('/profile/hide-profile/review', (req, res) => {

    let profile = req.session.user.profile

    res.render('profile/hide-profile/review', {
      profile
    })
  })

  //delete

  router.get('/profile/hide-profile/:id/delete', (req, res) => {

    let id = req.params.id
    let profile = req.session.user.profile
    let hiddenPlace = profile.hiddenPlaces[id]

    res.render('profile/hide-profile/delete', {
      hiddenPlace
    })
  })

  router.post('/profile/hide-profile/:id/delete', (req, res) => {

    let id = req.params.id
    let profile = req.session.user.profile

    let hiddenPlace = _.get(req, 'session.data.profile.hiddenPlace')

    if (hiddenPlace.indexOf("School") >= 0) {
      req.flash('success', 'School deleted')
    }else{
      req.flash('success', 'Organisation deleted')
    }

    delete profile.hiddenPlaces[id]

    res.redirect('/profile/hide-profile/schools')
  })

  //cant find school
  router.get('/profile/hide-profile/cant-find-school', (req, res) => {

    let id = req.params.id
    let profile = req.session.user.profile
    let hiddenPlace = profile.hiddenPlaces[id]

    res.render('profile/hide-profile/cantfindschool', {
      hiddenPlace
    })
  })

  router.post('/profile/hide-profile/cant-find-school', (req, res) => {

    var answer = req.session.data['more-schools']

    if (answer == "Yes"){
      res.redirect('/profile/hide-profile/add')
    } else {
      res.redirect('/profile/hide-profile/review')
    }


    res.redirect(`/profile/hide-profile/schools`)
  })

  //trusts

  router.get('/profile/hide-profile/trusts', (req, res) => {
    let organisations = req.session.data.organisations

    let hiddenPlace = _.get(req, 'session.data.profile.hiddenPlace')

    res.render('profile/hide-profile/trusts', {
      hiddenPlace,
      organisations
    })
  })

  router.post('/profile/hide-profile/trusts', (req, res) => {

    res.redirect('/profile/hide-profile/schools')
  })

}
