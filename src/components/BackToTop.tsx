"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;
    
    const toggleVisibility = () => {
      if (window.pageYOffset > 500) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(toggleVisibility);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.8, y: 20 }}
          whileHover={{ scale: 1.1, y: -4 }}
          whileTap={{ scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-40 flex h-12 w-12 items-center justify-center rounded-full backdrop-blur-md transition-all duration-300"
          style={{
            background: 'var(--accent-color)',
            border: `2px solid color-mix(in srgb, var(--accent-color) 80%, transparent)`,
            boxShadow: `0 8px 24px color-mix(in srgb, var(--accent-color) 40%, transparent), inset 0 1px 2px rgba(255, 255, 255, 0.2)`,
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.boxShadow = `0 12px 32px color-mix(in srgb, var(--accent-color) 60%, transparent), inset 0 1px 2px rgba(255, 255, 255, 0.3)`;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.boxShadow = `0 8px 24px color-mix(in srgb, var(--accent-color) 40%, transparent), inset 0 1px 2px rgba(255, 255, 255, 0.2)`;
          }}
          aria-label="Back to top"
        >
          <svg
            className="h-5 w-5"
            style={{ color: '#ffffff' }}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 10l7-7m0 0l7 7m-7-7v18"
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
