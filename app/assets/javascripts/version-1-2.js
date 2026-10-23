// Version 1.2 — job search sort (submitted on same results page when data-sort-stay is set).
$(function () {
  $('#sort').on('change', function () {
    if (this.form && this.form.getAttribute('data-sort-stay') === 'true') {
      this.form.submit()
      return
    }

    var sortform = document.getElementById('sortform')
    if (!sortform) {
      var url = new URL(window.location.href)
      url.searchParams.set('sort', this.value)
      window.location.assign(url.toString())
    }
  })
})
