"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { expertise } from "@/lib/data";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
};

const categoryVariant = {
  hidden: { 
    opacity: 0, 
    y: 30,
    scale: 0.95,
  },
  show: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: { 
      type: "spring",
      stiffness: 150,
      damping: 20,
      duration: 0.5,
    },
  },
};

const techItem = {
  hidden: { 
    opacity: 0, 
    x: -15,
    scale: 0.9,
  },
  show: { 
    opacity: 1, 
    x: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 250,
      damping: 25,
    },
  },
};

export default function Expertise() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedCategories, setExpandedCategories] = useState<number[]>([]);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      // On desktop, don't expand anything. On mobile, nothing expanded by default
      if (!mobile) {
        setExpandedCategories([]);
      }
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getGlowColor = (index: number) => {
    return { color: 'var(--accent-color)', shadow: 'color-mix(in srgb, var(--accent-color) 30%, transparent)' };
  };

  const toggleCategory = (idx: number) => {
    if (expandedCategories.includes(idx)) {
      setExpandedCategories(expandedCategories.filter(i => i !== idx));
    } else {
      setExpandedCategories([...expandedCategories, idx]);
    }
  };

  return (
    <section
      id="expertise"
      ref={ref}
      className="relative overflow-hidden bg-bg px-6 py-20 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-[-0.02em] leading-[1.1]">
            What I Use
          </h2>
          <p className="text-[17px] text-text-secondary/60 max-w-xl mx-auto leading-[1.5]">
            Tools and technologies I work with daily
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {expertise.map((category, idx) => {
            const glowColors = getGlowColor(idx);
            const isExpanded = expandedCategories.includes(idx);
            
            return (
              <motion.div
                key={idx}
                variants={categoryVariant}
                className="group relative overflow-hidden rounded-[24px] transition-all duration-200"
                style={{
                  background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
                  backdropFilter: 'blur(30px) saturate(180%)',
                  WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                  border: '1px solid rgba(255, 255, 255, 0.12)',
                  boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.1)',
                }}
                whileHover={{ 
                  y: -6,
                  boxShadow: `0 0 60px ${glowColors.shadow}, 0 0 120px ${glowColors.shadow}, 0 8px 40px rgba(0, 0, 0, 0.15), inset 0 0 30px rgba(255, 255, 255, 0.12), inset 0 2px 4px rgba(255, 255, 255, 0.15)`,
                }}
                transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <button
                  onClick={() => toggleCategory(idx)}
                  className="w-full p-5 md:p-6 pb-3 border-b border-white/[0.12] flex items-center justify-between cursor-pointer md:cursor-default active:bg-white/[0.02] md:active:bg-transparent transition-colors"
                  aria-expanded={isMobile ? isExpanded : true}
                  aria-label={`${isExpanded ? 'Collapse' : 'Expand'} ${category.category}`}
                >
                  <h3 className="text-[17px] font-bold text-text/90 tracking-[-0.01em]">
                    {category.category}
                  </h3>
                  <motion.svg
                    className="w-5 h-5 md:hidden flex-shrink-0"
                    style={{ color: 'var(--accent-color)' }}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2.5}
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                  </motion.svg>
                </button>

                <AnimatePresence initial={false}>
                  {(!isMobile || isExpanded) && (
                    <motion.div
                      initial={isMobile ? { height: 0, opacity: 0 } : false}
                      animate={{ 
                        height: "auto", 
                        opacity: 1,
                        transition: {
                          height: {
                            duration: 0.3,
                            ease: [0.25, 0.1, 0.25, 1]
                          },
                          opacity: {
                            duration: 0.2,
                            delay: 0.1
                          }
                        }
                      }}
                      exit={isMobile ? { 
                        height: 0, 
                        opacity: 0,
                        transition: {
                          height: {
                            duration: 0.3,
                            ease: [0.25, 0.1, 0.25, 1]
                          },
                          opacity: {
                            duration: 0.15
                          }
                        }
                      } : undefined}
                      className="overflow-hidden"
                    >
                      <motion.div 
                        className="space-y-2 p-5 md:p-6 pt-4"
                        variants={container}
                        initial="hidden"
                        animate={isInView ? "show" : "hidden"}
                      >
                        {category.technologies.map((tech, techIdx) => (
                          <motion.a
                            key={techIdx}
                            href={tech.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            variants={techItem}
                            className="flex items-center gap-3 rounded-[12px] px-3 py-2.5 transition-all duration-200 hover:bg-white/[0.05] active:bg-white/[0.08]"
                            whileHover={{ x: 4 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <div 
                              className="flex h-8 w-8 min-w-8 items-center justify-center rounded-[8px]"
                              style={{ backgroundColor: `${tech.color}20` }}
                            >
                              <Image
                                src={`/icons/${tech.iconFile}`}
                                alt={tech.name}
                                width={20}
                                height={20}
                                className="object-contain brightness-0 invert"
                                loading="lazy"
                              />
                            </div>
                            <span className="text-[14px] font-medium text-text/70">
                              {tech.name}
                            </span>
                          </motion.a>
                        ))}
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
