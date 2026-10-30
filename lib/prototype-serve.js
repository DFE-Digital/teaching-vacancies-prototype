/**
 * Production-style serve (Kit CLI `start` / `serve` equivalent for this custom server).
 */
const path = require('path')
const crossSpawn = require('cross-spawn')

const dotenv = require('dotenv')

const projectDir = path.join(__dirname, '..')

dotenv.config({ path: path.join(projectDir, '.env') })

const isHosted =
  process.env.HEROKU_APP_NAME ||
  process.env.DYNO ||
  process.env.PROJECT_REMIX_CHAIN

// Local `npm start`: avoid production auth gate unless deployed (Heroku/Glitch set NODE_ENV).
if (!isHosted) {
  process.env.NODE_ENV = 'development'
}

const gulpBin = path.join(projectDir, 'node_modules/gulp/bin/gulp.js')
const build = crossSpawn.sync('node', [gulpBin, 'generate-assets'], {
  cwd: projectDir,
  stdio: 'inherit'
})
if (build.status !== 0) {
  process.exit(build.status || 1)
}

require(path.join(projectDir, 'listen-on-port.js'))
