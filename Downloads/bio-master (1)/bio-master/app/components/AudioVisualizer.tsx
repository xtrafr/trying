'use client';

import { motion } from 'framer-motion';

interface AudioVisualizerProps {
  isPlaying?: boolean;
}

export default function AudioVisualizer({ isPlaying = true }: AudioVisualizerProps) {
  return (
    <div className="fixed bottom-5 right-5 flex gap-1 items-end h-8 md:h-10 opacity-60 z-[100]">
      {[0, 0.1, 0.2, 0.3, 0.4].map((delay, i) => (
        <motion.div
          key={i}
          className="w-[2px] md:w-[3px] bg-gradient-to-t from-accent to-accent-light rounded-[3px]"
          animate={{
            height: isPlaying ? ['8px', '32px', '8px'] : '8px',
          }}
          transition={{
            duration: 0.6,
            repeat: isPlaying ? Infinity : 0,
            ease: 'easeInOut',
            delay,
          }}
        />
      ))}
    </div>
  );
}
