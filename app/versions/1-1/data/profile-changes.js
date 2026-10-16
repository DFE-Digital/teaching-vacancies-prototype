/**
 * Profile changes — /documentation/profile-changes
 * Screenshots: app/assets/images/documentation/profile-changes/
 */

module.exports = {
  guideTitle: 'Profile changes',
  guideDescription:
    'Business requirements and user stories for separating job alerts from the jobseeker profile, personal details under Your account, distinct ATS notifications, and the Applications area (applications list and saved jobs) in the v1.1 prototype. Date captured: 15 Oct 2026.',
  imageDir: 'profile-changes',
  personalDetailsScreenshot: 'rp-personal-details.png',
  serviceNavScreenshot: 'service-nav.png',
  applicationsSubNavScreenshot: 'applications-sub-nav.png',
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
  applicationsArea: {
    title: 'Applications and saved jobs',
    intro:
      'The Applications service navigation item covers two related pages. MOJ sub navigation (below the phase banner) links Applications and Your saved jobs. Job alerts and Notifications do not use this sub navigation.',
    annotations: [
      'Service navigation Applications stays active for both sub pages (route sets activeNav).',
      'Sub navigation: Applications | Your saved jobs — current page indicated with aria-current="page" and MOJ active styling.',
      'Applications list: each application is a GOV.UK summary card (title + reference, card action, summary list with organisation, activity, closing date, status tag).',
      'Saved jobs: each saved job is a summary card with Apply and Delete card actions; sort by date added, deadline, or title.',
      'Saved jobs prototype defaults to saved mock data (10 jobs from jobs listing); footer toggles empty state only when ?savedJobState=empty.',
      'Your saved jobs sub-nav link includes ?savedJobState=saved so mock data always loads.'
    ],
    implemented: [
      'GET /jobseekers/job_applications — summary cards via application-summary-card.njk.',
      'GET /onelogin/journey/match — buildSampleSavedJobs() from jobs.json plus two fixed demo titles; saved state unless empty query.',
      'Nav state in routes.js middleware and render locals for activeNav / jobseekerSubNavSection.'
    ],
    screenshots: [
      {
        screenshot: 'us-applications-list.png',
        screenshotCaption: 'Applications list using summary cards and MOJ sub navigation.',
        prototypePath: '/jobseekers/job_applications'
      },
      {
        screenshot: 'us-saved-jobs.png',
        screenshotCaption: 'Saved jobs — summary cards with default saved mock state.',
        prototypePath: '/onelogin/journey/match?savedJobState=saved'
      }
    ]
  },
  personalDetailsNotes: [
    'MOJ sub navigation under Your account: Personal details first, then Account settings.',
    'Summary cards for name, TRN, and email with summary lists.',
    'Change name and TRN in Teaching Vacancies; demo user Joe Bloggs in users.json.',
    'Email card: no Change action in the header; link to GOV.UK One Login settings with visible text “GOV.UK One Login (opens in a new tab)” (target="_blank", rel="noopener noreferrer").'
  ],
  userStories: [
    {
      id: '1',
      requirementIds: ['RP01', 'RP02'],
      story:
        'As a job seeker, I want to view my configured job alerts, so that I can understand what vacancies I am being notified about.',
      acceptanceCriteria: [
        'A Job Alerts section is available within the user account area.',
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
          'Job alerts accessed from service navigation (not Your profile).',
          'Full-width page: heading + Create a job alert button (page header pattern); no MOJ sub navigation on this page.',
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
        screenshotCaption: 'Job alerts list — summary cards with Edit alert and Delete alert in the card title.',
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
        screenshotCaption: 'Frequency form, Deactivate control, and Delete alert in the card title actions.',
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
          'MOJ sub navigation under Applications: Applications + Your saved jobs only (not on Job alerts or Notifications).',
          'Job alerts and Notifications have no sub nav — service navigation only.',
          'Notifications inbox links to detail pages; CTAs route to the relevant application task.',
          'Intro copy on each area does not cross-link to the other feature.'
        ],
        implemented: [
          'GET /jobseekers/notifications with jobseeker-notifications.js mock inbox.',
          'GET /jobseekers/notifications/:id email-style detail with summary metadata and primary action.',
          'Header service nav: Applications | Job alerts | Notifications.'
        ],
        screenshot: 'us4-notifications-inbox.png',
        screenshotCaption: 'Notifications inbox (ATS communications only).',
        prototypePath: '/jobseekers/notifications',
        extraScreenshots: [
          {
            screenshot: 'us4-notification-detail.png',
            screenshotCaption: 'Notification detail page with CTA to the related application task.',
            prototypePath: '/jobseekers/notifications/notif-1'
          }
        ]
      }
    }
  ]
}
