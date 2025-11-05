import { motion } from 'framer-motion'
import { Star, User, Clock } from 'lucide-react'

const Testimonials = () => {
  const testimonials = [
    {
      name: 'z3r0',
      initials: 'JD',
      role: 'Competitive Player',
      rating: 5,
      text: 'Bro this shit is actually insane. Been using it for months and still undetected. The features are crazy good and support always got your back when you need help.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      name: 'maverick',
      initials: 'MK',
      role: 'Content Creator',
      rating: 5,
      text: 'Yo the unlock all feature is perfect for making content. Interface is clean af, runs smooth, and I haven\'t had a single detection issue. Literally couldn\'t ask for better.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      name: 'nexxus',
      initials: 'AL',
      role: 'Casual Players',
      rating: 5,
      text: 'Ngl Xenos completely changed my gameplay. The aimbot is smooth as hell and looks natural. Been rocking it for 6+ months without a ban, highly recommend fr.',
      color: 'from-primary to-blue-500'
    },
    {
      name: '0st3r',
      initials: 'TS',
      role: 'Casual Player',
      rating: 5,
      text: 'Best money I\'ve spent. Spoofer works like a charm and the support team helped me get everything set up. Zero issues, works perfectly every single time. 10/10',
      color: 'from-green-500 to-emerald-500'
    },
    {
      name: 'void',
      initials: 'RW',
      role: 'Streamer',
      rating: 5,
      text: 'The quality is insane for the price ngl. Skin changer has literally every skin you could want. Setup was easy af and shit just works. Definitely staying long term.',
      color: 'from-orange-500 to-red-500'
    },
    {
      name: 'n3on',
      initials: 'NK',
      role: 'Tournament Player',
      rating: 5,
      text: 'The private cheat is unmatched fr. So many features and completely undetected. Discord community is helpful and active. Worth every penny bro, no cap.',
      color: 'from-cyan-500 to-blue-500'
    },
  ]

  return (
    <section className="py-32 bg-gradient-to-br from-dark via-dark-lighter to-dark relative overflow-hidden">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none select-none">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-gradient-to-br from-primary/40 to-purple-500/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '4s' }} />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-tr from-blue-500/40 to-primary/40 rounded-full blur-3xl animate-pulse" style={{ animationDuration: '5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-cyan-500/30 to-blue-500/30 rounded-full blur-3xl" />
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
                <div className="relative bg-dark-card/80 backdrop-blur-xl rounded-2xl p-8 transition-all duration-150 shadow-xl hover:shadow-2xl h-full flex flex-col items-stretch text-left min-h-[240px]">
                {/* Anonymous icon header */}
                <div className="mb-6 relative z-10 text-center">
                  <motion.img 
                    src={`https://api.dicebear.com/7.x/thumbs/svg?seed=${encodeURIComponent(testimonial.name)}`}
                    alt={`${testimonial.name} avatar`}
                    className="w-16 h-16 rounded-full shadow-lg group-hover:shadow-xl transition-shadow duration-300 mx-auto bg-dark-card object-cover"
                    whileHover={{ scale: 1.06 }}
                    transition={{ duration: 0.3 }}
                  />
                  <div className="mt-3">
                    <div className="text-white font-semibold text-base tracking-wide">{testimonial.name}</div>
                    <div className="text-gray-500 text-xs">{testimonial.role}</div>
                  </div>
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-5 justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.08 + (i * 0.05) }}
                    >
                      <Star size={18} className="text-yellow-500 fill-yellow-500 drop-shadow-lg" />
                    </motion.div>
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-gray-300 leading-relaxed text-base mt-auto text-center hyphens-auto balance-text" style={{ textJustify: 'inter-word' }}>
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
      {/* Section edge fades (smooth background transition) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-dark to-transparent -z-10" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-dark to-transparent -z-10" aria-hidden="true" />
      {/* Section edge fades (smooth background transition) */}
    </section>
  )
}

export default Testimonials
