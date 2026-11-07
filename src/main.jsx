import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

// After a deploy, a browser holding an old cached page can request code
// files that no longer exist, which leaves the page blank. Reload to pick
// up the latest version - but at most once per 10 seconds, so a file that's
// genuinely missing can't cause a reload loop.
window.addEventListener('vite:preloadError', (event) => {
  try {
    const last = Number(sessionStorage.getItem('chunk-reload-at') || 0)
    if (Date.now() - last > 10000) {
      event.preventDefault()
      sessionStorage.setItem('chunk-reload-at', String(Date.now()))
      window.location.reload()
    }
  } catch {
    // Storage unavailable (e.g. some private modes): let the error surface.
  }
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
