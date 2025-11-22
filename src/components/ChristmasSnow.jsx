import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const ChristmasSnow = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    let animationFrameId
    let snowflakes = []

    // Set canvas size to cover entire document
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = Math.max(document.documentElement.scrollHeight, window.innerHeight)
    }
    resizeCanvas()
    window.addEventListener('resize', resizeCanvas)
    
    // Update canvas height on scroll (in case content changes)
    const updateCanvasHeight = () => {
      const newHeight = Math.max(document.documentElement.scrollHeight, window.innerHeight)
      if (canvas.height !== newHeight) {
        canvas.height = newHeight
      }
    }
    window.addEventListener('scroll', updateCanvasHeight)

    // Snowflake class
    class Snowflake {
      constructor() {
        this.reset()
      }

      reset() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height // Spread across entire page height
        this.size = Math.random() * 4 + 2
        this.speed = Math.random() * 1 + 0.5
        this.wind = Math.random() * 0.5 - 0.25
        this.opacity = Math.random() * 0.6 + 0.4
        this.rotation = Math.random() * Math.PI * 2
        this.rotationSpeed = (Math.random() - 0.5) * 0.02
      }

      update() {
        this.y += this.speed
        this.x += this.wind

        // Reset snowflake when it goes off screen
        if (this.y > canvas.height) {
          this.x = Math.random() * canvas.width
          this.y = 0
        }

        if (this.x > canvas.width + 10) {
          this.x = -10
        } else if (this.x < -10) {
          this.x = canvas.width + 10
        }
      }

      draw() {
        ctx.save()
        ctx.translate(this.x, this.y)
        ctx.rotate(this.rotation)
        
        // Draw snowflake shape (6-pointed star)
        ctx.strokeStyle = `rgba(255, 255, 255, ${this.opacity})`
        ctx.fillStyle = `rgba(255, 255, 255, ${this.opacity * 0.8})`
        ctx.lineWidth = 0.5
        
        // Draw 6 branches
        for (let i = 0; i < 6; i++) {
          ctx.rotate(Math.PI / 3)
          
          // Main branch
          ctx.beginPath()
          ctx.moveTo(0, 0)
          ctx.lineTo(0, -this.size)
          ctx.stroke()
          
          // Side branches
          ctx.beginPath()
          ctx.moveTo(0, -this.size * 0.4)
          ctx.lineTo(-this.size * 0.25, -this.size * 0.6)
          ctx.stroke()
          
          ctx.beginPath()
          ctx.moveTo(0, -this.size * 0.4)
          ctx.lineTo(this.size * 0.25, -this.size * 0.6)
          ctx.stroke()
          
          // Small crystals at tips
          ctx.beginPath()
          ctx.arc(0, -this.size, this.size * 0.15, 0, Math.PI * 2)
          ctx.fill()
        }
        
        // Center crystal
        ctx.beginPath()
        ctx.arc(0, 0, this.size * 0.2, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.restore()
        
        // Update rotation
        this.rotation += this.rotationSpeed
      }
    }

    // Create snowflakes
    const createSnowflakes = () => {
      const snowflakeCount = Math.floor((canvas.width * canvas.height) / 50000) // Much fewer snowflakes
      for (let i = 0; i < snowflakeCount; i++) {
        snowflakes.push(new Snowflake())
      }
    }
    createSnowflakes()

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      snowflakes.forEach(snowflake => {
        snowflake.update()
        snowflake.draw()
      })

      animationFrameId = requestAnimationFrame(animate)
    }
    animate()

    // Cleanup
    return () => {
      window.removeEventListener('resize', resizeCanvas)
      window.removeEventListener('scroll', updateCanvasHeight)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
      className="fixed inset-0 pointer-events-none z-50"
      style={{ mixBlendMode: 'screen' }}
    />
  )
}

export default ChristmasSnow
