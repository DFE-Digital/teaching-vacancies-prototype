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
    const organisations = req.session.data.organisations || []
    const organisation = organisations.find(item => item.id == req.params.id)

    if (!organisation) {
      return res.redirect('/schools')
    }

    const allJobs = (req.session.data.jobs || []).filter(job => job.status == 'Active')
    const jobs = allJobs.filter(job => job.organisation && String(job.organisation.id) === String(organisation.id))

    const parentOrganisation = organisations
      .filter(item => item.schools)
      .find(item => item.schools.find(school => school.id == organisation.id))

    let trustJobCount = 0

    if (parentOrganisation) {
      organisation.parentOrganisation = {
        name: parentOrganisation.name,
        id: parentOrganisation.id
      }

      const schoolIds = new Set((parentOrganisation.schools || []).map(school => String(school.id)))
      schoolIds.add(String(parentOrganisation.id))
      trustJobCount = allJobs.filter(job => job.organisation && schoolIds.has(String(job.organisation.id))).length
    }

    res.render('schools/show/index', {
      jobs,
      organisation,
      trustJobCount
    })
  })

  router.get('/schools/:id/schools', (req, res) => {
    let organisation = req.session.data.organisations.find(organisation => organisation.id == req.params.id)

    res.render('schools/show/schools', {
      organisation
    })
  })

}
