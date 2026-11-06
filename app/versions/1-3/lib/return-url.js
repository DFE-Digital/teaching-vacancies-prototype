function isSameSitePath (value) {
  return typeof value === 'string' &&
    value.startsWith('/') &&
    !value.startsWith('//') &&
    !value.includes('\\') &&
    !value.includes('://')
}

function stripVersionPrefix (path) {
  return path.replace(/^\/1-[0-3](?=\/)/, '') || '/'
}

function normalizeReturnUrl (value) {
  if (!isSameSitePath(value)) return null
  const pathOnly = value.split('?')[0]
  const query = value.includes('?') ? value.slice(value.indexOf('?')) : ''
  return stripVersionPrefix(pathOnly) + query
}

function isSignInFlowPath (path) {
  return path.startsWith('/account/sign-in') ||
    path.startsWith('/onelogin/') ||
    path.startsWith('/account/new') ||
    path.startsWith('/account/sign-out') ||
    path.startsWith('/account/add-your-details')
}

function returnUrlFromRequest (req) {
  const query = req.url && req.url.includes('?') ? req.url.slice(req.url.indexOf('?')) : ''
  return stripVersionPrefix(req.path) + query
}

function captureSignInReturnUrl (req, explicit) {
  const normalized = normalizeReturnUrl(explicit || req.query.returnUrl)
  if (normalized) {
    req.session.data.signInReturnUrl = normalized
  }
  return req.session.data.signInReturnUrl || null
}

function resolveSignInReturnUrl (req, bodyReturnUrl) {
  // Session is set when the user started sign-in (e.g. search results); prefer it over
  // form defaults such as /jobseekers/account on the One Login Continue page.
  const fromSession = normalizeReturnUrl(req.session.data.signInReturnUrl)
  if (fromSession) {
    delete req.session.data.signInReturnUrl
    return fromSession
  }
  const fromBody = normalizeReturnUrl(bodyReturnUrl)
  if (fromBody) {
    return fromBody
  }
  return null
}

function signInHref (returnUrl) {
  const base = '/account/sign-in'
  const normalized = normalizeReturnUrl(returnUrl)
  if (!normalized) return base
  return `${base}?returnUrl=${encodeURIComponent(normalized)}`
}

function jobseekerSignInHref (returnUrl) {
  const base = '/account/sign-in/jobseeker'
  const normalized = normalizeReturnUrl(returnUrl)
  if (!normalized) return base
  return `${base}?returnUrl=${encodeURIComponent(normalized)}`
}

function oneLoginStartHref (returnUrl) {
  const base = '/onelogin/start'
  const normalized = normalizeReturnUrl(returnUrl)
  if (!normalized) return base
  return `${base}?returnUrl=${encodeURIComponent(normalized)}`
}

module.exports = {
  isSameSitePath,
  normalizeReturnUrl,
  isSignInFlowPath,
  returnUrlFromRequest,
  captureSignInReturnUrl,
  resolveSignInReturnUrl,
  signInHref,
  jobseekerSignInHref,
  oneLoginStartHref
}
