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


  if (window.location.href.includes('search')) {

    // Select all divs with the class 'app-c-option-select'
    const optionSelectDivs = document.querySelectorAll('.app-c-option-select');

    optionSelectDivs.forEach(function(div) {
        // Select all checkboxes within this div
        const checkboxes = div.querySelectorAll('input[type="checkbox"]');

        checkboxes.forEach(function(checkbox) {
            // Add an event listener to each checkbox
                // Check if any checkbox in this specific div is checked
                const anyChecked = Array.from(checkboxes).some(c => c.checked);

                // Add or remove the 'js-opened' class based on whether any checkbox is checked
                if (anyChecked) {
                    div.classList.add('js-opened');
                } else {
                    div.classList.remove('js-opened');
                }
        });

        // Check if the div ID is 'hello'
        if (div.id === 'non-teaching') {
           // Check if the div has a specific class, e.g., 'your-class-name'
           if (div.classList.contains('js-opened')) {
              // Perform progressive disclosure
              
              $('.app-filter__options #subjects').hide();
              $('.app-filter__options #key-stage').hide();
              $('.app-filter__options #suitability').hide();

            }
        }

    });
    

    ///////

    // FILTER LOGIC PRE-SELECT


    ///////

    // Access the input element
    var input = document.getElementById('keywords');


    if (window.location.href.includes('/search/home')) {
      
      if (document.querySelector('.app-filter__selected')) {

      }else{

        // Check if the input has a value
        if (input.value.trim() !== '') {
            
          if (document.querySelector('.app-jobs__item__roles')) {
            
            var elements = document.querySelectorAll('.app-jobs__item__roles');

            // Iterate over the NodeList
            elements.forEach(function(element) {
                // Get the HTML content of the element
                var otherValue = element.innerHTML;
                
                // Select all checkboxes within the div with id 'myDiv'
                var checkboxes = document.querySelectorAll('.app-c-option-select input[type="checkbox"]');

                // Iterate over the NodeList
                checkboxes.forEach(function(checkbox) {
                    // Check if the value of the checkbox is a substring of otherValue
                    if (otherValue.includes(checkbox.value)) {
                        // If so, select the checkbox
                        checkbox.checked = true;
                    }
                });


            });
            
          }
          
        } 

        // Select the form element
        var form = document.getElementById('filter');

        // Submit the form
        form.submit();
        

      } 

    }

    
}


})
