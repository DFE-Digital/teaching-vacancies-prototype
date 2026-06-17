
const _ = require('lodash');

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

  router.get('/download-app-job-example', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/download-app-job-example', {
      jobs
    })
  })

  router.get('/download-app-job-example-loggedin', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/download-app-job-example-loggedin', {
      jobs
    })
  })

  router.get('/download-app-job-personal-details', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/download-app-job-personal-details', {
      jobs
    })
  })

  router.get('/download-app-job-upload-doc', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/download-app-job-upload-doc', {
      jobs
    })
  })

  router.get('/download-app-job-example-loggedin-complete', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/download-app-job-example-loggedin-complete', {
      jobs
    })
  })

  router.get('/download-app-job-example-loggedin-filledin', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/download-app-job-example-loggedin-filledin', {
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

  router.get('/alert', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('account/jobalerts/jobalert', {
      jobs
    })
  })

  //FE Option B

  router.get('/jobsfe', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/fe/indexfe', {
      jobs
    })
  })

  //FE ONLY SERVICE Option C

  router.get('/jobsfeonly', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/fe/index_feonly', {
      jobs
    })
  })

   router.get('/jobsfeonly_alert', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/fe/index_feonly_jobalert', {
      jobs
    })
  })

  //FE ONLY SERVICE Option A

  const nonTeachingRolesData = require('../data/non-teaching-roles')

  router.get('/jobsfemerge', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/fe/index_femerge', {
      jobs,
      nonTeachingRoles: nonTeachingRolesData.roles,
      nonTeachingRoleCategories: nonTeachingRolesData.categories,
      showNonTeachingRoles: true,
      filterFormAction: '/femerge',
      clearFiltersHref: '/femerge/clear-filters',
      showFeSubjects: true
    })
  })

  router.get('/femerge', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/fe/index_femerge', {
      jobs,
      nonTeachingRoles: nonTeachingRolesData.roles,
      nonTeachingRoleCategories: nonTeachingRolesData.categories,
      showNonTeachingRoles: true,
      filterFormAction: '/femerge',
      clearFiltersHref: '/femerge/clear-filters',
      showFeSubjects: true
    })
  })

  router.get('/femerge/clear-filters', (req, res) => {
    req.session.data['filter-role'] = ''
    req.session.data['filter-phase'] = ''
    req.session.data['filter-subject'] = ''
    req.session.data['filter-suitability'] = ''
    req.session.data['filter-workingPatterns'] = ''
    req.session.data['filter-keyStages'] = ''
    req.session.data['filter-quick'] = ''
    req.session.data['filter-international'] = ''
    req.session.data['filter-organisation'] = ''
    req.session.data['filter-school'] = ''
    req.session.data['filters'] = ''

    res.redirect('/femerge')
  })

  router.get('/femerge/remove-filter', (req, res) => {
    const name = req.query.name
    const value = req.query.value

    if (name && value) {
      if (name.startsWith('filters.')) {
        const key = name.split('.')[1]

        if (req.session.data.filters && req.session.data.filters[key]) {
          const current = req.session.data.filters[key]

          if (Array.isArray(current)) {
            const updated = current.filter(item => item !== value)

            if (updated.length) {
              req.session.data.filters[key] = updated
            } else {
              delete req.session.data.filters[key]
            }
          } else if (current === value) {
            delete req.session.data.filters[key]
          }

          if (req.session.data.filters && Object.keys(req.session.data.filters).length === 0) {
            delete req.session.data.filters
          }
        }
      } else if (req.session.data[name]) {
        const current = req.session.data[name]

        if (Array.isArray(current)) {
          const updated = current.filter(item => item !== value)

          if (updated.length) {
            req.session.data[name] = updated
          } else {
            delete req.session.data[name]
          }
        } else if (current === value) {
          delete req.session.data[name]
        }
      }
    }

    res.redirect('/femerge')
  })

  //FE ONLY SCHOOLS OPTION B TEACHING AND SCHOOL JOBS

  router.get('/jobsfeschools', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/fe/index_schools', {
      jobs
    })
  })


  //FE PROTOTYPE WORK

  router.get('/fe', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/fe/indexfework', {
      jobs
    })
  })

  router.get('/fe/search-for-a-teaching-job', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/fe/search-for-a-teaching-job', {
      jobs
    })
  })

  router.get('/fe/location', (req, res) => {
    let location = _.get(req, 'session.data.feLocation') || {
      organisation: 'Northbrook College',
      campus: 'Worthing Campus',
      address: 'Littlehampton Road, Worthing, BN12 6NU',
      manualOverride: 'No',
      overrideAddress: ''
    }

    res.render('jobs/fe/location-edit', {
      location,
      errors: {}
    })
  })

  router.post('/fe/location', (req, res) => {
    const submittedLocation = _.get(req, 'body.feLocation', {})
    const existingLocation = _.get(req, 'session.data.feLocation') || {
      organisation: 'Northbrook College',
      campus: 'Worthing Campus',
      address: 'Littlehampton Road, Worthing, BN12 6NU',
      manualOverride: 'No',
      overrideAddress: ''
    }
    const overrideAddress = (submittedLocation.address || '').trim()

    req.session.data.feLocation = {
      organisation: existingLocation.organisation || 'Northbrook College',
      campus: existingLocation.campus || 'Worthing Campus',
      address: overrideAddress || existingLocation.address || 'Littlehampton Road, Worthing, BN12 6NU',
      manualOverride: overrideAddress ? 'Yes' : 'No',
      overrideAddress: overrideAddress
    }

    res.redirect('/femerge')
  })

  router.get('/fe/location/review', (req, res) => {
    res.redirect('/femerge')
  })

  router.get('/fe/job-title', (req, res) => {
    res.render('jobs/fe/job-title', {
      job: _.get(req, 'session.data.feJob') || {
        title: ''
      }
    })
  })

  router.post('/fe/job-title', (req, res) => {
    const title = _.get(req, 'body.feJob.title', '').trim()

    if (!title) {
      return res.status(400).render('jobs/fe/job-title', {
        job: {
          title
        },
        errors: {
          title: 'Enter a job title'
        }
      })
    }

    req.session.data.feJob = {
      title
    }

    res.redirect('/fe/location')
  })

  //FE HYBRID ALERT WORK

  router.get('/fealert', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/fe/jobalert_fe', {
      jobs
    })
  })

  //FE HOME WORK

  router.get('/fehome', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/fe/homefe', {
      jobs
    })
  })

  

}

