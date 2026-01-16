import { motion } from 'framer-motion'
import { useParallax } from '../hooks/useParallax'

export const ParallaxLayer = ({ 
  children, 
  speed = 0.5, 
  className = '', 
  ...props 
}) => {
  const { offset, ref } = useParallax(speed)

  return (
    <div
      ref={ref}
      className={`absolute inset-0 ${className}`}
      {...props}
    >
      <motion.div
        style={{
          transform: `translateY(${offset}px)`,
          willChange: 'transform'
        }}
        className="w-full h-full"
      >
        {children}
      </motion.div>
    </div>
  )
}

export const FloatingOrbs = () => {
  const { offset: offset1 } = useParallax(0.3)
  const { offset: offset2 } = useParallax(0.5)
  const { offset: offset3 } = useParallax(0.7)

  return (
    <>
      {/* Large orb */}
      <motion.div
        className="absolute top-20 right-10 w-96 h-96 bg-gradient-to-br from-primary/20 to-purple-500/20 rounded-full blur-3xl"
        style={{
          transform: `translateY(${offset1}px) translateX(${Math.sin(offset1 * 0.01) * 20}px)`,
          willChange: 'transform'
        }}
      />
      
      {/* Medium orb */}
      <motion.div
        className="absolute bottom-20 left-10 w-80 h-80 bg-gradient-to-tr from-blue-500/20 to-primary/20 rounded-full blur-3xl"
        style={{
          transform: `translateY(${offset2}px) translateX(${Math.cos(offset2 * 0.01) * 15}px)`,
          willChange: 'transform'
        }}
      />
      
      {/* Small orb */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-gradient-to-br from-cyan-500/15 to-blue-500/15 rounded-full blur-2xl"
        style={{
          transform: `translateY(${offset3}px) translateX(${Math.sin(offset3 * 0.02) * 25}px)`,
          willChange: 'transform'
        }}
      />
    </>
  )
}

export const ParallaxStars = () => {
  const { offset } = useParallax(0.2)

  return (
    <div className="absolute inset-0 overflow-hidden">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute bg-white rounded-full"
          style={{
            width: Math.random() * 3 + 1 + 'px',
            height: Math.random() * 3 + 1 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
            transform: `translateY(${offset * (Math.random() * 0.5 + 0.5)}px)`,
            opacity: Math.random() * 0.8 + 0.2,
            willChange: 'transform'
          }}
        />
      ))}
    </div>
  )
}

export const GradientParallax = () => {
  const { offset } = useParallax(0.4)

  return (
    <div className="absolute inset-0 opacity-30">
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-primary via-purple-500 to-blue-500"
        style={{
          transform: `translateY(${offset}px) rotate(${offset * 0.1}deg)`,
          willChange: 'transform'
        }}
      />
    </div>
  )
}
