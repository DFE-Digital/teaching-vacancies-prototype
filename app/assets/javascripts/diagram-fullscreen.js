window.AppFrontend = window.AppFrontend || {}

window.AppFrontend.diagramFullscreen = function () {
  const overlay = document.querySelector('[data-module="app-diagram-fullscreen"]')
  if (!overlay) {
    return
  }

  const stage = overlay.querySelector('.app-diagram-fullscreen__stage')
  const closeButton = overlay.querySelector('.app-diagram-fullscreen__close')
  let returnFocus = null
  const expandIcon = '<svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true" focusable="false"><path fill="currentColor" d="M4 9V4h5v2H6v3H4zm10-5h5v5h-2V6h-3V4zM4 15h2v3h3v2H4v-5zm14 3v-3h2v5h-5v-2h3z"/></svg>'

  function closeDiagram () {
    if (overlay.hidden) {
      return
    }

    stage.replaceChildren()
    overlay.hidden = true
    document.body.style.overflow = ''

    if (returnFocus) {
      returnFocus.focus()
    }
  }

  function openDiagram (frame, button) {
    const source = frame.querySelector('svg.flowchart')
    if (!source) {
      return
    }

    closeDiagram()
    const chart = source.cloneNode(true)
    chart.removeAttribute('style')
    chart.classList.add('app-diagram-fullscreen__chart')
    stage.replaceChildren(chart)
    overlay.hidden = false
    document.body.style.overflow = 'hidden'
    returnFocus = button
    closeButton.focus()
  }

  function widenClusterRects (diagrams) {
    diagrams.forEach(function (diagram) {
      const minWidth = parseInt(diagram.getAttribute('data-cluster-min-width'), 10)
      if (!minWidth) {
        return
      }

      const svg = diagram.querySelector('svg')
      if (!svg) {
        return
      }

      let requiredWidth = 0

      const clusters = svg.querySelectorAll('g.cluster').length
        ? svg.querySelectorAll('g.cluster')
        : svg.querySelectorAll('g[id$="-header"], g[id$="-serviceNav"]')

      clusters.forEach(function (cluster) {
        const rect = cluster.querySelector(':scope > rect')
        if (!rect) {
          return
        }

        const x = parseFloat(rect.getAttribute('x')) || 0
        const width = parseFloat(rect.getAttribute('width')) || 0
        if (width < minWidth) {
          rect.setAttribute('width', minWidth)
        }

        requiredWidth = Math.max(requiredWidth, x + Math.max(width, minWidth))
      })

      if (!requiredWidth) {
        return
      }

      const padding = 16
      const targetWidth = requiredWidth + padding
      const viewBox = svg.getAttribute('viewBox')

      if (viewBox) {
        const parts = viewBox.trim().split(/\s+/).map(Number)
        if (parts.length === 4 && parts[2] < targetWidth) {
          parts[2] = targetWidth
          svg.setAttribute('viewBox', parts.join(' '))
        }
      }

      const svgWidth = parseFloat(svg.getAttribute('width'))
      if (svgWidth && svgWidth < targetWidth) {
        svg.setAttribute('width', targetWidth)
      }

      const styleWidth = parseFloat(svg.style.width)
      if (styleWidth && styleWidth < targetWidth) {
        svg.style.width = targetWidth + 'px'
      }
    })
  }

  function alignIaTreeClusterWidths (diagrams) {
    diagrams.forEach(function (diagram) {
      if (!diagram.classList.contains('app-documentation-ia-tree__diagram')) {
        return
      }

      const svg = diagram.querySelector('svg')
      if (!svg) {
        return
      }

      const minWidth = parseInt(diagram.getAttribute('data-cluster-min-width'), 10) || 0
      const clusters = Array.from(svg.querySelectorAll('g.cluster')).filter(function (cluster) {
        return !cluster.parentElement.closest('g.cluster')
      })

      if (!clusters.length) {
        return
      }

      let minX = Infinity
      let maxX = -Infinity

      clusters.forEach(function (cluster) {
        const rect = cluster.querySelector(':scope > rect')
        if (!rect) {
          return
        }

        const x = parseFloat(rect.getAttribute('x')) || 0
        const width = parseFloat(rect.getAttribute('width')) || 0
        minX = Math.min(minX, x)
        maxX = Math.max(maxX, x + width)
      })

      if (!Number.isFinite(minX)) {
        return
      }

      let targetWidth = maxX - minX
      if (minWidth > targetWidth) {
        targetWidth = minWidth
      }

      clusters.forEach(function (cluster) {
        const rect = cluster.querySelector(':scope > rect')
        if (!rect) {
          return
        }

        rect.setAttribute('x', minX)
        rect.setAttribute('width', targetWidth)
      })
    })
  }

  function widenClippedLabels (diagrams) {
    const updates = []

    diagrams.forEach(function (diagram) {
      diagram.querySelectorAll('.node').forEach(function (node) {
        const foreignObject = node.querySelector('foreignObject')
        const label = foreignObject && foreignObject.querySelector('div')
        const box = node.querySelector('rect, polygon')
        if (!foreignObject || !label || !box || !box.getAttribute('width')) {
          return
        }

        const needed = label.scrollWidth + 8
        const current = parseFloat(foreignObject.getAttribute('width')) || 0
        if (needed <= current + 1) {
          return
        }

        updates.push({ foreignObject, box, needed, current })
      })
    })

    updates.forEach(function (update) {
      const growth = update.needed - update.current
      update.foreignObject.setAttribute('width', update.needed)
      update.box.setAttribute('width', (parseFloat(update.box.getAttribute('width')) || 0) + growth)
    })
  }

  function addExpandButtons (diagrams) {
    diagrams.forEach(function (diagram) {
      const frame = document.createElement('div')
      frame.className = 'app-diagram'
      diagram.parentNode.insertBefore(frame, diagram)
      frame.appendChild(diagram)

      const button = document.createElement('button')
      button.type = 'button'
      button.className = 'app-diagram__expand'
      button.setAttribute('aria-label', 'View diagram full screen')
      button.innerHTML = expandIcon
      frame.insertBefore(button, diagram)
      button.addEventListener('click', function () {
        openDiagram(frame, button)
      })
    })
  }

  closeButton.addEventListener('click', closeDiagram)
  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      closeDiagram()
    }
  })

  const diagrams = Array.from(document.querySelectorAll('pre.mermaid'))
  widenClusterRects(diagrams)
  alignIaTreeClusterWidths(diagrams)
  widenClippedLabels(diagrams)
  addExpandButtons(diagrams)
}
