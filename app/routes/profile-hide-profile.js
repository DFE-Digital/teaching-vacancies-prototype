const { DateTime } = require('luxon')
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

module.exports = router => {

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

    delete profile.hiddenPlaces[id]

    req.flash('success', 'School deleted')
    res.redirect('/profile/hide-profile/review')
  })

}
