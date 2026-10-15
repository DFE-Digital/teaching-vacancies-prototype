const schools = require('../data/orgs.json')
const users = require('../data/users.json')
const {
  ensureJobseekerAlerts,
  importGuestAlertOnRegister,
  addJobAlertFromForm,
  updateAlertFromForm,
  findAlert,
  getAlertEditForm,
  ensureSignedInJobseeker
} = require('../lib/jobseeker-session')
const {
  getTrn,
  setTrn,
  formatTrnForDisplay,
  validateTrn,
  validateName,
  nameErrorSummaryList,
  trnErrorSummaryList
} = require('../lib/personal-details')

function isSameSitePath (value) {
  return typeof value === 'string' &&
    value.startsWith('/') &&
    !value.startsWith('//') &&
    !value.includes('\\') &&
    !value.includes('://')
}

module.exports = router => {

  router.get('/account/sign-in/hiring-staff', (req, res) => {
    res.render('account/sign-in-hiring-staff')
  })

  router.get('/account/sign-in/jobseeker', (req, res) => {
    res.render('account/sign-in-jobseeker', {
      returnUrl: req.query.returnUrl
    })
  })

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
    const user = ensureSignedInJobseeker(req, users)
    let jobAlertForm = {}
    let editingAlertId = null

    if (req.query.alertId) {
      const alert = findAlert(req.session, req.query.alertId)
      const editForm = getAlertEditForm(alert)
      if (alert && editForm) {
        jobAlertForm = editForm
        editingAlertId = alert.id
      }
    }

    if (!jobAlertForm.email && user && user.emailAddress) {
      jobAlertForm = { ...jobAlertForm, email: user.emailAddress }
    }

    res.render('account/jobalerts/jobalert', {
      users,
      jobAlertForm,
      editingAlertId
    })
  })

  router.post('/jobalerts/jobalert', (req, res) => {
    ensureSignedInJobseeker(req, users)
    const alertId = req.body.alertId
    if (alertId && updateAlertFromForm(req.session, alertId, req.body)) {
      req.session.data.jobAlertUpdated = true
    } else {
      addJobAlertFromForm(req.session, req.body)
      req.session.data.jobAlertCreated = true
    }
    res.redirect('/jobseekers/subscriptions')
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
    req.session.data.signedIn = true
    ensureJobseekerAlerts(req.session)

    if (isSameSitePath(req.body.returnUrl)) {
      res.redirect(req.body.returnUrl)
    } else {

      if(req.session.user.profile.previousApplication == 'Yes'){
        res.redirect('/account/new/confirmation')
      }else{
        res.redirect('/jobs')
      }
    }
  })

  router.get('/account', (req, res) => {
    res.redirect('/account/personal-details')
  })

  router.get('/account/your-account', (req, res) => {
    ensureSignedInJobseeker(req, users)
    res.render('account/index', {
      user: req.session.user
    })
  })

  router.get('/account/personal-details', (req, res) => {
    ensureSignedInJobseeker(req, users)
    const nameUpdated = req.session.data.personalDetailsNameUpdated === true
    const trnUpdated = req.session.data.personalDetailsTrnUpdated === true
    delete req.session.data.personalDetailsNameUpdated
    delete req.session.data.personalDetailsTrnUpdated
    res.render('account/personal-details/index', {
      user: req.session.user,
      nameUpdated,
      trnUpdated,
      trnDisplay: formatTrnForDisplay(req.session.user && req.session.user.profile)
    })
  })

  router.get('/account/personal-details/name', (req, res) => {
    if (!req.session.user) {
      return res.redirect('/account/sign-in?returnUrl=/account/personal-details/name')
    }
    const profile = req.session.user.profile || {}
    res.render('account/personal-details/name', {
      user: req.session.user,
      firstName: profile.firstName,
      lastName: profile.lastName,
      errors: {}
    })
  })

  router.post('/account/personal-details/name', (req, res) => {
    if (!req.session.user) {
      return res.redirect('/account/sign-in')
    }
    const firstName = (req.body.firstName || '').trim()
    const lastName = (req.body.lastName || '').trim()
    const errors = validateName(firstName, lastName)
    if (Object.keys(errors).length) {
      return res.render('account/personal-details/name', {
        user: req.session.user,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        errors,
        errorList: nameErrorSummaryList(errors)
      })
    }
    if (!req.session.user.profile) req.session.user.profile = {}
    req.session.user.profile.firstName = firstName
    req.session.user.profile.lastName = lastName
    req.session.data.personalDetailsNameUpdated = true
    res.redirect('/account/personal-details')
  })

  router.get('/account/personal-details/trn', (req, res) => {
    if (!req.session.user) {
      return res.redirect('/account/sign-in?returnUrl=/account/personal-details/trn')
    }
    res.render('account/personal-details/trn', {
      user: req.session.user,
      trnValue: getTrn(req.session.user.profile),
      errors: {},
      errorList: []
    })
  })

  router.post('/account/personal-details/trn', (req, res) => {
    if (!req.session.user) {
      return res.redirect('/account/sign-in')
    }
    const trnValue = (req.body.trn || '').trim()
    const trnError = validateTrn(trnValue)
    if (trnError) {
      return res.render('account/personal-details/trn', {
        user: req.session.user,
        trnValue: req.body.trn,
        errors: { trn: trnError },
        errorList: trnErrorSummaryList(trnError)
      })
    }
    if (!req.session.user.profile) req.session.user.profile = {}
    setTrn(req.session.user.profile, trnValue)
    req.session.data.personalDetailsTrnUpdated = true
    res.redirect('/account/personal-details')
  })

  router.get('/account/sign-out', (req, res) => {
    res.locals.user = req.session.user = null
    req.session.data.signedIn = false
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
    
    res.redirect('/account/your-account')
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
    
    res.redirect('/account/your-account')
  })

  router.get('/account/new/confirmation2', (req, res) => {

    res.render('account/new/confirmation2', {
      user: req.session.user
    })
  })


  router.post('/account/new/confirmation2', (req, res) => {
    req.session.data.signedIn = true
    importGuestAlertOnRegister(req.session)

    var previousApplication = req.session.user.profile.previousApplication

    if (previousApplication == "Yes"){
      req.flash('success', 'You have recently submitted a job application, so some of your details have been imported into your profile.')
    }

    req.session.data.jobAlertsImported = true
    res.redirect('/jobseekers/subscriptions')

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
    req.flash('success', 'Your account has been closed. If you want to reactivate your account at any point, you can just sign back in with your email address.')
    res.redirect('/home')
  })

  router.post('/account/delete-account-confirmation', (req, res) => {

    req.flash('success', 'Your account has been deleted. To create new job alerts and apply for jobs through Teaching Vacancies, you can <a href="#">create a new jobseeker account</a>.')
  
    res.redirect('/')

  })


}
