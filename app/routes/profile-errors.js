const { v4: uuidv4 } = require('uuid');
const _ = require('lodash');

module.exports = router => {

  router.get('/profile/personal-details/errors/name', (req, res) => {
    res.render('profile/personal-details/errors/name')
  })

  router.get('/profile/personal-details/errors/phone-number', (req, res) => {
    res.render('profile/personal-details/errors/phone-number')
  })


}
