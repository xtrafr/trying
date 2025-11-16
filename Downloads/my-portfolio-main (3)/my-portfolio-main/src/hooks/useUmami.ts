"use client";

import { useRef, useCallback, useState, useEffect } from 'react';

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: Record<string, any>) => void;
    };
  }
}

interface TrackingCache {
  [key: string]: number;
}

const RATE_LIMIT_WINDOW = 30000; // 30 seconds

const trackingCache: TrackingCache = {};

export function useUmami() {
  const cacheRef = useRef<TrackingCache>(trackingCache);
  const [isMounted, setIsMounted] = useState(false);
  const isBrowser = typeof window !== 'undefined';

  useEffect(() => {
    if (isBrowser) {
      setIsMounted(true);
    }
  }, [isBrowser]);

  const track = useCallback((eventName: string, eventData?: Record<string, any>) => {
    if (!isBrowser || !window.umami || !isMounted) {
      return;
    }

    const now = Date.now();
    const cacheKey = `${eventName}-${JSON.stringify(eventData || {})}`;
    const lastTracked = cacheRef.current[cacheKey];

    if (lastTracked && now - lastTracked < RATE_LIMIT_WINDOW) {
      console.log(`[Umami] Rate limited: ${eventName}`);
      return;
    }

    cacheRef.current[cacheKey] = now;

    try {
      window.umami.track(eventName, eventData);
      console.log(`[Umami] Tracked: ${eventName}`, eventData);
    } catch (error) {
      console.error('[Umami] Tracking error:', error);
    }
  }, [isBrowser, isMounted]);

  const trackProjectView = useCallback((projectName: string) => {
    track('project-view', { project: projectName });
  }, [track]);

  const trackProjectClick = useCallback((projectName: string, type: 'image' | 'cta') => {
    track('project-click', { 
      project: projectName,
      type 
    });
  }, [track]);

  const trackDiscordClick = useCallback(() => {
    track('discord-click');
  }, [track]);

  return {
    track,
    trackProjectView,
    trackProjectClick,
    trackDiscordClick,
  };
}
