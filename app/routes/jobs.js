const jobs = require('../data/jobs.json')

module.exports = router => {

  router.get('/jobs', (req, res) => {
    res.render('jobs/index', {
      jobs
    })
  })

  router.get('/jobs/:id', (req, res) => {
    let job = jobs.find(job => job.id == req.params.id)
    res.render('jobs/show', {
      job
    })
  })

}