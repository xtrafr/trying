// API utility for fetching analytics data from same site

const API_BASE_URL = '/api'

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

