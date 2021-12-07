
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

router.all('*', function(req, res, next){
  res.locals.query = req.query
  next()
})

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

  // Create a job flow

  // Copy an existig job or start a new one?
  router.post('/prototypes/create-a-job/copy-or-new-job-answer', function (req, res) {
  
    let newOrCopyExisting = req.session.data.job.newOrCopyExistingJob

    if (newOrCopyExisting == "Start with a blank template") {
      res.redirect('/prototypes/create-a-job/0-job-role')
    } else {
      res.redirect('/prototypes/create-a-job/copy-job')
    }  
    
  })

  // Job role
  router.post('/prototypes/create-a-job/0-job-role-answer', function (req, res) {
  
    let jobRole = req.session.data.job.role
    let userType = req.session.data.job.userType
    let jobPhase = req.session.data.job.phase

    if ( (jobRole == "sendCo") && ((userType == "multiSchoolMat") || (userType == "multiSchoolLA")) ) {
      res.redirect('/prototypes/create-a-job/1-job-location')
    } else if ( ((jobRole == "teacher") || (jobRole == "leadership") || (jobRole == "education support")) ) {
      res.redirect('/prototypes/create-a-job/0a-job-role-details') 
    } else if (jobRole == "bussinessManager") {
      res.redirect('/404') 
    } else if ( (jobRole == "sendCo") && (userType == "singleSchool") && (jobPhase == "More than one phase") ) {
      res.redirect('/prototypes/create-a-job/2a-education-phase-setup')   
    } else {
      res.redirect('/prototypes/create-a-job/2-job-details')
    }   
  })
  
  // Job role (v1)
  router.post('/prototypes/create-a-job_v1/0-job-role-answer', function (req, res) {
  
    let jobRole = req.session.data.job.role
    let userType = req.session.data.job.userType
    let jobPhase = req.session.data.job.phase

    if ( (jobRole == "sendCo") && ((userType == "multiSchoolMat") || (userType == "multiSchoolLA")) ) {
      res.redirect('/prototypes/create-a-job_v1/1-job-location')
    } else if ( ((jobRole == "teacher") || (jobRole == "leadership") || (jobRole == "education support")) ) {
      res.redirect('/prototypes/create-a-job_v1/0a-job-role-details') 
    } else if (jobRole == "bussinessManager") {
      res.redirect('/404')  
    } else if ( (jobRole == "sendCo") && (userType == "singleSchool") && (jobPhase == "More than one phase") ) {
      res.redirect('/prototypes/create-a-job/2a-education-phase-setup')  
    } else {
      res.redirect('/prototypes/create-a-job_v1/2-job-details')
    }   
  })
  
  // Job role details (v1)
  router.post('/prototypes/create-a-job_v1/0-job-role-details-answer', function (req, res) {
  
    // let jobPhase = req.session.data.job.phase
    let userType = req.session.data.job.userType
    
    // If mutli-school user go to location
    if ((userType == "multiSchoolMat") || (userType == "multiSchoolLa")) {
      res.redirect('/prototypes/create-a-job_v1/1-job-location')
    } else {
      res.redirect('/prototypes/create-a-job_v1/2-job-details')
    } 
  })
  
  // Job role details
  router.post('/prototypes/create-a-job/0-job-role-details-answer', function (req, res) {
  
    let jobPhase = req.session.data.job.phase
    let userType = req.session.data.job.userType
    
    // If all-through and single school then skip location and go to phase
    if ( (jobPhase == "More than one phase") && (userType == "singleSchool") ) {
      res.redirect('/prototypes/create-a-job/2a-education-phase-setup')
    } else if ((userType == "multiSchoolMat") || (userType == "multiSchoolLa")) {
      res.redirect('/prototypes/create-a-job/1-job-location')
    } else {
      res.redirect('/prototypes/create-a-job/2-job-details')
    } 
  })
  
  // Job location MAT (v1)
  router.post('/prototypes/create-a-job_v1/job-role-answer-mat', function (req, res) {
    
    let selectedLocationsMat = req.session.data.job.locationMat
    let jobPhase = req.session.data.job.phase

    if (selectedLocationsMat == "At one school in the trust") {
      res.redirect('/prototypes/create-a-job_v1/1b-job-location-single')
    } else if (selectedLocationsMat == "At more than one school in the trust") {
      res.redirect('/prototypes/create-a-job_v1/1a-job-location-many')
    } else {
      res.redirect('/prototypes/create-a-job_v1/2-job-details')
    }

  })
  
  // Job location MAT
  router.post('/prototypes/create-a-job/job-role-answer-mat', function (req, res) {
    
    let selectedLocationsMat = req.session.data.job.locationMat
    let jobPhase = req.session.data.job.phase

    if (selectedLocationsMat == "At one school in the trust") {
      res.redirect('/prototypes/create-a-job/1b-job-location-single')
    } else if (selectedLocationsMat == "At more than one school in the trust") {
      res.redirect('/prototypes/create-a-job/1a-job-location-many')
    } else if ((selectedLocationsMat == "At the trust's head office") && (jobPhase == "More than one phase") )  {
      res.redirect('/prototypes/create-a-job/2a-education-phase-setup')
    } else {
      res.redirect('/prototypes/create-a-job/2-job-details')
    }

  })

  // Job Location LA (v1)
  router.post('/prototypes/create-a-job_v1/job-role-answer-la', function (req, res) {
    
    let selectedLocationsLa = req.session.data.job.locationLa

    if (selectedLocationsLa == "At one school") {
      res.redirect('/prototypes/create-a-job_v1/1b-job-location-single')
    } else {
      res.redirect('/prototypes/create-a-job_v1/1a-job-location-many')
    }
  })

  // Job Location LA
  router.post('/prototypes/create-a-job/job-role-answer-la', function (req, res) {
    
    let selectedLocationsLa = req.session.data.job.locationLa

    if (selectedLocationsLa == "At one school") {
      res.redirect('/prototypes/create-a-job/1b-job-location-single')
    } else {
      res.redirect('/prototypes/create-a-job/1a-job-location-many')
    }
  })
  
  // Job Location details
  router.post('/prototypes/create-a-job/1a-job-location-details-answer', function (req, res) {
    
    let jobPhase = req.session.data.job.phase

    if (jobPhase == "More than one phase") {
      res.redirect('/prototypes/create-a-job/2a-education-phase-setup')
    } else {
      res.redirect('/prototypes/create-a-job/2-job-details')
    }  
    
  })

  // Applying for the job
  router.post('/prototypes/create-a-job/6-applying-answer', function (req, res) {
    
    let applyProcess = req.session.data.job.applyProcess

    if (applyProcess == "Use the Teaching Vacancies application form") {
      res.redirect('/prototypes/create-a-job/6b-applying-within-tvs')
    } else {
      res.redirect('/prototypes/create-a-job/6c-applying-outside-tvs')
    }  
    
  })

  // ----------------------------------------------------
  // Applications and job routes
  // ----------------------------------------------------

  // View a single job
  router.get('/prototypes/application/expanded/dashboard/job/:jobId', function (req, res) {
  
    let jobId = req.params.jobId

    res.render('prototypes/application/expanded/dashboard/job/index.html', {
      jobId: jobId
    })
    
  })

  
  // View a single application of a job
  router.get('/prototypes/application/expanded/dashboard/job/:jobId/applicant/:applicationId', function (req, res) {
  
    let applicationId = req.params.applicationId
    let jobId = req.params.jobId
    const applications = req.session.data.applications
    let application = applications[applicationId]

    // is the status "unread"?
    // if (application.status == "Unread") {
    //   // then empty the status
    //   // application.status = ""
    // }

    res.render('prototypes/application/expanded/dashboard/job/applicant/index.html', {
      applicationId: applicationId,
      jobId: jobId
    })
    
  })
  
  // Mark an application as reviewed and return to all applicatios for that job
  router.get('/prototypes/application/expanded/dashboard/job/:jobId/applicant/:applicationId/mark-reviewed', function (req, res) {
  
    let applicationId = req.params.applicationId
    let jobId = req.params.jobId
    const applications = req.session.data.applications
    let application = applications[applicationId]

    application.status = "Reviewed"

    res.redirect(`/prototypes/application/expanded/dashboard/job/${jobId}/applications`)
    
  })
  
  // Are you sending the applicant a rejection email?
  router.post('/prototypes/application/expanded/dashboard/job/:jobId/applicant/:applicationId/reject', function (req, res) {
  
    let applicationId = req.params.applicationId
    let jobId = req.params.jobId
    const applications = req.session.data.applications
    let sendRejectionEmailAnswer = applications[applicationId].sendRejectionEmail

    if (sendRejectionEmailAnswer == "Yes") {
      res.redirect(`/prototypes/application/expanded/dashboard/job/${jobId}/applicant/${applicationId}/reject/rejection-reason`)
    } else {
      res.redirect(`/prototypes/application/expanded/dashboard/job/${jobId}/applicant/${applicationId}/reject/confirm-no-email`)
    }
    
  })

  // Mark an application as 'rejected', dont notify the applicant and return to all applications for that job
  router.get('/prototypes/application/expanded/dashboard/job/:jobId/applicant/:applicationId/reject/confirm-rejection', function (req, res) {

    let jobId = req.params.jobId
    let applicationId = req.params.applicationId
    const applications = req.session.data.applications
    let application = applications[applicationId]
    let applicationName = applications[applicationId].firstname + " " + applications[applicationId].lastname
    let flashContent = "<h3 class='govuk-notification-banner__heading'>" + applicationName+ "'s application has been marked as unsuccessful. They have not been notified.</h3>"

    application.status = "Unsuccessful"

    // res.redirect(`/prototypes/application/expanded/dashboard/job/${jobId}/applications/?_flash=${applicationName}'s application has been rejected. They have not been notified.`)

    res.redirect(`/prototypes/application/expanded/dashboard/job/${jobId}/applicant/${applicationId}/?_flash=${flashContent}`)

  })

  // Mark an application as 'rejected', notify the applicant and return to all applications for that job
  router.get('/prototypes/application/expanded/dashboard/job/:jobId/applicant/:applicationId/reject/confirm-rejection-and-notify', function (req, res) {

    let jobId = req.params.jobId
    let applicationId = req.params.applicationId
    const applications = req.session.data.applications
    let application = applications[applicationId]
    let applicationName = applications[applicationId].firstname + " " + applications[applicationId].lastname
    let flashContent = "<h3 class='govuk-notification-banner__heading'>" + applicationName+ " has been notified that their application was not successful.</h3>"

    // If the applicant has been invited to interview then delete all their interview data
    if (application.status = "Invited to interview") {
      delete application.interviewDate
      delete application.interviewTime
      delete application.interviewAddress
      delete application.interviewDetails
    }

    application.status = "Unsuccessful"

    // res.redirect(`/prototypes/application/expanded/dashboard/job/${jobId}/applications/?_flash=${applicationName} has been notified that their application was not successful.`)

    res.redirect(`/prototypes/application/expanded/dashboard/job/${jobId}/applicant/${applicationId}/?_flash=${flashContent}`)

  })

  // Mark an application as 'invited to interview' and return to all applications for that job
  router.get('/prototypes/application/expanded/dashboard/job/:jobId/applicant/:applicationId/invite/confirm-interview-invite', function (req, res) {

    let jobId = req.params.jobId
    let applicationId = req.params.applicationId
    const applications = req.session.data.applications
    let application = applications[applicationId]
    let applicationName = applications[applicationId].firstname + " " + applications[applicationId].lastname
    let flashContent = "<h3 class='govuk-notification-banner__heading'>" + applicationName+ " has been invited to interview</h3><p class='govuk-body'>They will receive an email containing the interview details.</p>"

    application.status = "Invited to interview"

    res.redirect(`/prototypes/application/expanded/dashboard/job/${jobId}/applicant/${applicationId}/?_flash=${flashContent}`)
    
  })


  // Confirm cancelation of interview and delete interview details
  router.get('/prototypes/application/expanded/dashboard/job/:jobId/applicant/:applicationId/invite/confirm-cancel-interview', function (req, res) {

    let applicationId = req.params.applicationId
    let jobId = req.params.jobId
    const applications = req.session.data.applications
    let application = applications[applicationId]
    let applicationName = applications[applicationId].firstname + " " + applications[applicationId].lastname

    delete application.interviewDate
    delete application.interviewTime
    delete application.interviewAddress
    delete application.interviewDetails

    // TODO: This should really go back to whatever the status was befroe being invited to interview
    application.status = "Received"

    res.redirect(`/prototypes/application/expanded/dashboard/job/${jobId}/applicant/${applicationId}/?_flash=The interview with ${applicationName} has been cancelled.`)
    
  })
  
  // Dynamic route helper for job pages
  router.get('/prototypes/application/expanded/dashboard/job/:jobId/:page*', function (req, res, next) {
  
    let jobId = req.params.jobId

    newRender(path.join(`prototypes/application/expanded/dashboard/job/`, req.params.page, req.params[0]), res, next, {
      jobId: jobId
    })
    
  })

  // Dynamic route helper for application pages
  router.get('/prototypes/application/expanded/dashboard/job/:jobId/applicant/:applicationId/:page*', function (req, res, next) {
  
    let applicationId = req.params.applicationId
    let jobId = req.params.jobId

    newRender(path.join(`prototypes/application/expanded/dashboard/job/applicant/`, req.params.page, req.params[0]), res, next, {
      applicationId: applicationId,
      jobId: jobId
    })
    
  })

module.exports = router
