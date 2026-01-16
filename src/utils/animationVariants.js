// Per-section animation variants: tuned for slightly faster, smoother feel
export const mediaContainer = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.04,
      when: 'beforeChildren'
    }
  }
}

export const mediaItem = {
  hidden: { opacity: 0, y: 12 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      stiffness: 220,
      damping: 26
    }
  }
}

export const resellContainer = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { staggerChildren: 0.05 } }
}

export const resellItem = {
  hidden: { opacity: 0, x: -18 },
  show: { opacity: 1, x: 0, transition: { duration: 0.32, ease: [0.22, 1, 0.36, 1] } }
}

export const freeKeysContainer = mediaContainer
export const freeKeysItem = {
  hidden: { opacity: 0, scale: 0.98, y: 10 },
  show: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.28, ease: [0.2, 0.8, 0.2, 1] } }
}

export const paymentsContainer = mediaContainer
export const paymentsItem = {
  hidden: { opacity: 0, y: 10, scale: 0.995 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.3, ease: 'circOut' } }
}

export const contactContainer = mediaContainer
export const contactItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 200, damping: 22 } }
}

export const footerFade = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } }
}

// Backwards-compatible default (small stagger + spring)
export const container = mediaContainer
export const item = mediaItem

export const fadeUp = footerFade
