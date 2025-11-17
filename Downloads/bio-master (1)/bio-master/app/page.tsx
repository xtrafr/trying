'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import ParticleBackground from './components/ParticleBackground';
import EnterScreen from './components/EnterScreen';
import SpotifyWidget from './components/SpotifyWidget';
import DiscordWidget from './components/DiscordWidget';
import AudioVisualizer from './components/AudioVisualizer';

const links = [
  { icon: 'fa-solid fa-globe', label: 'Portfolio', href: 'https://xtra.wtf', color: 'from-blue-500 to-cyan-500' },
  { icon: 'fab fa-github', label: 'GitHub', href: 'https://github.com/xtrafr', color: 'from-gray-500 to-gray-700' },
  { icon: 'fab fa-discord', label: 'Discord', href: 'https://discord.com/invite/sMjPPaKk', color: 'from-indigo-500 to-purple-600' },
];

export default function Home() {
  const [showEnter, setShowEnter] = useState(true);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [activeWidget, setActiveWidget] = useState<'spotify' | 'discord'>('spotify');
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const springConfig = { damping: 25, stiffness: 150 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth - 0.5) * 2;
      const y = (clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
      cursorX.set(clientX);
      cursorY.set(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [cursorX, cursorY]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
    };
  }, []);

  const handleEnter = () => {
    setShowEnter(false);
  };

  return (
    <>
      <AnimatePresence>
        {showEnter && <EnterScreen onEnter={handleEnter} />}
      </AnimatePresence>

      {!showEnter && (
        <>
          <ParticleBackground />
          <AudioVisualizer isPlaying={isPlaying} />

          <motion.div
            className="fixed w-[400px] md:w-[600px] h-[400px] md:h-[600px] rounded-full pointer-events-none z-0 hidden md:block"
            style={{
              background: 'radial-gradient(circle, rgba(239, 68, 68, 0.15) 0%, transparent 70%)',
              filter: 'blur(80px)',
              x: cursorXSpring,
              y: cursorYSpring,
              translateX: '-50%',
              translateY: '-50%',
            }}
          />

          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            className="relative w-full min-h-screen overflow-x-hidden flex items-center justify-center"
          >
            <motion.div
              className="absolute top-1/4 left-1/4 w-[300px] md:w-[400px] h-[300px] md:h-[400px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(239, 68, 68, 0.2) 0%, transparent 70%)',
                filter: 'blur(100px)',
              }}
              animate={{
                x: [0, 30, 0],
                y: [0, -20, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <motion.div
              className="absolute bottom-1/4 right-1/4 w-[350px] md:w-[500px] h-[350px] md:h-[500px] rounded-full pointer-events-none"
              style={{
                background: 'radial-gradient(circle, rgba(220, 38, 38, 0.15) 0%, transparent 70%)',
                filter: 'blur(100px)',
              }}
              animate={{
                x: [0, -25, 0],
                y: [0, 20, 0],
                scale: [1, 1.03, 1],
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />

            <div className="relative flex flex-col lg:flex-row items-center justify-between w-full max-w-7xl mx-auto px-4 md:px-8 gap-8 lg:gap-16 py-8 lg:py-0">
              <motion.div
                className="flex-1 flex flex-col items-center w-full lg:w-auto"
                style={{
                  x: mousePosition.x * 8,
                  y: mousePosition.y * 8,
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              >
                <Tilt
                  tiltMaxAngleX={15}
                  tiltMaxAngleY={15}
                  glareEnable={false}
                  scale={1.05}
                  transitionSpeed={2000}
                  className="mb-4 md:mb-6"
                  tiltEnable={typeof window !== 'undefined' && window.innerWidth > 768}
                >
                  <motion.div
                    className="relative"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: 0.2, type: 'spring', stiffness: 200, damping: 15 }}
                  >
                    <motion.div
                      className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-[rgba(239,68,68,0.5)] shadow-[0_0_40px_rgba(239,68,68,0.4)] relative overflow-hidden"
                      whileHover={{ scale: 1.1, boxShadow: '0 0 80px rgba(239, 68, 68, 0.8)' }}
                      transition={{ duration: 0.3 }}
                    >
                      <img 
                        src="/pfp.png" 
                        alt="Profile"
                        className="w-full h-full object-cover"
                      />
                      <motion.div
                        className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent pointer-events-none"
                        animate={{
                          rotate: [0, 360],
                        }}
                        transition={{
                          duration: 3,
                          repeat: Infinity,
                          ease: 'linear',
                        }}
                      />
                    </motion.div>
                    <div className="absolute bottom-2 right-2 bg-black border-4 border-accent rounded-full w-7 h-7 flex items-center justify-center">
                      <motion.div
                        className="w-3 h-3 bg-accent rounded-full"
                        animate={{ 
                          opacity: [1, 0.4, 1], 
                          scale: [1, 0.8, 1],
                          boxShadow: [
                            '0 0 0px rgba(239, 68, 68, 0.5)',
                            '0 0 10px rgba(239, 68, 68, 0.8)',
                            '0 0 0px rgba(239, 68, 68, 0.5)',
                          ],
                        }}
                        transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                      />
                    </div>
                  </motion.div>
                </Tilt>

                <motion.h1
                  className="text-6xl md:text-7xl lg:text-8xl font-bold text-gradient mb-2 md:mb-4 relative"
                  style={{ letterSpacing: '-0.03em' }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4, duration: 0.8 }}
                >
                  <motion.span
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
                      fontFamily: 'var(--font-poppins)',
                    }}
                  >
                    grbmz
                  </motion.span>
                </motion.h1>

                <motion.p
                  className="text-base md:text-lg text-muted mb-6 md:mb-8 font-light"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6, duration: 0.8 }}
                >
                  Crypto millionaire
                </motion.p>

                <motion.div
                  className="w-full max-w-sm px-4 md:px-0 relative"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 }}
                >
                  <div className="relative" style={{
                    transform: `translate(${mousePosition.x * -4}px, ${mousePosition.y * -4}px)`,
                  }}>
                    <button
                      onClick={() => setActiveWidget(activeWidget === 'spotify' ? 'discord' : 'spotify')}
                      className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-8 md:-translate-x-12 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer z-20 transition-all duration-200 hover:scale-110 hover:bg-white/10 hover:border-accent/30 active:scale-90 shadow-lg"
                    >
                      <i className="fas fa-chevron-left text-white/60 hover:text-accent text-sm" />
                    </button>

                    <button
                      onClick={() => setActiveWidget(activeWidget === 'spotify' ? 'discord' : 'spotify')}
                      className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-8 md:translate-x-12 w-9 h-9 md:w-10 md:h-10 rounded-full bg-white/5 backdrop-blur-md border border-white/10 flex items-center justify-center cursor-pointer z-20 transition-all duration-200 hover:scale-110 hover:bg-white/10 hover:border-accent/30 active:scale-90 shadow-lg"
                    >
                      <i className="fas fa-chevron-right text-white/60 hover:text-accent text-sm" />
                    </button>

                    <Tilt
                      tiltMaxAngleX={10}
                      tiltMaxAngleY={10}
                      scale={1.02}
                      transitionSpeed={2000}
                      className="h-full"
                    >
                      <div className="h-[240px] md:h-[260px]">
                        <AnimatePresence mode="wait">
                          {activeWidget === 'spotify' ? (
                            <motion.div
                              key="spotify"
                              initial={{ opacity: 0, y: 10, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.98 }}
                              transition={{ 
                                duration: 0.4,
                                ease: [0.4, 0, 0.2, 1]
                              }}
                              className="h-full"
                            >
                              <SpotifyWidget audioRef={audioRef} />
                            </motion.div>
                          ) : (
                            <motion.div
                              key="discord"
                              initial={{ opacity: 0, y: 10, scale: 0.98 }}
                              animate={{ opacity: 1, y: 0, scale: 1 }}
                              exit={{ opacity: 0, y: -10, scale: 0.98 }}
                              transition={{ 
                                duration: 0.4,
                                ease: [0.4, 0, 0.2, 1]
                              }}
                              className="h-full"
                            >
                              <DiscordWidget />
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </Tilt>
                  </div>

                  <div className="flex items-center justify-center gap-2 mt-4" style={{
                    transform: `translate(${mousePosition.x * -4}px, ${mousePosition.y * -4}px)`,
                  }}>
                    <button
                      onClick={() => setActiveWidget('spotify')}
                      className="w-2 h-2 rounded-full cursor-pointer border-0 p-0 transition-all duration-200 hover:scale-125 active:scale-90"
                      style={{
                        backgroundColor: activeWidget === 'spotify' ? '#ef4444' : 'rgba(255, 255, 255, 0.3)',
                      }}
                    />
                    <button
                      onClick={() => setActiveWidget('discord')}
                      className="w-2 h-2 rounded-full cursor-pointer border-0 p-0 transition-all duration-200 hover:scale-125 active:scale-90"
                      style={{
                        backgroundColor: activeWidget === 'discord' ? '#ef4444' : 'rgba(255, 255, 255, 0.3)',
                      }}
                    />
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                className="flex-1 w-full lg:w-auto max-w-md px-4 md:px-0"
                style={{
                  x: mousePosition.x * -6,
                  y: mousePosition.y * -6,
                }}
                transition={{ type: 'spring', stiffness: 100, damping: 20 }}
              >
                <ul className="list-none p-0 m-0 flex flex-col gap-3 md:gap-4 w-full">
                  {links.map((link, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: 50 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ 
                        delay: index * 0.1 + 0.5,
                        type: 'spring',
                        stiffness: 200,
                        damping: 20,
                      }}
                    >
                      <Tilt
                        tiltMaxAngleX={8}
                        tiltMaxAngleY={8}
                        scale={1.03}
                        transitionSpeed={1500}
                      >
                        <motion.a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center gap-3 w-full py-4 md:py-5 px-5 md:px-6 glass rounded-2xl text-foreground no-underline text-sm md:text-base font-medium relative overflow-hidden group"
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                        >
                          <motion.div
                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            style={{
                              background: `linear-gradient(135deg, rgba(239, 68, 68, 0.1) 0%, transparent 100%)`,
                            }}
                          />
                          
                          <motion.div
                            className={`absolute inset-0 opacity-0 group-hover:opacity-30 blur-xl`}
                            style={{
                              background: `linear-gradient(135deg, #ef4444 0%, #dc2626 100%)`,
                            }}
                          />

                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"
                            initial={{ x: '-100%' }}
                            whileHover={{ x: '100%' }}
                            transition={{ duration: 0.6, ease: 'easeInOut' }}
                          />

                          <motion.i 
                            className={`${link.icon} text-xl md:text-2xl text-accent relative z-10`}
                            suppressHydrationWarning
                            whileHover={{ 
                              rotate: [0, -10, 10, -10, 0],
                              scale: 1.2,
                            }}
                            transition={{ duration: 0.5 }}
                          />
                          <span className="relative z-10 font-semibold">{link.label}</span>
                          
                          <motion.i
                            className="fa-solid fa-arrow-right text-accent relative z-10 ml-auto opacity-0 group-hover:opacity-100 text-sm md:text-base"
                            suppressHydrationWarning
                            initial={{ x: -10 }}
                            whileHover={{ x: 0 }}
                            transition={{ duration: 0.3 }}
                          />
                        </motion.a>
                      </Tilt>
                    </motion.li>
                  ))}
                </ul>
              </motion.div>
            </div>
          </motion.main>
        </>
      )}
    </>
  );
}