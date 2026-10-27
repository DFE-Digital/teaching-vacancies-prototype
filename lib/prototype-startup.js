// First-run checks shared by dev and legacy start.js
const path = require('path')
const fs = require('fs')

function checkFiles () {
  const nodeModulesExists = fs.existsSync(path.join(__dirname, '../node_modules'))
  if (!nodeModulesExists) {
    console.error('ERROR: Node module folder missing. Try running `npm install`')
    process.exit(0)
  }

  const envExists = fs.existsSync(path.join(__dirname, '../.env'))
  if (!envExists) {
    fs.createReadStream(path.join(__dirname, '../lib/template.env'))
      .pipe(fs.createWriteStream(path.join(__dirname, '../.env')))
  }
}

function ensureSessionDataDefaults () {
  const dataDirectory = path.join(__dirname, '../app/data')
  const sessionDataDefaultsFile = path.join(dataDirectory, 'session-data-defaults.js')
  if (fs.existsSync(sessionDataDefaultsFile)) return

  console.log('Creating session data defaults file')
  if (!fs.existsSync(dataDirectory)) {
    fs.mkdirSync(dataDirectory)
  }

  fs.createReadStream(path.join(__dirname, '../lib/template.session-data-defaults.js'))
    .pipe(fs.createWriteStream(sessionDataDefaultsFile))
}

function runUsageDataPrompt () {
  return new Promise((resolve) => {
    const usageData = require('./usage_data')
    const usageDataConfig = usageData.getUsageDataConfig()

    if (usageDataConfig.collectUsageData !== undefined) {
      if (usageDataConfig.collectUsageData === true) {
        usageData.startTracking(usageDataConfig)
      }
      resolve()
      return
    }

    usageData.askForUsageDataPermission().then(function (permissionGranted) {
      usageDataConfig.collectUsageData = permissionGranted
      usageData.setUsageDataConfig(usageDataConfig)
      if (permissionGranted) {
        usageData.startTracking(usageDataConfig)
      }
      resolve()
    })
  })
}

async function runPrototypeStartup () {
  checkFiles()
  ensureSessionDataDefaults()
  await runUsageDataPrompt()
}

module.exports = {
  runPrototypeStartup
}
