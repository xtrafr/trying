// Cache version - auto-generated timestamp ensures fresh deploys
// This will be different on each build/deploy
const CACHE_VERSION = 'v3.0.0-' + Date.now()
const CACHE_NAME = `xenos-${CACHE_VERSION}`

// Only cache essential static assets (icons)
const STATIC_ASSETS = [
  '/assets/icons/favicon.ico',
  '/assets/icons/favicon-16x16.png',
  '/assets/icons/favicon-32x32.png',
  '/assets/icons/apple-touch-icon.png'
]

// Fallback HTML for when everything fails
const FALLBACK_HTML = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Xenos Services - Loading...</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      background: #0a0e1a; 
      color: #fff; 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      padding: 20px;
    }
    .container { max-width: 400px; }
    h1 { color: #06b6d4; margin-bottom: 16px; font-size: 24px; }
    p { color: #94a3b8; margin-bottom: 24px; line-height: 1.6; }
    button {
      background: linear-gradient(135deg, #06b6d4, #0891b2);
      color: white;
      border: none;
      padding: 14px 28px;
      border-radius: 8px;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      margin: 8px;
      transition: transform 0.2s, box-shadow 0.2s;
    }
    button:hover { transform: translateY(-2px); box-shadow: 0 4px 20px rgba(6,182,212,0.4); }
    .secondary { background: #1e293b; }
  </style>
</head>
<body>
  <div class="container">
    <h1>Connection Issue</h1>
    <p>We're having trouble loading the page. This could be a temporary network issue or cached data problem.</p>
    <button onclick="clearCacheAndReload()">Clear Cache & Reload</button>
    <button class="secondary" onclick="location.reload(true)">Try Again</button>
  </div>
  <script>
    async function clearCacheAndReload() {
      try {
        // Unregister all service workers
        const registrations = await navigator.serviceWorker.getRegistrations();
        await Promise.all(registrations.map(r => r.unregister()));
        
        // Clear all caches
        const cacheNames = await caches.keys();
        await Promise.all(cacheNames.map(name => caches.delete(name)));
        
        // Hard reload
        window.location.href = window.location.origin + '?cache_bust=' + Date.now();
      } catch (e) {
        window.location.reload(true);
      }
    }
  </script>
</body>
</html>
`

// Install event - cache minimal resources
self.addEventListener('install', (event) => {
  console.log('[SW] Installing new version:', CACHE_VERSION)
  
  // Force immediate activation
  self.skipWaiting()
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .catch((err) => console.warn('[SW] Cache addAll failed:', err))
  )
})

// Fetch event - Network first with proper error handling
self.addEventListener('fetch', (event) => {
  const request = event.request
  
  // Skip non-GET requests
  if (request.method !== 'GET') return
  
  // Skip non-http(s) requests (chrome-extension, etc.)
  if (!request.url.startsWith('http')) return
  
  // Skip Vercel analytics/insights
  if (request.url.includes('/_vercel/')) return
  
  // Skip API calls - always go to network
  if (request.url.includes('/api/')) {
    event.respondWith(
      fetch(request).catch(() => new Response(
        JSON.stringify({ error: 'Network error' }),
        { status: 503, headers: { 'Content-Type': 'application/json' }}
      ))
    )
    return
  }
  
  const isNavigationRequest = request.mode === 'navigate' || 
    request.headers.get('accept')?.includes('text/html')
  
  const isAssetRequest = request.url.match(/\.(js|css|mjs)$/)
  
  const isStaticAsset = request.url.match(/\.(png|jpg|jpeg|gif|svg|webp|avif|ico|woff2?|ttf|eot|mp4|webm)$/)
  
  // HTML Navigation Requests - Network first with fallback
  if (isNavigationRequest) {
    event.respondWith(
      fetch(request, { cache: 'no-store' })
        .then((response) => {
          if (!response.ok) throw new Error('Network response not ok: ' + response.status)
          return response
        })
        .catch((error) => {
          console.warn('[SW] Navigation fetch failed:', error.message)
          // Return fallback HTML with cache-clear button
          return new Response(FALLBACK_HTML, {
            status: 200,
            headers: { 
              'Content-Type': 'text/html; charset=utf-8',
              'Cache-Control': 'no-store'
            }
          })
        })
    )
    return
  }
  
  // JS/CSS Assets - Network first, cache fallback
  if (isAssetRequest) {
    event.respondWith(
      fetch(request, { cache: 'no-store' })
        .then((response) => {
          if (response.ok) {
            // Cache successful responses for offline fallback
            const responseClone = response.clone()
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone))
          }
          return response
        })
        .catch(() => {
          // Try cache as fallback
          return caches.match(request).then((cached) => {
            if (cached) return cached
            // If no cache, return empty response to prevent blank page
            console.warn('[SW] Asset not available:', request.url)
            return new Response('', { status: 503 })
          })
        })
    )
    return
  }
  
  // Static assets (images, fonts, videos) - Stale while revalidate
  if (isStaticAsset) {
    event.respondWith(
      caches.match(request).then((cached) => {
        const fetchPromise = fetch(request)
          .then((response) => {
            if (response.ok) {
              const responseClone = response.clone()
              caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone))
            }
            return response
          })
          .catch(() => cached || new Response('', { status: 404 }))
        
        return cached || fetchPromise
      })
    )
    return
  }
  
  // Default - network only
  event.respondWith(
    fetch(request, { cache: 'no-store' })
      .catch(() => new Response('', { status: 503 }))
  )
})

// Activate event - aggressively clean up old caches
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating new version:', CACHE_VERSION)
  
  event.waitUntil(
    Promise.all([
      // Delete ALL old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('[SW] Deleting old cache:', cacheName)
              return caches.delete(cacheName)
            }
          })
        )
      }),
      // Take control of all clients immediately
      self.clients.claim()
    ])
  )
})

// Listen for skip waiting message from page
self.addEventListener('message', (event) => {
  if (event.data === 'SKIP_WAITING') {
    self.skipWaiting()
  }
  if (event.data === 'CLEAR_CACHE') {
    caches.keys().then((names) => {
      names.forEach((name) => caches.delete(name))
    })
  }
})
