const { DateTime } = require('luxon')
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

module.exports = router => {

  //preference on hiding

  router.get('/profile/hide-profile/preference', (req, res) => {

    res.render('profile/hide-profile/hide-preference', {
    })
  })

  router.post('/profile/hide-profile/preference', (req, res) => {

    var answer = req.session.data['hide-preference']

    let id = req.params.id
    let profile = req.session.user.profile

    let hiddenPlace = _.get(req, 'session.data.profile.hiddenPlace')

    if (answer == "yes"){
      res.redirect('add')
    } else {
      delete profile.hiddenPlaces
      res.redirect('summary')
    }

  })

  //add school/organisation

  router.get('/profile/hide-profile/add', (req, res) => {
    let profile = req.session.user.profile
    let organisations = req.session.data.organisations

    let hiddenPlace = _.get(req, 'session.data.profile.hiddenPlace')

    res.render('profile/hide-profile/index', {
      organisations
    })
  })

  router.post('/profile/hide-profile/add', (req, res) => {

    let hiddenPlace = {}
    hiddenPlace.id = uuidv4()
    hiddenPlace.hiddenPlace = req.body.profile.hiddenPlace

    req.session.user.profile.hiddenPlaces[hiddenPlace.id] = hiddenPlace

    res.redirect('/profile/hide-profile/review')
  })

  //index

  router.get('/profile/hide-profile', (req, res) => {
    let profile = req.session.user.profile
    let organisations = req.session.data.organisations

    let hiddenPlace = _.get(req, 'session.data.profile.hiddenPlace')

    res.render('profile/hide-profile/index', {
      hiddenPlace,
      organisations
    })
  })

  router.post('/profile/hide-profile', (req, res) => {

    let hiddenPlace = {}
    hiddenPlace.id = uuidv4()
    hiddenPlace.hiddenPlace = req.body.profile.hiddenPlace

    req.session.user.profile.hiddenPlaces[hiddenPlace.id] = hiddenPlace

    res.redirect('/profile/hide-profile/review')
  })

  //edit

  router.get('/profile/hide-profile/:id/edit', (req, res) => {

    let id = req.params.id
    let profile = req.session.user.profile
    let organisations = req.session.data.organisations

    let item = profile.hiddenPlaces[id]

    let hiddenPlace = item.hiddenPlace

    res.render('profile/hide-profile/index', {
      hiddenPlace,
      organisations
    })

  })

  router.post('/profile/hide-profile/:id/edit', (req, res) => {

    let id = req.params.id
    var item = req.session.user.profile.hiddenPlaces[id]
    item.hiddenPlace = req.body.profile.hiddenPlace

    res.redirect(`/profile/hide-profile/review`)
  })

  //review

  router.get('/profile/hide-profile/review', (req, res) => {

    let profile = req.session.user.profile

    res.render('profile/hide-profile/review', {
      profile
    })
  })

  router.post('/profile/hide-profile/review', (req, res) => {

    var answer = req.session.data['more-schools']

    if (answer == "yes"){
      res.redirect('add')
    } else {
      res.redirect('summary')
    }


    res.redirect(`/profile/hide-profile/review`)
  })

  //summary

  router.get('/profile/hide-profile/summary', (req, res) => {

    let profile = req.session.user.profile

    res.render('profile/hide-profile/summary', {
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

    res.redirect('/profile/hide-profile/review')
  })

}
