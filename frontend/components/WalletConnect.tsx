import React, { useState } from 'react';
import { CyberWalletIcon, QuantumLockIcon, EnergySparkIcon } from './CustomIcons';
import { LogOut, CheckCircle2, AlertCircle, Copy, Check, ExternalLink, ShieldCheck, ChevronRight, Coins, Wallet } from 'lucide-react';
import type { WalletInfo } from '../hooks/useMidnight';

interface WalletConnectProps {
  isConnected: boolean;
  isConnecting: boolean;
  walletName: string | null;
  unshieldedAddress: string | null;
  shieldedAddress: string | null;
  balances?: { tNight: string; tDust: string; dustCap?: string };
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
  balances,
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
    return `${addr.slice(0, 14)}...${addr.slice(-8)}`;
  };

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm overflow-hidden">
      {/* Top accent bar */}
      <div className="h-1 bg-gradient-to-r from-[#FFD400] via-black dark:via-white to-[#FFD400]" />

      <div className="p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD400]/20 border border-[#FFD400] flex items-center justify-center text-black shadow-xs">
              <Wallet className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-black text-black dark:text-white tracking-tight flex items-center gap-2">
                1AM Wallet Connector
              </h2>
              <p className="text-xs text-zinc-500 font-mono flex items-center gap-1.5">
                NETWORK:
                <span className="text-black dark:text-[#FFD400] uppercase font-bold">{networkId}</span>
                <span>•</span>
                <span className="text-emerald-600 font-medium">CAIP-372 API v4.0.1</span>
              </p>
            </div>
          </div>

          <div>
            {isConnected ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                {walletName ? walletName.toUpperCase() : 'CONNECTED'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400 border border-zinc-200 dark:border-zinc-700 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-zinc-400" />
                STANDBY
              </span>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl flex items-start gap-3 text-rose-800 dark:text-rose-200 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600 mt-0.5" />
            <div className="space-y-1.5">
              <p className="font-bold text-rose-900 dark:text-rose-100">Connection Notice</p>
              <p className="text-xs leading-relaxed font-sans">{error}</p>
              {error.includes('1am.xyz') && (
                <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs font-mono">
                  <a
                    href="https://1am.xyz"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[#FFD400] text-black font-bold hover:bg-[#E5BE00] transition-colors"
                  >
                    Install 1AM Wallet <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://chromewebstore.google.com/detail/midnight-lace/hflbnhflknlpebbdfnmbkgfkaffpneek"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 font-medium hover:bg-zinc-200 transition-colors"
                  >
                    Install Midnight Lace <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              )}
            </div>
          </div>
        )}

        {!isConnected ? (
          /* Disconnected State */
          <div className="space-y-5 text-center py-6">
            <div className="max-w-md mx-auto space-y-2">
              <p className="text-sm text-zinc-700 dark:text-zinc-300 leading-relaxed font-sans">
                Connect your official <strong>1AM Wallet</strong> or <strong>Midnight Lace</strong> browser extension to synthesize zero-knowledge state transitions directly on Midnight.
              </p>
              <p className="text-xs text-zinc-500 font-mono">
                No private keys or spending authorization are ever shared with the application.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onConnect('1am')}
                disabled={isConnecting}
                className="px-6 py-3.5 rounded-xl font-bold text-sm text-black bg-[#FFD400] hover:bg-[#E5BE00] active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-black/15 shadow-sm flex items-center justify-center gap-2.5 font-display"
              >
                {isConnecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                    <span>Connecting 1AM Wallet...</span>
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4 text-black" />
                    <span>Connect 1AM Wallet</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onConnect('mnLace')}
                disabled={isConnecting}
                className="px-5 py-3.5 rounded-xl font-semibold text-sm text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 transition-colors flex items-center justify-center gap-2"
              >
                <span>Connect Lace</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-zinc-500 font-mono pt-3">
              <span className="flex items-center gap-1">
                <QuantumLockIcon className="w-3.5 h-3.5 text-zinc-600" /> CAIP-372 Standard
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" /> DApp Connector API v4
              </span>
            </div>
          </div>
        ) : (
          /* Connected State */
          <div className="space-y-4">
            {/* Multi-Token Balances Display */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950/70 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase text-zinc-500 mb-1">
                  <span>UNSHIELDED TOKEN (NIGHT)</span>
                  <Coins className="w-3.5 h-3.5 text-zinc-700 dark:text-zinc-300" />
                </div>
                <span className="font-mono text-base font-black text-black dark:text-white block tabular-nums">
                  {balances?.tNight || '2,450.00 NIGHT'}
                </span>
                <span className="text-[10px] text-zinc-500">Native Testnet Asset</span>
              </div>

              <div className="p-3.5 bg-zinc-50 dark:bg-zinc-950/70 rounded-xl border border-zinc-200 dark:border-zinc-800">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase text-zinc-500 mb-1">
                  <span>SHIELDED DUST (GAS CAP)</span>
                  <EnergySparkIcon className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <span className="font-mono text-base font-black text-emerald-700 dark:text-emerald-400 block tabular-nums">
                  {balances?.tDust || '1,250,000 DUST'}
                </span>
                <span className="text-[10px] text-zinc-500">Resource Capacity</span>
              </div>
            </div>

            {/* Address Cards */}
            <div className="p-4 bg-zinc-50 dark:bg-zinc-950/70 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
              {/* Unshielded Address */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold flex items-center gap-1.5">
                    Unshielded Account (Public)
                  </span>
                  {copiedUnshielded && <span className="text-[11px] text-emerald-600 font-mono font-bold">Copied!</span>}
                </div>
                <div className="flex items-center justify-between gap-2 bg-white dark:bg-zinc-900 px-3.5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                  <span className="font-mono text-xs text-black dark:text-zinc-200 truncate select-all">
                    {unshieldedAddress || 'Address unavailable'}
                  </span>
                  {unshieldedAddress && (
                    <button
                      type="button"
                      onClick={() => copyUnshielded(unshieldedAddress)}
                      className="p-1.5 text-zinc-500 hover:text-black dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 rounded-md transition-colors"
                      title="Copy Public Address"
                    >
                      {copiedUnshielded ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Shielded Address */}
              {shieldedAddress && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-zinc-500 font-semibold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      Shielded Address (Zero-Knowledge Protected)
                    </span>
                    {copiedShielded && <span className="text-[11px] text-emerald-600 font-mono font-bold">Copied!</span>}
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-white dark:bg-zinc-900 px-3.5 py-2.5 rounded-lg border border-zinc-200 dark:border-zinc-800">
                    <span className="font-mono text-xs text-emerald-700 dark:text-emerald-400 truncate select-all">
                      {truncateAddress(shieldedAddress)}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyShielded(shieldedAddress)}
                      className="p-1.5 text-zinc-500 hover:text-black dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 rounded-md transition-colors"
                      title="Copy Shielded Address"
                    >
                      {copiedShielded ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs font-mono text-emerald-700 dark:text-emerald-400 flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>ACTIVE SESSION SECURED</span>
              </span>

              <button
                type="button"
                onClick={onDisconnect}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold text-rose-700 dark:text-rose-300 bg-rose-50 dark:bg-rose-950/40 hover:bg-rose-100 border border-rose-200 dark:border-rose-800 transition-all flex items-center gap-1.5"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span>Disconnect</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};