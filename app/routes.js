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
    let jobPhase = req.session.data.job.phase

    if ( (jobRole == "sendCo") && ((userType == "multiSchoolMat") || (userType == "multiSchoolLA")) ) {
      res.redirect('/prototypes/scope_expansion/1-job-location')
    } else if ( ((jobRole == "teacher") || (jobRole == "leadership") || (jobRole == "education support")) ) {
      res.redirect('/prototypes/scope_expansion/0a-job-role-details') 
    } else if (jobRole == "bussinessManager") {
      res.redirect('/404') 
    } else if ( (jobRole == "sendCo") && (userType == "singleSchool") && (jobPhase == "More than one phase") ) {
      res.redirect('/prototypes/scope_expansion/2a-education-phase-setup')   
    } else {
      res.redirect('/prototypes/scope_expansion/2-job-details')
    }   
  })
  
  // Job role (v1)
  router.post('/prototypes/scope_expansion_v1/0-job-role-answer', function (req, res) {
  
    let jobRole = req.session.data.job.role
    let userType = req.session.data.job.userType
    let jobPhase = req.session.data.job.phase

    if ( (jobRole == "sendCo") && ((userType == "multiSchoolMat") || (userType == "multiSchoolLA")) ) {
      res.redirect('/prototypes/scope_expansion_v1/1-job-location')
    } else if ( ((jobRole == "teacher") || (jobRole == "leadership") || (jobRole == "education support")) ) {
      res.redirect('/prototypes/scope_expansion_v1/0a-job-role-details') 
    } else if (jobRole == "bussinessManager") {
      res.redirect('/404')  
    } else if ( (jobRole == "sendCo") && (userType == "singleSchool") && (jobPhase == "More than one phase") ) {
      res.redirect('/prototypes/scope_expansion/2a-education-phase-setup')  
    } else {
      res.redirect('/prototypes/scope_expansion_v1/2-job-details')
    }   
  })
  
  // Job role details (v1)
  router.post('/prototypes/scope_expansion_v1/0-job-role-details-answer', function (req, res) {
  
    // let jobPhase = req.session.data.job.phase
    let userType = req.session.data.job.userType
    
    // If mutli-school user go to location
    if ((userType == "multiSchoolMat") || (userType == "multiSchoolLa")) {
      res.redirect('/prototypes/scope_expansion_v1/1-job-location')
    } else {
      res.redirect('/prototypes/scope_expansion_v1/2-job-details')
    } 
  })
  
  // Job role details
  router.post('/prototypes/scope_expansion/0-job-role-details-answer', function (req, res) {
  
    let jobPhase = req.session.data.job.phase
    let userType = req.session.data.job.userType
    
    // If all-through and single school then skip location and go to phase
    if ( (jobPhase == "More than one phase") && (userType == "singleSchool") ) {
      res.redirect('/prototypes/scope_expansion/2a-education-phase-setup')
    } else if ((userType == "multiSchoolMat") || (userType == "multiSchoolLa")) {
      res.redirect('/prototypes/scope_expansion/1-job-location')
    } else {
      res.redirect('/prototypes/scope_expansion/2-job-details')
    } 
  })
  
  // Job location MAT (v1)
  router.post('/prototypes/scope_expansion_v1/job-role-answer-mat', function (req, res) {
    
    let selectedLocationsMat = req.session.data.job.locationMat
    let jobPhase = req.session.data.job.phase

    if (selectedLocationsMat == "At one school in the trust") {
      res.redirect('/prototypes/scope_expansion_v1/1b-job-location-single')
    } else if (selectedLocationsMat == "At more than one school in the trust") {
      res.redirect('/prototypes/scope_expansion_v1/1a-job-location-many')
    } else {
      res.redirect('/prototypes/scope_expansion_v1/2-job-details')
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
    } else if ((selectedLocationsMat == "At the trust's head office") && (jobPhase == "More than one phase") )  {
      res.redirect('/prototypes/scope_expansion/2a-education-phase-setup')
    } else {
      res.redirect('/prototypes/scope_expansion/2-job-details')
    }

  })

  // Job Location LA (v1)
  router.post('/prototypes/scope_expansion_v1/job-role-answer-la', function (req, res) {
    
    let selectedLocationsLa = req.session.data.job.locationLa

    if (selectedLocationsLa == "At one school") {
      res.redirect('/prototypes/scope_expansion_v1/1b-job-location-single')
    } else {
      res.redirect('/prototypes/scope_expansion_v1/1a-job-location-many')
    }
  })

  // Job Location LA
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

    if (jobPhase == "More than one phase") {
      res.redirect('/prototypes/scope_expansion/2a-education-phase-setup')
    } else {
      res.redirect('/prototypes/scope_expansion/2-job-details')
    }  
    
  })

  // applications
  
  // Job role details (v1)
  router.get('/prototypes/application/expanded/job-01/applicant/:applicationId', function (req, res) {
  
    let applicationId = req.params.applicationId

    res.render('prototypes/application/expanded/job-01/applicant/index.html', {
      applicationId: applicationId
      })
    
  })
  
  // Job role details (v1)
  router.get('/prototypes/application/expanded/job-01/applicant/:applicationId/mark-reviewed', function (req, res) {
  
    let applicationId = req.params.applicationId

    const applications = req.session.data.applications

    let application = applications.find(application => application.id == applicationId)

    application.status = "Reviewed"

    

    console.log(application)

    res.redirect(`/prototypes/application/expanded/job-01/applicant/${applicationId}`)
    
  })
  
module.exports = router
