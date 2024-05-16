/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()


  ///////

  // Job alert dynamic

  ///////


  // Select all radio buttons with the name 'myOption'
  var radios = document.querySelectorAll('input[type="radio"][name="role-type"]');

  // Function to perform an action when a radio button is clicked
  function handleRadioClick(event) {
      var theValue = event.target.value;

      $('.teaching-role').removeClass('active');
      $('.support-role').removeClass('active');

      $("." + theValue).addClass('active');
  }

  // Add a click event listener to each radio button
  radios.forEach(function(radio) {
      radio.addEventListener('click', handleRadioClick);
  });



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



// Function to get UTM parameters from the current page's URL
function getUTMParamsFromCurrentURL() {
  const url = window.location.href;
  const utmParams = getUTMParams(url);

  // Do something with the UTM parameters, for example, log them to the console
  console.log(utmParams);
}




/////////////////
// job alerts ITT
/////////////////

// Function to get UTM parameters from the current page's URL
function getUTMParamsFromCurrentURL() {
  const url = window.location.href;

  // Check if the URL contains 'jobalert_itt'
  if (url.includes('jobalert_itt')) {
      const utmParams = getUTMParams(url);

      // Update the value of the 'name' element if 'utm_name' is present
      if (utmParams.hasOwnProperty('utm_name')) {
        const nameElement = document.getElementById('email-name');
        // Update the content of the element with the value from UTM parameters
        nameElement.textContent = utmParams['utm_name'];
      } 
      if (utmParams.hasOwnProperty('utm_postcode')) {
        const nameElement = document.getElementById('jobseekers-subscription-form-location-field');
        // Update the content of the element with the value from UTM parameters
        nameElement.value = utmParams['utm_postcode'];
      } 
      if (utmParams.hasOwnProperty('utm_email')) {
        const nameElement = document.getElementById('jobseekers-subscription-form-email-field');
        // Update the content of the element with the value from UTM parameters
        nameElement.value = utmParams['utm_email'];
      } 
      // Update the value of the 'subject' element if 'utm_subject' is present
      if (utmParams.hasOwnProperty('utm_title')) {
        const subjectElement = document.getElementById('email-title');
        // Update the content of the element with the value from UTM parameters
        subjectElement.textContent = utmParams['utm_title'];
      } 
      // Update the checkbox value if 'utm_phase' is present
      if (utmParams.hasOwnProperty('utm_phase')) {
        const phaseCheckbox = document.querySelector('input[name="jobseekers_subscription_form[phases][]"][value="' + utmParams['utm_phase'] + '"]');

        // Check if the checkbox is found before updating its value
        if (phaseCheckbox) {
            // Update the value of the checkbox
            phaseCheckbox.checked = true; // or false depending on your use case
        } 
      }
      if (utmParams.hasOwnProperty('utm_subject')) {
        const phaseCheckbox = document.querySelector('input[name="jobseekers_subscription_form[subjects][]"][value="' + utmParams['utm_subject'] + '"]');

        // Check if the checkbox is found before updating its value
        if (phaseCheckbox) {
            // Update the value of the checkbox
            phaseCheckbox.checked = true; // or false depending on your use case
        }
      }
  }
}

// Function to extract UTM parameters from a URL
function getUTMParams(url) {
  const utmParams = {};
  
  // Use a regular expression to find UTM parameters in the URL
  const regex = /[?&]([^=#]+)=([^&#]*)/g;
  let match;

  while ((match = regex.exec(url)) !== null) {
      // Decode the parameter values and store them in the utmParams object
      const key = decodeURIComponent(match[1]);
      const value = decodeURIComponent(match[2]);

      // Check if the parameter starts with "utm_"
      if (key.startsWith("utm_")) {
          utmParams[key] = value;
      }
  }

  return utmParams;
}

// Attach the function to the 'load' event of the window
window.addEventListener('load', getUTMParamsFromCurrentURL);




if (window.location.href.indexOf("profile/personal-details") > -1) {

  setTimeout(function () {

    document.activeElement.blur();

    document.getElementsByClassName("govuk-template")[0].focus();

  }, 1000);

}

})
