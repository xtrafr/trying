import { useEffect, useRef, useState } from 'react'

const titles = [
  'xenos.lol',
  'Best cheese here!',
  'Made with love <3'
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
      
      if (!deleting && char <= current.length) {
        if (char < current.length) {
          setText(current.slice(0, char + 1))
          setChar((c) => c + 1)
          timerRef.current = setTimeout(run, 40)
        } else if (char === current.length) {
          timerRef.current = setTimeout(() => setDeleting(true), 250)
        }
      } else if (deleting && char >= 0) {
        if (char > 0) {
          setText(current.slice(0, char - 1))
          setChar((c) => c - 1)
          timerRef.current = setTimeout(run, 25)
        } else if (char === 0) {
          setDeleting(false)
          setIndex((i) => (i + 1) % titles.length)
          timerRef.current = setTimeout(run, 100)
        }
      }
    }
    
    timerRef.current = setTimeout(run, 200)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [index, deleting, char])

  useEffect(() => {
    document.title = text || 'xenos.lol'
  }, [text])

  return null
}

export default TabTitleAnimator
