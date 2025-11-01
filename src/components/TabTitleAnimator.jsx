import { useEffect, useRef, useState } from 'react'

const titles = [
  'xenos.lol',
  'Best cheese here!',
  'Made with love <3',
  '🎮 Premium Cheats',
  '⚡ Instant Delivery',
  '🔒 100% Secure',
  '🎯 Undetectable',
  '💎 Trusted by 1000+',
  '🚀 24/7 Support'
]

const TabTitleAnimator = () => {
  const [index, setIndex] = useState(0)
  const [text, setText] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [char, setChar] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) {
      document.title = 'xenos.lol'
      return
    }

    const run = () => {
      const current = titles[index]
      if (!deleting && char < current.length) {
        setText(current.slice(0, char + 1))
        setChar((c) => c + 1)
      } else if (!deleting && char === current.length) {
        timerRef.current = setTimeout(() => setDeleting(true), 1200)
        return
      } else if (deleting && char > 0) {
        setText(current.slice(0, char - 1))
        setChar((c) => c - 1)
      } else if (deleting && char === 0) {
        setDeleting(false)
        setIndex((i) => (i + 1) % titles.length)
      }
      const speed = deleting ? 50 : 90
      timerRef.current = setTimeout(run, speed)
    }
    timerRef.current = setTimeout(run, 300)
    return () => clearTimeout(timerRef.current)
  }, [index, deleting, char])

  useEffect(() => {
    document.title = text || 'xenos.lol'
  }, [text])

  return null
}

export default TabTitleAnimator
