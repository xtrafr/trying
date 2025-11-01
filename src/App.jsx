import { useEffect, lazy, Suspense, Component } from 'react'
import Lenis from 'lenis'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import SmoothCursor from './components/SmoothCursor'
import TabTitleAnimator from './components/TabTitleAnimator'

// Error Boundary Component
class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false, error: null }
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error }
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="flex items-center justify-center min-h-screen bg-dark text-white p-4">
          <div className="text-center max-w-md">
            <h1 className="text-2xl font-bold text-primary mb-4">Something went wrong</h1>
            <p className="text-gray-400 mb-4">Please refresh the page to try again.</p>
            <button
              onClick={() => window.location.reload()}
              className="px-6 py-3 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg transition-colors"
            >
              Refresh Page
            </button>
            {process.env.NODE_ENV === 'development' && (
              <details className="mt-4 text-left text-sm text-gray-500">
                <summary className="cursor-pointer mb-2">Error details</summary>
                <pre className="bg-dark-lighter p-4 rounded overflow-auto">{this.state.error?.toString()}</pre>
              </details>
            )}
          </div>
        </div>
      )
    }

    return this.props.children
  }
}

// Lazy load components below the fold for faster initial load with error handling
const lazyWithRetry = (componentImport) => {
  return lazy(async () => {
    try {
      return await componentImport()
    } catch (error) {
      console.error('Failed to load component:', error)
      // Return a fallback component
      return {
        default: () => (
          <div className="flex items-center justify-center py-20">
            <div className="text-center">
              <p className="text-gray-400 mb-4">Failed to load component</p>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-primary text-white rounded-lg"
              >
                Retry
              </button>
            </div>
          </div>
        )
      }
    }
  })
}

const Products = lazyWithRetry(() => import('./components/Products'))
const Features = lazyWithRetry(() => import('./components/Features'))
const MediaPlan = lazyWithRetry(() => import('./components/MediaPlan'))
const ResellingPlan = lazyWithRetry(() => import('./components/ResellingPlan'))
const FreeKeys = lazyWithRetry(() => import('./components/FreeKeys'))
const PaymentMethods = lazyWithRetry(() => import('./components/PaymentMethods'))
const Contact = lazyWithRetry(() => import('./components/Contact'))
const Footer = lazyWithRetry(() => import('./components/Footer'))

const reportWebVitals = () => {
  if ('web-vital' in window) {
    const vitals = window['web-vital']
    if (window.va) {
      window.va('pageview', { path: window.location.pathname })
    }
  }
}

function App() {
  useEffect(() => {
    document.title = 'xenos.lol'
  }, [])

  useEffect(() => {
    try {
      const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) {
        reportWebVitals()
        return
      }

      // Only initialize Lenis if available
      if (typeof Lenis !== 'undefined' && Lenis) {
        const lenis = new Lenis({
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
          direction: 'vertical',
          smooth: true,
          smoothTouch: false,
          wheelMultiplier: 1,
          touchMultiplier: 2,
          infinite: false,
        })

        // Add lenis class to html element
        if (document.documentElement) {
          document.documentElement.classList.add('lenis', 'lenis-smooth')
        }

        window.lenis = lenis

        let rafId = null
        const raf = (time) => {
          try {
            lenis.raf(time)
            rafId = requestAnimationFrame(raf)
          } catch (error) {
            console.error('Lenis RAF error:', error)
            if (rafId) cancelAnimationFrame(rafId)
          }
        }

        rafId = requestAnimationFrame(raf)

        reportWebVitals()

        return () => {
          try {
            if (lenis && typeof lenis.destroy === 'function') {
              lenis.destroy()
            }
            if (rafId) cancelAnimationFrame(rafId)
            if (document.documentElement) {
              document.documentElement.classList.remove('lenis', 'lenis-smooth')
            }
            window.lenis = null
          } catch (error) {
            console.error('Error cleaning up Lenis:', error)
          }
        }
      } else {
        reportWebVitals()
      }
    } catch (error) {
      console.error('Error initializing smooth scroll:', error)
      reportWebVitals()
    }
  }, [])

  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-dark" style={{ contain: 'layout style paint' }}>
        <ErrorBoundary>
          <SmoothCursor />
        </ErrorBoundary>
        <ErrorBoundary>
          <TabTitleAnimator />
        </ErrorBoundary>
        <ErrorBoundary>
          <Navbar />
        </ErrorBoundary>
        <ErrorBoundary>
          <Hero />
        </ErrorBoundary>
        <Suspense fallback={
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        }>
          <ErrorBoundary>
            <Products />
          </ErrorBoundary>
          <ErrorBoundary>
            <Features />
          </ErrorBoundary>
          <ErrorBoundary>
            <MediaPlan />
          </ErrorBoundary>
          <ErrorBoundary>
            <ResellingPlan />
          </ErrorBoundary>
          <ErrorBoundary>
            <FreeKeys />
          </ErrorBoundary>
          <ErrorBoundary>
            <PaymentMethods />
          </ErrorBoundary>
          <ErrorBoundary>
            <Contact />
          </ErrorBoundary>
          <ErrorBoundary>
            <Footer />
          </ErrorBoundary>
        </Suspense>
      </div>
    </ErrorBoundary>
  )
}

export default App
