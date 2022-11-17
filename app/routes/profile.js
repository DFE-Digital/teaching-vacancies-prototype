const authenticaton = require('../middleware/authenticaton')
const _ = require('lodash')
const profileTeachingStatus = require('./profile-teaching-status')

module.exports = router => {

  router.get('/profile', authenticaton.isAuthenticated, (req, res) => {
    res.render('profile/index', {
      user: req.session.user
    })
  })

  router.post('/profile', (req, res) => {
    let profile = req.session.user.profile

    let isPersonalDetailsIncomplete = !profile || !profile.firstName || !profile.providePhoneNumber
    let isJobPreferencesIncomplete = !profile || !profile.roles || !profile.phases || !profile.keyStages || !profile.subjects || !profile.workingPatterns || !profile.locations

    let errorList = []

    if(isPersonalDetailsIncomplete) {
      errorList.push({
        href: '#app-personal-details',
        text: 'You must complete your personal details before you turn on your profile'
      })
    }

    if(isJobPreferencesIncomplete) {
      errorList.push({
        href: '#app-job-preferences',
        text: 'You must complete your job preferences before you turn on your profile'
      })
    }

    if(errorList.length) {
      res.render('profile/index', {
        user: req.session.user,
        errorList,
        errorIsPersonalDetailsIncomplete: isPersonalDetailsIncomplete,
        errorIsJobPreferencesIncomplete: isJobPreferencesIncomplete
      })
    } else {
      req.session.user.profile.status = 'Active'
      req.flash('success', 'Profile turned on')
      res.redirect('/profile')
    }

  })

  router.post('/profile/activate', (req, res) => {
    req.session.user.profile.status = 'Active'
    req.flash('success', 'Profile turned on')
    res.redirect('/profile')
  })

  router.post('/profile/deactivate', (req, res) => {
    req.session.user.profile.status = 'Not active'
    req.flash('success', 'Profile turned off')
    res.redirect('/profile')
  })

  router.get('/profile/preview', authenticaton.isAuthenticated, (req, res) => {

    let qualifications = req.session.user.profile.qualifications

    let qualificationsGroup = _.sortBy(qualifications, function(item) {
      return item.year
    }).reverse()

    qualificationsGroup = _.groupBy(qualificationsGroup, function(item){
      return item.type
    })

    _.forIn(qualificationsGroup, function(value, key, object) {
      // value = the array

      object[key] = _.groupBy(value, function(item) {
        return item.year + item.organisation
      })
    })

    res.render('profile/preview', {
      user: req.session.user,
      qualificationsGroup
    })
  })

  //populate profile

  router.get('/profile/populate-your-profile', (req, res) => {

    res.render('profile/populate', {
      user: req.session.user
    })
  })

  router.post('/profile/populate-your-profile', (req, res) => {
    req.flash('success', 'Profile has been populated with previous application details')
    res.redirect('/profile')
  })

  router.get('/profile/profile-manual', (req, res) => {

    delete req.session.user.profile.firstName
    delete req.session.user.profile.lastName
    delete req.session.user.profile.providePhoneNumber
    delete req.session.user.profile.phoneNumber
    delete req.session.user.profile.roles
    delete req.session.user.profile.phases
    delete req.session.user.profile.keyStages
    delete req.session.user.profile.workingPatterns
    delete req.session.user.profile.subjects
    delete req.session.user.profile.locations
    delete req.session.user.profile.qts
    delete req.session.user.profile.qtsAwardedYear
    delete req.session.user.profile.qualifications
    delete req.session.user.profile.workHistory
    delete req.session.user.profile.about
    delete req.session.user.profile.hiddenPlaces
    delete req.session.user.profile.previousApplication

    res.render('profile/index', {
      //user: req.session.user
    })
  })

}
