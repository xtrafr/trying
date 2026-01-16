import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ShoppingCart, Eye, X, ExternalLink } from 'lucide-react'
import { PRODUCTS_DATA } from '../data/products'
import { ProductCardSkeleton } from './SkeletonLoader'
import RippleButton from './RippleButton'
import { ProductTiltCard } from './TiltCard'
import { ProductImage, GalleryImage } from './ProgressiveImage'
import PaymentCheckout from './PaymentCheckout'
import OptimizedVideo from './OptimizedVideo'

const Products = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [selectedTier, setSelectedTier] = useState(null)
  const [scrollPosition, setScrollPosition] = useState(0)
  const [lightboxImage, setLightboxImage] = useState(null)
  const [lightboxIndex, setLightboxIndex] = useState(0)
  const [showPaymentCheckout, setShowPaymentCheckout] = useState(false)

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
    
    // Open the payment checkout modal
    setShowPaymentCheckout(true)
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
              <div className="relative w-full h-48 sm:h-56 bg-gradient-to-br from-dark-lighter to-dark overflow-hidden">
                <ProductImage 
                  product={product}
                  lazy={index > 0}
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchpriority={index === 0 ? 'high' : 'low'}
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-card via-transparent to-transparent" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out bg-black/60 backdrop-blur-md">
                  <div className="text-center transform scale-90 group-hover:scale-100 transition-transform duration-300">
                    <Eye className="mx-auto mb-2 text-primary drop-shadow-lg" size={32} />
                    <span className="text-white font-bold text-sm tracking-wide">View Details</span>
                  </div>
                </div>
                {product.inStock ? (
                  <span className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-green-500 to-green-600 text-white text-xs font-bold rounded-full shadow-lg">
                    ● In Stock
                  </span>
                ) : (
                  <span className="absolute top-3 right-3 px-3 py-1.5 bg-gradient-to-r from-red-500 to-red-600 text-white text-xs font-bold rounded-full shadow-lg">
                    ● Out of Stock
                  </span>
                )}
              </div>

              {/* Product Content */}
              <div className="p-6 flex flex-col h-full bg-gradient-to-b from-dark-card to-dark-lighter">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl sm:text-2xl font-black text-white mb-1.5 tracking-tight">{product.name}</h3>
                    {product.category && <p className="text-xs sm:text-sm text-primary font-semibold">{product.category}</p>}
                  </div>
                </div>

                <p className="text-gray-300 text-sm mb-5 line-clamp-3 leading-relaxed">{product.description}</p>

                <div className="mb-5 flex items-center gap-2">
                  <span className="text-xs text-gray-500 font-semibold uppercase tracking-wider">Starting at</span>
                  <span className="text-2xl font-black text-primary">
                    {product.price.includes('-') ? product.price.split(' - ')[0] : product.price}
                  </span>
                </div>

                {/* Features Preview */}
                <div className="flex-grow">
                  <h4 className="text-xs font-black text-gray-400 mb-3 uppercase tracking-wider">Top Features</h4>
                  <div className="flex flex-wrap gap-2">
                    {product.features.slice(0, 3).map((feature, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1.5 bg-gradient-to-r from-primary/15 to-primary/10 text-primary text-xs font-semibold rounded-lg border border-primary/30 hover:border-primary/50 transition-all duration-200"
                      >
                        {feature}
                      </span>
                    ))}
                    {product.features.length > 3 && (
                      <span className="px-3 py-1.5 bg-gradient-to-r from-primary/15 to-primary/10 text-primary text-xs font-bold rounded-lg border border-primary/30">
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
      {selectedProduct && !showPaymentCheckout && createPortal(
        <div
          className="fixed inset-0 z-[60] grid place-items-center p-3 sm:p-4 min-h-screen"
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.85)',
            backdropFilter: 'blur(10px)'
          }}
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
            style={{
              backgroundColor: '#0f1419',
              borderRadius: '24px',
              maxWidth: 'min(95vw, 900px)',
              width: '100%',
              maxHeight: '90vh',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              boxShadow: '0 25px 80px rgba(6, 182, 212, 0.2), 0 0 0 1px rgba(6, 182, 212, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
            className="relative modal-content"
            onClick={(e) => e.stopPropagation()}
            data-lenis-prevent
          >
              {/* Modal Header */}
              <div style={{
                borderBottom: '1px solid rgba(71, 85, 105, 0.3)',
                padding: '24px 32px',
                background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.08) 0%, rgba(6, 182, 212, 0.02) 100%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexShrink: 0
              }}>
                <div>
                  <h2 style={{
                    fontSize: '1.75rem',
                    fontWeight: '800',
                    color: '#ffffff',
                    margin: 0,
                    marginBottom: '4px'
                  }}>{selectedProduct.name}</h2>
                  <p style={{
                    color: '#06b6d4',
                    fontSize: '14px',
                    fontWeight: '600',
                    margin: 0
                  }}>{selectedProduct.category}</p>
                </div>
                <button
                  onClick={closeModal}
                  style={{
                    padding: '8px',
                    background: 'transparent',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    color: '#94a3b8',
                    fontSize: '20px',
                    transition: 'all 0.2s',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.background = 'rgba(148, 163, 184, 0.1)'
                    e.target.style.color = '#ffffff'
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.background = 'transparent'
                    e.target.style.color = '#94a3b8'
                  }}
                  aria-label="Close modal"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Modal Body */}
              <div style={{
                padding: '32px',
                flex: 1,
                minHeight: 0,
                overflowY: 'auto'
              }} className="modal-scrollable custom-scrollbar">
                {/* Product Image */}
                <div style={{
                  marginBottom: '16px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(6, 182, 212, 0.2)'
                }}>
                  <img
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    style={{
                      width: '100%',
                      height: '200px',
                      objectFit: 'cover'
                    }}
                    loading="eager"
                    decoding="async"
                    fetchpriority="high"
                    sizes="100vw"
                  />
                </div>

                {/* Price */}
                <div style={{ marginBottom: '16px' }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'baseline',
                    gap: '6px'
                  }}>
                    {selectedProduct.price.includes('-') ? (
                      <>
                        <span style={{
                          fontSize: '13px',
                          color: '#94a3b8',
                          fontWeight: '500'
                        }}>from</span>
                        <span style={{
                          fontSize: '1.75rem',
                          fontWeight: '700',
                          background: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
                          WebkitBackgroundClip: 'text',
                          WebkitTextFillColor: 'transparent',
                          backgroundClip: 'text'
                        }}>{selectedProduct.price.split(' - ')[0]}</span>
                      </>
                    ) : (
                      <span style={{
                        fontSize: '1.75rem',
                        fontWeight: '700',
                        background: 'linear-gradient(135deg, #06b6d4 0%, #22d3ee 100%)',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        backgroundClip: 'text'
                      }}>{selectedProduct.price}</span>
                    )}
                  </div>
                </div>

                {/* Pricing Tiers */}
                {selectedProduct.pricingTiers && (
                  <div style={{ marginBottom: '16px' }}>
                    <h3 style={{
                      fontSize: '15px',
                      fontWeight: '600',
                      color: '#ffffff',
                      marginBottom: '10px',
                      marginTop: 0
                    }}>Select Duration</h3>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(90px, 1fr))',
                      gap: '8px'
                    }}>
                      {selectedProduct.pricingTiers.map((tier) => (
                        <button
                          key={tier.value}
                          onClick={(e) => {
                            e.preventDefault()
                            e.stopPropagation()
                            console.log('Tier clicked:', tier)
                            setSelectedTier(tier)
                          }}
                          style={{
                            padding: '10px 8px',
                            borderRadius: '10px',
                            border: selectedTier?.value === tier.value
                              ? '2px solid #06b6d4'
                              : '1px solid #334155',
                            background: selectedTier?.value === tier.value
                              ? 'linear-gradient(135deg, rgba(6, 182, 212, 0.15) 0%, rgba(6, 182, 212, 0.05) 100%)'
                              : '#1a1d24',
                            cursor: 'pointer',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            if (selectedTier?.value !== tier.value) {
                              e.target.style.borderColor = '#475569'
                              e.target.style.transform = 'translateY(-2px)'
                            }
                          }}
                          onMouseLeave={(e) => {
                            if (selectedTier?.value !== tier.value) {
                              e.target.style.borderColor = '#334155'
                              e.target.style.transform = 'translateY(0)'
                            }
                          }}
                        >
                          <div style={{
                            fontSize: '1rem',
                            fontWeight: '700',
                            color: selectedTier?.value === tier.value ? '#06b6d4' : '#ffffff'
                          }}>{tier.price}</div>
                          <div style={{
                            fontSize: '11px',
                            color: selectedTier?.value === tier.value ? '#22d3ee' : '#94a3b8',
                            marginTop: '2px'
                          }}>{tier.label}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Description */}
                <div style={{
                  marginBottom: '16px',
                  background: 'linear-gradient(135deg, rgba(6, 182, 212, 0.05) 0%, transparent 100%)',
                  borderRadius: '10px',
                  padding: '12px',
                  border: '1px solid rgba(6, 182, 212, 0.15)'
                }}>
                  <h3 style={{
                    fontSize: '15px',
                    fontWeight: '600',
                    color: '#ffffff',
                    marginBottom: '6px',
                    marginTop: 0
                  }}>Description</h3>
                  <p style={{
                    fontSize: '13px',
                    color: '#cbd5e1',
                    lineHeight: '1.5',
                    margin: 0
                  }}>{selectedProduct.description}</p>
                </div>

                {/* Photo Gallery */}
                {selectedProduct.gallery && selectedProduct.gallery.length > 0 && (
                  <div className="mb-4 sm:mb-6">
                    <h3 className="text-base sm:text-lg font-semibold text-white mb-3 flex items-center">
                      <Eye className="mr-2" size={16} />
                      Photo Gallery ({selectedProduct.gallery.length} photos)
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                      {selectedProduct.gallery.map((photo, idx) => (
                        <div
                          key={idx}
                          onClick={() => openLightbox(selectedProduct.gallery, idx)}
                          className="relative group rounded-lg overflow-hidden cursor-pointer border-2 border-primary/20 hover:border-primary transition-all duration-300"
                        >
                          <GalleryImage
                            src={photo}
                            alt={`${selectedProduct.name} - Photo ${idx + 1}`}
                            className="h-32 sm:h-40"
                            lazy={false}
                            fetchpriority="low"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 300px"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Eye className="text-white" size={24} />
                          </div>
                          <div className="absolute bottom-2 right-2 bg-black/80 px-2 py-1 rounded text-xs text-white">
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
                          {video.type === 'youtube' ? (
                            <iframe
                              src={video.url}
                              title={video.title}
                              className="w-full h-48"
                              frameBorder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowFullScreen
                            ></iframe>
                          ) : video.type === 'local' ? (
                            <OptimizedVideo
                              src={video.url}
                              poster={video.thumbnail}
                              className="w-full h-48 object-cover bg-black"
                              controls={true}
                              lazy={true}
                              rootMargin="100px"
                            />
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
                            <h4 className="text-white font-medium mb-2">{video.title}</h4>
                            <p className="text-gray-300 text-sm">{video.description}</p>
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
                          className="px-3 py-2 bg-primary/15 text-white text-sm rounded-lg border border-primary/50 font-medium shadow-sm"
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
                        className="px-3 py-2 bg-primary/15 text-white text-sm rounded-lg border border-primary/50 font-medium shadow-sm"
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
                          className="px-3 py-2 bg-primary/15 text-primary text-sm rounded-lg border border-primary/40 font-medium shadow-sm"
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
                          className="px-3 py-2 bg-primary/15 text-primary text-sm rounded-lg border border-primary/40 font-medium shadow-sm"
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
                          className="px-3 py-2 bg-primary/15 text-primary text-sm rounded-lg border border-primary/40 font-medium shadow-sm"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t border-primary/20">
                  <button
                    onClick={closeModal}
                    className="flex-1 py-4 px-6 bg-dark-lighter hover:bg-dark text-white font-bold rounded-xl border-2 border-primary/20 hover:border-primary/40 transition-all duration-300 text-sm uppercase tracking-wider shadow-lg"
                  >
                    Close
                  </button>
                  {selectedProduct.inStock && (
                    <motion.button
                      onClick={handlePurchase}
                      whileHover={{ scale: 1.02, y: -2 }}
                      whileTap={{ scale: 0.98 }}
                      className="flex-1 py-4 px-6 bg-gradient-to-r from-primary via-primary-dark to-primary hover:from-primary-dark hover:via-primary hover:to-primary-dark text-white font-black rounded-xl shadow-xl shadow-primary/50 hover:shadow-primary/70 transition-all duration-300 flex items-center justify-center gap-2.5 text-sm uppercase tracking-wider relative overflow-hidden group"
                    >
                      <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></span>
                      <ExternalLink className="relative z-10 group-hover:rotate-12 transition-transform duration-300" size={18} />
                      <span className="relative z-10">Purchase Now</span>
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
      
      {/* Payment Checkout Modal */}
      {showPaymentCheckout && selectedProduct && (
        <PaymentCheckout
          product={selectedProduct}
          selectedTier={selectedTier}
          onClose={() => {
            setShowPaymentCheckout(false)
            closeModal()
          }}
        />
      )}
    </section>
  )
}

export default Products
