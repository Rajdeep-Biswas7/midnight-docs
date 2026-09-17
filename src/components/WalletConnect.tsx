import React, { useState } from 'react';
import { Wallet, LogOut, CheckCircle2, AlertCircle, Copy, Check, ExternalLink } from 'lucide-react';
import type { WalletInfo } from '../hooks/useMidnight';

interface WalletConnectProps {
  isConnected: boolean;
  isConnecting: boolean;
  walletName: string | null;
  unshieldedAddress: string | null;
  shieldedAddress: string | null;
  error: string | null;
  networkId: string;
  availableWallets: WalletInfo[];
  onConnect: (walletKey?: string) => void;
  onDisconnect: () => void;
}

export const WalletConnect: React.FC<WalletConnectProps> = ({
  isConnected,
  isConnecting,
  walletName,
  unshieldedAddress,
  shieldedAddress,
  error,
  networkId,
  availableWallets,
  onConnect,
  onDisconnect,
}) => {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const truncateAddress = (addr: string) => {
    if (!addr || addr.length <= 20) return addr;
    return `${addr.slice(0, 12)}...${addr.slice(-8)}`;
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-sm">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 mb-5">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-indigo-400">
            <Wallet className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-100">Midnight Wallet</h2>
            <p className="text-xs text-slate-400">Network: <span className="text-indigo-400 font-mono uppercase">{networkId}</span></p>
          </div>
        </div>

        <div>
          {isConnected ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded-full">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Connected ({walletName || 'Lace / 1am'})
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-medium bg-slate-800 text-slate-400 border border-slate-700 rounded-full">
              Disconnected
            </span>
          )}
        </div>
      </div>

      {error && (
        <div className="mb-5 p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-3 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400 mt-0.5" />
          <div className="space-y-1">
            <p className="font-medium text-rose-200">Connection Error</p>
            <p className="text-xs text-rose-300/90 leading-relaxed">{error}</p>
            {error.includes('install') && (
              <div className="pt-2 flex flex-wrap gap-2 text-xs">
                <a
                  href="https://1am.xyz"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-300 hover:text-indigo-200 underline font-medium"
                >
                  Install 1am Wallet (1am.xyz) <ExternalLink className="w-3 h-3" />
                </a>
                <span className="text-slate-500">•</span>
                <a
                  href="https://chromewebstore.google.com/detail/midnight-lace/hflbnhflknlpebbdfnmbkgfkaffpneek"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-indigo-300 hover:text-indigo-200 underline font-medium"
                >
                  Install Midnight Lace <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            )}
          </div>
        </div>
      )}

      {!isConnected ? (
        <div className="space-y-4 text-center py-4">
          <p className="text-sm text-slate-300 max-w-md mx-auto">
            Connect your Midnight-compatible browser wallet (Midnight Lace or 1am Wallet) to interact with zero-knowledge contracts on Preprod.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
            <button
              onClick={() => onConnect('mnLace')}
              disabled={isConnecting}
              className="px-5 py-2.5 rounded-xl font-medium text-sm text-white bg-indigo-600 hover:bg-indigo-500 active:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
            >
              {isConnecting ? (
                <>
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Connecting...
                </>
              ) : (
                <>
                  <Wallet className="w-4 h-4" />
                  Connect Lace / 1am Wallet
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-slate-500 pt-2">
            Supports Lace Wallet &amp; 1am.xyz DApp Connector Standard
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800 space-y-3">
            <div>
              <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                Unshielded Address (Public)
              </span>
              <div className="flex items-center justify-between gap-2 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
                <span className="font-mono text-xs text-indigo-300 truncate select-all">
                  {unshieldedAddress || 'Address unavailable'}
                </span>
                {unshieldedAddress && (
                  <button
                    onClick={() => copyToClipboard(unshieldedAddress)}
                    className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
                    title="Copy Address"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                )}
              </div>
            </div>

            {shieldedAddress && (
              <div>
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                  Shielded Address (ZK-Protected)
                </span>
                <div className="flex items-center justify-between gap-2 bg-slate-900 px-3 py-2 rounded-lg border border-slate-800">
                  <span className="font-mono text-xs text-emerald-300 truncate select-all">
                    {truncateAddress(shieldedAddress)}
                  </span>
                  <button
                    onClick={() => copyToClipboard(shieldedAddress)}
                    className="p-1 text-slate-400 hover:text-slate-200 transition-colors"
                    title="Copy Shielded Address"
                  >
                    <Copy className="w-4 h-4" />
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center pt-2">
            <span className="text-xs text-emerald-400/90 flex items-center gap-1.5 font-medium">
              <CheckCircle2 className="w-4 h-4" /> Ready for Zero-Knowledge Proofs
            </span>
            <button
              onClick={onDisconnect}
              className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" /> Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
