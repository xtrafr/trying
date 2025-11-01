import { motion } from 'framer-motion'

const StatsCard = ({ title, value, icon, color, trend }) => {
  const colorClasses = {
    primary: 'from-primary to-primary-dark',
    'neon-cyan': 'from-primary to-cyan-400',
    'neon-purple': 'from-purple-600 to-purple-800'
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-dark-card rounded-xl p-6 neon-border relative overflow-hidden group hover:glow-effect transition-all duration-300"
    >
      {/* Background gradient */}
      <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${colorClasses[color]} opacity-10 blur-2xl`} />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <div className={`w-12 h-12 rounded-lg bg-gradient-to-br ${colorClasses[color]} flex items-center justify-center text-white`}>
            {icon}
          </div>
          <span className={`text-xs px-2 py-1 rounded-full bg-green-500/10 border border-green-500/30 text-green-400 font-mono`}>
            {trend}
          </span>
        </div>
        <div>
          <p className="text-sm text-gray-400 mb-1">{title}</p>
          <p className="text-2xl font-bold text-white font-mono">{value}</p>
        </div>
      </div>

      {/* Scan line effect */}
      <div className="absolute inset-0 scan-line opacity-0 group-hover:opacity-100 transition-opacity" />
    </motion.div>
  )
}

export default StatsCard

