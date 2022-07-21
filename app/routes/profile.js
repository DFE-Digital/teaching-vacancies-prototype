const authenticaton = require('../middleware/authenticaton')

module.exports = router => {

  router.get('/profile', authenticaton.isAuthenticated, (req, res) => {
    res.render('profile/index', {
      user: req.session.user
    })
  })

  router.post('/profile', (req, res) => {
    req.session.user.profile.status = 'Looking for a new role'
    req.flash('success', 'Profile published')
    res.redirect('/profile')
  })

}