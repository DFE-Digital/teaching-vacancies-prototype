
const _ = require('lodash');

function getHomepageLocationOptions() {
  return [
    {
      label: 'North West',
      items: [
        'Liverpool',
        'Greater Manchester',
        'Lancashire, Blackburn and Blackpool',
        'Cheshire East',
        'Cheshire West and Chester'
      ]
    },
    {
      label: 'Yorkshire and The Humber',
      items: [
        'Sheffield',
        'Leeds',
        'Bradford',
        'Doncaster',
        'North Riding Of Yorkshire'
      ]
    },
    {
      label: 'North East',
      items: [
        'Newcastle Upon Tyne',
        'Middlesbrough',
        'Sunderland',
        'North Tyneside',
        'Northumberland'
      ]
    },
    {
      label: 'London',
      items: [
        'Bexley',
        'Havering',
        'Barnet',
        'Enfield',
        'Kensington and Chelsea'
      ]
    },
    {
      label: 'South East',
      items: [
        'Hampshire',
        'Surrey',
        'Kent and Medway',
        'West Sussex',
        'East Sussex, Brighton and Hove'
      ]
    },
    {
      label: 'South West',
      items: [
        'Bristol',
        'Gloucestershire and Gloucester',
        'Devon, Plymouth and Torbay',
        'Cornwall',
        'Dorset, Bournemouth, Christchurch and Poole'
      ]
    },
    {
      label: 'West Midlands',
      items: [
        'Birmingham',
        'Worcestershire',
        'Shropshire and Telford and Wrekin',
        'Staffordshire and Stoke',
        'Warwickshire'
      ]
    },
    {
      label: 'East Midlands',
      items: [
        'Derby',
        'Nottingham',
        'Leicester',
        'Lincolnshire and Lincoln',
        'Northamptonshire and Northampton'
      ]
    },
    {
      label: 'East Of England',
      items: [
        'Essex, Southend and Thurrock',
        'Bedfordshire',
        'Hertfordshire',
        'Suffolk',
        'Norfolk'
      ]
    }
  ].map(group => ({
    label: group.label,
    items: [group.label, ...group.items].map(item => ({
      value: item,
      text: item
    }))
  }))
}

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

  router.get('/apply-with-cv', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/apply-with-cv', {
      jobs
    })
  })

  router.post('/apply-with-cv', (req, res) => {
    res.render('jobs/apply-with-cv', {
      jobs: req.session.data.jobs.filter(job => job.status == 'Active')
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
      jobs,
      locationOptions: getHomepageLocationOptions()
    })
  })

  router.get('/home-v2', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/home-v2', {
      jobs,
      locationOptions: getHomepageLocationOptions()
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
  const feSubjectItems = [
    { value: 'Accounting', text: 'Accounting', hint: 'includes Finance and accounting' },
    { value: 'Art and design', text: 'Art and design' },
    { value: 'Biology', text: 'Biology' },
    { value: 'Business studies', text: 'Business studies' },
    { value: 'Chemistry', text: 'Chemistry' },
    { value: 'Citizenship', text: 'Citizenship' },
    { value: 'Classics', text: 'Classics', hint: 'includes latin' },
    { value: 'Computing', text: 'Computing', hint: 'includes Computer science, Information technology, and ICT' },
    { value: 'Dance', text: 'Dance' },
    { value: 'Design and technology', text: 'Design and technology', hint: 'includes Product design, Textiles and Systems and control' },
    { value: 'Drama', text: 'Drama', hint: 'includes Theatre studies and Performing arts' },
    { value: 'Economics', text: 'Economics' },
    { value: 'Engineering', text: 'Engineering' },
    { value: 'English', text: 'English', hint: 'includes English language and literature' },
    { value: 'Food technology', text: 'Food technology', hint: 'includes Hospitality and catering' },
    { value: 'French', text: 'French' },
    { value: 'Geography', text: 'Geography' },
    { value: 'German', text: 'German' },
    { value: 'Health and social care', text: 'Health and social care' },
    { value: 'History', text: 'History' },
    { value: 'Humanities', text: 'Humanities' },
    { value: 'ICT', text: 'ICT' },
    { value: 'Languages', text: 'Languages', hint: 'includes MFL (Modern Foreign Languages)' },
    { value: 'Law', text: 'Law' },
    { value: 'Mandarin', text: 'Mandarin' },
    { value: 'Mathematics', text: 'Mathematics' },
    { value: 'Media studies', text: 'Media studies' },
    { value: 'Music', text: 'Music' },
    { value: 'Philosophy', text: 'Philosophy' },
    { value: 'Physical education', text: 'Physical education' },
    { value: 'Physics', text: 'Physics' },
    { value: 'Politics', text: 'Politics' },
    { value: 'PSHE', text: 'PSHE' },
    { value: 'Psychology', text: 'Psychology' },
    { value: 'Religious education', text: 'Religious education', hint: 'includes Religious studies' },
    { value: 'Science', text: 'Science' },
    { value: 'Social sciences', text: 'Social sciences' },
    { value: 'Sociology', text: 'Sociology' },
    { value: 'Spanish', text: 'Spanish' },
    { value: 'Statistics', text: 'Statistics' }
  ]

  router.get('/jobsfemerge', (req, res) => {
    let jobs = req.session.data.jobs.filter(job => job.status == 'Active')
    res.render('jobs/fe/index_femerge', {
      jobs,
      nonTeachingRoles: nonTeachingRolesData.roles,
      nonTeachingRoleCategories: nonTeachingRolesData.categories,
      showNonTeachingRoles: false,
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
      showNonTeachingRoles: false,
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
      ...(_.get(req, 'session.data.feJob') || {}),
      title
    }

    res.redirect('/fe/subjects')
  })

  router.get('/fe/subjects', (req, res) => {
    res.render('jobs/fe/subjects', {
      job: {
        subjectSearch: '',
        subjects: [],
        ...(_.get(req, 'session.data.feJob') || {})
      },
      subjects: feSubjectItems
    })
  })

  router.post('/fe/subjects', (req, res) => {
    const subjectSearch = _.get(req, 'body.feJob.subjectSearch', '').trim()
    const validSubjectIds = new Set(feSubjectItems.map(subject => subject.value))
    const submittedSubjects = _.castArray(_.get(req, 'body.feJob.subjects', []))
      .filter(subject => validSubjectIds.has(subject))
    const normalisedSubjectSearch = subjectSearch.toLowerCase()
    const selectedSubjectMatchesSearch = submittedSubjects.some(subject =>
      subject.toLowerCase().includes(normalisedSubjectSearch)
    )

    if (!submittedSubjects.length || (subjectSearch && !selectedSubjectMatchesSearch)) {
      return res.status(400).render('jobs/fe/subjects', {
        job: {
          ...(_.get(req, 'session.data.feJob') || {}),
          subjectSearch,
          subjects: submittedSubjects
        },
        subjects: feSubjectItems,
        errors: {
          subjects: 'Select a subject from the list, or leave this blank'
        }
      })
    }

    req.session.data.feJob = {
      ...(_.get(req, 'session.data.feJob') || {}),
      subjectSearch,
      subjects: submittedSubjects
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
      jobs,
      locationOptions: getHomepageLocationOptions()
    })
  })



}
