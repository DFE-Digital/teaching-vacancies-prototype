/*

Provide default values for user session data. These are automatically added
via the `autoStoreData` middleware. Values will only be added to the
session if a value doesn't already exist. This may be useful for testing
journeys where users are returning or logging in to an existing application.

============================================================================

Example usage:

"full-name": "Sarah Philips",

"options-chosen": [ "foo", "bar" ]

============================================================================

*/

let job = {
  // Setting up the job aplication flow to be Primary by default
  // Options: "More than one phase", "Primary" "Secondary", "16 to 19"
  phase: "Secondary",
  
  // Setting up the job aplication flow user to be single school by default
  // Options: "singleSchool" "multiSchoolMat, "multiSchoolLa"
  userType: "singleSchool",

  // Default school name
  defaultSchoolName: "Hello school",

  // Default user name
  defaultUserName: "Molly Capstick",

  // How many jobs has the school listed
  // Options: "More than 20" "Less than or equal to 20"
  numberOfJobsListed: "More than 20",

  // Does the journey include an all-through school?
  // Defaults to no as its less common
  // containsAllThroughPhase: "Yes"
}

// Setting the default layout settings
let settings = {
  useAltHeader: "true",
  showPrimaryNav: "true"
}

// Import data
const jobs = require('./jobs.json')
const applications = require('./applications.json')

module.exports = {

  jobs,
  applications,
    
  // Assign the phase to job
  job: job,
  
  // Assign layout settings
  settings: settings,
  
  // Insert values here

//   "location": "N8 8AL",
//   "mode-commute": "by car",
//   "time-commute": "20 minutes",
//   "subject": "Science",
//   "jobtitle": "Teaching",
//   "phase": "Secondary",
//   "workpattern": "Full-time",

  // March MAT Usablity Test
//   "mat-name": "Sweet Valley Trust",
//   "mat-address": "45-49 Chapeltown Road, Ecclesfield, Sheffield, South Yorkshire, S35 9WD",
//   "mat-name2": "Heartford High",
//   "mat-name3": "Degrassi High School",
//   "mat-name4": "Bayside High School",
//   "mat-name5": "Rydell High",
//   "mat-name6": "Shermer High School",
//   "mat-name7": "North Shore High School",
//   "mat-name2-address": "Pond Street, Sheffield, South Yorkshire, S1 1YB",
//   "mat-name3-address": "88 Arundel Street, Sheffield, South Yorkshire, S1 2LG",
//   "mat-name4-address": "19 Spital Street, Sheffield, South Yorkshire, S3 9NB",
//   "mat-name5-address": "Granville Road, Sheffield, South Yorkshire, S2 2FL",
//   "mat-name6-address": "Andover Street, Sheffield, Not recorded, S3 9AE",
//   "mat-name7-address": "Norfolk Park Road, Sheffield, South Yorkshire, S2 2JU",
//   "service-access1": "End user - You can view and create teaching jobs",
//   "service-access2": "Approver - You can manage other peoples access",
//   "service-access3": "None",
//   "trust-location": "",
//   "school": "",
//   "job-title": "Science Teacher",
//   "job-role": "Teacher",
//   "subject": "Science",
//   "pattern": "Full time",
//   "salary": "££ Lorem",
//   "benefits": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//   "email": "ann.green@svtrust.com",
//   "link": "http://test-website.com/apply",
//   "visits": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//   "apply": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//   "summary": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
//   "trust-summary": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",

  // Applications - Round 2 - January 2021
//   "user-email": "example-email@email.com",
//   "app2-jobListingName": "Primary Teacher",
//   "app2-schoolName": "Bronson Alcott Academy",
//   "app3-schoolName": "John Jones Academy",

//   "emp1-organisation": "Lorem ipsum dolor sit amet",
//   "emp1-jobTitle": "Lorem ipsum dolor sit amet",
//   "emp1-salary": "Lorem ipsum dolor sit amet",
//   "emp1-subjects": "Lorem ipsum dolor sit amet",
//   "emp1-mainDuties": "Lorem ipsum dolor sit amet",
//   "emp1-reason": "Lorem ipsum dolor sit amet",

//   "emp2-organisation": "Lorem ipsum dolor sit amet",
//   "emp2-jobTitle": "Lorem ipsum dolor sit amet",
//   "emp2-salary": "Lorem ipsum dolor sit amet",
//   "emp2-subjects": "Lorem ipsum dolor sit amet",
//   "emp2-mainDuties": "Lorem ipsum dolor sit amet",
//   "emp2-reason": "Lorem ipsum dolor sit amet",

  // "app2-personalStatement": "Lorem ipsum dolor sit amet",

//   "ref1-name": "Lorem ipsum dolor sit amet",
//   "ref1-jobTitle": "Lorem ipsum dolor sit amet",
//   "ref1-organisation": "Lorem ipsum dolor sit amet",
//   "ref1-relationship": "Lorem ipsum dolor sit amet",
//   "ref1-email": "Lorem ipsum dolor sit amet",
//   "ref1-phone": "Lorem ipsum dolor sit amet",

//   "ref2-name": "Lorem ipsum dolor sit amet",
//   "ref2-jobTitle": "Lorem ipsum dolor sit amet",
//   "ref2-organisation": "Lorem ipsum dolor sit amet",
//   "ref2-relationship": "Lorem ipsum dolor sit amet",
//   "ref2-email": "Lorem ipsum dolor sit amet",
//   "ref2-phone": "Lorem ipsum dolor sit amet"

}
