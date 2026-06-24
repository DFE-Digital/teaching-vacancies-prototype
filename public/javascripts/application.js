/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

window.addEventListener('load', function () {
    const params = new URLSearchParams(window.location.search);
    const roleType = params.get('role-type');

    if (!roleType) return;

    setTimeout(function () {
      const radio = document.querySelector(
        `input[name="role-type"][value="${roleType}"]`
      );

      if (radio && !radio.checked) {
        radio.click();
      }
    }, 100); // 0.1 seconds
  });

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
      $('.fe-role').removeClass('active');

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


  function closeOptionSelect (optionSelect) {
    optionSelect.classList.remove('js-opened');
    optionSelect.classList.add('js-closed');

    const optionButton = optionSelect.querySelector('.app-c-option-select__button');
    if (optionButton) {
      optionButton.setAttribute('aria-expanded', 'false');
    }
  }

  function openOptionSelect (optionSelect) {
    optionSelect.classList.remove('js-closed');
    optionSelect.classList.add('js-opened');

    const optionButton = optionSelect.querySelector('.app-c-option-select__button');
    if (optionButton) {
      optionButton.setAttribute('aria-expanded', 'true');
    }
  }

  const buttons = document.querySelectorAll('.app-c-option-select__button');

  // Add a click event listener to each button
  buttons.forEach((button) => {
    button.addEventListener('click', () => {
      const parentDiv = button.closest('.app-c-option-select');
      if (!parentDiv) {
        return;
      }

      const isOpening = parentDiv.classList.contains('js-closed');

      if (isOpening) {
        openOptionSelect(parentDiv);

        if (parentDiv.classList.contains('app-c-option-select--nested')) {
          const siblingAccordions = parentDiv.parentElement.querySelectorAll('.app-c-option-select--nested');

          siblingAccordions.forEach((sibling) => {
            if (sibling !== parentDiv) {
              closeOptionSelect(sibling);
            }
          });
        }
      } else {
        closeOptionSelect(parentDiv);
      }
    });
  });


  if (window.location.href.includes('search') || window.location.href.includes('femerge')) {

    // Select all divs with the class 'app-c-option-select'
    const optionSelectDivs = document.querySelectorAll('.app-c-option-select');

    optionSelectDivs.forEach(function(div) {
        const isNested = div.classList.contains('app-c-option-select--nested');
        let checkboxes;

        if (isNested) {
          checkboxes = Array.from(div.querySelectorAll('input[type="checkbox"]'))
            .filter(checkbox => checkbox.closest('.app-c-option-select') === div);
        } else {
          checkboxes = Array.from(div.querySelectorAll('input[type="checkbox"]'));
        }

        const anyChecked = checkboxes.some(checkbox => checkbox.checked);

        if (anyChecked) {
            div.classList.add('js-opened');
            div.classList.remove('js-closed');
            const button = div.querySelector('.app-c-option-select__button');
            if (button) {
              button.setAttribute('aria-expanded', 'true');
            }
        }
    });
    

    function getFilterTagText (tagLink) {
      const clone = tagLink.cloneNode(true);
      clone.querySelectorAll('.govuk-visually-hidden').forEach(function (element) {
        element.remove();
      });
      return clone.textContent.trim();
    }

    document.querySelectorAll('.app-filter__tag').forEach(function (tagLink) {
      tagLink.addEventListener('click', function (event) {
        event.preventDefault();

        const filterText = getFilterTagText(tagLink);
        const form = document.getElementById('filter');

        if (!form || !filterText) {
          return;
        }

        let removedCheckbox = null;

        form.querySelectorAll('input[type="checkbox"]').forEach(function (checkbox) {
          const label = form.querySelector('label[for="' + checkbox.id + '"]');
          const labelText = label ? label.textContent.trim() : '';

          if (checkbox.value === filterText || labelText === filterText) {
            checkbox.checked = false;
            removedCheckbox = checkbox;
          }
        });

        if (!removedCheckbox) {
          return;
        }

        const formAction = form.getAttribute('action') || window.location.pathname;
        const params = new URLSearchParams();
        const namesWithCheckedValues = {};

        form.querySelectorAll('input[type="checkbox"]:checked').forEach(function (checkbox) {
          if (!checkbox.name) {
            return;
          }

          if (!namesWithCheckedValues[checkbox.name]) {
            namesWithCheckedValues[checkbox.name] = [];
          }

          namesWithCheckedValues[checkbox.name].push(checkbox.value);
        });

        Object.keys(namesWithCheckedValues).forEach(function (name) {
          namesWithCheckedValues[name].forEach(function (value) {
            params.append(name, value);
          });
        });

        const removedName = removedCheckbox.name;

        if (!namesWithCheckedValues[removedName] || namesWithCheckedValues[removedName].length === 0) {
          params.append(removedName, '_unchecked');
        }

        const queryString = params.toString();
        window.location.href = queryString ? formAction + '?' + queryString : formAction;
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


const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
  
  if (window.location.href.indexOf("profile/personal-details") > -1) {

    document.getElementsByClassName("govuk-skip-link")[0].focus();
    document.activeElement.blur();

  }

}

})
