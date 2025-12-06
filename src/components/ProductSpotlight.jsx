import { motion } from 'framer-motion'
import ParallaxCard from './ParallaxCard'
import { ArrowRight, Star } from 'lucide-react'
import RippleButton from './RippleButton'
import { handleSmoothScroll } from '../utils/smoothScroll'

const ProductSpotlight = () => {
  return (
    <section className="py-32 bg-dark relative overflow-hidden">
      {/* Optimized gradient background - smaller, no animate-pulse */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-primary via-purple-500 to-blue-500 rounded-full blur-2xl" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-gradient-to-tr from-blue-500 via-primary to-cyan-500 rounded-full blur-2xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/30 rounded-full mb-6"
            >
              <Star className="text-primary" size={16} fill="currentColor" />
              <span className="text-primary text-sm font-semibold">Featured Product</span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight"
            >
              Xenos Private.
              <br />
              <span className="text-gradient">Undetectable.</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-gray-400 mb-8 leading-relaxed"
            >
              Experience next-level gameplay with our most advanced cheat. 
              Completely undetectable, packed with powerful features,
              and built to dominate every match.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap gap-4 mb-8"
            >
              <RippleButton
                variant="primary"
                size="lg"
                onClick={(e) => handleSmoothScroll(e, '#products')}
                className="inline-flex items-center"
              >
                <span>Explore Products</span>
                <ArrowRight className="ml-2" size={20} />
              </RippleButton>
              <RippleButton
                variant="ghost"
                size="lg"
                onClick={(e) => handleSmoothScroll(e, '#about')}
              >
                Learn More
              </RippleButton>
            </motion.div>

            {/* Feature highlights */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="pt-8 border-t border-primary/20"
            >
              <div className="flex items-start gap-8">
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">100%</div>
                  <div className="text-sm text-gray-400">Undetectable</div>
                </div>
                <div>
                  <div className="text-3xl font-bold text-primary mb-1">24/7</div>
                  <div className="text-sm text-gray-400">Support</div>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <ParallaxCard 
              imageSrc="/assets/images/private-website.png"
              tiltStrength={5}
              parallaxStrength={6}
              smooth={0.04}
              className="rounded-3xl shadow-2xl shadow-primary/20 border border-primary/20 overflow-hidden w-full h-auto"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-dark via-transparent to-transparent opacity-60" />
            </ParallaxCard>

            {/* Floating feature cards */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.8 }}
              className="absolute -bottom-8 -left-8 bg-dark-card/90 backdrop-blur-xl p-6 rounded-2xl border border-primary/30 shadow-xl z-50 pointer-events-none"
            >
              <div className="text-primary text-sm font-semibold mb-1">ESP & Chams</div>
              <div className="text-gray-400 text-xs">Full visual assistance</div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.9 }}
              className="absolute -top-8 -right-8 bg-dark-card/90 backdrop-blur-xl p-6 rounded-2xl border border-primary/30 shadow-xl z-50 pointer-events-none"
            >
              <div className="text-primary text-sm font-semibold mb-1">Advanced Aimbot</div>
              <div className="text-gray-400 text-xs">Perfect accuracy</div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Section edge fades (smooth background transition) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-dark to-transparent -z-10" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark to-transparent -z-10" aria-hidden="true" />
    </section>
  )
}

export default ProductSpotlight
