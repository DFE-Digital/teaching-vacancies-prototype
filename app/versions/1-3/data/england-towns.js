const fs = require('fs')
const path = require('path')

const englandTowns = JSON.parse(
  fs.readFileSync(path.join(__dirname, 'england-towns.json'), 'utf8')
)

const englandTownsJson = JSON.stringify(englandTowns)

module.exports = englandTowns
module.exports.englandTownsJson = englandTownsJson
