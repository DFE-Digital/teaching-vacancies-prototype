// Show/hide behaviour for the numbered step-by-step navigation (app-step-nav).
// Builds the same markup as the GOV.UK step-by-step component (chevron icons + "Show"/"Hide" labels).
(function () {
  'use strict'

  document.querySelectorAll('[data-module="app-guide-step-nav"]').forEach(function (nav) {
    var showText = nav.getAttribute('data-show-text') || 'Show'
    var hideText = nav.getAttribute('data-hide-text') || 'Hide'
    var showAllText = nav.getAttribute('data-show-all-text') || 'Show all steps'
    var hideAllText = nav.getAttribute('data-hide-all-text') || 'Hide all steps'
    var steps = Array.prototype.slice.call(nav.querySelectorAll('.js-step'))

    nav.classList.add('app-step-nav--active')

    function setShown (step, shown) {
      var panel = step.querySelector('.js-panel')
      var button = step.querySelector('.js-step-title-button')
      step.classList.toggle('step-is-shown', shown)
      panel.classList.toggle('js-hidden', !shown)
      button.setAttribute('aria-expanded', shown ? 'true' : 'false')
      step.querySelector('.js-toggle-link-icon').classList.toggle('app-step-nav__chevron--down', !shown)
      step.querySelector('.js-toggle-link-text').textContent = shown ? hideText : showText
    }

    function allShown () {
      return steps.every(function (s) { return s.classList.contains('step-is-shown') })
    }

    // Show/hide all control
    var controls = document.createElement('div')
    controls.className = 'app-step-nav__controls'
    var allButton = document.createElement('button')
    allButton.type = 'button'
    allButton.className = 'app-step-nav__button app-step-nav__button--controls js-step-controls-button'
    allButton.setAttribute('aria-expanded', 'false')
    allButton.innerHTML =
      '<span class="app-step-nav__chevron app-step-nav__chevron--down js-step-controls-button-icon"></span>' +
      '<span class="app-step-nav__button-text app-step-nav__button-text--all js-step-controls-button-text"></span>'
    controls.appendChild(allButton)
    nav.insertBefore(controls, nav.firstChild)

    var allIcon = allButton.querySelector('.js-step-controls-button-icon')
    var allLabel = allButton.querySelector('.js-step-controls-button-text')

    function syncAllButton () {
      var shown = allShown()
      allLabel.textContent = shown ? hideAllText : showAllText
      allIcon.classList.toggle('app-step-nav__chevron--down', !shown)
      allButton.setAttribute('aria-expanded', shown ? 'true' : 'false')
    }
    syncAllButton()

    // Turn each step title into a toggle button
    steps.forEach(function (step) {
      var title = step.querySelector('.js-step-title')
      var panel = step.querySelector('.js-panel')
      var header = step.querySelector('.js-toggle-panel')

      var button = document.createElement('button')
      button.type = 'button'
      button.className = 'app-step-nav__button app-step-nav__button--title js-step-title-button'
      button.setAttribute('aria-controls', panel.id)

      var titleFocus = document.createElement('span')
      titleFocus.className = 'app-step-nav__title-text-focus'
      var titleText = document.createElement('span')
      titleText.className = 'app-step-nav__title-text js-step-title-text'
      while (title.firstChild) titleText.appendChild(title.firstChild)
      titleFocus.appendChild(titleText)
      titleFocus.insertAdjacentHTML('beforeend', '<span class="govuk-visually-hidden">, </span>')
      button.appendChild(titleFocus)

      // Brief summary of the step, shown between the title and the Show/Hide toggle
      var summary = step.querySelector('.js-step-summary')
      if (summary) button.appendChild(summary)

      button.insertAdjacentHTML('beforeend',
        '<span class="app-step-nav__toggle-link js-toggle-link">' +
          '<span class="app-step-nav__toggle-link-focus">' +
            '<span class="app-step-nav__chevron app-step-nav__chevron--down js-toggle-link-icon"></span>' +
            '<span class="app-step-nav__button-text js-toggle-link-text"></span>' +
          '</span>' +
          '<span class="govuk-visually-hidden"> this section</span>' +
        '</span>')
      title.appendChild(button)

      setShown(step, false)

      header.addEventListener('click', function (event) {
        if (event.target.closest('a')) return
        setShown(step, !step.classList.contains('step-is-shown'))
        syncAllButton()
      })
    })

    allButton.addEventListener('click', function () {
      var shouldShow = !allShown()
      steps.forEach(function (step) { setShown(step, shouldShow) })
      syncAllButton()
    })
  })
})()
