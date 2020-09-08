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

module.exports = router
