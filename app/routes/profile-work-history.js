const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

module.exports = router => {

  router.get('/profile/work-history', (req, res) => {
    let profile = req.session.user.profile

    let employer = _.get('req.session.data.profile.employer')
    let role = _.get('req.session.data.profile.role')

    let currentRoleOptions = [
      {
        value: "Yes",
        text: "Yes",
        checked: _.get('req.session.data.profile.currentRole') == 'Yes'
      },{
        value: "No",
        text: "No",
        checked: _.get('req.session.data.profile.currentRole') == 'No'
      }
    ]

    let startDate = {
      month: _.get('req.session.data.profile.startDate.month'),
      year: _.get('req.session.data.profile.startDate.year')
    }

    res.render('profile/work-history/index', {
      employer,
      role,
      currentRoleOptions,
      startDate
    })
  })

  router.post('/profile/work-history', (req, res) => {
    let item = {
      id: uuidv4(),
      role: req.body.profile.role,
      employer: req.body.profile.employer,
      startDate: req.body.profile.startDate.year,
      endDate: req.body.profile.endDate.year,
      currentRole: req.body.profile.currentRole,
      description: req.body.profile.description
    }
    req.session.user.profile.workHistory[item.id] = item
    res.redirect(`/profile/work-history/review`)
  })

  router.get('/profile/work-history/:id/edit', (req, res) => {
    let id = req.params.id
    let profile = req.session.user.profile

    let job = profile.workHistory[id]

    res.render('profile/work-history/index', {
    })
  })

  router.post('/profile/work-history/:id/edit', (req, res) => {
    let id = req.params.id
    // req.session.user.profile.qualifications[id].type = req.body.profile.qualifications.type
    // req.session.user.profile.qualifications[id].anotherUKQualification = req.body.profile.qualifications.anotherUKQualification
    // req.session.user.profile.qualifications[id].nonUKQualification = req.body.profile.qualifications.nonUKQualification
    res.redirect(`/profile/work-history/${req.params.id}/review`)
  })

  router.get('/profile/work-history/review', (req, res) => {
    let profile = req.session.user.profile

    res.render('profile/work-history/review', {
      profile
    })
  })

}