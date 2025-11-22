import { forwardRef, useRef, useEffect, useState } from 'react'

// Enhanced easing functions for smoother animations
const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3)
const easeInOutCubic = (t) => t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2

// Advanced lerp with easing
const smoothLerp = (start, end, amt, easing = easeOutCubic) => {
  return start + (end - start) * easing(amt)
}

// Clamp helper
const clamp = (v, a, b) => Math.max(a, Math.min(b, v))

// Enhanced ParallaxCard with superior smoothness and physics
const ParallaxCard = forwardRef(({ 
  children, 
  className = '', 
  imageSrc, 
  tiltStrength = 10, 
  parallaxStrength = 15, 
  smooth = 0.08, // Slower for more noticeable smooth returns
  scaleOnHover = 1.03
}, ref) => {
  const wrapperRef = ref || useRef(null)
  const imgRef = useRef(null)
  const rafRef = useRef(null)
  const [isHovered, setIsHovered] = useState(false)
  
  // Enhanced state management
  const stateRef = useRef({
    targetX: 0,
    targetY: 0,
    currentRX: 0,
    currentRY: 0,
    currentTX: 0,
    currentTY: 0,
    currentScale: 1,
    targetScale: 1,
    width: 0,
    height: 0,
    time: 0
  })

  useEffect(() => {
    const el = wrapperRef.current
    if (!el) return

    const updateSize = () => {
      const rect = el.getBoundingClientRect()
      stateRef.current.width = rect.width || el.offsetWidth || 0
      stateRef.current.height = rect.height || el.offsetHeight || 0
    }

    updateSize()
    window.addEventListener('resize', updateSize)

    return () => window.removeEventListener('resize', updateSize)
  }, [wrapperRef])

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && 
      window.matchMedia && 
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const maxRotate = tiltStrength
    const maxTranslate = parallaxStrength
    const maxScale = scaleOnHover - 1

    const animate = (timestamp) => {
      const s = stateRef.current
      s.time = timestamp

      // Calculate normalized mouse position (-1 to 1)
      const w = s.width || 1
      const h = s.height || 1
      const px = clamp(s.targetX / w, -1, 1)
      const py = clamp(s.targetY / h, -1, 1)

      // Calculate target values with smooth falloff
      const distance = Math.sqrt(px * px + py * py)
      const falloff = Math.max(0, 1 - distance * 0.3)
      
      const targetRY = px * maxRotate * falloff
      const targetRX = py * -maxRotate * falloff
      const targetTX = px * -maxTranslate * falloff
      const targetTY = py * -maxTranslate * falloff
      const targetScale = isHovered ? 1 + maxScale * falloff : 1

      // Optimized lerp factor for buttery smooth animations
      const lerpFactor = 0.12 // Balanced for smooth movement and elegant returns

      if (prefersReduced) {
        // Direct snap for reduced motion
        s.currentRX = targetRX
        s.currentRY = targetRY
        s.currentTX = targetTX
        s.currentTY = targetTY
        s.currentScale = targetScale
      } else {
        // Smooth lerp towards targets for all properties
        s.currentRX += (targetRX - s.currentRX) * lerpFactor
        s.currentRY += (targetRY - s.currentRY) * lerpFactor
        s.currentTX += (targetTX - s.currentTX) * lerpFactor
        s.currentTY += (targetTY - s.currentTY) * lerpFactor
        s.currentScale += (targetScale - s.currentScale) * lerpFactor
      }

      // Apply transforms with enhanced perspective
      if (wrapperRef.current) {
        const perspective = 1500 + Math.abs(s.currentRX) * 2 + Math.abs(s.currentRY) * 2
        wrapperRef.current.style.transform = `
          perspective(${perspective}px) 
          rotateY(${s.currentRY}deg) 
          rotateX(${s.currentRX}deg) 
          scale3d(${s.currentScale}, ${s.currentScale}, ${s.currentScale})
        `
        wrapperRef.current.style.willChange = 'transform'
        wrapperRef.current.style.transformStyle = 'preserve-3d'
      }

      // Enhanced image parallax with smoother depth
      if (imgRef.current) {
        const depth = 1.08
        const translateX = s.currentTX * 1.8
        const translateY = s.currentTY * 1.8
        
        imgRef.current.style.transform = `
          translate3d(${translateX}px, ${translateY}px, 0) 
          scale(${depth})
        `
        imgRef.current.style.willChange = 'transform'
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [tiltStrength, parallaxStrength, smooth, scaleOnHover, isHovered])

  const handleMouseMove = (e) => {
    const el = wrapperRef.current
    if (!el) return
    
    const rect = el.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    // Calculate offset from center
    stateRef.current.targetX = e.clientX - centerX
    stateRef.current.targetY = e.clientY - centerY
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
    stateRef.current.targetScale = scaleOnHover
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    // Don't reset targets instantly - let spring physics smoothly return to 0
    stateRef.current.targetX = 0
    stateRef.current.targetY = 0
    stateRef.current.targetScale = 1
  }

  const wrapperStyle = {
    position: 'relative',
    width: '100%',
    minHeight: imageSrc ? '320px' : undefined,
    overflow: 'hidden',
    transformStyle: 'preserve-3d',
    transition: 'none',
    cursor: 'pointer'
  }

  const imgStyle = {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    transition: 'none',
    pointerEvents: 'none'
  }

  return (
    <div
      ref={wrapperRef}
      className={`relative ${className}`}
      style={wrapperStyle}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {imageSrc && (
        <img 
          ref={imgRef} 
          src={imageSrc} 
          alt="" 
          aria-hidden="true" 
          style={imgStyle} 
          loading="lazy" 
          decoding="async" 
          fetchpriority="low" 
        />
      )}
      
      {/* Content with proper z-index */}
      <div className="relative z-10 pointer-events-none">
        {children}
      </div>
    </div>
  )
})

ParallaxCard.displayName = 'EnhancedParallaxCard'

export default ParallaxCard
