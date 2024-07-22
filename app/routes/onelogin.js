const users = require('../data/users.json')
const Validator = require('../helpers/validator')

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
        
      
      const validator = new Validator(req, res);

      validator.add({
        name: 'onelogin.oneloginemail',
        rules: [{
          fn: (value) => {
            let valid = true;
            if(!value || value.trim().length == 0) {
              valid = false;
            }
            return valid;
          },
          message: 'No email address with that account has been found'
        }]
      })
    
      validator.validate();

      res.render('onelogin/journey/import');

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

      const validator = new Validator(req, res);

      validator.add({
        name: 'onelogin.code',
        rules: [{
          fn: (value) => {
            let valid = true;
            if(!value || value.trim().length == 0) {
              valid = false;
            }
            return valid;
          },
          message: 'That authentication code is incorrect'
        }]
      })
    
      validator.validate();

      res.render('onelogin/journey/found');

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
