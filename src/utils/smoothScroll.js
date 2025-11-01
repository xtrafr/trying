export const smoothScrollTo = (elementId) => {
  const element = document.getElementById(elementId)
  if (!element) return
  
  const offset = 100 // Offset for fixed navbar
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  const targetPosition = elementPosition - offset
  
  // Always use Lenis if available for consistent smooth scrolling
  if (window.lenis && typeof window.lenis.scrollTo === 'function') {
    try {
      window.lenis.scrollTo(targetPosition, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lock: true,
        force: true,
        immediate: false
      })
    } catch (error) {
      // Fallback to native smooth scroll if Lenis fails
      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth'
      })
    }
  } else {
    // Native smooth scroll fallback
    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    })
  }
}

export const handleSmoothScroll = (e, href) => {
  e.preventDefault()
  e.stopPropagation()
  const targetId = href.replace('#', '')
  smoothScrollTo(targetId)
}
