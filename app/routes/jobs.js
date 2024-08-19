
module.exports = router => {

  router.get('/', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/home', {
      jobs
    })
  })

  router.get('/jobs', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/index', {
      jobs
    })
  })

  router.get('/teaching', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/teaching', {
      jobs
    })
  })

  router.get('/landing_page_support_roles', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/landing_page_support_roles', {
      jobs
    })
  })


  router.get('/primary', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/primary', {
      jobs
    })
  })

  router.get('/secondary', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/secondary', {
      jobs
    })
  })

  router.get('/secondary2', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/secondary2', {
      jobs
    })
  })

  router.get('/home', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/home', {
      jobs
    })
  })

  router.get('/question', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/question', {
      jobs
    })
  })

  router.post('/question', (req, res) => {
    var liveInUK = req.session.data['typeofjob']

    if (liveInUK == "teaching"){
        res.redirect("/teaching")
    } else {
        res.redirect("/support")
    }
  })

  router.get('/support', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/support', {
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

  router.get('/jobsnew/:id', (req, res) => {
    let jobs = req.session.data.jobs
    let job = jobs.find(job => job.id == req.params.id)
    res.render('jobs/show_new', {
      job
    })
  })

  router.get('/jobs/unhappy', (req, res) => {
    res.render('jobs/unhappy', {

    })
  })

}