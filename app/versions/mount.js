const express = require('express')
const fs = require('fs')
const path = require('path')
const nunjucks = require('nunjucks')
const extensions = require('../../lib/extensions/extensions')
const utils = require('../../lib/utils')

const VERSIONS = ['1-0', '1-1']

const SHARED_ROOTS = ['/public', '/docs', '/prototype-admin', '/node_modules', '/govuk', '/extension-assets']

function versionDir (version) {
  return path.join(__dirname, version)
}

function versionFromRequest (req) {
  const match = req.path.match(/^\/(1-0|1-1)(?:\/|$)/)
  return match ? match[1] : null
}

function isVersionPath (address) {
  return VERSIONS.some(version => {
    const prefix = `/${version}`
    return address === prefix || address.startsWith(`${prefix}/`) || address.startsWith(`${prefix}?`)
  })
}

function isSharedPath (address) {
  return SHARED_ROOTS.some(root => {
    return address === root || address.startsWith(`${root}/`) || address.startsWith(`${root}?`)
  })
}

function shouldPrefix (address) {
  if (typeof address !== 'string' || !address.startsWith('/') || address.startsWith('//')) return false
  if (isVersionPath(address) || isSharedPath(address)) return false
  return true
}

function prefixHtml (html, prefix) {
  const roots = SHARED_ROOTS.map(root => root.slice(1)).join('|')
  const pattern = new RegExp(
    `(\\s(?:href|action|formaction)=["'])\\/(?!["']|\\/|1-0(?:\\/|["'?])|1-1(?:\\/|["'?])|(?:${roots})(?:\\/|["'?]))`,
    'gi'
  )
  return html.replace(pattern, `$1${prefix}/`)
}

// Same checkbox and nested-field behaviour as lib/utils autoStoreData.
function storeData (input, data) {
  for (const i in input) {
    if (i.indexOf('_') === 0) continue

    let val = input[i]

    if (val === '_unchecked' || (Array.isArray(val) && val.length === 1 && val[0] === '_unchecked')) {
      delete data[i]
      continue
    }

    if (Array.isArray(val)) {
      const index = val.indexOf('_unchecked')
      if (index !== -1) val.splice(index, 1)
    } else if (val && typeof val === 'object') {
      if (typeof data[i] !== 'object' || data[i] === null) data[i] = {}
      storeData(val, data[i])
      continue
    }

    data[i] = val
  }
}

const defaultsByVersion = {}
VERSIONS.forEach(version => {
  defaultsByVersion[version] = require(path.join(versionDir(version), 'data/session-data-defaults.js'))
})

function session (req, res, next) {
  const version = versionFromRequest(req)
  if (!version) return next()

  req.prototypeVersion = version
  if (!req.session.versions) req.session.versions = {}

  const data = Object.assign({}, defaultsByVersion[version], req.session.versions[version] || {})
  storeData(req.body, data)
  storeData(req.query, data)
  req.session.versions[version] = data
  req.session.data = data

  res.locals.data = {}
  for (const key in data) {
    res.locals.data[key] = data[key]
  }
  res.locals.prototypeVersion = version
  next()
}

function createEnv (version) {
  const viewPaths = extensions.getAppViews([
    path.join(versionDir(version), 'views'),
    path.join(__dirname, '../../lib/')
  ])
  const env = new nunjucks.Environment(new nunjucks.FileSystemLoader(viewPaths, {
    noCache: true
  }), {
    autoescape: true,
    noCache: true,
    watch: false
  })
  utils.addNunjucksFilters(env)
  utils.addCheckedFunction(env)
  return env
}

function bindVersionResponse (req, res, next, version, env) {
  const prefix = `/${version}`
  const redirect = res.redirect.bind(res)
  const send = res.send.bind(res)
  const end = res.end.bind(res)

  res.redirect = function (status, address) {
    if (typeof status !== 'number') {
      address = status
      status = 302
    }
    if (shouldPrefix(address)) address = prefix + address
    return redirect(status, address)
  }

  function rewrite (body) {
    if (typeof body !== 'string' || body.indexOf('<') === -1) return body
    return prefixHtml(body, prefix)
  }

  res.send = function (body) {
    return send(rewrite(body))
  }

  res.end = function (body, encoding, callback) {
    if (typeof body === 'string') body = rewrite(body)
    return end(body, encoding, callback)
  }

  res.render = function (view, options, callback) {
    if (typeof options === 'function') {
      callback = options
      options = {}
    }
    const context = Object.assign({}, res.locals, options || {})

    const finish = (err, html) => {
      if (err) {
        if (callback) return callback(err)
        return next(err)
      }
      if (callback) return callback(null, html)
      return res.send(html)
    }

    const renderName = (name, onError) => {
      const template = /\.(njk|html)$/.test(name) ? name : `${name}.njk`
      env.render(template, context, (err, html) => {
        if (err && onError && String(err.message).includes('template not found')) return onError(err)
        finish(err, html)
      })
    }

    renderName(view, () => renderName(`${view}/index`))
  }
}

function viewExists (version, view) {
  const viewsRoot = path.join(versionDir(version), 'views')
  const file = path.resolve(viewsRoot, view)
  if (file !== viewsRoot && !file.startsWith(viewsRoot + path.sep)) return false
  return ['.njk', '.html'].some(ext => fs.existsSync(file + ext)) ||
    ['index.njk', 'index.html'].some(name => fs.existsSync(path.join(file, name)))
}

function createRouter (version) {
  const router = express.Router()
  const env = createEnv(version)
  const versionRoutes = require(path.join(versionDir(version), 'routes.js'))

  router.use((req, res, next) => {
    bindVersionResponse(req, res, next, version, env)
    next()
  })
  router.use(versionRoutes)
  router.get(/^\/([^.]+)$/, (req, res, next) => {
    const view = req.params[0]
    if (!view || view.includes('..') || !viewExists(version, view)) return next()
    res.render(view)
  })
  return router
}

const routers = {}
VERSIONS.forEach(version => {
  routers[version] = createRouter(version)
})

function legacyRedirect (req, res, next) {
  if (
    req.path === '/' ||
    isVersionPath(req.path) ||
    isSharedPath(req.path)
  ) return next()

  const target = `/1-0${req.originalUrl}`
  if (req.method === 'POST') return res.redirect(307, target)
  if (req.method === 'GET' || req.method === 'HEAD') return res.redirect(302, target)
  return next()
}

function mount (app) {
  VERSIONS.forEach(version => {
    app.use(`/${version}`, routers[version])
  })
  app.get('/', (req, res) => {
    res.render('prototypes/index')
  })
  app.use(legacyRedirect)
}

module.exports = {
  session,
  mount
}
