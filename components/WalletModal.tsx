'use client';

interface WalletModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedToken?: string;
  onTokenChange?: (token: string) => void;
}

export default function WalletModal({ isOpen, onClose, selectedToken = 'USDT', onTokenChange }: WalletModalProps) {
  const tokens = ['USDT', 'BTC', 'ETH', 'BNB'];
  const walletAmount = 1250.50;
  
  const tokenIcons: { [key: string]: string } = {
    USDT: '₮',
    BTC: '₿',
    ETH: 'Ξ',
    BNB: 'BNB',
  };
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        className="liquid-glass-strong rounded-2xl p-8 max-w-md w-full mx-4 relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white hover:text-gray-300 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <h2 className="text-2xl font-bold text-white mb-6">Wallet</h2>

        <div className="space-y-4">
          <div className="liquid-glass rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm text-gray-400">Total Balance</p>
              <div className="flex gap-2">
                {tokens.map((token) => (
                  <button
                    key={token}
                    onClick={() => onTokenChange?.(token)}
                    className={`px-3 py-1 rounded-lg text-xs font-medium transition-all ${
                      selectedToken === token
                        ? 'primary-cta text-white'
                        : 'liquid-glass text-gray-300 hover:liquid-glass-strong'
                    }`}
                  >
                    {token}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-400 to-orange-500 flex items-center justify-center text-white font-bold text-xl">
                {tokenIcons[selectedToken] || '₮'}
              </div>
              <div>
                <p className="text-3xl font-bold text-white">
                  ${walletAmount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </p>
                <p className="text-sm text-gray-400">{selectedToken}</p>
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 primary-cta py-3 rounded-lg font-medium hover:scale-105 transition-transform">
              Deposit
            </button>
            <button className="flex-1 liquid-glass py-3 rounded-lg text-white font-medium hover:liquid-glass-strong transition-all">
              Withdraw
            </button>
          </div>

          <div className="liquid-glass rounded-lg p-4">
            <p className="text-sm text-gray-400 mb-2">Recent Transactions</p>
            <p className="text-gray-300 text-sm">No transactions yet</p>
          </div>
        </div>
      </div>
    </div>
  );
}

