import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'
import { AuthProvider } from './context/AuthProvider'

const umamiEnabled = import.meta.env.VITE_UMAMI_ENABLED === 'true'
const umamiScriptSrc = import.meta.env.VITE_UMAMI_SRC
const umamiWebsiteId = import.meta.env.VITE_UMAMI_WEBSITE_ID

if (umamiEnabled && umamiScriptSrc && umamiWebsiteId) {
  const existingUmamiScript = document.querySelector(
    `script[src="${umamiScriptSrc}"][data-website-id="${umamiWebsiteId}"]`,
  )

  if (!existingUmamiScript) {
    const script = document.createElement('script')
    script.defer = true
    script.src = umamiScriptSrc
    script.setAttribute('data-website-id', umamiWebsiteId)
    document.head.appendChild(script)
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)
