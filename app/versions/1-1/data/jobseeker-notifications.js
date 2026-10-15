/**
 * ATS / application notifications (not job alerts).
 * Inbox links open /jobseekers/notifications/:id detail pages; CTAs go to the relevant application task.
 */

module.exports = [
  {
    id: 'notif-1',
    date: '14 October 2026',
    title: 'Shortlisted for Teacher of English',
    body: 'Courtland School has shortlisted your application. They may contact you to arrange an interview.',
    href: '/jobseekers/notifications/notif-1',
    type: 'application_status',
    emailSubject: 'You have been shortlisted for Teacher of English',
    detail: {
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Courtland School has shortlisted your application for Teacher of English.',
        'The hiring team may contact you to arrange an interview. Sign in to Teaching Vacancies to view this application and any next steps.'
      ],
      metadata: [
        { key: 'Job', value: 'Teacher of English' },
        { key: 'Organisation', value: 'Courtland School' },
        { key: 'Application status', value: 'Shortlisted' }
      ],
      primaryAction: {
        text: 'View application',
        href: '/jobseekers/job_applications'
      }
    }
  },
  {
    id: 'notif-2',
    date: '12 October 2026',
    title: 'Complete your application',
    body: 'You have a draft application for SEN Teaching Assistant at Thrive Learning Center.',
    href: '/jobseekers/notifications/notif-2',
    type: 'draft_application',
    emailSubject: 'Reminder: complete your application for SEN Teaching Assistant',
    detail: {
      introduction: 'Dear Rachael,',
      paragraphs: [
        'You started an application for SEN Teaching Assistant at Thrive Learning Center but have not submitted it yet.',
        'Your draft is saved on Teaching Vacancies. Continue where you left off and submit before the vacancy closes.'
      ],
      metadata: [
        { key: 'Job', value: 'SEN Teaching Assistant' },
        { key: 'Organisation', value: 'Thrive Learning Center' },
        { key: 'Application status', value: 'Draft' }
      ],
      primaryAction: {
        text: 'Continue application',
        href: '/jobs/67663/apply/task-list'
      }
    }
  },
  {
    id: 'notif-3',
    date: '9 October 2026',
    title: 'Message from the hiring team',
    body: 'Riverside College asked you to provide an additional reference for Lecturer in computing.',
    href: '/jobseekers/notifications/notif-3',
    type: 'hiring_team_message',
    emailSubject: 'Action required: additional reference for Lecturer in computing',
    detail: {
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Riverside College has reviewed your application for Lecturer in computing and needs one more reference before they can progress your application.',
        'Add the details of an additional referee on Teaching Vacancies. The school will contact your referee directly.'
      ],
      metadata: [
        { key: 'Job', value: 'Lecturer in computing' },
        { key: 'Organisation', value: 'Riverside College' },
        { key: 'Action required', value: 'Provide an additional reference' }
      ],
      primaryAction: {
        text: 'Add a reference',
        href: '/jobs/676686900/apply/references'
      }
    }
  }
]
