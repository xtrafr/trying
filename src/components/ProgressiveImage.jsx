import { useState, useRef, useEffect } from 'react'

const ProgressiveImage = ({
  src,
  alt,
  placeholder = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="400" height="300"%3E%3Crect fill="%23151b2e" width="400" height="300"/%3E%3Ctext x="50%25" y="50%25" font-size="20" fill="%2306b6d4" text-anchor="middle" dy=".3em"%3ELoading...%3C/text%3E%3C/svg%3E',
  className = '',
  imgClassName = '',
  blurAmount = 20,
  fadeInDuration = 0.5,
  lazy = true,
  rootMargin = '50px',
  onLoad,
  onError,
  ...props
}) => {
  const [imageState, setImageState] = useState({
    isLoading: true,
    isLoaded: false,
    hasError: false,
    isInViewport: !lazy
  })
  const [currentSrc, setCurrentSrc] = useState(placeholder)
  const imgRef = useRef(null)
  const observerRef = useRef(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setImageState(prev => ({ ...prev, isInViewport: true }))
          observer.disconnect()
        }
      },
      { rootMargin, threshold: 0.1 }
    )

    if (imgRef.current) {
      observer.observe(imgRef.current)
      observerRef.current = observer
    }

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect()
      }
    }
  }, [lazy, rootMargin])

  // Load image when in viewport
  useEffect(() => {
    if (!imageState.isInViewport || !src) return

    const loadImage = () => {
      const img = new Image()
      
      img.onload = () => {
        setCurrentSrc(src)
        setImageState({
          isLoading: false,
          isLoaded: true,
          hasError: false,
          isInViewport: true
        })
        onLoad?.()
      }

      img.onerror = () => {
        setImageState(prev => ({
          ...prev,
          isLoading: false,
          isLoaded: false,
          hasError: true
        }))
        onError?.()
      }

      // Start loading after a small delay for better UX
      setTimeout(() => {
        img.src = src
      }, 100)
    }

    loadImage()
  }, [src, imageState.isInViewport, onLoad, onError])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton - CSS animation for better performance */}
      {imageState.isLoading && imageState.isInViewport && (
        <div className="absolute inset-0 bg-dark-lighter">
          <div 
            className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent shimmer-animation"
            style={{
              animation: 'shimmer 1.5s linear infinite'
            }}
          />
          <style>{`
            @keyframes shimmer {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(100%); }
            }
            @media (prefers-reduced-motion: reduce) {
              .shimmer-animation { animation: none !important; }
            }
          `}</style>
        </div>
      )}

      {/* Main image with blur-up effect */}
      <img
        ref={imgRef}
        src={imageState.isInViewport ? currentSrc : placeholder}
        alt={alt}
        className={`transition-all duration-500 ${imgClassName}`}
        style={{
          filter: imageState.isLoaded ? 'blur(0px)' : `blur(${blurAmount}px)`,
          transform: imageState.isLoaded ? 'scale(1)' : 'scale(1.05)',
          opacity: imageState.isLoaded ? 1 : 0.7
        }}
        loading={lazy ? 'lazy' : 'eager'}
        decoding="async"
        {...props}
      />

      {/* Error state */}
      {imageState.hasError && (
        <div className="absolute inset-0 bg-dark-lighter flex items-center justify-center">
          <div className="text-center">
            <svg 
              className="w-12 h-12 mx-auto mb-2 text-primary/50" 
              fill="none" 
              stroke="currentColor" 
              viewBox="0 0 24 24"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" 
              />
            </svg>
            <p className="text-gray-400 text-sm">Failed to load image</p>
          </div>
        </div>
      )}
    </div>
  )
}

export const ProductImage = ({ product, className = '', ...props }) => {
  return (
    <ProgressiveImage
      src={product.image}
      alt={product.name}
      className={`w-full object-cover ${className}`}
      imgClassName="group-hover:scale-110 transition-transform duration-500 ease-out"
      blurAmount={15}
      fadeInDuration={0.4}
      {...props}
    />
  )
}

export const GalleryImage = ({ src, alt, className = '', ...props }) => {
  return (
    <ProgressiveImage
      src={src}
      alt={alt}
      className={`w-full object-cover ${className}`}
      imgClassName="group-hover:scale-110 transition-transform duration-500"
      blurAmount={10}
      fadeInDuration={0.3}
      {...props}
    />
  )
}

export default ProgressiveImage
