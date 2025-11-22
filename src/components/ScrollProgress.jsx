import { motion } from 'framer-motion'
import { useScrollProgress } from '../hooks/useParallax'

export const ScrollProgressBar = () => {
  const scrollProgress = useScrollProgress()

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 bg-primary/20 z-50 origin-left"
      style={{ scaleX: scrollProgress / 100 }}
    />
  )
}

export const ScrollIndicator = () => {
  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-40 hidden lg:block">
      <motion.div
        className="flex items-center gap-2 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
        whileHover={{ y: 3 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
        >
          <motion.div
            className="w-1 h-3 bg-primary rounded-full mt-2"
            animate={{ y: [0, 12, 0] }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
        <span className="text-primary/60 text-xs font-medium">Scroll</span>
      </motion.div>
    </div>
  )
}
