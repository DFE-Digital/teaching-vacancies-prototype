const authenticaton = require('../middleware/authenticaton')
const _ = require('lodash')

module.exports = router => {

  router.get('/profile', authenticaton.isAuthenticated, (req, res) => {
    res.render('profile/index', {
      user: req.session.user
    })
  })

  router.post('/profile', (req, res) => {
    req.session.user.profile.status = 'Active'
    req.flash('success', 'Profile turned on')
    res.redirect('/profile')
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

    qualifications = _.sortBy(qualifications, function(item) {
      return item.year
    }).reverse()

    qualifications = _.groupBy(qualifications, function(item){
      return item.type
    })

    res.render('profile/preview', {
      user: req.session.user,
      qualifications
    })
  })
}