'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

export default function EnterScreen({ onEnter }: { onEnter: () => void }) {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 5,
        y: (e.clientY / window.innerHeight - 0.5) * 5,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: 'easeInOut' }}
      onClick={onEnter}
      className="fixed inset-0 bg-black flex flex-col justify-center items-center z-[9999] cursor-pointer overflow-hidden"
    >
      <motion.div
        className="absolute top-1/4 left-1/3 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(239, 68, 68, 0.3) 0%, transparent 70%)',
          filter: 'blur(100px)',
          x: mousePosition.x,
          y: mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      />

      <motion.div
        className="absolute bottom-1/3 right-1/4 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(220, 38, 38, 0.25) 0%, transparent 70%)',
          filter: 'blur(100px)',
          x: -mousePosition.x,
          y: -mousePosition.y,
        }}
        transition={{ type: 'spring', stiffness: 50, damping: 20 }}
      />

      <motion.div
        className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 relative z-10"
        style={{
          letterSpacing: '-0.03em',
          x: mousePosition.x * 0.5,
          y: mousePosition.y * 0.5,
        }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
        initial={{ scale: 0.5, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
      >
        <motion.span
          className="inline-block"
          animate={{
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
          }}
          transition={{
            duration: 5,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            background: 'linear-gradient(90deg, #ef4444 0%, #dc2626 25%, #ef4444 50%, #dc2626 75%, #ef4444 100%)',
            backgroundSize: '200% 100%',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
          }}
        >
          grbmz.bio
        </motion.span>
      </motion.div>

      <motion.div
        className="flex items-center gap-3 text-lg text-muted relative z-10"
        animate={{ opacity: [1, 0.5, 1] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          x: -mousePosition.x * 0.3,
          y: -mousePosition.y * 0.3,
        }}
      >
        <motion.i
          className="fa-solid fa-hand-pointer text-black"
          suppressHydrationWarning
          animate={{
            y: [0, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        />
        <span>Click anywhere to enter</span>
      </motion.div>
    </motion.div>
  );
}
