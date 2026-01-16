import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

// Remove initial loader and signal React mounted
const removeLoader = () => {
  window.__reactMounted = true
  const loader = document.getElementById('initial-loader')
  if (loader) {
    loader.style.opacity = '0'
    loader.style.transition = 'opacity 0.3s ease'
    setTimeout(() => loader.remove(), 300)
  }
}

// Error boundary for root-level errors
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('React Error Boundary caught:', error, errorInfo)
  }

  handleClearCache = async () => {
    try {
      if ('serviceWorker' in navigator) {
        const registrations = await navigator.serviceWorker.getRegistrations()
        await Promise.all(registrations.map(r => r.unregister()))
      }
      const cacheNames = await caches.keys()
      await Promise.all(cacheNames.map(name => caches.delete(name)))
      window.location.href = window.location.origin + '?_=' + Date.now()
    } catch (e) {
      window.location.reload(true)
    }
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          minHeight: '100vh',
          background: '#0a0e1a',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '20px',
          fontFamily: 'system-ui, sans-serif'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '400px' }}>
            <h2 style={{ color: '#06b6d4', marginBottom: '16px' }}>Something went wrong</h2>
            <p style={{ color: '#94a3b8', marginBottom: '24px', lineHeight: 1.6 }}>
              The page encountered an error. This may be due to outdated cached data.
            </p>
            <button
              onClick={this.handleClearCache}
              style={{
                background: 'linear-gradient(135deg, #06b6d4, #0891b2)',
                color: 'white',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                margin: '8px'
              }}
            >
              Clear Cache & Reload
            </button>
            <button
              onClick={() => window.location.reload(true)}
              style={{
                background: '#1e293b',
                color: 'white',
                border: 'none',
                padding: '14px 28px',
                borderRadius: '8px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                margin: '8px'
              }}
            >
              Retry
            </button>
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

try {
  const root = ReactDOM.createRoot(document.getElementById('root'))
  root.render(
    <React.StrictMode>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </React.StrictMode>
  )
  // Signal successful mount
  removeLoader()
} catch (error) {
  console.error('Failed to render React app:', error)
  // Show error in loader if React completely fails to mount
  const loader = document.getElementById('initial-loader')
  if (loader) {
    loader.innerHTML = `
      <div style="text-align: center; padding: 20px; max-width: 400px;">
        <h2 style="color: #06b6d4; margin-bottom: 16px;">Loading Failed</h2>
        <p style="color: #94a3b8; margin-bottom: 24px; line-height: 1.6;">Unable to load the application. Please try clearing your cache.</p>
        <button onclick="clearCacheReload()" style="
          background: linear-gradient(135deg, #06b6d4, #0891b2);
          color: white; border: none; padding: 14px 28px;
          border-radius: 8px; font-size: 16px; font-weight: 600;
          cursor: pointer; margin: 8px;
        ">Clear Cache & Reload</button>
      </div>
    `
  }
}
