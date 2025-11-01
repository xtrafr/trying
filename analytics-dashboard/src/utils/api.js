// API utility for fetching analytics data

const API_BASE_URL = import.meta.env.VITE_API_URL || '/api'

export const fetchAnalytics = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics`)
    if (!response.ok) throw new Error('Failed to fetch analytics')
    return await response.json()
  } catch (error) {
    console.error('Error fetching analytics:', error)
    return null
  }
}

export const sendAnalyticsEvent = async (type, data) => {
  try {
    const response = await fetch(`${API_BASE_URL}/analytics`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ type, data }),
    })
    if (!response.ok) throw new Error('Failed to send analytics event')
    return await response.json()
  } catch (error) {
    console.error('Error sending analytics event:', error)
    return null
  }
}

// Get IP location info (using a free geolocation API)
export const getIPLocation = async (ip) => {
  try {
    // Using ipapi.co free tier
    const response = await fetch(`https://ipapi.co/${ip}/json/`)
    if (!response.ok) throw new Error('Failed to get IP location')
    const data = await response.json()
    return {
      country: data.country_name || 'Unknown',
      city: data.city || 'Unknown',
      countryCode: data.country_code || 'Unknown',
      flag: getCountryFlag(data.country_code),
    }
  } catch (error) {
    console.error('Error getting IP location:', error)
    return {
      country: 'Unknown',
      city: 'Unknown',
      countryCode: 'Unknown',
      flag: '🌍',
    }
  }
}

// Helper function to get country flag emoji
const getCountryFlag = (countryCode) => {
  if (!countryCode) return '🌍'
  
  const codePoints = countryCode
    .toUpperCase()
    .split('')
    .map(char => 127397 + char.charCodeAt())
  return String.fromCodePoint(...codePoints)
}

