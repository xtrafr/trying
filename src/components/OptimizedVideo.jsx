import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const OptimizedVideo = ({
  src,
  poster,
  className = '',
  autoPlay = false,
  muted = true,
  loop = false,
  controls = true,
  lazy = true,
  rootMargin = '200px',
  onLoad,
  onError,
  ...props
}) => {
  const [videoState, setVideoState] = useState({
    isLoading: false,
    isLoaded: false,
    hasError: false,
    isVisible: false
  })
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const videoRef = useRef(null)
  const observerRef = useRef(null)

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (!lazy) {
      setVideoState(prev => ({ ...prev, isVisible: true }))
      return
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setVideoState(prev => ({ ...prev, isVisible: true }))
            observerRef.current?.disconnect()
          }
        })
      },
      { rootMargin, threshold: 0.1 }
    )

    const videoElement = videoRef.current
    if (videoElement) {
      observerRef.current.observe(videoElement)
    }

    return () => {
      observerRef.current?.disconnect()
    }
  }, [lazy, rootMargin])

  const handleLoadStart = () => {
    setVideoState(prev => ({ ...prev, isLoading: true }))
  }

  const handleCanPlay = () => {
    setVideoState({
      isLoading: false,
      isLoaded: true,
      hasError: false
    })
    onLoad?.()
    if (autoPlay && muted && videoRef.current) {
      videoRef.current.play().catch(() => {
        // Auto-play was prevented, that's okay
      })
    }
  }

  const handleError = () => {
    setVideoState({
      isLoading: false,
      isLoaded: false,
      hasError: true
    })
    onError?.()
  }

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return
    
    if (isPlaying) {
      videoRef.current.pause()
    } else {
      videoRef.current.play().catch(() => {
        // Play was prevented
      })
    }
    setIsPlaying(!isPlaying)
  }, [isPlaying])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Loading skeleton */}
      <AnimatePresence>
        {videoState.isLoading && (
          <motion.div
            className="absolute inset-0 bg-dark-lighter flex items-center justify-center z-10"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full"
              animate={{ rotate: 360 }}
              transition={{
                duration: 1,
                repeat: Infinity,
                ease: 'linear'
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Video element */}
      {videoState.isVisible && (
        <motion.video
          ref={videoRef}
          poster={poster}
          className={`w-full h-full object-cover transition-opacity duration-500 ${videoState.isLoaded ? 'opacity-100' : 'opacity-0'}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: videoState.isLoaded ? 1 : 0 }}
          muted={muted}
          loop={loop}
          controls={controls}
          playsInline
          preload="none"
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
          onError={handleError}
          onClick={controls ? undefined : togglePlay}
          {...props}
        >
          <source src={src} type="video/mp4" />
          <source src={src.replace('.mp4', '.webm')} type="video/webm" />
          Your browser does not support the video tag.
        </motion.video>
      )}

      {/* Placeholder when not visible */}
      {!videoState.isVisible && (
        <div className="w-full h-full bg-dark-lighter flex items-center justify-center">
          {poster ? (
            <img 
              src={poster} 
              alt="Video thumbnail" 
              className="w-full h-full object-cover"
              loading="lazy"
            />
          ) : (
            <div className="w-12 h-12 border-4 border-primary/30 border-t-primary rounded-full animate-spin" />
          )}
        </div>
      )}

      {/* Custom play button for autoplay videos */}
      {!controls && videoState.isLoaded && !isPlaying && (
        <motion.button
          className="absolute inset-0 flex items-center justify-center bg-black/40 hover:bg-black/60 transition-colors z-20"
          onClick={togglePlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-16 h-16 bg-primary/80 hover:bg-primary rounded-full flex items-center justify-center transition-colors">
            <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z"/>
            </svg>
          </div>
        </motion.button>
      )}

      {/* Error state */}
      <AnimatePresence>
        {videoState.hasError && (
          <motion.div
            className="absolute inset-0 bg-dark-lighter flex items-center justify-center z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
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
              <p className="text-gray-400 text-sm">Failed to load video</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export const ProductVideo = ({ video, className = '', ...props }) => {
  return (
    <OptimizedVideo
      src={video.url}
      poster={video.thumbnail}
      className={`w-full h-64 object-cover ${className}`}
      controls={true}
      lazy={true}
      rootMargin="100px"
      {...props}
    />
  )
}

export default OptimizedVideo
