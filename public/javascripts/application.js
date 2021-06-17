/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})

// Are we on the search results page?
if (document.querySelector('.app-search-results') !== null) {
  console.log("Search results page")
  
  const showFilterButton = document.querySelector('.js-show-filter')
  const showFilterButtonLabel = document.querySelector('.js-show-filter__label')
  const filterPanel = document.querySelector('.app-filter')
  const closeFilterButton = document.querySelector('.app-filter__close')
  
  // Open the filter
  showFilterButton.onclick = () => {
    filterPanel.classList.add('js-isOpen');
    // Change button label
    showFilterButtonLabel.innerHTML = 'Close filters';
    // Shift the focus to the filter container
    filterPanel.focus();
  }
  
  // Close the filter
  closeFilterButton.onclick = () => {
    filterPanel.classList.remove('js-isOpen');
    // Change button label
    showFilterButtonLabel.innerHTML = 'Open filters';
    // Shift the focus back to where the user was originally
    showFilterButton.focus();
  }
}



