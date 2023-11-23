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

  $("#toggleSearch").click(function() {
    $('#search-form').toggle();
  });

  $('#sort').on('change', function (e) {
    var optionSelected = $("option:selected", this);
    var valueSelected = this.value;
    
    if (valueSelected == 'newest'){
      $('#sortform').attr('action', '/jobs');
      document.getElementById("sortform").submit();
    }else if (valueSelected == 'closing'){
      $('#sortform').attr('action', '/jobs/search/closing');
      document.getElementById("sortform").submit();
    }else{
      $('#sortform').attr('action', '/jobs/search/postcode');
      document.getElementById("sortform").submit();
    }

  });


  $("#filter-subjects legend").after('<div class="searchable-collection-component__search govuk-!-margin-bottom-2"><input aria-expanded="true" aria-label="Subject" aria-owns="subjects__listbox" class="govuk-input icon icon--left icon--search js-action" data-action="input->searchable-collection#input" data-searchable-collection-target="input" placeholder="Search" role="combobox"><div aria-live="assertive" class="govuk-visually-hidden collection-match" role="status"></div></div>');


  const buttons = document.querySelectorAll('.app-c-option-select__button');

  // Add a click event listener to each button
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      // Get the parent div of the clicked button
      const parentDiv = button.closest('.app-c-option-select');

      // Check if a certain class exists on the parent div
      if (parentDiv && parentDiv.classList.contains('js-closed')) {
        // If it exists, change the class of the parent div
        parentDiv.classList.remove('js-closed');
        parentDiv.classList.add('js-opened');
      }else if (parentDiv && parentDiv.classList.contains('js-opened')) {
        // If it exists, change the class of the parent div
        parentDiv.classList.remove('js-opened');
        parentDiv.classList.add('js-closed');
      }

      // Toggle the "aria-expanded" attribute on the button
      const currentAriaExpanded = button.getAttribute('aria-expanded');
      const newAriaExpanded = currentAriaExpanded === 'true' ? 'false' : 'true';
      button.setAttribute('aria-expanded', newAriaExpanded);

    });
  });


})
