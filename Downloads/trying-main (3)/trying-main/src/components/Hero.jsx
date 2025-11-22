import { motion } from 'framer-motion'
import { ShoppingCart, Info, Shield, Users, Clock } from 'lucide-react'
import { handleSmoothScroll } from '../utils/smoothScroll'
import RippleButton from './RippleButton'

const Hero = () => {
  const floatingCards = [
    { icon: Shield, text: '100% Secure', delay: 0 },
    { icon: Users, text: '1000+ Customers', delay: 0.2 },
    { icon: Clock, text: '24/7 Support', delay: 0.4 },
  ]

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 sm:pt-24 lg:pt-28 px-4 sm:px-6">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-dark via-dark-lighter to-dark">
        <div className="absolute inset-0 opacity-20 hidden sm:block">
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-primary rounded-full"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0, 1, 0],
              }}
              transition={{
                duration: Math.random() * 3 + 2,
                repeat: Infinity,
                delay: Math.random() * 2,
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto py-8 sm:py-12 lg:py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center lg:text-left"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1, duration: 0.4 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 leading-tight break-words"
            >
              Welcome to{' '}
              <span className="text-gradient glow-effect">Xenos Services</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.4 }}
              className="text-base sm:text-lg md:text-xl text-gray-300 mb-6 sm:mb-8 leading-relaxed"
            >
              Premium digital solutions for gaming, streaming, and security. Trusted by thousands of customers worldwide.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.4 }}
              className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start"
            >
              <RippleButton
                variant="primary"
                size="md"
                href="#products"
                onClick={(e) => handleSmoothScroll(e, '#products')}
                className="inline-flex items-center justify-center text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] touch-manipulation"
              >
                <ShoppingCart className="mr-2" size={18} />
                Explore Products
              </RippleButton>

              <RippleButton
                variant="secondary"
                size="md"
                href="#about"
                onClick={(e) => handleSmoothScroll(e, '#about')}
                className="inline-flex items-center justify-center text-sm sm:text-base px-6 sm:px-8 py-3.5 sm:py-4 min-h-[48px] touch-manipulation"
              >
                <Info className="mr-2" size={18} />
                Learn More
              </RippleButton>
            </motion.div>
          </motion.div>

          {/* Right Content - Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-64 sm:h-80 lg:h-96 hidden lg:block"
          >
            {floatingCards.map((card, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.8 + card.delay, duration: 0.5 }}
                className="absolute"
                style={{
                  left: `${index * 30}%`,
                  top: `${index * 25}%`,
                }}
              >
                <motion.div
                  animate={{
                    y: [0, -20, 0],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    delay: card.delay,
                  }}
                  className="bg-dark-card border border-primary/30 rounded-2xl p-6 shadow-xl card-glow hover:card-glow-hover transition-all duration-300 backdrop-blur-sm"
                >
                  <div className="flex items-center space-x-4">
                    <div className="p-3 bg-primary/20 rounded-lg">
                      <card.icon className="text-primary" size={24} />
                    </div>
                    <span className="text-white font-semibold whitespace-nowrap">
                      {card.text}
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-6 h-10 border-2 border-primary rounded-full flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
      {/* Section edge fades (smooth background transition) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-dark to-transparent -z-10" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark to-transparent -z-10" aria-hidden="true" />
    </section>
  )
}

export default Hero
