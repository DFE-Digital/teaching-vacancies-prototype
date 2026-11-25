/**
 * Your account hub — design spec for /documentation/your-account
 * Prototype page: /jobseekers/account (v1.3)
 * Icons: Material Symbols Outlined (Google Fonts) in UI; SVG downloads use the same glyph paths.
 */

module.exports = {
  guideTitle: 'Your account hub',
  guideDescription:
    'Design specification for the signed-in account landing page: page header, intro, and six featured task links with icon tiles.',
  imageDir: 'your-account',
  prototypePath: '/jobseekers/account',
  referenceScreenshot: 'navigation-ia-1-3/1-3-account-hub.png',
  implementation: {
    view: 'views/jobseekers/account.njk',
    macros: 'views/includes/jobseeker-account-hub-macros.njk',
    styles: 'app/assets/sass/patterns/_jobseeker-account.scss'
  },
  pageHeader: {
    wrapperClasses: 'app-page-header app-account-page-header govuk-!-margin-bottom-4',
    heading: {
      element: 'h1',
      id: 'account-heading',
      text: 'Your account',
      classes: 'govuk-heading-l govuk-!-margin-bottom-0'
    }
  },
  intro: {
    id: 'account-intro',
    text:
      'Manage applications, job alerts, notifications, profile and account help in one place.',
    classes: 'govuk-body'
  },
  featuredSection: {
    wrapperClasses: 'app-account-hub',
    sectionClasses: 'app-account-featured',
    listClasses: 'app-account-featured-list',
    ariaLabelledBy: 'account-heading',
    ariaDescribedBy: 'account-intro'
  },
  iconTile: {
    mobile: { size: '56px', glyphSize: '32px', opsz: 24 },
    tabletUp: { size: '60px', glyphSize: '36px', opsz: 28 },
    gapMobile: '15px',
    gapTablet: '20px',
    rowPaddingMobile: '15px 0',
    rowPaddingTablet: '20px 0',
    format: 'inline SVG (Material Symbols Outlined 24px paths)',
    svgIncludes: 'views/includes/account-hub-icons/*.njk'
  },
  linkTitle: {
    color: '#1a65a6',
    hoverColor: '#0f385c',
    fontSize: '21px',
    underlineThickness: 'max(3px, 0.1875rem)'
  },
  description: {
    color: '#0b0c0c',
    fontSize: '19px'
  },
  items: [
    {
      key: 'applications',
      modifierClass: 'app-account-featured__icon--applications',
      materialGlyph: 'work',
      svgFile: 'work.svg',
      title: 'Applications',
      description:
        'View and track jobs you have applied for, including application status.',
      href: '/jobseekers/job_applications'
    },
    {
      key: 'saved-jobs',
      modifierClass: 'app-account-featured__icon--saved-jobs',
      materialGlyph: 'bookmark',
      svgFile: 'bookmark.svg',
      title: 'Saved jobs',
      description:
        'Review vacancies you have saved and apply when you are ready.',
      href: '/jobseekers/saved_jobs?savedJobState=saved'
    },
    {
      key: 'job-alerts',
      modifierClass: 'app-account-featured__icon--job-alerts',
      materialGlyph: 'notifications',
      svgFile: 'notifications.svg',
      title: 'Job alerts',
      description:
        'Create, edit and delete email alerts for new jobs that match your search.',
      href: '/jobseekers/subscriptions'
    },
    {
      key: 'notifications',
      modifierClass: 'app-account-featured__icon--notifications',
      materialGlyph: 'chat',
      svgFile: 'chat.svg',
      title: 'Notifications',
      description:
        'Read updates from schools about your applications and other account activity.',
      href: '/jobseekers/notifications'
    },
    {
      key: 'personal-details',
      modifierClass: 'app-account-featured__icon--personal-details',
      materialGlyph: 'person',
      svgFile: 'person.svg',
      title: 'Your details',
      description:
        'Update your name, teacher reference number (TRN) and contact email address.',
      href: '/account/personal-details'
    },
    {
      key: 'get-help',
      modifierClass: 'app-account-featured__icon--get-help',
      materialGlyph: 'help',
      svgFile: 'help.svg',
      title: 'Help with your account',
      description:
        'Sign-in help, transferring account details, closing your account and email preferences.',
      href: '/account/your-account'
    }
  ],
  iconColors: {
    applications: { background: '#f4dce5', foreground: '#942514' },
    'saved-jobs': { background: '#e5f5fa', foreground: '#0b556c' },
    'job-alerts': { background: '#cadbee', foreground: '#0b556c' },
    notifications: { background: '#cce2d8', foreground: '#00401a' },
    'personal-details': { background: '#ddd6e8', foreground: '#3b0764' },
    'get-help': { background: '#f3f2f1', foreground: '#0b0c0c' }
  }
}