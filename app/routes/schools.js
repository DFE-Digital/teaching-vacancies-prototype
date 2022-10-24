module.exports = router => {

  router.get('/schools', (req, res) => {
    let organisations = req.session.data.organisations

    res.render('schools/index', {
      organisations
    })
  })

  router.get('/schools/:id', (req, res) => {
    let organisation = req.session.data.organisations.find(organisation => organisation.id == req.params.id)

    let jobs = req.session.data.jobs

    jobs = [jobs[0], jobs[1]]

    res.render('schools/show/index', {
      jobs,
      organisation
    })
  })

}
