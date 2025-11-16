"use client";

/**
 * Navbar, hides when you scroll down, shows when scrolling up
 * @author xtra
 * 
 * tracks which section you're on with that sliding indicator,
 * mobile menu has the backdrop blur effect (pretty clean)
 */

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";

export default function Navbar() {
  const { t } = useTheme();
  const [hidden, setHidden] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // nav links
  const navLinks = [
    { href: "#work", label: t.nav.work },
    { href: "#expertise", label: t.nav.expertise },
    { href: "#about", label: t.nav.about },
    { href: "#contact", label: t.nav.contact },
  ];

  // lock scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    // cleanup
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen]);
  
  const { scrollY } = useScroll();

  // hide navbar when scrolling down
  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (previous !== undefined && latest > previous && latest > 150) {
      setHidden(true); // going down
    } else {
      setHidden(false); // going up or at top
    }
  });

  // figure out which section is visible
  useEffect(() => {
    let ticking = false; // throttle for performance

    const handleScroll = () => {
      if (ticking) return; // already processing
      
      ticking = true;
      window.requestAnimationFrame(() => {
        const sections = navLinks.map((link) => link.href.replace("#", ""));
        const scrollPosition = window.scrollY + 200; // offset for better feel

        // check which section we're in
        for (const section of sections) {
          const element = document.getElementById(section);
          if (element) {
            const { offsetTop, offsetHeight } = element;
            if (
              scrollPosition >= offsetTop &&
              scrollPosition < offsetTop + offsetHeight
            ) {
              setActiveSection(`#${section}`);
              break;
            }
          }
        }
        ticking = false;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true }); // passive for perf
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // smooth scroll with navbar offset
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.querySelector(href);
    if (element) {
      const offset = 80; // navbar height
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      // auto instead of smooth cuz we use lenis
      window.scrollTo({
        top: offsetPosition,
        behavior: "auto",
      });
    }
  };

  return (
    <motion.nav
      variants={{
        visible: { y: 0, opacity: 1 },
        hidden: { y: "-100%", opacity: 0 }, // slides up
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed top-0 left-0 right-0 z-40"
      style={{
        // liquid glass vibe
        background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.04) 100%)',
        backdropFilter: 'blur(30px) saturate(180%)',
        WebkitBackdropFilter: 'blur(30px) saturate(180%)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.1), inset 0 0 20px rgba(255, 255, 255, 0.08), inset 0 2px 4px rgba(255, 255, 255, 0.1)'
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Link
              href="/"
              className="text-[1.75rem] font-bold tracking-[-0.02em] text-gradient leading-none"
            >
              xtra
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={(e) => handleClick(e, link.href)}
                className={cn(
                  "relative text-[14px] font-semibold transition-colors hover:text-text",
                  activeSection === link.href ? "text-text" : "text-text-secondary"
                )}
              >
                {link.label}
                {/* sliding indicator for active section */}
                {activeSection === link.href && (
                  <motion.div
                    layoutId="activeSection" // smooth transitions
                    className="absolute -bottom-[21px] left-0 right-0 h-0.5"
                    style={{ backgroundColor: "var(--accent-color)" }}
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* hamburger menu */}
          <div className="flex md:hidden items-center gap-3">
            {/* Mobile Menu Button */}
            <motion.button
              className="relative z-50 flex h-10 w-10 flex-col items-center justify-center gap-1.5"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              whileTap={{ scale: 0.9 }} // click feedback
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
            >
              {/* Top line */}
              <motion.span
                className="h-0.5 w-6 bg-text"
                animate={mobileMenuOpen ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="h-0.5 w-6 bg-text"
                animate={mobileMenuOpen ? { opacity: 0, x: -20 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
              <motion.span
                className="h-0.5 w-6 bg-text"
                animate={mobileMenuOpen ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              />
            </motion.button>
          </div>
        </div>
      </div>

      {/* mobile menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* backdrop blur */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-bg/80 backdrop-blur-xl md:hidden z-30"
            />
            
            {/* menu with glass effect */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
              className="md:hidden border-t relative z-40"
              style={{
                background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0.06) 100%)',
                backdropFilter: 'blur(40px) saturate(200%) brightness(1.05)',
                WebkitBackdropFilter: 'blur(40px) saturate(200%) brightness(1.05)',
                borderTop: '1.5px solid rgba(255, 255, 255, 0.18)',
                boxShadow: '0 8px 40px rgba(0, 0, 0, 0.15), inset 0 0 30px rgba(255, 255, 255, 0.1), inset 0 2px 4px rgba(255, 255, 255, 0.15)'
              }}
            >
            <div className="px-6 py-4 space-y-3">
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ 
                    delay: idx * 0.05,
                    duration: 0.3,
                    ease: [0.22, 1, 0.36, 1]
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={(e) => {
                      handleClick(e, link.href);
                      setMobileMenuOpen(false);
                    }}
                    className="block py-3 px-4 rounded-lg text-[15px] font-semibold transition-all"
                    style={activeSection === link.href ? {
                      backgroundColor: "color-mix(in srgb, var(--accent-color) 10%, transparent)",
                      borderColor: "color-mix(in srgb, var(--accent-color) 20%, transparent)",
                      color: "var(--accent-color)"
                    } : undefined}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.nav>
  );
}