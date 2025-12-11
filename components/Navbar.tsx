'use client';

import { useState, useRef, useEffect } from 'react';
import { useSession, signOut } from 'next-auth/react';
import Image from 'next/image';
import WalletModal from './WalletModal';
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';

interface NavbarProps {
  sidebarOpen?: boolean;
  onToggleSidebar?: () => void;
}

export default function Navbar({ sidebarOpen = true, onToggleSidebar }: NavbarProps) {
  const { data: session } = useSession();
  const [isWalletOpen, setIsWalletOpen] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const [cryptoDropdownOpen, setCryptoDropdownOpen] = useState(false);
  const [selectedToken, setSelectedToken] = useState('USDT');
  const walletAmount = 1250.50;
  
  // Mock balances for different cryptocurrencies
  const cryptoBalances: { [key: string]: number } = {
    USDT: 1250.50,
    BTC: 0.025,
    ETH: 0.5,
    BNB: 2.5,
  };
  const userMenuRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);
  const cryptoDropdownRef = useRef<HTMLDivElement>(null);
  const userMenuButtonRef = useRef<HTMLButtonElement>(null);
  const notificationsButtonRef = useRef<HTMLButtonElement>(null);

  // Mock notifications data
  const notifications = [
    { id: 1, title: 'Deposit Successful', message: 'Your deposit of $500 has been processed', time: '2 minutes ago', unread: true },
    { id: 2, title: 'Game Win!', message: 'Congratulations! You won $250 on Dice', time: '1 hour ago', unread: true },
    { id: 3, title: 'Withdrawal Pending', message: 'Your withdrawal of $100 is being processed', time: '3 hours ago', unread: false },
    { id: 4, title: 'Welcome Bonus', message: 'Claim your welcome bonus of $50', time: '1 day ago', unread: false },
    { id: 5, title: 'Weekly Leaderboard', message: 'You are ranked #15 this week', time: '2 days ago', unread: false },
  ];

  const unreadCount = notifications.filter(n => n.unread).length;

  const handleLogout = async () => {
    await signOut({ callbackUrl: '/' });
    setUserMenuOpen(false);
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setNotificationsOpen(false);
      }
      if (cryptoDropdownRef.current && !cryptoDropdownRef.current.contains(event.target as Node)) {
        setCryptoDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const tokenIcons: { [key: string]: string } = {
    USDT: '₮',
    BTC: '₿',
    ETH: 'Ξ',
    BNB: 'BNB',
  };

  return (
    <>
      <nav className="border-b border-white/10 relative z-40" style={{
        borderRadius: 0,
        background: 'linear-gradient(135deg, rgba(0, 0, 0, 0.9) 0%, rgba(0, 0, 0, 0.85) 100%)',
        backdropFilter: 'blur(20px) saturate(180%)',
        WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        boxShadow: '0 4px 24px 0 rgba(0, 0, 0, 0.8), inset 0 -1px 0 0 rgba(255, 255, 255, 0.05)'
      }}>
        <div className={`max-w-[1280px] mx-auto py-3 md:py-4 px-3 md:px-0 flex items-center justify-between relative z-40`}>
          {/* Left Section - Hamburger/Logo */}
          <div className="flex items-center flex-shrink-0 w-1/3 relative z-40">
            {/* Hamburger for mobile */}
            <button
              onClick={onToggleSidebar}
              className="lg:hidden p-1.5 rounded-lg hover:bg-white/5 transition-colors duration-200 mr-2 flex-shrink-0 relative z-40"
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
              className="h-8 w-auto hidden lg:block pt-2 relative z-40"
            />
          </div>

          {/* Center Section - Wallet (Only when logged in) */}
          <div className="flex items-center justify-center flex-1 w-1/3 relative z-40">
            {session?.user ? (
              <div className="flex items-center gap-2 md:gap-3 relative z-40">
                {/* Crypto Currency Dropdown */}
                <div className="relative z-[100]" ref={cryptoDropdownRef}>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setCryptoDropdownOpen(!cryptoDropdownOpen);
                      setUserMenuOpen(false);
                      setNotificationsOpen(false);
                    }}
                    className="liquid-glass rounded-lg px-2 md:px-4 py-1.5 md:py-2.5 hover:liquid-glass-strong transition-all duration-200 flex items-center gap-1.5 md:gap-2 relative z-[100] h-[40px] md:h-[52px]"
                  >
                    <div className="w-5 h-5 md:w-7 md:h-7 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-[10px] md:text-sm flex-shrink-0">
                      {tokenIcons[selectedToken] || '₮'}
                    </div>
                    <div className="text-left min-w-0">
                      <p className="text-[9px] md:text-xs text-gray-400 leading-tight">Balance</p>
                      <p className="text-xs md:text-base font-bold text-white leading-tight truncate">
                        {selectedToken === 'USDT' ? '$' : ''}{cryptoBalances[selectedToken]?.toLocaleString('en-US', { minimumFractionDigits: selectedToken === 'USDT' ? 2 : 4, maximumFractionDigits: selectedToken === 'USDT' ? 2 : 4 }) || '0.00'} {selectedToken !== 'USDT' ? selectedToken : ''}
                      </p>
                    </div>
                    <svg className={`w-3 h-3 md:w-4 md:h-4 text-gray-400 transition-transform flex-shrink-0 ${cryptoDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </button>
                  {/* Crypto Dropdown Menu */}
                  {cryptoDropdownOpen && (
                    <div className="fixed md:absolute left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 top-20 md:top-auto md:mt-2 w-64 liquid-glass-strong rounded-xl shadow-2xl z-[9999] overflow-hidden border border-white/10">
                      <div className="p-3 space-y-1">
                        {Object.keys(tokenIcons).map((token) => {
                          const balance = cryptoBalances[token] || 0;
                          const isSelected = selectedToken === token;
                          return (
                            <button
                              key={token}
                              onClick={() => {
                                setSelectedToken(token);
                                setCryptoDropdownOpen(false);
                              }}
                              className={`w-full px-3 py-2.5 rounded-lg text-left transition-all duration-200 flex items-center justify-between group ${
                                isSelected 
                                  ? 'bg-white/10 border border-white/20' 
                                  : 'hover:bg-white/5 border border-transparent'
                              }`}
                            >
                              <div className="flex items-center gap-3 flex-1 min-w-0">
                                <div className={`w-9 h-9 rounded-lg bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-sm flex-shrink-0 shadow-md ${
                                  isSelected ? 'ring-2 ring-white/30' : ''
                                }`}>
                                  {tokenIcons[token]}
                                </div>
                                <div className="flex-1 min-w-0">
                                  <div className="flex items-center gap-2 mb-0.5">
                                    <span className="font-semibold text-sm text-white">{token}</span>
                                    {isSelected && (
                                      <svg className="w-3.5 h-3.5 text-green-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                      </svg>
                                    )}
                                  </div>
                                  <p className="text-xs font-medium text-gray-300">
                                    {token === 'USDT' ? '$' : ''}{balance.toLocaleString('en-US', { minimumFractionDigits: token === 'USDT' ? 2 : 4, maximumFractionDigits: token === 'USDT' ? 2 : 4 })}{token !== 'USDT' ? ` ${token}` : ''}
                                  </p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Wallet Button */}
                <button
                  onClick={() => setIsWalletOpen(true)}
                  className="primary-cta px-2 md:px-4 py-1.5 md:py-2.5 rounded-lg text-xs md:text-sm font-medium hover:scale-105 transition-transform duration-200 whitespace-nowrap relative z-40 h-[40px] md:h-[52px] flex items-center justify-center gap-1.5 md:gap-2"
                >
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                  </svg>
                  <span className="hidden sm:inline">Wallet</span>
                </button>
              </div>
            ) : null}
          </div>

          {/* Right Section - Login/Signup or Notifications & User Menu */}
          <div className="flex items-center justify-end gap-3 md:gap-4 flex-shrink-0 w-1/3 relative z-40">
            {session?.user ? (
              <>
                {/* Notifications */}
              <div className="relative z-[100]" ref={notificationsRef}>
                  <button
                    ref={notificationsButtonRef}
                    onClick={() => {
                      setNotificationsOpen(!notificationsOpen);
                      setUserMenuOpen(false);
                    }}
                    className="p-2 md:p-2.5 hover:opacity-80 transition-opacity duration-200 relative z-[100]"
                    title="Notifications"
                  >
                    <svg className="w-5 h-5 md:w-6 md:h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"/>
                    </svg>
                    {unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 md:w-5 md:h-5 bg-red-500 rounded-full flex items-center justify-center text-white text-[10px] md:text-xs font-bold z-50000">
                        {unreadCount > 9 ? '9+' : unreadCount}
                      </span>
                    )}
                  </button>

                {/* Notifications Dropdown */}
                {notificationsOpen && (
                  <div 
                    className="fixed md:absolute right-4 md:right-0 top-20 md:top-auto md:mt-2 w-[calc(100vw-2rem)] md:w-96 liquid-glass-strong rounded-lg shadow-xl z-[9999] max-h-96 overflow-hidden flex flex-col"
                  >
                      <div className="p-4 border-b border-white/10 flex items-center justify-between">
                        <h3 className="text-white font-semibold">Notifications</h3>
                        <button
                          onClick={() => setNotificationsOpen(false)}
                          className="text-gray-400 hover:text-white transition-colors z-[61]"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <div className="overflow-y-auto max-h-80">
                        {notifications.map((notification) => (
                          <div
                            key={notification.id}
                            className={`p-4 border-b border-white/5 hover:bg-white/5 transition-colors cursor-pointer ${
                              notification.unread ? 'bg-white/5' : ''
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${
                                notification.unread ? 'bg-blue-500' : 'bg-transparent'
                              }`} />
                              <div className="flex-1 min-w-0">
                                <p className="text-white font-medium text-sm mb-1">{notification.title}</p>
                                <p className="text-gray-400 text-xs mb-1 line-clamp-2">{notification.message}</p>
                                <p className="text-gray-500 text-[10px]">{notification.time}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="relative z-[100]" ref={userMenuRef}>
                  <button
                    ref={userMenuButtonRef}
                    onClick={() => {
                      setUserMenuOpen(!userMenuOpen);
                      setNotificationsOpen(false);
                    }}
                    className="p-1.5 md:p-2 hover:opacity-80 transition-opacity duration-200 relative z-[100]"
                    title="User Menu"
                  >
                    <svg className="w-7 h-7 md:w-8 md:h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                    </svg>
                  </button>

                  {/* User Dropdown Menu */}
                  {userMenuOpen && (
                    <div 
                      className="fixed md:absolute right-4 md:right-0 top-20 md:top-auto md:mt-2 w-56 liquid-glass-strong rounded-lg shadow-xl z-[9999] overflow-hidden"
                    >
                      <div className="p-3 border-b border-white/10">
                        <p className="text-white font-semibold text-sm truncate">
                          {session.user.username || session.user.name || 'User'}
                        </p>
                        <p className="text-gray-400 text-xs truncate">{session.user.email}</p>
                      </div>
                      <div className="py-2">
                        {[
                          { label: 'Transactions', icon: '📊' },
                          { label: 'My Bets', icon: '🎲' },
                          { label: 'Settings', icon: '⚙️' },
                          { label: 'Help and Support', icon: '❓' },
                        ].map((item) => (
                          <button
                            key={item.label}
                            className="w-full px-4 py-2.5 text-left text-white hover:bg-white/10 transition-colors flex items-center gap-3 text-sm z-[61]"
                            onClick={() => setUserMenuOpen(false)}
                          >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                          </button>
                        ))}
                        <div className="border-t border-white/10 my-1" />
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2.5 text-left text-red-400 hover:bg-red-500/10 transition-colors flex items-center gap-3 text-sm z-[61]"
                        >
                          <span>🚪</span>
                          <span>Logout</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <div className="flex items-center gap-1.5 md:gap-2 relative z-40">
                <button 
                  onClick={() => setIsLoginOpen(true)}
                  className="liquid-glass px-2.5 md:px-3 py-1.5 rounded-lg text-white text-xs md:text-sm font-medium hover:liquid-glass-strong transition-all duration-200 whitespace-nowrap relative z-40"
                >
                  Login
                </button>
                <button 
                  onClick={() => setIsSignupOpen(true)}
                  className="primary-cta px-2.5 md:px-3 py-1.5 rounded-lg text-xs md:text-sm font-medium hover:scale-105 transition-transform duration-200 whitespace-nowrap relative z-40"
                >
                  Sign Up
                </button>
              </div>
            )}
          </div>
        </div>
      </nav>

      <WalletModal 
        isOpen={isWalletOpen} 
        onClose={() => setIsWalletOpen(false)}
        selectedToken={selectedToken}
        onTokenChange={setSelectedToken}
      />
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

