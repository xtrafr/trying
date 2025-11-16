"use client";

/**
 * About Section, stats cards that tilt with your mouse
 * @author xtra
 * 
 * these parallax cards are honestly sick,
 * they follow your cursor with smooth lerp animations
 */

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { stats } from "@/lib/data";
import { useTheme } from "@/context/ThemeContext";

function ParallaxCard({ stat, idx, isInView }: { stat: { value: string; label: string }; idx: number; isInView: boolean }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // tracking rotation - lerp makes it smooth af
  const [transform, setTransform] = useState({
    currentRX: 0,
    currentRY: 0,
    targetRX: 0,
    targetRY: 0,
  });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    // tilt calc based on where your mouse is
    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      // max 8deg tilt so it's not too dramatic
      setTransform((prev) => ({
        ...prev,
        targetRY: deltaX * 8,
        targetRX: -deltaY * 8,
      }));
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      // smoothly reset back to flat
      setTransform((prev) => ({
        ...prev,
        targetRY: 0,
        targetRX: 0,
      }));
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const lerpFactor = 0.12; // controls how smooth the follow is
    let animationFrame: number;

    // keeps running to make transitions buttery
    const animate = () => {
      setTransform((prev) => {
        const newState = {
          // lerp math for smooth following
          currentRX: prev.currentRX + (prev.targetRX - prev.currentRX) * lerpFactor,
          currentRY: prev.currentRY + (prev.targetRY - prev.currentRY) * lerpFactor,
          targetRX: prev.targetRX,
          targetRY: prev.targetRY,
        };

        if (card) {
          // apply the 3D transform
          card.style.transform = `perspective(1000px) rotateY(${newState.currentRY}deg) rotateX(${newState.currentRX}deg)`;
        }

        return newState;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    // hook up the listeners
    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("mouseenter", handleMouseEnter);
    animate(); // start the loop

    // cleanup when component dies
    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseleave", handleMouseLeave);
      card.removeEventListener("mouseenter", handleMouseEnter);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      ref={cardRef}
      style={{
        transformStyle: "preserve-3d",
      }}
      className="cursor-pointer"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ 
          duration: 0.6, 
          delay: 0.6 + idx * 0.1,
        }}
        className="group relative overflow-hidden rounded-[24px] p-8 transition-all duration-500"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
          backdropFilter: 'blur(30px) saturate(180%)',
          WebkitBackdropFilter: 'blur(30px) saturate(180%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: isHovered 
            ? `0 0 60px color-mix(in srgb, var(--accent-color) 50%, transparent), 0 0 120px color-mix(in srgb, var(--accent-color) 30%, transparent), 0 8px 40px rgba(0, 0, 0, 0.15), inset 0 0 30px rgba(255, 255, 255, 0.12), inset 0 2px 4px rgba(255, 255, 255, 0.15)`
            : "0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.1)"
        }}
      >
        {/* glossy top shine like apple does it */}
        <div 
          className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 0%, transparent 100%)',
            borderRadius: 'inherit',
          }}
        />
        
        <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-3">
          {/* the big number with gradient */}
          <div className="text-[clamp(3.5rem,8vw,5rem)] font-black text-gradient leading-none tracking-[-0.02em]">
            {stat.value}
          </div>
          <div className="text-[13px] font-semibold text-text/70 tracking-wide uppercase">
            {stat.label}
          </div>
        </div>
        
        {/* gradient shows on hover */}
        <div 
          className="absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100" 
          style={{
            background: `linear-gradient(to bottom right, color-mix(in srgb, var(--accent-color) 5%, transparent), transparent, transparent)`
          }}
        />
      </motion.div>
    </div>
  );
}

export default function About() {
  const { t } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  // stats with proper translations
  const translatedStats = [
    { value: "2+", label: t.stats.yearsExperience },
    { value: "25+", label: t.stats.projectsDelivered },
    { value: "100%", label: t.stats.clientSatisfaction },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="relative overflow-hidden bg-bg px-4 sm:px-6 py-16 sm:py-20 md:py-32"
    >
      <div className="relative mx-auto max-w-6xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12 sm:mb-16 text-center"
        >
          <h2 className="mb-4 text-[clamp(2.5rem,6vw,4.5rem)] font-bold tracking-[-0.02em] leading-[1.1]">
            {t.about.title}
          </h2>
        </motion.div>

        {/* Content Grid */}
        <div className="grid gap-8 sm:gap-8 lg:grid-cols-2">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ 
              duration: 0.7, 
              delay: 0.2,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className="flex flex-col justify-center"
          >
            <div className="space-y-5">
              <p className="text-[clamp(1.25rem,2.5vw,1.75rem)] text-text/90 leading-[1.4] font-medium">
                {t.about.intro.split('xtra')[0]}<span className="font-bold" style={{ color: 'var(--accent-color)' }}>xtra</span>{t.about.intro.split('xtra')[1]}
              </p>
              
              <p className="text-[clamp(1.063rem,2vw,1.25rem)] text-text-secondary/80 leading-[1.6]">
                {t.about.paragraph1}
              </p>
              
              <p className="text-[clamp(1.063rem,2vw,1.25rem)] text-text-secondary/80 leading-[1.6]">
                {t.about.paragraph2}
              </p>

              <p className="text-[clamp(1.063rem,2vw,1.25rem)] text-text-secondary/80 leading-[1.6]">
                {t.about.paragraph3}
              </p>

              <div className="pt-2">
                <div 
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold"
                  style={{
                    border: `1px solid color-mix(in srgb, var(--accent-color) 30%, transparent)`,
                    background: `color-mix(in srgb, var(--accent-color) 10%, transparent)`,
                    color: 'var(--accent-color)'
                  }}
                >
                  <span className="relative flex h-2.5 w-2.5">
                    <span 
                      className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                      style={{ backgroundColor: 'var(--accent-color)' }}
                    ></span>
                    <span 
                      className="relative inline-flex h-2.5 w-2.5 rounded-full"
                      style={{ backgroundColor: 'var(--accent-color)' }}
                    ></span>
                  </span>
                  {t.about.openForProjects}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Stats Grid */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ 
              duration: 0.7, 
              delay: 0.4,
              type: "spring",
              stiffness: 100,
              damping: 20
            }}
            className="grid grid-cols-1 gap-4 sm:gap-6"
          >
            {translatedStats.map((stat, idx) => (
              <ParallaxCard key={idx} stat={stat} idx={idx} isInView={isInView} />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}