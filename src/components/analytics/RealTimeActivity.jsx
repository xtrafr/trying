import { useState, useEffect } from 'react'
import { Activity, Clock, Globe } from 'lucide-react'
import { fetchAnalytics } from '../../utils/analyticsApi'

const RealTimeActivity = () => {
  const [activities, setActivities] = useState([])

  useEffect(() => {
    const loadActivities = async () => {
      const data = await fetchAnalytics()
      if (data && data.connections) {
        // Transform connections to activities
        const recentConnections = data.connections
          .slice(0, 10)
          .map(conn => ({
            id: conn.id || Date.now() + Math.random(),
            action: 'Connection',
            country: conn.countryCode || 'Unknown',
            ip: conn.ip,
            time: new Date(conn.timestamp)
          }))
        setActivities(recentConnections)
      }
    }

    loadActivities()
    const interval = setInterval(loadActivities, 5000)
    return () => clearInterval(interval)
  }, [])

  const getActionColor = (action) => {
    if (action === 'Connection') return 'text-green-400 bg-green-500/10 border-green-500/30'
    if (action === 'Disconnect') return 'text-red-400 bg-red-500/10 border-red-500/30'
    if (action === 'Login') return 'text-blue-400 bg-blue-500/10 border-blue-500/30'
    return 'text-primary bg-primary/10 border-primary/30'
  }

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  return (
    <div className="bg-dark-card rounded-xl p-6 neon-border h-full">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-cyan-400 flex items-center justify-center">
          <Activity className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Real-Time Activity</h2>
          <p className="text-xs text-gray-400">Live connection events</p>
        </div>
      </div>

      <div className="space-y-3 max-h-[400px] overflow-y-auto custom-scrollbar">
        {activities.length > 0 ? activities.map((activity) => (
          <div
            key={activity.id}
            className="bg-dark-lighter rounded-lg p-3 border border-primary/10 hover:border-primary/30 transition-all"
          >
            <div className="flex items-start justify-between mb-2">
              <div className="flex items-center gap-2">
                <span className={`px-2 py-1 rounded text-xs font-medium border ${getActionColor(activity.action)}`}>
                  {activity.action}
                </span>
                <span className="text-xs text-gray-400 font-mono">{activity.country}</span>
              </div>
              <div className="flex items-center gap-1 text-xs text-gray-500">
                <Clock className="w-3 h-3" />
                <span>{formatTime(activity.time)}</span>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs font-mono text-gray-300">
              <Globe className="w-3 h-3 text-primary" />
              <span>{activity.ip}</span>
            </div>
          </div>
        )) : (
          <div className="text-center text-gray-400 py-8">No recent activity</div>
        )}
      </div>
    </div>
  )
}

export default RealTimeActivity

