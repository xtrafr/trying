import { useState, useEffect } from 'react'
import Login from '../components/analytics/Login'
import Dashboard from '../components/analytics/Dashboard'

function Analytics() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return localStorage.getItem('analytics_auth') === 'authenticated'
  })

  useEffect(() => {
    document.title = 'Xenos Analytics | Dashboard'
  }, [])

  const handleLogin = () => {
    localStorage.setItem('analytics_auth', 'authenticated')
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('analytics_auth')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return <Dashboard onLogout={handleLogout} />
}

export default Analytics

