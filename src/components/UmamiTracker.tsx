"use client";

import { useEffect } from "react";

// Extend Window interface for Umami
declare global {
  interface Window {
    umami?: {
      track: (eventName: string, eventData?: Record<string, any>) => void;
    };
  }
}

export default function UmamiTracker() {
  useEffect(() => {
    // Track scroll depth
    let maxScroll = 0;
    let tracked25 = false;
    let tracked50 = false;
    let tracked75 = false;
    let tracked100 = false;

    const handleScroll = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const scrollPercent = (scrollTop / (documentHeight - windowHeight)) * 100;

      if (scrollPercent > maxScroll) {
        maxScroll = scrollPercent;

        if (maxScroll >= 25 && !tracked25) {
          tracked25 = true;
          if (window.umami) window.umami.track('scroll-depth', { percent: 25 });
        }
        if (maxScroll >= 50 && !tracked50) {
          tracked50 = true;
          if (window.umami) window.umami.track('scroll-depth', { percent: 50 });
        }
        if (maxScroll >= 75 && !tracked75) {
          tracked75 = true;
          if (window.umami) window.umami.track('scroll-depth', { percent: 75 });
        }
        if (maxScroll >= 95 && !tracked100) {
          tracked100 = true;
          if (window.umami) window.umami.track('scroll-depth', { percent: 100 });
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return null;
}
