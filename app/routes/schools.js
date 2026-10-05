const collegePhases = ['College', 'Sixth form or college', 'Further education']

function withCurrentJobs (organisations, jobs) {
  const counts = {}

  for (const job of jobs || []) {
    if (job.status !== 'Active' || !job.organisation || !job.organisation.id) continue
    counts[job.organisation.id] = (counts[job.organisation.id] || 0) + 1
  }

  return organisations.map(organisation => Object.assign({}, organisation, {
    currentJobs: counts[organisation.id] || 0
  }))
}

module.exports = router => {

  router.get('/schools', (req, res) => {
    const jobs = req.session.data.jobs
    const organisations = withCurrentJobs(
      req.session.data.organisations.filter(organisation => organisation.phase && !collegePhases.includes(organisation.phase)),
      jobs
    )

    res.render('schools/index', {
      organisations
    })
  })

  router.get('/colleges', (req, res) => {
    const jobs = req.session.data.jobs
    const organisations = withCurrentJobs(
      req.session.data.organisations.filter(organisation => collegePhases.includes(organisation.phase)),
      jobs
    )

    res.render('schools/colleges', {
      organisations
    })
  })

  router.get('/schools/:id', (req, res) => {
    let organisations = req.session.data.organisations
    let organisation = organisations.find(organisation => organisation.id == req.params.id)

    let jobs = req.session.data.jobs

    jobs = [jobs[0], jobs[1]]

    // Check to see if the school is part of a trust
    let parentOrganisation = organisations
      .filter(o => o.schools)
      .find(o => o.schools.find(s => s.id == organisation.id))

    if(parentOrganisation) {
      organisation.parentOrganisation = {
        name: parentOrganisation.name,
        id: parentOrganisation.id
      }
    }

    res.render('schools/show/index', {
      jobs,
      organisation
    })
  })

  router.get('/schools/:id/schools', (req, res) => {
    let organisation = req.session.data.organisations.find(organisation => organisation.id == req.params.id)

    res.render('schools/show/schools', {
      organisation
    })
  })

}
