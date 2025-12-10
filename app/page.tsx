'use client';

import { useState } from 'react';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarMinimized, setSidebarMinimized] = useState(false);

  return (
    <div className="flex min-h-screen bg-black relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      <Sidebar 
        isOpen={sidebarOpen} 
        isMinimized={sidebarMinimized}
        onClose={() => setSidebarOpen(false)} 
        onToggleMinimize={() => setSidebarMinimized(!sidebarMinimized)}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${
        sidebarMinimized ? 'lg:ml-20' : 'lg:ml-64'
      } relative z-10`}>
        {/* Full Width Navbar */}
        <div className="w-full">
          <Navbar 
            sidebarOpen={sidebarOpen} 
            onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          />
        </div>

        <main className="flex-1 p-4 md:p-6">
          <div className="max-w-7xl mx-auto">
          {/* Banner */}
          <div className="rounded-xl p-6 md:p-8 mb-6 relative overflow-hidden min-h-[280px] md:min-h-[320px] flex items-center" style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)'
          }}>
            <div className="relative z-10 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
                {/* Left Section - Main CTA */}
                <div className="md:col-span-2 flex flex-col justify-center">
                  <div className="inline-block mb-3">
                    <span className="text-xs font-semibold text-white/80 uppercase tracking-wider px-3 py-1 rounded-full" style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      Premium Gaming Platform
                    </span>
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                    Win Big, Play Smart
                  </h2>
                  <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed max-w-xl">
                    Join thousands of players and experience instant payouts with the best odds in the industry.
                  </p>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                    <button className="primary-cta px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200">
                      Start Playing Now
                    </button>
                    <button className="px-6 py-3 rounded-lg text-white font-semibold text-sm transition-all duration-200" style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)'
                    }}>
                      View Games
                    </button>
                  </div>
                </div>

                {/* Right Section - Features */}
                <div className="md:col-span-1 flex flex-col justify-center gap-4">
                  <div className="rounded-lg p-4 flex items-start gap-3" style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}>
                    <div className="text-2xl flex-shrink-0">⚡</div>
                    <div>
                      <div className="text-sm font-bold text-white mb-1">Instant Payouts</div>
                      <div className="text-xs text-gray-400">Withdraw in seconds</div>
                    </div>
                  </div>
                  <div className="rounded-lg p-4 flex items-start gap-3" style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}>
                    <div className="text-2xl flex-shrink-0">🔒</div>
                    <div>
                      <div className="text-sm font-bold text-white mb-1">Secure & Fair</div>
                      <div className="text-xs text-gray-400">Provably fair games</div>
                    </div>
                  </div>
                  <div className="rounded-lg p-4 flex items-start gap-3" style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}>
                    <div className="text-2xl flex-shrink-0">🎁</div>
                    <div>
                      <div className="text-sm font-bold text-white mb-1">Daily Bonuses</div>
                      <div className="text-xs text-gray-400">Free rewards every day</div>
                    </div>
                  </div>
                  <div className="rounded-lg p-4 flex items-start gap-3" style={{
                    background: 'rgba(255, 255, 255, 0.08)',
                    border: '1px solid rgba(255, 255, 255, 0.15)'
                  }}>
                    <div className="text-2xl flex-shrink-0">🏆</div>
                    <div>
                      <div className="text-sm font-bold text-white mb-1">Best Odds</div>
                      <div className="text-xs text-gray-400">Highest RTP in industry</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Games */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-white mb-4">Featured Games</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {[
                { name: 'Dice', icon: '🎲', href: '/games/dice' },
                { name: 'Limbo', icon: '🚀', href: '/games/limbo' },
                { name: 'Mines', icon: '💎', href: '/games/mines' },
                { name: 'Coin Flip', icon: '🪙', href: '/games/coinflip' },
                { name: 'Crash', icon: '📈', href: '/games/crash' },
              ].map((game) => (
                <a
                  key={game.name}
                  href={game.href}
                  className="group liquid-glass rounded-lg p-4 transition-all duration-300 hover:scale-105 hover:liquid-glass-strong"
                >
                  <div className="relative z-10">
                    <div className="text-4xl mb-2 transform group-hover:scale-110 transition-transform duration-300 drop-shadow-lg">
                      {game.icon}
                    </div>
                    <h3 className="text-lg font-bold text-white mb-1 drop-shadow-md">{game.name}</h3>
                    <p className="text-gray-300 text-xs">Click to play</p>
                  </div>
                </a>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="liquid-glass rounded-lg p-4 relative">
            <h2 className="text-xl font-bold text-white mb-3 drop-shadow-md relative z-10">Recent Activity</h2>
            <div className="text-center py-8 relative z-10">
              <p className="text-gray-300 text-sm">No recent activity</p>
              <p className="text-gray-400 text-xs mt-1">Start playing to see your game history here</p>
            </div>
          </div>
          </div>
        </main>
      </div>
    </div>
  );
}
