
module.exports = router => {

  router.get('/', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/index', {
      jobs
    })
  })

  router.get('/jobs', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    let profile = req.session.user.profile

    res.render('jobs/index', {
      jobs
    })
  })

  router.get('/jobs/:id', (req, res) => {
    let jobs = req.session.data.jobs
    let job = jobs.find(job => job.id == req.params.id)
    res.render('jobs/show', {
      job
    })
  })

  router.get('/apply', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    let profile = req.session.user.profile

    res.render('jobs/apply', {
      jobs
    })
  })

}
