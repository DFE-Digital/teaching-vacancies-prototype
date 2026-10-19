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
        { key: 'Application status', value: 'Shortlisted' }
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
        { key: 'Application status', value: 'Interviewing' }
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
        { key: 'Application status', value: 'Draft' }
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
        { key: 'Application status', value: 'Submitted' }
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
        { key: 'Action required', value: 'Provide an additional reference' }
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
        { key: 'Application status', value: 'Submitted' }
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
        { key: 'Application status', value: 'Offered' }
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
        { key: 'Application status', value: 'Submitted' }
      ],
      primaryAction: {
        text: 'View application',
        href: '/jobseekers/job_applications'
      }
    }
  },
  {
    id: 'notif-9',
    date: '28 September 2026',
    title: 'Interview reminder for Geography Teacher',
    body: 'Brookdale Academy reminded you about your interview on 30 September 2026.',
    href: '/jobseekers/notifications/notif-9',
    type: 'interview',
    emailSubject: 'Reminder: interview for Geography Teacher at Brookdale Academy',
    detail: {
      from: 'Brookdale Academy via Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'This is a reminder that your interview for Geography Teacher is scheduled for Tuesday 30 September 2026 at 10:00am.',
        'Contact the school through Teaching Vacancies if you need to rearrange.'
      ],
      metadata: [
        { key: 'Job', value: 'Geography Teacher' },
        { key: 'Organisation', value: 'Brookdale Academy' },
        { key: 'Application status', value: 'Interviewing' }
      ],
      primaryAction: {
        text: 'View application',
        href: '/jobseekers/job_applications'
      }
    }
  },
  {
    id: 'notif-10',
    date: '26 September 2026',
    title: 'Application submitted for Design and technology teacher',
    body: 'We sent your application to Hillside Secondary School.',
    href: '/jobseekers/notifications/notif-10',
    type: 'application_status',
    emailSubject: 'Application submitted: Design and technology teacher',
    detail: {
      from: 'Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Your application for Design and technology teacher at Hillside Secondary School was submitted successfully.',
        'The hiring team will review your application and update you through Teaching Vacancies.'
      ],
      metadata: [
        { key: 'Job', value: 'Design and technology teacher' },
        { key: 'Organisation', value: 'Hillside Secondary School' },
        { key: 'Application status', value: 'Submitted' }
      ],
      primaryAction: {
        text: 'View application',
        href: '/jobseekers/job_applications'
      }
    }
  },
  {
    id: 'notif-11',
    date: '24 September 2026',
    title: 'Complete your application',
    body: 'You have a draft application for Nursery practitioner at Little Stars Nursery.',
    href: '/jobseekers/notifications/notif-11',
    type: 'draft_application',
    emailSubject: 'Reminder: complete your application for Nursery practitioner',
    detail: {
      from: 'Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'You started an application for Nursery practitioner at Little Stars Nursery but have not submitted it yet.',
        'Continue where you left off and submit before the vacancy closes.'
      ],
      metadata: [
        { key: 'Job', value: 'Nursery practitioner' },
        { key: 'Organisation', value: 'Little Stars Nursery' },
        { key: 'Application status', value: 'Draft' }
      ],
      primaryAction: {
        text: 'Continue application',
        href: '/jobs/67663/apply/task-list'
      }
    }
  },
  {
    id: 'notif-12',
    date: '22 September 2026',
    title: 'Message from the hiring team',
    body: 'Ashford Primary asked you to confirm your availability for a trial day.',
    href: '/jobseekers/notifications/notif-12',
    type: 'hiring_team_message',
    emailSubject: 'Action required: confirm trial day availability',
    detail: {
      from: 'Ashford Primary via Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Ashford Primary would like you to attend a trial day for the Year 4 class teacher role.',
        'Reply through Teaching Vacancies with your availability for the week commencing 29 September 2026.'
      ],
      metadata: [
        { key: 'Job', value: 'Year 4 class teacher' },
        { key: 'Organisation', value: 'Ashford Primary' },
        { key: 'Action required', value: 'Confirm trial day availability' }
      ],
      primaryAction: {
        text: 'View application',
        href: '/jobseekers/job_applications'
      }
    }
  },
  {
    id: 'notif-13',
    date: '20 September 2026',
    title: 'Shortlisted for PE Teacher',
    body: 'Valley Sports College has shortlisted your application.',
    href: '/jobseekers/notifications/notif-13',
    type: 'application_status',
    emailSubject: 'You have been shortlisted for PE Teacher',
    detail: {
      from: 'Valley Sports College via Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Valley Sports College has shortlisted your application for PE Teacher.',
        'The hiring team may contact you to arrange an interview.'
      ],
      metadata: [
        { key: 'Job', value: 'PE Teacher' },
        { key: 'Organisation', value: 'Valley Sports College' },
        { key: 'Application status', value: 'Shortlisted' }
      ],
      primaryAction: {
        text: 'View application',
        href: '/jobseekers/job_applications'
      }
    }
  },
  {
    id: 'notif-14',
    date: '18 September 2026',
    title: 'Application submitted for Head of department (maths)',
    body: 'We sent your application to Northgate School.',
    href: '/jobseekers/notifications/notif-14',
    type: 'application_status',
    emailSubject: 'Application submitted: Head of department (maths)',
    detail: {
      from: 'Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Your application for Head of department (maths) at Northgate School was submitted successfully.',
        'You can track progress on your applications page.'
      ],
      metadata: [
        { key: 'Job', value: 'Head of department (maths)' },
        { key: 'Organisation', value: 'Northgate School' },
        { key: 'Application status', value: 'Submitted' }
      ],
      primaryAction: {
        text: 'View application',
        href: '/jobseekers/job_applications'
      }
    }
  },
  {
    id: 'notif-15',
    date: '16 September 2026',
    title: 'Interview invitation for Art Teacher',
    body: 'Creative Arts College invited you to interview on 25 September 2026.',
    href: '/jobseekers/notifications/notif-15',
    type: 'interview',
    emailSubject: 'Interview invitation: Art Teacher at Creative Arts College',
    detail: {
      from: 'Creative Arts College via Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Creative Arts College would like to invite you to interview for Art Teacher.',
        'Proposed date: Thursday 25 September 2026 at 3:30pm.'
      ],
      metadata: [
        { key: 'Job', value: 'Art Teacher' },
        { key: 'Organisation', value: 'Creative Arts College' },
        { key: 'Application status', value: 'Interviewing' }
      ],
      primaryAction: {
        text: 'View application',
        href: '/jobseekers/job_applications'
      }
    }
  },
  {
    id: 'notif-16',
    date: '14 September 2026',
    title: 'Update on your application for French Teacher',
    body: 'Lyon Park School is not progressing your application on this occasion.',
    href: '/jobseekers/notifications/notif-16',
    type: 'application_status',
    emailSubject: 'Update on your application for French Teacher',
    detail: {
      from: 'Lyon Park School via Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Thank you for applying for French Teacher at Lyon Park School.',
        'The hiring team will not be progressing your application further for this role.'
      ],
      metadata: [
        { key: 'Job', value: 'French Teacher' },
        { key: 'Organisation', value: 'Lyon Park School' },
        { key: 'Application status', value: 'Submitted' }
      ],
      primaryAction: {
        text: 'Search for jobs',
        href: '/jobsfemerge'
      }
    }
  },
  {
    id: 'notif-17',
    date: '12 September 2026',
    title: 'Job offer for Learning support assistant',
    body: 'Meadow View School sent you a conditional offer.',
    href: '/jobseekers/notifications/notif-17',
    type: 'application_status',
    emailSubject: 'Job offer: Learning support assistant at Meadow View School',
    detail: {
      from: 'Meadow View School via Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Meadow View School is pleased to offer you the role of Learning support assistant, subject to pre-employment checks.',
        'Sign in to Teaching Vacancies to view the offer details.'
      ],
      metadata: [
        { key: 'Job', value: 'Learning support assistant' },
        { key: 'Organisation', value: 'Meadow View School' },
        { key: 'Application status', value: 'Offered' }
      ],
      primaryAction: {
        text: 'View application',
        href: '/jobseekers/job_applications'
      }
    }
  },
  {
    id: 'notif-18',
    date: '10 September 2026',
    title: 'Message from the hiring team',
    body: 'Harbour Sixth Form asked you to upload an updated CV.',
    href: '/jobseekers/notifications/notif-18',
    type: 'hiring_team_message',
    emailSubject: 'Action required: upload an updated CV',
    detail: {
      from: 'Harbour Sixth Form via Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Harbour Sixth Form needs an updated CV for your Economics teacher application.',
        'Upload the document on Teaching Vacancies before the panel meeting on 15 September 2026.'
      ],
      metadata: [
        { key: 'Job', value: 'Economics teacher' },
        { key: 'Organisation', value: 'Harbour Sixth Form' },
        { key: 'Action required', value: 'Upload an updated CV' }
      ],
      primaryAction: {
        text: 'View application',
        href: '/jobseekers/job_applications'
      }
    }
  },
  {
    id: 'notif-19',
    date: '8 September 2026',
    title: 'Application submitted for Primary teacher',
    body: 'We sent your application to Elm Tree Primary.',
    href: '/jobseekers/notifications/notif-19',
    type: 'application_status',
    emailSubject: 'Application submitted: Primary teacher at Elm Tree Primary',
    detail: {
      from: 'Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Your application for Primary teacher at Elm Tree Primary was submitted successfully.',
        'The hiring team will review your application and update you through Teaching Vacancies.'
      ],
      metadata: [
        { key: 'Job', value: 'Primary teacher' },
        { key: 'Organisation', value: 'Elm Tree Primary' },
        { key: 'Application status', value: 'Submitted' }
      ],
      primaryAction: {
        text: 'View application',
        href: '/jobseekers/job_applications'
      }
    }
  },
  {
    id: 'notif-20',
    date: '5 September 2026',
    title: 'Complete your application',
    body: 'You have a draft application for School business manager at Unity Trust.',
    href: '/jobseekers/notifications/notif-20',
    type: 'draft_application',
    emailSubject: 'Reminder: complete your application for School business manager',
    detail: {
      from: 'Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'You started an application for School business manager at Unity Trust but have not submitted it yet.',
        'Your draft is saved on Teaching Vacancies.'
      ],
      metadata: [
        { key: 'Job', value: 'School business manager' },
        { key: 'Organisation', value: 'Unity Trust' },
        { key: 'Application status', value: 'Draft' }
      ],
      primaryAction: {
        text: 'Continue application',
        href: '/jobs/67663/apply/task-list'
      }
    }
  },
  {
    id: 'notif-21',
    date: '3 September 2026',
    title: 'Shortlisted for Music Teacher',
    body: 'Harmony School has shortlisted your application.',
    href: '/jobseekers/notifications/notif-21',
    type: 'application_status',
    emailSubject: 'You have been shortlisted for Music Teacher',
    detail: {
      from: 'Harmony School via Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Harmony School has shortlisted your application for Music Teacher.',
        'Sign in to view this application and any next steps.'
      ],
      metadata: [
        { key: 'Job', value: 'Music Teacher' },
        { key: 'Organisation', value: 'Harmony School' },
        { key: 'Application status', value: 'Shortlisted' }
      ],
      primaryAction: {
        text: 'View application',
        href: '/jobseekers/job_applications'
      }
    }
  },
  {
    id: 'notif-22',
    date: '1 September 2026',
    title: 'Interview invitation for Biology Teacher',
    body: 'City Science Academy invited you to interview on 8 September 2026.',
    href: '/jobseekers/notifications/notif-22',
    type: 'interview',
    emailSubject: 'Interview invitation: Biology Teacher at City Science Academy',
    detail: {
      from: 'City Science Academy via Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'City Science Academy would like to invite you to interview for Biology Teacher.',
        'Proposed date: Monday 8 September 2026 at 1:00pm.'
      ],
      metadata: [
        { key: 'Job', value: 'Biology Teacher' },
        { key: 'Organisation', value: 'City Science Academy' },
        { key: 'Application status', value: 'Interviewing' }
      ],
      primaryAction: {
        text: 'View application',
        href: '/jobseekers/job_applications'
      }
    }
  },
  {
    id: 'notif-23',
    date: '29 August 2026',
    title: 'Application submitted for SENDCo',
    body: 'We sent your application to Bridge Academy.',
    href: '/jobseekers/notifications/notif-23',
    type: 'application_status',
    emailSubject: 'Application submitted: SENDCo at Bridge Academy',
    detail: {
      from: 'Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Your application for SENDCo at Bridge Academy was submitted successfully.',
        'You can track progress on your applications page.'
      ],
      metadata: [
        { key: 'Job', value: 'SENDCo' },
        { key: 'Organisation', value: 'Bridge Academy' },
        { key: 'Application status', value: 'Submitted' }
      ],
      primaryAction: {
        text: 'View application',
        href: '/jobseekers/job_applications'
      }
    }
  },
  {
    id: 'notif-24',
    date: '27 August 2026',
    title: 'Message from the hiring team',
    body: 'Coastal College asked you to complete a safeguarding declaration.',
    href: '/jobseekers/notifications/notif-24',
    type: 'hiring_team_message',
    emailSubject: 'Action required: safeguarding declaration',
    detail: {
      from: 'Coastal College via Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Coastal College needs a completed safeguarding declaration for your Lecturer in health and social care application.',
        'Complete the form on Teaching Vacancies before your interview.'
      ],
      metadata: [
        { key: 'Job', value: 'Lecturer in health and social care' },
        { key: 'Organisation', value: 'Coastal College' },
        { key: 'Action required', value: 'Complete safeguarding declaration' }
      ],
      primaryAction: {
        text: 'View application',
        href: '/jobseekers/job_applications'
      }
    }
  },
  {
    id: 'notif-25',
    date: '25 August 2026',
    title: 'Application submitted for Early years teacher',
    body: 'We sent your application to Sunshine Nursery School.',
    href: '/jobseekers/notifications/notif-25',
    type: 'application_status',
    emailSubject: 'Application submitted: Early years teacher',
    detail: {
      from: 'Teaching Vacancies',
      introduction: 'Dear Rachael,',
      paragraphs: [
        'Your application for Early years teacher at Sunshine Nursery School was submitted successfully.',
        'The hiring team will review your application and update you through Teaching Vacancies.'
      ],
      metadata: [
        { key: 'Job', value: 'Early years teacher' },
        { key: 'Organisation', value: 'Sunshine Nursery School' },
        { key: 'Application status', value: 'Submitted' }
      ],
      primaryAction: {
        text: 'View application',
        href: '/jobseekers/job_applications'
      }
    }
  }
]
