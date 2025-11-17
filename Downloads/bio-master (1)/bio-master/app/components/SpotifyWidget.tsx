'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface SpotifyTrack {
  name: string;
  artist: string;
  albumArt?: string;
}

interface SpotifyWidgetProps {
  audioRef?: React.RefObject<HTMLAudioElement>;
}

export default function SpotifyWidget({ audioRef }: SpotifyWidgetProps) {
  const [track, setTrack] = useState<SpotifyTrack | null>({
    name: 'Ahh',
    artist: 'Athletic Progression',
    albumArt: '/music icon.jpeg',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(97);
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const progressBarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const audio = audioRef?.current;
    if (!audio) return;

    const updateTime = () => {
      if (!isDragging) {
        setCurrentTime(audio.currentTime);
      }
    };
    const updateDuration = () => {
      if (audio.duration && isFinite(audio.duration)) {
        setDuration(audio.duration);
      }
    };
    const updatePlayingState = () => {
      setIsPlaying(!audio.paused);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('canplay', updateDuration);
    audio.addEventListener('play', updatePlayingState);
    audio.addEventListener('pause', updatePlayingState);

    if (audio.duration && isFinite(audio.duration)) {
      setDuration(audio.duration);
    }
    setIsPlaying(!audio.paused);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('canplay', updateDuration);
      audio.removeEventListener('play', updatePlayingState);
      audio.removeEventListener('pause', updatePlayingState);
    };
  }, [audioRef, isDragging]);

  const formatTime = (time: number) => {
    if (!isFinite(time)) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const updateTimeFromPosition = (clientX: number) => {
    if (!progressBarRef.current || !audioRef?.current || !duration) return;
    const rect = progressBarRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(0, Math.min(1, x / rect.width));
    const newTime = percentage * duration;
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const togglePlayPause = () => {
    if (!audioRef?.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    updateTimeFromPosition(e.clientX);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      e.preventDefault();
      updateTimeFromPosition(e.clientX);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, duration, audioRef]);

  return (
    <div className="w-full h-full">
      <motion.div
        className="glass rounded-[20px] p-4 md:p-6 relative overflow-hidden group h-full flex flex-col"
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 0 40px rgba(239, 68, 68, 0.3)',
        }}
        transition={{ duration: 0.3 }}
        style={{ willChange: 'transform' }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#ef4444]/10 to-transparent opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.5 }}
        />

        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-[#ef4444]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.5 }}
        />

        <div className="flex items-center gap-2 md:gap-3 mb-4 md:mb-5 relative z-10">
          <motion.i
            className="fab fa-spotify text-xl md:text-2xl text-[#ef4444]"
            suppressHydrationWarning
            animate={{ 
              rotate: [0, 5, -5, 0],
            }}
            transition={{ 
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <span className="text-base md:text-lg font-semibold text-foreground">Now Playing</span>
        </div>

        {track ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative z-10 flex-1 flex flex-col justify-between"
          >
            <div className="flex items-center gap-3 md:gap-4 mb-4 md:mb-5">
              <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gradient-to-br from-[#ef4444] to-[#dc2626] flex items-center justify-center text-2xl md:text-3xl overflow-hidden group/cover flex-shrink-0">
                {track.albumArt ? (
                  <img src={track.albumArt} alt="Album Art" className="w-full h-full rounded-xl object-cover" />
                ) : (
                  <motion.span
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    🎵
                  </motion.span>
                )}
                <button
                  onClick={togglePlayPause}
                  className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center opacity-0 group-hover/cover:opacity-100 transition-opacity duration-200 cursor-pointer border-0 rounded-xl"
                >
                  <i 
                    className={`fas ${isPlaying ? 'fa-pause' : 'fa-play'} text-white text-2xl`}
                    style={{ marginLeft: isPlaying ? '0' : '3px' }}
                  />
                </button>
              </div>
              <div className="flex-1 min-w-0">
                <div className="text-sm md:text-base font-semibold text-foreground mb-1 truncate">{track.name}</div>
                <div className="text-xs md:text-sm text-muted truncate">{track.artist}</div>
              </div>
            </div>

            <div className="space-y-2">
              <div 
                ref={progressBarRef}
                className="relative h-1.5 bg-white/10 rounded-full cursor-pointer group/progress"
                onMouseDown={handleMouseDown}
              >
                <div
                  className="absolute top-0 left-0 h-full bg-[#ef4444] rounded-full pointer-events-none"
                  style={{ width: `${duration ? (currentTime / duration) * 100 : 0}%` }}
                />
                <div
                  className="absolute top-1/2 w-3 h-3 bg-white rounded-full shadow-lg opacity-0 group-hover/progress:opacity-100 pointer-events-none transition-opacity"
                  style={{ 
                    left: `${duration ? (currentTime / duration) * 100 : 0}%`,
                    transform: 'translate(-50%, -50%)'
                  }}
                />
              </div>

              <div className="flex items-center justify-between text-xs text-muted pointer-events-none">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            className="text-center py-5 text-muted text-sm relative z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {isLoading ? (
              <motion.div className="flex items-center justify-center gap-2">
                <motion.div
                  className="w-2 h-2 bg-accent rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0 }}
                />
                <motion.div
                  className="w-2 h-2 bg-accent rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.2 }}
                />
                <motion.div
                  className="w-2 h-2 bg-accent rounded-full"
                  animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1, repeat: Infinity, delay: 0.4 }}
                />
              </motion.div>
            ) : (
              'Connect your Spotify account to display what you\'re listening to'
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
