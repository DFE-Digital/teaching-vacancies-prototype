const schools = require('../data/orgs.json')
const users = require('../data/users.json')
module.exports = router => {

  router.get('/account/sign-in', (req, res) => {
    var options = users.map(user => {
      return {
        text: user.emailAddress,
        value: user.emailAddress,
        hint: {
          text: user.profile.status ? 'Profile: ' + user.profile.status : ''
        }
      }
    })
    res.render('account/sign-in', {
      returnUrl: req.query.returnUrl,
      options
    })
  })

  router.get('/account/sign-in-as-profile', (req, res) => {
    res.render('account/sign-in-as-profile', {
      users
    })
  })

  router.get('/jobalerts/jobalert', (req, res) => {
    res.render('account/jobalerts/jobalert', {
      users
    })
  })

  router.get('/jobalerts/jobalert_new_banner', (req, res) => {
    res.render('account/jobalerts/jobalert_new_banner', {
      users
    })
  })

  router.get('/jobalerts/jobalert_dynamic', (req, res) => {
    res.render('account/jobalerts/jobalert_dynamic', {
      users
    })
  })

  router.get('/jobalerts/jobalert_itt', (req, res) => {
    res.render('account/jobalerts/jobalert_itt', {
      users
    })
  })

  router.get('/jobalerts/jobalert_itt2', (req, res) => {
    res.render('account/jobalerts/jobalert_itt2', {
      users
    })
  })

  router.post('/jobalerts/question', (req, res) => {

    var choice = req.session.data['roletype']

    if (choice == "teaching"){
      res.redirect('/jobalerts/teaching')
    } else {
      res.redirect('/jobalerts/support')
    }
  })

  router.post('/account/sign-in', (req, res) => {
    if(req.body.emailAddress) {
      res.locals.user = req.session.user = users.find(user => user.emailAddress == req.body.emailAddress)
    } else {
      res.locals.user = req.session.user = users[0]
    }

    if(req.body.returnUrl) {
      res.redirect(req.body.returnUrl)
    } else {

      if(req.session.user.profile.previousApplication == 'Yes'){
        res.redirect('/account/new/confirmation')
      }else{
        res.redirect('/jobs')
      }
    }
  })

  router.get('/account/sign-out', (req, res) => {
    res.locals.user = req.session.user = null
    res.redirect('/')
  })

  router.post('/account/new', (req, res) => {
    res.locals.user = req.session.user = {
      emailAddress: req.body.emailAddress,
      password: req.body.password,
      profile: {
        locations: {},
        qualifications: {},
        workHistory: {},
        hiddenPlaces: {}
      }
    }

    res.redirect('/account/new/create')
  })

  router.get('/account/type', (req, res) => {

    res.render('account/account-type', {
      user: req.session.user
    })
  })

  router.post('/account/type', (req, res) => {

    req.session.user.accountType = req.session.data['accountType']
    
    res.redirect('/account')
  })

  router.get('/account/new/confirmation', (req, res) => {

    res.render('account/new/confirmation', {
      user: req.session.user
    })
  })

  router.post('/account/new/confirmation', (req, res) => {

    req.session.user.accountType = req.session.data['accountType']
    
    res.redirect('/account/new/confirmation2')
  })

  router.get('/account/new/marketing', (req, res) => {

    res.render('account/new/marketing', {
      user: req.session.user
    })
  })

  router.post('/account/new/marketing', (req, res) => {

    req.session.user.marketingPreferences = req.session.data['marketingPreferences']
    
    res.redirect('/account/new/confirmation2')
  })

  router.get('/account/marketing', (req, res) => {

    res.render('account/marketing', {
      user: req.session.user
    })
  })

  router.post('/account/marketing', (req, res) => {

    req.session.user.marketingPreferences = req.session.data['marketingPreferences']
    
    res.redirect('/account')
  })

  router.get('/account/new/confirmation2', (req, res) => {

    res.render('account/new/confirmation2', {
      user: req.session.user
    })
  })


  router.post('/account/new/confirmation2', (req, res) => {

    var previousApplication = req.session.user.profile.previousApplication

    if (previousApplication == "Yes"){
      req.flash('success', 'You have recently submitted a job application, so some of your details have been imported into your profile.')
    } else {

    }

    res.redirect('/profile')

  })

  router.post('/account/new/confirmation2', (req, res) => {

    var previousApplication = req.session.user.profile.previousApplication

    if (previousApplication == "Yes"){
      req.flash('success', 'You have recently submitted a job application, so some of your details have been imported into your profile.')
    } else {

    }

    res.redirect('/profile')

  })

  router.get('/account/new/activate', (req, res) => {

    res.render('account/new/activate', {
      user: req.session.user
    })
  })

  router.post('/account/new/activate', (req, res) => {

    req.flash('success', 'We have just sent you an email with a link to activate your Teaching Vacancies account.')
   
    res.redirect('/account/new/activate')
  })

  router.get('/account/new/expired', (req, res) => {

    res.render('account/new/expired', {
      user: req.session.user
    })
  })
  

  router.post('/account/new/expired', (req, res) => {

    req.flash('success', 'We have just sent you an email with a link to activate your Teaching Vacancies account.')
   
    res.redirect('/account/new/expired')
  })


  router.get('/account/delete-account', (req, res) => {

    res.render('account/delete-account', {
      user: req.session.user
    })
  })

  router.get('/account/delete-account-confirmation', (req, res) => {

    res.render('account/delete-account-confirmation', {
      user: req.session.user
    })
  })

  router.post('/account/delete-account', (req, res) => {
  
    res.redirect('/account/delete-account-confirmation')

  })

  router.post('/account/delete-account-confirmation', (req, res) => {

    req.flash('success', 'Your account has been deleted. To create new job alerts and apply for jobs through Teaching Vacancies, you can <a href="#">create a new jobseeker account</a>.')
  
    res.redirect('/')

  })


}
