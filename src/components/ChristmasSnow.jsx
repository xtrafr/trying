import { useEffect, useRef, useState } from 'react'

// Performance-optimized Christmas Snow
// - Uses viewport-only canvas (not full document)
// - Limited snowflake count (max 25)
// - Simple circle drawing instead of complex shapes
// - Pauses when tab is not visible
// - Respects prefers-reduced-motion
const ChristmasSnow = () => {
  const canvasRef = useRef(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Respect reduced motion preference
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    let animationFrameId
    let snowflakes = []
    let isRunning = true

    // Set canvas size to viewport only (not full document)
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    resizeCanvas()
    
    // Debounced resize handler
    let resizeTimeout
    const handleResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(resizeCanvas, 200)
    }
    window.addEventListener('resize', handleResize, { passive: true })

    // Simple snowflake - just a circle for performance
    class Snowflake {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * -canvas.height // Start above viewport
        this.size = Math.random() * 3 + 1
        this.speed = Math.random() * 0.8 + 0.3
        this.wind = Math.random() * 0.3 - 0.15
        this.opacity = Math.random() * 0.5 + 0.3
      }

      update() {
        this.y += this.speed
        this.x += this.wind

        // Reset when off screen
        if (this.y > canvas.height + 10) {
          this.x = Math.random() * canvas.width
          this.y = -10
        }
        if (this.x > canvas.width + 10) this.x = -10
        else if (this.x < -10) this.x = canvas.width + 10
      }

      draw() {
        // Simple circle - much faster than complex shapes
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.fill()
      }
    }

    // Create LIMITED snowflakes (max 25 for performance)
    const snowflakeCount = Math.min(25, Math.floor(canvas.width / 80))
    for (let i = 0; i < snowflakeCount; i++) {
      snowflakes.push(new Snowflake())
    }

    // Animation loop with visibility check
    const animate = () => {
      if (!isRunning) return
      
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      snowflakes.forEach(snowflake => {
        snowflake.update()
        snowflake.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    // Pause animation when tab is hidden
    const handleVisibilityChange = () => {
      if (document.hidden) {
        isRunning = false
        cancelAnimationFrame(animationFrameId)
      } else {
        isRunning = true
        animate()
      }
    }
    document.addEventListener('visibilitychange', handleVisibilityChange)

    animate()

    return () => {
      isRunning = false
      window.removeEventListener('resize', handleResize)
      document.removeEventListener('visibilitychange', handleVisibilityChange)
      cancelAnimationFrame(animationFrameId)
      clearTimeout(resizeTimeout)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-30"
      style={{ 
        opacity: 0.7,
        mixBlendMode: 'screen'
      }}
    />
  )
}

export default ChristmasSnow
