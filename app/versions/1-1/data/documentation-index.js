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
      href: '/documentation/fe-content-changes-1',
      text: 'FE Quick Apply content parity'
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
      href: '/documentation/fe-content-changes-1',
      title: 'FE Quick Apply content parity',
      description:
        'Design change log from 9 October 2026 with section-by-section screenshots of schools and colleges copy updates.'
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
