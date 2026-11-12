const schools = require('../data/orgs.json')
const users = require('../data/users.json')
const englandTowns = require('../data/england-towns')
const englandTownsJson = englandTowns.englandTownsJson
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
  trnErrorSummaryList,
  validatePhoneNumber,
  phoneNumberErrorSummaryList,
  applyDemoPersonalDetails,
  normaliseNiNumber,
  validateJobseekerProfileCapture,
  validateJobseekerProfileCaptureV2,
  validateJobseekerProfileCaptureTrnPostcode,
  validateDateOfBirth,
  validateNationalInsuranceNumber,
  validateTownAndPostcode,
  validatePostcodeRequired,
  normalisePostcode,
  resolveLocationOnProfile,
  dateOfBirthErrorSummaryList,
  niErrorSummaryList,
  locationErrorSummaryList,
  jobseekerProfileCaptureErrorSummaryList,
  jobseekerProfileCaptureV2ErrorSummaryList,
  jobseekerProfileCaptureTrnPostcodeErrorSummaryList,
  formatDateOfBirthForDisplay,
  formatNiForDisplay,
  formatTownForDisplay,
  formatPostcodeForDisplay
} = require('../lib/personal-details')

function ensurePrototypeSignedIn (req) {
  if (!req.session.user) {
    req.session.user = users.find(user => user.emailAddress === 'jbloggs@example.com') || users[0]
  }
  req.session.data.signedIn = true
  if (!req.session.user.profile) req.session.user.profile = {}
}

function renderAddYourDetails (req, res, options) {
  const profile = (req.session.user && req.session.user.profile) || {}
  resolveLocationOnProfile(profile)
  const reposted = options.reposted === true
  res.render('account/add-your-details', {
    firstName: reposted && options.firstName != null ? options.firstName : '',
    lastName: reposted && options.lastName != null ? options.lastName : '',
    phoneNumber: reposted && options.phoneNumber != null ? options.phoneNumber : '',
    trn: reposted && options.trn != null ? options.trn : '',
    postcode: reposted && options.postcode != null ? options.postcode : '',
    errors: options.errors || {},
    errorList: options.errorList || [],
    englandTownsJson
  })
}

function handleAddYourDetailsWithoutDobPost (req, res) {
  if (req.body.skip === 'true') {
    const profile = req.session.user.profile
    applyDemoPersonalDetails(profile)
    profile.profileCaptureComplete = true
    req.session.data.personalDetailsCaptureComplete = true
    return redirectAfterProfileCapture(req, res)
  }

  const fields = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    phoneNumber: req.body.phoneNumber,
    trn: req.body.trn,
    postcode: req.body.postcode
  }

  const { errors } = validateJobseekerProfileCaptureTrnPostcode(fields)
  if (Object.keys(errors).length) {
    return renderAddYourDetails(req, res, {
      ...fields,
      reposted: true,
      errors,
      errorList: jobseekerProfileCaptureTrnPostcodeErrorSummaryList(errors)
    })
  }

  const profile = req.session.user.profile
  profile.firstName = fields.firstName.trim()
  profile.lastName = fields.lastName.trim()
  profile.phoneNumber = fields.phoneNumber.trim()
  setTrn(profile, fields.trn)
  const postcodeValue = (fields.postcode || '').trim()
  if (postcodeValue) {
    profile.postcode = normalisePostcode(postcodeValue)
  } else {
    delete profile.postcode
  }
  delete profile.townOrPostcode
  profile.profileCaptureComplete = true

  req.session.data.personalDetailsCaptureComplete = true
  return redirectAfterProfileCapture(req, res)
}

function renderAddYourDetails2 (req, res, options) {
  const profile = (req.session.user && req.session.user.profile) || {}
  resolveLocationOnProfile(profile)
  const dob = profile.dateOfBirth || {}
  const reposted = options.reposted === true
  res.render('account/add-your-details-2', {
    firstName: reposted && options.firstName != null ? options.firstName : '',
    lastName: reposted && options.lastName != null ? options.lastName : '',
    dateOfBirthDay: options.dateOfBirthDay != null ? options.dateOfBirthDay : dob.day,
    dateOfBirthMonth: options.dateOfBirthMonth != null ? options.dateOfBirthMonth : dob.month,
    dateOfBirthYear: options.dateOfBirthYear != null ? options.dateOfBirthYear : dob.year,
    trn: reposted && options.trn != null ? options.trn : '',
    town: options.town != null ? options.town : profile.town,
    postcode: options.postcode != null ? options.postcode : profile.postcode,
    errors: options.errors || {},
    errorList: options.errorList || [],
    englandTownsJson
  })
}

function renderAddYourDetails3 (req, res, options) {
  const profile = (req.session.user && req.session.user.profile) || {}
  resolveLocationOnProfile(profile)
  const dob = profile.dateOfBirth || {}
  const reposted = options.reposted === true
  res.render('account/add-your-details-3', {
    firstName: reposted && options.firstName != null ? options.firstName : '',
    lastName: reposted && options.lastName != null ? options.lastName : '',
    dateOfBirthDay: options.dateOfBirthDay != null ? options.dateOfBirthDay : dob.day,
    dateOfBirthMonth: options.dateOfBirthMonth != null ? options.dateOfBirthMonth : dob.month,
    dateOfBirthYear: options.dateOfBirthYear != null ? options.dateOfBirthYear : dob.year,
    trn: reposted && options.trn != null ? options.trn : '',
    town: options.town != null ? options.town : profile.town,
    postcode: options.postcode != null ? options.postcode : profile.postcode,
    errors: options.errors || {},
    errorList: options.errorList || [],
    englandTownsJson
  })
}

function handleAddYourDetailsTrnPost (req, res, renderPage) {
  if (req.body.skip === 'true') {
    const profile = req.session.user.profile
    applyDemoPersonalDetails(profile)
    profile.profileCaptureComplete = true
    req.session.data.personalDetailsCaptureComplete = true
    return redirectAfterProfileCapture(req, res)
  }

  const fields = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    dateOfBirthDay: req.body['dateOfBirth-day'],
    dateOfBirthMonth: req.body['dateOfBirth-month'],
    dateOfBirthYear: req.body['dateOfBirth-year'],
    trn: req.body.trn,
    town: req.body.town,
    postcode: req.body.postcode
  }

  const { errors, dateOfBirth } = validateJobseekerProfileCaptureV2(fields)
  if (Object.keys(errors).length) {
    return renderPage(req, res, {
      ...fields,
      reposted: true,
      errors,
      errorList: jobseekerProfileCaptureV2ErrorSummaryList(errors)
    })
  }

  const profile = req.session.user.profile
  profile.firstName = fields.firstName.trim()
  profile.lastName = fields.lastName.trim()
  profile.dateOfBirth = dateOfBirth
  setTrn(profile, fields.trn)
  const townValue = (fields.town || '').trim()
  if (townValue) {
    profile.town = townValue
  } else {
    delete profile.town
  }
  const postcodeValue = (fields.postcode || '').trim()
  if (postcodeValue) {
    profile.postcode = normalisePostcode(postcodeValue)
  } else {
    delete profile.postcode
  }
  delete profile.townOrPostcode
  profile.profileCaptureComplete = true

  req.session.data.personalDetailsCaptureComplete = true
  return redirectAfterProfileCapture(req, res)
}

function handleAddYourDetails2Post (req, res) {
  return handleAddYourDetailsTrnPost(req, res, renderAddYourDetails2)
}

function handleAddYourDetails3Post (req, res) {
  return handleAddYourDetailsTrnPost(req, res, renderAddYourDetails3)
}

function redirectAfterProfileCapture (req, res) {
  const afterCapture = normalizeReturnUrl(req.session.data.afterProfileCaptureReturnUrl)
  if (afterCapture) {
    delete req.session.data.afterProfileCaptureReturnUrl
    return res.redirect(afterCapture)
  }
  return res.redirect('/account/personal-details')
}
const {
  captureSignInReturnUrl,
  normalizeReturnUrl,
  resolveSignInReturnUrl,
  jobseekerSignInHref,
  oneLoginStartHref
} = require('../lib/return-url')

module.exports = router => {

  router.use((req, res, next) => {
    res.locals.englandTownsJson = englandTownsJson
    next()
  })

  router.get('/account/sign-in/hiring-staff', (req, res) => {
    res.render('account/sign-in-hiring-staff')
  })

  const jobseekerSignInContextByFrom = {
    savejob: 'You need to sign in to save this job.',
    applyjob: 'You need to sign in to apply for this job.',
    savealert: 'You need to sign in to create a job alert.'
  }

  router.get('/account/sign-in/jobseeker', (req, res) => {
    req.session.data.jobseekerProfileCaptureRequired = true
    const returnUrl = captureSignInReturnUrl(req)
    const from = typeof req.query.from === 'string' ? req.query.from.trim() : ''
    const signInContextMessage = jobseekerSignInContextByFrom[from] || null
    res.render('account/sign-in-jobseeker', {
      returnUrl,
      oneLoginStartHref: oneLoginStartHref(returnUrl),
      signInFrom: from,
      signInContextMessage
    })
  })

  router.get('/account/sign-in', (req, res) => {
    if (Object.prototype.hasOwnProperty.call(req.query, 'new-user')) {
      captureSignInReturnUrl(req)
      ensurePrototypeSignedIn(req)
      req.session.data.jobseekerProfileCaptureRequired = false
      const returnUrl = normalizeReturnUrl(req.query.returnUrl)
      if (returnUrl) {
        req.session.data.afterProfileCaptureReturnUrl = returnUrl
      }
      let capturePath = '/account/add-your-details'
      if (req.query.capture === '2') {
        capturePath = '/account/add-your-details-2'
      } else if (req.query.capture === '3') {
        capturePath = '/account/add-your-details-3'
      }
      return res.redirect(capturePath)
    }

    const returnUrl = captureSignInReturnUrl(req)
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
      returnUrl,
      jobseekerSignInHref: jobseekerSignInHref(returnUrl),
      options
    })
  })

  router.get('/account/sign-in-as-profile', (req, res) => {
    res.render('account/sign-in-as-profile', {
      users
    })
  })

  function isJobseekerSignedIn (req) {
    return !!(req.session.data && req.session.data.signedIn === true)
  }

  function jobAlertSignInHref (returnUrl) {
    const params = new URLSearchParams({ from: 'savealert' })
    if (returnUrl) {
      params.set('returnUrl', returnUrl)
    }
    return '/account/sign-in/jobseeker?' + params.toString()
  }

  router.get('/jobalerts/jobalert', (req, res) => {
    let jobAlertForm = {}
    let editingAlertId = null

    if (req.query.alertId) {
      if (!isJobseekerSignedIn(req)) {
        const returnUrl = '/jobalerts/jobalert?alertId=' + encodeURIComponent(req.query.alertId)
        return res.redirect(jobAlertSignInHref(returnUrl))
      }
      ensureSignedInJobseeker(req, users)
      const alert = findAlert(req.session, req.query.alertId)
      const editForm = getAlertEditForm(alert)
      if (alert && editForm) {
        jobAlertForm = editForm
        editingAlertId = alert.id
      }
    }

    const user = isJobseekerSignedIn(req) ? req.session.user : null
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
    if (!isJobseekerSignedIn(req)) {
      return res.redirect(jobAlertSignInHref('/jobalerts/jobalert'))
    }
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
      res.locals.user = req.session.user = users.find(user => user.emailAddress === 'jbloggs@example.com') || users[0]
    }
    req.session.data.signedIn = true
    if (!req.session.user.profile) req.session.user.profile = {}

    const needsProfileCapture = req.session.data.jobseekerProfileCaptureRequired === true
    if (!needsProfileCapture) {
      applyDemoPersonalDetails(req.session.user.profile)
    }
    ensureJobseekerAlerts(req.session)

    if (needsProfileCapture) {
      delete req.session.data.jobseekerProfileCaptureRequired
      const returnUrl = resolveSignInReturnUrl(req, req.body.returnUrl)
      if (returnUrl) {
        req.session.data.afterProfileCaptureReturnUrl = returnUrl
      }
      return res.redirect('/account/add-your-details')
    }

    const returnUrl = resolveSignInReturnUrl(req, req.body.returnUrl)
    if (returnUrl) {
      res.redirect(returnUrl)
    } else if (req.session.user.profile.previousApplication == 'Yes') {
      res.redirect('/account/new/confirmation')
    } else {
      res.redirect('/jobseekers/account')
    }
  })

  router.get('/account/add-your-details', (req, res) => {
    if (!req.session.data.signedIn) {
      return res.redirect('/account/sign-in/jobseeker')
    }
    ensurePrototypeSignedIn(req)
    const profile = req.session.user.profile
    if (profile && !profile.profileCaptureComplete) {
      delete profile.firstName
      delete profile.lastName
    }
    renderAddYourDetails(req, res, {})
  })

  router.post('/account/add-your-details', (req, res) => {
    if (!req.session.data.signedIn) {
      return res.redirect('/account/sign-in/jobseeker')
    }
    ensurePrototypeSignedIn(req)

    return handleAddYourDetailsWithoutDobPost(req, res)
  })

  router.get('/account/add-your-details-2', (req, res) => {
    if (!req.session.data.signedIn) {
      return res.redirect('/account/sign-in/jobseeker')
    }
    ensurePrototypeSignedIn(req)
    const profile = req.session.user.profile
    if (profile && !profile.profileCaptureComplete) {
      delete profile.firstName
      delete profile.lastName
    }
    renderAddYourDetails2(req, res, {})
  })

  router.post('/account/add-your-details-2', (req, res) => {
    if (!req.session.data.signedIn) {
      return res.redirect('/account/sign-in/jobseeker')
    }
    ensurePrototypeSignedIn(req)
    return handleAddYourDetails2Post(req, res)
  })

  router.get('/account/add-your-details-3', (req, res) => {
    if (!req.session.data.signedIn) {
      return res.redirect('/account/sign-in/jobseeker')
    }
    ensurePrototypeSignedIn(req)
    const profile = req.session.user.profile
    if (profile && !profile.profileCaptureComplete) {
      delete profile.firstName
      delete profile.lastName
    }
    renderAddYourDetails3(req, res, {})
  })

  router.post('/account/add-your-details-3', (req, res) => {
    if (!req.session.data.signedIn) {
      return res.redirect('/account/sign-in/jobseeker')
    }
    ensurePrototypeSignedIn(req)
    return handleAddYourDetails3Post(req, res)
  })

  router.get('/account', (req, res) => {
    res.redirect('/jobseekers/account')
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
    const dateOfBirthUpdated = req.session.data.personalDetailsDateOfBirthUpdated === true
    const niUpdated = req.session.data.personalDetailsNiUpdated === true
    const townOrPostcodeUpdated = req.session.data.personalDetailsTownOrPostcodeUpdated === true
    const phoneUpdated = req.session.data.personalDetailsPhoneUpdated === true
    const captureComplete = req.session.data.personalDetailsCaptureComplete === true
    delete req.session.data.personalDetailsNameUpdated
    delete req.session.data.personalDetailsTrnUpdated
    delete req.session.data.personalDetailsDateOfBirthUpdated
    delete req.session.data.personalDetailsNiUpdated
    delete req.session.data.personalDetailsTownOrPostcodeUpdated
    delete req.session.data.personalDetailsPhoneUpdated
    delete req.session.data.personalDetailsCaptureComplete
    const profile = req.session.user && req.session.user.profile
    if (profile) resolveLocationOnProfile(profile)
    res.render('account/personal-details/index', {
      user: req.session.user,
      nameUpdated,
      trnUpdated,
      dateOfBirthUpdated,
      niUpdated,
      townOrPostcodeUpdated,
      phoneUpdated,
      captureComplete,
      trnDisplay: formatTrnForDisplay(profile),
      dateOfBirthDisplay: formatDateOfBirthForDisplay(profile),
      niDisplay: formatNiForDisplay(profile),
      townDisplay: formatTownForDisplay(profile),
      postcodeDisplay: formatPostcodeForDisplay(profile)
    })
  })

  router.get('/account/personal-details/name', (req, res) => {
    ensureSignedInJobseeker(req, users)
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
    ensureSignedInJobseeker(req, users)
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

  router.get('/account/personal-details/phone-number', (req, res) => {
    ensureSignedInJobseeker(req, users)
    const profile = req.session.user.profile || {}
    res.render('account/personal-details/phone-number', {
      user: req.session.user,
      phoneNumber: profile.phoneNumber || '',
      errors: {},
      errorList: []
    })
  })

  router.post('/account/personal-details/phone-number', (req, res) => {
    ensureSignedInJobseeker(req, users)
    const phoneNumber = (req.body.phoneNumber || '').trim()
    const phoneError = validatePhoneNumber(phoneNumber)
    if (phoneError) {
      return res.render('account/personal-details/phone-number', {
        user: req.session.user,
        phoneNumber: req.body.phoneNumber,
        errors: { phoneNumber: phoneError },
        errorList: phoneNumberErrorSummaryList(phoneError)
      })
    }
    if (!req.session.user.profile) req.session.user.profile = {}
    req.session.user.profile.phoneNumber = phoneNumber
    req.session.data.personalDetailsPhoneUpdated = true
    res.redirect('/account/personal-details')
  })

  router.get('/account/personal-details/date-of-birth', (req, res) => {
    ensureSignedInJobseeker(req, users)
    const dob = (req.session.user.profile && req.session.user.profile.dateOfBirth) || {}
    res.render('account/personal-details/date-of-birth', {
      user: req.session.user,
      dateOfBirthDay: dob.day,
      dateOfBirthMonth: dob.month,
      dateOfBirthYear: dob.year,
      errors: {},
      errorList: []
    })
  })

  router.post('/account/personal-details/date-of-birth', (req, res) => {
    if (!req.session.user) {
      return res.redirect('/account/sign-in')
    }
    const dobResult = validateDateOfBirth(
      req.body['dateOfBirth-day'],
      req.body['dateOfBirth-month'],
      req.body['dateOfBirth-year']
    )
    if (Object.keys(dobResult.errors).length) {
      return res.render('account/personal-details/date-of-birth', {
        user: req.session.user,
        dateOfBirthDay: req.body['dateOfBirth-day'],
        dateOfBirthMonth: req.body['dateOfBirth-month'],
        dateOfBirthYear: req.body['dateOfBirth-year'],
        errors: dobResult.errors,
        errorList: dateOfBirthErrorSummaryList(dobResult.errors)
      })
    }
    if (!req.session.user.profile) req.session.user.profile = {}
    req.session.user.profile.dateOfBirth = dobResult.dateOfBirth
    req.session.data.personalDetailsDateOfBirthUpdated = true
    res.redirect('/account/personal-details')
  })

  router.get('/account/personal-details/national-insurance-number', (req, res) => {
    ensureSignedInJobseeker(req, users)
    const profile = req.session.user.profile || {}
    res.render('account/personal-details/national-insurance-number', {
      user: req.session.user,
      nationalInsuranceNumber: profile.nationalInsuranceNumber,
      errors: {},
      errorList: []
    })
  })

  router.post('/account/personal-details/national-insurance-number', (req, res) => {
    if (!req.session.user) {
      return res.redirect('/account/sign-in')
    }
    const niError = validateNationalInsuranceNumber(req.body.nationalInsuranceNumber)
    if (niError) {
      return res.render('account/personal-details/national-insurance-number', {
        user: req.session.user,
        nationalInsuranceNumber: req.body.nationalInsuranceNumber,
        errors: { nationalInsuranceNumber: niError },
        errorList: niErrorSummaryList(niError)
      })
    }
    if (!req.session.user.profile) req.session.user.profile = {}
    req.session.user.profile.nationalInsuranceNumber = normaliseNiNumber(req.body.nationalInsuranceNumber)
    req.session.data.personalDetailsNiUpdated = true
    res.redirect('/account/personal-details')
  })

  router.get('/account/personal-details/town-or-postcode', (req, res) => {
    ensureSignedInJobseeker(req, users)
    const profile = req.session.user.profile || {}
    resolveLocationOnProfile(profile)
    res.render('account/personal-details/town-or-postcode', {
      user: req.session.user,
      postcode: profile.postcode,
      errors: {},
      errorList: []
    })
  })

  router.post('/account/personal-details/town-or-postcode', (req, res) => {
    ensureSignedInJobseeker(req, users)
    const postcodeError = validatePostcodeRequired(req.body.postcode)
    if (postcodeError) {
      return res.render('account/personal-details/town-or-postcode', {
        user: req.session.user,
        postcode: req.body.postcode,
        errors: { postcode: postcodeError },
        errorList: [{ text: postcodeError, href: '#postcode' }]
      })
    }
    if (!req.session.user.profile) req.session.user.profile = {}
    delete req.session.user.profile.town
    const postcodeValue = (req.body.postcode || '').trim()
    if (postcodeValue) {
      req.session.user.profile.postcode = normalisePostcode(postcodeValue)
    } else {
      delete req.session.user.profile.postcode
    }
    delete req.session.user.profile.townOrPostcode
    req.session.data.personalDetailsTownOrPostcodeUpdated = true
    res.redirect('/account/personal-details')
  })

  router.get('/account/sign-out', (req, res) => {
    res.locals.user = req.session.user = null
    req.session.data.signedIn = false
    res.redirect('/home')
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
