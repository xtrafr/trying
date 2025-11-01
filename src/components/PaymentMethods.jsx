import { motion } from 'framer-motion'
import { CreditCard, Wallet, Smartphone, Coins, BadgeCheck, Shield, Building2, Gift } from 'lucide-react'

const MethodPill = ({ icon: Icon, label, customIcon }) => (
  <div className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-dark border border-primary/20 text-gray-200 shadow-sm">
    {customIcon ? customIcon : <Icon size={16} className="text-primary" />}
    <span className="text-sm font-medium">{label}</span>
  </div>
)

const PaymentMethods = () => {
  return (
    <section id="payments" className="py-20 bg-dark-lighter relative overflow-hidden scroll-mt-24 md:scroll-mt-32">
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
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gradient leading-tight break-words">Accepted Payment Methods</h2>
          <p className="text-lg text-gray-400 max-w-3xl mx-auto">
            Fast, secure checkout with trusted providers. Don’t see your method? Open a ticket on Discord and we’ll help you out.
          </p>
        </motion.div>

        {/* Animated brand marquee */}
        <div className="logo-marquee mb-10">
          <div className="logo-track">
            {['Visa','Mastercard','PayPal','Google Pay','Apple Pay','Bitcoin','Ethereum','Litecoin','Binance','USDT','Visa','Mastercard','PayPal','Google Pay','Apple Pay','Bitcoin','Ethereum','Litecoin','Binance','USDT','Visa','Mastercard','PayPal','Google Pay','Apple Pay','Bitcoin','Ethereum','Litecoin','Binance','USDT'].map((brand, idx) => (
              <div key={idx} className="badge-logo">
                {brand === 'Mastercard' && (
                  <svg width="22" height="14" viewBox="0 0 36 24" aria-label="Mastercard" className="flex-shrink-0">
                    <circle cx="12" cy="12" r="10" fill="#EB001B"/>
                    <circle cx="24" cy="12" r="10" fill="#F79E1B"/>
                  </svg>
                )}
                {brand === 'Visa' && (
                  <div className="px-2 py-1 rounded bg-[#1A1F71] text-white text-xs font-bold">VISA</div>
                )}
                {brand === 'PayPal' && (
                  <div className="px-2 py-1 rounded bg-[#003087] text-white text-xs font-semibold">PayPal</div>
                )}
                {brand === 'Google Pay' && (
                  <div className="px-2 py-1 rounded bg-[#202124] text-white text-xs font-semibold">G Pay</div>
                )}
                {brand === 'Apple Pay' && (
                  <div className="px-3 py-1 rounded bg-black text-white text-xs font-semibold flex items-center gap-1">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" className="flex-shrink-0">
                      <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                    </svg>
                    Pay
                  </div>
                )}
                {brand === 'Litecoin' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-label="Litecoin" className="flex-shrink-0">
                    <circle cx="12" cy="12" r="10" fill="#345D9D"/>
                    <text x="12" y="16" textAnchor="middle" fontSize="10" fontFamily="Inter, system-ui" fill="#fff">Ł</text>
                  </svg>
                )}
                {brand === 'Binance' && (
                  <svg width="18" height="18" viewBox="0 0 24 24" aria-label="Binance" className="flex-shrink-0">
                    <rect width="24" height="24" rx="6" fill="#F3BA2F"/>
                    <path d="M12 6l2 2-2 2-2-2 2-2zm0 8l2 2-2 2-2-2 2-2zm6-6l2 2-6 6-2-2 6-6zM6 12l2 2-2 2-2-2 2-2z" fill="#0B0E11"/>
                  </svg>
                )}
                {brand === 'Bitcoin' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-label="Bitcoin" className="flex-shrink-0">
                    <circle cx="12" cy="12" r="10" fill="#F7931A"/>
                    <path d="M13.5 10.5c.8-.3 1.3-1 1.2-1.9-.2-1.2-1.3-1.6-2.6-1.7V5.5h-1v1.3h-.8V5.5h-1v1.4H7.5v1h.6c.3 0 .5.2.5.5v4.2c0 .3-.2.5-.5.5H7.5v1h1.8v1.4h1v-1.4h.8v1.4h1v-1.4c1.5-.1 2.6-.6 2.7-2 .1-1.1-.4-1.7-1.3-2zm-3.2-2.3h1.3c.6 0 1.5.1 1.5.9 0 .7-.7.9-1.4.9h-1.4V8.2zm1.5 5.6h-1.5v-2h1.5c.8 0 1.6.2 1.6 1s-.8 1-1.6 1z" fill="white"/>
                  </svg>
                )}
                {brand === 'Ethereum' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-label="Ethereum" className="flex-shrink-0">
                    <circle cx="12" cy="12" r="10" fill="#627EEA"/>
                    <path d="M12 4l-5 8.5 5 3 5-3L12 4z" fill="white" opacity="0.6"/>
                    <path d="M12 15.5l-5-3L12 20l5-7.5-5 3z" fill="white"/>
                  </svg>
                )}
                {brand === 'USDT' && (
                  <svg width="20" height="20" viewBox="0 0 24 24" aria-label="USDT" className="flex-shrink-0">
                    <circle cx="12" cy="12" r="10" fill="#26A17B"/>
                    <text x="12" y="16" textAnchor="middle" fontSize="9" fontFamily="Inter, system-ui" fontWeight="bold" fill="white">₮</text>
                  </svg>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3 }}
            className="bg-dark-card rounded-2xl p-6 border border-primary/20 card-glow hover:card-glow-hover"
          >
            <div className="flex items-center gap-3 mb-4">
              <Shield className="text-primary" size={22} />
              <h3 className="text-xl font-bold">Regular Payments</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <MethodPill 
                icon={CreditCard} 
                label="Visa & Mastercard"
                customIcon={
                  <div className="flex items-center gap-1">
                    <svg width="20" height="12" viewBox="0 0 36 24" className="flex-shrink-0">
                      <circle cx="12" cy="12" r="10" fill="#EB001B"/>
                      <circle cx="24" cy="12" r="10" fill="#F79E1B"/>
                    </svg>
                  </div>
                }
              />
              <MethodPill 
                icon={Wallet} 
                label="PayPal F&F"
                customIcon={
                  <svg width="16" height="16" viewBox="0 0 24 24" className="flex-shrink-0">
                    <path fill="#003087" d="M20.067 8.478c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 0 1-.794.679H7.72a.483.483 0 0 1-.477-.558L9.718 7.08a.966.966 0 0 1 .953-.815h4.511c1.5 0 2.816.328 3.885 1.213z"/>
                    <path fill="#0070E0" d="M10.67 7.265a.966.966 0 0 1 .953-.815h4.511c.9 0 1.69.096 2.36.315a6.14 6.14 0 0 1 1.525.728c.492.88.556 2.014.3 3.327-.74 3.806-3.276 5.12-6.514 5.12h-.5a.805.805 0 0 0-.794.68l-.04.22-.63 3.993-.032.17a.804.804 0 0 1-.794.679H7.72a.483.483 0 0 1-.477-.558l2.427-14.86z"/>
                  </svg>
                }
              />
              <MethodPill 
                icon={Smartphone} 
                label="Google Pay"
                customIcon={
                  <svg width="16" height="16" viewBox="0 0 24 24" className="flex-shrink-0">
                    <path fill="#5F6368" d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                  </svg>
                }
              />
              <MethodPill 
                icon={Smartphone} 
                label="Apple Pay"
                customIcon={
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="white" className="flex-shrink-0">
                    <path d="M17.05 20.28c-.98.95-2.05.88-3.08.4-1.09-.5-2.08-.48-3.24 0-1.44.62-2.2.44-3.06-.4C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
                  </svg>
                }
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.05 }}
            className="bg-dark-card rounded-2xl p-6 border border-primary/20 card-glow hover:card-glow-hover"
          >
            <div className="flex items-center gap-3 mb-4">
              <Coins className="text-primary" size={22} />
              <h3 className="text-xl font-bold">Cryptocurrency</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <MethodPill 
                icon={Coins} 
                label="Litecoin"
                customIcon={
                  <svg width="16" height="16" viewBox="0 0 24 24" className="flex-shrink-0">
                    <circle cx="12" cy="12" r="10" fill="#345D9D"/>
                    <text x="12" y="16" textAnchor="middle" fontSize="10" fontFamily="Inter, system-ui" fill="#fff">Ł</text>
                  </svg>
                }
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="bg-dark-card rounded-2xl p-6 border border-primary/20 card-glow hover:card-glow-hover"
          >
            <div className="flex items-center gap-3 mb-4">
              <Building2 className="text-primary" size={22} />
              <h3 className="text-xl font-bold">Other Methods</h3>
            </div>
            <div className="flex flex-wrap gap-2">
              <MethodPill 
                icon={BadgeCheck} 
                label="Binance"
                customIcon={
                  <svg width="16" height="16" viewBox="0 0 126.61 126.61" className="flex-shrink-0">
                    <g fill="#F3BA2F">
                      <path d="M38.73 53.2l24.59-24.58 24.6 24.6 14.3-14.31L63.32 0 24.43 38.9l14.3 14.3z"/>
                      <path d="M0 63.31l14.3-14.3 14.31 14.3-14.31 14.3z"/>
                      <path d="M38.73 73.41l24.59 24.59 24.6-24.6 14.31 14.29-38.9 38.91-38.91-38.88 14.3-14.32z"/>
                      <path d="M98 63.31l14.3-14.3 14.31 14.3-14.31 14.3z"/>
                      <path d="M77.83 63.3L63.32 48.78 52.59 59.51l-1.24 1.23-2.54 2.54 14.51 14.5 14.51-14.47z"/>
                    </g>
                  </svg>
                }
              />
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.35, delay: 0.05 }}
          className="mt-10 text-center"
        >
          <a
            href="https://discord.gg/xenosud"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Open a ticket on Discord"
            className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:from-[#4752C4] hover:to-[#3c45b2] text-white shadow-lg shadow-[#5865F2]/30 transition-all"
          >
            <svg 
              width="22" height="22" viewBox="0 0 71 55" fill="currentColor" aria-hidden="true"
            >
              <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z"/>
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  )
}

export default PaymentMethods
