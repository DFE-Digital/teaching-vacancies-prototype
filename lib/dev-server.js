/**
 * Kit v14-style dev workflow: build assets once, watch Sass/assets, nodemon + custom server.
 * Custom listen-on-port.js keeps /1-0, /1-1, /1-2 mounts and docs (not stock kit server.js).
 */
const path = require('path')
const crossSpawn = require('cross-spawn')
const nodemon = require('nodemon')

const projectDir = path.join(__dirname, '..')
const kitVersion = require('govuk-prototype-kit/package.json').version
const { runPrototypeStartup } = require('./prototype-startup')

async function runDevServer () {
  await runPrototypeStartup()

  console.log('')
  console.log(`GOV.UK Prototype Kit ${kitVersion}`)
  console.log('')
  console.log('NOTICE: the kit is for building prototypes, do not use it for production services.')
  console.log('')

  const gulpBin = path.join(projectDir, 'node_modules/gulp/bin/gulp.js')
  const build = crossSpawn.sync('node', [gulpBin, 'generate-assets'], {
    cwd: projectDir,
    stdio: 'inherit'
  })
  if (build.status !== 0) {
    process.exit(build.status || 1)
  }

  const watch = crossSpawn('node', [gulpBin, 'watch-prototype'], {
    cwd: projectDir,
    stdio: 'inherit'
  })

  const onQuit = () => {
    watch.kill()
    process.exit(0)
  }

  process.on('SIGINT', onQuit)
  process.on('SIGTERM', onQuit)

  nodemon({
    watch: [
      path.join(projectDir, '.env'),
      path.join(projectDir, 'server.js'),
      path.join(projectDir, 'listen-on-port.js'),
      path.join(projectDir, 'app'),
      path.join(projectDir, 'lib'),
      path.join(projectDir, 'docs')
    ],
    script: path.join(projectDir, 'listen-on-port.js'),
    ext: 'js,json',
    ignore: [
      path.join(projectDir, 'public/**'),
      path.join(projectDir, 'app/assets/**'),
      path.join(projectDir, 'node_modules/**')
    ],
    delay: 2000
  })
    .on('crash', () => {
      console.log('[nodemon] For missing modules try running `npm install`')
    })
    .on('quit', onQuit)
}

runDevServer().catch(err => {
  console.error(err)
  process.exit(1)
})
