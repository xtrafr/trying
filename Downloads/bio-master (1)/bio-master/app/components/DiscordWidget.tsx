'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface DiscordActivity {
  name: string;
  details?: string;
  state?: string;
  assets?: {
    large_image?: string;
    large_text?: string;
    small_image?: string;
    small_text?: string;
  };
}

interface DiscordStatus {
  discord_user: {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    global_name?: string;
    public_flags?: number;
  };
  discord_status: 'online' | 'idle' | 'dnd' | 'offline';
  activities: DiscordActivity[];
  listening_to_spotify?: boolean;
  spotify?: {
    song: string;
    artist: string;
    album: string;
    album_art_url: string;
  };
}

const statusColors = {
  online: '#23a55a',
  idle: '#f0b232',
  dnd: '#f23f43',
  offline: '#80848e',
};

const statusIcons = {
  online: (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
      <circle cx="5" cy="5" r="5" fill="#23a55a" />
    </svg>
  ),
  idle: (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
      <circle cx="5" cy="5" r="5" fill="#f0b232" />
      <rect x="2" y="4" width="6" height="2" fill="#1e1f22" rx="1" />
    </svg>
  ),
  dnd: (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
      <circle cx="5" cy="5" r="5" fill="#f23f43" />
      <rect x="2" y="4" width="6" height="2" fill="#1e1f22" rx="1" />
    </svg>
  ),
  offline: (
    <svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor">
      <circle cx="5" cy="5" r="5" fill="#80848e" />
      <circle cx="5" cy="5" r="2.5" fill="#1e1f22" />
    </svg>
  ),
};

export default function DiscordWidget() {
  const [discordData, setDiscordData] = useState<DiscordStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchDiscordStatus = async () => {
      try {
        const response = await fetch('https://api.lanyard.rest/v1/users/918948437112795206');
        const data = await response.json();
        if (data.success) {
          setDiscordData(data.data);
        }
      } catch (error) {
        console.error('Failed to fetch Discord status:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDiscordStatus();
    const interval = setInterval(fetchDiscordStatus, 5000);

    return () => clearInterval(interval);
  }, []);

  if (isLoading) {
    return (
      <div className="w-full">
        <motion.div className="glass rounded-[20px] p-6">
          <div className="flex items-center gap-2 mb-4">
            <motion.div
              className="w-2 h-2 bg-accent rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1, repeat: Infinity }}
            />
            <span className="text-sm text-muted">Loading Discord status...</span>
          </div>
        </motion.div>
      </div>
    );
  }

  if (!discordData) return null;

  const activity = discordData.activities[0];
  const statusIcon = statusIcons[discordData.discord_status];

  const getBadges = (flags: number) => {
    const badges = [];
    if (flags & (1 << 0)) badges.push({ name: 'Discord Staff', emoji: '👨‍💼' });
    if (flags & (1 << 1)) badges.push({ name: 'Partnered Server Owner', emoji: '🤝' });
    if (flags & (1 << 2)) badges.push({ name: 'HypeSquad Events', emoji: '🎉' });
    if (flags & (1 << 3)) badges.push({ name: 'Bug Hunter Level 1', emoji: '🐛' });
    if (flags & (1 << 6)) badges.push({ name: 'HypeSquad Bravery', emoji: '💜' });
    if (flags & (1 << 7)) badges.push({ name: 'HypeSquad Brilliance', emoji: '💗' });
    if (flags & (1 << 8)) badges.push({ name: 'HypeSquad Balance', emoji: '💚' });
    if (flags & (1 << 9)) badges.push({ name: 'Early Supporter', emoji: '⏰' });
    if (flags & (1 << 14)) badges.push({ name: 'Bug Hunter Level 2', emoji: '🐛' });
    if (flags & (1 << 16)) badges.push({ name: 'Verified Bot Developer', emoji: '🤖' });
    if (flags & (1 << 17)) badges.push({ name: 'Early Verified Bot Developer', emoji: '🔧' });
    if (flags & (1 << 18)) badges.push({ name: 'Moderator Programs Alumni', emoji: '🎓' });
    if (flags & (1 << 22)) badges.push({ name: 'Active Developer', emoji: '⚡' });
    return badges;
  };

  const userBadges = discordData.discord_user.public_flags 
    ? getBadges(discordData.discord_user.public_flags) 
    : [];

  return (
    <div className="w-full h-full">
      <motion.div
        className="glass rounded-[20px] p-4 md:p-6 relative overflow-hidden group h-full flex flex-col"
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 0 40px rgba(239, 68, 68, 0.3)',
        }}
        transition={{ duration: 0.3 }}
        style={{ willChange: 'transform' }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-[#ef4444]/10 to-transparent opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.5 }}
        />

        <motion.div
          className="absolute -top-20 -right-20 w-40 h-40 bg-[#ef4444]/20 rounded-full blur-3xl opacity-0 group-hover:opacity-100"
          transition={{ duration: 0.5 }}
        />

        <div className="flex items-center gap-3 md:gap-4 relative z-10 mb-4 md:mb-5">
          <div className="relative flex-shrink-0">
            <motion.div
              className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[rgba(239,68,68,0.3)]"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={`https://cdn.discordapp.com/avatars/${discordData.discord_user.id}/${discordData.discord_user.avatar}.png?size=128`}
                alt={discordData.discord_user.username}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <motion.div
              className="absolute -bottom-0.5 -right-0.5 w-5 h-5 md:w-6 md:h-6 rounded-full border-[3px] border-[#1e1f22] flex items-center justify-center bg-[#1e1f22]"
              animate={{
                scale: discordData.discord_status === 'online' ? [1, 1.1, 1] : 1,
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              {statusIcon}
            </motion.div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5">
              <motion.i
                className="fab fa-discord text-xl md:text-2xl text-[#ef4444]"
                suppressHydrationWarning
                animate={{ 
                  rotate: [0, 5, -5, 0],
                }}
                transition={{ 
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
              />
              <span className="text-base md:text-lg font-semibold text-foreground truncate">
                {discordData.discord_user.global_name || discordData.discord_user.username}
              </span>
            </div>
            
            {activity ? (
              <div className="text-sm md:text-base text-muted">
                <div className="font-medium text-accent truncate mb-1">
                  {activity.name === 'Spotify' ? '🎵 Listening to Spotify' : `Playing ${activity.name}`}
                </div>
                {activity.details && (
                  <div className="text-xs md:text-sm mt-0.5 truncate">{activity.details}</div>
                )}
                {activity.state && (
                  <div className="text-xs md:text-sm truncate opacity-75">{activity.state}</div>
                )}
              </div>
            ) : (
              <div className="text-sm md:text-base text-muted capitalize">
                {discordData.discord_status === 'dnd' ? 'Do Not Disturb' : discordData.discord_status}
              </div>
            )}
          </div>
        </div>

        {userBadges.length > 0 && (
          <div className="relative z-10 flex flex-wrap gap-2 mb-4">
            {userBadges.map((badge, index) => (
              <motion.div
                key={index}
                className="px-2.5 py-1 bg-white/5 border border-white/10 rounded-lg text-xs md:text-sm flex items-center gap-1.5"
                whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 255, 255, 0.1)' }}
                transition={{ duration: 0.2 }}
                title={badge.name}
              >
                <span>{badge.emoji}</span>
                <span className="text-muted">{badge.name}</span>
              </motion.div>
            ))}
          </div>
        )}

        <div className="relative z-10 grid grid-cols-3 gap-2 mt-auto pt-4 border-t border-white/10">
          <div className="text-center">
            <div className="text-xs text-muted mb-0.5">Member Since</div>
            <div className="text-xs md:text-sm font-semibold text-foreground">
              {new Date(parseInt(discordData.discord_user.id) / 4194304 + 1420070400000).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted mb-0.5">Status</div>
            <div className="text-xs md:text-sm font-semibold text-foreground capitalize relative group/status">
              {discordData.discord_status === 'dnd' ? 'DND' : discordData.discord_status}
              {discordData.discord_status === 'dnd' && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-1.5 bg-black/80 backdrop-blur-sm border border-white/10 rounded-lg text-xs whitespace-nowrap opacity-0 group-hover/status:opacity-100 pointer-events-none transition-opacity duration-200 z-50">
                  Do Not Disturb
                </div>
              )}
            </div>
          </div>
          <div className="text-center">
            <div className="text-xs text-muted mb-0.5">Platform</div>
            <div className="text-xs md:text-sm font-semibold text-foreground">
              Desktop
            </div>
          </div>
        </div>

        {discordData.listening_to_spotify && discordData.spotify && (
          <motion.div
            className="mt-4 pt-4 border-t border-white/10"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-center gap-3">
              <img
                src={discordData.spotify.album_art_url}
                alt={discordData.spotify.album}
                className="w-12 h-12 rounded"
              />
              <div className="flex-1 min-w-0">
                <div className="text-sm font-medium text-foreground truncate">
                  {discordData.spotify.song}
                </div>
                <div className="text-xs text-muted truncate">
                  by {discordData.spotify.artist}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}