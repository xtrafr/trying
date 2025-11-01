import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Analytics from './pages/Analytics'
import ErrorBoundary from './components/ErrorBoundary'

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/analyticsadmin" element={<Analytics />} />
        </Routes>
      </BrowserRouter>
    </ErrorBoundary>
  )
}

export default App
