/* global $ */

// Warn about using the kit in production
if (window.console && window.console.info) {
  window.console.info('GOV.UK Prototype Kit - do not use for production')
}

$(document).ready(function () {
  window.GOVUKFrontend.initAll()
})

// Open and close filter panel on mobile
const showFilterButton = document.querySelector('.js-show-filter')
const showFilterButtonLabel = document.querySelector('.js-show-filter__label')
const filterPanel = document.querySelector('.app-filter')
const closeFilterButton = document.querySelector('.app-filter__close')

showFilterButton.onclick = () => {
  filterPanel.classList.add('js-isOpen');
  // Change button label
  showFilterButtonLabel.innerHTML = 'Close filters';
  // shift the focus to the filter container
  filterPanel.focus();
}

closeFilterButton.onclick = () => {
  filterPanel.classList.remove('js-isOpen');
  // Change button label
  showFilterButtonLabel.innerHTML = 'Open filters';
  // shift the focus back to where the user was originally
  showFilterButton.focus();
}
