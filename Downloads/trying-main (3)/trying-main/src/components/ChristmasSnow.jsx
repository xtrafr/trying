import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const ChristmasSnow = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d', { alpha: true })
    let animationFrameId
    let snowflakes = []
    let lastTime = 0
    const fps = 30
    const fpsInterval = 1000 / fps

    const updateCanvasSize = () => {
      const newHeight = Math.max(document.documentElement.scrollHeight, document.body.scrollHeight, window.innerHeight)
      canvas.width = window.innerWidth
      canvas.height = newHeight
    }
    updateCanvasSize()
    
    let resizeTimeout
    const debouncedResize = () => {
      clearTimeout(resizeTimeout)
      resizeTimeout = setTimeout(updateCanvasSize, 250)
    }
    window.addEventListener('resize', debouncedResize)

    // Update canvas height when content loads
    const observer = new MutationObserver(() => {
      updateCanvasSize()
    })
    observer.observe(document.body, { childList: true, subtree: true })

    class Snowflake {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * window.innerWidth
        this.absoluteY = Math.random() * canvas.height
        this.size = Math.random() * 4 + 2
        this.speed = Math.random() * 1.5 + 0.5
        this.wind = Math.random() * 0.8 - 0.4
        this.opacity = Math.random() * 0.6 + 0.4
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.03
        this.swing = Math.random() * 0.5
        this.swingSpeed = Math.random() * 0.02 + 0.01
      }

      update() {
        // Update position in absolute document space
        this.absoluteY += this.speed
        this.x += this.wind + Math.sin(this.swing) * 0.5
        this.swing += this.swingSpeed
        this.rotation += this.rotationSpeed

        // Reset when snowflake goes beyond document height
        if (this.absoluteY > canvas.height) {
          this.x = Math.random() * window.innerWidth
          this.absoluteY = -10
        }

        if (this.x > window.innerWidth + 10) {
          this.x = -10
        } else if (this.x < -10) {
          this.x = window.innerWidth + 10
        }
      }

      draw(scrollY) {
        // Calculate screen position relative to current scroll
        const screenY = this.absoluteY - scrollY

        // Only draw if visible in viewport (with buffer)
        if (screenY > -50 && screenY < window.innerHeight + 50) {
          ctx.save()
          ctx.translate(this.x, this.absoluteY)
          ctx.rotate(this.rotation)
          
          ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`
          ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`
          ctx.lineWidth = 1
          
          // Draw 6 branches for snowflake
          for (let i = 0; i < 6; i++) {
            ctx.rotate(Math.PI / 3)
            
            // Main branch
            ctx.beginPath()
            ctx.moveTo(0, 0)
            ctx.lineTo(0, -this.size)
            ctx.stroke()
            
            // Side branches
            ctx.beginPath()
            ctx.moveTo(0, -this.size * 0.5)
            ctx.lineTo(-this.size * 0.3, -this.size * 0.7)
            ctx.stroke()
            
            ctx.beginPath()
            ctx.moveTo(0, -this.size * 0.5)
            ctx.lineTo(this.size * 0.3, -this.size * 0.7)
            ctx.stroke()
            
            // Tip crystal
            ctx.beginPath()
            ctx.arc(0, -this.size, this.size * 0.2, 0, Math.PI * 2)
            ctx.fill()
          }
          
          // Center crystal
          ctx.beginPath()
          ctx.arc(0, 0, this.size * 0.25, 0, Math.PI * 2)
          ctx.fill()
          
          ctx.restore()
        }
      }
    }

    const createSnowflakes = () => {
      snowflakes = []
      const totalArea = window.innerWidth * canvas.height
      const snowflakeCount = Math.floor(totalArea / 40000)
      for (let i = 0; i < snowflakeCount; i++) {
        snowflakes.push(new Snowflake())
      }
    }
    createSnowflakes()

    const animate = (currentTime) => {
      animationFrameId = requestAnimationFrame(animate)
      
      const elapsed = currentTime - lastTime
      if (elapsed < fpsInterval) return
      
      lastTime = currentTime - (elapsed % fpsInterval)

      ctx.clearRect(0, 0, canvas.width, canvas.height)

      const scrollY = window.scrollY

      snowflakes.forEach(snowflake => {
        snowflake.update()
        snowflake.draw(scrollY)
      })
    }
    animate(0)

    return () => {
      window.removeEventListener('resize', debouncedResize)
      clearTimeout(resizeTimeout)
      cancelAnimationFrame(animationFrameId)
      observer.disconnect()
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="absolute inset-0 top-0 left-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen', position: 'absolute', width: '100%' }}
    />
  )
}

export default ChristmasSnow
