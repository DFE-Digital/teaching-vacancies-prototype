const SECTIONS = [
  { id: 'personal-details', text: 'Personal details' },
  { id: 'professional-status', text: 'Professional status' },
  { id: 'qualifications', text: 'Qualifications' },
  { id: 'training', text: 'Training and continuing professional development (CPD)' },
  { id: 'memberships', text: 'Professional body memberships' },
  { id: 'work-history', text: 'Work history' },
  { id: 'personal-statement', text: 'Personal statement' },
  { id: 'references', text: 'References' },
  { id: 'equal-opportunities', text: 'Equal opportunities and recruitment monitoring' },
  { id: 'support', text: 'Do you need support or adjustments for your interview?' },
  { id: 'declarations', text: 'Declarations' }
]

function asArray (value) {
  if (!value) return []
  return Array.isArray(value) ? value : [value]
}

function nextId (prefix) {
  return prefix + '-' + Date.now().toString(36)
}

function defaultApplication (user) {
  const email = (user && user.emailAddress) || 'anne.smith@example.com'

  return {
    submitted: false,
    statuses: {
      'personal-details': 'Imported',
      'professional-status': 'Imported',
      qualifications: 'Imported',
      training: 'Imported',
      memberships: 'Imported',
      'work-history': 'Imported',
      'personal-statement': 'Incomplete',
      references: 'Imported',
      'equal-opportunities': 'Incomplete',
      support: 'Imported',
      declarations: 'Incomplete'
    },
    personalDetails: {
      firstName: 'James',
      lastName: 'Smith',
      previousNames: '',
      addressLine1: '1 High Street',
      addressLine2: '',
      town: 'Enfield',
      county: 'Greater London',
      postcode: 'EN1 1AA',
      country: 'United Kingdom',
      phone: '01234567890',
      email: email,
      skilledWorker: 'No',
      nationalInsurance: 'No',
      niNumber: '',
      workingPatterns: ['Part time'],
      extraDetails: ''
    },
    professionalStatus: {
      qts: 'Yes',
      qtsYear: '1990',
      ageRange: 'Secondary, mathematics',
      trn: '1234567',
      induction: 'Yes'
    },
    qualifications: [
      { id: 'qual-1', type: 'Undergraduate degree', subject: 'Health Science', organisation: 'Lakeside University', grade: 'Honours', year: 'December 2020' },
      { id: 'qual-2', type: 'Undergraduate degree', subject: 'Biomedical Science', organisation: 'Brookville Technical College', grade: 'Honours', year: 'December 2020' },
      { id: 'qual-3', type: 'Undergraduate degree', subject: 'Health Science', organisation: 'Vertapple Technical College', grade: 'Honours', year: 'December 2020' }
    ],
    training: [
      { id: 'train-1', name: 'Rock climbing', provider: 'TeachTrainLtd', grade: 'Pass', date: '2020', length: '1 year' },
      { id: 'train-2', name: 'Rock climbing', provider: 'TeachTrainLtd', grade: 'Pass', date: '2020', length: '1 year' }
    ],
    memberships: [
      { id: 'mem-1', name: 'test', type: '', number: '', joined: '', exam: 'Yes' }
    ],
    jobs: [
      {
        id: 'role-1',
        organisation: 'Enfield Learning Trust',
        title: 'Teaching assistant',
        subjects: 'Key stage 2',
        startMonth: '9',
        startYear: '2022',
        endMonth: '',
        endYear: '',
        current: 'yes',
        duties: 'Supported classroom learning, small groups and pupils with additional needs.',
        reason: ''
      }
    ],
    gaps: [
      {
        id: 'gap-1',
        type: 'work',
        reason: 'Career break',
        organisation: 'Not in work',
        startMonth: 'December',
        startYear: '2006',
        endMonth: 'October',
        endYear: '2026'
      }
    ],
    personalStatement: 'Enim explicabo amet. Cumque repellendus consequatur. Earum veritatis qui. Et laudantium eum. Reprehenderit mollitia et. Omnis iste natus. Distinctio et dicta. Quo et culpa.',
    references: [
      { id: 'ref-1', name: 'Greta Wrobel', jobTitle: 'Teacher', organisation: 'Falmouth High School', relationship: 'Mentor', email: 'greta.wrobel@education.gov.uk', phone: '202-328-4294', current: 'Yes' },
      { id: 'ref-2', name: 'Jaymie Bechtelar', jobTitle: 'Headteacher', organisation: 'Hartmoore High', relationship: 'Mentor', email: 'jaymie.bechtelar@education.gov.uk', phone: '(781) 849-7282', current: 'Yes' },
      { id: 'ref-3', name: 'Darrell Schmidt DC', jobTitle: 'Teacher', organisation: 'Mulloowon High', relationship: 'Mentor', email: 'darrell.schmidt@example.com', phone: '886-469-3463', current: 'Yes' }
    ],
    contactReferees: 'No',
    equalOpportunities: {},
    support: {
      needed: 'Yes',
      details: 'Omnis praesentium deleniti. Et in cumque.'
    },
    declarations: {
      safeguarding: '',
      relationship: ''
    }
  }
}

function getJob (req) {
  const jobs = req.session.data.jobs || []
  return jobs.find(item => String(item.id) === String(req.params.id))
}

function getApplication (req, jobId) {
  if (!req.session.data.applications) req.session.data.applications = {}
  if (req.session.data.deletedApplications) {
    delete req.session.data.deletedApplications[jobId]
  }
  if (!req.session.data.applications[jobId]) {
    req.session.data.applications[jobId] = defaultApplication(req.session.user)
  }
  return req.session.data.applications[jobId]
}

function renderApply (req, res, template, extra) {
  const job = getJob(req)
  if (!job) {
    return res.status(404).render('apply/start', { job: null })
  }
  const application = getApplication(req, String(job.id))
  res.render(template, Object.assign({
    job,
    application,
    sections: SECTIONS.map(section => ({
      id: section.id,
      text: section.text,
      status: application.statuses[section.id]
    }))
  }, extra))
}

function setStatus (application, key, completed) {
  application.statuses[key] = completed === 'yes' ? 'Completed' : 'Incomplete'
}

function taskListPath (id) {
  return '/jobs/' + id + '/apply/task-list'
}

function findItem (list, id) {
  return (list || []).find(item => item.id === id) || {}
}

module.exports = function (router) {
  router.get('/jobs/:id/apply', (req, res) => {
    res.render('apply/start', { job: getJob(req) })
  })

  router.post('/jobs/:id/apply', (req, res) => {
    res.redirect(taskListPath(req.params.id))
  })

  router.get('/jobs/:id/apply/task-list', (req, res) => {
    renderApply(req, res, 'apply/task-list')
  })

  router.get('/jobs/:id/apply/delete', (req, res) => {
    const jobId = String(req.params.id)
    if (!req.session.data.deletedApplications) req.session.data.deletedApplications = {}
    req.session.data.deletedApplications[jobId] = true
    if (req.session.data.applications) delete req.session.data.applications[jobId]
    res.redirect('/jobseekers/job_applications')
  })

  router.get('/jobs/:id/apply/personal-details', (req, res) => {
    renderApply(req, res, 'apply/flow/personal-details')
  })

  router.post('/jobs/:id/apply/personal-details', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.personalDetails = {
      firstName: req.body.firstName || '',
      lastName: req.body.lastName || '',
      previousNames: req.body.previousNames || '',
      addressLine1: req.body.addressLine1 || '',
      addressLine2: req.body.addressLine2 || '',
      town: req.body.town || '',
      county: req.body.county || '',
      postcode: req.body.postcode || '',
      country: req.body.country || '',
      phone: req.body.phone || '',
      email: req.body.email || '',
      skilledWorker: req.body.skilledWorker || '',
      nationalInsurance: req.body.nationalInsurance || '',
      niNumber: req.body.niNumber || '',
      workingPatterns: asArray(req.body.workingPatterns),
      extraDetails: req.body.extraDetails || ''
    }
    setStatus(application, 'personal-details', req.body.completed)
    res.redirect(taskListPath(req.params.id))
  })

  router.get('/jobs/:id/apply/professional-status', (req, res) => {
    renderApply(req, res, 'apply/flow/professional-status')
  })

  router.post('/jobs/:id/apply/professional-status', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.professionalStatus = {
      qts: req.body.qts || '',
      qtsYear: req.body.qtsYear || '',
      ageRange: req.body.ageRange || '',
      trn: req.body.trn || '',
      induction: req.body.induction || ''
    }
    setStatus(application, 'professional-status', req.body.completed)
    res.redirect(taskListPath(req.params.id))
  })

  router.get('/jobs/:id/apply/qualifications/new', (req, res) => {
    renderApply(req, res, 'apply/flow/qualification', { item: {}, formAction: 'new' })
  })

  router.post('/jobs/:id/apply/qualifications/new', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.qualifications.push({
      id: nextId('qual'),
      type: req.body.type || 'Undergraduate degree',
      subject: req.body.subject || '',
      organisation: req.body.organisation || '',
      grade: req.body.grade || '',
      year: req.body.year || ''
    })
    res.redirect('/jobs/' + req.params.id + '/apply/qualifications')
  })

  router.get('/jobs/:id/apply/qualifications/:itemId/edit', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    renderApply(req, res, 'apply/flow/qualification', {
      item: findItem(application.qualifications, req.params.itemId),
      formAction: req.params.itemId + '/edit'
    })
  })

  router.post('/jobs/:id/apply/qualifications/:itemId/edit', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    const item = application.qualifications.find(entry => entry.id === req.params.itemId)
    if (item) {
      item.type = req.body.type || item.type
      item.subject = req.body.subject || ''
      item.organisation = req.body.organisation || ''
      item.grade = req.body.grade || ''
      item.year = req.body.year || ''
    }
    res.redirect('/jobs/' + req.params.id + '/apply/qualifications')
  })

  router.get('/jobs/:id/apply/qualifications/:itemId/delete', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.qualifications = application.qualifications.filter(entry => entry.id !== req.params.itemId)
    res.redirect('/jobs/' + req.params.id + '/apply/qualifications')
  })

  router.get('/jobs/:id/apply/qualifications', (req, res) => {
    renderApply(req, res, 'apply/flow/qualifications')
  })

  router.post('/jobs/:id/apply/qualifications', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    setStatus(application, 'qualifications', req.body.completed)
    res.redirect(taskListPath(req.params.id))
  })

  router.get('/jobs/:id/apply/training/new', (req, res) => {
    renderApply(req, res, 'apply/flow/training-form', { item: {}, formAction: 'new' })
  })

  router.post('/jobs/:id/apply/training/new', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.training.push({
      id: nextId('train'),
      name: req.body.name || '',
      provider: req.body.provider || '',
      grade: req.body.grade || '',
      date: req.body.date || '',
      length: req.body.length || ''
    })
    res.redirect('/jobs/' + req.params.id + '/apply/training')
  })

  router.get('/jobs/:id/apply/training/:itemId/edit', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    renderApply(req, res, 'apply/flow/training-form', {
      item: findItem(application.training, req.params.itemId),
      formAction: req.params.itemId + '/edit'
    })
  })

  router.post('/jobs/:id/apply/training/:itemId/edit', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    const item = application.training.find(entry => entry.id === req.params.itemId)
    if (item) {
      item.name = req.body.name || ''
      item.provider = req.body.provider || ''
      item.grade = req.body.grade || ''
      item.date = req.body.date || ''
      item.length = req.body.length || ''
    }
    res.redirect('/jobs/' + req.params.id + '/apply/training')
  })

  router.get('/jobs/:id/apply/training/:itemId/delete', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.training = application.training.filter(entry => entry.id !== req.params.itemId)
    res.redirect('/jobs/' + req.params.id + '/apply/training')
  })

  router.get('/jobs/:id/apply/training', (req, res) => {
    renderApply(req, res, 'apply/flow/training')
  })

  router.post('/jobs/:id/apply/training', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    setStatus(application, 'training', req.body.completed)
    res.redirect(taskListPath(req.params.id))
  })

  router.get('/jobs/:id/apply/memberships/new', (req, res) => {
    renderApply(req, res, 'apply/flow/membership', { item: { exam: 'No' }, formAction: 'new' })
  })

  router.post('/jobs/:id/apply/memberships/new', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.memberships.push({
      id: nextId('mem'),
      name: req.body.name || '',
      type: req.body.type || '',
      number: req.body.number || '',
      joined: req.body.joined || '',
      exam: req.body.exam || ''
    })
    res.redirect('/jobs/' + req.params.id + '/apply/memberships')
  })

  router.get('/jobs/:id/apply/memberships/:itemId/edit', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    renderApply(req, res, 'apply/flow/membership', {
      item: findItem(application.memberships, req.params.itemId),
      formAction: req.params.itemId + '/edit'
    })
  })

  router.post('/jobs/:id/apply/memberships/:itemId/edit', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    const item = application.memberships.find(entry => entry.id === req.params.itemId)
    if (item) {
      item.name = req.body.name || ''
      item.type = req.body.type || ''
      item.number = req.body.number || ''
      item.joined = req.body.joined || ''
      item.exam = req.body.exam || ''
    }
    res.redirect('/jobs/' + req.params.id + '/apply/memberships')
  })

  router.get('/jobs/:id/apply/memberships/:itemId/delete', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.memberships = application.memberships.filter(entry => entry.id !== req.params.itemId)
    res.redirect('/jobs/' + req.params.id + '/apply/memberships')
  })

  router.get('/jobs/:id/apply/memberships', (req, res) => {
    renderApply(req, res, 'apply/flow/memberships')
  })

  router.post('/jobs/:id/apply/memberships', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    setStatus(application, 'memberships', req.body.completed)
    res.redirect(taskListPath(req.params.id))
  })

  router.get('/jobs/:id/apply/work-history/job', (req, res) => {
    renderApply(req, res, 'apply/flow/job', { item: {}, formAction: 'job' })
  })

  router.post('/jobs/:id/apply/work-history/job', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.jobs.push({
      id: nextId('role'),
      organisation: req.body.organisation || '',
      title: req.body.title || '',
      subjects: req.body.subjects || '',
      startMonth: req.body.startMonth || '',
      startYear: req.body.startYear || '',
      endMonth: req.body.endMonth || '',
      endYear: req.body.endYear || '',
      current: req.body.current || '',
      duties: req.body.duties || '',
      reason: req.body.reason || ''
    })
    res.redirect('/jobs/' + req.params.id + '/apply/work-history')
  })

  router.get('/jobs/:id/apply/work-history/job/:itemId/edit', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    renderApply(req, res, 'apply/flow/job', {
      item: findItem(application.jobs, req.params.itemId),
      formAction: 'job/' + req.params.itemId + '/edit'
    })
  })

  router.post('/jobs/:id/apply/work-history/job/:itemId/edit', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    const item = application.jobs.find(entry => entry.id === req.params.itemId)
    if (item) {
      item.organisation = req.body.organisation || ''
      item.title = req.body.title || ''
      item.subjects = req.body.subjects || ''
      item.startMonth = req.body.startMonth || ''
      item.startYear = req.body.startYear || ''
      item.endMonth = req.body.endMonth || ''
      item.endYear = req.body.endYear || ''
      item.current = req.body.current || ''
      item.duties = req.body.duties || ''
      item.reason = req.body.reason || ''
    }
    res.redirect('/jobs/' + req.params.id + '/apply/work-history')
  })

  router.get('/jobs/:id/apply/work-history/job/:itemId/delete', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.jobs = application.jobs.filter(entry => entry.id !== req.params.itemId)
    res.redirect('/jobs/' + req.params.id + '/apply/work-history')
  })

  router.get('/jobs/:id/apply/work-history/gap', (req, res) => {
    renderApply(req, res, 'apply/flow/gap', {
      item: { type: req.query.type || 'work' },
      formAction: 'gap'
    })
  })

  router.post('/jobs/:id/apply/work-history/gap', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.gaps.push({
      id: nextId('gap'),
      type: req.body.type || 'work',
      reason: req.body.reason || '',
      organisation: req.body.organisation || '',
      startMonth: req.body.startMonth || '',
      startYear: req.body.startYear || '',
      endMonth: req.body.endMonth || '',
      endYear: req.body.endYear || ''
    })
    res.redirect('/jobs/' + req.params.id + '/apply/work-history')
  })

  router.get('/jobs/:id/apply/work-history/gap/:itemId/edit', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    renderApply(req, res, 'apply/flow/gap', {
      item: findItem(application.gaps, req.params.itemId),
      formAction: 'gap/' + req.params.itemId + '/edit'
    })
  })

  router.post('/jobs/:id/apply/work-history/gap/:itemId/edit', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    const item = application.gaps.find(entry => entry.id === req.params.itemId)
    if (item) {
      item.type = req.body.type || item.type
      item.reason = req.body.reason || ''
      item.organisation = req.body.organisation || ''
      item.startMonth = req.body.startMonth || ''
      item.startYear = req.body.startYear || ''
      item.endMonth = req.body.endMonth || ''
      item.endYear = req.body.endYear || ''
    }
    res.redirect('/jobs/' + req.params.id + '/apply/work-history')
  })

  router.get('/jobs/:id/apply/work-history/gap/:itemId/delete', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.gaps = application.gaps.filter(entry => entry.id !== req.params.itemId)
    res.redirect('/jobs/' + req.params.id + '/apply/work-history')
  })

  router.get('/jobs/:id/apply/work-history', (req, res) => {
    renderApply(req, res, 'apply/flow/work-history')
  })

  router.post('/jobs/:id/apply/work-history', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    setStatus(application, 'work-history', req.body.completed)
    res.redirect(taskListPath(req.params.id))
  })

  router.get('/jobs/:id/apply/personal-statement', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    const text = (application.personalStatement || '').trim()
    const wordCount = text ? text.split(/\s+/).length : 0
    renderApply(req, res, 'apply/flow/personal-statement', { wordCount })
  })

  router.post('/jobs/:id/apply/personal-statement', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.personalStatement = req.body.personalStatement || ''
    setStatus(application, 'personal-statement', req.body.completed)
    res.redirect(taskListPath(req.params.id))
  })

  router.get('/jobs/:id/apply/references/new', (req, res) => {
    renderApply(req, res, 'apply/flow/reference', { item: {}, formAction: 'new' })
  })

  router.post('/jobs/:id/apply/references/new', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.references.push({
      id: nextId('ref'),
      name: req.body.name || '',
      jobTitle: req.body.jobTitle || '',
      organisation: req.body.organisation || '',
      relationship: req.body.relationship || '',
      email: req.body.email || '',
      phone: req.body.phone || '',
      current: req.body.current || ''
    })
    res.redirect('/jobs/' + req.params.id + '/apply/references')
  })

  router.get('/jobs/:id/apply/references/:itemId/edit', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    renderApply(req, res, 'apply/flow/reference', {
      item: findItem(application.references, req.params.itemId),
      formAction: req.params.itemId + '/edit'
    })
  })

  router.post('/jobs/:id/apply/references/:itemId/edit', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    const item = application.references.find(entry => entry.id === req.params.itemId)
    if (item) {
      item.name = req.body.name || ''
      item.jobTitle = req.body.jobTitle || ''
      item.organisation = req.body.organisation || ''
      item.relationship = req.body.relationship || ''
      item.email = req.body.email || ''
      item.phone = req.body.phone || ''
      item.current = req.body.current || ''
    }
    res.redirect('/jobs/' + req.params.id + '/apply/references')
  })

  router.get('/jobs/:id/apply/references/:itemId/delete', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.references = application.references.filter(entry => entry.id !== req.params.itemId)
    res.redirect('/jobs/' + req.params.id + '/apply/references')
  })

  router.get('/jobs/:id/apply/references', (req, res) => {
    renderApply(req, res, 'apply/flow/references')
  })

  router.post('/jobs/:id/apply/references', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.contactReferees = req.body.contactReferees || ''
    setStatus(application, 'references', req.body.completed)
    res.redirect(taskListPath(req.params.id))
  })

  router.get('/jobs/:id/apply/equal-opportunities', (req, res) => {
    renderApply(req, res, 'apply/flow/equal-opportunities')
  })

  router.post('/jobs/:id/apply/equal-opportunities', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.equalOpportunities = {
      disability: req.body.disability || '',
      age: req.body.age || '',
      sex: req.body.sex || '',
      genderIdentity: req.body.genderIdentity || '',
      ethnicity: req.body.ethnicity || '',
      orientation: req.body.orientation || '',
      religion: req.body.religion || ''
    }
    setStatus(application, 'equal-opportunities', req.body.completed)
    res.redirect(taskListPath(req.params.id))
  })

  router.get('/jobs/:id/apply/support', (req, res) => {
    renderApply(req, res, 'apply/flow/support')
  })

  router.post('/jobs/:id/apply/support', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.support = {
      needed: req.body.needed || '',
      details: req.body.details || ''
    }
    setStatus(application, 'support', req.body.completed)
    res.redirect(taskListPath(req.params.id))
  })

  router.get('/jobs/:id/apply/declarations', (req, res) => {
    renderApply(req, res, 'apply/flow/declarations')
  })

  router.post('/jobs/:id/apply/declarations', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.declarations = {
      safeguarding: req.body.safeguarding || '',
      relationship: req.body.relationship || ''
    }
    setStatus(application, 'declarations', req.body.completed)
    res.redirect(taskListPath(req.params.id))
  })

  router.get('/jobs/:id/apply/review', (req, res) => {
    renderApply(req, res, 'apply/flow/review')
  })

  router.post('/jobs/:id/apply/review', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.submitted = true
    res.redirect('/jobs/' + req.params.id + '/apply/submitted')
  })

  router.get('/jobs/:id/apply/submitted', (req, res) => {
    renderApply(req, res, 'apply/flow/submitted', { feedbackSent: false })
  })

  router.post('/jobs/:id/apply/submitted', (req, res) => {
    const application = getApplication(req, String(req.params.id))
    application.feedback = {
      satisfaction: req.body.satisfaction || '',
      suggestions: req.body.suggestions || '',
      research: req.body.research || ''
    }
    renderApply(req, res, 'apply/flow/submitted', { feedbackSent: true })
  })
}
