import { motion, AnimatePresence } from 'framer-motion'
import { Star, User, Clock, X } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'Customer',
      role: 'Unlock All User',
      rating: 5,
      text: 'BEST UNLOCK ! 0 LAG, 100% SAFE BUY IT FOR REAL !!! T',
      image: '/assets/vouches/ua1.png',
      product: 'Unlock All',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'Customer',
      role: 'Unlock All User',
      rating: 5,
      text: 'thank you very much for this one! incredible<3',
      image: '/assets/vouches/ua2.png',
      product: 'Unlock All',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'Customer',
      role: 'Unlock All User',
      rating: 5,
      text: 'The bests one, helps me alot , thanks for the ua ❤️ 👑 💯',
      image: '/assets/vouches/ua3.png',
      product: 'Unlock All',
      color: 'from-primary to-blue-500'
    },
    {
      name: 'Customer',
      role: 'Unlock All User',
      rating: 5,
      text: 'w admins thank you for your support and its 100% real,its worth it',
      image: '/assets/vouches/ua4.png',
      product: 'Unlock All',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'Customer',
      role: 'Private Cheat User',
      rating: 5,
      text: 'Thanks so much, works so good, the best support and they helps me alot ♥️',
      image: '/assets/vouches/private1.png',
      product: 'Private Cheat',
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'Customer',
      role: 'Private Cheat User',
      rating: 5,
      text: '+rep w mans in the fricking chat',
      image: '/assets/vouches/private2.png',
      product: 'Private Cheat',
      color: 'from-cyan-500 to-blue-500'
    },
    {
      name: 'Customer',
      role: 'Triggerbot User',
      rating: 5,
      text: 'The bests one, helps me alot , thanks for the ua and trigger ❤️',
      image: '/assets/vouches/trigger.png',
      product: 'Triggerbot',
      color: 'from-pink-500 to-purple-500'
    },
  ]

  const [selectedImage, setSelectedImage] = useState(null)

  // Handle modal open/close - simplified approach
  useEffect(() => {
    if (!selectedImage) {
      // Modal is closed - ensure everything is restored
      document.body.style.overflow = ''
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      if (window.lenis) {
        try {
          window.lenis.start()
        } catch (e) {}
      }
      return
    }

    // Modal is open
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setSelectedImage(null)
      }
    }

    // Save scroll position
    const scrollY = window.scrollY || window.pageYOffset || 0
    
    document.addEventListener('keydown', handleEscape, { passive: true })
    
    // Simple scroll lock - don't use position fixed to avoid issues
    document.body.style.overflow = 'hidden'
    document.body.style.position = 'relative'
    
    // Stop Lenis completely
    if (window.lenis) {
      try {
        window.lenis.stop()
      } catch (e) {}
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
      
      // Restore scroll
      document.body.style.overflow = ''
      document.body.style.position = ''
      
      // Restore scroll position after a brief delay
      setTimeout(() => {
        window.scrollTo(0, scrollY)
        
        // Resume Lenis
        if (window.lenis) {
          try {
            window.lenis.start()
          } catch (e) {}
        }
      }, 10)
    }
  }, [selectedImage])

  return (
    <section className="py-32 bg-gradient-to-br from-dark via-dark-lighter to-dark relative overflow-hidden">
      {/* Optimized Background - smaller elements, no animate-pulse */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
        <div className="absolute top-1/4 left-0 w-64 h-64 bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-full blur-2xl" />
        <div className="absolute bottom-1/4 right-0 w-64 h-64 bg-gradient-to-tr from-blue-500/30 to-primary/30 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-24"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-block mb-6"
          >
            <span className="px-6 py-2.5 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-semibold backdrop-blur-sm">
              Customer Reviews
            </span>
          </motion.div>
          <div className="mb-8">
            <h2 className="text-center max-w-4xl mx-auto">
              <span className="block text-sm uppercase tracking-widest text-primary/70 mb-2">Trusted by</span>
              <span className="block text-5xl sm:text-6xl md:text-7xl font-extrabold mb-2 text-gradient leading-tight glow-effect">Thousands</span>
            </h2>
            <div className="mx-auto mt-4 w-40 h-1 rounded-full bg-gradient-to-r from-primary to-blue-500 opacity-90 shadow-lg" aria-hidden="true" />
          </div>
          <p className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Join our community of happy gamers who trust Xenos for their gaming experience
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08, duration: 0.5, ease: "easeOut" }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative h-full flex"
            >
              {/* Glow effect on hover */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary/80 rounded-2xl opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300" />
              
              {/* Card */}
                <div className="relative bg-dark-card/80 backdrop-blur-xl rounded-2xl p-6 transition-all duration-150 shadow-xl hover:shadow-2xl h-full flex flex-col items-stretch text-left">
                {/* Product Category Badge */}
                <div className="mb-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
                    testimonial.product === 'Unlock All' ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' :
                    testimonial.product === 'Private Cheat' ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' :
                    'bg-pink-500/20 text-pink-400 border border-pink-500/30'
                  }`}>
                    {testimonial.product}
                  </span>
                </div>

                {/* Screenshot Image */}
                {testimonial.image && (
                  <div 
                    className="mb-4 rounded-lg overflow-hidden border border-primary/20 cursor-pointer hover:border-primary/50 transition-all duration-300"
                    onClick={(e) => {
                      e.preventDefault()
                      e.stopPropagation()
                      setSelectedImage(testimonial.image)
                    }}
                  >
                    <motion.img 
                      src={testimonial.image}
                      alt={`${testimonial.product} review screenshot`}
                      className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.3 }}
                      loading="lazy"
                      onError={(e) => {
                        console.error('Failed to load image:', testimonial.image)
                        e.target.style.display = 'none'
                      }}
                    />
                  </div>
                )}

                {/* Rating */}
                <div className="flex gap-1 mb-4 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 + (i * 0.05) }}
                    >
                      <Star size={16} className="text-yellow-500 fill-yellow-500 drop-shadow-lg" />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-gray-300 leading-relaxed text-sm mt-auto text-center hyphens-auto balance-text" style={{ textJustify: 'inter-word' }}>
                  {testimonial.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Trust indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-16 relative flex justify-center"
        >
          <div className="inline-flex bg-dark-card/80 backdrop-blur-xl rounded-xl py-3 px-5 border border-primary/30 shadow-xl hover:shadow-2xl hover:border-primary/50 transition-all duration-300">
            <div className="flex items-center gap-6">
              <div className="flex flex-col items-center px-2">
                <div className="text-lg font-extrabold text-gradient leading-none mb-1">5.0</div>
                <div className="text-gray-400 text-xs uppercase tracking-wider">Rating</div>
              </div>

              <div className="h-8 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />

              <div className="flex flex-col items-center px-2">
                <div className="text-lg font-extrabold text-gradient leading-none mb-1">1000+</div>
                <div className="text-gray-400 text-xs uppercase tracking-wider">Customers</div>
              </div>

              <div className="h-8 w-px bg-gradient-to-b from-transparent via-primary/40 to-transparent" />

              <div className="flex flex-col items-center px-2">
                <div className="text-lg font-extrabold text-gradient leading-none mb-1">24/7</div>
                <div className="text-gray-400 text-xs uppercase tracking-wider">Support</div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Image Lightbox Modal - Using Portal */}
      {selectedImage && createPortal(
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={(e) => {
              if (e.target === e.currentTarget) {
                setSelectedImage(null)
              }
            }}
            className="fixed inset-0 z-[9999] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
            style={{ 
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              width: '100vw',
              height: '100vh',
              zIndex: 9999
            }}
            data-lenis-prevent
          >
            <button
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setSelectedImage(null)
              }}
              className="absolute top-4 right-4 p-3 bg-dark-card/80 hover:bg-dark-card rounded-full transition-all duration-300 z-[10000] cursor-pointer flex items-center justify-center"
              aria-label="Close image"
              type="button"
            >
              <X className="text-white" size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full h-full flex items-center justify-center p-8"
              style={{
                maxWidth: '100vw',
                maxHeight: '100vh'
              }}
              data-lenis-prevent
            >
              <img
                src={selectedImage}
                alt="Review screenshot"
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                style={{ 
                  maxWidth: 'calc(100vw - 4rem)',
                  maxHeight: 'calc(100vh - 4rem)',
                  width: 'auto',
                  height: 'auto',
                  objectFit: 'contain',
                  display: 'block',
                  margin: '0 auto',
                  userSelect: 'none'
                }}
                loading="eager"
                decoding="async"
                draggable="false"
                onError={(e) => {
                  console.error('Failed to load image:', selectedImage)
                  e.target.style.display = 'none'
                }}
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>,
        document.body
      )}

      {/* Section edge fades (smooth background transition) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-dark to-transparent -z-10" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark to-transparent -z-10" aria-hidden="true" />
      {/* Section edge fades (smooth background transition) */}
    </section>
  )
}

export default Testimonials
