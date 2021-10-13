/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})

// Add an alert if you click on a link with a hash
$('a[href=#]').on('click', function (event) {
  if(this.pathname === window.location.pathname){
    
    var message ='Sorry, this hasn’t been built yet';
    alert(message);

  }
});

// Powers the select all checkbox thingo
// Found here: https://jsfiddle.net/52uny55w/

var selectAllCheckboxes = $("#job-applicationsToShare, #job-applicationsToDownload, #job-applicationsNames")

selectAllCheckboxes.click(function () {
  $(".govuk-checkboxes__input").prop('checked', $(this).prop('checked'));
});

$(".govuk-checkboxes__input").change(function(){
  if (!$(this).prop("checked")){
    selectAllCheckboxes.prop("checked",false);
  }
});

// Toggles open/closed the filters on search results page
// Are we on the search results page?
if (document.querySelector('.app-search-results') !== null) {
  
  const showFilterButton = document.querySelector('.js-show-filter')
  const showFilterButtonLabel = document.querySelector('.js-show-filter__label')
  const filterPanel = document.querySelector('.app-filter')
  const closeFilterButton = document.querySelector('.app-filter__close')
  
  // Open the filter set up
  function openFilter() {
    // Show panel
    filterPanel.classList.add('js-isOpen');
    // Change button label
    showFilterButtonLabel.innerHTML = 'Close filters';
    // Shift the focus to the filter container
    filterPanel.focus();
    // set aria attributes
    filterPanel.setAttribute('aria-hidden', 'false');
    showFilterButton.setAttribute('aria-expanded', 'true');
  }

  // Close the filter set up
  function closeFilter() {
    // Hide panel
    filterPanel.classList.remove('js-isOpen');
    // Change button label
    showFilterButtonLabel.innerHTML = 'Open filters';
    // Shift the focus back to where the user was originally
    showFilterButton.focus();
    // set aria attributes
    filterPanel.setAttribute('aria-hidden', 'true');
    showFilterButton.setAttribute('aria-expanded', 'false');
  }

  // set up aria attribtues if under 750px
  const mediaQuery = '(max-width: 750px)';
  const mediaQueryList = window.matchMedia(mediaQuery);

  mediaQueryList.addEventListener('change', event => {
    console.log(window.innerWidth);
    if (event.matches) {
      // under 750px
      filterPanel.setAttribute('aria-hidden', 'true');
      showFilterButton.setAttribute('aria-expanded', 'false');
    } else {
      // over 750px
      filterPanel.removeAttribute('aria-hidden', 'true')
    }
  })

  // Open and close filter on click
  showFilterButton.onclick = () => {
    // first check if open
    if (filterPanel.classList.contains('js-isOpen')) {
      closeFilter();
    } else {
      openFilter();
    }
  }

  closeFilterButton.onclick = () => {
    closeFilter();
  }

  document.onkeydown = function(evt) {
      evt = evt || window.event;
      var isEscape = false;
      if ("key" in evt) {
          isEscape = (evt.key === "Escape" || evt.key === "Esc");
      } else {
          isEscape = (evt.keyCode === 27);
      }
      // if escape key and filter is open
      if ( (isEscape) && (filterPanel.classList.contains('js-isOpen')) ) { {
        closeFilter();
      }
    }
  }

}
