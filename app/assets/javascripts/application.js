/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()



  if ($(".schoolSelecter")[0]){

      var selectEl = document.querySelector('.schoolSelecter')
      accessibleAutocomplete.enhanceSelectElement({
        autoselect: true,
        confirmOnBlur: true,
        defaultValue: "",
        minLength: 3,
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

  if (window.location.href.indexOf("search") > -1) {
   
    var el = document.getElementsByTagName("*");
    var cnt = 0;
    for (var i = 0; i < el.length; i++) {
        if (el[i].className == 'app-jobs__item') cnt++;
    }

    $('#job-count').html(cnt);

    if(cnt == 0){
      $('#try-another-search').show();
    }

  }


})
