const LIVE_ORIGIN = 'https://teaching-vacancies.service.gov.uk'
const PROXY_PREFIX = '/1-1/compare/live'

function toProxy (url, baseHref) {
  if (!url) return url
  const value = String(url).trim()
  if (!value || value.startsWith('#') || /^(?:mailto|tel|javascript|data):/i.test(value)) return url
  if (value.startsWith(PROXY_PREFIX)) return value
  if (value.startsWith(LIVE_ORIGIN)) return PROXY_PREFIX + value.slice(LIVE_ORIGIN.length)
  if (value.startsWith('/') && !value.startsWith('//')) return PROXY_PREFIX + value
  if (/^[a-z][a-z0-9+.-]*:/i.test(value)) return url

  try {
    const resolved = new URL(value, baseHref || LIVE_ORIGIN + '/')
    if (resolved.origin !== LIVE_ORIGIN) return url
    return PROXY_PREFIX + resolved.pathname + resolved.search + resolved.hash
  } catch (error) {
    return url
  }
}

function rewriteHtml (html, pageUrl) {
  const rewritten = html
    .replace(/\s+integrity\s*=\s*(["'])[^"']*\1/gi, '')
    .replace(/(\s(?:href|src|action|formaction|poster)\s*=\s*)(["'])([^"']*)\2/gi, function (match, attr, quote, url) {
      return attr + quote + toProxy(url, pageUrl) + quote
    })
    .replace(/(\ssrcset\s*=\s*)(["'])([^"']*)\2/gi, function (match, attr, quote, value) {
      const next = value.split(',').map(function (part) {
        const bits = part.trim().split(/\s+/)
        if (bits[0]) bits[0] = toProxy(bits[0], pageUrl)
        return bits.join(' ')
      }).join(', ')
      return attr + quote + next + quote
    })

  const script = '<script>(function(){var prefix=' + JSON.stringify(PROXY_PREFIX) + ';var origin=' + JSON.stringify(LIVE_ORIGIN) + ';function mapUrl(url){if(typeof url!=="string")return url;if(url.indexOf(origin)===0)return prefix+url.slice(origin.length);if(url.charAt(0)==="/"&&url.charAt(1)!=="/"&&url.indexOf(prefix)!==0)return prefix+url;return url}if(navigator.serviceWorker){navigator.serviceWorker.register=function(){return Promise.reject(new Error("disabled"))}}if(window.fetch){var nativeFetch=window.fetch;window.fetch=function(input,init){if(typeof input==="string")input=mapUrl(input);return nativeFetch.call(this,input,init)}}var open=XMLHttpRequest.prototype.open;XMLHttpRequest.prototype.open=function(method,url){var args=Array.prototype.slice.call(arguments);args[1]=mapUrl(String(url));return open.apply(this,args)};["assign","replace"].forEach(function(name){try{var original=Location.prototype[name];Location.prototype[name]=function(url){return original.call(this,mapUrl(String(url)))}}catch(error){}})})()</script>'

  if (/<head[^>]*>/i.test(rewritten)) {
    return rewritten.replace(/<head[^>]*>/i, function (match) { return match + script })
  }
  return script + rewritten
}

function rewriteCss (css, pageUrl) {
  return css.replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/gi, function (match, quote, url) {
    return 'url(' + quote + toProxy(url.trim(), pageUrl) + quote + ')'
  })
}

function formBody (req) {
  if (req.method === 'GET' || req.method === 'HEAD') return undefined
  const params = new URLSearchParams()

  function append (key, value) {
    if (value === undefined || value === null) return
    if (Array.isArray(value)) {
      value.forEach(function (item) { append(key, item) })
      return
    }
    if (typeof value === 'object') {
      Object.keys(value).forEach(function (child) { append(key + '[' + child + ']', value[child]) })
      return
    }
    params.append(key, String(value))
  }

  Object.keys(req.body || {}).forEach(function (key) { append(key, req.body[key]) })
  return params.toString()
}

async function proxyLive (req, res) {
  const upstreamPath = req.url.replace(/^\/compare\/live/, '') || '/'
  let target
  try {
    target = new URL(upstreamPath, LIVE_ORIGIN + '/')
  } catch (error) {
    res.status(400).type('html').send('<p>That live address could not be opened.</p>')
    return
  }

  if (target.origin !== LIVE_ORIGIN) {
    res.status(400).type('html').send('<p>This compare view only loads Teaching Vacancies.</p>')
    return
  }

  const headers = {
    accept: req.get('accept') || '*/*',
    'accept-language': req.get('accept-language') || 'en-GB,en;q=0.9',
    'user-agent': req.get('user-agent') || 'TeachingVacanciesPrototypeCompare'
  }
  const body = formBody(req)
  if (body) headers['content-type'] = 'application/x-www-form-urlencoded'

  let response
  try {
    response = await fetch(target, {
      method: req.method,
      redirect: 'manual',
      headers: headers,
      body: body,
      signal: AbortSignal.timeout(20000)
    })
  } catch (error) {
    res.status(502).type('html').send('<p>The live Teaching Vacancies page could not be loaded.</p>')
    return
  }

  if ([301, 302, 303, 307, 308].includes(response.status)) {
    const location = response.headers.get('location') || PROXY_PREFIX + '/'
    res.redirect(response.status, toProxy(location, target.href))
    return
  }

  const contentType = response.headers.get('content-type') || 'application/octet-stream'
  const buffer = Buffer.from(await response.arrayBuffer())
  let output = buffer

  if (/text\/html/i.test(contentType)) {
    output = Buffer.from(rewriteHtml(buffer.toString('utf8'), target.href))
  } else if (/text\/css/i.test(contentType)) {
    output = Buffer.from(rewriteCss(buffer.toString('utf8'), target.href))
  }

  res.status(response.status)
  res.set('Content-Type', contentType)
  res.set('Cache-Control', 'private, max-age=60')
  res.end(output)
}

function liveProxy (req, res, next) {
  if (!['GET', 'HEAD', 'POST'].includes(req.method)) {
    res.status(405).type('html').send('<p>That request cannot be shown in compare.</p>')
    return
  }
  proxyLive(req, res).catch(next)
}

module.exports = liveProxy
