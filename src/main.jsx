import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { registerSW } from 'virtual:pwa-register'
import './index.css'
import App from './app.jsx'

const updateSW = registerSW({
  onNeedRefresh() {
    // called when new content is available
    // we maybe loading screen on this
    if (confirm("New version available. Reload?")) {
      updateSW(true) // activates new service worker + reloads
    }
  },
  onOfflineReady() {
    console.log("App ready to work offline")
  },
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
