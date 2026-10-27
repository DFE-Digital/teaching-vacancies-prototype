#!/usr/bin/env node
/**
 * Capture signed-in navigation IA documentation screenshots (v1.0–v1.3).
 * Requires kit on http://127.0.0.1:3000 (use NODE_ENV=development to avoid HTTPS redirect).
 * Visits each version’s /signed-in first for session.
 */

const fs = require('fs')
const path = require('path')
const { chromium } = require('playwright')

const BASE = process.env.PROTOTYPE_BASE_URL || 'http://127.0.0.1:3000'
const ASSETS = path.join(__dirname, '../app/assets/images/documentation')

const VERSIONS = [
  {
    prefix: '/1-0',
    dir: 'navigation-ia-1-0',
    captures: [
      { file: '1-0-header-signed-in.png', path: '/jobseekers/job_applications', clipSelector: '.govuk-header' },
      { file: '1-0-service-navigation.png', path: '/jobseekers/job_applications', clipSelector: '.govuk-service-navigation' },
      {
        file: '1-0-applications-account-nav.png',
        path: '/jobseekers/job_applications',
        clipSelector: '#main-content',
        waitSelector: '.app-account-nav'
      },
      {
        file: '1-0-profile-shortcuts.png',
        path: '/profile',
        clipSelector: '#main-content',
        waitSelector: '.app-profile-shortcuts'
      }
    ]
  },
  {
    prefix: '/1-1',
    dir: 'navigation-ia-1-1',
    captures: [
      { file: '1-1-header-signed-in.png', path: '/jobseekers/job_applications', clipSelector: '.govuk-header' },
      { file: '1-1-service-navigation.png', path: '/jobseekers/job_applications', clipSelector: '.govuk-service-navigation' },
      {
        file: '1-1-applications-moj-sub-nav.png',
        path: '/jobseekers/job_applications',
        clipSelector: '#main-content',
        waitSelector: '.moj-sub-navigation'
      },
      {
        file: '1-1-job-alerts-sub-nav.png',
        path: '/jobseekers/subscriptions',
        clipSelector: '#main-content',
        waitSelector: '.moj-sub-navigation'
      },
      {
        file: '1-1-profile-personal-details.png',
        path: '/account/personal-details',
        clipSelector: '#main-content',
        waitSelector: '.govuk-summary-card'
      }
    ]
  },
  {
    prefix: '/1-2',
    dir: 'navigation-ia-1-2',
    captures: [
      { file: '1-2-header-signed-in.png', path: '/jobseekers/account', clipSelector: '.govuk-header' },
      { file: '1-2-service-navigation.png', path: '/jobseekers/account', clipSelector: '.govuk-service-navigation' },
      {
        file: '1-2-account-hub.png',
        path: '/jobseekers/account',
        clipSelector: '#main-content',
        waitSelector: '.app-account-featured-list'
      },
      {
        file: '1-2-applications-breadcrumbs.png',
        path: '/jobseekers/job_applications',
        clipSelector: '#main-content',
        waitSelector: '.govuk-breadcrumbs'
      },
      {
        file: '1-2-notifications-breadcrumbs.png',
        path: '/jobseekers/notifications',
        clipSelector: '#main-content',
        waitSelector: '.govuk-breadcrumbs'
      }
    ]
  },
  {
    prefix: '/1-3',
    dir: 'navigation-ia-1-3',
    captures: [
      { file: '1-3-header-signed-in.png', path: '/jobseekers/account', clipSelector: '.govuk-header' },
      { file: '1-3-service-navigation.png', path: '/jobseekers/account', clipSelector: '.govuk-service-navigation' },
      {
        file: '1-3-account-hub.png',
        path: '/jobseekers/account',
        clipSelector: '#main-content',
        waitSelector: '.app-account-featured-list'
      },
      {
        file: '1-3-applications-chrome.png',
        path: '/jobseekers/job_applications',
        clipSelector: '#main-content',
        waitSelector: '.moj-sub-navigation'
      },
      {
        file: '1-3-help-with-account.png',
        path: '/account/your-account',
        clipSelector: '#main-content',
        waitSelector: 'nav[aria-label="On this page"]'
      }
    ]
  }
]

async function captureOne (page, prefix, outDir, capture) {
  const url = `${BASE}${prefix}${capture.path}`
  process.stdout.write(`Capturing ${capture.file} … `)
  await page.goto(url, { waitUntil: 'load', timeout: 60000 })
  await page.evaluate(() => window.scrollTo(0, 0))
  if (capture.waitSelector) {
    await page.waitForSelector(capture.waitSelector, { timeout: 60000 })
  }
  await page.waitForTimeout(400)
  const outPath = path.join(outDir, capture.file)
  const el = page.locator(capture.clipSelector)
  if (await el.count()) {
    await el.first().scrollIntoViewIfNeeded()
    await page.waitForTimeout(200)
    await el.first().screenshot({ path: outPath })
  } else {
    await page.screenshot({ path: outPath, fullPage: false })
  }
  console.log('ok')
}

async function main () {
  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1280, height: 900 },
    deviceScaleFactor: 2,
    ignoreHTTPSErrors: true
  })
  const page = await context.newPage()

  for (const version of VERSIONS) {
    const outDir = path.join(ASSETS, version.dir)
    fs.mkdirSync(outDir, { recursive: true })
    console.log(`\n${version.prefix}`)
    await page.goto(`${BASE}${version.prefix}/signed-in`, { waitUntil: 'load', timeout: 60000 })
    for (const capture of version.captures) {
      await captureOne(page, version.prefix, outDir, capture)
    }
  }

  await browser.close()
  require('./ensure-documentation-images.js')
  console.log('\nDone.\n')
}

main().catch(err => {
  console.error(err)
  process.exit(1)
})
