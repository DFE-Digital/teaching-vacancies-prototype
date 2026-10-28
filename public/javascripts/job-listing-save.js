// v1.2 / v1.3 — inline save on search result cards (Job saved → Remove from saved jobs).
(function () {
  var SAVE_BTN_CLASS =
    'banner-button-component__button govuk-body govuk-!-font-weight-bold govuk-!-margin-bottom-0 icon icon--left'

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

  function setSavedLabel ($container) {
    $container.html(
      '<span class="' +
        SAVE_BTN_CLASS +
        ' icon--saved" data-saved-label aria-live="polite">Job saved</span>'
    )
  }

  function setRemoveLink ($container, unsaveHref) {
    $container.html(
      '<a class="' +
        SAVE_BTN_CLASS +
        ' icon--saved" data-unsave-job href="' +
        unsaveHref +
        '">Remove from saved jobs</a>'
    )
  }

  function setSaveLink ($container, saveHref) {
    $container.html(
      '<a class="' +
        SAVE_BTN_CLASS +
        ' icon--save" data-save-job href="' +
        saveHref +
        '">Save this job for later</a>'
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

      $link.attr('aria-disabled', 'true')

      fetchInline(saveHref)
        .then(function () {
          setSavedLabel($container)
          window.setTimeout(function () {
            setRemoveLink($container, unsaveHref)
          }, 2000)
        })
        .catch(function () {
          $link.attr('aria-disabled', 'false')
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
