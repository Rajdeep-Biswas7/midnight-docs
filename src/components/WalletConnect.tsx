import React, { useState } from 'react';
import { QuantumLockIcon, EnergySparkIcon } from './CustomIcons';
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
    <div className="rounded-xl border border-border bg-card shadow-bento overflow-hidden transition-colors">
      {/* Top Anchor teal hairline accent bar */}
      <div className="h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-80" />

      <div className="p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center text-accent shadow-xs">
              <Wallet className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-mono text-base font-bold text-foreground tracking-tight flex items-center gap-2">
                1AM Wallet Connector
              </h2>
              <p className="text-xs text-muted-foreground font-mono flex items-center gap-1.5">
                NETWORK:
                <span className="text-accent uppercase font-bold">{networkId}</span>
                <span>•</span>
                <span>CAIP-372 API v4.0.1</span>
              </p>
            </div>
          </div>

          <div>
            {isConnected ? (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold bg-accent/15 text-accent border border-accent/30 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                {walletName ? walletName.toUpperCase() : 'CONNECTED'}
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-muted-foreground bg-secondary border border-border rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                STANDBY
              </span>
            )}
          </div>
        </div>

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-destructive/15 border border-destructive/40 rounded-lg flex items-start gap-3 text-destructive text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
            <div className="space-y-1.5">
              <p className="font-bold font-mono text-xs uppercase tracking-wider">Connection Notice</p>
              <p className="text-xs leading-relaxed font-sans">{error}</p>
              {error.includes('1am.xyz') && (
                <div className="pt-2 flex flex-wrap items-center gap-2.5 text-xs font-mono">
                  <a
                    href="https://1am.xyz"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-accent text-accent-foreground font-bold hover:opacity-90 transition-opacity"
                  >
                    Install 1AM Wallet <ExternalLink className="w-3 h-3" />
                  </a>
                  <a
                    href="https://chromewebstore.google.com/detail/midnight-lace/hflbnhflknlpebbdfnmbkgfkaffpneek"
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded bg-secondary text-foreground border border-border hover:border-accent transition-colors"
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
              <p className="text-sm text-muted-foreground leading-relaxed font-sans">
                Connect your official <strong className="text-foreground">1AM Wallet</strong> or <strong className="text-foreground">Midnight Lace</strong> browser extension to synthesize zero-knowledge state transitions directly on Midnight.
              </p>
              <p className="text-xs text-muted-foreground font-mono">
                No private keys or spending authorization are ever shared with the application.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => onConnect('1am')}
                disabled={isConnecting}
                className="px-6 py-3.5 rounded-lg font-bold text-sm text-accent-foreground bg-accent hover:opacity-90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed transition-all border border-accent/40 shadow-xs flex items-center justify-center gap-2.5 font-mono"
              >
                {isConnecting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-accent-foreground/30 border-t-accent-foreground rounded-full animate-spin" />
                    <span>Connecting 1AM Wallet...</span>
                  </>
                ) : (
                  <>
                    <Wallet className="w-4 h-4" />
                    <span>Connect 1AM Wallet</span>
                    <ChevronRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <button
                type="button"
                onClick={() => onConnect('mnLace')}
                disabled={isConnecting}
                className="px-5 py-3.5 rounded-lg font-semibold text-sm text-foreground bg-secondary hover:bg-secondary/80 border border-border hover:border-accent transition-colors flex items-center justify-center gap-2 font-mono"
              >
                <span>Connect Lace</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-4 text-xs text-muted-foreground font-mono pt-3">
              <span className="flex items-center gap-1">
                <QuantumLockIcon className="w-3.5 h-3.5 text-accent" /> CAIP-372 Standard
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-accent" /> DApp Connector API v4
              </span>
            </div>
          </div>
        ) : (
          /* Connected State */
          <div className="space-y-4">
            {/* Multi-Token Balances Display */}
            <div className="grid grid-cols-2 gap-3">
              <div className="p-3.5 bg-background rounded-lg border border-border">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase text-muted-foreground mb-1">
                  <span>UNSHIELDED TOKEN (NIGHT)</span>
                  <Coins className="w-3.5 h-3.5 text-muted-foreground" />
                </div>
                <span className="font-mono text-base font-bold text-foreground block tabular-nums">
                  {balances?.tNight || '2,450.00 NIGHT'}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">Native Testnet Asset</span>
              </div>

              <div className="p-3.5 bg-background rounded-lg border border-border">
                <div className="flex items-center justify-between text-[10px] font-mono uppercase text-muted-foreground mb-1">
                  <span>SHIELDED DUST (GAS CAP)</span>
                  <EnergySparkIcon className="w-3.5 h-3.5 text-accent" />
                </div>
                <span className="font-mono text-base font-bold text-accent block tabular-nums">
                  {balances?.tDust || '1,250,000 DUST'}
                </span>
                <span className="text-[10px] text-muted-foreground font-mono">Resource Capacity</span>
              </div>
            </div>

            {/* DUST Gas & Proving Capacity Helper */}
            <div className="p-3 rounded-lg bg-secondary/60 border border-border flex items-center justify-between gap-2 text-xs font-mono">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                <span className="text-[11px]">Need tNIGHT or DUST for ZK fees?</span>
              </div>
              <a
                href={networkId === 'preprod' ? 'https://midnight-tmnight-preprod.nethermind.dev' : 'https://midnight-tmnight-preview.nethermind.dev'}
                target="_blank"
                rel="noreferrer"
                className="text-accent hover:underline flex items-center gap-1 font-bold text-[11px]"
              >
                <span>Faucet Tokens</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>

            {/* Address Cards */}
            <div className="p-4 bg-background rounded-lg border border-border space-y-3">
              {/* Unshielded Address */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                    Unshielded Account (Public)
                  </span>
                  {copiedUnshielded && <span className="text-[11px] text-accent font-mono font-bold">Copied!</span>}
                </div>
                <div className="flex items-center justify-between gap-2 bg-card px-3.5 py-2.5 rounded-lg border border-border">
                  <span className="font-mono text-xs text-foreground truncate select-all">
                    {unshieldedAddress || 'Address unavailable'}
                  </span>
                  {unshieldedAddress && (
                    <button
                      type="button"
                      onClick={() => copyUnshielded(unshieldedAddress)}
                      className="p-1.5 text-muted-foreground hover:text-foreground bg-secondary rounded transition-colors border border-border"
                      title="Copy Public Address"
                    >
                      {copiedUnshielded ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  )}
                </div>
              </div>

              {/* Shielded Address */}
              {shieldedAddress && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground font-semibold flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-accent" />
                      Shielded Address (Zero-Knowledge Protected)
                    </span>
                    {copiedShielded && <span className="text-[11px] text-accent font-mono font-bold">Copied!</span>}
                  </div>
                  <div className="flex items-center justify-between gap-2 bg-card px-3.5 py-2.5 rounded-lg border border-border">
                    <span className="font-mono text-xs text-accent truncate select-all">
                      {truncateAddress(shieldedAddress)}
                    </span>
                    <button
                      type="button"
                      onClick={() => copyShielded(shieldedAddress)}
                      className="p-1.5 text-muted-foreground hover:text-foreground bg-secondary rounded transition-colors border border-border"
                      title="Copy Shielded Address"
                    >
                      {copiedShielded ? <Check className="w-3.5 h-3.5 text-accent" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Bottom Actions */}
            <div className="flex justify-between items-center pt-2">
              <span className="text-xs font-mono text-accent flex items-center gap-1.5 font-bold">
                <CheckCircle2 className="w-4 h-4 text-accent" />
                <span>ACTIVE SESSION SECURED</span>
              </span>

              <button
                type="button"
                onClick={onDisconnect}
                className="px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold text-destructive bg-destructive/15 hover:bg-destructive/25 border border-destructive/30 transition-all flex items-center gap-1.5"
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
export default WalletConnect;