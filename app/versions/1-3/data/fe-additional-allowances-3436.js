/**
 * FE parity #3436 — /documentation/fe-additional-allowances-3436
 * Screenshots: app/assets/images/documentation/fe-additional-allowances-3436/*.png
 * Capture: npm run capture:fe-additional-allowances-docs (kit on port 3000)
 */

module.exports = {
  guideTitle: 'Remove additional allowances for colleges',
  guideDescription:
    'Ticket #3436 (FE parity): college hiring staff cannot offer school-style additional allowances, so jobseekers must not see that field on further education listings or in Quick Apply.',
  imageDir: 'fe-additional-allowances-3436',
  feJob: {
    id: '67663',
    title: 'SEN Teaching Assistant',
    organisation: 'Thrive Learning Center',
    phase: 'Further education'
  },
  schoolJob: {
    id: '67664',
    title: 'Youth Worker Team Leader',
    organisation: 'Stroud school',
    phase: 'Sixth form or college'
  },
  userNeed:
    'As FE college hiring staff, I do not offer additional allowances like schools do, so jobseekers should not see an Additional allowances field on college vacancies or application journeys.',
  successCriteria:
    'Neither hiring staff nor jobseekers see additional allowances on further education or college journeys. School listings may still show allowances when the hirer sets them.',
  implemented: [
    'showAdditionalAllowancesOnJobListing() in lib/quick-apply-fe.js — false for Further education phase and College organisation type.',
    'jobs/show.njk — Additional allowances summary row only when that helper returns true.',
    'Quick Apply task list unchanged — live application form has no additional allowances section; FE apply flow matches.',
    'Reference school job 67664 in mock data uses hasAdditionalAllowances: Yes for documentation comparison only.',
    'Hiring staff prototype (manage-teaching-jobs-prototype): isCollegeFeCreateJob() hides allowance questions on jobs/new|edit salary and check pages — see /documentation/fe-additional-allowances-3436 on that app (default PORT=3100).'
  ],
  hiringStaffDocUrl: 'http://localhost:3100/documentation/fe-additional-allowances-3436',
  screenshots: [
    {
      id: 'fe-listing',
      title: 'Further education job listing',
      file: 'fe-job-listing-no-allowances.png',
      caption:
        'Job details for SEN Teaching Assistant (67663) — no Additional allowances row on a further education vacancy.',
      prototypePath: '/jobs/67663#job-details'
    },
    {
      id: 'school-listing',
      title: 'School job listing (comparison)',
      file: 'school-job-listing-with-allowances.png',
      caption:
        'School vacancy 67664 still shows Additional allowances when the hirer sets them (school-only behaviour).',
      prototypePath: '/jobs/67664#job-details'
    },
    {
      id: 'fe-apply',
      title: 'Quick Apply task list',
      file: 'fe-quick-apply-task-list.png',
      caption:
        'Application task list for the same FE job — no Additional allowances section (aligned with live Quick Apply).',
      prototypePath: '/jobs/67663/apply/task-list'
    }
  ]
}
