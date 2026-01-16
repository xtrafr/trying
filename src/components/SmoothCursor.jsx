import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

const SmoothCursor = () => {
  const cursorRef = useRef(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    // Enable on fine pointer devices (mouse/trackpad). Disable on coarse (phones)
    const hasMouse = window.matchMedia('(pointer: fine)').matches
    if (hasMouse) {
      setEnabled(true)
      document.body.classList.add('has-custom-cursor')
      document.body.style.cursor = 'none'
    }
    if (!hasMouse) {
      setEnabled(false)
      return () => {}
    }

    // Initialize at center
    let mouseX = window.innerWidth / 2
    let mouseY = window.innerHeight / 2
    let cursorX = mouseX
    let cursorY = mouseY

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.opacity = '1'
      cursor.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%)`
    }

    const handleMouseEnter = () => {
      cursor.style.opacity = '1'
    }

    const handleMouseLeave = () => {
      cursor.style.opacity = '0'
    }

    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    window.addEventListener('mouseenter', handleMouseEnter, { passive: true })
    window.addEventListener('mouseleave', handleMouseLeave, { passive: true })

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseenter', handleMouseEnter)
      window.removeEventListener('mouseleave', handleMouseLeave)
      if (hasMouse) {
        document.body.classList.remove('has-custom-cursor')
        document.body.style.cursor = ''
      }
    }
  }, [])

  if (!enabled) return null

  return createPortal(
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999]"
      style={{
        width: '12px',
        height: '12px',
        borderRadius: '50%',
        backgroundColor: '#06b6d4',
        boxShadow: '0 0 8px rgba(6, 182, 212, 0.7)',
        transform: 'translate3d(0, 0, 0) translate(-50%, -50%)',
        willChange: 'transform',
        left: '0px',
        top: '0px',
        opacity: 0,
        transition: 'opacity 0.15s ease-out'
      }}
    />, 
    document.body
  )
}

export default SmoothCursor
