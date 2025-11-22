export const smoothScrollTo = (elementId) => {
  const element = document.getElementById(elementId)
  if (!element) {
    console.warn(`Element with id "${elementId}" not found`)
    return
  }
  
  const offset = 100 // Offset for fixed navbar
  const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
  const targetPosition = elementPosition - offset
  
  // Add visual feedback - highlight the target section briefly
  element.style.transition = 'background-color 0.3s ease'
  element.style.backgroundColor = 'rgba(6, 182, 212, 0.1)'
  
  setTimeout(() => {
    element.style.backgroundColor = ''
  }, 1000)
  
  // Always use Lenis if available for consistent smooth scrolling
  if (window.lenis && typeof window.lenis.scrollTo === 'function') {
    try {
      window.lenis.scrollTo(targetPosition, {
        duration: 1.5,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        lock: true,
        force: true,
        immediate: false,
        onComplete: () => {
          // Focus management for accessibility
          element.setAttribute('tabindex', '-1')
          element.focus()
          element.removeAttribute('tabindex')
        }
      })
    } catch (error) {
      console.warn('Lenis scroll failed, using fallback:', error)
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
