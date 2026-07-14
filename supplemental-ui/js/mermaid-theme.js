/**
 * Re-theme Mermaid diagrams when the site light/dark mode changes.
 * Sources colors from docs-sdk Java theme (teal) + hub favicon (navy/teal).
 */
import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.esm.min.mjs'

const FONT = 'Source Sans 3, system-ui, sans-serif'

const light = {
  primaryColor: '#ccfbf1',
  primaryTextColor: '#134e4a',
  primaryBorderColor: '#0d9488',
  secondaryColor: '#dbeafe',
  secondaryTextColor: '#1e3a5f',
  secondaryBorderColor: '#1e3a5f',
  tertiaryColor: '#fef3c7',
  tertiaryTextColor: '#92400e',
  tertiaryBorderColor: '#e18114',
  lineColor: '#475569',
  textColor: '#0f172a',
  mainBkg: '#ccfbf1',
  nodeBorder: '#0d9488',
  clusterBkg: '#f1f5f9',
  clusterBorder: '#94a3b8',
  titleColor: '#0f172a',
  edgeLabelBackground: '#ffffff',
  actorBkg: '#dbeafe',
  actorBorder: '#1e3a5f',
  actorTextColor: '#1e3a5f',
  actorLineColor: '#475569',
  signalColor: '#475569',
  signalTextColor: '#0f172a',
  labelBoxBkgColor: '#dbeafe',
  labelBoxBorderColor: '#1e3a5f',
  labelTextColor: '#1e3a5f',
  loopTextColor: '#0f172a',
  noteBkgColor: '#e8f1fc',
  noteTextColor: '#0f172a',
  noteBorderColor: '#217ee7',
  activationBkgColor: '#99f6e4',
  activationBorderColor: '#0d9488',
  sequenceNumberColor: '#ffffff',
  fontFamily: FONT,
}

const night = {
  primaryColor: '#134e4a',
  primaryTextColor: '#ccfbf1',
  primaryBorderColor: '#5eead4',
  secondaryColor: '#1e3a5f',
  secondaryTextColor: '#dbeafe',
  secondaryBorderColor: '#74c0fc',
  tertiaryColor: '#78350f',
  tertiaryTextColor: '#fde68a',
  tertiaryBorderColor: '#ffa726',
  lineColor: '#909296',
  textColor: '#f1f3f5',
  mainBkg: '#134e4a',
  nodeBorder: '#5eead4',
  clusterBkg: '#1f2125',
  clusterBorder: '#373a40',
  titleColor: '#f1f3f5',
  edgeLabelBackground: '#25262b',
  actorBkg: '#1e3a5f',
  actorBorder: '#74c0fc',
  actorTextColor: '#dbeafe',
  actorLineColor: '#909296',
  signalColor: '#909296',
  signalTextColor: '#f1f3f5',
  labelBoxBkgColor: '#1e3a5f',
  labelBoxBorderColor: '#74c0fc',
  labelTextColor: '#dbeafe',
  loopTextColor: '#f1f3f5',
  noteBkgColor: '#1a1a2a',
  noteTextColor: '#dbeafe',
  noteBorderColor: '#4dabf7',
  activationBkgColor: '#0f766e',
  activationBorderColor: '#5eead4',
  sequenceNumberColor: '#0f172a',
  fontFamily: FONT,
}

function isDark () {
  return document.documentElement.classList.contains('dark-theme')
}

function captureSources (nodes) {
  return nodes.map((node) => {
    if (node.dataset.mermaidSource) return node.dataset.mermaidSource
    // Prefer text before first SVG (post-render) or full textContent (pre-render).
    const svg = node.querySelector('svg')
    if (svg) {
      const clone = node.cloneNode(true)
      clone.querySelectorAll('svg').forEach((el) => el.remove())
      return clone.textContent.trim()
    }
    return node.textContent.trim()
  })
}

async function paint () {
  const nodes = [...document.querySelectorAll('.mermaid')]
  if (!nodes.length) return

  const sources = captureSources(nodes)
  nodes.forEach((node, i) => {
    if (sources[i]) node.dataset.mermaidSource = sources[i]
    node.removeAttribute('data-processed')
    node.textContent = sources[i] || ''
  })

  mermaid.initialize({
    startOnLoad: false,
    securityLevel: 'loose',
    theme: 'base',
    themeVariables: isDark() ? night : light,
  })

  try {
    await mermaid.run({ nodes })
  } catch (err) {
    console.error('Mermaid theme paint failed', err)
  }
}

let queued = false
function schedulePaint () {
  if (queued) return
  queued = true
  requestAnimationFrame(() => {
    queued = false
    paint()
  })
}

const observer = new MutationObserver((mutations) => {
  for (const m of mutations) {
    if (m.attributeName === 'class') {
      schedulePaint()
      break
    }
  }
})
observer.observe(document.documentElement, { attributes: true, attributeFilter: ['class'] })

// Initial paint is handled by @sntke/antora-mermaid-extension; only re-run on theme toggle.
