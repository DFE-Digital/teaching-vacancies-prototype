#!/usr/bin/env node
/**
 * Capture Profile changes documentation screenshots.
 * Requires kit on http://localhost:3000 with signed-in jobseeker (uses forceSignedIn pages).
 */

const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')

const BASE = process.env.PROTOTYPE_BASE_URL || 'http://localhost:3000'
const PREFIX = '/1-1'
const OUT_DIR = path.join(__dirname, '../app/assets/images/documentation/profile-changes')

const CAPTURES = [
  { file: 'service-nav.png', path: '/jobseekers/subscriptions?jobAlertState=alert', clipNav: true },
  {
    file: 'applications-sub-nav.png',
    path: '/jobseekers/job_applications',
    clipSelector: '.moj-sub-navigation'
  },
  { file: 'us-applications-list.png', path: '/jobseekers/job_applications' },
  { file: 'us-saved-jobs.png', path: '/onelogin/journey/match?savedJobState=saved' },
  { file: 'us1-job-alerts-list.png', path: '/jobseekers/subscriptions?jobAlertState=alert' },
  { file: 'us2-create-alert.png', path: '/jobalerts/jobalert' },
  { file: 'us2-edit-alert.png', path: '/jobalerts/jobalert?alertId=alert-design-london' },
  { file: 'us3-manage-alert.png', path: '/jobseekers/subscriptions?jobAlertState=alert' },
  { file: 'us4-notifications-inbox.png', path: '/jobseekers/notifications' },
  { file: 'us4-notification-detail.png', path: '/jobseekers/notifications/notif-1' },
  { file: 'rp-personal-details.png', path: '/account/personal-details' }
]

async function main () {
  fs.mkdirSync(OUT_DIR, { recursive: true })
  const browser = await chromium.launch()
  const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 })

  for (const capture of CAPTURES) {
    const url = `${BASE}${PREFIX}${capture.path}`
    process.stdout.write(`Capturing ${capture.file} … `)
    await page.goto(url, { waitUntil: 'load', timeout: 60000 })
    await page.waitForTimeout(500)
    if (capture.clipNav) {
      const nav = page.locator('.govuk-service-navigation')
      if (await nav.count()) {
        await nav.screenshot({ path: path.join(OUT_DIR, capture.file) })
      } else {
        await page.screenshot({ path: path.join(OUT_DIR, capture.file), fullPage: false })
      }
    } else if (capture.clipSelector) {
      const el = page.locator(capture.clipSelector)
      if (await el.count()) {
        await el.first().screenshot({ path: path.join(OUT_DIR, capture.file) })
      } else {
        await page.screenshot({ path: path.join(OUT_DIR, capture.file), fullPage: false })
      }
    } else {
      await page.screenshot({ path: path.join(OUT_DIR, capture.file), fullPage: true })
    }
    console.log('ok')
  }

  await browser.close()
  require('./ensure-documentation-images.js')
  console.log(`\nWrote screenshots to ${OUT_DIR}\n`)
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
