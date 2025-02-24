
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

  router.get('/support-jobs', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/landing_page_support_roles', {
      jobs
    })
  })

  router.get('/support-jobs-2', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/landing_page2_support_roles', {
      jobs
    })
  })


  router.get('/leadership-jobs', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/landing_page_leadership_roles', {
      jobs
    })
  })

  router.get('/new-teachers-campaign', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/new-teachers-campaign', {
      jobs
    })
  })

  router.get('/new-teachers-campaign2', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/new-teachers-campaign2', {
      jobs
    })
  })

  router.get('/school-business-manager-jobs', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/school-business-manager-jobs', {
      jobs
    })
  })

  router.get('/exam-invigilator-jobs', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/exam-invigilator-jobs', {
      jobs
    })
  })

  router.get('/after-school-breakfast-club-assistant-jobs', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/after-school-breakfast-club-assistant-jobs', {
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

  router.get('/home-v2', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/home-v2', {
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

