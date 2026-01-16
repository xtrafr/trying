import { motion } from 'framer-motion'
import { Shield, Zap, Headphones, RefreshCw } from 'lucide-react'
import { FeatureCardSkeleton } from './SkeletonLoader'
import { FeatureTiltCard } from './TiltCard'

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: '100% Secure & Undetectable',
      description: 'Advanced anti‑detection. Rigorously tested for zero flags.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      icon: Zap,
      title: 'Instant Automated Delivery',
      description: 'Keys and downloads in seconds. No waiting.',
      color: 'from-yellow-500 to-orange-500',
    },
    {
      icon: Headphones,
      title: '24/7 Premium Support',
      description: 'Discord + email. Median response under 1 hour.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      icon: RefreshCw,
      title: 'Lifetime Updates Included',
      description: 'Continuous updates for the latest game versions.',
      color: 'from-purple-500 to-pink-500',
    },
  ]

  return (
    <section id="about" className="py-24 md:py-32 bg-gradient-to-br from-dark-lighter via-dark to-dark-lighter relative overflow-hidden scroll-mt-24 md:scroll-mt-32">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10 pointer-events-none select-none">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/30 to-purple-500/30 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/30 to-primary/30 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-gradient leading-relaxed break-words pb-2">Why Choose Xenos?</h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            Trusted by thousands. Unmatched quality, security, and support.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 md:gap-8">
          {features.map((feature, index) => (
            <FeatureTiltCard
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.3 }}
            >
              <motion.div
                whileHover={{ y: -2, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className={`w-14 h-14 sm:w-16 sm:h-16 rounded-xl bg-dark-lighter border border-primary/30 flex items-center justify-center mb-4 shadow-md`}
              >
                <feature.icon className="text-primary" size={28} />
              </motion.div>

              <h3 className="text-lg sm:text-xl font-bold text-white mb-3">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm sm:text-base">{feature.description}</p>
            </FeatureTiltCard>
          ))}
        </div>
      </div>
      {/* Section edge fades (smooth background transition) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-dark-lighter to-transparent -z-10" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-dark-lighter to-transparent -z-10" aria-hidden="true" />
    </section>
  )
}

export default Features
