(function () {
  function versionPrefixFromLocation () {
    var match = window.location.pathname.match(/^(\/1-[0-3])(?=\/)/)
    return match ? match[1] : ''
  }

  function returnUrlFromLocation () {
    var path = window.location.pathname.replace(/^\/1-[0-3](?=\/)/, '') || '/'
    return path + window.location.search
  }

  function hrefWithReturnUrl (basePath) {
    return versionPrefixFromLocation() + basePath + '?returnUrl=' + encodeURIComponent(returnUrlFromLocation())
  }

  function applyReturnUrlsToModalLinks (module) {
    module.querySelectorAll('[data-save-job-sign-in-link="continue"]').forEach(function (link) {
      link.setAttribute('href', hrefWithReturnUrl('/account/sign-in/jobseeker'))
    })
  }

  function initSaveJobSignInModal () {
    if (document.body.getAttribute('data-user-signed-in') === 'true') {
      return
    }

    var module = document.getElementById('save-job-sign-in-modal')
    if (!module || !window.ModalDialog) {
      return
    }

    applyReturnUrlsToModalLinks(module)

    var focusElement = module.querySelector('#save-job-sign-in-modal-title')
    window.AppSaveJobSignInModal = new window.ModalDialog(module).init({
      focusElement: focusElement
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSaveJobSignInModal)
  } else {
    initSaveJobSignInModal()
  }
})()
