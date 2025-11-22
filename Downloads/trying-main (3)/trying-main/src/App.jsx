import { useEffect, lazy, Suspense, memo } from 'react'
import Lenis from 'lenis'

// Critical above-the-fold components - loaded immediately
import Navbar from './components/Navbar'
import Hero from './components/Hero'

// Non-critical components - lazy loaded with prefetch hints
const LazyProductSpotlight = lazy(() => import(/* webpackPrefetch: true */ './components/ProductSpotlight'))
const LazySmoothCursor = lazy(() => import('./components/SmoothCursor'))
const LazyTabTitleAnimator = lazy(() => import('./components/TabTitleAnimator'))
const LazyChristmasSnow = lazy(() => import('./components/ChristmasSnow'))

// Below-the-fold components - loaded on demand
const LazyProducts = lazy(() => import(/* webpackPrefetch: true */ './components/Products'))
const LazyFeatures = lazy(() => import('./components/Features'))
const LazyTestimonials = lazy(() => import('./components/Testimonials'))
const LazyMediaPlan = lazy(() => import('./components/MediaPlan'))
const LazyResellingPlan = lazy(() => import('./components/ResellingPlan'))
const LazyFreeKeys = lazy(() => import('./components/FreeKeys'))
const LazyPaymentMethods = lazy(() => import('./components/PaymentMethods'))
const LazyContact = lazy(() => import('./components/Contact'))
const LazyFooter = lazy(() => import('./components/Footer'))

// Memoized loading spinner
const LoadingSpinner = memo(() => (
  <div className="flex items-center justify-center py-20">
    <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
  </div>
))
LoadingSpinner.displayName = 'LoadingSpinner'

// Preload critical resources
const preloadCriticalResources = () => {
  const criticalImages = [
    '/assets/icons/christmas-logo.png',
    '/assets/covers/unlock-cover.png',
    '/assets/covers/perm-cover.png',
    '/assets/covers/trigger-cover.png',
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
  if (window.va) {
    window.va('pageview', { 
      path: window.location.pathname,
      title: document.title 
    })
  }
}

function App() {
  
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
      duration: 1.0,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      direction: 'vertical',
      smooth: true,
      smoothTouch: false,
      wheelMultiplier: 0.8,
      touchMultiplier: 2,
      infinite: false,
      syncTouch: true,
      syncTouchLerp: 0.1,
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
    <div className="min-h-screen bg-dark">
      <Suspense fallback={null}>
        <LazyChristmasSnow />
      </Suspense>
      <Suspense fallback={null}>
        <LazySmoothCursor />
      </Suspense>
      <Suspense fallback={null}>
        <LazyTabTitleAnimator />
      </Suspense>
      <Navbar />
      <Hero />
      <Suspense fallback={<LoadingSpinner />}>
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
    </div>
  )
}

export default App
