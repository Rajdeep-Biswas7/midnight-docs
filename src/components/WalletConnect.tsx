import React, { useState } from 'react';
import { CyberWalletIcon, QuantumLockIcon, EnergySparkIcon } from './CustomIcons';
import { LogOut, CheckCircle2, AlertCircle, Copy, Check, ExternalLink, ShieldCheck, ChevronRight } from 'lucide-react';
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
  const [copiedUnshielded, setCopiedUnshielded] = useState(false);
  const [copiedShielded, setCopiedShielded] = useState(false);

  const copyUnshielded = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedUnshielded(true);
    setTimeout(() => setCopiedUnshielded(false), 2000);
  };

  const copyShielded = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedShielded(true);
    setTimeout(() => setCopiedShielded(false), 2000);
  };

  const truncateAddress = (addr: string) => {
    if (!addr || addr.length <= 20) return addr;
    return `${addr.slice(0, 12)}...${addr.slice(-8)}`;
  };

  return (
    <div className="radiant-card-wrap">
      <div className="radiant-card-content p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-indigo-500/15">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <CyberWalletIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Midnight Wallet
              </h2>
              <p className="text-xs text-slate-400 flex items-center gap-1.5 font-mono">
                NETWORK:
                <span className="text-indigo-400 uppercase font-bold">{networkId}</span>
              </p>
            </div>
          </div>

          <div>
            {isConnected ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                {walletName ? walletName.toUpperCase() : 'CONNECTED'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium bg-slate-900 text-slate-400 border border-slate-800 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500" />
                STANDBY
              </span>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-3 text-rose-300 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-rose-200">Connection Note</p>
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

        {/* Not Connected State */}
        {!isConnected ? (
          <div className="space-y-4 text-center py-3">
            <p className="text-sm text-slate-300 max-w-md mx-auto leading-relaxed">
              Connect your Midnight-compatible browser wallet (<span className="text-indigo-300 font-medium">Midnight Lace</span> or <span className="text-indigo-300 font-medium">1am Wallet</span>) to interact with zero-knowledge contracts on Preprod.
            </p>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onConnect('mnLace')}
                disabled={isConnecting}
                className="px-6 py-3 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 hover:from-indigo-500 hover:to-purple-500 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-600/25 flex items-center justify-center gap-2.5 font-display"
              >
                {isConnecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    <span>Connecting DApp...</span>
                  </>
                ) : (
                  <>
                    <CyberWalletIcon className="w-4 h-4" />
                    <span>Connect Midnight Wallet</span>
                    <ChevronRight className="w-4 h-4 text-indigo-300" />
                  </>
                )}
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-3">
              <span className="flex items-center gap-1">
                <QuantumLockIcon className="w-3.5 h-3.5 text-indigo-400" /> BIP-39 Compatible
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <EnergySparkIcon className="w-3.5 h-3.5 text-emerald-400" /> DApp Connector API v4
              </span>
            </div>
          </div>
        ) : (
          /* Connected State */
          <div className="space-y-4">
            <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800/80 space-y-3">
              {/* Unshielded Address */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                    Unshielded Address (Public)
                  </span>
                  {copiedUnshielded && <span className="text-[11px] text-emerald-400 font-mono font-medium">Copied!</span>}
                </div>
                <div className="flex items-center justify-between gap-2 bg-slate-900/90 px-3.5 py-2.5 rounded-lg border border-slate-800">
                  <span className="font-mono text-xs text-indigo-300 truncate select-all">
                    {unshieldedAddress || 'Address unavailable'}
                  </span>
                  {unshieldedAddress && (
                    <button
                      type="button"
                      onClick={() => copyUnshielded(unshieldedAddress)}
                      className="p-1.5 text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800 rounded-md transition-colors"
                      title="Copy Public Address"
                    >
                      {copiedUnshielded ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Shielded Address */}
              {shieldedAddress && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                      Shielded Address (ZK-Protected)
                    </span>
                    {copiedShielded && <span className="text-[11px] text-emerald-400 font-mono font-medium">Copied!</span>}
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-slate-900/90 px-3.5 py-2.5 rounded-lg border border-slate-800">
                    <span className="font-mono text-xs text-emerald-300 truncate select-all">
                      {truncateAddress(shieldedAddress)}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyShielded(shieldedAddress)}
                      className="p-1.5 text-slate-400 hover:text-slate-200 bg-slate-800/60 hover:bg-slate-800 rounded-md transition-colors"
                      title="Copy Shielded Address"
                    >
                      {copiedShielded ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-between items-center pt-2">
              <span className="text-xs text-emerald-400/90 flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" /> Ready for Browser ZK Proofs
              </span>
              <button
                type="button"
                onClick={onDisconnect}
                className="px-3.5 py-1.5 rounded-lg text-xs font-medium text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/20 transition-all flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" /> Disconnect
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
