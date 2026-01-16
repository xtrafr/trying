import { motion } from 'framer-motion'

const SkeletonLoader = ({ 
  width = 'w-full', 
  height = 'h-4', 
  className = '', 
  rounded = 'rounded',
  shimmer = true 
}) => {
  return (
    <div 
      className={`${width} ${height} ${rounded} ${className} bg-dark-lighter overflow-hidden relative`}
    >
      {shimmer && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/20 to-transparent"
          animate={{
            x: ['-100%', '100%']
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'linear'
          }}
        />
      )}
    </div>
  )
}

export const ProductCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-dark-card rounded-2xl overflow-hidden border border-primary/20"
    >
      {/* Image skeleton */}
      <div className="relative w-full h-48 bg-dark-lighter">
        <SkeletonLoader 
          width="w-full h-full" 
          rounded="rounded-none" 
          className="absolute inset-0"
        />
      </div>
      
      {/* Content skeleton */}
      <div className="p-6 space-y-4">
        {/* Title skeleton */}
        <SkeletonLoader width="w-3/4" height="h-6" />
        
        {/* Category skeleton */}
        <SkeletonLoader width="w-1/2" height="h-4" />
        
        {/* Description skeleton */}
        <div className="space-y-2">
          <SkeletonLoader width="w-full" height="h-4" />
          <SkeletonLoader width="w-5/6" height="h-4" />
        </div>
        
        {/* Price skeleton */}
        <SkeletonLoader width="w-1/3" height="h-6" />
        
        {/* Features skeleton */}
        <div className="flex flex-wrap gap-2">
          <SkeletonLoader width="w-20" height="h-6" rounded="rounded-md" />
          <SkeletonLoader width="w-24" height="h-6" rounded="rounded-md" />
          <SkeletonLoader width="w-16" height="h-6" rounded="rounded-md" />
        </div>
        
        {/* Button skeleton */}
        <SkeletonLoader width="w-full" height="h-12" rounded="rounded-lg" />
      </div>
    </motion.div>
  )
}

export const FeatureCardSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-dark-card rounded-2xl p-6 border border-primary/20"
    >
      {/* Icon skeleton */}
      <SkeletonLoader width="w-16 h-16" height="h-16" rounded="rounded-xl" className="mb-4" />
      
      {/* Title skeleton */}
      <SkeletonLoader width="w-3/4" height="h-6" className="mb-3" />
      
      {/* Description skeleton */}
      <div className="space-y-2">
        <SkeletonLoader width="w-full" height="h-4" />
        <SkeletonLoader width="w-5/6" height="h-4" />
        <SkeletonLoader width="w-4/5" height="h-4" />
      </div>
    </motion.div>
  )
}

export const TextSkeleton = ({ lines = 3, className = '' }) => {
  return (
    <div className={`space-y-2 ${className}`}>
      {Array.from({ length: lines }).map((_, i) => (
        <SkeletonLoader 
          key={i}
          width={i === lines - 1 ? 'w-3/4' : 'w-full'}
          height="h-4"
        />
      ))}
    </div>
  )
}

export default SkeletonLoader
