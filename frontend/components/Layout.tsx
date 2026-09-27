import React from 'react';
import { ShieldCheck, ExternalLink } from 'lucide-react';
import { formatAddress, CONTRACT_ADDRESSES } from '../utils/contract';

export interface LayoutProps {
  children: React.ReactNode;
  isDarkMode?: boolean;
  setIsDarkMode?: (val: boolean) => void;
  activeNetwork?: 'preprod' | 'preview';
  switchNetwork?: (net: 'preprod' | 'preview') => void;
}

export const Layout: React.FC<LayoutProps> = ({
  children,
  activeNetwork = 'preprod',
  switchNetwork,
}) => {
  const currentContract =
    activeNetwork === 'preview' ? CONTRACT_ADDRESSES.preview : CONTRACT_ADDRESSES.preprod;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#0a0a0a] text-[#f5f5f5]">
      {/* Top Terminal HUD Navigation */}
      <header className="sticky top-0 z-40 border-b border-[#1f1f1f] bg-[#0a0a0a]/90 backdrop-blur-md">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-lg bg-[#111111] border border-[#1f1f1f] flex items-center justify-center text-[#22c55e]">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base tracking-tight font-mono text-[#f5f5f5]">PrivateAid</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30">
                  Level 4 MVP
                </span>
              </div>
              <p className="text-xs text-[#8a8a8a] font-mono">
                Confidential Humanitarian Aid on Midnight
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {switchNetwork && (
              <div className="flex items-center text-xs p-1 rounded-lg border border-[#1f1f1f] bg-[#111111]">
                <button
                  onClick={() => switchNetwork('preprod')}
                  aria-label="Switch to Preprod Network"
                  className={`px-2.5 py-1 rounded font-mono transition-all ${
                    activeNetwork === 'preprod' ? 'bg-[#22c55e] text-black font-bold' : 'text-[#8a8a8a] hover:text-[#f5f5f5]'
                  }`}
                >
                  Preprod
                </button>
                <button
                  onClick={() => switchNetwork('preview')}
                  aria-label="Switch to Preview Network"
                  className={`px-2.5 py-1 rounded font-mono transition-all ${
                    activeNetwork === 'preview' ? 'bg-[#22c55e] text-black font-bold' : 'text-[#8a8a8a] hover:text-[#f5f5f5]'
                  }`}
                >
                  Preview
                </button>
              </div>
            )}

            <a
              href={`https://explorer.1am.xyz/contract/${currentContract}?network=${activeNetwork}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center space-x-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border border-[#1f1f1f] bg-[#111111] text-[#8a8a8a] hover:text-[#f5f5f5] hover:border-[#333333] transition-colors"
            >
              <span>{formatAddress(currentContract, 6, 4)}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-6">
        {children}
      </main>

      <footer className="border-t border-[#1f1f1f] py-6 text-xs font-mono bg-[#0a0a0a] text-[#8a8a8a]">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-[#f5f5f5]">PrivateAid</span>
            <span>•</span>
            <span>Midnight Builder Challenge Level 4</span>
            <span>•</span>
            <span className="text-[#22c55e] font-semibold">Preprod Live</span>
          </div>
          <div>
            Contract: <code className="text-[#f5f5f5]">{formatAddress(currentContract, 8, 6)}</code>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Layout;
