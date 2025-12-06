import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { handleSmoothScroll } from '../utils/smoothScroll'
import { useScrollSpy } from '../hooks/useScrollSpy'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrollingTo, setScrollingTo] = useState(null)
  
  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'Products', href: '#products' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ]
  
  const activeSection = useScrollSpy(navLinks.map(link => link.href.replace('#', '')))

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (e, href) => {
    setScrollingTo(href.replace('#', ''))
    handleSmoothScroll(e, href)
    
    // Reset scrolling state after animation completes
    setTimeout(() => {
      setScrollingTo(null)
    }, 1500)
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-dark/90 backdrop-blur-xl shadow-2xl shadow-primary/10' : 'bg-transparent'
      }`}
      style={{ 
        backdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none', 
        WebkitBackdropFilter: isScrolled ? 'blur(20px) saturate(180%)' : 'none',
        borderBottom: isScrolled ? '1px solid rgba(6, 182, 212, 0.1)' : 'none'
      }}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-4 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo */}
          <motion.a
            href="#home"
            className="flex items-center space-x-3 group"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src="/assets/icons/favicon-32x32.png"
              alt="Xenos logo"
              className="w-8 h-8 group-hover:animate-pulse"
            />
            <span className="text-lg sm:text-xl font-bold text-gradient">xenos.lol</span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link, index) => {
              const isActive = activeSection === link.href.replace('#', '')
              const isScrolling = scrollingTo === link.href.replace('#', '')
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`text-gray-300 hover:text-primary transition-all duration-300 font-medium relative group ${
                    isActive || isScrolling ? 'text-primary' : ''
                  }`}
                >
                  {link.name}
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-300" />
                  {(isActive || isScrolling) && (
                    <motion.div
                      className="absolute bottom-0 left-0 w-full h-0.5 bg-primary"
                      layoutId="activeNav"
                      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                    />
                  )}
                  {isScrolling && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full"
                      animate={{ scale: [1, 1.5, 1] }}
                      transition={{ duration: 0.5, repeat: 2 }}
                    />
                  )}
                </motion.a>
              )
            })}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden text-white p-2 sm:p-3 rounded-xl hover:bg-dark-lighter transition-all duration-300 active:scale-95 touch-manipulation"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X size={20} className="sm:w-6 sm:h-6" /> : <Menu size={20} className="sm:w-6 sm:h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="lg:hidden bg-dark-lighter/95 backdrop-blur-xl border-t border-primary/20 overflow-hidden"
            style={{ backdropFilter: 'blur(20px) saturate(180%)', WebkitBackdropFilter: 'blur(20px) saturate(180%)' }}
          >
            <motion.div 
              className="px-4 sm:px-6 py-4 sm:py-6 space-y-1"
              initial={{ y: -20 }}
              animate={{ y: 0 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
            >
              {navLinks.map((link, index) => {
                const isActive = activeSection === link.href.replace('#', '')
                const isScrolling = scrollingTo === link.href.replace('#', '')
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => {
                      handleNavClick(e, link.href)
                      setIsMobileMenuOpen(false)
                    }}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.3 }}
                    whileTap={{ scale: 0.98 }}
                    className={`block text-gray-300 hover:text-primary transition-all duration-200 font-medium py-4 px-4 rounded-lg hover:bg-dark/50 touch-manipulation text-base min-h-[56px] flex items-center justify-between ${
                      isActive || isScrolling ? 'text-primary bg-dark/50' : ''
                    }`}
                  >
                    <span>{link.name}</span>
                    {(isActive || isScrolling) && (
                      <motion.div
                        className="w-2 h-2 bg-primary rounded-full"
                        animate={isScrolling ? { scale: [1, 1.5, 1] } : {}}
                        transition={{ duration: 0.5, repeat: isScrolling ? 2 : 0 }}
                      />
                    )}
                  </motion.a>
                )
              })}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  )
}

export default Navbar
