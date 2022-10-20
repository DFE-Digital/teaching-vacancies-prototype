module.exports = router => {

  router.get('/schools', (req, res) => {
    let organisations = req.session.data.organisations

    res.render('schools/index', {
      organisations
    })
  })

  router.get('/schools/show', (req, res) => {
    let jobs = req.session.data.jobs

    let currentJobs = [jobs[0], jobs[1]]

    res.render('schools/show', {
      currentJobs
    })
  })

}
