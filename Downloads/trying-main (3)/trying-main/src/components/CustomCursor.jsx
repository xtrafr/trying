import { useEffect, useRef, useState } from 'react'

const CustomCursor = () => {
  const dotRef = useRef(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    let mouseX = 0
    let mouseY = 0
    let dotX = 0
    let dotY = 0
    let rafId = null

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      setIsVisible(true)
    }

    const handleMouseLeave = () => {
      setIsVisible(false)
    }

    const animate = () => {
      dotX += (mouseX - dotX) * 0.25
      dotY += (mouseY - dotY) * 0.25

      dot.style.left = `${dotX}px`
      dot.style.top = `${dotY}px`

      rafId = requestAnimationFrame(animate)
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true })
    window.addEventListener('mouseenter', () => setIsVisible(true), { passive: true })
    
    rafId = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      className="fixed pointer-events-none z-[9999]"
      style={{
        width: '14px',
        height: '14px',
        borderRadius: '50%',
        backgroundColor: '#06b6d4',
        boxShadow: '0 0 12px rgba(6, 182, 212, 0.9), 0 0 24px rgba(6, 182, 212, 0.5)',
        willChange: 'left, top',
        opacity: isVisible ? 0.9 : 0,
        transition: 'opacity 0.15s ease-out',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}

export default CustomCursor
