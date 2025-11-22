import { motion } from 'framer-motion'
import { fadeUp } from '../utils/animationVariants'
import { handleSmoothScroll } from '../utils/smoothScroll'

const Footer = () => {
  const quickLinks = [
    { name: 'Features', href: '#about' },
    { name: 'Products', href: '#products' },
    { name: 'Contact', href: '#contact' },
    { name: 'Discord', href: 'https://discord.gg/xenosud', external: true },
  ]

  return (
    <footer className="bg-dark border-t border-primary/20 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          {/* Brand Section */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }}>
            <div className="flex items-center space-x-3 mb-4">
              <img
                src="/assets/icons/favicon-32x32.png"
                alt="Xenos logo"
                className="w-8 h-8"
              />
              <span className="text-xl font-bold text-gradient">Xenos Services</span>
            </div>
            <p className="text-gray-400">Premium digital solutions for the modern world.</p>
          </motion.div>

          {/* Quick Links */}
          <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="md:text-right">
            <h4 className="text-lg font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <a
                    href={link.href}
                    onClick={link.external ? undefined : (e) => handleSmoothScroll(e, link.href)}
                    target={link.external ? '_blank' : undefined}
                    rel={link.external ? 'noopener noreferrer' : undefined}
                    className="text-gray-400 hover:text-primary transition-colors duration-300"
                  >
                    {link.name}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Copyright */}
        <motion.div variants={fadeUp} initial="hidden" whileInView="show" viewport={{ once: true }} className="border-t border-primary/20 pt-8">
          <p className="text-gray-400 text-center">
            &copy; {new Date().getFullYear()} Xenos Services. All rights reserved.
          </p>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer
