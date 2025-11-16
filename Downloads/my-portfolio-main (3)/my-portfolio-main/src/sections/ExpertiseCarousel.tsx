"use client";

/**
 * Expertise Section, shows all my tech stack
 * @author xtra
 * 
 * got 3 different views: grid, carousel, or cards,
 * icons only load when you scroll to this section (saves bandwidth),
 * using native img tags for SVGs cuz it's way faster than Next/Image
 */

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { expertise } from "@/lib/data";
import { useTheme } from "@/context/ThemeContext";

export default function ExpertiseCarousel() {
  const { t } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [viewMode, setViewMode] = useState<"grid" | "carousel" | "cards">("grid");
  const [isMobileExpanded, setIsMobileExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [shouldLoadIcons, setShouldLoadIcons] = useState(false); // lazy load ftw

  // check if we're on mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // only load icons when section is visible
  useEffect(() => {
    if (isInView) {
      setShouldLoadIcons(true);
    }
  }, [isInView]);

  return (
    <section
      id="expertise"
      ref={ref}
      className="relative overflow-hidden bg-bg py-20 md:py-32"
    >
      <div className={viewMode === "carousel" ? "w-full" : "mx-auto max-w-7xl px-6"}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight">
            {t.expertise.title}
          </h2>
          <p className="text-base sm:text-lg text-text-secondary/60 max-w-xl mx-auto mb-8">
            {t.expertise.subtitle}
          </p>

          {/* View Toggle */}
          <div 
            className="inline-flex items-center gap-1 p-1 rounded-full"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
              backdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
              WebkitBackdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)',
            }}
          >
           {(["grid", "carousel", "cards"] as const).map((mode) => {
              const modeLabels = {
                grid: t.expertise.grid,
                carousel: t.expertise.carousel,
                cards: t.expertise.cards,
              };
              
              return (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className="relative px-8 py-2.5 text-sm font-semibold rounded-full transition-all duration-300 capitalize min-w-[110px]"
                style={{
                  color: viewMode === mode ? 'var(--accent-color)' : 'rgba(245, 245, 247, 0.5)',
                }}
              >
                {viewMode === mode && (
                  <motion.div
                    layoutId="activeView"
                    className="absolute inset-0 rounded-full"
                    style={{
                      background: `linear-gradient(135deg, color-mix(in srgb, var(--accent-color) 15%, transparent) 0%, color-mix(in srgb, var(--accent-color) 5%, transparent) 100%)`,
                      border: `1px solid color-mix(in srgb, var(--accent-color) 30%, transparent)`,
                      boxShadow: `0 0 20px color-mix(in srgb, var(--accent-color) 20%, transparent), inset 0 1px 1px rgba(255, 255, 255, 0.1)`,
                    }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{modeLabels[mode]}</span>
              </button>
            );})}
          </div>
        </motion.div>

        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          {viewMode === "grid" && <GridView isInView={isInView} isMobile={isMobile} isMobileExpanded={isMobileExpanded} setIsMobileExpanded={setIsMobileExpanded} shouldLoadIcons={shouldLoadIcons} />}
          {viewMode === "carousel" && <CarouselView shouldLoadIcons={shouldLoadIcons} />}
          {viewMode === "cards" && <CardsView isInView={isInView} isMobile={isMobile} isMobileExpanded={isMobileExpanded} setIsMobileExpanded={setIsMobileExpanded} shouldLoadIcons={shouldLoadIcons} />}
        </motion.div>
      </div>
    </section>
  );
}

function GridView({ isInView, isMobile, isMobileExpanded, setIsMobileExpanded, shouldLoadIcons }: { isInView: boolean; isMobile: boolean; isMobileExpanded: boolean; setIsMobileExpanded: (expanded: boolean) => void; shouldLoadIcons: boolean }) {
  const displayedItems = isMobile && !isMobileExpanded ? expertise.slice(0, 3) : expertise;
  
  return (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
      >
        {displayedItems.map((category, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: idx * 0.05 }}
          className="group relative overflow-hidden rounded-2xl p-6"
          style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
            backdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
            WebkitBackdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)',
          }}
          whileHover={{
            y: -4,
            boxShadow: `0 0 40px color-mix(in srgb, var(--accent-color) 20%, transparent), 0 12px 40px 0 rgba(0, 0, 0, 0.5)`,
          }}
        >
          <h3 className="text-lg font-bold text-text/90 mb-4 pb-3 border-b border-white/[0.08]">
            {category.category}
          </h3>
          <div className="space-y-2">
            {category.technologies.map((tech, techIdx) => (
              <motion.a
                key={techIdx}
                href={tech.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all duration-200 hover:bg-white/[0.05]"
                whileHover={{ x: 4 }}
              >
                <div
                  className="flex h-8 w-8 min-w-8 items-center justify-center rounded-lg transition-all duration-200"
                  style={{ backgroundColor: `${tech.color}20` }}
                >
                  {shouldLoadIcons ? (
                    <img
                      src={`/icons/${tech.iconFile}`}
                      alt={tech.name}
                      width={20}
                      height={20}
                      className="object-contain brightness-0 invert"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-5 h-5 rounded animate-pulse" style={{ backgroundColor: `${tech.color}40` }} />
                  )}
                </div>
                <span className="text-sm font-medium text-text/70">
                  {tech.name}
                </span>
              </motion.a>
            ))}
          </div>
        </motion.div>
      ))}
      </motion.div>
      
      {isMobile && expertise.length > 3 && (
        <div className="mt-8 text-center">
          <motion.button
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all"
            style={{
              border: `1px solid color-mix(in srgb, var(--accent-color) 20%, transparent)`,
              background: `color-mix(in srgb, var(--accent-color) 5%, transparent)`,
              color: 'var(--accent-color)',
            }}
            whileHover={{
              scale: 1.02,
              background: `color-mix(in srgb, var(--accent-color) 10%, transparent)`,
              borderColor: `color-mix(in srgb, var(--accent-color) 30%, transparent)`,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{isMobileExpanded ? 'Show Less' : `Show All (${expertise.length})`}</span>
            <motion.svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              animate={{ rotate: isMobileExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.button>
        </div>
      )}
    </>
  );
}

function CarouselView({ shouldLoadIcons }: { shouldLoadIcons: boolean }) {
  const allTechs = expertise.flatMap(cat => cat.technologies);
  // split into 2 rows looks better
  const firstHalf = allTechs.slice(0, Math.ceil(allTechs.length / 2));
  const secondHalf = allTechs.slice(Math.ceil(allTechs.length / 2));

  return (
    <div className="space-y-8 w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] pointer-events-none">
      {/* scrolls left to right */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #000000 0%, transparent 100%)',
          }}
        />
        <div 
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, #000000 0%, transparent 100%)',
          }}
        />
        <motion.div
          className="flex gap-6 py-2 will-change-transform"
          initial={{ x: 0 }}
          animate={{
            x: [0, -2400], // infinite loop
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear",
            },
          }}
          style={{ 
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        >
          {/* 4x duplication for seamless loop */}
          {[...firstHalf, ...firstHalf, ...firstHalf, ...firstHalf].map((tech, idx) => (
            <a
              key={idx}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex flex-col items-center gap-3 p-6 rounded-xl min-w-[140px] transition-all duration-300 hover:scale-105 pointer-events-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
                backdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
              }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${tech.color}25` }}
              >
                {shouldLoadIcons ? (
                  <img
                    src={`/icons/${tech.iconFile}`}
                    alt={tech.name}
                    width={28}
                    height={28}
                    className="object-contain brightness-0 invert"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-7 h-7 rounded animate-pulse" style={{ backgroundColor: `${tech.color}40` }} />
                )}
              </div>
              <span className="text-sm font-semibold text-text/80 text-center whitespace-nowrap">
                {tech.name}
              </span>
            </a>
          ))}
        </motion.div>
      </div>

      {/* scrolls right to left */}
      <div className="relative overflow-hidden">
        <div 
          className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to right, #000000 0%, transparent 100%)',
          }}
        />
        <div 
          className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
          style={{
            background: 'linear-gradient(to left, #000000 0%, transparent 100%)',
          }}
        />
        <motion.div
          className="flex gap-6 py-2 will-change-transform"
          initial={{ x: -2400 }}
          animate={{
            x: [-2400, 0],
          }}
          transition={{
            x: {
              repeat: Infinity,
              repeatType: "loop",
              duration: 50,
              ease: "linear",
            },
          }}
          style={{ 
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
          }}
        >
          {[...secondHalf, ...secondHalf, ...secondHalf, ...secondHalf].map((tech, idx) => (
            <a
              key={idx}
              href={tech.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 flex flex-col items-center gap-3 p-6 rounded-xl min-w-[140px] transition-all duration-300 hover:scale-105 pointer-events-auto"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
                backdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
              }}
            >
              <div
                className="flex h-12 w-12 items-center justify-center rounded-xl"
                style={{ backgroundColor: `${tech.color}25` }}
              >
                {shouldLoadIcons ? (
                  <img
                    src={`/icons/${tech.iconFile}`}
                    alt={tech.name}
                    width={28}
                    height={28}
                    className="object-contain brightness-0 invert"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-7 h-7 rounded animate-pulse" style={{ backgroundColor: `${tech.color}40` }} />
                )}
              </div>
              <span className="text-sm font-semibold text-text/80 text-center whitespace-nowrap">
                {tech.name}
              </span>
            </a>
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function CardsView({ isInView, isMobile, isMobileExpanded, setIsMobileExpanded, shouldLoadIcons }: { isInView: boolean; isMobile: boolean; isMobileExpanded: boolean; setIsMobileExpanded: (expanded: boolean) => void; shouldLoadIcons: boolean }) {
  const displayedItems = isMobile && !isMobileExpanded ? expertise.slice(0, 2) : expertise;
  
  return (
    <>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-6xl mx-auto">
        {displayedItems.map((category, idx) => (
        <motion.div
          key={idx}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.3, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
          className="group"
        >
          <div 
            className="p-6 rounded-2xl h-full transition-all duration-300"
            style={{
              background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
              backdropFilter: 'blur(40px) saturate(180%) brightness(1.08)',
              WebkitBackdropFilter: 'blur(40px) saturate(180%) brightness(1.08)',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.4)',
            }}
          >
            <h3 
              className="text-2xl font-bold mb-4 pb-3 border-b border-white/[0.08]"
              style={{
                color: 'var(--accent-color)',
              }}
            >
              {category.category}
            </h3>
            <div className="flex flex-wrap gap-2">
              {category.technologies.map((tech, techIdx) => (
                <a
                  key={techIdx}
                  href={tech.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 rounded-lg transition-all duration-200 hover:bg-white/[0.05]"
                >
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-lg"
                    style={{ backgroundColor: `${tech.color}20` }}
                  >
                    {shouldLoadIcons ? (
                      <img
                        src={`/icons/${tech.iconFile}`}
                        alt={tech.name}
                        width={16}
                        height={16}
                        className="object-contain brightness-0 invert"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-4 h-4 rounded animate-pulse" style={{ backgroundColor: `${tech.color}40` }} />
                    )}
                  </div>
                  <span 
                    className="text-sm font-medium text-text/70 transition-colors"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = 'var(--accent-color)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '';
                    }}
                  >
                    {tech.name}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
        ))}
      </div>
      
      {isMobile && expertise.length > 2 && (
        <div className="mt-8 text-center">
          <motion.button
            onClick={() => setIsMobileExpanded(!isMobileExpanded)}
            className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all"
            style={{
              border: `1px solid color-mix(in srgb, var(--accent-color) 20%, transparent)`,
              background: `color-mix(in srgb, var(--accent-color) 5%, transparent)`,
              color: 'var(--accent-color)',
            }}
            whileHover={{
              scale: 1.02,
              background: `color-mix(in srgb, var(--accent-color) 10%, transparent)`,
              borderColor: `color-mix(in srgb, var(--accent-color) 30%, transparent)`,
            }}
            whileTap={{ scale: 0.98 }}
          >
            <span>{isMobileExpanded ? 'Show Less' : `Show All (${expertise.length})`}</span>
            <motion.svg
              className="w-4 h-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
              animate={{ rotate: isMobileExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </motion.svg>
          </motion.button>
        </div>
      )}
    </>
  );
}
