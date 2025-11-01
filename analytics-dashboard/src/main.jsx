import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

const rootElement = document.getElementById('root')

if (!rootElement) {
  throw new Error('Root element not found')
}

try {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>,
  )
} catch (error) {
  console.error('Failed to render app:', error)
  rootElement.innerHTML = `
    <div style="display: flex; align-items: center; justify-content: center; min-height: 100vh; background: #0a0e1a; color: white; font-family: system-ui, sans-serif; padding: 20px; text-align: center;">
      <div>
        <h1 style="color: #06b6d4; margin-bottom: 1rem;">Error Loading Dashboard</h1>
        <p>There was an error loading the application. Please refresh the page.</p>
      </div>
    </div>
  `
}

