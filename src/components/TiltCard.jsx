import { useState, useRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

const TiltCard = ({
  children,
  className = '',
  tiltStrength = 10,
  glareOpacity = 0.1,
  disabled = false,
  parallaxStrength = 0,
  ...props
}) => {
  const [transform, setTransform] = useState({
    rotateX: 0,
    rotateY: 0,
    scale: 1
  })
  const [glarePosition, setGlarePosition] = useState({ x: 50, y: 50 })
  const [isLeaving, setIsLeaving] = useState(false)
  const cardRef = useRef(null)

  const handleMouseMove = (e) => {
    if (disabled) return

    const card = cardRef.current
    if (!card) return

    const rect = card.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    
    const mouseX = e.clientX - centerX
    const mouseY = e.clientY - centerY
    
  const rotateX = (mouseY / (rect.height / 2)) * -tiltStrength
  const rotateY = (mouseX / (rect.width / 2)) * tiltStrength
    
    const glareX = ((e.clientX - rect.left) / rect.width) * 100
    const glareY = ((e.clientY - rect.top) / rect.height) * 100

    setTransform({
      rotateX: Math.max(-tiltStrength, Math.min(tiltStrength, rotateX)),
      rotateY: Math.max(-tiltStrength, Math.min(tiltStrength, rotateY)),
      scale: 1.05
    })
    if (isLeaving) setIsLeaving(false)
    
    setGlarePosition({ x: glareX, y: glareY })
  }

  const handleMouseLeave = () => {
    setIsLeaving(true)
    setTransform({
      rotateX: 0,
      rotateY: 0,
      scale: 1
    })
  }

  useEffect(() => {
    const card = cardRef.current
    if (!card) return

    card.addEventListener('mousemove', handleMouseMove)
    card.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      card.removeEventListener('mousemove', handleMouseMove)
      card.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [disabled, tiltStrength])

  return (
    <motion.div
      ref={cardRef}
      className={cn(
        'relative transform-gpu preserve-3d',
        className
      )}
      style={{
        // inline transition so mouse-leave returns are snappy
        transition: isLeaving ? 'transform 90ms cubic-bezier(0.2,0,0.2,1)' : 'transform 220ms cubic-bezier(0.2,0.8,0.2,1)',
        transform: `perspective(1000px) rotateX(${transform.rotateX}deg) rotateY(${transform.rotateY}deg) scale3d(${transform.scale}, ${transform.scale}, ${transform.scale})`,
        transformStyle: 'preserve-3d'
      }}
      whileHover={!disabled ? {
        y: -8,
        transition: { duration: 0.15 }
      } : {}}
      {...props}
    >
      {/* Glare effect */}
      {!disabled && (
        <div
          className="absolute inset-0 pointer-events-none rounded-2xl opacity-0 transition-opacity duration-200"
          style={{
            background: `radial-gradient(circle at ${glarePosition.x}% ${glarePosition.y}%, rgba(255,255,255,${glareOpacity}), transparent 50%)`,
            opacity: transform.scale > 1 ? 1 : 0
          }}
        />
      )}
      
      <div
        style={parallaxStrength > 0 ? {
          transform: `translate3d(${((glarePosition.x - 50) / 50) * parallaxStrength * -1}px, ${((glarePosition.y - 50) / 50) * parallaxStrength * -1}px, 0)`
        } : undefined}
      >
        {children}
      </div>
    </motion.div>
  )
}

export const ProductTiltCard = ({ product, children, ...props }) => {
  return (
    <TiltCard
      tiltStrength={9}
      glareOpacity={0.15}
      className="bg-dark-card rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-200 cursor-pointer group"
      {...props}
    >
      {children}
    </TiltCard>
  )
}

export const FeatureTiltCard = ({ children, ...props }) => {
  return (
    <TiltCard
      tiltStrength={6}
      glareOpacity={0.1}
      className="bg-transparent rounded-2xl p-6 border border-primary/10 hover:border-primary/30 transition-all duration-150"
      {...props}
    >
      {children}
    </TiltCard>
  )
}

export default TiltCard
