import { useState, useEffect } from 'react'
import Login from './components/Login'
import Dashboard from './components/Dashboard'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    // Check if user is already logged in
    return localStorage.getItem('auth_token') === 'authenticated'
  })

  useEffect(() => {
    document.title = 'Xenos Analytics | Dashboard'
  }, [])

  const handleLogin = () => {
    localStorage.setItem('auth_token', 'authenticated')
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    localStorage.removeItem('auth_token')
    setIsAuthenticated(false)
  }

  if (!isAuthenticated) {
    return <Login onLogin={handleLogin} />
  }

  return <Dashboard onLogout={handleLogout} />
}

export default App

