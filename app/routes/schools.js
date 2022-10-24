module.exports = router => {

  router.get('/schools', (req, res) => {
    let organisations = req.session.data.organisations

    res.render('schools/index', {
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
