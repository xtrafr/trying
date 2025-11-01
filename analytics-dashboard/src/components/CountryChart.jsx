import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { MapPin, TrendingUp } from 'lucide-react'

const CountryChart = ({ connections = [] }) => {
  // Calculate country data from connections
  const countryCounts = {}
  connections.forEach(conn => {
    const country = conn.country || 'Unknown'
    countryCounts[country] = (countryCounts[country] || 0) + 1
  })

  const colors = ['#06b6d4', '#22d3ee', '#a855f7', '#ec4899', '#06b6d4', '#22d3ee', '#a855f7', '#ec4899']
  
  const data = Object.entries(countryCounts)
    .map(([name, value], index) => ({
      name: name.length > 15 ? name.substring(0, 15) + '...' : name,
      value,
      color: colors[index % colors.length]
    }))
    .sort((a, b) => b.value - a.value)
    .slice(0, 8) // Top 8 countries

  // If no data, show empty state
  if (data.length === 0) {
    data.push({ name: 'No Data', value: 0, color: '#06b6d4' })
  }

  return (
    <div className="bg-dark-card rounded-xl p-6 neon-border">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
            <MapPin className="w-5 h-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-white">Connections by Country</h2>
            <p className="text-xs text-gray-400">Top 8 countries by IP count</p>
          </div>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-lg bg-green-500/10 border border-green-500/30">
          <TrendingUp className="w-4 h-4 text-green-400" />
          <span className="text-xs text-green-400 font-medium">+12.3%</span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(6, 182, 212, 0.1)" />
          <XAxis 
            dataKey="name" 
            stroke="#9ca3af"
            fontSize={12}
            tick={{ fill: '#9ca3af' }}
          />
          <YAxis 
            stroke="#9ca3af"
            fontSize={12}
            tick={{ fill: '#9ca3af' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a2236',
              border: '1px solid rgba(6, 182, 212, 0.3)',
              borderRadius: '8px',
              color: '#fff'
            }}
            labelStyle={{ color: '#06b6d4' }}
          />
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

export default CountryChart

