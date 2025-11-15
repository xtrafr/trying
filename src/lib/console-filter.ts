if (typeof window !== 'undefined') {
  let hasErrors = false;
  
  const originalConsoleError = console.error;
  const originalConsoleWarn = console.warn;
  const originalConsoleLog = console.log;

  console.error = (...args) => {
    const message = typeof args[0] === 'string' ? args[0] : '';
    
    if (
      message.includes('Download the React DevTools') ||
      message.includes('did not match') ||
      message.includes('Warning:') ||
      message.includes('Prop `') ||
      message.includes('webpack-internal') ||
      message.includes('data-umami')
    ) {
      return;
    }
    
    hasErrors = true;
    originalConsoleError.apply(console, args);
  };

  console.warn = (...args) => {
    const message = typeof args[0] === 'string' ? args[0] : '';
    
    if (
      message.includes('Download the React DevTools') ||
      message.includes('DevTools') ||
      message.includes('Warning')
    ) {
      return;
    }
    
    originalConsoleWarn.apply(console, args);
  };

  console.log = (...args) => {
    const message = typeof args[0] === 'string' ? args[0] : '';
    
    if (
      message.includes('[Vercel Web Analytics]') ||
      message.includes('[Fast Refresh]') ||
      message.includes('Debug mode') ||
      message.includes('pageview') ||
      message.includes('Running queued') ||
      message.includes('Compiled') ||
      (message.includes('[Umami]') && process.env.NODE_ENV === 'production')
    ) {
      return;
    }
    
    originalConsoleLog.apply(console, args);
  };
  
  setTimeout(() => {
    if (!hasErrors && process.env.NODE_ENV === 'development') {
      console.clear();
      const style = 'color: #0db76b; font-weight: bold; font-size: 14px;';
      console.log('%c✓ All loaded correctly', style);
    }
  }, 1000);
}

export {}
