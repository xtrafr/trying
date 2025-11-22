import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Eye, X, ExternalLink } from 'lucide-react'
import { PRODUCTS_DATA } from '../data/products'
import { ProductCardSkeleton } from './SkeletonLoader'
import RippleButton from './RippleButton'
import { ProductTiltCard } from './TiltCard'
import { ProductImage, GalleryImage } from './ProgressiveImage'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedTier, setSelectedTier] = useState(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [lightboxImage, setLightboxImage] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  // Load static products data on mount
  useEffect(() => {
    setLoading(true)
    // Simulate loading for better UX
    setTimeout(() => {
      setProducts(PRODUCTS_DATA)
      setLoading(false)
    }, 500)
  }, [])

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
    <section id="products" className="py-12 sm:py-16 md:py-20 bg-dark-lighter relative overflow-hidden scroll-mt-20 md:scroll-mt-24 lg:scroll-mt-32">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5 pointer-events-none select-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-primary rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="text-center mb-8 sm:mb-12 md:mb-16"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 sm:mb-4 text-gradient leading-tight break-words">Our Products</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mx-auto max-w-3xl">Discover our premium digital solutions</p>
        </motion.div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {[...Array(6)].map((_, index) => (
              <ProductCardSkeleton key={index} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
            {products.map((product, index) => (
            <ProductTiltCard
              key={product._id}
              product={product}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05, duration: 0.4, ease: "easeOut" }}
              onClick={() => openModal(product)}
            >
              {/* Product Image */}
              <div className="relative w-full h-40 sm:h-48 bg-dark-lighter overflow-hidden">
                <ProductImage 
                  product={product}
                  lazy={index > 0}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchpriority={index === 0 ? 'high' : 'low'}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card to-transparent opacity-60" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-150 ease-out bg-dark/50 backdrop-blur-sm">
                  <div className="text-center">
                    <Eye className="mx-auto mb-2 text-primary" size={24} />
                    <span className="text-white font-semibold text-xs sm:text-sm">View Details</span>
                  </div>
                </div>
                {product.inStock ? (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-green-500 text-white text-xs font-semibold rounded-full">
                    In Stock
                  </span>
                ) : (
                  <span className="absolute top-2 right-2 px-2 py-1 bg-red-500 text-white text-xs font-semibold rounded-full">
                    Out of Stock
                  </span>
                )}
              </div>

              {/* Product Content */}
              <div className="p-5 sm:p-6 flex flex-col h-full">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white mb-1">{product.name}</h3>
                    <p className="text-xs sm:text-sm text-primary">{product.category}</p>
                  </div>
                </div>

                <p className="text-gray-400 text-xs sm:text-sm mb-4 line-clamp-2">{product.description}</p>

                <div className="mb-4 inline-flex items-baseline gap-2">
                  {product.price.includes('-') ? (
                    <>
                      <span className="text-xs text-gray-500 font-medium">from</span>
                      <span className="text-xl font-semibold text-primary">{product.price.split(' - ')[0]}</span>
                    </>
                  ) : (
                    <span className="text-xl font-semibold text-primary">{product.price}</span>
                  )}
                </div>

                {/* Features Preview */}
                <div className="mb-4 flex-grow">
                  <h4 className="text-sm font-semibold text-gray-300 mb-2">Key Features:</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1.5 bg-primary/10 text-primary text-xs rounded-md border border-primary/30"
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
              </div>
            </ProductTiltCard>
          ))}
        </div>
        )}
      </div>

      {/* Product Modal */}
      {selectedProduct && createPortal(
        <div
          className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-lg grid place-items-center p-3 sm:p-4 min-h-screen"
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
            className="bg-[#0f1218] rounded-2xl max-w-[95vw] sm:max-w-3xl md:max-w-5xl lg:max-w-6xl w-full max-h-[90vh] border border-primary/30 shadow-2xl relative flex flex-col overflow-hidden modal-content"
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
          >
              {/* Modal Header */}
              <div className="border-b border-primary/20 p-5 sm:p-6 flex items-center justify-between flex-shrink-0 bg-[#1a1d24]">
                <div>
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white tracking-tight">{selectedProduct.name}</h2>
                  {selectedProduct.category && (
                    <p className="text-primary/90 text-sm sm:text-base mt-1.5 font-medium">{selectedProduct.category}</p>
                  )}
                </div>
                <button
                  onClick={closeModal}
                  className="p-2.5 hover:bg-primary/20 rounded-xl transition-all duration-200 group"
                  aria-label="Close modal"
                >
                  <X className="text-gray-400 group-hover:text-primary transition-colors" size={24} />
                </button>
              </div>

              {/* Modal Body - Two Column Layout */}
              <div className="p-4 sm:p-6 modal-scrollable custom-scrollbar flex-1 min-h-0 overflow-auto">
                <div className="grid lg:grid-cols-[400px,1fr] gap-6">
                  {/* Left Column - Image & Price */}
                  <div className="space-y-4">
                    {/* Product Image - Smaller */}
                    <div className="rounded-xl overflow-hidden border border-primary/20 bg-[#1a1d24]">
                      <img
                        src={selectedProduct.image}
                        alt={selectedProduct.name}
                        className="w-full h-56 sm:h-64 object-cover"
                        loading="eager"
                        decoding="async"
                        fetchpriority="high"
                      />
                    </div>

                    {/* Price Display - Better Layout */}
                    <div className="bg-gradient-to-br from-primary/10 to-primary/5 rounded-xl p-6 border border-primary/30">
                      {selectedProduct.price.includes('-') ? (
                        <div>
                          <p className="text-[11px] text-gray-400 font-semibold uppercase tracking-wider mb-2.5">Starting from</p>
                          <div className="text-5xl sm:text-6xl font-black text-primary mb-2 tracking-tight leading-none">
                            {selectedProduct.price.split(' - ')[0]}
                          </div>
                          <p className="text-xs text-gray-500 font-medium">One-time payment</p>
                        </div>
                      ) : (
                        <div>
                          <div className="text-5xl sm:text-6xl font-black text-primary mb-2 tracking-tight leading-none">
                            {selectedProduct.price}
                          </div>
                          <p className="text-xs text-gray-500 font-medium">One-time payment</p>
                        </div>
                      )}
                    </div>

                    {/* Pricing Tiers - Better Grid */}
                    {selectedProduct.pricingTiers && (
                      <div className="bg-[#1a1d24] rounded-xl p-5 border border-primary/20">
                        <h3 className="text-xs font-black text-white mb-4 uppercase tracking-wider">Select Duration</h3>
                        <div className="grid grid-cols-2 gap-2.5">
                          {selectedProduct.pricingTiers.map((tier) => (
                            <button
                              key={tier.value}
                              onClick={() => setSelectedTier(tier)}
                              className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                                selectedTier?.value === tier.value
                                  ? 'border-primary bg-primary shadow-lg shadow-primary/30 scale-105'
                                  : 'border-primary/20 bg-[#0f1218] hover:border-primary/50 hover:bg-[#1a1d24]'
                              }`}
                            >
                              <div className={`text-lg font-black tracking-tight ${selectedTier?.value === tier.value ? 'text-white' : 'text-primary'}`}>{tier.price}</div>
                              <div className={`text-[10px] uppercase tracking-wider font-bold mt-1 ${selectedTier?.value === tier.value ? 'text-white/90' : 'text-gray-500'}`}>{tier.label}</div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Description - Compact */}
                    <div className="bg-[#1a1d24] rounded-xl p-5 border border-primary/20">
                      <h3 className="text-xs font-black text-white mb-3 uppercase tracking-wider">About</h3>
                      <p className="text-sm text-gray-300 leading-relaxed font-normal">{selectedProduct.description}</p>
                    </div>
                  </div>

                  {/* Right Column - Features & Content */}
                  <div className="space-y-5">
                    {/* Compatibility */}
                    {selectedProduct.compatibility && (
                      <div className="bg-[#1a1d24] rounded-xl p-5 border border-primary/20">
                        <h3 className="text-xs font-black text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                          <div className="w-1 h-5 bg-primary rounded-full"></div>
                          Compatibility
                        </h3>
                        <ul className="space-y-2.5">
                          {selectedProduct.compatibility.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3 text-sm text-gray-300 font-normal leading-relaxed">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Features */}
                    <div className="bg-[#1a1d24] rounded-xl p-5 border border-primary/20">
                      <h3 className="text-xs font-black text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                        <div className="w-1 h-5 bg-primary rounded-full"></div>
                        Core Features
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {selectedProduct.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2.5 bg-[#0f1218] px-3.5 py-3 rounded-lg border border-primary/10">
                            <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                            <span className="text-sm text-gray-300 font-normal leading-relaxed">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Visual Features */}
                    {selectedProduct.visualFeatures && (
                      <div className="bg-[#1a1d24] rounded-xl p-5 border border-primary/20">
                        <h3 className="text-xs font-black text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                          <div className="w-1 h-5 bg-primary rounded-full"></div>
                          Visual Features
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {selectedProduct.visualFeatures.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 bg-[#0f1218] px-3.5 py-3 rounded-lg border border-primary/10">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                              <span className="text-sm text-gray-300 font-normal leading-relaxed">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Aimbot Features */}
                    {selectedProduct.aimbotFeatures && (
                      <div className="bg-[#1a1d24] rounded-xl p-5 border border-primary/20">
                        <h3 className="text-xs font-black text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                          <div className="w-1 h-5 bg-primary rounded-full"></div>
                          Aimbot Features
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {selectedProduct.aimbotFeatures.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 bg-[#0f1218] px-3.5 py-3 rounded-lg border border-primary/10">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                              <span className="text-sm text-gray-300 font-normal leading-relaxed">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Misc Features */}
                    {selectedProduct.miscFeatures && (
                      <div className="bg-[#1a1d24] rounded-xl p-5 border border-primary/20">
                        <h3 className="text-xs font-black text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                          <div className="w-1 h-5 bg-primary rounded-full"></div>
                          Additional Features
                        </h3>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                          {selectedProduct.miscFeatures.map((feature, idx) => (
                            <div key={idx} className="flex items-start gap-2.5 bg-[#0f1218] px-3.5 py-3 rounded-lg border border-primary/10">
                              <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                              <span className="text-sm text-gray-300 font-normal leading-relaxed">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Photo Gallery */}
                    {selectedProduct.gallery && selectedProduct.gallery.length > 0 && (
                      <div className="bg-[#1a1d24] rounded-xl p-5 border border-primary/20">
                        <h3 className="text-xs font-black text-white mb-4 uppercase tracking-wider flex items-center gap-2">
                          <Eye size={14} className="text-primary" />
                          Gallery ({selectedProduct.gallery.length})
                        </h3>
                        <div className="grid grid-cols-3 gap-2.5">
                          {selectedProduct.gallery.map((photo, idx) => (
                            <div
                              key={idx}
                              onClick={() => openLightbox(selectedProduct.gallery, idx)}
                              className="relative group rounded-lg overflow-hidden cursor-pointer border border-primary/20 hover:border-primary transition-all duration-300"
                            >
                              <GalleryImage
                                src={photo}
                                alt={`${selectedProduct.name} - Photo ${idx + 1}`}
                                className="h-20 sm:h-24"
                                lazy={false}
                                fetchpriority="low"
                                sizes="150px"
                              />
                              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                                <Eye className="text-white" size={16} />
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Videos */}
                    {selectedProduct.videos && selectedProduct.videos.length > 0 && (
                      <div className="bg-[#1a1d24] rounded-xl p-5 border border-primary/20">
                        <h3 className="text-xs font-black text-white mb-4 uppercase tracking-wider">Showcase Videos</h3>
                        <div className="space-y-3">
                          {selectedProduct.videos.map((video, idx) => (
                            <div key={idx} className="rounded-lg overflow-hidden border border-primary/20 bg-[#0f1218]">
                              {video.type === 'local' ? (
                                <video
                                  controls
                                  className="w-full h-48 object-cover bg-black"
                                  poster={video.thumbnail}
                                  preload="metadata"
                                >
                                  <source src={video.url} type="video/mp4" />
                                  Your browser does not support the video tag.
                                </video>
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
                              <div className="p-4">
                                <p className="text-sm text-gray-300 font-normal leading-relaxed">{video.description}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Buttons - Fixed at bottom */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-primary/20">
                  <button
                    onClick={closeModal}
                    className="flex-1 py-4 px-6 bg-[#1a1d24] hover:bg-[#23262e] text-white font-bold rounded-xl border-2 border-primary/30 hover:border-primary/50 transition-all duration-200 text-sm uppercase tracking-wider"
                  >
                    Close
                  </button>
                  {selectedProduct.inStock && (
                    <motion.button
                      onClick={handlePurchase}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-4 px-6 bg-gradient-to-r from-primary to-primary-dark hover:from-primary-dark hover:to-primary text-white font-black rounded-xl shadow-lg shadow-primary/50 transition-all duration-300 flex items-center justify-center group text-sm uppercase tracking-wider"
                    >
                      <ShoppingCart className="mr-2.5 group-hover:scale-110 transition-transform duration-300" size={18} />
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
      {/* Section edge fades (smooth background transition) */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-12 bg-gradient-to-b from-dark-lighter to-transparent -z-10" aria-hidden="true" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-dark-lighter to-transparent -z-10" aria-hidden="true" />
    </section>
  )
}

export default Products
