/**
 * Default job alerts for signed-in jobseeker session (jobseekerAlerts).
 */

module.exports = [
  {
    id: 'alert-design-london',
    keyword: 'design, teacher, arts',
    location: 'Within 200 miles of Islington, London',
    criteria: {
      ect: 'Yes',
      feQts: 'No',
      visa: 'Yes',
      subjects: 'Design and technology, ICT',
      phases: 'Nursery, Primary school, Secondary school, Sixth form or FE college, All through school',
      workingPatterns: 'Full time, Part time, Job share'
    },
    form: {
      keyword: 'design, teacher, arts',
      location: 'Islington, London',
      radius: '200',
      phases: ['nursery', 'primary', 'secondary', 'sixth_form_or_college', 'through'],
      workingPatterns: ['full_time', 'part_time', 'job_share'],
      ectStatuses: ['ect_suitable'],
      international: ['visa'],
      subjects: ['Design and technology', 'ICT'],
      email: 'rachael@example.com',
      frequency: 'weekly'
    },
    frequency: 'weekly',
    status: 'active'
  },
  {
    id: 'alert-maths-manchester',
    keyword: 'mathematics, maths teacher',
    location: 'Within 25 miles of Manchester',
    criteria: {
      ect: 'No',
      feQts: 'No',
      visa: 'No',
      subjects: 'Mathematics',
      phases: 'Secondary school, Sixth form or FE college',
      workingPatterns: 'Full time'
    },
    form: {
      keyword: 'mathematics, maths teacher',
      location: 'Manchester',
      radius: '25',
      phases: ['secondary', 'sixth_form_or_college'],
      workingPatterns: ['full_time'],
      ectStatuses: [],
      international: [],
      subjects: ['Mathematics'],
      email: 'rachael@example.com',
      frequency: 'daily'
    },
    frequency: 'daily',
    status: 'inactive'
  }
]
