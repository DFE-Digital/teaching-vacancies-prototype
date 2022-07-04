const jobs = require('../data/jobs.json')

module.exports = router => {

  router.get('/jobs', (req, res) => {
    res.render('jobs/index', {
      jobs
    })
  })

}