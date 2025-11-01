import { useState, useEffect } from 'react'
import { Server, CheckCircle, AlertCircle, Clock } from 'lucide-react'

const UptimeMonitor = () => {
  const [uptime, setUptime] = useState({
    status: 'online',
    percentage: 99.98,
    lastCheck: new Date(),
    days: 45,
    hours: 12,
    minutes: 34
  })

  useEffect(() => {
    const interval = setInterval(() => {
      setUptime(prev => ({
        ...prev,
        lastCheck: new Date(),
        minutes: prev.minutes + 1 >= 60 ? 0 : prev.minutes + 1,
        hours: prev.minutes + 1 >= 60 ? (prev.hours + 1 >= 24 ? 0 : prev.hours + 1) : prev.hours,
        days: prev.minutes + 1 >= 60 && prev.hours + 1 >= 24 ? prev.days + 1 : prev.days
      }))
    }, 60000) // Update every minute

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="bg-dark-card rounded-xl p-6 neon-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
          <Server className="w-5 h-5 text-white" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-white">Uptime Monitor</h2>
          <p className="text-xs text-gray-400">System availability</p>
        </div>
      </div>

      <div className="space-y-6">
        {/* Status */}
        <div className="flex items-center justify-between p-4 bg-dark-lighter rounded-lg border border-primary/10">
          <div className="flex items-center gap-3">
            {uptime.status === 'online' ? (
              <CheckCircle className="w-5 h-5 text-green-400" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-400" />
            )}
            <div>
              <div className="text-sm font-semibold text-white capitalize">{uptime.status}</div>
              <div className="text-xs text-gray-400">All systems operational</div>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold text-green-400 font-mono">{uptime.percentage}%</div>
            <div className="text-xs text-gray-400">uptime</div>
          </div>
        </div>

        {/* Uptime Stats */}
        <div className="space-y-3">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <Clock className="w-4 h-4" />
              <span>Current Uptime</span>
            </div>
            <div className="text-white font-mono font-semibold">
              {uptime.days}d {uptime.hours}h {uptime.minutes}m
            </div>
          </div>

          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center gap-2 text-gray-400">
              <CheckCircle className="w-4 h-4" />
              <span>Last Check</span>
            </div>
            <div className="text-white font-mono text-xs">
              {uptime.lastCheck.toLocaleTimeString('en-US', { hour12: false })}
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div>
          <div className="flex items-center justify-between mb-2 text-xs">
            <span className="text-gray-400">Availability</span>
            <span className="text-white font-mono">{uptime.percentage}%</span>
          </div>
          <div className="w-full bg-dark-lighter rounded-full h-2 overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-green-500 to-emerald-600 transition-all duration-500"
              style={{ width: `${uptime.percentage}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

export default UptimeMonitor

