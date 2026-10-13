#!/usr/bin/env node
/**
 * Capture Quick Apply documentation screenshots with Playwright.
 * Requires the kit running (default http://localhost:3000).
 *
 *   Terminal 1: npm start
 *   Terminal 2: npm run capture:quick-apply-docs
 *
 * Optional: PROTOTYPE_BASE_URL, QA_DOC_JOB_ID
 */

const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')

const BASE = process.env.PROTOTYPE_BASE_URL || 'http://localhost:3000'
const PREFIX = '/1-1'
const JOB_ID = process.env.QA_DOC_JOB_ID || '67663'
// Written under app/assets so Heroku `gulp generate-assets` copies them to public/
const OUT_DIR = path.join(__dirname, '../app/assets/images/documentation/quick-apply-1')

const CAPTURES = [
  { file: 'tv3-before-you-start.png', path: `/jobs/${JOB_ID}/apply` },
  { file: 'tv4-task-list.png', path: `/jobs/${JOB_ID}/apply/task-list` },
  { file: 'tv6-professional-status.png', path: `/jobs/${JOB_ID}/apply/professional-status` },
  { file: 'tv13-work-history.png', path: `/jobs/${JOB_ID}/apply/work-history` },
  { file: 'tv16-personal-statement.png', path: `/jobs/${JOB_ID}/apply/personal-statement` },
  { file: 'tv17-references.png', path: `/jobs/${JOB_ID}/apply/references` },
  { file: 'tv22-declarations.png', path: `/jobs/${JOB_ID}/apply/declarations` },
  { file: 'gds-validation.png', path: `/jobs/${JOB_ID}/apply/review` },
  { file: 'tv2-apply-entry.png', path: `/jobs/${JOB_ID}` }
]

async function assertServerRunning () {
  const probe = `${BASE}${PREFIX}/`
  try {
    const res = await fetch(probe, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) {
      throw new Error(`HTTP ${res.status}`)
    }
  } catch (err) {
    const reason = err.cause?.code === 'ECONNREFUSED' || err.message.includes('fetch failed')
      ? 'connection refused'
      : err.message
    console.error(`\nPrototype not reachable at ${BASE} (${reason}).\n`)
    console.error('Keep the kit running while you capture — do not stop it with Ctrl+C first.\n')
    console.error('  Terminal 1:  npm start')
    console.error('  Terminal 2:  npm run capture:quick-apply-docs\n')
    process.exit(1)
  }
}

async function main () {
  await assertServerRunning()

  fs.mkdirSync(OUT_DIR, { recursive: true })

  let browser
  try {
    browser = await chromium.launch()
  } catch (err) {
    if (err.message && err.message.includes("Executable doesn't exist")) {
      console.error('\nPlaywright browser not installed. Run:\n\n  npx playwright install chromium\n')
    }
    throw err
  }

  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2
  })
  const page = await context.newPage()

  let failed = 0

  for (const capture of CAPTURES) {
    const url = `${BASE}${PREFIX}${capture.path}`
    process.stdout.write(`Capturing ${capture.file} … `)
    try {
      await page.goto(url, { waitUntil: 'load', timeout: 60000 })
      await page.waitForSelector('#main-content', { timeout: 15000 })
      await page.waitForTimeout(300)
      const main = page.locator('#main-content')
      await main.screenshot({
        path: path.join(OUT_DIR, capture.file)
      })
      console.log('ok')
    } catch (err) {
      failed += 1
      console.log('failed')
      console.error(`  ${err.message}`)
    }
  }

  await browser.close()
  console.log(`\nSaved to ${OUT_DIR}`)

  if (failed > 0) {
    process.exit(1)
  }
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
