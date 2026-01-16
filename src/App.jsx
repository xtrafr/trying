import { useEffect, lazy, Suspense, useState } from 'react'
import Lenis from 'lenis'
import { motion } from 'framer-motion'

// Critical above-the-fold components - loaded immediately
import Navbar from './components/Navbar'
import Hero from './components/Hero'

// Non-critical components - lazy loaded with prefetch hints
const LazyProductSpotlight = lazy(() => import('./components/ProductSpotlight'))
const LazySmoothCursor = lazy(() => import('./components/SmoothCursor'))
const LazyTabTitleAnimator = lazy(() => import('./components/TabTitleAnimator'))
const LazyChristmasSnow = lazy(() => import('./components/ChristmasSnow'))
const LazyPaymentSuccess = lazy(() => import('./components/PaymentSuccess'))

// Below-the-fold components - loaded on demand
const LazyProducts = lazy(() => import('./components/Products'))
const LazyFeatures = lazy(() => import('./components/Features'))
const LazyTestimonials = lazy(() => import('./components/Testimonials'))
const LazyMediaPlan = lazy(() => import('./components/MediaPlan'))
const LazyResellingPlan = lazy(() => import('./components/ResellingPlan'))
const LazyFreeKeys = lazy(() => import('./components/FreeKeys'))
const LazyPaymentMethods = lazy(() => import('./components/PaymentMethods'))
const LazyContact = lazy(() => import('./components/Contact'))
const LazyFooter = lazy(() => import('./components/Footer'))

// Preload critical resources
const preloadCriticalResources = () => {
  // Preload critical images
  const criticalImages = [
    '/assets/covers/unlock-cover.png',
    '/assets/covers/perm-cover.png',
    '/assets/covers/trigger-cover.png',
    '/assets/images/private-website.png'
  ]
  
  criticalImages.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  })
}

const trackPageView = () => {
  // Track page view with Vercel Analytics
  if (window.va) {
    window.va('pageview', { 
      path: window.location.pathname,
      title: document.title 
    })
  }
}

function App() {
  const [currentPage, setCurrentPage] = useState('home')
  
  useEffect(() => {
    // Simple routing based on pathname
    const path = window.location.pathname
    if (path === '/payment-success') {
      setCurrentPage('payment-success')
    } else {
      setCurrentPage('home')
    }
  }, [])
  useEffect(() => {
    // Preload critical resources
    preloadCriticalResources()
    
    // Ensure page starts at top on load
    window.scrollTo(0, 0)
    document.documentElement.scrollTop = 0
    document.body.scrollTop = 0
    
    // Also handle browser back/forward navigation
    if ('scrollRestoration' in history) {
      history.scrollRestoration = 'manual'
    }
  }, [])
  
  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      trackPageView()
      return
    }

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
    document.documentElement.classList.add('lenis', 'lenis-smooth')

    window.lenis = lenis

    let rafId = null
    const raf = (time) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    trackPageView()

    return () => {
      lenis.destroy()
      if (rafId) cancelAnimationFrame(rafId)
      document.documentElement.classList.remove('lenis', 'lenis-smooth')
      window.lenis = null
    }
  }, [])

  return (
    <div className="min-h-screen bg-dark" style={{ contain: 'layout style paint' }}>
      <Suspense fallback={null}>
        <LazyChristmasSnow />
      </Suspense>
      <Suspense fallback={null}>
        <LazySmoothCursor />
      </Suspense>
      <Suspense fallback={null}>
        <LazyTabTitleAnimator />
      </Suspense>
      
      {currentPage === 'payment-success' ? (
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        }>
          <LazyPaymentSuccess />
        </Suspense>
      ) : (
        <>
          <Navbar />
          <Hero />
          <Suspense fallback={
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
            </div>
          }>
            <LazyProductSpotlight />
            <LazyProducts />
            <LazyFeatures />
            <LazyTestimonials />
            <LazyMediaPlan />
            <LazyResellingPlan />
            <LazyFreeKeys />
            <LazyPaymentMethods />
            <LazyContact />
            <LazyFooter />
          </Suspense>
        </>
      )}
    </div>
  )
}

export default App
