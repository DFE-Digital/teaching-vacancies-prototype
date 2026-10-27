/**
 * Job advert listing styles — /documentation/job-advert-listing-styles
 * Listing markup uses includes/documentation-job-listing.njk (search results pattern).
 */

module.exports = {
  guideTitle: 'Job advert listing styles',
  guideDescription:
    'How job listing items appear on search results and in job alert emails. Coded with the same search-result component as /search/applications. Live production content.',
  prototypeReferenceJobIds: ['676686900', '676676690'],

  scopeIntro:
    'Listing items use a job title link, one address line, then a summary list. Live production varies by pay model, faith, MAT structure, and part-time vs full-time.',

  confirmedFine: [
    { label: 'Job title', detail: 'Hyperlink to the job page.' },
    { label: 'Address line', detail: 'School or organisation name, town or area, county, postcode.' }
  ],

  designConstraints: [
    'Only one address can be shown on the listing — how should multi-academy trusts (MATs) and jobs at a trust vs a single school be handled?',
    'Need production-based examples for each information type below.',
    'Organisation type, faith, phase, and salary can appear in different combinations on the same layout.'
  ],

  taxonomy: {
    organisationType: [
      'Independent school',
      'Special school',
      'Academy (single academy trust — SAT)',
      'Multi-academy trust (MAT)',
      'All-through school',
      'Sixth form college',
      'FE college'
    ],
    faithType: ['Church of England (CofE)', 'Roman Catholic (RC)', 'Non-faith'],
    schoolPhase: ['Primary', 'Middle', 'Secondary', 'College']
  },

  salaryFieldTypes: [
    'Salary band (for example Grade C1 to C3)',
    'Hourly rate (sometimes with separate holiday pay)',
    'MPR / UPS (main and upper pay range)',
    'FTE annual range with pro rata or actual salary for part-time',
    'Grade and spinal column point (SCP) with hours and term-time only called out'
  ],

  productionExamples: [
    {
      id: 'faith-schools',
      title: 'Faith schools',
      caption: 'Hourly rate with holiday pay; FTE band by grade.',
      examples: [
        {
          baNote: 'What do we show from here? (address and pay model for casual hourly roles.)',
          job: {
            id: 'doc-faith-invigilator',
            title: 'Exam Invigilator',
            isUsingApplicationForm: 'No',
            organisation: {
              name: 'The St Marylebone CofE School',
              address: { address1: 'London', postcode: 'W1U 5BA' }
            },
            salaryLabel: 'Full time equivalent salary',
            actualSalaryDetails: '£16.75 per hour, plus £2.40 per hour holiday pay',
            schoolType: 'Academy, Church of England, ages 11 to 18',
            workingPatterns: ['Part time'],
            closingDate: '2026-10-23T16:00:00.000Z',
            closingTime: '4pm'
          }
        },
        {
          job: {
            id: 'doc-faith-cover',
            title: 'Cover Supervisor',
            isUsingApplicationForm: 'No',
            organisation: {
              name: 'Bishop Walsh Catholic School',
              address: {
                address1: 'Sutton Coldfield',
                county: 'West Midlands',
                postcode: 'B76 1QT'
              }
            },
            salaryLabel: 'Full time equivalent salary',
            fullTimeEquivalentSalaryDetails: '£28,153.00 - £34,811.00 Annually (FTE) Grade 3',
            schoolType: 'Academy, Roman Catholic, ages 11 to 18',
            contractType: 'Permanent',
            workingPatterns: ['Full time'],
            closingDate: '2026-10-23T23:59:00.000Z',
            closingTime: '11:59pm'
          }
        }
      ]
    },
    {
      id: 'class-teacher',
      title: 'Existing production — class teacher (more complex advert)',
      caption: 'FTE range with MPS/UPS; organisation logo on live (not shown in prototype listing).',
      examples: [
        {
          baNote: 'Open question: there is FTE and MPS/UPS — what combination do we need in the summary?',
          job: {
            id: 'doc-class-teacher',
            title: 'Class Teacher',
            isUsingApplicationForm: 'No',
            organisation: {
              name: 'Springfield Academy',
              address: {
                address1: 'Nottingham',
                county: 'Nottinghamshire',
                postcode: 'NG6 8BL'
              },
              logo: '/public/images/logos/courtland.png'
            },
            salaryLabel: 'Full time equivalent salary',
            fullTimeEquivalentSalaryDetails: '£34,068.00 - £52,834.00 Annually (FTE) MPS/UPS',
            schoolType: 'Academy, ages 2 to 11',
            phase: 'Primary school',
            contractType: 'Permanent',
            workingPatterns: ['Full time'],
            closingDate: '2026-10-23T16:00:00.000Z',
            closingTime: '4pm'
          }
        }
      ]
    },
    {
      id: 'catering-assistant',
      title: 'Part-time support — pro rata salary',
      caption: 'FTE figure with minimum pro rata actual salary explained in text.',
      examples: [
        {
          baNote: 'What information is needed in the summary vs on the job page?',
          job: {
            id: 'doc-catering',
            title: 'Catering Assistant (7517)',
            isUsingApplicationForm: 'No',
            organisation: {
              name: 'Valley Academy',
              address: {
                address1: 'Bradford',
                county: 'West Yorkshire',
                postcode: 'BD8 7DX'
              }
            },
            salaryLabel: 'Full time equivalent salary',
            fullTimeEquivalentSalaryDetails:
              '£25,614.00 Annually (FTE) Grade B Point 3 (£25,614 Full Time Equivalent) subject to pro rata. The minimum actual pro rata salary per annum for this job starts at £8,971.09',
            schoolType: 'Free school, ages 11 to 16',
            phase: 'Secondary school',
            workingPatterns: ['Part time'],
            closingDate: '2026-10-23T23:59:00.000Z',
            closingTime: '11:59pm'
          }
        }
      ]
    },
    {
      id: 'special-schools',
      title: 'Special schools',
      caption: 'SEN allowance and pro rata wording on teaching assistant roles.',
      examples: [
        {
          job: {
            id: 'doc-special-ta',
            title: 'Teaching Assistant',
            isUsingApplicationForm: 'No',
            organisation: {
              name: 'Wembley Manor',
              address: { address1: 'Wembley', town: 'Brent', postcode: 'HA9 7EU' }
            },
            salaryLabel: 'Full time equivalent salary',
            fullTimeEquivalentSalaryDetails:
              '£29,025.00 - £29,436.00 Annually (FTE) Actual Salary, £26,699.23 per annum inclusive of SEN Allowance',
            schoolType: 'Free school, ages 11 to 16',
            workingPatterns: ['Full time'],
            closingDate: '2026-10-23T23:59:00.000Z',
            closingTime: '11:59pm'
          }
        },
        {
          job: {
            id: 'doc-special-hlta',
            title: 'Higher Level Teaching Assistant',
            isUsingApplicationForm: 'No',
            organisation: {
              name: 'Woolgrove School, Special Needs Academy',
              address: {
                address1: 'Letchworth Garden City',
                county: 'Hertfordshire',
                postcode: 'SG6 2PT'
              }
            },
            salaryLabel: 'Full time equivalent salary',
            fullTimeEquivalentSalaryDetails: '£26,800.00 Annually (FTE) Salary will be pro rata',
            schoolType: 'Academy, ages 4 to 11',
            workingPatterns: ['Full time'],
            closingDate: '2026-10-23T23:59:00.000Z',
            closingTime: '11:59pm'
          }
        }
      ]
    },
    {
      id: 'send-part-time',
      title: 'SEND — part-time actual vs FTE',
      caption: 'Long salary text: actual pay, grade, SCP, hours, term time; hourly invigilator comparison.',
      examples: [
        {
          baNote: 'What do we need to display — full-time salary and part-time actual, or a shortened rule?',
          job: {
            id: 'doc-send-ta',
            title: 'Teaching Assistant providing 1 to 1 support for children with SEND',
            isUsingApplicationForm: 'No',
            organisation: {
              name: 'Sonning Church of England Primary School',
              address: { address1: 'Reading', county: 'Berkshire', postcode: 'RG4 6XF' }
            },
            salaryLabel: 'Full time equivalent salary',
            actualSalaryDetails:
              '£17,171.00 - £17,443.00 Annually (Actual). Grade 3 SCP 5 - 6, dependent on experience and skillset. FTE salary £26,428 - £26,847. Actual salary based on 28 hours 45 mins per week, term time only.',
            schoolType: 'Academy, Church of England, ages 4 to 11',
            workingPatterns: ['Part time'],
            closingDate: '2026-10-23T23:59:00.000Z',
            closingTime: '11:59pm'
          }
        },
        {
          baNote: 'Is this correct for listing summaries? (closing time 4pm vs 11:59pm elsewhere.)',
          job: {
            id: 'doc-send-invigilator',
            title: 'Exam Invigilator',
            isUsingApplicationForm: 'No',
            organisation: {
              name: 'The St Marylebone CofE School',
              address: { address1: 'London', postcode: 'W1U 5BA' }
            },
            salaryLabel: 'Full time equivalent salary',
            actualSalaryDetails: '£16.75 per hour, plus £2.40 per hour holiday pay',
            schoolType: 'Academy, Church of England, ages 11 to 18',
            workingPatterns: ['Part time'],
            closingDate: '2026-10-23T16:00:00.000Z',
            closingTime: '4pm'
          }
        }
      ]
    }
  ],

  openQuestions: [
    'How do we manage different addresses — for example a multi-academy trust where the employer is not the school on the ground?',
    'Does school type on the listing matter to jobseekers, or is it redundant with organisation and phase?',
    'What fields must appear on the listing summary vs only on the job page?',
    'What do we display for a single academy trust (SAT)?',
    'What do we display for a multi-academy trust (MAT)?',
    'Salary field — what do we show and in what order of priority?',
    'FTE can be pro-rated for part-time and term-time — how much of that detail belongs in the listing?',
    'Salary bands (from / to) vs single point vs grade label — which wins when all are present?',
    'If part time, do we display hourly rate, actual annual, FTE, or a combination?',
    'What about MPS / UPS when FTE is also shown?',
    'Closing date — confirm time format (4pm vs 11:59pm) and timezone rules for listings and alerts.'
  ],

  proposedAmends: [
    'Salary line on listing items is shortened to 160 characters with the full text in a tooltip when truncated (v1.2 search).',
    'Salary priority in the prototype: hourly or actual annual, then FTE, then pay scale; simple ranges append MPS/UPS or grade in brackets.',
    'Document MAT / trust naming on the address line when only one address is allowed.',
    'Job alert email listing blocks still to align with search results (shared include is ready).',
    'School type on listings uses job.schoolType or organisation type, faith, and phase (v1.2 search).'
  ]
}
