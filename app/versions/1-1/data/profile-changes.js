/**
 * Profile changes — /documentation/profile-changes
 * Screenshots: app/assets/images/documentation/profile-changes/
 */

module.exports = {
  guideTitle: 'Profile changes',
  guideDescription:
    'Business requirements and user stories for the v1.1 jobseeker information architecture: Applications, Job alerts, and Notifications in service navigation; Your account in the GOV.UK header; personal details and account settings under MOJ sub navigation. Date captured: 16 Oct 2026.',
  imageDir: 'profile-changes',
  serviceNavScreenshot: 'service-nav.png',
  headerAccountScreenshot: 'header-your-account.png',
  applicationsSubNavScreenshot: 'applications-sub-nav.png',
  accountSubNavScreenshot: 'account-sub-nav.png',
  applicationsSubNavCaption:
    'MOJ sub navigation in main content under the Applications H1 and intro (Applications | Your saved jobs).',
  accountSubNavCaption:
    'MOJ sub navigation in main content under the Your account H1 and intro (Personal details | Account settings).',
  subAreaPageLayout: {
    title: 'Tabbed areas — shared page hierarchy',
    intro:
      'Applications (with Your saved jobs) and Your account (with Account settings) use the same pattern. Job alerts and Notifications use a single H1 and intro only — no MOJ sub navigation.',
    items: [
      'H1 (govuk-heading-l): area title — “Applications” or “Your account”.',
      'Intro paragraph: explains what each sub-navigation tab is for.',
      'MOJ sub navigation in #main-content (removed from below the phase banner).',
      'H2 (govuk-heading-m): current tab (e.g. Personal details, Account settings, Applications (count), Your saved jobs (count)).',
      'Content below the H2: summary cards, filters, or H3 sections on Account settings.'
    ]
  },
  requirementsCaption: 'Jobseeker UX requirements (RP01–RP07)',
  requirements: [
    {
      id: 'RP01',
      name: 'Job alerts page',
      description:
        'There is a need to have a page where you can view, update or delete job alerts that is not connected to the Profile.'
    },
    {
      id: 'RP02',
      name: 'Job alerts page',
      description:
        'There needs to be an ability for a user to set up a job alert. When they register, existing job alerts are pulled into the Job Alerts page so that registered users can view and delete their existing job searches.'
    },
    {
      id: 'RP03',
      name: 'Personal details screen',
      description:
        'There is a need for a personal details page. Data to be displayed: first name, last name, TRN, email address.'
    },
    {
      id: 'RP04',
      name: 'Updating personal details',
      description:
        'There needs to be an ability for a registered user to change their email address in GOV.UK One Login and for that to persist in Teaching Vacancies.'
    },
    {
      id: 'RP05',
      name: 'Updating personal details',
      description:
        'There needs to be an ability for a registered user to change their first name, last name and TRN in Teaching Vacancies only.'
    },
    {
      id: 'RP07',
      name: 'Profiles (jobseeker)',
      description: 'There is a need to remove Profile from the jobseeker journey.'
    }
  ],
  serviceNavigation: {
    intro:
      'When signed in, jobseekers reach four main areas. Three are in GOV.UK service navigation below the phase banner: Applications, Job alerts, and Notifications. The fourth — Your account — is in the GOV.UK header (top right), not in service navigation.',
    items: [
      {
        name: 'Applications',
        prototypePath: '/jobseekers/job_applications',
        description:
          'Shared H1 Applications + intro + MOJ sub navigation; H2 Applications (count) with status filter and summary cards. Service nav stays on Applications for Your saved jobs too.'
      },
      {
        name: 'Job alerts',
        prototypePath: '/jobseekers/subscriptions?jobAlertState=alert',
        description:
          'Vacancy alerts only — summary cards, create/edit/delete, frequency controls. Page header (H1 + intro + Create a job alert); no MOJ sub navigation.'
      },
      {
        name: 'Notifications',
        prototypePath: '/jobseekers/notifications',
        description:
          'ATS-style inbox for application updates (page header, read/unread toolbar, detail pages with CTAs). No MOJ sub navigation; intro copy distinguishes notifications from job alerts.'
      }
    ],
    headerAccount: {
      name: 'Your account',
      prototypePath: '/account/personal-details',
      description:
        'Header link to /account/personal-details (GET /account redirects there). Same tabbed layout as Applications: H1 Your account, intro, MOJ sub navigation (Personal details | Account settings), H2 (govuk-heading-m) for the active tab.'
    }
  },
  applicationsArea: {
    title: 'Applications and saved jobs',
    intro:
      'The Applications service navigation item covers two related pages. Shared H1 Applications, intro copy, then MOJ sub navigation (Applications | Your saved jobs), then an H2 for the current tab. Job alerts and Notifications do not use this pattern.',
    annotations: [
      'Intro copy: track submissions on Applications; review saved vacancies on Your saved jobs.',
      'Service navigation Applications stays active for both sub pages (route sets activeNav).',
      'Sub navigation: Applications | Your saved jobs — in main content; aria-current="page" and MOJ active styling.',
      'Tab H2 uses govuk-heading-m (Applications (count) with filter row; Your saved jobs (count) with sort controls).',
      'Applications list: each application is a GOV.UK summary card (title + reference, card action, summary list with organisation, activity, closing date, status tag).',
      'Saved jobs: each saved job is a summary card with Apply and Delete card actions; sort by date added, deadline, or title.',
      'Saved jobs prototype defaults to saved mock data (10 jobs from jobs listing); footer toggles empty state only when ?savedJobState=empty.',
      'Your saved jobs sub-nav link includes ?savedJobState=saved so mock data always loads.'
    ],
    implemented: [
      'includes/applications-page-header.njk and includes/jobseeker-account-nav.njk on both Applications and Your saved jobs.',
      'GET /jobseekers/job_applications — summary cards via application-summary-card.njk.',
      'GET /onelogin/journey/match — buildSampleSavedJobs() from jobs.json plus two fixed demo titles; saved state unless empty query.',
      'Nav state in routes.js middleware and render locals for activeNav / jobseekerSubNavSection.'
    ],
    screenshots: [
      {
        screenshot: 'us-applications-list.png',
        screenshotCaption:
          'Applications — H1, intro, sub navigation, H2 with filter, and application summary cards.',
        prototypePath: '/jobseekers/job_applications'
      },
      {
        screenshot: 'us-saved-jobs.png',
        screenshotCaption:
          'Your saved jobs — H1, intro, sub navigation, H2 with sort controls, and summary cards (saved mock state).',
        prototypePath: '/onelogin/journey/match?savedJobState=saved'
      }
    ]
  },
  yourAccountArea: {
    title: 'Your account (Personal details and Account settings)',
    intro:
      'Personal details and sign-in or account options are grouped under Your account in the header, separate from Applications, Job alerts, and Notifications.',
    annotations: [
      'Shared layout: H1 “Your account” (govuk-heading-l), intro paragraph, MOJ sub navigation (Personal details | Account settings), then H2 (govuk-heading-m) for the current tab.',
      'Intro: use Personal details for name, TRN and email; Account settings for sign-in, email preferences and closing your account.',
      'Personal details: summary cards for name, TRN, and email; change name and TRN in Teaching Vacancies (demo user Joe Bloggs in users.json).',
      'Email card: link to GOV.UK One Login settings with visible text “GOV.UK One Login (opens in a new tab)” (target="_blank", rel="noopener noreferrer").',
      'Account settings (/account/your-account): sign-in via One Login, import help, close account, opt out of marketing emails; section headings are H3 under the page H2.'
    ],
    implemented: [
      'GET /account → redirect /account/personal-details; header Your account sets primaryNavId account.',
      'includes/account-page-header.njk and includes/account-sub-nav.njk shared across account tabs.',
      'GET /account/your-account — Account settings page title and sub-nav label.'
    ],
    screenshots: [
      {
        screenshot: 'rp-personal-details.png',
        screenshotCaption:
          'Personal details — H1, intro, sub navigation, H2, and name/TRN/email summary cards.',
        prototypePath: '/account/personal-details'
      },
      {
        screenshot: 'rp-account-settings.png',
        screenshotCaption:
          'Account settings — H1, intro, sub navigation, H2, and H3 sections (sign-in, close account, emails).',
        prototypePath: '/account/your-account'
      }
    ]
  },
  userStories: [
    {
      id: '1',
      requirementIds: ['RP01', 'RP02'],
      story:
        'As a job seeker, I want to view my configured job alerts, so that I can understand what vacancies I am being notified about.',
      acceptanceCriteria: [
        'A Job Alerts section is available from service navigation when signed in.',
        'Users can view all active job alerts.',
        'Each alert displays its search criteria.',
        'Users can distinguish between active and inactive alerts.',
        'The page loads successfully when no alerts exist.'
      ],
      successCriteria: [
        'Users can locate their job alerts within 30 seconds of logging in.',
        'Support requests relating to “where are my job alerts?” decrease after release.',
        'Users regularly access and review their configured alerts.',
        'No increase in user abandonment is observed when accessing the Job Alerts area.'
      ],
      design: {
        annotations: [
          'Job alerts accessed from service navigation Applications | Job alerts | Notifications (not Your profile or Your account).',
          'Full-width page: H1 + intro (“Manage vacancy alerts separately from application notifications”) + Create a job alert button; no MOJ sub navigation on this page.',
          'Each alert is a GOV.UK summary card with criteria in a summary list, status tags, and frequency controls in the card body.',
          'Card title actions: Edit alert and Delete alert (GOV.UK summary card with actions pattern).',
          'Empty state when no alerts are configured; footer prototype toggles empty or default alert lists.'
        ],
        implemented: [
          'GET /jobseekers/subscriptions with session-backed jobseekerAlerts mock data.',
          'Summary card + summary list per alert (jobAlertCriteriaSummaryList).',
          'GET /jobseekers/subscriptions/delete?alertId= for Delete alert card action (POST retained).',
          'Imported alert tag after registration confirmation.'
        ],
        screenshot: 'us1-job-alerts-list.png',
        screenshotCaption:
          'Job alerts — service navigation, page header with Create a job alert, intro copy, and summary cards with Edit alert and Delete alert.',
        prototypePath: '/jobseekers/subscriptions?jobAlertState=alert'
      }
    },
    {
      id: '2',
      requirementIds: ['RP01', 'RP02'],
      story:
        'As a job seeker, I want to create a job alert, so that I receive notifications about relevant vacancies.',
      acceptanceCriteria: [
        'Users can create a new job alert.',
        'Users can define job search criteria.',
        'The system validates mandatory fields.',
        'A confirmation message is displayed when an alert is successfully created.',
        'New alerts appear within the Job Alerts section.'
      ],
      successCriteria: [
        'Users can successfully create a new alert without requiring support.',
        'Alert creation completion rates exceed agreed baseline levels.',
        'The majority of users who start creating an alert successfully finish the process.',
        'Job alert subscriptions increase following deployment.'
      ],
      design: {
        annotations: [
          'Create flow at /jobalerts/jobalert; header button on Job alerts page.',
          'Edit alert on an existing alert opens the same form with criteria prefilled (?alertId=).',
          'Success banner on Job alerts page after create or update.'
        ],
        implemented: [
          'POST /jobalerts/jobalert creates or updates alerts (alertId for edit).',
          'GET /jobalerts/jobalert?alertId= loads form prefill from alert.form mock data.',
          'Redirect to subscriptions with success notification banner.'
        ],
        screenshot: 'us2-create-alert.png',
        screenshotCaption: 'Create job alert form (signed-in journey).',
        prototypePath: '/jobalerts/jobalert',
        extraScreenshots: [
          {
            screenshot: 'us2-edit-alert.png',
            screenshotCaption: 'Edit job alert — form prefilled from an existing alert.',
            prototypePath: '/jobalerts/jobalert?alertId=alert-design-london'
          }
        ]
      }
    },
    {
      id: '3',
      requirementIds: ['RP01'],
      story:
        'As a job seeker, I want to update or remove job alerts, so that my notifications remain relevant to my requirements.',
      acceptanceCriteria: [
        'Users can edit existing job alerts.',
        'Users can deactivate job alerts.',
        'Users can delete job alerts.',
        'Changes are saved and reflected immediately.',
        'Users receive confirmation of successful updates.'
      ],
      successCriteria: [
        'Users can maintain alert preferences without contacting support.',
        'Changes to alerts are reflected accurately and immediately.',
        'Low levels of duplicate or abandoned alerts are reported.',
        'User feedback indicates confidence in managing alerts independently.'
      ],
      design: {
        annotations: [
          'Edit alert opens the full criteria form from the card title action.',
          'Bordered frequency form (Daily / Weekly, Save changes) shown only when the alert status is Active.',
          'Delete alert is a text link in the card title (not a warning button in the card body).',
          'Deactivate / Activate secondary button below the frequency form.',
          'Can’t see your job alerts? details for One Login import.'
        ],
        implemented: [
          'POST /jobseekers/subscriptions/update, /toggle-status; GET and POST /jobseekers/subscriptions/delete.',
          'POST /jobalerts/jobalert with alertId updates criteria and frequency.',
          'Success banners for updated and deleted alerts.'
        ],
        screenshot: 'us3-manage-alert.png',
        screenshotCaption:
          'Managing an active alert — frequency form, Save changes, Deactivate alert, and Delete alert in the card title.',
        prototypePath: '/jobseekers/subscriptions?jobAlertState=alert'
      }
    },
    {
      id: '4',
      requirementIds: ['RP01', 'RP07'],
      story:
        'As a job seeker, I want job alerts and ATS notifications to be presented as distinct features, so that I can understand the difference between vacancy alerts and application-related communications.',
      acceptanceCriteria: [
        'Job Alerts and Notifications are displayed as separate areas within the platform.',
        'Users can access each area independently.',
        'Job alerts only contain vacancy alert functionality.',
        'ATS notifications only contain ATS-generated communications.',
        'Navigation and labels clearly differentiate the two features.'
      ],
      successCriteria: [
        'User testing demonstrates clear understanding of the difference between alerts and notifications.',
        'Users can correctly identify where to find vacancy alerts versus application updates.',
        'Confusion-related support requests decrease.',
        'Stakeholders agree that information architecture is intuitive.'
      ],
      design: {
        annotations: [
          'Your profile removed from service navigation; /profile kept for direct links only.',
          'Service navigation when signed in: Applications, Job alerts, Notifications (activeNav on each route).',
          'Your account only in GOV.UK header → /account/personal-details; not duplicated in service navigation.',
          'MOJ sub navigation under Applications H1 and Your account H1 only (not on Job alerts or Notifications).',
          'Job alerts and Notifications: service navigation only; distinct intro copy on each page.',
          'Notifications: page header (H1 + intro distinguishing from job alerts), inbox toolbar with total and unread count, read/unread rows.',
          'Notification detail: email-style message, metadata, and primary CTA to the related application task.'
        ],
        implemented: [
          'GET /jobseekers/notifications with jobseeker-notifications.js mock inbox (toolbar total + unread count).',
          'GET /jobseekers/notifications/:id email-style detail with summary metadata and primary action.',
          'header.njk: service nav Applications | Job alerts | Notifications; header Your account + Sign out.'
        ],
        screenshot: 'us4-notifications-inbox.png',
        screenshotCaption:
          'Notifications inbox — page header, intro, toolbar (8 notifications, unread count), and ATS-style list rows.',
        prototypePath: '/jobseekers/notifications',
        extraScreenshots: [
          {
            screenshot: 'us4-notification-detail.png',
            screenshotCaption:
              'Notification detail — back link, email-style body, application metadata badges, and primary action.',
            prototypePath: '/jobseekers/notifications/notif-1'
          }
        ]
      }
    }
  ]
}
