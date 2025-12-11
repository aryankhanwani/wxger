'use client';

import { useState, useRef } from 'react';
import Image from 'next/image';
import Sidebar from '@/components/Sidebar';
import Navbar from '@/components/Navbar';

export default function Home() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarMinimized, setSidebarMinimized] = useState(false);
  const gamesScrollRef = useRef<HTMLDivElement>(null);

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

        <main className="flex-1 p-3 md:p-4 lg:p-6 overflow-x-hidden w-full">
          <div className="max-w-7xl mx-auto w-full">
          {/* Banner */}
          <div className="rounded-xl p-4 md:p-6 lg:p-8 mb-4 md:mb-6 relative overflow-hidden min-h-[240px] md:min-h-[280px] lg:min-h-[320px] flex items-center" style={{
            background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.15) 0%, rgba(255, 255, 255, 0.05) 100%)',
            backdropFilter: 'blur(20px) saturate(180%)',
            WebkitBackdropFilter: 'blur(20px) saturate(180%)',
            border: '1px solid rgba(255, 255, 255, 0.2)',
            boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.6), inset 0 1px 0 0 rgba(255, 255, 255, 0.2)'
          }}>
            <div className="relative z-10 w-full">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
                {/* Left Section - Main CTA */}
                <div className="md:col-span-2 flex flex-col justify-center">
                  <div className="inline-block mb-2 md:mb-3">
                    <span className="text-[10px] md:text-xs font-semibold text-white/80 uppercase tracking-wider px-2 md:px-3 py-1 rounded-full" style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)'
                    }}>
                      Premium Gaming Platform
                    </span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2 md:mb-3 leading-tight">
                    Win Big, Play Smart
                  </h2>
                  <p className="text-gray-300 text-xs md:text-sm lg:text-base mb-4 md:mb-6 leading-relaxed max-w-xl">
                    Join thousands of players and experience instant payouts with the best odds in the industry.
                  </p>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 md:gap-3">
                    <button className="primary-cta px-4 md:px-6 py-2 md:py-3 rounded-lg font-semibold text-xs md:text-sm transition-all duration-200">
                      Start Playing Now
                    </button>
                    <button className="px-4 md:px-6 py-2 md:py-3 rounded-lg text-white font-semibold text-xs md:text-sm transition-all duration-200" style={{
                      background: 'rgba(255, 255, 255, 0.05)',
                      border: '1px solid rgba(255, 255, 255, 0.15)'
                    }}>
                      View Games
                    </button>
                  </div>
                </div>

                {/* Right Section - Visual Elements */}
                <div className="hidden md:flex md:col-span-1 items-center justify-center relative">
                  <div className="relative w-full h-full flex items-center justify-center">
                    {/* Large decorative game icons */}
                    <div className="text-7xl md:text-8xl opacity-20 transform hover:scale-110 transition-transform duration-300">🎲</div>
                    <div className="absolute top-1/4 right-1/4 text-5xl md:text-6xl opacity-15 transform hover:scale-110 transition-transform duration-300">💎</div>
                    <div className="absolute bottom-1/4 left-1/4 text-5xl md:text-6xl opacity-15 transform hover:scale-110 transition-transform duration-300">🪙</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Featured Games */}
          <div className="mb-4 md:mb-6 overflow-hidden w-full ">
            <div className="flex items-center justify-between mb-3 md:mb-4">
              <h2 className="text-base sm:text-lg md:text-xl font-bold text-white">Featured Games</h2>
              <div className="flex items-center gap-1.5 sm:gap-2">
                <button
                  onClick={() => {
                    if (gamesScrollRef.current) {
                      const cardWidth = window.innerWidth < 640 ? 110 : window.innerWidth < 768 ? 140 : window.innerWidth < 1024 ? 155 : 170;
                      const gap = window.innerWidth < 640 ? 8 : window.innerWidth < 768 ? 10 : 12;
                      const scrollAmount = cardWidth + gap;
                      gamesScrollRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
                    }
                  }}
                  className="liquid-glass p-1.5 sm:p-2 rounded-lg hover:liquid-glass-strong transition-all duration-200 flex-shrink-0"
                  aria-label="Scroll left"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={() => {
                    if (gamesScrollRef.current) {
                      const cardWidth = window.innerWidth < 640 ? 110 : window.innerWidth < 768 ? 140 : window.innerWidth < 1024 ? 155 : 170;
                      const gap = window.innerWidth < 640 ? 8 : window.innerWidth < 768 ? 10 : 12;
                      const scrollAmount = cardWidth + gap;
                      gamesScrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
                    }
                  }}
                  className="liquid-glass p-1.5 sm:p-2 rounded-lg hover:liquid-glass-strong transition-all duration-200 flex-shrink-0"
                  aria-label="Scroll right"
                >
                  <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
            <div 
              className="overflow-hidden"
              style={{ 
                width: '100vw',
                maxWidth: '1280px !important',
                // marginLeft: 'calc(-50vw + 50%)',
                marginLeft: '0',
                marginRight: '0'
              }}
            >
              <div 
                ref={gamesScrollRef}
                className="flex gap-2 sm:gap-2.5 md:gap-3 overflow-x-auto scrollbar-hide pb-2"
                style={{ 
                  scrollbarWidth: 'none', 
                  msOverflowStyle: 'none',
                  // width: '100%',
                  // paddingLeft: '12px',
                  paddingRight: '32px'
                }}
              >
              {[
                { name: 'Dice', image: '/dice.png', href: '/games/dice' },
                { name: 'Limbo', image: '/limbo.png', href: '/games/limbo' },
                { name: 'Mines', image: '/mines.png', href: '/games/mines' },
                { name: 'Coin Flip', image: '/coin.png', href: '/games/coinflip' },
                { name: 'Crash', image: '/crash.png', href: '/games/crash' },
                { name: 'Plinko', image: '/plinko.png', href: '/games/plinko' },

              ].map((game) => (
                <a
                  key={game.name}
                  href={game.href}
                  className="group liquid-glass rounded-lg transition-all duration-300 hover:scale-105 hover:liquid-glass-strong aspect-[3/4] w-[110px] h-[140px] sm:w-[140px] sm:h-[180px] md:w-[155px] md:h-[200px] lg:w-[170px] lg:h-[220px] flex-shrink-0 overflow-hidden relative"
                >
                  <Image
                    src={game.image}
                    alt={game.name}
                    fill
                    className="object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                </a>
              ))}
              </div>
            </div>
            
          </div>

          {/* Recent Activity */}
          <div className="liquid-glass rounded-lg p-3 md:p-4 relative">
            <h2 className="text-lg md:text-xl font-bold text-white mb-2 md:mb-3 drop-shadow-md relative z-10">Recent Activity</h2>
            <div className="text-center py-6 md:py-8 relative z-10">
              <p className="text-gray-300 text-xs md:text-sm">No recent activity</p>
              <p className="text-gray-400 text-[10px] md:text-xs mt-1">Start playing to see your game history here</p>
            </div>
          </div>

          
          </div>
        </main>
      </div>
    </div>
  );
}
