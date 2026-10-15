#!/usr/bin/env node
/**
 * Capture FE content parity documentation screenshots with Playwright.
 * Requires the kit running (default http://localhost:3000).
 *
 *   Terminal 1: npm start
 *   Terminal 2: npm run capture:fe-content-changes-docs
 */

const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')

const BASE = process.env.PROTOTYPE_BASE_URL || 'http://localhost:3000'
const PREFIX = '/1-1'
const JOB_ID = process.env.FE_CONTENT_DOC_JOB_ID || '67663'
const OUT_DIR = path.join(__dirname, '../app/assets/images/documentation/fe-content-changes-1')

const CAPTURES = [
  { file: 'fe-before-you-start.png', path: `/jobs/${JOB_ID}/apply` },
  { file: 'fe-personal-details.png', path: `/jobs/${JOB_ID}/apply/personal-details` },
  { file: 'fe-professional-status-support.png', path: `/jobs/${JOB_ID}/apply/professional-status` },
  { file: 'fe-personal-statement.png', path: `/jobs/${JOB_ID}/apply/personal-statement` },
  { file: 'fe-work-history.png', path: `/jobs/${JOB_ID}/apply/work-history` },
  { file: 'fe-references.png', path: `/jobs/${JOB_ID}/apply/references` },
  { file: 'fe-declarations.png', path: `/jobs/${JOB_ID}/apply/declarations` },
  { file: 'fe-submitted.png', path: `/jobs/${JOB_ID}/apply/submitted` }
]

async function assertServerRunning () {
  const probe = `${BASE}${PREFIX}/`
  try {
    const res = await fetch(probe, { signal: AbortSignal.timeout(8000) })
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
  } catch (err) {
    const reason = err.cause?.code === 'ECONNREFUSED' || err.message.includes('fetch failed')
      ? 'connection refused'
      : err.message
    console.error(`\nPrototype not reachable at ${BASE} (${reason}).\n`)
    console.error('  Terminal 1:  npm start')
    console.error('  Terminal 2:  npm run capture:fe-content-changes-docs\n')
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
      await page.waitForTimeout(500)
      const outPath = path.join(OUT_DIR, capture.file)
      await page.screenshot({ path: outPath, fullPage: true })
      console.log('ok')
    } catch (err) {
      failed += 1
      console.log('failed')
      console.error(`  ${err.message}`)
    }
  }

  await browser.close()
  require('./ensure-documentation-images.js')

  if (failed) {
    console.error(`\n${failed} capture(s) failed.\n`)
    process.exit(1)
  }
  console.log(`\nWrote ${CAPTURES.length} screenshots to ${OUT_DIR}\n`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
