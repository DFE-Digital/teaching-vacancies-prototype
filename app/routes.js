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

  // Job role
  router.post('/prototypes/scope_expansion/0-job-role-answer', function (req, res) {
  
    let jobRole = req.session.data.job.role
    let userType = req.session.data.job.userType

    if ( (jobRole == "sendCo") && ((userType == "multiSchoolMat") || (userType == "multiSchoolLA")) ) {
      res.redirect('/prototypes/scope_expansion/1-job-location')
    } else if ( ((jobRole == "teacher") || (jobRole == "leadership") || (jobRole == "education support")) ) {
      res.redirect('/prototypes/scope_expansion/0a-job-role-details') 
    } else if (jobRole == "bussinessManager") {
      res.redirect('/404')  
    } else {
      res.redirect('/prototypes/scope_expansion/2-job-details')
    }   
  })
  
  // Job role details
  router.post('/prototypes/scope_expansion/0-job-role-details-anwser', function (req, res) {
  
    let jobPhase = req.session.data.job.phase
    let userType = req.session.data.job.userType
    
    // If all-through and single school then skip location and go to phase
    if ( (jobPhase == "All-through") && (userType == "singleSchool") ) {
      //todo uncheck phase by default on this screen
      res.redirect('/prototypes/scope_expansion/2a-education-phase-setup')
    } else if ((userType == "multiSchoolMat") || (userType == "multiSchoolLa")) {
      res.redirect('/prototypes/scope_expansion/1-job-location')
    } else {
      res.redirect('/prototypes/scope_expansion/2-job-details')
    } 
  })
  
  // Job location MAT
  router.post('/prototypes/scope_expansion/job-role-answer-mat', function (req, res) {
    
    let selectedLocationsMat = req.session.data.job.locationMat
    let jobPhase = req.session.data.job.phase

    if (selectedLocationsMat == "At one school in the trust") {
      res.redirect('/prototypes/scope_expansion/1b-job-location-single')
    } else if (selectedLocationsMat == "At more than one school in the trust") {
      res.redirect('/prototypes/scope_expansion/1a-job-location-many')
    } else if ((selectedLocationsMat == "At the trust's head office") && (jobPhase == "All-through") )  {
      res.redirect('/prototypes/scope_expansion/2a-education-phase-setup')
    } else {
      res.redirect('/prototypes/scope_expansion/2-job-details')
    }

  })

  // Job Location
  router.post('/prototypes/scope_expansion/job-role-answer-la', function (req, res) {
    
    let selectedLocationsLa = req.session.data.job.locationLa

    if (selectedLocationsLa == "At one school") {
      res.redirect('/prototypes/scope_expansion/1b-job-location-single')
    } else {
      res.redirect('/prototypes/scope_expansion/1a-job-location-many')
    }
  })
  
  // Job Location details
  router.post('/prototypes/scope_expansion/1a-job-location-details-answer', function (req, res) {
    
    let jobPhase = req.session.data.job.phase

    if (jobPhase == "All-through") {
      //todo uncheck phase by default on this screen
      res.redirect('/prototypes/scope_expansion/2a-education-phase-setup')
    } else {
      res.redirect('/prototypes/scope_expansion/2-job-details')
    }  
    
  })
  
  // //set what ever is chosen in the job phase setup as the session phase
  // router.post('/prototypes/scope_expansion/2a-education-phase-setup-answer', function (req, res) {
    
  //   let jobPhaseSetup = req.session.data.job.phaseSetup 
    
  //   if (jobPhaseSetup == "All-through") {
  //     jobPhase = jobPhaseSetup
  //     res.redirect('/prototypes/scope_expansion/2-job-details')
  //   } else {
  //     jobPhase = jobPhaseSetup
  //     res.redirect('/prototypes/scope_expansion/2-job-details')
  //   }

  // })

module.exports = router
