import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Eye, X, ExternalLink } from 'lucide-react'
import { PRODUCTS_DATA } from '../data/products'

const Products = () => {
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedTier, setSelectedTier] = useState(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [lightboxImage, setLightboxImage] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openModal = (product) => {
    // Save current scroll position
    const currentScroll = window.pageYOffset
    setScrollPosition(currentScroll)
    
    setSelectedProduct(product)
    setSelectedTier(product.pricingTiers ? product.pricingTiers[0] : null)
    
    // Prevent background scrolling and stop smooth scroll
    document.body.style.overflow = 'hidden'
    if (window.lenis) {
      try { window.lenis.stop() } catch {}
    }
  }

  const closeModal = () => {
    setSelectedProduct(null)
    setSelectedTier(null)
    
    // Re-enable background scrolling and resume smooth scroll
    document.body.style.overflow = ''
    if (window.lenis) {
      try { window.lenis.start() } catch {}
    }
    
    // Restore scroll position (safety)
    window.scrollTo(0, scrollPosition)
  }

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [])

  const handlePurchase = () => {
    if (!selectedProduct || !selectedTier) return
    
    const url = selectedProduct.sellauthUrls?.[selectedTier.value] || '#'
    window.open(url, '_blank')
  }

  const openLightbox = (images, index) => {
    setLightboxImage(images)
    setLightboxIndex(index)
  }

  const closeLightbox = () => {
    setLightboxImage(null)
    setLightboxIndex(0)
  }

  const nextImage = () => {
    if (lightboxImage && lightboxIndex < lightboxImage.length - 1) {
      setLightboxIndex(lightboxIndex + 1)
    }
  }

  const prevImage = () => {
    if (lightboxIndex > 0) {
      setLightboxIndex(lightboxIndex - 1)
    }
  }

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyPress = (e) => {
      if (!lightboxImage) return
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowRight') nextImage()
      if (e.key === 'ArrowLeft') prevImage()
    }
    window.addEventListener('keydown', handleKeyPress)
    return () => window.removeEventListener('keydown', handleKeyPress)
  }, [lightboxImage, lightboxIndex])

  return (
    <section id="products" className="py-20 bg-dark-lighter relative overflow-hidden scroll-mt-24 md:scroll-mt-32">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-gradient leading-tight break-words">Our Products</h2>
          <p className="text-xl text-gray-400">Discover our premium digital solutions</p>
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {PRODUCTS_DATA.map((product, index) => (
            <motion.div
              key={product._id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
              whileHover={{ y: -8, transition: { duration: 0.25, ease: "easeOut" } }}
              className="bg-dark-card rounded-2xl overflow-hidden border border-primary/20 hover:border-primary/50 transition-all duration-300 card-glow hover:card-glow-hover cursor-pointer group flex flex-col"
              onClick={() => openModal(product)}
              style={{ willChange: 'auto' }}
            >
              {/* Product Image */}
              <div className="relative w-full h-40 sm:h-48 bg-dark-lighter overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
                  loading="lazy"
                  decoding="async"
                  fetchpriority="low"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  onError={(e) => {
                    e.target.src = 'data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22400%22 height=%22300%22%3E%3Crect fill=%22%23151b2e%22 width=%22400%22 height=%22300%22/%3E%3Ctext x=%2250%25%22 y=%2250%25%22 font-size=%2220%22 fill=%22%2306b6d4%22 text-anchor=%22middle%22 dy=%22.3em%22%3EImage not found%3C/text%3E%3C/svg%3E'
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-out bg-dark/50 backdrop-blur-sm">
                  <div className="text-center">
                    <Eye className="mx-auto mb-2 text-primary" size={32} />
                    <span className="text-white font-semibold text-sm sm:text-base">View Details</span>
                  </div>
                </div>
                {product.inStock ? (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                    In Stock
                  </span>
                ) : (
                  <span className="absolute top-4 right-4 px-3 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Product Content */}
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-xl font-bold text-white mb-1">{product.name}</h3>
                    <p className="text-sm text-primary">{product.category}</p>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>

                <div className="text-2xl font-bold text-primary mb-4">{product.price}</div>

                {/* Features Preview */}
                <div className="mb-4 flex-grow">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md border border-primary/30"
                      >
                        {feature}
                      </span>
                    ))}
                    {product.features.length > 3 && (
                      <span className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-md border border-primary/30">
                        +{product.features.length - 3} more
                      </span>
                    )}
                  </div>
                </div>

                {/* View Details Button */}
                <motion.button
                  whileHover={{ scale: product.inStock ? 1.03 : 1 }}
                  whileTap={{ scale: product.inStock ? 0.98 : 1 }}
                  className={`group w-full py-3 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center ${
                    product.inStock
                      ? 'bg-primary hover:bg-primary-dark text-white shadow-lg shadow-primary/30'
                      : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                  }`}
                  disabled={!product.inStock}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (product.inStock) openModal(product)
                  }}
                >
                  <ShoppingCart className="mr-2 transition-transform duration-300 group-hover:translate-x-1" size={18} />
                  {product.inStock ? 'View Details' : 'Out of Stock'}
                </motion.button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Product Modal */}
      {selectedProduct && createPortal(
        <div
          className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-md grid place-items-center p-4 min-h-screen"
          onClick={closeModal}
          data-lenis-prevent
          role="dialog"
          aria-modal="true"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 400, duration: 0.3 }}
            className="bg-dark-card rounded-2xl max-w-4xl w-full max-h-[90vh] border border-primary/30 shadow-2xl relative flex flex-col overflow-hidden modal-content"
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
          >
              {/* Modal Header */}
              <div className="bg-dark-card/95 backdrop-blur-sm border-b border-primary/20 p-6 flex items-center justify-between flex-shrink-0">
                <div>
                  <h2 className="text-3xl font-bold text-white">{selectedProduct.name}</h2>
                  <p className="text-primary">{selectedProduct.category}</p>
                </div>
                <button
                  onClick={closeModal}
                  className="p-2 hover:bg-dark-lighter rounded-lg transition-colors"
                >
                  <X className="text-gray-400 hover:text-white" size={24} />
                </button>
              </div>

              {/* Modal Body */}
              <div className="p-6 modal-scrollable custom-scrollbar flex-1 min-h-0 overflow-auto">
                {/* Product Image */}
                <div className="mb-6 rounded-xl overflow-hidden">
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    className="w-full h-64 object-cover"
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                    sizes="100vw"
                  />
                </div>

                {/* Price */}
                <div className="text-3xl font-bold text-primary mb-6">{selectedProduct.price}</div>

                {/* Pricing Tiers */}
                {selectedProduct.pricingTiers && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Select Duration</h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {selectedProduct.pricingTiers.map((tier) => (
                        <button
                          key={tier.value}
                          onClick={() => setSelectedTier(tier)}
                          className={`p-4 rounded-lg border-2 transition-all duration-300 ${
                            selectedTier?.value === tier.value
                              ? 'border-primary bg-primary/10'
                              : 'border-primary/30 hover:border-primary/50'
                          }`}
                        >
                          <div className="text-xl font-bold text-primary">{tier.price}</div>
                          <div className="text-sm text-gray-400">{tier.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-400">{selectedProduct.description}</p>
                </div>

                {/* Photo Gallery */}
                {selectedProduct.gallery && selectedProduct.gallery.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <Eye className="mr-2" size={20} />
                      Photo Gallery ({selectedProduct.gallery.length} photos)
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                      {selectedProduct.gallery.map((photo, idx) => (
                        <div
                          key={idx}
                          onClick={() => openLightbox(selectedProduct.gallery, idx)}
                          className="relative group rounded-lg overflow-hidden cursor-pointer border-2 border-primary/20 hover:border-primary transition-all duration-300"
                        >
                          <img
                            src={photo}
                            alt={`${selectedProduct.name} - Photo ${idx + 1}`}
                            className="w-full h-40 object-cover group-hover:scale-110 transition-transform duration-500"
                            loading="lazy"
                            decoding="async"
                            fetchpriority="low"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Eye className="text-white" size={32} />
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/70 px-2 py-1 rounded text-xs text-white">
                            {idx + 1}/{selectedProduct.gallery.length}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Videos */}
                {selectedProduct.videos && selectedProduct.videos.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3 flex items-center">
                      <ShoppingCart className="mr-2" size={20} />
                      Product Videos
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {selectedProduct.videos.map((video, idx) => (
                        <div
                          key={idx}
                          className="rounded-lg overflow-hidden border-2 border-primary/20 hover:border-primary transition-all duration-300 bg-dark-lighter"
                        >
                          {video.type === 'local' ? (
                            <video
                              controls
                              className="w-full h-48 object-cover bg-black"
                              poster={video.thumbnail}
                            >
                              <source src={video.url} type="video/quicktime" />
                              <source src={video.url} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                          ) : video.url?.includes('streamable.com') ? (
                            <iframe
                              src={video.url}
                              title={video.title}
                              className="w-full h-64"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                              loading="lazy"
                              style={{ aspectRatio: '16/9' }}
                            ></iframe>
                          ) : (
                            <iframe
                              src={video.url}
                              title={video.title}
                              className="w-full h-48"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          )}
                          <div className="p-3">
                            <h4 className="text-white font-semibold text-sm mb-1">{video.title}</h4>
                            <p className="text-gray-400 text-xs">{video.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Compatibility */}
                {selectedProduct.compatibility && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Compatibility</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.compatibility.map((item, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-2 bg-primary/10 text-primary text-sm rounded-lg border border-primary/30"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Features */}
                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-white mb-3">Features</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-2 bg-primary/10 text-primary text-sm rounded-lg border border-primary/30"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Additional Feature Sections */}
                {selectedProduct.visualFeatures && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Visual Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.visualFeatures.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-2 bg-primary/10 text-primary text-sm rounded-lg border border-primary/30"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProduct.aimbotFeatures && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Aimbot Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.aimbotFeatures.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-2 bg-primary/10 text-primary text-sm rounded-lg border border-primary/30"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {selectedProduct.miscFeatures && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold text-white mb-3">Misc Features</h3>
                    <div className="flex flex-wrap gap-2">
                      {selectedProduct.miscFeatures.map((feature, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-2 bg-primary/10 text-primary text-sm rounded-lg border border-primary/30"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-4 mt-8">
                  <button
                    onClick={closeModal}
                    className="flex-1 py-3 px-6 bg-dark-lighter hover:bg-dark text-white font-semibold rounded-lg border border-primary/30 transition-all duration-300"
                  >
                    Close
                  </button>
                  {selectedProduct.inStock && (
                    <motion.button
                      onClick={handlePurchase}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-3 px-6 bg-primary hover:bg-primary-dark text-white font-semibold rounded-lg shadow-lg shadow-primary/30 transition-all duration-300 flex items-center justify-center group"
                    >
                      <ExternalLink className="mr-2 group-hover:translate-x-1 group-hover:rotate-12 transition-all duration-300" size={20} />
                      Purchase Now
                    </motion.button>
                  )}
                </div>
              </div>
          </motion.div>
        </div>,
        document.body
      )}

      {/* Photo Lightbox (rendered above modal) */}
      {lightboxImage && createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[80] bg-black/95 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeLightbox}
        >
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 p-3 bg-dark-card/80 hover:bg-dark-card rounded-full transition-all duration-300 z-10"
          >
            <X className="text-white" size={24} />
          </button>

          {lightboxImage.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  prevImage()
                }}
                disabled={lightboxIndex === 0}
                className={`absolute left-4 p-3 bg-dark-card/80 hover:bg-dark-card rounded-full transition-all duration-300 ${
                  lightboxIndex === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation()
                  nextImage()
                }}
                disabled={lightboxIndex === lightboxImage.length - 1}
                className={`absolute right-4 p-3 bg-dark-card/80 hover:bg-dark-card rounded-full transition-all duration-300 ${
                  lightboxIndex === lightboxImage.length - 1 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </>
          )}

          <motion.div
            key={lightboxIndex}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage[lightboxIndex]}
              alt={`Photo ${lightboxIndex + 1}`}
              className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
              loading="eager"
              decoding="async"
            />
          </motion.div>

          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-dark-card/80 px-4 py-2 rounded-full">
            <span className="text-white font-semibold">
              {lightboxIndex + 1} / {lightboxImage.length}
            </span>
          </div>
        </motion.div>,
        document.body
      )}
    </section>
  )
}

export default Products
