import { useState, useEffect } from 'react'
import { Globe, MapPin, Clock, Activity } from 'lucide-react'
import { fetchAnalytics } from '../utils/api'

// Helper to get country flag
const getCountryFlag = (countryCode) => {
  if (!countryCode) return '🌍'
  const countryFlags = {
    'US': '🇺🇸', 'DE': '🇩🇪', 'GB': '🇬🇧', 'FR': '🇫🇷', 'CA': '🇨🇦',
    'NL': '🇳🇱', 'SE': '🇸🇪', 'JP': '🇯🇵', 'AU': '🇦🇺', 'SG': '🇸🇬'
  }
  return countryFlags[countryCode.toUpperCase()] || '🌍'
}

const IPTable = ({ connections = [] }) => {
  const [ips, setIPs] = useState([])

  // Transform connections data
  useEffect(() => {
    if (connections && connections.length > 0) {
      // Get unique IPs with latest connection info
      const ipMap = new Map()
      connections.forEach(conn => {
        const existing = ipMap.get(conn.ip)
        if (!existing || new Date(conn.timestamp) > new Date(existing.timestamp)) {
          ipMap.set(conn.ip, conn)
        }
      })

      const uniqueIPs = Array.from(ipMap.values()).slice(0, 20).map((conn, index) => ({
        id: index + 1,
        ip: conn.ip,
        country: conn.country || 'Unknown',
        city: conn.city || 'Unknown',
        flag: getCountryFlag(conn.countryCode),
        lastSeen: new Date(conn.timestamp),
        status: conn.status || 'active'
      }))

      setIPs(uniqueIPs)
    }
  }, [connections])

  const formatTime = (date) => {
    const seconds = Math.floor((Date.now() - date.getTime()) / 1000)
    if (seconds < 60) return `${seconds}s ago`
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    return `${Math.floor(seconds / 3600)}h ago`
  }

  return (
    <div className="bg-dark-card rounded-xl p-6 neon-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-neon-purple flex items-center justify-center">
            <Globe className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Connected IPs</h2>
            <p className="text-xs text-gray-400">Real-time connection monitoring</p>
          </div>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-primary/20">
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase">IP Address</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase">Location</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase">Last Seen</th>
              <th className="text-left py-3 px-4 text-xs font-semibold text-gray-400 uppercase">Status</th>
            </tr>
          </thead>
          <tbody>
            {ips.map((ip) => (
              <tr key={ip.id} className="border-b border-primary/10 hover:bg-dark-lighter/50 transition-colors">
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <Globe className="w-4 h-4 text-primary" />
                    <span className="font-mono text-sm text-white">{ip.ip}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{ip.flag}</span>
                    <div>
                      <div className="text-sm text-white">{ip.country}</div>
                      <div className="text-xs text-gray-400">{ip.city}</div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center gap-2 text-sm text-gray-300">
                    <Clock className="w-3 h-3" />
                    <span>{formatTime(ip.lastSeen)}</span>
                  </div>
                </td>
                <td className="py-3 px-4">
                  <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                    ip.status === 'active'
                      ? 'bg-green-500/10 text-green-400 border border-green-500/30'
                      : 'bg-yellow-500/10 text-yellow-400 border border-yellow-500/30'
                  }`}>
                    <Activity className={`w-3 h-3 ${ip.status === 'active' ? 'animate-pulse' : ''}`} />
                    {ip.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default IPTable

