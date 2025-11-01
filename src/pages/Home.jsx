import { useEffect, lazy, Suspense } from 'react'
import Lenis from 'lenis'
import Navbar from '../components/Navbar'
import Hero from '../components/Hero'
import SmoothCursor from '../components/SmoothCursor'
import TabTitleAnimator from '../components/TabTitleAnimator'
import { initAnalytics, trackPageView } from '../utils/analytics'

// Lazy load components
const Products = lazy(() => import('../components/Products'))
const Features = lazy(() => import('../components/Features'))
const MediaPlan = lazy(() => import('../components/MediaPlan'))
const ResellingPlan = lazy(() => import('../components/ResellingPlan'))
const FreeKeys = lazy(() => import('../components/FreeKeys'))
const PaymentMethods = lazy(() => import('../components/PaymentMethods'))
const Contact = lazy(() => import('../components/Contact'))
const Footer = lazy(() => import('../components/Footer'))

const reportWebVitals = () => {
  if ('web-vital' in window) {
    const vitals = window['web-vital']
    if (window.va) {
      window.va('pageview', { path: window.location.pathname })
    }
  }
}

function Home() {
  useEffect(() => {
    document.title = 'xenos.lol'
    initAnalytics().catch(err => console.error('Analytics initialization failed:', err))
  }, [])

  useEffect(() => {
    trackPageView()
    const interval = setInterval(() => {
      trackPageView()
    }, 30000)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    try {
      const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
      if (prefersReduced) {
        reportWebVitals()
        return
      }

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
    <div className="min-h-screen bg-dark" style={{ contain: 'layout style paint' }}>
      <SmoothCursor />
      <TabTitleAnimator />
      <Navbar />
      <Hero />
      <Suspense fallback={
        <div className="flex items-center justify-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
        </div>
      }>
        <Products />
        <Features />
        <MediaPlan />
        <ResellingPlan />
        <FreeKeys />
        <PaymentMethods />
        <Contact />
        <Footer />
      </Suspense>
    </div>
  )
}

export default Home

