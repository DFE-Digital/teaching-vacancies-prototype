
const express = require('express')
const router = express.Router()
const path = require('path')

// Functions

// Loosely copied from /lib/utils
// Allows a template to live at 'foo/index' and be served from 'foo'
// The kit normally does this by defualt, but not if you want to do your
// own GET / POST routes
const newRender = (path, res, next, ...args) => {

  // Try to render the path
  res.render(path, ...args, function (error, html) {
    if (!error) {
      // Success - send the response
      res.set({ 'Content-type': 'text/html; charset=utf-8' })
      res.end(html)
      return
    }
    if (!error.message.startsWith('template not found')) {
      // We got an error other than template not found - call next with the error
      next(error)
      return
    }
    if (!path.endsWith('/index')) {
      // Maybe it's a folder - try to render [path]/index.html
      newRender(path + '/index', res, next, ...args)
      return
    }
    // We got template not found both times - call next to trigger the 404 page
    next()
  })
}

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

  // Single job routes

  // View a single job
  router.get('/prototypes/application/expanded/dashboard/job/:jobId', function (req, res) {
  
    let jobId = req.params.jobId

    res.render('prototypes/application/expanded/dashboard/job/index.html', {
      jobId: jobId
    })
    
  })

  // View the applications tab of a job
  router.get('/prototypes/application/expanded/dashboard/job/:jobId/applications', function (req, res) {
  
    let jobId = req.params.jobId

    res.render('prototypes/application/expanded/dashboard/job/applications.html', {
      jobId: jobId
    })
    
  })
  
  // View the stats tab of a job
  router.get('/prototypes/application/expanded/dashboard/job/:jobId/interviews', function (req, res) {
  
    let jobId = req.params.jobId

    res.render('prototypes/application/expanded/dashboard/job/interviews.html', {
      jobId: jobId
    })
    
  })

  // View the stats tab of a job
  router.get('/prototypes/application/expanded/dashboard/job/:jobId/statistics', function (req, res) {
  
    let jobId = req.params.jobId

    res.render('prototypes/application/expanded/dashboard/job/statistics.html', {
      jobId: jobId
    })
    
  })
  
  // View a single application of a job
  router.get('/prototypes/application/expanded/dashboard/job/:jobId/applicant/:applicationId', function (req, res) {
  
    let applicationId = req.params.applicationId
    let jobId = req.params.jobId
    const applications = req.session.data.applications
    // let application = applications.find(application => application.id == applicationId)
    let application = applications[applicationId]

    // is the status "unread"?
    if (application.status == "Unread") {
      // then empty the status
      application.status = ""
    }

    res.render('prototypes/application/expanded/dashboard/job/applicant/index.html', {
      applicationId: applicationId,
      jobId: jobId
    })
    
  })
  
  // Render a single applications timeline of a job
  // router.get('/prototypes/application/expanded/dashboard/job/:jobId/applicant/:applicationId/timeline', function (req, res) {
  
  //   let applicationId = req.params.applicationId
  //   let jobId = req.params.jobId

  //   res.render('prototypes/application/expanded/dashboard/job/applicant/timeline.html', {
  //     applicationId: applicationId,
  //     jobId: jobId
  //   })
    
  // })
  
  // Mark an application as reviewed and return to all applicatios for that job
  router.get('/prototypes/application/expanded/dashboard/job/:jobId/applicant/:applicationId/mark-reviewed', function (req, res) {
  
    let applicationId = req.params.applicationId
    let jobId = req.params.jobId
    const applications = req.session.data.applications
    // let application = applications.find(application => application.id == applicationId)
    let application = applications[applicationId]

    application.status = "Reviewed"

    res.redirect(`/prototypes/application/expanded/dashboard/job/${jobId}/applications`)
    
  })
  
  // Mark an application as rejected
  // router.get('/prototypes/application/expanded/dashboard/job/:jobId/applicant/:applicationId/reject', function (req, res) {
  
  //   let applicationId = req.params.applicationId
  //   let jobId = req.params.jobId

  //   res.render('prototypes/application/expanded/dashboard/job/applicant/reject/index.html', {
  //     applicationId: applicationId,
  //     jobId: jobId
  //   })
    
  // })
  
  // Are you sending the applicant a rejection email?
  router.post('/prototypes/application/expanded/dashboard/job/:jobId/applicant/:applicationId/reject', function (req, res) {
  
    let applicationId = req.params.applicationId
    let jobId = req.params.jobId
    let sendRejectionEmailAnswer = req.session.data.application.sendRejectionEmail

    if (sendRejectionEmailAnswer == "Yes") {
      res.redirect(`/prototypes/application/expanded/dashboard/job/${jobId}/applicant/${applicationId}/reject/rejection-reason`)
    } else {
      res.redirect(`/prototypes/application/expanded/dashboard/job/${jobId}/applicant/${applicationId}/reject/confirm-no-email`)
    }
    
  })
  
  // Render the reject confirmation screen (no email sent)
  // router.get('/prototypes/application/expanded/dashboard/job/:jobId/applicant/:applicationId/reject/confirm-no-email', function (req, res) {
  
  //   let applicationId = req.params.applicationId
  //   let jobId = req.params.jobId

  //   res.render('prototypes/application/expanded/dashboard/job/applicant/reject/confirm-no-email.html', {
  //     applicationId: applicationId,
  //     jobId: jobId
  //   })
    
  // })

  // Mark an application as rejected and return to all applicatios for that job
  router.get('/prototypes/application/expanded/dashboard/job/:jobId/applicant/:applicationId/reject/confirm-rejection', function (req, res) {

    let jobId = req.params.jobId
    const applications = req.session.data.applications
    let application = applications.applicationId

    application.status = "Rejected"

    res.redirect(`/prototypes/application/expanded/dashboard/job/${jobId}/applications`)
    
  })

  // Confirm cancelation of interview and delete interview details
  router.get('/prototypes/application/expanded/dashboard/job/:jobId/applicant/:applicationId/invite/confirm-cancel-interview', function (req, res) {

    let applicationId = req.params.applicationId
    let jobId = req.params.jobId
    const applications = req.session.data.applications
    // let application = applications.find(application => application.id == applicationId)
    let application = applications[applicationId]

    // console.log({applicationId})
    // console.log({application})
    // console.log({applications})

    delete application.interviewDate
    delete application.interviewTime
    delete application.interviewAddress
    delete application.interviewDetails

    res.redirect(`/prototypes/application/expanded/dashboard/job/${jobId}/applicant/${applicationId}`)
    
  })
  
  // Render the reject reason screen
  // router.get('/prototypes/application/expanded/dashboard/job/:jobId/applicant/:applicationId/reject/rejection-reason', function (req, res) {
  
  //   let applicationId = req.params.applicationId
  //   let jobId = req.params.jobId

  //   res.render('prototypes/application/expanded/dashboard/job/applicant/reject/rejection-reason.html', {
  //     applicationId: applicationId,
  //     jobId: jobId
  //   })
    
  // })
 
  // Render the rejection check your answers screen
  // router.get('/prototypes/application/expanded/dashboard/job/:jobId/applicant/:applicationId/reject/check-answers', function (req, res) {
  
  //   let applicationId = req.params.applicationId
  //   let jobId = req.params.jobId

  //   res.render('prototypes/application/expanded/dashboard/job/applicant/reject/check-answers.html', {
  //     applicationId: applicationId,
  //     jobId: jobId
  //   })
    
  // })
  
  // Dynamic route helper!
  router.get('/prototypes/application/expanded/dashboard/job/:jobId/applicant/:applicationId/:page*', function (req, res, next) {
  
    let applicationId = req.params.applicationId
    let jobId = req.params.jobId

    newRender(path.join(`prototypes/application/expanded/dashboard/job/applicant/`, req.params.page, req.params[0]), res, next, {
      applicationId: applicationId,
      jobId: jobId
    })
    
  })

module.exports = router
