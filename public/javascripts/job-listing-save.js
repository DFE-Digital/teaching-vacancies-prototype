// v1.2 / v1.3 — inline save on search result cards (Save → spinner → Remove).
(function () {
  var SAVE_BTN_CLASS = 'banner-button-component__button icon'

  function inlineUrl (href) {
    var url = new URL(href, window.location.origin)
    url.searchParams.set('inline', '1')
    return url.toString()
  }

  function unsaveHrefFromSave (saveHref) {
    return saveHref.replace(/\/save\/?(\?.*)?$/, '/unsave')
  }

  function fetchInline (href) {
    return window.fetch(inlineUrl(href), {
      credentials: 'same-origin',
      headers: { Accept: 'application/json' }
    }).then(function (res) {
      if (!res.ok) throw new Error('Save request failed')
      return res.json()
    })
  }

  function setSavingSpinner ($container) {
    $container.html(
      '<span class="app-jobs__save-spinner" data-saving-spinner role="status" aria-live="polite">' +
        '<span class="govuk-visually-hidden">Saving the job for later</span>' +
        '</span>'
    )
  }

  function setRemoveLink ($container, unsaveHref) {
    $container.html(
      '<a class="' +
        SAVE_BTN_CLASS +
        ' icon--saved app-jobs__item-save-control" data-unsave-job href="' +
        unsaveHref +
        '" aria-label="Remove the job from saved jobs"></a>'
    )
  }

  function setSaveLink ($container, saveHref) {
    $container.html(
      '<a class="' +
        SAVE_BTN_CLASS +
        ' icon--save app-jobs__item-save-control" data-save-job href="' +
        saveHref +
        '" aria-label="Save the job for later"></a>'
    )
  }

  function initJobListingSave () {
    if (!window.jQuery) return
    var $ = window.jQuery

    $(document).on('click', '.app-jobs__item-save [data-save-job]', function (event) {
      event.preventDefault()
      var $link = $(this)
      if ($link.attr('aria-disabled') === 'true') return

      var saveHref = $link.attr('href')
      var unsaveHref = unsaveHrefFromSave(saveHref)
      var $container = $link.closest('.app-jobs__item-save')

      setSavingSpinner($container)

      fetchInline(saveHref)
        .then(function () {
          setRemoveLink($container, unsaveHref)
        })
        .catch(function () {
          setSaveLink($container, saveHref)
        })
    })

    $(document).on('click', '.app-jobs__item-save [data-unsave-job]', function (event) {
      event.preventDefault()
      var $link = $(this)
      if ($link.attr('aria-disabled') === 'true') return

      var unsaveHref = $link.attr('href')
      var saveHref = unsaveHref.replace(/\/unsave\/?(\?.*)?$/, '/save')
      var $container = $link.closest('.app-jobs__item-save')

      $link.attr('aria-disabled', 'true')

      fetchInline(unsaveHref)
        .then(function () {
          setSaveLink($container, saveHref)
        })
        .catch(function () {
          $link.attr('aria-disabled', 'false')
        })
    })
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initJobListingSave)
  } else {
    initJobListingSave()
  }
})()
