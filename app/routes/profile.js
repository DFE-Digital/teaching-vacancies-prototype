const { v4: uuidv4 } = require('uuid');


function isAuthenticated(req, res, next) {
  if (req.session.user) {
    next()
  } else {
    res.redirect('/sign-in')
  }
}

module.exports = router => {

  router.get('/profile', isAuthenticated, (req, res) => {
    let sectionsTotal = 0
    let sectionsComplete = 0
    for(let key in req.session.user.profile) {
      if(typeof req.session.user.profile[key].status != "undefined") {
        sectionsTotal++
        if(req.session.user.profile[key].status == 'Completed') {
          sectionsComplete++
        }
      }
    }

    res.render('profile/index', {
      sections: {
        total: sectionsTotal,
        completed: sectionsComplete
      },
      qualificationId: uuidv4(),
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


}