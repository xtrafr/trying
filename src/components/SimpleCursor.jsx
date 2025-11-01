import { useEffect, useRef } from 'react'

const SimpleCursor = () => {
  const cursorRef = useRef(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    let mouseX = 0
    let mouseY = 0

    const handleMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY
      cursor.style.left = mouseX + 'px'
      cursor.style.top = mouseY + 'px'
    }

    const handleMouseEnter = () => {
      cursor.style.opacity = '1'
    }

    const handleMouseLeave = () => {
      cursor.style.opacity = '0'
    }

    document.addEventListener('mousemove', handleMouseMove, false)
    document.addEventListener('mouseenter', handleMouseEnter, false)
    document.addEventListener('mouseleave', handleMouseLeave, false)

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      className="fixed pointer-events-none z-[9999]"
      style={{
        width: '16px',
        height: '16px',
        borderRadius: '50%',
        backgroundColor: '#06b6d4',
        boxShadow: '0 0 15px rgba(6, 182, 212, 1), 0 0 30px rgba(6, 182, 212, 0.6)',
        transform: 'translate(-50%, -50%)',
        opacity: 0,
        transition: 'opacity 0.2s ease-out',
      }}
    />
  )
}

export default SimpleCursor
