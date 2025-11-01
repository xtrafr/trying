// Analytics tracker for main website
// Sends data to analytics dashboard API

const ANALYTICS_API_URL = '/api'

// Get user's IP address
const getUserIP = async () => {
  try {
    const response = await fetch('https://api.ipify.org?format=json')
    const data = await response.json()
    return data.ip
  } catch (error) {
    console.error('Error getting IP:', error)
    return 'unknown'
  }
}

// Get IP location info
const getIPLocation = async (ip) => {
  try {
    if (ip === 'unknown') {
      // Try to get location from browser
      const response = await fetch('https://ipapi.co/json/')
      const data = await response.json()
      return {
        country: data.country_name || 'Unknown',
        city: data.city || 'Unknown',
        countryCode: data.country_code || 'Unknown'
      }
    }
    
    const response = await fetch(`https://ipapi.co/${ip}/json/`)
    const data = await response.json()
    return {
      country: data.country_name || 'Unknown',
      city: data.city || 'Unknown',
      countryCode: data.country_code || 'Unknown'
    }
  } catch (error) {
    console.error('Error getting IP location:', error)
    return {
      country: 'Unknown',
      city: 'Unknown',
      countryCode: 'Unknown'
    }
  }
}

// Track page view
export const trackPageView = async () => {
  try {
    const ip = await getUserIP()
    const location = await getIPLocation(ip)
    
    await fetch(`${ANALYTICS_API_URL}/analytics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'pageview',
        data: {
          ip,
          country: location.country,
          city: location.city,
          countryCode: location.countryCode,
          userAgent: navigator.userAgent,
          referer: document.referrer || 'Direct',
          path: window.location.pathname,
          timestamp: new Date().toISOString()
        }
      }),
    })
  } catch (error) {
    // Silently fail - don't break the website if analytics fails
    console.error('Analytics error:', error)
  }
}

// Track connection event
export const trackConnection = async () => {
  try {
    const ip = await getUserIP()
    const location = await getIPLocation(ip)
    
    await fetch(`${ANALYTICS_API_URL}/analytics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'connection',
        data: {
          ip,
          country: location.country,
          city: location.city,
          countryCode: location.countryCode,
          userAgent: navigator.userAgent,
          referer: document.referrer || 'Direct',
          timestamp: new Date().toISOString()
        }
      }),
    })
  } catch (error) {
    // Silently fail
    console.error('Analytics error:', error)
  }
}

// Track bandwidth usage
export const trackBandwidth = async (bytes) => {
  try {
    await fetch(`${ANALYTICS_API_URL}/analytics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type: 'bandwidth',
        data: { bytes }
      }),
    })
  } catch (error) {
    // Silently fail
    console.error('Analytics error:', error)
  }
}

// Initialize analytics
export const initAnalytics = async () => {
  // Track initial connection
  await trackConnection()
  
  // Track initial page view
  await trackPageView()
  
  // Track bandwidth (approximate page size)
  const pageSize = document.documentElement.outerHTML.length
  await trackBandwidth(pageSize)
}

