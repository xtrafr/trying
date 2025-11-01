import { useState, useEffect } from 'react'
import { LogOut, Globe, Activity, Clock, Users, Shield, MapPin, Server, TrendingUp, Eye, Zap } from 'lucide-react'
import StatsCard from './StatsCard'
import IPTable from './IPTable'
import CountryChart from './CountryChart'
import RealTimeActivity from './RealTimeActivity'
import UptimeMonitor from './UptimeMonitor'
import { fetchAnalytics } from '../utils/api'

const Dashboard = ({ onLogout }) => {
  const [currentTime, setCurrentTime] = useState(new Date())
  const [stats, setStats] = useState({
    totalIPs: 0,
    activeConnections: 0,
    countries: 0,
    uptime: '00:00:00',
    requests: 0,
    bandwidth: 0
  })
  const [connections, setConnections] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date())
    }, 1000)
    return () => clearInterval(timer)
  }, [])

  // Fetch real analytics data
  useEffect(() => {
    const loadAnalytics = async () => {
      try {
        setIsLoading(true)
        const data = await fetchAnalytics()
        
        if (data) {
          setStats({
            totalIPs: data.stats.totalIPs || 0,
            activeConnections: data.stats.activeConnections || 0,
            countries: data.stats.countries || 0,
            uptime: '00:00:00',
            requests: data.stats.requests || 0,
            bandwidth: data.stats.bandwidth || 0
          })
          setConnections(data.connections || [])
        }
      } catch (error) {
        console.error('Error loading analytics:', error)
      } finally {
        setIsLoading(false)
      }
    }

    // Load initial data
    loadAnalytics()

    // Refresh data every 5 seconds
    const interval = setInterval(loadAnalytics, 5000)

    return () => clearInterval(interval)
  }, [])

  const formatTime = (date) => {
    return date.toLocaleTimeString('en-US', { 
      hour12: false,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    })
  }

  const formatDate = (date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  return (
    <div className="min-h-screen bg-dark">
      {/* Header */}
      <header className="bg-dark-card border-b border-primary/20 sticky top-0 z-50 backdrop-blur-sm bg-opacity-95">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-neon-purple glow-effect flex items-center justify-center">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">XENOS ANALYTICS</h1>
                <p className="text-xs text-gray-400">Real-Time Monitoring Dashboard</p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="text-right">
                <div className="text-sm font-mono text-primary">{formatTime(currentTime)}</div>
                <div className="text-xs text-gray-400">{formatDate(currentTime)}</div>
              </div>
              <button
                onClick={onLogout}
                className="flex items-center gap-2 px-4 py-2 bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 transition-all"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          <StatsCard
            title="Total IPs"
            value={stats.totalIPs.toLocaleString()}
            icon={<Globe className="w-5 h-5" />}
            color="primary"
            trend="+12.5%"
          />
          <StatsCard
            title="Active Connections"
            value={stats.activeConnections}
            icon={<Activity className="w-5 h-5" />}
            color="neon-cyan"
            trend="+5.2%"
          />
          <StatsCard
            title="Countries"
            value={stats.countries}
            icon={<MapPin className="w-5 h-5" />}
            color="neon-purple"
            trend="+2"
          />
          <StatsCard
            title="Total Requests"
            value={stats.requests.toLocaleString()}
            icon={<TrendingUp className="w-5 h-5" />}
            color="primary"
            trend="+8.1%"
          />
          <StatsCard
            title="Bandwidth"
            value={`${(stats.bandwidth / 1000).toFixed(1)} GB`}
            icon={<Zap className="w-5 h-5" />}
            color="neon-cyan"
            trend="+3.4%"
          />
          <StatsCard
            title="Uptime"
            value="99.9%"
            icon={<Server className="w-5 h-5" />}
            color="neon-purple"
            trend="Stable"
          />
        </div>

        {/* Charts and Tables */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          {/* Country Chart */}
          <div className="lg:col-span-2">
            <CountryChart connections={connections} />
          </div>

          {/* Real-Time Activity */}
          <div>
            <RealTimeActivity />
          </div>
        </div>

        {/* IP Table and Uptime */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* IP Table */}
          <div className="lg:col-span-2">
            <IPTable connections={connections} />
          </div>

          {/* Uptime Monitor */}
          <div>
            <UptimeMonitor />
          </div>
        </div>
      </main>
    </div>
  )
}

export default Dashboard

