#!/usr/bin/env node
/**
 * HTTP smoke test for mounted prototype versions (requires running server).
 * Usage: NODE_ENV=development PROTOTYPE_BASE_URL=http://127.0.0.1:3010 node scripts/smoke-version-http.js
 */
const http = require('http')
const https = require('https')

const BASE = process.env.PROTOTYPE_BASE_URL || 'http://127.0.0.1:3000'
const VERSIONS = ['1-1', '1-2', '1-3']

const PATHS = [
  '/',
  '/home',
  '/signed-in',
  '/jobseekers/account',
  '/account/personal-details',
  '/account/your-account',
  '/jobseekers/job_applications',
  '/jobseekers/saved_jobs',
  '/jobseekers/subscriptions',
  '/jobseekers/notifications',
  '/jobsfemerge',
  '/documentation/navigation-ia',
  '/mobile',
  '/compare',
  '/jobs/search/closing'
]

function fetch (url) {
  return new Promise((resolve, reject) => {
    const lib = url.startsWith('https') ? https : http
    const req = lib.get(url, { timeout: 15000 }, res => {
      let body = ''
      res.on('data', c => { body += c })
      res.on('end', () => resolve({ status: res.statusCode, body }))
    })
    req.on('error', reject)
    req.on('timeout', () => {
      req.destroy()
      reject(new Error('timeout'))
    })
  })
}

async function main () {
  const failures = []
  let ok = 0
  let total = 0

  for (const version of VERSIONS) {
    for (const p of PATHS) {
      const url = `${BASE}/${version}${p === '/' ? '' : p}`
      total++
      try {
        const { status, body } = await fetch(url)
        const templateErr = /template not found/i.test(body)
        const serverErr = status >= 500
        if (serverErr || templateErr) {
          const snippet = body.match(/template not found:[^<]+/i)?.[0] || body.slice(0, 120)
          failures.push({ url, status, snippet })
        } else if (status >= 400 && status !== 404) {
          failures.push({ url, status, snippet: `HTTP ${status}` })
        } else {
          ok++
        }
      } catch (e) {
        failures.push({ url, status: 'ERR', snippet: e.message })
      }
    }
  }

  console.log(`HTTP smoke: ${ok}/${total} OK (${BASE})\n`)
  if (failures.length) {
    console.log('Failures:')
    failures.forEach(f => console.log(`  ${f.status} ${f.url}\n    ${f.snippet}\n`))
    process.exit(1)
  }
}

main()
