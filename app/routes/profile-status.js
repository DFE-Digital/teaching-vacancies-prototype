const authenticaton = require('../middleware/authenticaton')

module.exports = router => {

  router.get('/profile/status', authenticaton.isAuthenticated, (req, res) => {
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

    res.render('profile/status/index', {
      profile,
      options
    })
  })

  router.post('/profile/status', (req, res) => {
    req.session.user.profile.status = req.body.profile.status
    res.redirect('/profile/status/review')
  })

  router.get('/profile/status/review', (req, res) => {
    let profile = req.session.user.profile
    res.render('profile/status/review', {
      profile
    })
  })

}