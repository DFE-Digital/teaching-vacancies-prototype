(function () {
  function initSaveJobSignInModal () {
    if (document.body.getAttribute('data-user-signed-in') === 'true') {
      return
    }

    var module = document.getElementById('save-job-sign-in-modal')
    if (!module || !window.ModalDialog) {
      return
    }

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
