#!/usr/bin/env node
/**
 * Render smoke test: every page-level .njk under app/versions/{1-1,1-2,1-3}/views
 * Must not throw "template not found" (other render errors are reported separately).
 */
const fs = require('fs')
const path = require('path')
const nunjucks = require('nunjucks')
const utils = require('../lib/utils')
const extensions = require('../lib/extensions/extensions')

const VERSIONS = ['1-1', '1-2', '1-3']

const SKIP_DIR_PARTS = new Set([
  'includes',
  'components',
  'macro.njk'
])

function shouldSkipFile (relPath) {
  const parts = relPath.split(path.sep)
  if (parts.some(p => p === 'includes' || p === 'components')) return true
  if (relPath.includes('/includes/')) return true
  if (parts.some(p => p.startsWith('layout'))) return true
  if (relPath.endsWith('scripts.html') || relPath.endsWith('head.html')) return true
  if (relPath.endsWith('layout_unbranded.html')) return true
  return false
}

function walkNjk (dir, base, out) {
  for (const ent of fs.readdirSync(dir, { withFileTypes: true })) {
    const abs = path.join(dir, ent.name)
    const rel = path.relative(base, abs)
    if (ent.isDirectory()) {
      walkNjk(abs, base, out)
    } else if (ent.name.endsWith('.njk') || ent.name.endsWith('.html')) {
      if (!shouldSkipFile(rel)) {
        out.push(rel.replace(/\\/g, '/'))
      }
    }
  }
}

function createEnv (version) {
  const viewPaths = extensions.getAppViews([
    path.join(__dirname, '..', 'app', 'versions', version, 'views'),
    path.join(__dirname, '..', 'app', 'views'),
    path.join(__dirname, '..', 'lib')
  ])
  const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(viewPaths, {
    noCache: true
  }), {
    autoescape: true,
    noCache: true
  })
  utils.addNunjucksFilters(env)
  utils.addCheckedFunction(env)
  return env
}

function loadContext (version) {
  const defaultsPath = path.join(__dirname, '..', 'app', 'versions', version, 'data', 'session-data-defaults.js')
  const defaults = require(defaultsPath)
  let user = null
  try {
    const users = require(path.join(__dirname, '..', 'app', 'versions', version, 'data', 'users.json'))
    user = users[0] || null
  } catch (_) {}

  const jobs = (defaults.jobs || []).filter(j => j.status === 'Active')
  return {
    ...defaults,
    data: defaults,
    jobs,
    job: jobs[0] || null,
    user,
    forceSignedIn: true,
    signedIn: true,
    prototypeVersion: version,
    serviceName: 'Teaching Vacancies',
    title: 'Smoke test',
    locationOptions: [],
    trnDisplay: '1234567',
    applicationCount: 0,
    savedJobList: [],
    notifications: [],
    accountAreaMain: false,
    homepage: false,
    contentPage: false
  }
}

function renderOne (env, templatePath, ctx) {
  return new Promise((resolve) => {
    const name = templatePath.endsWith('.njk') || templatePath.endsWith('.html')
      ? templatePath
      : `${templatePath}.njk`
    env.render(name, ctx, (err, html) => {
      if (err) {
        resolve({ ok: false, err: err.message })
        return
      }
      resolve({ ok: true, len: html.length })
    })
  })
}

async function main () {
  const notFound = []
  const otherErrors = []
  let okCount = 0
  let total = 0

  for (const version of VERSIONS) {
    const viewsRoot = path.join(__dirname, '..', 'app', 'versions', version, 'views')
    const templates = []
    walkNjk(viewsRoot, viewsRoot, templates)
    const env = createEnv(version)
    const ctx = loadContext(version)

    for (const rel of templates.sort()) {
      total++
      const viewName = rel.replace(/\.(njk|html)$/, '')
      const result = await renderOne(env, rel, { ...ctx, title: viewName })
      if (result.ok) {
        okCount++
        continue
      }
      const msg = result.err || ''
      if (/template not found/i.test(msg)) {
        notFound.push({ version, view: rel, msg: msg.split('\n').slice(0, 4).join(' | ') })
      } else {
        otherErrors.push({ version, view: rel, msg: msg.split('\n').slice(0, 2).join(' | ') })
      }
    }
  }

  console.log(`\nSmoke render: ${okCount}/${total} templates rendered without "template not found"\n`)

  if (notFound.length) {
    console.log('=== TEMPLATE NOT FOUND (must fix) ===')
    for (const f of notFound) {
      console.log(`[${f.version}] ${f.view}`)
      console.log(`  ${f.msg}\n`)
    }
  }

  if (otherErrors.length) {
    console.log(`=== Other render errors (${otherErrors.length}, often missing route data — OK for smoke) ===`)
    const byVersion = {}
    for (const e of otherErrors) {
      byVersion[e.version] = (byVersion[e.version] || 0) + 1
    }
    console.log(byVersion)
    console.log('Sample (first 8):')
    otherErrors.slice(0, 8).forEach(e => {
      console.log(`[${e.version}] ${e.view}: ${e.msg.slice(0, 120)}`)
    })
  }

  process.exit(notFound.length ? 1 : 0)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
