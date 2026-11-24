// Jobseeker guides (replicated from https://teaching-vacancies.service.gov.uk/jobseeker-guides).
const pages = require('../data/jobseeker-guides')

module.exports = function (router) {
  const byPath = new Map(pages.map((p) => [p.path, p]))

  // Live site also serves child pages directly under /jobseeker-guides/<slug>.
  const bySlug = new Map()
  pages.forEach((p) => {
    const slug = p.path.split('/').pop()
    if (p.path.split('/').length > 3) bySlug.set(slug, p.path)
  })

  // Alternative designs, served with ?v2 (e.g. /jobseeker-guides/.../return-to-teaching-step-by-step?v2).
  const v2Views = {
    '/jobseeker-guides/return-to-teaching-in-england/return-to-teaching-step-by-step':
      'jobseeker-guides/return-to-teaching-in-england/return-to-teaching-step-by-step-v2'
  }

  router.get(/^\/jobseeker-guides(?:\/.*)?$/, (req, res, next) => {
    const requested = req.path.replace(/\/+$/, '') || '/jobseeker-guides'
    const page = byPath.get(requested)
    if (page) {
      const view = 'v2' in req.query && v2Views[requested] ? v2Views[requested] : page.view
      return res.render(view, { title: page.title })
    }
    const slug = requested.split('/').pop()
    if (requested.split('/').length === 3 && bySlug.has(slug)) {
      return res.redirect(bySlug.get(slug))
    }
    return next()
  })
}
