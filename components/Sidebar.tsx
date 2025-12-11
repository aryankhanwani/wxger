'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';

interface GameLink {
  name: string;
  href: string;
  icon: string;
}

const games: GameLink[] = [
  { name: 'Dice', href: '/games/dice', icon: '🎲' },
  { name: 'Limbo', href: '/games/limbo', icon: '🚀' },
  { name: 'Mines', href: '/games/mines', icon: '💎' },
  { name: 'Coin Flip', href: '/games/coinflip', icon: '🪙' },
  { name: 'Crash', href: '/games/crash', icon: '📈' },
];

interface SidebarProps {
  isOpen: boolean;
  isMinimized: boolean;
  onClose: () => void;
  onToggleMinimize: () => void;
}

export default function Sidebar({ isOpen, isMinimized, onClose, onToggleMinimize }: SidebarProps) {
  const [activeLink, setActiveLink] = useState('/');
  const [activeSection, setActiveSection] = useState<'casino' | 'sports'>('casino');

  return (
    <>
      {/* Overlay - only on mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside className={`fixed left-0 top-0 h-full z-50 transition-all duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      } ${isMinimized ? 'lg:w-20 w-64' : 'w-64'}`} style={{
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.85) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        borderRight: '1px solid rgba(255, 255, 255, 0.15)',
        boxShadow: '4px 0 24px 0 rgba(0, 0, 0, 0.8), inset 1px 0 0 0 rgba(255, 255, 255, 0.05)'
      }}>
        <div className="flex flex-col h-full">
          {/* Header with Logo (mobile) / Minimize Button (desktop) */}
          <div className={`border-b border-white/20 flex items-center ${isMinimized ? 'justify-center p-5' : 'p-4 lg:justify-between lg:px-4 lg:py-5'} transition-all duration-300`} style={{
            boxShadow: 'inset 0 -1px 0 0 rgba(255, 255, 255, 0.1)'
          }}>
            {/* Logo - visible on mobile only, centered */}
            <div className="lg:hidden flex items-center justify-center w-full relative">
              <Image
                src="/logo.svg"
                alt="Wxger Logo"
                width={176}
                height={43}
                className="h-6 w-auto pt-0.5"
              />
              
              {/* Close button - visible on mobile only, absolute positioned */}
              <button
                onClick={onClose}
                className="absolute right-0 p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200"
                aria-label="Close sidebar"
              >
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Desktop header content */}
            <div className="hidden lg:flex items-center justify-between w-full gap-3">
              {/* Left side - User Profile */}
              {!isMinimized && (
                <div className="flex items-center gap-2.5 flex-1 min-w-0">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold text-white" style={{
                    background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, rgba(255, 255, 255, 0.1) 100%)',
                    border: '1px solid rgba(255, 255, 255, 0.2)'
                  }}>
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-xs font-semibold text-white truncate">Guest</div>
                    <div className="text-[10px] text-gray-400 truncate">Not logged in</div>
                  </div>
                </div>
              )}
              
              {/* Minimize button */}
              <button
                onClick={onToggleMinimize}
                className="p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200 flex-shrink-0"
                title={isMinimized ? "Expand sidebar" : "Minimize sidebar"}
              >
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isMinimized ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 5l7 7-7 7M5 5l7 7-7 7" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 19l-7-7 7-7m8 14l-7-7 7-7" />
                  )}
                </svg>
              </button>
            </div>
          </div>

        {/* Navigation Links */}
        <nav className={`flex-1 overflow-y-auto transition-all duration-300 ${isMinimized ? 'p-2 space-y-1' : 'p-3 space-y-2'}`}>
          {/* Casino and Sports Tabs - Hidden when minimized */}
          {!isMinimized && (
            <div className="flex gap-2 mb-3">
              <button
                onClick={() => setActiveSection('casino')}
                className={`flex-1 px-3 py-2 rounded-lg transition-colors duration-200 text-sm ${
                  activeSection === 'casino'
                    ? 'primary-active font-medium'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
              >
                <span className="font-medium">Casino</span>
              </button>
            <button
              onClick={() => {}}
              disabled
              className="flex-1 px-3 py-2 rounded-lg transition-all duration-300 relative overflow-hidden opacity-50 cursor-not-allowed text-gray-500 text-sm"
              title="Coming Soon"
            >
              <span className="font-medium flex items-center justify-center gap-1.5">
                Sports
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </span>
            </button>
            </div>
          )}

          {/* Games under Casino */}
          {activeSection === 'casino' && (
            <div className="space-y-1">
              <Link
                href="/"
                onClick={() => {
                  setActiveLink('/');
                  if (typeof window !== 'undefined' && window.innerWidth < 1024) onClose();
                }}
                className={`flex items-center rounded-lg transition-colors duration-200 text-sm ${
                  isMinimized ? 'justify-center px-2 py-2' : 'px-3 py-2'
                } ${
                  activeLink === '/'
                    ? 'primary-active font-medium'
                    : 'text-gray-300 hover:bg-white/5 hover:text-white'
                }`}
                title={isMinimized ? "Dashboard" : undefined}
              >
                <span className={`text-lg ${!isMinimized ? 'mr-2' : ''}`}>🏠</span>
                {!isMinimized && <span className="font-medium">Dashboard</span>}
              </Link>

              {!isMinimized && (
                <div className="pt-1">
                  <p className="px-3 text-[10px] font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Games
                  </p>
                </div>
              )}
              <div className="space-y-1">
                {games.map((game) => (
                  <Link
                    key={game.href}
                    href={game.href}
                    onClick={() => {
                      setActiveLink(game.href);
                      if (typeof window !== 'undefined' && window.innerWidth < 1024) onClose();
                    }}
                    className={`flex items-center rounded-lg transition-colors duration-200 text-sm ${
                      isMinimized ? 'justify-center px-2 py-2' : 'px-3 py-2'
                    } ${
                      activeLink === game.href
                        ? 'primary-active font-medium'
                        : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`}
                    title={isMinimized ? game.name : undefined}
                  >
                    <span className={`text-lg ${!isMinimized ? 'mr-2' : ''}`}>
                      {game.icon}
                    </span>
                    {!isMinimized && <span className="font-medium">{game.name}</span>}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Sports section - locked */}
          {activeSection === 'sports' && (
            <div className="text-center py-12">
              <svg className="w-16 h-16 mx-auto mb-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <p className="text-gray-400">Coming Soon</p>
            </div>
          )}
        </nav>

        {/* Footer */}
        {!isMinimized && (
          <div className="p-3 border-t border-white/20" style={{
            boxShadow: 'inset 0 1px 0 0 rgba(255, 255, 255, 0.1)'
          }}>
            <div className="liquid-glass rounded-lg p-2">
              <p className="text-[10px] text-gray-300 text-center">
                Play responsibly
              </p>
            </div>
          </div>
        )}
      </div>
    </aside>
    </>
  );
}

