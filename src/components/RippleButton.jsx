import { useState, forwardRef, useEffect } from 'react'
import { motion } from 'framer-motion'
import { cn } from '../utils/cn'

const RippleButton = forwardRef(({
  children,
  className = '',
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  ...props
}, ref) => {
  const [ripples, setRipples] = useState([])
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false)

  useEffect(() => {
    try {
      const mq = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)')
      if (mq) setPrefersReducedMotion(!!mq.matches)
    } catch (e) {
      setPrefersReducedMotion(false)
    }
  }, [])

  const addRipple = (event) => {
    if (disabled) return
    if (prefersReducedMotion) return

    const button = event.currentTarget
    const rect = button.getBoundingClientRect()
    const size = Math.max(rect.width, rect.height)
    const x = event.clientX - rect.left - size / 2
    const y = event.clientY - rect.top - size / 2

    const newRipple = {
      id: Date.now(),
      x,
      y,
      size
    }

    setRipples(prev => [...prev, newRipple])

    // Remove ripple after animation
    setTimeout(() => {
      setRipples(prev => prev.filter(ripple => ripple.id !== newRipple.id))
    }, 600)
  }

  const handleClick = (event) => {
    addRipple(event)
    onClick?.(event)
  }

  const baseClasses = 'relative overflow-hidden font-semibold transition-colors duration-200 rounded-lg min-h-[44px] inline-flex items-center justify-center gap-2 focus:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 focus-visible:ring-offset-2'

  const variants = {
    primary: 'bg-primary text-white hover:bg-primary-dark focus-visible:ring-primary/40 shadow-md shadow-primary/20',
    secondary: 'bg-dark-card text-primary hover:bg-dark-lighter border border-primary/25 focus-visible:ring-primary/20',
    ghost: 'bg-transparent text-primary hover:bg-dark-lighter',
    danger: 'bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/20 focus-visible:ring-red-400/25'
  }

  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-5 py-3 text-base',
    lg: 'px-7 py-4 text-lg',
    xl: 'px-9 py-5 text-xl'
  }

  const disabledClasses = disabled ? 'opacity-70 cursor-not-allowed' : ''

  const classes = cn(
    baseClasses,
    variants[variant],
    sizes[size],
    disabledClasses,
    className
  )

  // If user prefers reduced motion, avoid framer-motion props and ripples
  if (prefersReducedMotion) {
    return (
      <button
        ref={ref}
        className={classes}
        onClick={(e) => { onClick?.(e) }}
        disabled={disabled}
        {...props}
      >
        {children}
      </button>
    )
  }

  return (
    <motion.button
      ref={ref}
      className={classes}
      onClick={handleClick}
      disabled={disabled}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
      {...props}
    >
      {children}
      
      {/* Ripple effects */}
      {ripples.map(ripple => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
            width: ripple.size,
            height: ripple.size,
            background: 'rgba(255,255,255,0.18)'
          }}
          initial={{
            scale: 0,
            opacity: 1
          }}
          animate={{
            scale: 4,
            opacity: 0
          }}
          transition={{
            duration: 0.5,
            ease: 'easeOut'
          }}
        />
      ))}
    </motion.button>
  )
})

RippleButton.displayName = 'RippleButton'

export default RippleButton
