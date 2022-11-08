/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()


  if ($("#hide-school")[0]){

      var selectEl = document.querySelector('#hide-school')
      accessibleAutocomplete.enhanceSelectElement({
        autoselect: true,
        confirmOnBlur: true,
        defaultValue: "",
        minLength: 2,
        selectElement: selectEl
      })

      var queryStringParameters = window.location.search
      var previouslySubmitted = queryStringParameters.length > 0
      if (previouslySubmitted) {
        var submittedEl = document.querySelector('.submitted')
        submittedEl.classList.remove('submitted--hidden')
        var params = new URLSearchParams(document.location.search.split('?')[1])
        document.querySelector('.submitted__hide-school').innerHTML = params.get('hide-school')
      }

  }
})
