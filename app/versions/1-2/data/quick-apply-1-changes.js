/**
 * Quick Apply FE design review — /documentation/quick-apply-1
 * Screenshot files: app/assets/images/documentation/quick-apply-1/{id}.png (copied to public/ on build)
 * Re-run npm run capture:quick-apply-docs after prototype changes (kit on port 3000).
 */

module.exports = {
  guideTitle: 'Quick Apply for further education',
  guideDescription:
    'Design review of the jobseeker Quick Apply journey for college vacancies (v1.1). Each section explains the problem, what we changed in the prototype, and a screenshot of the updated flow (job 67663).',
  prototypeJob: {
    id: '67663',
    title: 'SEN Teaching Assistant',
    organisation: 'Thrive Learning Center',
    phase: 'Further education'
  },
  sections: [
    {
      id: 'overview',
      title: 'Overview',
      mapId: null,
      summary:
        'Quick Apply branches on education phase: further education listings use college-relevant questions; school listings keep the existing QTS journey. Shared routes remain under /jobs/:id/apply/* in application-flow.js.',
      analysis: [
        'One router serves schools and colleges; FE is detected from job.organisation.phase (or job.phase).',
        'Hiring staff still choose Quick Apply vs external apply at publish time (HS16).',
        'Policy-heavy items (full FE referee rules) remain for safeguarding sign-off — copy reflects current direction.'
      ],
      implemented: [
        'isFurtherEducationJob() in app/versions/1-1/lib/quick-apply-fe.js drives templates and professional-status POST handling.',
        'School professional status unchanged; FE uses a separate question set without default QTS/TRN.',
        'Validation and task-list behaviour updated service-wide for Quick Apply.'
      ],
      screenshot: null,
      screenshotCaption: null
    },
    {
      id: 'tv3-before-you-start',
      title: 'Before you start',
      mapId: 'TV3',
      summary: 'Sets expectations before the task list, with FE-specific inset text and aligned referee bullet.',
      analysis: [
        'Applicants need clear preparation expectations and to know FE differs from school-only apply.',
        'Imported data should prompt review before submit.'
      ],
      implemented: [
        'FE inset explains college qualifications and referees vs school-only questions (apply/start.njk).',
        'Referee bullet aligned with references section (employer + 16–18 where required).',
        'Copy prompts review of imported sections; Start application primary action retained.'
      ],
      screenshot: 'tv3-before-you-start.png',
      screenshotCaption: 'Further education vacancy — Before you start (job 67663).',
      prototypePath: '/apply'
    },
    {
      id: 'tv4-task-list',
      title: 'Application task list',
      mapId: 'TV4',
      summary: 'Task list uses GOV.UK-style status tags and blocks review until every section is complete.',
      analysis: [
        'Imported reuse data must be reviewed before submit.',
        'Inconsistent statuses made progress hard to scan.'
      ],
      implemented: [
        '“Needs review” (blue) replaces “Imported”; “Completed” uses green tag (apply/task-list.njk).',
        'Banner text tells users to review Needs review sections.',
        'Review and submit primary action only when canSubmitApplication is true; inset + preview link otherwise.',
        'All sections still shown for FE support roles — product may later hide school-only tasks.'
      ],
      screenshot: 'tv4-task-list.png',
      screenshotCaption: 'Task list with Needs review tags and submit gate.',
      prototypePath: '/apply/task-list'
    },
    {
      id: 'tv6-professional-status',
      title: 'Professional status',
      mapId: 'TV6',
      summary: 'Further education jobs ask about relevant qualifications and maths/English — not QTS/TRN by default.',
      analysis: [
        'College roles often need vocational or training qualifications rather than school QTS framing.',
        'Support roles may have no teaching qualification.'
      ],
      implemented: [
        'FE branch in apply/flow/professional-status.njk: relevant qualification, details, maths/English question.',
        'POST handler stores fe: true and FE fields (routes/application-flow.js).',
        'Review page shows FE summary rows when isFeJob or status.fe.'
      ],
      screenshot: 'tv6-professional-status.png',
      screenshotCaption: 'Professional status on an FE vacancy — college qualification questions.',
      prototypePath: '/apply/professional-status'
    },
    {
      id: 'tv13-work-history',
      title: 'Work history and gaps',
      mapId: 'TV11–TV15',
      summary: 'Gap examples and job fields use inclusive school/college language.',
      analysis: [
        'FE routes include college, employment, and retraining gaps.',
        'Subject labelling should fit curriculum areas.'
      ],
      implemented: [
        'Gap list: “school, college, or university”, education to employment, caring/travel/retraining (work-history.njk).',
        'FE jobs: “Curriculum area or subjects (optional)” on add job (job.njk).'
      ],
      screenshot: 'tv13-work-history.png',
      screenshotCaption: 'Work history intro with inclusive gap examples.',
      prototypePath: '/apply/work-history'
    },
    {
      id: 'tv16-personal-statement',
      title: 'Personal statement',
      mapId: 'TV16',
      summary: 'Role-aware guidance for FE lecturing/training vs support; GDS character count on the textarea.',
      analysis: [
        'School-only classroom bullets do not fit all college applicants.',
        'Word limit needs accessible counting.'
      ],
      implemented: [
        'FE: separate headings for lecturing/training and support with FE examples.',
        'School journey keeps existing teaching bullets and Get Into Teaching links.',
        'govukCharacterCount (10,000 characters) plus word count line retained.'
      ],
      screenshot: 'tv16-personal-statement.png',
      screenshotCaption: 'Personal statement with FE role guidance and character count.',
      prototypePath: '/apply/personal-statement'
    },
    {
      id: 'tv17-references',
      title: 'References',
      mapId: 'TV17–TV19',
      summary: 'FE referee intro clarifies employer, learners, and KCSIE where under-18s apply.',
      analysis: [
        'College roles vary in contact with under-18s; copy must not assume primary schools only.'
      ],
      implemented: [
        'FE paragraph on employer referee, learners, and KCSIE for under-18 contact.',
        'Note on employer vs professional referees from job description.',
        'School branch keeps previous KCSIE wording.'
      ],
      screenshot: 'tv17-references.png',
      screenshotCaption: 'References intro for further education.',
      prototypePath: '/apply/references'
    },
    {
      id: 'tv22-declarations',
      title: 'Declarations',
      mapId: 'TV22',
      summary: 'Safeguarding messaging uses warning text and FE-aware relationship wording.',
      analysis: [
        'Legal and safeguarding points need stronger visual emphasis.',
        'College governance differs from school trusts.'
      ],
      implemented: [
        'govukWarningText for barred list offence.',
        'FE note on safeguarding for 16+ learners with under-18 contact.',
        'Relationship question includes corporation board members.',
        'Both declaration answers required before submit (validation).'
      ],
      screenshot: 'tv22-declarations.png',
      screenshotCaption: 'Declarations with warning text and college relationship wording.',
      prototypePath: '/apply/declarations'
    },
    {
      id: 'gds-validation',
      title: 'Review and submit (validation)',
      mapId: 'GDS / TV23',
      summary: 'Submit is gated until all sections are complete and declarations are answered.',
      analysis: [
        'Previously submit worked with incomplete self-declared sections.',
        'Hiring staff need complete applications.'
      ],
      implemented: [
        'validateApplicationForSubmit() in quick-apply-fe.js — links to incomplete sections.',
        'govukErrorSummary on review when validation fails; submit button disabled until fixed.',
        'Task list hides primary review until canSubmitApplication.'
      ],
      screenshot: 'gds-validation.png',
      screenshotCaption: 'Review page with error summary when sections are incomplete.',
      prototypePath: '/apply/review'
    },
    {
      id: 'tv2-apply-entry',
      title: 'Job listing apply entry',
      mapId: 'TV2',
      summary: 'Two-step entry retained: listing → before you start; education phase visible on start.',
      analysis: [
        'Product chose to keep separate before you start rather than Start now on listing.',
        'FE phase visibility helps applicants confirm context.'
      ],
      implemented: [
        'No change to listing CTA — still Apply for this job → before you start.',
        'Education phase line on start and apply section headings (unchanged pattern, FE inset added on start).'
      ],
      screenshot: 'tv2-apply-entry.png',
      screenshotCaption: 'FE job listing with Apply for this job.',
      prototypePath: ''
    }
  ]
}
