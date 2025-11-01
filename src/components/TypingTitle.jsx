import { useEffect, useState } from 'react'

const TypingTitle = () => {
  const [displayText, setDisplayText] = useState('')
  const [titleIndex, setTitleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const [charIndex, setCharIndex] = useState(0)

  const titles = ['xenos.lol', 'Best cheese here!', 'Made with love <3']
  const currentTitle = titles[titleIndex]
  const typingSpeed = isDeleting ? 50 : 100
  const delayBeforeDelete = 2000

  useEffect(() => {
    document.title = displayText || 'xenos.lol'
  }, [displayText])

  useEffect(() => {
    let timeout

    if (!isDeleting && charIndex < currentTitle.length) {
      timeout = setTimeout(() => {
        setDisplayText(currentTitle.substring(0, charIndex + 1))
        setCharIndex(charIndex + 1)
      }, typingSpeed)
    } else if (!isDeleting && charIndex === currentTitle.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true)
      }, delayBeforeDelete)
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => {
        setDisplayText(currentTitle.substring(0, charIndex - 1))
        setCharIndex(charIndex - 1)
      }, typingSpeed)
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setTitleIndex((prev) => (prev + 1) % titles.length)
    }

    return () => clearTimeout(timeout)
  }, [charIndex, isDeleting, currentTitle, typingSpeed])

  return (
    <div className="fixed top-0 left-0 right-0 pointer-events-none z-[1000] text-center pt-2 h-8 flex items-center justify-center">
      <span className="text-xs sm:text-sm font-semibold text-primary/80 tracking-wider min-h-5 inline-block">
        {displayText}
        <span className="animate-pulse ml-0.5">|</span>
      </span>
    </div>
  )
}

export default TypingTitle
