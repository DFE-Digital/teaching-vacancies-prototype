const { DateTime } = require('luxon')
const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

module.exports = router => {

  router.get('/profile/work-history', (req, res) => {
    let profile = req.session.user.profile

    let employer = _.get(req, 'session.data.profile.employer')
    let role = _.get(req, 'session.data.profile.role')

    let currentRoleOptions = [
      {
        value: "Yes",
        text: "Yes",
        checked: _.get(req, 'session.data.profile.currentRole') == 'Yes'
      },{
        value: "No",
        text: "No",
        checked: _.get(req, 'session.data.profile.currentRole') == 'No'
      }
    ]

    let startDate = {
      month: _.get(req, 'session.data.profile.startDate.month'),
      year: _.get(req, 'session.data.profile.startDate.year')
    }

    let endDate = {
      month: _.get(req, 'session.data.profile.endDate.month'),
      year: _.get(req, 'session.data.profile.endDate.year')
    }

    let description = _.get(req, 'session.data.profile.description')

    res.render('profile/work-history/index', {
      employer,
      role,
      startDate,
      currentRoleOptions,
      endDate,
      description
    })
  })

  router.post('/profile/work-history', (req, res) => {
    let role = {}
    role.id = uuidv4()
    role.employer = req.body.profile.employer
    role.role = req.body.profile.role
    role.startDate = DateTime.fromObject({
      month: req.body.profile.startDate.month,
      year: req.body.profile.startDate.year,
    }).toISO()
    role.currentRole = req.body.profile.currentRole
    if(role.currentRole == 'No') {
      role.endDate = DateTime.fromObject({
        month: req.body.profile.endDate.month,
        year: req.body.profile.endDate.year,
      }).toISO()
    }
    role.description = req.body.profile.description

    req.session.user.profile.workHistory[role.id] = role
    res.redirect(`/profile/work-history/review`)
  })

  router.get('/profile/work-history/:id/edit', (req, res) => {
    let id = req.params.id
    let profile = req.session.user.profile

    let item = profile.workHistory[id]

    let employer = item.employer
    let role = item.role
    let startDate = {
      month: DateTime.fromISO(item.startDate).month,
      year: DateTime.fromISO(item.startDate).year,
    }

    let endDate

    let description = item.description

    let currentRoleOptions = [
      {
        value: "Yes",
        text: "Yes",
        checked: item.currentRole == 'Yes'
      },{
        value: "No",
        text: "No",
        checked: item.currentRole == 'No'
      }
    ]

    res.render('profile/work-history/index', {
      employer,
      role,
      startDate,
      currentRoleOptions,
      endDate,
      description
    })
  })

  router.post('/profile/work-history/:id/edit', (req, res) => {
    let id = req.params.id
    var item = req.session.user.profile.workHistory[id]
    item.employer = req.body.profile.employer
    item.role = req.body.profile.role
    item.startDate = DateTime.fromObject({
      month: req.body.profile.startDate.month,
      year: req.body.profile.startDate.year,
    }).toISO()
    item.currentRole = req.body.profile.currentRole
    if(item.currentRole == 'No') {
      item.endDate = DateTime.fromObject({
        month: req.body.profile.endDate.month,
        year: req.body.profile.endDate.year,
      }).toISO()
    }
    item.description = req.body.profile.description

    res.redirect(`/profile/work-history/review`)
  })

  router.get('/profile/work-history/review', (req, res) => {
    let profile = req.session.user.profile

    res.render('profile/work-history/review', {
      profile
    })
  })

}