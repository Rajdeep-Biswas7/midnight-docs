import React from 'react';
import { ShieldCheck, ExternalLink, Sun, Moon } from 'lucide-react';
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
    <div className="min-h-screen flex flex-col font-sans bg-background text-foreground transition-colors duration-200">
      {/* Top Terminal HUD Navigation */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/80 backdrop-blur-md transition-colors">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-accent shadow-bento">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <span className="font-bold text-base tracking-tight font-mono text-foreground">PrivateAid</span>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30 font-bold">
                  Level 4 MVP
                </span>
              </div>
              <p className="text-xs text-muted-foreground font-mono">
                Confidential Humanitarian Aid on Midnight
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            {switchNetwork && (
              <div className="flex items-center text-xs p-1 rounded-lg border border-border bg-card">
                <button
                  onClick={() => switchNetwork('preprod')}
                  aria-label="Switch to Preprod Network"
                  className={`px-2.5 py-1 rounded-md font-mono transition-all ${
                    activeNetwork === 'preprod' ? 'bg-accent text-accent-foreground font-bold shadow-xs' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Preprod
                </button>
                <button
                  onClick={() => switchNetwork('preview')}
                  aria-label="Switch to Preview Network"
                  className={`px-2.5 py-1 rounded-md font-mono transition-all ${
                    activeNetwork === 'preview' ? 'bg-accent text-accent-foreground font-bold shadow-xs' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Preview
                </button>
              </div>
            )}

            {setIsDarkMode && (
              <button
                type="button"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-card hover:bg-secondary text-foreground border border-border transition-colors shadow-xs"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4 text-foreground" />}
              </button>
            )}

            <a
              href={`https://explorer.1am.xyz/contract/${currentContract}?network=${activeNetwork}`}
              target="_blank"
              rel="noreferrer"
              className="hidden sm:flex items-center space-x-1.5 text-xs font-mono px-3 py-1.5 rounded-lg border border-border bg-card text-muted-foreground hover:text-foreground hover:border-accent transition-colors"
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

      <footer className="border-t border-border py-6 text-xs font-mono bg-background text-muted-foreground transition-colors">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2">
            <span className="font-bold text-foreground">PrivateAid</span>
            <span>•</span>
            <span>Midnight Builder Challenge Level 4</span>
            <span>•</span>
            <span className="text-accent font-semibold">Preprod Live</span>
          </div>
          <div>
            Contract: <code className="text-foreground">{formatAddress(currentContract, 8, 6)}</code>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Layout;
