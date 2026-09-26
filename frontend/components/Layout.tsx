import React from 'react';
import { ShieldCheck, Sun, Moon, ExternalLink, Globe, Wallet, Activity, CheckCircle2, Lock } from 'lucide-react';
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
  isDarkMode = true,
  setIsDarkMode,
  activeNetwork = 'preprod',
  switchNetwork,
}) => {
  const currentContract =
    activeNetwork === 'preview' ? CONTRACT_ADDRESSES.preview : CONTRACT_ADDRESSES.preprod;

  return (
    <div className={`min-h-screen flex flex-col font-sans transition-colors duration-200 ${
      isDarkMode ? 'bg-[#030712] text-zinc-100' : 'bg-[#FAFAFA] text-zinc-900'
    }`}>
      {/* Top Cyphra Minimalist HUD Navigation */}
      <header className={`sticky top-0 z-40 border-b backdrop-blur-md transition-colors ${
        isDarkMode ? 'bg-[#030712]/80 border-zinc-800' : 'bg-white/80 border-zinc-200 shadow-xs'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD400] flex items-center justify-center text-black font-bold shadow-xs">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-lg tracking-tight font-display">PrivateAid</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#FFD400]/20 text-[#FFD400] border border-[#FFD400]/40">
                  Level 4 MVP
                </span>
              </div>
              <p className="text-xs text-zinc-500 font-mono">
                Confidential Humanitarian Aid on Midnight
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {switchNetwork && (
              <div className={`flex items-center text-xs p-1 rounded-lg border ${
                isDarkMode ? 'bg-zinc-900 border-zinc-800' : 'bg-zinc-100 border-zinc-200'
              }`}>
                <button
                  onClick={() => switchNetwork('preprod')}
                  aria-label="Switch to Preprod Network"
                  className={`px-2.5 py-1 rounded-md font-mono transition-all ${
                    activeNetwork === 'preprod' ? 'bg-[#FFD400] text-black font-bold' : 'text-zinc-400'
                  }`}
                >
                  Preprod
                </button>
                <button
                  onClick={() => switchNetwork('preview')}
                  aria-label="Switch to Preview Network"
                  className={`px-2.5 py-1 rounded-md font-mono transition-all ${
                    activeNetwork === 'preview' ? 'bg-[#FFD400] text-black font-bold' : 'text-zinc-400'
                  }`}
                >
                  Preview
                </button>
              </div>
            )}

            {setIsDarkMode && (
              <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                aria-label="Toggle Dark and Light Mode"
                className={`p-2 rounded-lg border transition-colors ${
                  isDarkMode ? 'bg-zinc-900 border-zinc-800 text-amber-400' : 'bg-zinc-100 border-zinc-200 text-zinc-700'
                }`}
              >
                {isDarkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
              </button>
            )}

            <a
              href={`https://explorer.1am.xyz/contract/${currentContract}?network=${activeNetwork}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center space-x-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border border-zinc-700 bg-zinc-900 text-zinc-300 hover:text-white"
            >
              <span>{formatAddress(currentContract, 6, 4)}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      <footer className={`border-t py-6 text-xs font-mono transition-colors ${
        isDarkMode ? 'bg-[#030712] border-zinc-800 text-zinc-500' : 'bg-zinc-100 border-zinc-200 text-zinc-600'
      }`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-zinc-300">PrivateAid</span>
            <span>•</span>
            <span>Midnight Builder Challenge Level 4</span>
            <span>•</span>
            <span className="text-emerald-500 font-semibold">Preprod Live</span>
          </div>
          <div>
            Contract: <code className="text-indigo-400">{formatAddress(currentContract, 8, 6)}</code>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Layout;
