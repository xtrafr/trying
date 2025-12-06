import { useState, useEffect, useRef } from 'react'

// Parallax hooks for advanced scrolling effects
export const useParallax = (speed = 0.18) => {
  const [offset, setOffset] = useState(0)
  const ref = useRef(null)

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return
      
      const rect = ref.current.getBoundingClientRect()
      const scrolled = window.pageYOffset
      const rate = scrolled * -speed
      
      // Only update if element is in viewport or near it
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        setOffset(rate)
      }
    }

    let rafId = null
    const optimizedScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        handleScroll()
        rafId = null
      })
    }

    window.addEventListener('scroll', optimizedScroll, { passive: true })
    handleScroll() // Initial call

    return () => {
      window.removeEventListener('scroll', optimizedScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [speed])

  return { offset, ref }
}

export const useScrollProgress = () => {
  const [scrollProgress, setScrollProgress] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset
      const docHeight = document.documentElement.scrollHeight - window.innerHeight
      const progress = (scrollTop / docHeight) * 100
      setScrollProgress(Math.min(100, Math.max(0, progress)))
    }

    let rafId = null
    const optimizedScroll = () => {
      if (rafId) return
      rafId = requestAnimationFrame(() => {
        handleScroll()
        rafId = null
      })
    }

    window.addEventListener('scroll', optimizedScroll, { passive: true })
    handleScroll()

    return () => {
      window.removeEventListener('scroll', optimizedScroll)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return scrollProgress
}

export const useInView = (threshold = 0.1) => {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
      },
      { threshold }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current)
      }
    }
  }, [threshold])

  return { isInView, ref }
}
