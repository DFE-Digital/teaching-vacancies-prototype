/**
 * Signed-in site IA across prototype versions — /documentation/navigation-ia
 */

module.exports = {
  guideTitle: 'Signed-in navigation and IA',
  guideDescription:
    'How signed-in jobseeker navigation is structured in each mounted prototype version (1.0 to 1.3): header, service navigation, account areas, and in-page sub navigation.',
  compareNote:
    'Paths below use version prefixes from the prototype hub. Open a version’s signed-in entry point, then follow the links described for that version.',
  signedInIaTreeLink: {
    href: '/documentation/navigation-ia-tree-1-3',
    label: 'Version 1.3 signed-in user IA — full top-to-bottom tree (separate page)'
  },

  iaTrees: {
    '1-3': {
      routeSlug: 'navigation-ia-tree-1-3',
      pageTitle: 'Proposed IA',
      mermaid: `flowchart TB
  subgraph chrome["Job Seeker"]
    direction TB
    YA[Your account]
    SO[Sign out]
    SN_J[Jobs]
    SN_SC[Schools]
    SN_CO[Colleges]
  end

  HUB[Your account hub]

  A[Applications]
  S[Saved jobs]
  JA[Job alerts]
  N[Notifications]
  P[Profile]
  H[Help with your account]

  chrome --> HUB
  HUB --> A --> S --> JA --> N --> P --> H`
    }
  },

  versions: [
    {
      id: '1-0',
      label: 'Version 1.0',
      prefix: '/1-0',
      imageDir: 'navigation-ia-1-0',
      trySignedInHref: '/1-0/signed-in',
      trySignedInLabel: 'Signed-in entry (sets session, then home)',
      summary:
        'Signed-in tasks appear in service navigation alongside Jobs, Schools and Colleges. The GOV.UK header shows Your account and Sign out. There is no account hub — profile is a separate journey at /profile with static shortcut links.',
      mermaidDiagrams: [
        {
          title: 'Signed-in chrome',
          clusterMinWidth: 630,
          mermaid: `flowchart TB
  subgraph header["GOV.UK header"]
    YA["Your account → /account"]
    SO[Sign out]
  end
  subgraph serviceNav["Service navigation"]
    TV[Teaching Vacancies]
    BROWSE[Jobs · Schools · Colleges]
    SIGNED[Applications · Notifications · Your profile]
  end
  header --> serviceNav`
        },
        {
          title: 'Service navigation — signed-in destinations',
          mermaid: `flowchart LR
  AP[Applications] --> APP["/jobseekers/job_applications"]
  NO[Notifications] --> JA["/jobalerts/jobalert"]
  YP[Your profile] --> PR["/profile"]`
        },
        {
          title: 'Applications page — app-account-nav',
          mermaid: `flowchart TB
  H1["H1: Applications (count)"]
  NAV[".app-account-nav — one-third column"]
  H1 --- NAV
  NAV --> L1[Applications — current page]
  NAV --> L2[Your saved jobs]
  NAV --> L3[Your job alerts]
  NAV --> L4[Create a job alert]
  L2 --> M["/onelogin/journey/match"]
  L3 --> SUB["/jobseekers/subscriptions"]
  L4 --> JA["/jobalerts/jobalert"]`
        },
        {
          title: 'Your profile — app-profile-shortcuts',
          mermaid: `flowchart TB
  H1["H1: Your profile"]
  SH[".app-profile-shortcuts — horizontal tiles"]
  H1 --- SH
  SH --> L1[Your saved jobs]
  SH --> L2[Your job alerts]
  SH --> L3[Create a job alert]
  L1 --> M["/onelogin/journey/match"]
  L2 --> SUB["/jobseekers/subscriptions"]
  L3 --> JA["/jobalerts/jobalert"]`
        },
        {
          title: 'How the in-page patterns relate',
          mermaid: `flowchart LR
  SN[Service nav: Applications] --> AN["app-account-nav<br/>vertical side list"]
  SN2[Service nav: Your profile] --> PS["app-profile-shortcuts<br/>horizontal tiles"]
  AN --> T1[Saved jobs · Job alerts · Create alert]
  PS --> T1`
        }
      ],
      layers: [
        {
          title: 'GOV.UK header (signed in)',
          items: [
            'Your account → /account',
            'Sign out → /account/sign-out'
          ]
        },
        {
          title: 'Service navigation (signed in)',
          items: [
            'Teaching Vacancies (service name), Jobs, Schools, Colleges (always)',
            'Applications → /jobseekers/job_applications',
            'Notifications → /jobalerts/jobalert (vacancy alert creation; label differs from later “application updates” inbox)',
            'Your profile → /profile (legacy profile journey, not under Your account)'
          ]
        },
        {
          title: 'Account hub',
          items: ['Not used — no featured list or /jobseekers/account landing']
        },
        {
          title: 'Applications area — `.app-account-nav`',
          items: [
            'Left column (one-third grid): vertical list with Applications (current page), Your saved jobs, Your job alerts, Create a job alert',
            'Same links repeated on subscriptions and saved-jobs pages with aria-current on the active item',
            'Not MOJ sub navigation — prototype-specific side nav styling'
          ]
        },
        {
          title: 'Your profile — `.app-profile-shortcuts`',
          items: [
            'Horizontal shortcut tiles above profile content: Your saved jobs, Your job alerts, Create a job alert',
            'Static links only — no shared sub-nav component with the applications area'
          ]
        }
      ],
      screenshots: [
        {
          screenshot: '1-0-header-signed-in.png',
          screenshotCaption:
            'GOV.UK header when signed in: Your account and Sign out (service navigation below).',
          prototypePath: '/1-0/jobseekers/job_applications'
        },
        {
          screenshot: '1-0-service-navigation.png',
          screenshotCaption:
            'Service navigation signed-in items: Applications, Notifications, Your profile alongside browse links.',
          prototypePath: '/1-0/jobseekers/job_applications'
        },
        {
          screenshot: '1-0-applications-account-nav.png',
          screenshotCaption:
            'Applications page: H1 and `.app-account-nav` (Applications, Your saved jobs, Your job alerts, Create a job alert).',
          prototypePath: '/1-0/jobseekers/job_applications'
        },
        {
          screenshot: '1-0-profile-shortcuts.png',
          screenshotCaption:
            'Your profile page: H1 and `.app-profile-shortcuts` linking to saved jobs, job alerts, and create alert.',
          prototypePath: '/1-0/profile'
        }
      ]
    },
    {
      id: '1-1',
      label: 'Version 1.1',
      prefix: '/1-1',
      imageDir: 'navigation-ia-1-1',
      trySignedInHref: '/1-1/signed-in',
      trySignedInLabel: 'Signed-in entry (sets session)',
      summary:
        'Your account moves to the GOV.UK header (/account is account settings, not a task hub). Applications, Notifications and Profile stay in service navigation. Job alerts are reached via MOJ sub navigation or /jobseekers/subscriptions — not the service bar.',
      mermaidDiagrams: [
        {
          title: 'Signed-in chrome',
          clusterMinWidth: 630,
          mermaid: `flowchart TB
  subgraph header["GOV.UK header"]
    YA["Your account → /account"]
    SO[Sign out]
  end
  subgraph serviceNav["Service navigation"]
    TV[Teaching Vacancies]
    BROWSE[Jobs · Schools · Colleges]
    SIGNED[Applications · Notifications · Profile]
  end
  header --> serviceNav`
        },
        {
          title: 'Service navigation — signed-in destinations',
          mermaid: `flowchart LR
  AP[Applications] --> APP["/jobseekers/job_applications"]
  NO[Notifications] --> INBOX["/jobseekers/notifications"]
  PR[Profile] --> PD["/account/personal-details"]`
        },
        {
          title: 'Job alerts — not in service navigation',
          mermaid: `flowchart TB
  SUB["/jobseekers/subscriptions"]
  MOJ["MOJ sub nav: Your job alerts"]
  MOJ --> SUB
  APPAREA[Applications area pages] --> MOJ`
        },
        {
          title: 'Applications area — MOJ sub navigation',
          mermaid: `flowchart TB
  H1["H1: Applications"]
  MOJ["moj-sub-navigation"]
  H1 --- MOJ
  MOJ --> L1[Your applications]
  MOJ --> L2[Your saved jobs]
  MOJ --> L3[Your job alerts]
  L1 --> APP["/jobseekers/job_applications"]
  L2 --> SAV["/onelogin/journey/match"]
  L3 --> SUB["/jobseekers/subscriptions"]`
        },
        {
          title: 'Profile and Your account',
          mermaid: `flowchart LR
  SN[Service nav Profile] --> PD[Personal details]
  HDR[Header Your account] --> ACC["/account settings page"]
  PD --> ACC`
        }
      ],
      layers: [
        {
          title: 'GOV.UK header (signed in)',
          items: [
            'Your account → /account (OneLogin settings, import, close account — not the later featured hub)',
            'Sign out → /account/sign-out'
          ]
        },
        {
          title: 'Service navigation (signed in)',
          items: [
            'Teaching Vacancies, Jobs, Schools, Colleges (always)',
            'Applications → /jobseekers/job_applications',
            'Notifications → /jobseekers/notifications (application updates inbox)',
            'Profile → /account/personal-details (label “Profile”, not “Your profile”)'
          ]
        },
        {
          title: 'Job alerts',
          items: [
            'Not in service navigation — use /jobseekers/subscriptions',
            'Linked from MOJ sub navigation as “Your job alerts” on applications-area pages'
          ]
        },
        {
          title: 'Account hub',
          items: ['No featured hub — header “Your account” and service nav “Profile” split settings vs personal details']
        },
        {
          title: 'Applications area — MOJ sub navigation',
          items: [
            'Below page H1 on applications, saved jobs, and job alerts pages',
            'Your applications | Your saved jobs | Your job alerts',
            'Shared `includes/jobseeker-account-nav.njk` with aria-current on the active tab'
          ]
        },
        {
          title: 'Account / profile pages',
          items: [
            'Personal details uses `includes/account-page-header.njk` (H1 Profile)',
            'MOJ account tabs (Personal details | Your account) documented in Profile changes; see related link'
          ]
        }
      ],
      screenshots: [
        {
          screenshot: '1-1-header-signed-in.png',
          screenshotCaption: 'GOV.UK header: Your account and Sign out.',
          prototypePath: '/1-1/jobseekers/job_applications'
        },
        {
          screenshot: '1-1-service-navigation.png',
          screenshotCaption:
            'Service navigation with signed-in links: Applications, Notifications, Profile.',
          prototypePath: '/1-1/jobseekers/job_applications'
        },
        {
          screenshot: '1-1-applications-moj-sub-nav.png',
          screenshotCaption:
            'Applications area: H1, intro copy, and MOJ sub navigation (applications, saved jobs, job alerts).',
          prototypePath: '/1-1/jobseekers/job_applications'
        },
        {
          screenshot: '1-1-job-alerts-sub-nav.png',
          screenshotCaption: 'Job alerts list with the same MOJ sub navigation; active tab Your job alerts.',
          prototypePath: '/1-1/jobseekers/subscriptions'
        },
        {
          screenshot: '1-1-profile-personal-details.png',
          screenshotCaption: 'Profile (personal details) reached from service navigation Profile link.',
          prototypePath: '/1-1/account/personal-details'
        }
      ],
      relatedHref: '/documentation/profile-changes',
      relatedLabel: 'Profile changes (v1.1 IA requirements RP01–RP07)'
    },
    {
      id: '1-2',
      label: 'Version 1.2',
      prefix: '/1-2',
      imageDir: 'navigation-ia-1-2',
      trySignedInHref: '/1-2/signed-in',
      trySignedInLabel: 'Signed-in entry (Your account hub)',
      summary:
        'Service navigation is browse-only (Jobs, Schools, Colleges). Signed-in tasks live under Your account in the header: /account redirects to a featured hub at /jobseekers/account. Child pages use breadcrumbs; MOJ sub navigation appears only on the legacy saved-jobs match journey.',
      mermaidDiagrams: [
        {
          title: 'Signed-in chrome',
          clusterMinWidth: 630,
          mermaid: `flowchart TB
  subgraph header["GOV.UK header"]
    YA["Your account → /account"]
    SO[Sign out]
  end
  subgraph serviceNav["Service navigation"]
    TV[Teaching Vacancies]
    BROWSE[Jobs · Schools · Colleges only]
  end
  header --> serviceNav
  YA --> HUB["/jobseekers/account hub"]`
        },
        {
          title: 'Your account hub — featured list',
          mermaid: `flowchart TB
  HUB["/jobseekers/account"]
  HUB --> A[Applications]
  HUB --> S[Saved jobs]
  HUB --> J[Job alerts]
  HUB --> N[Notifications]
  HUB --> P[Profile]
  HUB --> G[Get help]
  A --> APP["/jobseekers/job_applications"]
  S --> SJ["/jobseekers/saved_jobs"]
  J --> SUB["/jobseekers/subscriptions"]
  N --> NOT["/jobseekers/notifications"]
  P --> PD["/account/personal-details"]
  G --> HELP["/account/your-account"]`
        },
        {
          title: 'Account child page pattern',
          mermaid: `flowchart TB
  BC["Breadcrumbs: Your account → current page"]
  H1[Page H1 or section header]
  CONTENT[Page content]
  BC --> H1 --> CONTENT`
        },
        {
          title: 'Applications area (1.2)',
          mermaid: `flowchart LR
  HUB[Hub Applications] --> APP[Applications page]
  APP --> BC[Breadcrumbs only]
  MATCH[Legacy match journey] --> MOJ["MOJ sub nav<br/>applications · saved jobs"]`
        },
        {
          title: 'Contrast with service navigation',
          mermaid: `flowchart LR
  SN[Service nav] --> J[Jobs]
  SN --> SC[Schools]
  SN --> CO[Colleges]
  HDR[Header Your account] --> TASKS[All signed-in tasks]`
        }
      ],
      layers: [
        {
          title: 'GOV.UK header (signed in)',
          items: [
            'Your account → /account (redirects to /jobseekers/account)',
            'Sign out → /account/sign-out'
          ]
        },
        {
          title: 'Service navigation',
          items: [
            'Teaching Vacancies, Jobs, Schools, Colleges only',
            'No Applications, Notifications or Profile in the service bar'
          ]
        },
        {
          title: 'Your account hub (/jobseekers/account)',
          items: [
            'Featured list: Applications, Saved jobs, Job alerts, Notifications, Profile, Get help',
            'Each tile links to the corresponding child route',
            '`forceSignedIn` on hub for documentation and testing'
          ]
        },
        {
          title: 'Account child pages — breadcrumbs',
          items: [
            'Your account → [page] via `jobseekerAccountBreadcrumbs` macro',
            'Used on applications, saved jobs, job alerts, notifications, profile, get help',
            'No MOJ sub navigation on most account child pages in 1.2 (unlike 1.3)'
          ]
        },
        {
          title: 'Applications and saved jobs',
          items: [
            'Applications: breadcrumbs + H1 “Applications (count)” + list',
            'Saved jobs: dedicated /jobseekers/saved_jobs and match journey',
            'MOJ sub navigation (`jobseeker-account-nav.njk`) on match journey only'
          ]
        },
        {
          title: 'Notifications',
          items: [
            'Inbox at /jobseekers/notifications with breadcrumbs',
            'Empty state by default; footer toggle Empty state | Populated state'
          ]
        }
      ],
      screenshots: [
        {
          screenshot: '1-2-header-signed-in.png',
          screenshotCaption: 'GOV.UK header: Your account (hub) and Sign out; browse-only service navigation below.',
          prototypePath: '/1-2/jobseekers/account'
        },
        {
          screenshot: '1-2-service-navigation.png',
          screenshotCaption: 'Service navigation: Jobs, Schools, Colleges only when signed in.',
          prototypePath: '/1-2/jobseekers/account'
        },
        {
          screenshot: '1-2-account-hub.png',
          screenshotCaption: 'Your account featured hub listing all signed-in tasks.',
          prototypePath: '/1-2/jobseekers/account'
        },
        {
          screenshot: '1-2-applications-breadcrumbs.png',
          screenshotCaption: 'Applications child page: breadcrumbs and page header (no MOJ sub nav on this route).',
          prototypePath: '/1-2/jobseekers/job_applications'
        },
        {
          screenshot: '1-2-notifications-breadcrumbs.png',
          screenshotCaption: 'Notifications inbox with Your account breadcrumbs.',
          prototypePath: '/1-2/jobseekers/notifications'
        }
      ],
      relatedHref: '/documentation/profile-changes',
      relatedLabel: 'Profile changes (applications and account layout notes)'
    },
    {
      id: '1-3',
      label: 'Version 1.3',
      prefix: '/1-3',
      imageDir: 'navigation-ia-1-3',
      trySignedInHref: '/1-3/signed-in',
      trySignedInLabel: 'Signed-in entry (Your account hub)',
      summary:
        'Same browse-only service navigation and featured hub as 1.2. Every account child page adds MOJ sub navigation below breadcrumbs (before the page H1), with shared labels via `accountNavLabel()`.',
      mermaidDiagrams: [
        {
          title: 'Signed-in chrome',
          clusterMinWidth: 630,
          mermaid: `flowchart TB
  subgraph header["GOV.UK header"]
    YA["Your account → /account"]
    SO[Sign out]
  end
  subgraph serviceNav["Service navigation"]
    TV[Teaching Vacancies]
    BROWSE[Jobs · Schools · Colleges only]
  end
  header --> serviceNav
  YA --> HUB["/jobseekers/account hub"]`
        },
        {
          title: 'Your account hub — featured list',
          mermaid: `flowchart TB
  HUB["/jobseekers/account"]
  HUB --> A[Applications]
  HUB --> S[Saved jobs]
  HUB --> J[Job alerts]
  HUB --> N[Notifications]
  HUB --> P[Profile]
  HUB --> H[Help with your account]
  A --> APP["/jobseekers/job_applications"]
  S --> SJ["/jobseekers/saved_jobs"]
  J --> SUB["/jobseekers/subscriptions"]
  N --> NOT["/jobseekers/notifications"]
  P --> PD["/account/personal-details"]
  H --> HELP["/account/your-account"]`
        },
        {
          title: 'Account child page — layout order (1.3)',
          mermaid: `flowchart TB
  BC["Breadcrumbs: Your account → page"]
  MOJ["MOJ sub navigation — six tabs"]
  H1[Page H1 or section header]
  MAIN[Main content]
  BC --> MOJ --> H1 --> MAIN`
        },
        {
          title: 'MOJ sub navigation tabs',
          mermaid: `flowchart LR
  T1[Applications]
  T2[Saved jobs]
  T3[Job alerts]
  T4[Notifications]
  T5[Profile]
  T6[Help with your account]
  T1 --- T2 --- T3 --- T4 --- T5 --- T6`
        },
        {
          title: 'Difference from 1.2',
          mermaid: `flowchart LR
  V12["1.2 child page"] --> BC12[Breadcrumbs only]
  V13["1.3 child page"] --> BC13[Breadcrumbs]
  BC13 --> MOJ13[MOJ sub nav on every account route]`
        }
      ],
      layers: [
        {
          title: 'GOV.UK header (signed in)',
          items: [
            'Your account → /account (redirects to /jobseekers/account)',
            'Sign out → /account/sign-out'
          ]
        },
        {
          title: 'Service navigation',
          items: [
            'Teaching Vacancies, Jobs, Schools, Colleges only',
            'No signed-in task links in the service bar (same as 1.2)'
          ]
        },
        {
          title: 'Your account hub (/jobseekers/account)',
          items: [
            'Featured list via `accountHubFeaturedList()` — labels from `accountNavLabel()`',
            'Applications, Saved jobs, Job alerts, Notifications, Profile, Help with your account',
            'Hub page has no MOJ sub navigation (entry point only)'
          ]
        },
        {
          title: 'Account child pages — breadcrumbs + MOJ sub navigation',
          items: [
            '`jobseekerAccountBreadcrumbs(pageLabel, subNavSection)` renders breadcrumbs then sub nav',
            'Sub nav macro: `jobseekerAccountSubNav()` in `jobseeker-account-sub-nav.njk`',
            'Active tab: `aria-current="page"`; section ids match hub tiles (e.g. get-help → Help with your account)'
          ]
        },
        {
          title: 'MOJ sub navigation labels',
          items: [
            'Applications | Saved jobs | Job alerts | Notifications | Profile | Help with your account',
            'Centralised in `jobseeker-account-section-labels.njk` for hub, sub nav, and breadcrumbs'
          ]
        },
        {
          title: 'Applications and saved jobs',
          items: [
            'Applications: breadcrumbs → sub nav → H1 Applications → list (H2 Applications count)',
            'Saved jobs: /jobseekers/saved_jobs and related routes use the same breadcrumb + sub nav pattern',
            'Replaces 1.2’s breadcrumbs-only account child pages and legacy match-only MOJ sub nav'
          ]
        },
        {
          title: 'Profile and help',
          items: [
            'Profile → /account/personal-details (breadcrumb label Profile)',
            'Help with your account → /account/your-account with “On this page” anchor links'
          ]
        },
        {
          title: 'Notifications',
          items: [
            'Inbox at /jobseekers/notifications with full account chrome',
            'Empty inbox by default; footer toggle Empty state | Populated state'
          ]
        }
      ],
      screenshots: [
        {
          screenshot: '1-3-header-signed-in.png',
          screenshotCaption:
            'GOV.UK header and browse-only service navigation when signed in.',
          prototypePath: '/1-3/jobseekers/account'
        },
        {
          screenshot: '1-3-service-navigation.png',
          screenshotCaption: 'Service navigation: Jobs, Schools, Colleges only.',
          prototypePath: '/1-3/jobseekers/account'
        },
        {
          screenshot: '1-3-account-hub.png',
          screenshotCaption: 'Your account featured hub (no MOJ sub navigation on the hub itself).',
          prototypePath: '/1-3/jobseekers/account'
        },
        {
          screenshot: '1-3-applications-chrome.png',
          screenshotCaption:
            'Applications child page: breadcrumbs, MOJ sub navigation (Applications current), then page header.',
          prototypePath: '/1-3/jobseekers/job_applications'
        },
        {
          screenshot: '1-3-help-with-account.png',
          screenshotCaption:
            'Help with your account: sub navigation with Help active and On this page links.',
          prototypePath: '/1-3/account/your-account'
        }
      ]
    }
  ],

  compareTable: {
    title: 'Compare versions quickly',
    headers: [
      'Service navigation when signed in',
      'Header “Your account”',
      'Account hub',
      'In-page navigation'
    ],
    rows: [
      {
        version: '1.0',
        cells: [
          'Applications · Notifications · Your profile (plus Jobs · Schools · Colleges)',
          'Yes — /account (OneLogin settings)',
          'No',
          '`.app-account-nav` on applications area; `.app-profile-shortcuts` on /profile'
        ]
      },
      {
        version: '1.1',
        cells: [
          'Applications · Notifications · Profile (job alerts not in bar)',
          'Yes — /account (settings, not a task hub)',
          'No featured hub',
          'MOJ sub navigation on applications area — Your applications · Your saved jobs · Your job alerts'
        ]
      },
      {
        version: '1.2',
        cells: [
          'Browse only — Jobs · Schools · Colleges',
          'Yes — /account redirects to /jobseekers/account',
          'Yes — featured list at /jobseekers/account',
          'Breadcrumbs on account child pages; MOJ sub nav on legacy saved-jobs match journey only'
        ]
      },
      {
        version: '1.3',
        cells: [
          'Browse only — Jobs · Schools · Colleges',
          'Yes — /account redirects to /jobseekers/account',
          'Yes — featured list (shared `accountNavLabel()` labels)',
          'Breadcrumbs then MOJ sub nav on every account child page — six tabs through to Help with your account'
        ]
      }
    ]
  }
}
