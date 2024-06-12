const schools = require('../data/orgs.json')
const users = require('../data/users.json')
module.exports = router => {

  router.post('/onelogin/journey/choice', (req, res) => {
    if(req.body.emailAddress) {
      res.locals.user = req.session.user = users.find(user => user.emailAddress == req.body.emailAddress)
    } else {
      res.locals.user = req.session.user = users[0]
    }

    var choice = req.session.data['match']

    if (choice == "match"){
        res.redirect('/onelogin/journey/match')
    } else {
        res.redirect('/onelogin/journey/nomatch')
    }
 
  })

  router.post('/onelogin/journey/import', (req, res) => {
  
    var email = req.session.data['oneloginemail']

    if (email == "match@match.com"){
        res.redirect('/onelogin/journey/found')
    } else {
        res.redirect('/onelogin/journey/not_found')
    }
 
  })

  router.post('/onelogin/journey/not_found', (req, res) => {
  
    var email = req.session.data['oneloginemail']

    if (email == "match@match.com"){
        res.redirect('/onelogin/journey/found')
    } else {
        res.redirect('/onelogin/journey/not_found')
    }
 
  })

  router.post('/onelogin/journey/found', (req, res) => {
  
    var email = req.session.data['auth-code']

    if (email == "KJFJKFJK56DVDD"){
        res.redirect('/onelogin/journey/code_match')
    } else {
        res.redirect('/onelogin/journey/code_error')
    }
 
  })

  router.post('/onelogin/journey/code_error', (req, res) => {
  
    var email = req.session.data['auth-code']

    if (email == "KJFJKFJK56DVDD"){
        res.redirect('/onelogin/journey/code_match')
    } else {
        res.redirect('/onelogin/journey/code_error')
    }
 
  })

}
