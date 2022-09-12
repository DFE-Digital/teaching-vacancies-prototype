const schools = require('../data/orgs.json')
const jobs = require('../data/jobs.json')

module.exports = router => {

  router.get('/schools', (req, res) => {
    res.render('schools/index', {
      schools
    })
  })

  router.get('/schools/show', (req, res) => {
    let currentJobs = [jobs[0], jobs[1]]

    res.render('schools/show', {
      currentJobs
    })
  })

}
