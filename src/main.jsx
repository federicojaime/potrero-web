// src/main.jsx - DEBE SER EXACTAMENTE ASÍ
import { StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import './i18n' // ← ESTA LÍNEA ES CRUCIAL

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Suspense fallback={<div>Cargando traducciones...</div>}>
      <App />
    </Suspense>
  </StrictMode>,
)