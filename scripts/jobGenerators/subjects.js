const faker =  require('@faker-js/faker').faker
faker.setLocale('en_GB');

module.exports = (params) => {
  const subjects = [
    'Accounting',
    'Art and design',
    'Biology',
    'Business studies',
    'Chemistry',
    'Citizenship',
    'Classics',
    'Computing',
    'Dance',
    'Design and technology',
    'Drama',
    'Economics',
    'Engineering',
    'English',
    'Food Technology',
    'French',
    'Geography',
    'German',
    'Health and social care',
    'History',
    'Humanities',
    'ICT',
    'Languages',
    'Law',
    'Mandarin',
    'Mathematics',
    'Media studies',
    'Music',
    'Philosophy',
    'Physical education',
    'Physics',
    'Politics',
    'Psychology',
    'Relationships and sex education',
    'Religious education',
    'Science',
    'Social sciences',
    'Sociology',
    'Spanish',
    'Statistics'
  ]

  return faker.helpers.arrayElement(subjects)
}

