// Vercel Serverless Function for storing analytics data
// In-memory storage (for demo purposes - use a real database in production)
// Note: Data will reset on serverless function cold start

let analyticsData = {
  connections: [],
  stats: {
    totalIPs: 0,
    activeConnections: 0,
    countries: new Set(),
    requests: 0,
    bandwidth: 0,
    uptime: {
      status: 'online',
      percentage: 99.98,
      startTime: new Date().toISOString()
    }
  }
}

export default async function handler(req, res) {
  // Set CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  res.setHeader('Access-Control-Max-Age', '86400')

  if (req.method === 'OPTIONS') {
    return res.status(200).end()
  }

  if (req.method === 'POST') {
    try {
      const { type, data } = req.body

      if (type === 'connection') {
        const connection = {
          id: Date.now() + Math.random(),
          ip: data.ip,
          country: data.country || 'Unknown',
          city: data.city || 'Unknown',
          countryCode: data.countryCode || 'Unknown',
          timestamp: new Date().toISOString(),
          userAgent: data.userAgent || 'Unknown',
          referer: data.referer || 'Direct',
          status: 'active'
        }

        analyticsData.connections.unshift(connection)
        
        if (analyticsData.connections.length > 1000) {
          analyticsData.connections = analyticsData.connections.slice(0, 1000)
        }

        if (data.country) {
          analyticsData.stats.countries.add(data.country)
        }
        analyticsData.stats.totalIPs = new Set(analyticsData.connections.map(c => c.ip)).size
        analyticsData.stats.activeConnections = analyticsData.connections.filter(c => c.status === 'active').length
        analyticsData.stats.requests += 1

        return res.status(200).json({ success: true, message: 'Connection logged' })
      }

      if (type === 'pageview') {
        analyticsData.stats.requests += 1
        
        if (data.ip) {
          const connection = {
            id: Date.now() + Math.random(),
            ip: data.ip,
            country: data.country || 'Unknown',
            city: data.city || 'Unknown',
            countryCode: data.countryCode || 'Unknown',
            timestamp: new Date().toISOString(),
            userAgent: data.userAgent || 'Unknown',
            referer: data.referer || 'Direct',
            status: 'active'
          }
          analyticsData.connections.unshift(connection)
          
          if (analyticsData.connections.length > 1000) {
            analyticsData.connections = analyticsData.connections.slice(0, 1000)
          }
          
          if (data.country) {
            analyticsData.stats.countries.add(data.country)
          }
          analyticsData.stats.totalIPs = new Set(analyticsData.connections.map(c => c.ip)).size
          analyticsData.stats.activeConnections = analyticsData.connections.filter(c => c.status === 'active').length
        }
        
        return res.status(200).json({ success: true })
      }

      if (type === 'bandwidth') {
        analyticsData.stats.bandwidth += data.bytes || 0
        return res.status(200).json({ success: true })
      }

      return res.status(400).json({ error: 'Invalid request type' })
    } catch (error) {
      console.error('Analytics API error:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  if (req.method === 'GET') {
    try {
      const response = {
        connections: analyticsData.connections,
        stats: {
          ...analyticsData.stats,
          countries: Array.from(analyticsData.stats.countries).length,
          countriesList: Array.from(analyticsData.stats.countries)
        },
        timestamp: new Date().toISOString()
      }

      return res.status(200).json(response)
    } catch (error) {
      console.error('Analytics API error:', error)
      return res.status(500).json({ error: 'Internal server error' })
    }
  }

  return res.status(405).json({ error: 'Method not allowed' })
}

