/**
 * Production-style serve (Kit CLI `start` / `serve` equivalent for this custom server).
 */
const path = require('path')
const crossSpawn = require('cross-spawn')

const projectDir = path.join(__dirname, '..')

process.env.NODE_ENV = process.env.NODE_ENV || 'production'

const gulpBin = path.join(projectDir, 'node_modules/gulp/bin/gulp.js')
const build = crossSpawn.sync('node', [gulpBin, 'generate-assets'], {
  cwd: projectDir,
  stdio: 'inherit'
})
if (build.status !== 0) {
  process.exit(build.status || 1)
}

require(path.join(projectDir, 'listen-on-port.js'))
