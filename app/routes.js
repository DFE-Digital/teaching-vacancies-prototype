const express = require('express')
const router = express.Router()

// Add your routes here - above the module.exports line

// Branching
router.post('/examples/branching/over-18-answer', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  let over18 = req.session.data['trust-location']

  if (over18 === 'At more than one school in the trust') {
    res.redirect('/mat3/1-location-bm')
  } else if (over18 === 'Single school') {
    res.redirect('/mat3/1-location-bs')
  } else {
    res.redirect('/mat3/2-job-details')
  }
  

  // let aboutS = req.session.data['trust-location']

  // if (aboutS === 'At more than one school in the trust') {
  //   $("div#aboutTrust").hide();
  // } else {
  //   $("div#aboutTrust").show();
  // }

})


// JOB ALERTS - JULY 20
router.post('/assets/views/job_alerts2/create-1', function (req, res) {
  // Get the answer from session data
  // The name between the quotes is the same as the 'name' attribute on the input elements
  // However in JavaScript we can't use hyphens in variable names

  // MY NOTE - put the '/assets/views etc' string above into the action="" on the form tag

  let alertMethod = req.session.data['how-contacted']

  if (alertMethod === 'email') {
    res.redirect('/job_alerts2/create-success-email')
  } else if (alertMethod === 'text') {
    res.redirect('/job_alerts2/create-success-sms')
  } else {
    res.redirect('/job_alerts2/create-success-email')
  }

})

  // Scope expansion July 2021

  router.post('/prototypes/scope_expansion/job-role-answer-mat', function (req, res) {
  
    let selectedLocationsMat = req.session.data.job.locationMat

    if (selectedLocationsMat == "At one school in the trust") {
      res.redirect('/prototypes/scope_expansion/0b-job-location-single')
    } else if (selectedLocationsMat == "At more than one school in the trust") {
      res.redirect('/prototypes/scope_expansion/0a-job-location-many')
    } else {
      res.redirect('/prototypes/scope_expansion/1-job-role')
    }   
  })
  
  router.post('/prototypes/scope_expansion/job-role-answer-la', function (req, res) {
    
    let selectedLocationsLa = req.session.data.job.locationLa

    if (selectedLocationsLa == "At one school") {
      res.redirect('/prototypes/scope_expansion/0b-job-location-single')
    } else {
      res.redirect('/prototypes/scope_expansion/0a-job-location-many')
    }
  })
  
  router.post('/prototypes/scope_expansion/2-job-details-answer', function (req, res) {
    
    let selectedWorkingPattern = req.session.data.job.workingPattern

    if ( (selectedWorkingPattern == "Full time") && (selectedWorkingPattern != "Part time") && (selectedWorkingPattern != "Term time") && (selectedWorkingPattern != "Job share") ) {
      res.redirect('/prototypes/scope_expansion/3-pay-package')
    } else {
      res.redirect('/prototypes/scope_expansion/2b-days-hours') 
    }
  })

module.exports = router
