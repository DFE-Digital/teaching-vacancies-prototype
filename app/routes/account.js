const schools = require('../data/orgs.json')
const users = require('../data/users.json')
module.exports = router => {

  router.get('/account/sign-in', (req, res) => {
    res.render('account/sign-in', {
      returnUrl: req.query.returnUrl
    })
  })

  router.post('/account/sign-in', (req, res) => {
    res.locals.user = req.session.user = users[0]

    if(req.body.returnUrl) {
      res.redirect(req.body.returnUrl)
    } else {
      res.redirect('/jobs')
    }

  })

  router.get('/account/sign-out', (req, res) => {
    res.locals.user = req.session.user = null
    res.redirect('/')
  })

  router.post('/account/new', (req, res) => {
    res.locals.user = req.session.user = {
      username: req.body.emailAddress,
      password: req.body.password,
      profile: {
        qualifications: []
      }
    }
    res.redirect('/account/new/confirmation')
  })

}