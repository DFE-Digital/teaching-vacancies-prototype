/**
 * FE Quick Apply content parity — /documentation/fe-content-changes-1
 * Screenshots: app/assets/images/documentation/fe-content-changes-1/*.png
 * Capture: npm run capture:fe-content-changes-docs (kit on port 3000)
 */

module.exports = {
  guideTitle: 'FE Quick Apply content parity',
  guideDescription:
    'Content and copy changes from the v1.1 design change log (9 October 2026) so Quick Apply wording includes colleges as well as schools.',
  imageDir: 'fe-content-changes-1',
  prototypeJob: {
    id: '67663',
    title: 'SEN Teaching Assistant',
    organisation: 'Thrive Learning Center',
    phase: 'Further education'
  },
  changeLogCaption: 'Changes made in the v1.1 prototype',
  changeLog: [
    {
      date: '9 October 2026, 3:45pm',
      html:
        '<strong>P0 Quick Apply content</strong><ul class="govuk-list govuk-list--bullet">' +
        '<li>Before you start: last bullet is “Referee details”. Save copy says details are reused so the next application is faster.</li>' +
        '<li>Personal statement, add-a-job hint, and submitted page now say schools and colleges. Work history “school and university” left as an education gap.</li>' +
        '<li>Faith templates use “school or college” for ethos and “the school or college has asked”. Those screens stay off the live apply journey until a hirer chooses a faith form.</li></ul>'
    },
    { date: '9 October 2026, 4:15pm', html: 'QA5 Before you start: last bullet already says “Referee details”. No further change.' },
    {
      date: '9 October 2026, 4:15pm',
      html:
        'QA6 Personal details: working-pattern hint now says some schools or colleges may consider part-time applicants, even if a role is advertised as full time.'
    },
    {
      date: '9 October 2026, 4:15pm',
      html:
        'QA7 Professional status: support-role line now includes teaching, or lecturing experience. QTS and TRN wording unchanged.'
    },
    { date: '9 October 2026, 4:15pm', html: 'QA8 Qualifications: no change.' },
    { date: '9 October 2026, 4:15pm', html: 'QA9 Training and CPD: no change.' },
    {
      date: '9 October 2026, 4:15pm',
      html:
        'QA10 Professional body memberships: no agreed further-education examples, so Chartered College of Teaching and the General Teaching Council stay.'
    },
    {
      date: '9 October 2026, 4:15pm',
      html: 'QA11 Work history: no change. “School and university” stays as the education gap.'
    },
    {
      date: '9 October 2026, 4:15pm',
      html:
        'QA12 Personal statement: opening line already says schools and colleges typically expect 500 to 1,000 words.'
    },
    { date: '9 October 2026, 4:15pm', html: 'QA13 Personal statement: wider rewrite not done. Duplicate “can” is not in the live sentence.' },
    {
      date: '9 October 2026, 4:15pm',
      html:
        'QA14 Personal statement: word-count line already says schools and colleges typically expect 500 to 1,000 words.'
    },
    {
      date: '9 October 2026, 4:15pm',
      html: 'QA15 Personal statement: responsibilities bullet now says “in schools or colleges”.'
    },
    {
      date: '9 October 2026, 4:15pm',
      html:
        'QA16 Personal statement: advice line now says experienced teachers, lecturers and educational leaders. One “You can also use” remains.'
    },
    {
      date: '9 October 2026, 4:15pm',
      html: 'QA17 Personal statement: second word-count line already says schools and colleges.'
    },
    {
      date: '9 October 2026, 4:15pm',
      html:
        'QA18 References: intro now says schools or colleges must contact referees in line with keeping children safe in education (KCSIE) statutory guidance.'
    },
    { date: '9 October 2026, 4:15pm', html: 'QA20 References: contact question and hint already say school or college.' },
    { date: '9 October 2026, 4:15pm', html: 'QA21 Equal opportunities: no change.' },
    {
      date: '9 October 2026, 4:15pm',
      html: 'QA22 Declarations: “school or college” and “schools and colleges” already in place. No new design.'
    },
    { date: '9 October 2026, 4:15pm', html: 'QA23 Declarations: no new safeguarding question. Content design still needed.' },
    { date: '9 October 2026, 4:15pm', html: 'QA24 Working pattern preferences: same hint update as QA6.' },
    { date: '9 October 2026, 4:15pm', html: 'QA25 Induction: ECT and NQT hint left as it is. No vocational branch.' },
    {
      date: '9 October 2026, 4:15pm',
      html:
        'QA26 Religious information: ethos question already says school or college. Faith screens stay off the live journey.'
    }
  ],
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      mapId: 'P0 / 3297',
      summary:
        'Epic 3297 (FE content parity for Quick Apply) updates shared apply templates so copy refers to schools and colleges where applicants at colleges would otherwise see school-only language.',
      analysis: [
        'Many Quick Apply screens reuse one template for schools and colleges; inclusive wording avoids wrong assumptions for FE applicants.',
        'Faith-specific screens remain unpublished on the live router until hiring staff choose a faith form (HS16).',
        'Professional status architecture for FE (QTS vs college qualifications) is documented separately on the Quick Apply FE design review.'
      ],
      implemented: [
        'P0 pass across start, personal statement, work history hints, submitted, and orphan faith templates.',
        'QA5–QA26 audit recorded in the change log table on this page.',
        'Files mainly under views/apply/flow/ and views/apply/start.njk.'
      ],
      screenshot: null
    },
    {
      id: 'before-you-start',
      title: 'Before you start',
      mapId: 'TV3 / QA5',
      summary: 'Last preparation bullet names referee details; save-and-reuse messaging explains faster repeat applications.',
      analysis: [
        'Applicants need to know referees are part of preparation, aligned with the references section.',
        'Quick Apply reuse should be explicit to reduce drop-off on repeat applications.'
      ],
      implemented: [
        'Last bullet: “Referee details” (apply/start.njk).',
        'Save copy: details can be reused so the next application is faster.',
        'QA5: no further change beyond confirming the bullet label.'
      ],
      screenshot: 'fe-before-you-start.png',
      screenshotCaption: 'Before you start — referee details bullet and save messaging.',
      prototypePath: '/apply'
    },
    {
      id: 'personal-details',
      title: 'Personal details and working pattern',
      mapId: 'TV5 / QA6 / QA24',
      summary: 'Working pattern hint includes colleges when explaining part-time interest on full-time roles.',
      analysis: [
        'College hiring sometimes considers part-time candidates for full-time adverts.',
        'Same hint appears on working pattern preferences (QA24).'
      ],
      implemented: [
        'Hint: some schools or colleges may consider part-time applicants even when the role is full time.',
        'apply/flow/personal-details.njk (and matching preferences copy where shared).'
      ],
      screenshot: 'fe-personal-details.png',
      screenshotCaption: 'Personal details — schools or colleges working pattern hint.',
      prototypePath: '/apply/personal-details'
    },
    {
      id: 'professional-status',
      title: 'Professional status (support roles)',
      mapId: 'TV6 / QA7',
      summary: 'Support-role guidance mentions lecturing as well as teaching experience; QTS/TRN screens unchanged on school-style flows.',
      analysis: [
        'College support roles may need lecturing experience called out alongside teaching.',
        'Broader FE professional status branching is out of scope for this content-only pass.'
      ],
      implemented: [
        'Support-role line: teaching, or lecturing experience.',
        'QTS and TRN question wording not changed in this log entry.'
      ],
      screenshot: 'fe-professional-status-support.png',
      screenshotCaption: 'Professional status — support role wording (shared template).',
      prototypePath: '/apply/professional-status'
    },
    {
      id: 'personal-statement',
      title: 'Personal statement',
      mapId: 'TV16 / QA12–QA17',
      summary: 'School-centric lines updated to schools and colleges; responsibilities and advice mention lecturers.',
      analysis: [
        'Word-count expectations and bullets must fit college applicants.',
        'Get Into Teaching links remain for school journeys; FE branch uses college-aware examples where branched.'
      ],
      implemented: [
        'Opening and word-count lines: schools and colleges typically expect 500 to 1,000 words (QA12, QA14, QA17).',
        'Responsibilities bullet: “in schools or colleges” (QA15).',
        'Advice: experienced teachers, lecturers and educational leaders (QA16).',
        'QA13 wider rewrite deferred.'
      ],
      screenshot: 'fe-personal-statement.png',
      screenshotCaption: 'Personal statement — schools and colleges wording.',
      prototypePath: '/apply/personal-statement'
    },
    {
      id: 'work-history',
      title: 'Work history and add job',
      mapId: 'TV11–TV15 / P0',
      summary: 'Add-job hint and submitted messaging use schools and colleges; education gap still says school and university.',
      analysis: [
        'QA11 explicitly keeps “school and university” for education gaps.',
        'P0 updated add-job hint and submitted copy for inclusive organisation language.'
      ],
      implemented: [
        'flow/job.njk hint: schools and colleges where organisation type is asked.',
        'flow/submitted.njk: schools and colleges in confirmation copy.',
        'Education gap example unchanged: school and university.'
      ],
      screenshot: 'fe-work-history.png',
      screenshotCaption: 'Work history / add job — inclusive hint text.',
      prototypePath: '/apply/work-history'
    },
    {
      id: 'references',
      title: 'References',
      mapId: 'TV17–TV19 / QA18 / QA20',
      summary: 'Intro and contact hints use school or college; KCSIE referenced for referee contact.',
      analysis: [
        'Safeguarding copy must not assume primary schools only.',
        'Contact referee question already neutral in QA20.'
      ],
      implemented: [
        'Intro: schools or colleges must contact referees in line with KCSIE (QA18).',
        'Contact question and hint: school or college (QA20).',
        'FE-specific referee paragraph retained on college jobs (see Quick Apply FE guide).'
      ],
      screenshot: 'fe-references.png',
      screenshotCaption: 'References intro — schools or colleges and KCSIE.',
      prototypePath: '/apply/references'
    },
    {
      id: 'declarations',
      title: 'Declarations',
      mapId: 'TV22 / QA22–QA23',
      summary: 'Relationship and organisation wording includes school or college; no new safeguarding question in this pass.',
      analysis: [
        'QA22 confirms inclusive strings already present.',
        'QA23: additional safeguarding question still needs content design.'
      ],
      implemented: [
        'flow/declarations.njk: school or college / schools and colleges wording audited.',
        'No new declaration question added (QA23).'
      ],
      screenshot: 'fe-declarations.png',
      screenshotCaption: 'Declarations — school or college relationship wording.',
      prototypePath: '/apply/declarations'
    },
    {
      id: 'submitted',
      title: 'Application submitted',
      mapId: 'TV24 / P0',
      summary: 'Confirmation copy refers to schools and colleges rather than schools only.',
      analysis: [
        'Post-submit reassurance should match who may read the application.'
      ],
      implemented: [
        'flow/submitted.njk updated for schools and colleges (P0).'
      ],
      screenshot: 'fe-submitted.png',
      screenshotCaption: 'Submitted page — schools and colleges wording.',
      prototypePath: '/apply/submitted'
    },
    {
      id: 'faith-templates',
      title: 'Faith templates (not on live journey)',
      mapId: 'RC / RQ / QA26',
      summary: 'Orphan religion templates use school or college ethos wording; not mounted until HS16 faith form is chosen.',
      analysis: [
        'Faith colleges would need the same inclusive language when those screens are wired in.',
        'Live journey still only collects religion in equal opportunities.'
      ],
      implemented: [
        'religion_cofe_1.njk: school or college ethos and aims.',
        'Matching hints: the school or college has asked.',
        'QA26: ethos question confirmed; screens stay off live router.'
      ],
      screenshot: null,
      screenshotCaption: null,
      prototypePath: null
    }
  ]
}
