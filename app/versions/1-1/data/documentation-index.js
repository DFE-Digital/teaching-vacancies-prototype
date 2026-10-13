/**
 * Contents for /documentation (GOV.UK browse layout — gov.uk/browse/benefits)
 */

module.exports = {
  lead:
    'Further education design reviews and change plans for the jobseeker prototype (v1.1). Tech stack and project structure are listed under Topics.',

  recentWork: [
    {
      href: '/documentation/quick-apply-1',
      text: 'Quick Apply for further education'
    },
    {
      href: '/documentation/fe-changes-1',
      text: 'Further Education changes'
    },
    {
      href: '/documentation/fe-mobile-exp-1',
      text: 'Further Education mobile experience'
    }
  ],

  topics: [
    {
      href: '/documentation/quick-apply-1',
      title: 'Quick Apply for further education',
      description:
        'Design review with analysis, suggested changes, and Playwright screenshots in a GOV.UK guide layout.'
    },
    {
      href: '/documentation/fe-changes-1',
      title: 'Further Education changes',
      description: 'Detailed change plan and backlog for FE jobseeker journeys and Quick Apply.'
    },
    {
      href: '/documentation/fe-mobile-exp-1',
      title: 'Further Education mobile experience',
      description: 'Notes and prototypes for mobile-first FE exploration.'
    },
    {
      href: 'https://manage-teaching-jobs-prototype.herokuapp.com/documentation/about',
      title: 'Hiring staff prototype documentation',
      description:
        'About the manage teaching jobs prototype — posting vacancies, applications, and hiring workflows (separate repo).',
      external: true
    },
    {
      href: '/documentation/about',
      title: 'Tech stack, mock data, and page flows',
      description:
        'How the Prototype Kit is configured, what the JSON fixtures look like, and Mermaid diagrams for main journeys.'
    },
    {
      href: '/documentation/project-structure',
      title: 'Project structure',
      description:
        'Versioning at /1-0 and /1-1, route modules, views folders, mock data, and the hiring staff sibling repository.'
    }
  ]
}
