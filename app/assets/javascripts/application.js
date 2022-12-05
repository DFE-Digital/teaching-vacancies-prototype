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



  $( "#data-form" ).submit(function( event ) {

    if (window.location.href.indexOf("profile") > -1) {
      //it is in profile work


      if (!$("input").is(':checked')) {

        event.preventDefault();
        
        //error
        $('.govuk-error-summary').show();
        $('.govuk-form-group').addClass('govuk-form-group--error');

        //create error message
        var theMessage = $('.govuk-error-summary__list li a').html();

        //check if hint is present else after legend
        if ($(".govuk-error-message")[0]){

        }
        else if ($(".govuk-hint")[0]){
          $("#hint").after('<span id="error" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span>' + theMessage + '</span>');

          var numItems = $('.govuk-label').length
          if (numItems > 1){
          }else{
            $(".govuk-input").addClass('govuk-input--error');
          }

        }else if ($(".govuk-label")[0]){
          var numItems = $('.govuk-label').length

          if (numItems > 1){
            $(".govuk-fieldset__legend").after('<span id="error" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span>' + theMessage + '</span>');
          }else{
            $(".govuk-label").after('<span id="error" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span>' + theMessage + '</span>');
            $(".govuk-input").addClass('govuk-input--error');
          }
        }
        else{
          $(".govuk-fieldset__legend").after('<span id="error" class="govuk-error-message"><span class="govuk-visually-hidden">Error:</span>' + theMessage + '</span>');
        }

        $(window).scrollTop(0);
        document.getElementById('govuk-error-summary').focus();

      }
      else {


      }

    }


  });




})
