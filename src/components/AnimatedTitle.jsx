import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

const AnimatedTitle = () => {
  const [titleIndex, setTitleIndex] = useState(0)

  const titles = [
    'xenos.lol',
    'Best cheese here!',
    'Made with love <3'
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setTitleIndex((prev) => (prev + 1) % titles.length)
    }, 4000)

    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    document.title = titles[titleIndex]
  }, [titleIndex])

  return (
    <motion.div
      key={titleIndex}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: 0.5, ease: 'easeInOut' }}
      className="fixed top-0 left-0 right-0 pointer-events-none z-[1000] text-center pt-2"
    >
      <span className="text-xs sm:text-sm font-semibold text-primary/80 tracking-wider">
        {titles[titleIndex]}
      </span>
    </motion.div>
  )
}

export default AnimatedTitle
