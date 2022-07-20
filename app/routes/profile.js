const authenticaton = require('../middleware/authenticaton')

module.exports = router => {

  router.get('/profile', authenticaton.isAuthenticated, (req, res) => {
    res.render('profile/index', {
      user: req.session.user
    })
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

  router.get('/profile/publish', authenticaton.isAuthenticated, (req, res) => {
    let profile = req.session.user.profile
    let options = [
      {
        text: 'Looking for a new role',
        value: 'Looking for a new role',
        checked: profile.status == 'Looking for a new role'
      },
      {
        text: 'Open to a new role',
        value: 'Open to a new role',
        checked: profile.status == 'Open to a new role'
      },
      {
        text: 'Not looking for a new role',
        value: 'Not looking for a new role',
        checked: profile.status == 'Not looking for a new role'
      }
    ]

    res.render('profile/publish', {
      options,
      user: req.session.user
    })
  })

  router.post('/profile/publish', (req, res) => {
    req.session.user.profile.status = req.body.profile.status
    req.flash('success', 'Profile published')
    res.redirect('/profile')
  })

}