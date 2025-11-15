"use client";

import { motion } from "framer-motion";
import Button from "@/components/Button";
import { useTheme } from "@/context/ThemeContext";

export default function Hero() {
  const { t } = useTheme();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden px-4 sm:px-6 pt-20 pb-16">
      {/* Subtle gradient background */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0 bg-gradient-to-b via-bg to-bg"
          style={{
            backgroundImage: `linear-gradient(to bottom, color-mix(in srgb, var(--accent-color) 2%, transparent), rgb(var(--bg-primary)), rgb(var(--bg-primary)))`,
          }}
        />
        <div className="absolute inset-0 opacity-[0.02] dark:opacity-[0.02] light:opacity-[0.01] bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJhIiB4PSIwIiB5PSIwIj48ZmVUdXJidWxlbmNlIGJhc2VGcmVxdWVuY3k9Ii43NSIgc3RpdGNoVGlsZXM9InN0aXRjaCIgdHlwZT0iZnJhY3RhbE5vaXNlIi8+PGZlQ29sb3JNYXRyaXggdHlwZT0ic2F0dXJhdGUiIHZhbHVlcz0iMCIvPjwvZmlsdGVyPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbHRlcj0idXJsKCNhKSIgb3BhY2l0eT0iMC4wNSIvPjwvc3ZnPg==')]" />
      </div>
      
      {/* Minimal animated grid */}
      <div 
        className="absolute inset-0 bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-20"
        style={{
          backgroundImage: 'linear-gradient(to right, color-mix(in srgb, var(--accent-color) 6%, transparent) 1px, transparent 1px), linear-gradient(to bottom, color-mix(in srgb, var(--accent-color) 6%, transparent) 1px, transparent 1px)'
        }}
      />

      <div className="relative z-10 mx-auto max-w-5xl text-center">
        {/* Clean badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            delay: 0.1,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="mb-8 inline-flex items-center gap-2.5 rounded-full px-4 sm:px-5 py-2.5 text-[13px] font-semibold backdrop-blur-sm"
          style={{
            border: `1px solid color-mix(in srgb, var(--accent-color) 25%, transparent)`,
            background: `linear-gradient(135deg, color-mix(in srgb, var(--accent-color) 8%, transparent) 0%, color-mix(in srgb, var(--accent-color) 3%, transparent) 100%)`,
            color: 'var(--accent-color)',
            boxShadow: `0 0 30px color-mix(in srgb, var(--accent-color) 15%, transparent), inset 0 1px 1px rgba(255, 255, 255, 0.1)`,
          }}
        >
          <span className="relative flex h-2.5 w-2.5">
            <span 
              className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
              style={{ backgroundColor: 'var(--accent-color)' }}
            ></span>
            <span 
              className="relative inline-flex h-2.5 w-2.5 rounded-full"
              style={{ 
                backgroundColor: 'var(--accent-color)',
                boxShadow: `0 0 8px color-mix(in srgb, var(--accent-color) 80%, transparent), 0 0 16px color-mix(in srgb, var(--accent-color) 40%, transparent)`,
              }}
            ></span>
          </span>
          <span className="tracking-wide">{t.hero.availableForProjects}</span>
        </motion.div>

        {/* Simple title */}
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="mb-6 text-[clamp(3rem,8vw,7rem)] font-bold tracking-[-0.02em] px-2 sm:px-4 leading-[0.95]"
        >
          <span className="block text-text mb-4">
            {t.hero.greeting.split(' ').slice(0, -1).join(' ')} <span className="text-gradient">xtra</span>
          </span>
          <span className="block text-text/60 text-[clamp(1.75rem,4vw,3.5rem)] mt-2 font-normal tracking-[-0.01em] leading-[1.1]">
            {t.hero.role}
          </span>
        </motion.h1>

        {/* Clean description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            delay: 0.2,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="mx-auto mb-14 max-w-3xl text-[clamp(1.125rem,2vw,1.375rem)] text-text-secondary leading-[1.6] px-2 sm:px-4"
        >
          {t.hero.description}
        </motion.p>

        {/* Simple CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            delay: 0.3,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-20 sm:mb-24 px-4"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Button href="#work" className="w-full sm:w-auto">{t.hero.viewWork}</Button>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full sm:w-auto"
          >
            <Button variant="secondary" href="#contact" className="w-full sm:w-auto">
              {t.hero.getInTouch}
            </Button>
          </motion.div>
        </motion.div>

        {/* Minimal scroll indicator */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ 
            duration: 0.6,
            delay: 0.4,
            ease: [0.22, 1, 0.36, 1]
          }}
          className="flex flex-col items-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 3, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-4"
          >
            <span className="text-[10px] text-text-secondary/30 uppercase tracking-[0.25em] font-semibold">{t.hero.discover}</span>
            
            {/* Liquid glass scroll container */}
            <div 
              className="relative h-16 w-8 rounded-full p-[3px]"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.08) 100%)',
                backdropFilter: 'blur(30px) saturate(180%)',
                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.2), inset 0 2px 4px rgba(255, 255, 255, 0.25)',
              }}
            >
              <div className="absolute inset-[3px] rounded-full bg-bg-secondary" />
              <motion.div 
                className="relative h-3 w-3 rounded-full mx-auto mt-1"
                style={{
                  background: `linear-gradient(180deg, var(--accent-color) 0%, var(--accent-color) 100%)`,
                  boxShadow: `0 0 12px color-mix(in srgb, var(--accent-color) 60%, transparent), 0 0 24px color-mix(in srgb, var(--accent-color) 30%, transparent), inset 0 1px 1px rgba(255, 255, 255, 0.3)`,
                }}
                animate={{ y: [0, 32, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: [0.22, 1, 0.36, 1] }}
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}