const users = require('../data/users.json')
const jobs = require('../data/jobs.json')
const jobseekers = require('../data/jobseekers.json')

exports.getUser = (emailAddress) => {
  let user = null

  user = users.find(user => user.username == emailAddress)

  if(user) {
    // add jobs to the user
    user.jobs = jobs.filter(job => job.organisation.name == user.organisation.name)

    // add jobseekers
    if(user.organisation.schools) {
      user.jobseekers = jobseekers
    } else {
      user.jobseekers = jobseekers.filter(jobseeker => {
        return jobseeker.profile.phases.includes(user.organisation.phase)
      })
    }
  }

  return user
}
