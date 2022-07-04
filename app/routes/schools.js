const schools = require('../data/orgs.json')

module.exports = router => {

  router.get('/schools', (req, res) => {
    res.render('schools/index', {
      schools
    })
  })

}