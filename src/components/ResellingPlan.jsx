import { motion } from 'framer-motion'
import { Store, ShieldCheck, Headphones } from 'lucide-react'

const ResellingPlan = () => {
  return (
    <section id="reselling" className="py-20 bg-dark-lighter relative overflow-hidden scroll-mt-24 md:scroll-mt-32">
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-8 text-gradient leading-relaxed break-words pb-2">Reselling Plan</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Resell our products in a high demand market with simple, consistent value.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="bg-dark-card rounded-2xl p-6 border border-primary/20 card-glow hover:card-glow-hover"
          >
            <div className="flex items-center gap-3 mb-3">
              <Store className="text-primary" size={22} />
              <h3 className="text-xl font-bold">No requirements</h3>
            </div>
            <p className="text-gray-400">Start immediately. Focus on sales and service.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="bg-dark-card rounded-2xl p-6 border border-primary/20 card-glow hover:card-glow-hover"
          >
            <div className="flex items-center gap-3 mb-3">
              <Headphones className="text-primary" size={22} />
              <h3 className="text-xl font-bold">Support policy</h3>
            </div>
            <p className="text-gray-400">You handle customer support directly. Forwarding to the main team isn’t allowed.</p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-dark-card rounded-2xl p-6 border border-primary/20 card-glow hover:card-glow-hover"
          >
            <div className="flex items-center gap-3 mb-3">
              <ShieldCheck className="text-primary" size={22} />
              <h3 className="text-xl font-bold">Terms & rules</h3>
            </div>
            <p className="text-gray-400">Applying means you agree to the ToS and reseller rules. For details, open a ticket on Discord.</p>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mt-10 flex flex-col sm:flex-row gap-4 justify-center"
        >
          <a
            href="https://discord.gg/xenosud"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Apply on Discord"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:from-[#4752C4] hover:to-[#3c45b2] text-white shadow-lg shadow-[#5865F2]/30 transition-all"
          >
            <svg width="20" height="20" viewBox="0 0 71 55" fill="currentColor" aria-hidden="true">
              <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default ResellingPlan
