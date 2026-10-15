/**
 * ATS / application notifications (not job alerts).
 * Inbox links open /jobseekers/notifications/:id detail pages; CTAs go to the relevant application task.
 */

module.exports = [
  {
    id: 'notif-1',
    date: '14 October 2026',
    unread: true,
    title: 'Shortlisted for Teacher of English',
    body: 'Courtland School has shortlisted your application. They may contact you to arrange an interview.',
    href: '/jobseekers/notifications/notif-1',
    type: 'application_status',
    emailSubject: 'You have been shortlisted for Teacher of English',
    detail: {
      from: 'Courtland School via Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Courtland School has shortlisted your application for Teacher of English.',
        'The hiring team may contact you to arrange an interview. Sign in to Teaching Vacancies to view this application and any next steps.'
      ],
      metadata: [
        { key: 'Job', value: 'Teacher of English' },
        { key: 'Organisation', value: 'Courtland School' },
        { key: 'Application status', value: 'Shortlisted', mojBadge: 'moj-badge--yellow' }
      ],
      primaryAction: {
        text: 'View application',
        href: '/jobseekers/job_applications'
      }
    }
  },
  {
    id: 'notif-4',
    date: '13 October 2026',
    unread: true,
    title: 'Interview invitation for Teacher of English',
    body: 'Courtland School invited you to interview on 22 October 2026.',
    href: '/jobseekers/notifications/notif-4',
    type: 'interview',
    emailSubject: 'Interview invitation: Teacher of English at Courtland School',
    detail: {
      from: 'Courtland School via Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Courtland School would like to invite you to interview for Teacher of English.',
        'Proposed date: Wednesday 22 October 2026 at 2:00pm. Reply through Teaching Vacancies or contact the school directly if you need to rearrange.'
      ],
      metadata: [
        { key: 'Job', value: 'Teacher of English' },
        { key: 'Organisation', value: 'Courtland School' },
        { key: 'Application status', value: 'Interviewing', mojBadge: 'moj-badge--purple' }
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
    unread: true,
    title: 'Complete your application',
    body: 'You have a draft application for SEN Teaching Assistant at Thrive Learning Center.',
    href: '/jobseekers/notifications/notif-2',
    type: 'draft_application',
    emailSubject: 'Reminder: complete your application for SEN Teaching Assistant',
    detail: {
      from: 'Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'You started an application for SEN Teaching Assistant at Thrive Learning Center but have not submitted it yet.',
        'Your draft is saved on Teaching Vacancies. Continue where you left off and submit before the vacancy closes.'
      ],
      metadata: [
        { key: 'Job', value: 'SEN Teaching Assistant' },
        { key: 'Organisation', value: 'Thrive Learning Center' },
        { key: 'Application status', value: 'Draft', mojBadge: 'moj-badge--pink' }
      ],
      primaryAction: {
        text: 'Continue application',
        href: '/jobs/67663/apply/task-list'
      }
    }
  },
  {
    id: 'notif-5',
    date: '11 October 2026',
    title: 'Application submitted for Science Teacher',
    body: 'We sent your application to Oakwood Academy. The hiring team will review it and contact you if you are shortlisted.',
    href: '/jobseekers/notifications/notif-5',
    type: 'application_status',
    emailSubject: 'Application submitted: Science Teacher at Oakwood Academy',
    detail: {
      from: 'Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Your application for Science Teacher at Oakwood Academy was submitted successfully.',
        'You can track progress on your applications page. The school will contact you through Teaching Vacancies if they need anything else.'
      ],
      metadata: [
        { key: 'Job', value: 'Science Teacher' },
        { key: 'Organisation', value: 'Oakwood Academy' },
        { key: 'Application status', value: 'Submitted', mojBadge: 'moj-badge--blue' }
      ],
      primaryAction: {
        text: 'View application',
        href: '/jobseekers/job_applications'
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
      from: 'Riverside College via Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Riverside College has reviewed your application for Lecturer in computing and needs one more reference before they can progress your application.',
        'Add the details of an additional referee on Teaching Vacancies. The school will contact your referee directly.'
      ],
      metadata: [
        { key: 'Job', value: 'Lecturer in computing' },
        { key: 'Organisation', value: 'Riverside College' },
        { key: 'Action required', value: 'Provide an additional reference', mojBadge: 'moj-badge--red' }
      ],
      primaryAction: {
        text: 'Add a reference',
        href: '/jobs/676686900/apply/references'
      }
    }
  },
  {
    id: 'notif-6',
    date: '7 October 2026',
    unread: true,
    title: 'Update on your application for Maths Teacher',
    body: 'St Mary\'s Primary School is not progressing your application on this occasion.',
    href: '/jobseekers/notifications/notif-6',
    type: 'application_status',
    emailSubject: 'Update on your application for Maths Teacher',
    detail: {
      from: 'St Mary\'s Primary School via Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Thank you for applying for Maths Teacher at St Mary\'s Primary School.',
        'After careful consideration, the hiring team will not be progressing your application further for this role. You can view other vacancies on Teaching Vacancies.'
      ],
      metadata: [
        { key: 'Job', value: 'Maths Teacher' },
        { key: 'Organisation', value: 'St Mary\'s Primary School' },
        { key: 'Application status', value: 'Submitted', mojBadge: 'moj-badge--blue' }
      ],
      primaryAction: {
        text: 'Search for jobs',
        href: '/jobsfemerge'
      }
    }
  },
  {
    id: 'notif-7',
    date: '4 October 2026',
    title: 'Job offer for Teaching Assistant',
    body: 'Greenfield Infant School sent you a conditional offer for Teaching Assistant.',
    href: '/jobseekers/notifications/notif-7',
    type: 'application_status',
    emailSubject: 'Job offer: Teaching Assistant at Greenfield Infant School',
    detail: {
      from: 'Greenfield Infant School via Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Greenfield Infant School is pleased to offer you the role of Teaching Assistant, subject to the usual pre-employment checks.',
        'Sign in to Teaching Vacancies to view the offer details and next steps.'
      ],
      metadata: [
        { key: 'Job', value: 'Teaching Assistant' },
        { key: 'Organisation', value: 'Greenfield Infant School' },
        { key: 'Application status', value: 'Offered', mojBadge: 'moj-badge--green' }
      ],
      primaryAction: {
        text: 'View application',
        href: '/jobseekers/job_applications'
      }
    }
  },
  {
    id: 'notif-8',
    date: '1 October 2026',
    title: 'Application submitted for History Teacher',
    body: 'We sent your application to Westborough High School.',
    href: '/jobseekers/notifications/notif-8',
    type: 'application_status',
    emailSubject: 'Application submitted: History Teacher at Westborough High School',
    detail: {
      from: 'Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Your application for History Teacher at Westborough High School was submitted successfully.',
        'The hiring team will review your application and update you through Teaching Vacancies.'
      ],
      metadata: [
        { key: 'Job', value: 'History Teacher' },
        { key: 'Organisation', value: 'Westborough High School' },
        { key: 'Application status', value: 'Submitted', mojBadge: 'moj-badge--blue' }
      ],
      primaryAction: {
        text: 'View application',
        href: '/jobseekers/job_applications'
      }
    }
  }
]
