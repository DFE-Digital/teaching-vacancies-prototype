(function () {
  var MAX_SUGGESTIONS = 12
  var TOWNS_JSON_URL = '/public/javascripts/data/england-towns.json'
  var townsLoadPromise

  function filterTowns (towns, query) {
    var q = (query || '').trim().toLowerCase()
    if (!q) {
      return []
    }
    return towns.filter(function (town) {
      return town.toLowerCase().indexOf(q) !== -1
    }).slice(0, MAX_SUGGESTIONS)
  }

  function parseInlineTowns () {
    var dataEl = document.getElementById('app-england-towns-data')
    if (!dataEl || !dataEl.textContent.trim()) {
      return []
    }
    try {
      var parsed = JSON.parse(dataEl.textContent)
      return Array.isArray(parsed) ? parsed : []
    } catch (err) {
      return []
    }
  }

  function loadTowns () {
    var towns = window.AppEnglandTowns
    if (Array.isArray(towns) && towns.length) {
      return Promise.resolve(towns)
    }

    var inline = parseInlineTowns()
    if (inline.length) {
      window.AppEnglandTowns = inline
      return Promise.resolve(inline)
    }

    if (!townsLoadPromise) {
      townsLoadPromise = fetch(TOWNS_JSON_URL, { credentials: 'same-origin' })
        .then(function (response) {
          if (!response.ok) {
            throw new Error('Could not load town data')
          }
          return response.json()
        })
        .then(function (parsed) {
          var list = Array.isArray(parsed) ? parsed : []
          window.AppEnglandTowns = list
          return list
        })
        .catch(function () {
          window.AppEnglandTowns = []
          return []
        })
    }

    return townsLoadPromise
  }

  function initTownAutocomplete (root, towns) {
    if (!root || root.getAttribute('data-town-autocomplete-initialized') === 'true') {
      return
    }
    if (!window.accessibleAutocomplete) {
      return
    }

    var mount = root.querySelector('[data-town-autocomplete-mount]') || root.querySelector('#town-autocomplete-mount')
    if (!mount) {
      return
    }

    var initialValue = root.getAttribute('data-initial-value') || ''
    var hasError = root.closest('.govuk-form-group--error') !== null

    accessibleAutocomplete({
      element: mount,
      id: 'town',
      name: 'town',
      defaultValue: initialValue,
      confirmOnBlur: true,
      autoselect: false,
      minLength: 1,
      displayMenu: 'inline',
      showNoOptionsFound: true,
      tNoResults: function () {
        return 'No towns found'
      },
      source: function (query, populate) {
        var q = (query || '').trim()
        if (!q.length) {
          populate([])
          return
        }
        populate(filterTowns(towns, query))
      }
    })

    var input = mount.querySelector('.autocomplete__input')
    if (input) {
      input.setAttribute('autocomplete', 'off')
      if (hasError) {
        input.classList.add('govuk-input--error')
      }
      if (root.closest('.app-profile-capture-form')) {
        input.classList.add('govuk-input', 'govuk-input--width-20')
      }
    }

    root.setAttribute('data-town-autocomplete-initialized', 'true')
  }

  function initAll () {
    loadTowns().then(function (towns) {
      document.querySelectorAll('[data-town-autocomplete]').forEach(function (root) {
        initTownAutocomplete(root, towns)
      })
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initAll)
  } else {
    initAll()
  }
})()
