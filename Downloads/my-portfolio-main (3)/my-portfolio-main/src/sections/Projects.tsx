"use client";

/**
 * Projects Section, featured work + personal projects
 * @author xtra
 * 
 * each project card has a different glow color (looks sick),
 * images float up on hover with colored shadows,
 * mobile gets collapsible grid to save space
 */

import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { projects, personalProjects } from "@/lib/data";
import Image from "next/image";
import { useTheme } from "@/context/ThemeContext";

interface Project {
  id: number;
  title: string;
  description: string;
  url: string;
  technologies: string[];
  year: string;
  category: string;
}

interface PersonalProject {
  id: number;
  title: string;
  description: string;
  url: string;
  technologies: string[];
  year: string;
}

function ProjectCard({ project, index, t }: { project: Project; index: number; t: any }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;
  const [isHovered, setIsHovered] = useState(false);

  // different glow for each project
  const getGlowColor = (index: number) => {
    if (index === 0) return { color: '#60a5fa', shadow: 'rgba(96, 165, 250, 0.6)' };
    if (index === 1) return { color: '#a855f7', shadow: 'rgba(168, 85, 247, 0.6)' };
    if (index === 2) return { color: '#8b5cf6', shadow: 'rgba(139, 92, 246, 0.6)' };
    return { color: '#0db76b', shadow: 'rgba(13, 183, 107, 0.6)' };
  };

  const glowColors = getGlowColor(index);

  return (
    <motion.article
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.2,
        ease: [0.25, 0.1, 0.25, 1]
      }}
      className="group relative"
    >
      <div className={`grid gap-6 sm:gap-8 lg:gap-16 lg:grid-cols-2 items-center ${
        isEven ? "" : "lg:grid-flow-dense"
      }`}>
        {/* Project Image */}
        <a
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          data-umami-event="Project Image Click"
          data-umami-event-project={project.title}
          data-umami-event-type="image"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <motion.div
            className={`relative aspect-[16/10] overflow-hidden rounded-[20px] sm:rounded-[24px] bg-bg-tertiary ${
              isEven ? "" : "lg:col-start-2"
            }`}
            animate={{ 
              y: isHovered ? -8 : 0,
            }}
            style={{
              filter: isHovered 
                ? `drop-shadow(0 0 40px ${glowColors.shadow}) drop-shadow(0 0 80px ${glowColors.shadow})`
                : 'drop-shadow(0 0 0px rgba(0, 0, 0, 0))',
            }}
            transition={{ 
              duration: 0.5,
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            <Image
              src={`/${project.title.split('.')[0]}.png`}
              alt={`${project.title} preview`}
              fill
              className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
              priority={index === 0}
              quality={60}
              loading={index === 0 ? "eager" : "lazy"}
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
            />
            
            {/* dark gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-bg/90 via-bg/40 to-transparent" />
          </motion.div>
        </a>

          {/* Project Info */}
          <div className={`flex flex-col justify-center space-y-4 sm:space-y-6 ${
            isEven ? "" : "lg:col-start-1 lg:row-start-1"
          }`}>
            {/* category label */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <span className="inline-flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.1em]" style={{ color: 'var(--accent-color)' }}>
                <span className="w-8 h-[2px]" style={{ backgroundColor: 'var(--accent-color)' }} />
                {t.projects.featuredProject}
              </span>
            </motion.div>

            {/* project title */}
            <motion.h3
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-[clamp(2rem,5vw,4.5rem)] font-black leading-[1.05] tracking-[-0.02em]"
            >
              {index === 0 ? (
                <span 
                  className="text-gradient"
                  style={{
                    background: 'linear-gradient(135deg, #60a5fa 0%, #1e40af 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(96, 165, 250, 0.6)) drop-shadow(0 0 40px rgba(30, 64, 175, 0.4))',
                  }}
                >
                  {project.title}
                </span>
              ) : index === 1 ? (
                <span 
                  className="text-gradient"
                  style={{
                    background: 'linear-gradient(135deg, #a855f7 0%, #ec4899 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(168, 85, 247, 0.6)) drop-shadow(0 0 40px rgba(236, 72, 153, 0.4))',
                  }}
                >
                  {project.title}
                </span>
              ) : (
                <span 
                  className="text-gradient"
                  style={{
                    background: 'linear-gradient(135deg, #ec4899 0%, #60a5fa 100%)',
                    WebkitBackgroundClip: 'text',
                    WebkitTextFillColor: 'transparent',
                    backgroundClip: 'text',
                    filter: 'drop-shadow(0 0 20px rgba(236, 72, 153, 0.6)) drop-shadow(0 0 40px rgba(96, 165, 250, 0.4))',
                  }}
                >
                  {project.title}
                </span>
              )}
            </motion.h3>

            {/* description card with glass effect */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="p-4 sm:p-6 rounded-[20px] sm:rounded-[24px] relative overflow-hidden"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
                backdropFilter: 'blur(30px) saturate(180%)',
                WebkitBackdropFilter: 'blur(30px) saturate(180%)',
                border: '1px solid rgba(255, 255, 255, 0.12)',
                boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.08), inset 0 1px 2px rgba(255, 255, 255, 0.1)',
              }}
            >
              {/* glossy reflection on top */}
              <div 
                className="absolute top-0 left-0 right-0 h-1/2 pointer-events-none"
                style={{
                  background: 'linear-gradient(to bottom, rgba(255, 255, 255, 0.12) 0%, transparent 100%)',
                  borderRadius: 'inherit',
                }}
              />
              <p className="text-[clamp(1.063rem,2vw,1.25rem)] leading-[1.6] text-text/80 relative z-10">
                {project.title === "xenos.lol" ? t.projects.xenosDescription :
                 project.title === "myras.lol" ? t.projects.myrasDescription :
                 project.title === "hooked.wtf" ? t.projects.hookedDescription :
                 project.description}
              </p>
            </motion.div>

            {/* Technologies */}
            <motion.div
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap gap-3"
            >
              {project.technologies.map((tech: string, idx: number) => {
                const techUrls: Record<string, string> = {
                  "React": "https://react.dev/",
                  "Tailwind CSS": "https://tailwindcss.com/",
                  "Vite": "https://vitejs.dev/",
                  "JavaScript": "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
                  "TypeScript": "https://www.typescriptlang.org/",
                  "Framer Motion": "https://www.framer.com/motion/",
                };
                
                return (
                  <motion.a
                    key={idx}
                    href={techUrls[tech] || "#"}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 rounded-lg text-sm font-medium text-text/70 hover:text-green transition-all duration-300"
                    style={{
                      background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
                      backdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
                      WebkitBackdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      boxShadow: '0 4px 16px 0 rgba(0, 0, 0, 0.2), inset 0 1px 1px 0 rgba(255, 255, 255, 0.05)',
                    }}
                    whileHover={{
                      scale: 1.05,
                      y: -2,
                      borderColor: 'rgba(13, 183, 107, 0.3)',
                      boxShadow: '0 8px 24px 0 rgba(13, 183, 107, 0.2), inset 0 1px 1px 0 rgba(255, 255, 255, 0.1)',
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {tech}
                  </motion.a>
                );
              })}
            </motion.div>

            {/* CTA */}
            <motion.a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              data-umami-event="View Project Click"
              data-umami-event-project={project.title}
              data-umami-event-type="cta-button"
              initial={{ opacity: 0, x: isEven ? -20 : 20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex items-center gap-3 font-bold group/link w-fit"
              style={{
                color: glowColors.color,
              }}
            >
              <span 
                className="border-b-2 transition-all"
                style={{
                  borderColor: 'transparent',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = glowColors.color;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = 'transparent';
                }}
              >
                {t.projects.viewProject}
              </span>
              <svg className="w-5 h-5 transition-transform group-hover/link:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </div>
        </div>
    </motion.article>
  );
}

function PersonalProjectCard({ project, index, isInView, t }: { project: PersonalProject; index: number; isInView: boolean; t: any }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  const [transform, setTransform] = useState({
    currentRX: 0,
    currentRY: 0,
    targetRX: 0,
    targetRY: 0,
  });

  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = (e.clientX - centerX) / (rect.width / 2);
      const deltaY = (e.clientY - centerY) / (rect.height / 2);

      setTransform((prev) => ({
        ...prev,
        targetRY: deltaX * 10,
        targetRX: -deltaY * 10,
      }));
    };

    const handleMouseLeave = () => {
      setIsHovered(false);
      setTransform((prev) => ({
        ...prev,
        targetRY: 0,
        targetRX: 0,
      }));
    };

    const handleMouseEnter = () => {
      setIsHovered(true);
    };

    const lerpFactor = 0.08;
    let animationFrame: number;

    const animate = () => {
      setTransform((prev) => {
        const newState = {
          currentRX: prev.currentRX + (prev.targetRX - prev.currentRX) * lerpFactor,
          currentRY: prev.currentRY + (prev.targetRY - prev.currentRY) * lerpFactor,
          targetRX: prev.targetRX,
          targetRY: prev.targetRY,
        };

        if (card) {
          card.style.transform = `perspective(1000px) rotateY(${newState.currentRY}deg) rotateX(${newState.currentRX}deg)`;
        }

        return newState;
      });

      animationFrame = requestAnimationFrame(animate);
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseleave", handleMouseLeave);
    card.addEventListener("mouseenter", handleMouseEnter);
    animate();

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
      <motion.a
        href={project.url}
        target="_blank"
        rel="noopener noreferrer"
        data-umami-event="Personal Project Click"
        data-umami-event-project={project.title}
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { 
          opacity: 1, 
          y: 0,
          boxShadow: isHovered 
            ? `0 0 60px color-mix(in srgb, var(--accent-color) 50%, transparent), 0 0 120px color-mix(in srgb, var(--accent-color) 30%, transparent), 0 12px 48px 0 rgba(0, 0, 0, 0.5), inset 0 2px 2px 0 rgba(255, 255, 255, 0.12)`
            : "0 8px 32px 0 rgba(0, 0, 0, 0.4), inset 0 1px 1px 0 rgba(255, 255, 255, 0.08)"
        } : {}}
        transition={{ 
          duration: 0.6, 
          delay: index * 0.1,
          boxShadow: { duration: 0.4, ease: [0.22, 1, 0.36, 1] }
        }}
        className="group relative overflow-hidden rounded-2xl p-6 hover:border-green/40 transition-colors duration-300 block"
        style={{
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
          backdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
          WebkitBackdropFilter: 'blur(60px) saturate(200%) brightness(1.1)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
        }}
      >
        <div className="relative aspect-[16/10] mb-4 overflow-hidden rounded-lg bg-bg-secondary">
          <Image
            src={`/${project.title.split('.')[0]}.png`}
            alt={`${project.title} preview`}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            loading="lazy"
            quality={50}
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
          />
        </div>

        <h4 
          className="text-xl font-bold text-text mb-2 transition-colors"
          onMouseEnter={(e) => {
            e.currentTarget.style.color = 'var(--accent-color)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '';
          }}
        >
          {project.title}
        </h4>
        
        <p className="text-sm text-text-secondary/70 mb-4 line-clamp-2">
          {project.title === "xtra.bio" ? t.projects.xtraBioDescription : project.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.technologies.map((tech, idx) => (
            <span
              key={idx}
              className="px-2 py-1 rounded text-xs border border-white/[0.06] bg-bg-secondary text-text/60"
            >
              {tech}
            </span>
          ))}
        </div>

        <div 
          className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none" 
          style={{
            background: `linear-gradient(to bottom right, color-mix(in srgb, var(--accent-color) 5%, transparent), transparent, transparent)`
          }}
        />
      </motion.a>
    </div>
  );
}

export default function Projects() {
  const { t } = useTheme();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [expandedPersonal, setExpandedPersonal] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <section
      id="work"
      ref={ref}
      className="relative overflow-hidden bg-bg-secondary px-4 sm:px-6 py-16 sm:py-20 md:py-32"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <motion.span 
            className="inline-flex items-center gap-2 mb-4 px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide"
            style={{
              border: `1px solid color-mix(in srgb, var(--accent-color) 20%, transparent)`,
              background: `color-mix(in srgb, var(--accent-color) 5%, transparent)`,
              color: 'var(--accent-color)'
            }}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.6 }}
          >
            <span className="relative flex h-2 w-2">
              <span 
                className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75"
                style={{ backgroundColor: 'var(--accent-color)' }}
              ></span>
              <span 
                className="relative inline-flex h-2 w-2 rounded-full"
                style={{ backgroundColor: 'var(--accent-color)' }}
              ></span>
            </span>
            {t.projects.myWork}
          </motion.span>
          
          <h2 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">
            {t.projects.featuredProject}s
          </h2>
          
          <p className="text-lg sm:text-xl text-text-secondary/70 max-w-2xl mx-auto">
            {t.projects.projectsSubtitle}
          </p>
        </motion.div>

        <div className="space-y-24 sm:space-y-32 md:space-y-40">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} t={t} />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="mt-24 sm:mt-32 md:mt-40"
        >
          <div className="mb-12 text-center">
            <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              {t.projects.personalProjects}
            </h3>
            <p className="text-base sm:text-lg text-text-secondary/70">
              {t.projects.sideProjectsSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {personalProjects.slice(0, isMobile && !expandedPersonal ? 2 : expandedPersonal ? personalProjects.length : 3).map((project, index) => (
              <PersonalProjectCard
                key={project.id}
                project={project}
                index={index}
                isInView={isInView}
                t={t}
              />
            ))}
          </div>

          {(isMobile ? personalProjects.length > 2 : personalProjects.length > 3) && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="mt-8 text-center"
            >
              <motion.button
                onClick={() => setExpandedPersonal(!expandedPersonal)}
                className="group inline-flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all"
                style={{
                  border: `1px solid color-mix(in srgb, var(--accent-color) 20%, transparent)`,
                  background: `color-mix(in srgb, var(--accent-color) 5%, transparent)`,
                  color: 'var(--accent-color)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = `color-mix(in srgb, var(--accent-color) 10%, transparent)`;
                  e.currentTarget.style.borderColor = `color-mix(in srgb, var(--accent-color) 30%, transparent)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = `color-mix(in srgb, var(--accent-color) 5%, transparent)`;
                  e.currentTarget.style.borderColor = `color-mix(in srgb, var(--accent-color) 20%, transparent)`;
                }}
              >
                <span>{expandedPersonal ? t.projects.viewLess : t.projects.viewMore}</span>
                <motion.svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                  animate={{ rotate: expandedPersonal ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </motion.svg>
              </motion.button>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
