'use client';

import { useState } from 'react';
import Image from 'next/image';
import WalletModal from './WalletModal';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

interface NavbarProps {
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export default function Navbar({ sidebarOpen = true, onToggleSidebar }: NavbarProps) {
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [isLoggedIn] = useState(false); // This would come from auth context
  const walletAmount = 0.00;

  return (
    <>
      <nav className="border-b border-white/10" style={{
        borderRadius: 0,
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.85) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0.8), inset 0 -1px 0 0 rgba(255, 255, 255, 0.05)'
      }}>
        <div className={`max-w-[1280px] mx-auto py-4 px-3 md:px-0 flex items-center justify-between overflow-hidden`}>
          {/* Hamburger on mobile, Logo on desktop */}
          <div className="flex items-center flex-shrink-0">
            {/* Hamburger for mobile */}
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200 mr-2 flex-shrink-0"
              aria-label="Toggle sidebar"
            >
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            {/* Logo - hidden on mobile, visible on desktop */}
            <Image
              src="/logo.svg"
              alt="Wxger Logo"
              width={176}
              height={43}
              className="h-8 w-auto hidden lg:block pt-2"
            />
          </div>

          {/* Wallet Section */}
          <div className="flex items-center gap-1.5 md:gap-3 flex-shrink-0 min-w-0">
          {isLoggedIn ? (
            <>
              <div className="flex items-center gap-1.5 md:gap-2">
                <div className="text-right hidden sm:block">
                  <p className="text-[10px] text-gray-400">Balance</p>
                  <p className="text-sm font-bold text-white">${walletAmount.toFixed(2)}</p>
                </div>
                <button
                  onClick={() => setIsWalletOpen(true)}
                  className="primary-cta px-2.5 md:px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium hover:scale-105 transition-transform duration-200 whitespace-nowrap"
                >
                  Wallet
                </button>
              </div>

              {/* User Icons */}
              <div className="flex items-center gap-1.5 md:gap-2">
                <button
                  className="liquid-glass p-1.5 rounded-lg hover:liquid-glass-strong transition-all duration-200 flex-shrink-0"
                  title="Profile"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </button>
                <button
                  className="liquid-glass p-1.5 rounded-lg hover:liquid-glass-strong transition-all duration-200 relative flex-shrink-0"
                  title="Notifications"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                </button>
                <button
                  className="liquid-glass p-1.5 rounded-lg hover:liquid-glass-strong transition-all duration-200 flex-shrink-0"
                  title="History"
                >
                  <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-1.5 md:gap-2">
              <button 
                onClick={() => setIsLoginOpen(true)}
                className="liquid-glass px-2.5 md:px-3 py-1.5 rounded-lg text-white text-xs md:text-sm font-medium hover:liquid-glass-strong transition-all duration-200 whitespace-nowrap"
              >
                Login
              </button>
              <button 
                onClick={() => setIsSignupOpen(true)}
                className="primary-cta px-2.5 md:px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium hover:scale-105 transition-transform duration-200 whitespace-nowrap"
              >
                Sign Up
              </button>
            </div>
          )}
          </div>
        </div>
      </nav>

      <WalletModal isOpen={isWalletOpen} onClose={() => setIsWalletOpen(false)} />
      <LoginModal 
        isOpen={isLoginOpen} 
        onClose={() => setIsLoginOpen(false)}
        onSwitchToSignup={() => setIsSignupOpen(true)}
      />
      <SignupModal 
        isOpen={isSignupOpen} 
        onClose={() => setIsSignupOpen(false)}
        onSwitchToLogin={() => setIsLoginOpen(true)}
      />
    </>
  );
}

