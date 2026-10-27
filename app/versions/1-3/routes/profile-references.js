const { DateTime } = require('luxon')
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

module.exports = router => {

  router.get('/profile/references/index', (req, res) => {

    let profile = req.session.user.profile

    let referenceName = _.get(req, 'session.data.profile.referenceName')
    let referenceTitle = _.get(req, 'session.data.profile.referenceTitle')
    let referenceOrganisation = _.get(req, 'session.data.profile.referenceOrganisation')
    let referenceEmail = _.get(req, 'session.data.profile.referenceEmail')
    let referenceNumber = _.get(req, 'session.data.profile.referenceNumber')

    res.render('profile/references/index', {
      referenceName,
      referenceTitle,
      referenceOrganisation,
      referenceEmail,
      referenceNumber
    })
  })

  router.post('/profile/references/index', (req, res) => {

    let reference = {
      id: uuidv4(),
      referenceName: req.body.profile.referenceName,
      referenceTitle: req.body.profile.referenceTitle,
      referenceOrganisation: req.body.profile.referenceOrganisation,
      referenceEmail: req.body.profile.referenceEmail,
      referenceNumber: req.body.profile.referenceNumber
    }

    req.session.user.profile.references[reference.id] = reference

    res.redirect(`/profile/references/review`)
  })


  //second reference

  router.get('/profile/references/second-reference', (req, res) => {

    res.render('profile/references/second-reference', {

    })
  })

  router.post('/profile/references/second-reference', (req, res) => {

    let reference = {
      id: uuidv4(),
      referenceName: req.body.profile.referenceName,
      referenceTitle: req.body.profile.referenceTitle,
      referenceOrganisation: req.body.profile.referenceOrganisation,
      referenceEmail: req.body.profile.referenceEmail,
      referenceNumber: req.body.profile.referenceNumber
    }

    req.session.user.profile.references[reference.id] = reference

    res.redirect(`/profile/references/review`)
  })

  //edit

  router.get('/profile/references/:id/edit1', (req, res) => {
    let id = req.params.id
    let profile = req.session.user.profile

    let reference = profile.references[id]

    let referenceName = reference.referenceName
    let referenceTitle = reference.referenceTitle
    let referenceOrganisation = reference.referenceOrganisation
    let referenceEmail = reference.referenceEmail
    let referenceNumber = reference.referenceNumber

    res.render('profile/references/index', {
      referenceName,
      referenceTitle,
      referenceOrganisation,
      referenceEmail,
      referenceNumber
    })
  })

  router.get('/profile/references/:id/edit2', (req, res) => {
    let id = req.params.id
    let profile = req.session.user.profile

    let reference = profile.references[id]

    let referenceName = reference.referenceName
    let referenceTitle = reference.referenceTitle
    let referenceOrganisation = reference.referenceOrganisation
    let referenceEmail = reference.referenceEmail
    let referenceNumber = reference.referenceNumber

    res.render('profile/references/index', {
      referenceName,
      referenceTitle,
      referenceOrganisation,
      referenceEmail,
      referenceNumber
    })
  })

  router.post('/profile/references/:id/edit1', (req, res) => {
    let id = req.params.id
    var reference = req.session.user.profile.references[id]

    reference.referenceName = req.body.profile.referenceName
    reference.referenceTitle = req.body.profile.referenceTitle
    reference.referenceOrganisation = req.body.profile.referenceOrganisation
    reference.referenceEmail = req.body.profile.referenceEmail
    reference.referenceNumber = req.body.profile.referenceNumber

    res.redirect(`/profile/references/review`)
  })

  router.post('/profile/references/:id/edit2', (req, res) => {
    let id = req.params.id
    var reference = req.session.user.profile.references[id]

    reference.referenceName = req.body.profile.referenceName
    reference.referenceTitle = req.body.profile.referenceTitle
    reference.referenceOrganisation = req.body.profile.referenceOrganisation
    reference.referenceEmail = req.body.profile.referenceEmail
    reference.referenceNumber = req.body.profile.referenceNumber

    res.redirect(`/profile/references/review`)
  })

  router.get('/profile/references/review', (req, res) => {
    let profile = req.session.user.profile

    res.render('profile/references/review', {
      profile
    })
  })

  router.get('/profile/references/:id/delete', (req, res) => {
    let id = req.params.id
    let profile = req.session.user.profile
    let reference = profile.references[id]

    res.render('profile/references/delete', {
      reference
    })
  })

  router.post('/profile/references/:id/delete', (req, res) => {
    let id = req.params.id
    let profile = req.session.user.profile

    delete profile.references[id]

    req.flash('success', 'Reference deleted')
    res.redirect('/profile/references/review')
  })

}
