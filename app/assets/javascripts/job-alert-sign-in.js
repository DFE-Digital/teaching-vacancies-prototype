// v1.3 — unsigned job alert form submit → jobseeker sign-in (?from=savealert).
(function () {
  function versionPrefixFromLocation () {
    var match = window.location.pathname.match(/^(\/1-[0-3])(?=\/)/)
    return match ? match[1] : ''
  }

  function jobAlertSignInHref () {
    return (
      versionPrefixFromLocation() +
      '/account/sign-in/jobseeker?from=savealert&returnUrl=' +
      encodeURIComponent('/jobalerts/jobalert')
    )
  }

  function initJobAlertSignIn () {
    document.querySelectorAll('form[data-job-alert-form]').forEach(function (form) {
      form.addEventListener('submit', function (event) {
        if (document.body.getAttribute('data-user-signed-in') === 'true') {
          return
        }
        event.preventDefault()
        window.location.assign(jobAlertSignInHref())
      })
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initJobAlertSignIn)
  } else {
    initJobAlertSignIn()
  }
})()
