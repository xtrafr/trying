"use client";

import { useEffect, useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CustomCursor() {
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const cursorSize = useMotionValue(1);
  
  // Ultra-smooth spring configuration
  const springConfig = { damping: 25, stiffness: 700, mass: 0.5 };
  const smoothX = useSpring(cursorX, springConfig);
  const smoothY = useSpring(cursorY, springConfig);
  const smoothSize = useSpring(cursorSize, { damping: 20, stiffness: 300 });
  
  const ringX = useMotionValue(-100);
  const ringY = useMotionValue(-100);
  const smoothRingX = useSpring(ringX, { damping: 30, stiffness: 200, mass: 0.6 });
  const smoothRingY = useSpring(ringY, { damping: 30, stiffness: 200, mass: 0.6 });

  useEffect(() => {
    let rafId: number;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (rafId) {
        cancelAnimationFrame(rafId);
      }
      
      rafId = requestAnimationFrame(() => {
        cursorX.set(e.clientX - 4);
        cursorY.set(e.clientY - 4);
        ringX.set(e.clientX - 20);
        ringY.set(e.clientY - 20);

        const target = e.target as HTMLElement;
        const isInteractive = 
          target.tagName === "A" ||
          target.tagName === "BUTTON" ||
          target.closest("a") !== null ||
          target.closest("button") !== null ||
          window.getComputedStyle(target).cursor === "pointer";
        
        cursorSize.set(isInteractive ? 1.8 : 1);
      });
    };

    const handleMouseLeave = () => {
      cursorX.set(-100);
      cursorY.set(-100);
      ringX.set(-100);
      ringY.set(-100);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave);
    
    return () => {
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [cursorX, cursorY, ringX, ringY, cursorSize]);

  return (
    <>
      {/* Main cursor dot - instant and precise */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-green rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: smoothX,
          y: smoothY,
          scale: smoothSize,
        }}
      />

      {/* Cursor ring - follows with slight delay */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-green/60 rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          x: smoothRingX,
          y: smoothRingY,
          scale: smoothSize,
        }}
      />
    </>
  );
}
