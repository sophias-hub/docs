/**
 * Click-to-zoom lightbox for Mermaid diagrams (pan + scroll zoom).
 */
const OVERLAY_CLASS = 'mermaid-zoom-overlay'

function closeOverlay () {
  const overlay = document.querySelector(`.${OVERLAY_CLASS}`)
  if (!overlay) return
  overlay.remove()
  document.documentElement.classList.remove('is-clipped--mermaid-zoom')
}

function sizeClone (svg, clone) {
  const vb = svg.viewBox && svg.viewBox.baseVal
  const rect = svg.getBoundingClientRect()
  const width = (vb && vb.width) || rect.width || svg.clientWidth || 800
  const height = (vb && vb.height) || rect.height || svg.clientHeight || 450

  clone.setAttribute('width', String(width))
  clone.setAttribute('height', String(height))
  if (vb && vb.width && vb.height) {
    clone.setAttribute('viewBox', `${vb.x} ${vb.y} ${vb.width} ${vb.height}`)
  }
  clone.removeAttribute('style')
  clone.style.maxWidth = 'min(90vw, 72rem)'
  clone.style.maxHeight = '80vh'
  clone.style.width = 'auto'
  clone.style.height = 'auto'
  clone.classList.add('mermaid-zoom-svg')
}

function openOverlay (diagram) {
  closeOverlay()

  const svg = diagram.querySelector('svg')
  if (!svg) return

  const overlay = document.createElement('div')
  overlay.className = OVERLAY_CLASS
  overlay.setAttribute('role', 'dialog')
  overlay.setAttribute('aria-modal', 'true')
  overlay.setAttribute('aria-label', 'Zoomed diagram')

  const stage = document.createElement('div')
  stage.className = 'mermaid-zoom-stage'

  const clone = svg.cloneNode(true)
  sizeClone(svg, clone)
  stage.appendChild(clone)

  const hint = document.createElement('p')
  hint.className = 'mermaid-zoom-hint'
  hint.textContent = 'Scroll to zoom. Drag to pan. Esc or click outside to close.'

  const closeBtn = document.createElement('button')
  closeBtn.type = 'button'
  closeBtn.className = 'mermaid-zoom-close'
  closeBtn.setAttribute('aria-label', 'Close zoomed diagram')
  closeBtn.textContent = 'Close'

  overlay.appendChild(hint)
  overlay.appendChild(closeBtn)
  overlay.appendChild(stage)
  document.body.appendChild(overlay)
  document.documentElement.classList.add('is-clipped--mermaid-zoom')

  let scale = 1
  let x = 0
  let y = 0
  let dragging = false
  let lastX = 0
  let lastY = 0

  function applyTransform () {
    stage.style.transform = `translate(${x}px, ${y}px) scale(${scale})`
  }

  overlay.addEventListener('wheel', (event) => {
    event.preventDefault()
    const next = Math.min(5, Math.max(0.5, scale * (event.deltaY > 0 ? 0.9 : 1.1)))
    if (next === scale) return
    scale = next
    applyTransform()
  }, { passive: false })

  stage.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return
    dragging = true
    lastX = event.clientX
    lastY = event.clientY
    stage.setPointerCapture(event.pointerId)
    stage.classList.add('is-dragging')
  })

  stage.addEventListener('pointermove', (event) => {
    if (!dragging) return
    x += event.clientX - lastX
    y += event.clientY - lastY
    lastX = event.clientX
    lastY = event.clientY
    applyTransform()
  })

  function endDrag (event) {
    if (!dragging) return
    dragging = false
    stage.classList.remove('is-dragging')
    if (stage.hasPointerCapture(event.pointerId)) {
      stage.releasePointerCapture(event.pointerId)
    }
  }

  stage.addEventListener('pointerup', endDrag)
  stage.addEventListener('pointercancel', endDrag)

  stage.addEventListener('dblclick', (event) => {
    event.stopPropagation()
    scale = 1
    x = 0
    y = 0
    applyTransform()
  })

  closeBtn.addEventListener('click', (event) => {
    event.stopPropagation()
    closeOverlay()
  })
  overlay.addEventListener('click', (event) => {
    if (event.target === overlay) closeOverlay()
  })

  closeBtn.focus()
}

function markZoomable (diagram) {
  if (!diagram.querySelector('svg')) return
  diagram.classList.add('mermaid-zoomable')
  if (!diagram.hasAttribute('tabindex')) diagram.setAttribute('tabindex', '0')
  if (!diagram.getAttribute('role')) diagram.setAttribute('role', 'button')
  if (!diagram.getAttribute('aria-label')) diagram.setAttribute('aria-label', 'Zoom diagram')
}

function refreshZoomable () {
  document.querySelectorAll('.doc .mermaid').forEach(markZoomable)
}

document.addEventListener('click', (event) => {
  if (event.target.closest(`.${OVERLAY_CLASS}`)) return
  const diagram = event.target.closest('.doc .mermaid')
  if (!diagram || !diagram.querySelector('svg')) return
  event.preventDefault()
  openOverlay(diagram)
})

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeOverlay()
    return
  }
  if (event.key !== 'Enter' && event.key !== ' ') return
  const diagram = event.target.closest?.('.doc .mermaid')
  if (!diagram || !diagram.querySelector('svg')) return
  event.preventDefault()
  openOverlay(diagram)
})

document.addEventListener('mermaid:painted', refreshZoomable)

const observer = new MutationObserver(() => {
  refreshZoomable()
})
observer.observe(document.body, { childList: true, subtree: true })

refreshZoomable()
