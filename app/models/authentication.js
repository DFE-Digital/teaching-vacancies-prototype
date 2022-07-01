const users = require('../data/users.json')

exports.findOne = (params) => {
  let user = {}

  user = users.find(user =>
    user.username === params.username &&
    user.password === params.password
  )

  return user
}
