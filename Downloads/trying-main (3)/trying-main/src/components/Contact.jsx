import { motion } from 'framer-motion'
import { contactContainer, contactItem } from '../utils/animationVariants'
import { Mail, Clock } from 'lucide-react'

// Simple Discord icon (inline SVG)
const DiscordIcon = ({ size = 32, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 71 55" fill="currentColor" xmlns="http://www.w3.org/2000/svg" className={className}>
    <path d="M60.1045 4.8978C55.5792 2.8214 50.7265 1.2916 45.6527 0.41542C45.5603 0.39851 45.468 0.440769 45.4204 0.525289C44.7963 1.6353 44.105 3.0834 43.6209 4.2216C38.1637 3.4046 32.7345 3.4046 27.3892 4.2216C26.905 3.0581 26.1886 1.6353 25.5617 0.525289C25.5141 0.443589 25.4218 0.40133 25.3294 0.41542C20.2584 1.2888 15.4057 2.8186 10.8776 4.8978C10.8384 4.9147 10.8048 4.9429 10.7825 4.9795C1.57795 18.7309 -0.943561 32.1443 0.293408 45.3914C0.299005 45.4562 0.335386 45.5182 0.385761 45.5576C6.45866 50.0174 12.3413 52.7249 18.1147 54.5195C18.2071 54.5477 18.305 54.5139 18.3638 54.4378C19.7295 52.5728 20.9469 50.6063 21.9907 48.5383C22.0523 48.4172 21.9935 48.2735 21.8676 48.2256C19.9366 47.4931 18.0979 46.6 16.3292 45.5858C16.1893 45.5041 16.1781 45.304 16.3068 45.2082C16.679 44.9293 17.0513 44.6391 17.4067 44.3461C17.471 44.2926 17.5606 44.2813 17.6362 44.3151C29.2558 49.6202 41.8354 49.6202 53.3179 44.3151C53.3935 44.2785 53.4831 44.2898 53.5502 44.3433C53.9057 44.6363 54.2779 44.9293 54.6529 45.2082C54.7816 45.304 54.7732 45.5041 54.6333 45.5858C52.8646 46.6197 51.0259 47.4931 49.0921 48.2228C48.9662 48.2707 48.9102 48.4172 48.9718 48.5383C50.038 50.6034 51.2554 52.5699 52.5959 54.435C52.6519 54.5139 52.7526 54.5477 52.845 54.5195C58.6464 52.7249 64.529 50.0174 70.6019 45.5576C70.6551 45.5182 70.6887 45.459 70.6943 45.3942C72.1747 30.0791 68.2147 16.7757 60.1968 4.9823C60.1772 4.9429 60.1437 4.9147 60.1045 4.8978ZM23.7259 37.3253C20.2276 37.3253 17.3451 34.1136 17.3451 30.1693C17.3451 26.225 20.1717 23.0133 23.7259 23.0133C27.308 23.0133 30.1626 26.2532 30.1066 30.1693C30.1066 34.1136 27.28 37.3253 23.7259 37.3253ZM47.3178 37.3253C43.8196 37.3253 40.9371 34.1136 40.9371 30.1693C40.9371 26.225 43.7636 23.0133 47.3178 23.0133C50.9 23.0133 53.7545 26.2532 53.6986 30.1693C53.6986 34.1136 50.9 37.3253 47.3178 37.3253Z" />
  </svg>
)

const Contact = () => {
  const contactItems = [
    {
      icon: Mail,
      title: 'Email Support',
      description: 'Get help from our support team',
      contact: 'support@xenosservices.com',
      link: 'mailto:support@xenosservices.com',
      color: 'from-red-500 to-pink-500',
    },
    {
      icon: DiscordIcon,
      title: 'Discord Community',
      description: 'Join our server for real-time support',
      contact: 'discord.gg/xenosud',
      link: 'https://discord.gg/xenosud',
      color: 'from-[#5865F2] to-[#4752C4]',
    },
    {
      icon: Clock,
      title: 'Response Time',
      description: 'Fast and reliable customer support',
      contact: 'Usually within 1 hour',
      link: null,
      color: 'from-cyan-500 to-blue-500',
    },
  ]

  return (
    <section id="contact" className="py-16 sm:py-20 bg-dark-lighter relative overflow-hidden scroll-mt-20 sm:scroll-mt-24 md:scroll-mt-32 px-4 sm:px-6">
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.38 }}
          className="text-center mb-12 sm:mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
          >
            <span className="px-6 py-2.5 bg-primary/10 border border-primary/30 rounded-full text-primary text-sm font-semibold backdrop-blur-sm inline-block mb-6">
              Support & Community
            </span>
          </motion.div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-5 text-gradient leading-tight break-words">Get in Touch</h2>
          <p className="text-base sm:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed px-4">
            Our team is here to help. Choose your preferred way to connect with us.
          </p>
        </motion.div>

        <motion.div variants={contactContainer} initial="hidden" whileInView="show" viewport={{ once: true }} className="grid md:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          {contactItems.map((contact, index) => (
            <motion.div
              key={index}
              variants={contactItem}
              whileHover={{ y: -8, scale: 1.03 }}
              className="group relative bg-gradient-to-b from-dark-card/90 to-dark-card/70 backdrop-blur-lg rounded-2xl p-8 border border-primary/30 hover:border-primary/60 transition-all duration-300 overflow-hidden shadow-xl hover:shadow-2xl hover:shadow-primary/10"
            >
              {/* Animated background gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/0 via-primary/10 to-primary/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute -top-20 -right-20 w-40 h-40 bg-primary/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10 flex flex-col items-center h-full">
                <motion.div 
                  whileHover={{ rotate: 5, scale: 1.08 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
                  className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary/20 to-primary/5 border border-primary/30 flex items-center justify-center mb-6 shadow-lg group-hover:shadow-xl group-hover:shadow-primary/20 transition-all duration-300 group-hover:border-primary/50"
                >
                  <contact.icon className="text-primary drop-shadow-lg" size={32} />
                </motion.div>
                
                <h3 className="text-xl font-bold text-white mb-2 group-hover:text-primary transition-colors duration-300">{contact.title}</h3>
                <p className="text-gray-400 text-sm mb-6 leading-relaxed text-center">{contact.description}</p>

                <div className="mt-auto w-full">
                  {contact.link ? (
                    contact.title === 'Discord Community' ? (
                      <motion.a
                        href={contact.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        aria-label="Join Discord"
                        className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-gradient-to-r from-[#5865F2] to-[#4752C4] hover:from-[#4752C4] hover:to-[#3c45b2] text-white text-sm font-semibold shadow-lg shadow-[#5865F2]/30 hover:shadow-xl hover:shadow-[#5865F2]/40 transition-all duration-300"
                      >
                        <DiscordIcon size={18} />
                        Join Discord
                      </motion.a>
                    ) : (
                      <motion.a
                        href={contact.link}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                        className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-primary/10 border border-primary/40 text-primary text-sm font-semibold hover:bg-primary/20 hover:border-primary/60 transition-all duration-300 shadow-md hover:shadow-lg hover:shadow-primary/10"
                        target={contact.link.startsWith('http') ? '_blank' : undefined}
                        rel={contact.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      >
                        <Mail size={18} />
                        Send Email
                      </motion.a>
                    )
                  ) : (
                    <div className="inline-flex items-center justify-center gap-2 w-full px-6 py-3.5 rounded-xl bg-primary/10 border border-primary/40 text-primary text-sm font-semibold shadow-md">
                      <Clock size={18} />
                      {contact.contact}
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-dark-lighter to-transparent -z-10" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-dark-lighter to-transparent -z-10" aria-hidden="true" />
    </section>
  )
}

export default Contact
