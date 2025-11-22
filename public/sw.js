const CACHE_NAME = 'xenos-v1'
const urlsToCache = [
  '/',
  '/assets/covers/unlock-cover.png',
  '/assets/covers/perm-cover.png',
  '/assets/covers/trigger-cover.png',
  '/assets/images/private-website.png',
  '/assets/icons/favicon.ico',
  '/assets/icons/favicon-16x16.png',
  '/assets/icons/favicon-32x32.png',
  '/assets/icons/apple-touch-icon.png'
]

// Install event - cache resources
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache)
      })
  )
})

// Fetch event - serve from cache when offline
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        // Cache hit - return response
        if (response) {
          return response
        }

        // Clone the request
        const fetchRequest = event.request.clone()

        return fetch(fetchRequest).then((response) => {
          // Check if valid response
          if (!response || response.status !== 200 || response.type !== 'basic') {
            return response
          }

          // Clone the response
          const responseToCache = response.clone()

          // Cache images and assets
          if (event.request.url.match(/\.(png|jpg|jpeg|gif|svg|webp|avif|ico|woff2?|ttf|eot)$/)) {
            caches.open(CACHE_NAME)
              .then((cache) => {
                cache.put(event.request, responseToCache)
              })
          }

          return response
        })
      })
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName)
          }
        })
      )
    })
  )
})
