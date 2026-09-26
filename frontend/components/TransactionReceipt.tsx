import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, ExternalLink, Hash, Layers, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { type NetworkType } from '../hooks/useMidnight';

export interface TransactionReceiptProps {
  txHash: string;
  network: NetworkType;
  blockHeight?: number | null;
  round?: number | null;
  totalValue?: number | null;
  timestamp?: string;
  onDismiss?: () => void;
}

export const TransactionReceipt: React.FC<TransactionReceiptProps> = ({
  txHash,
  network,
  blockHeight,
  round,
  totalValue,
  timestamp = 'Just now',
  onDismiss,
}) => {
  const [copied, setCopied] = useState(false);

  const explorerTxUrl = `https://explorer.1am.xyz/tx/${txHash}?network=${network}`;
  const networkName = network === 'preprod' ? 'Midnight Preprod' : 'Midnight Preview';

  const handleCopy = () => {
    navigator.clipboard.writeText(txHash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Truncate hash for compact mobile views while keeping full hash available
  const truncatedHash = `${txHash.slice(0, 14)}...${txHash.slice(-10)}`;

  return (
    <div
      role="region"
      aria-label="Transaction Receipt"
      className="p-5 sm:p-6 bg-emerald-50/90 dark:bg-emerald-950/40 border-2 border-emerald-500/60 dark:border-emerald-500/40 rounded-2xl space-y-4 shadow-sm transition-all"
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-emerald-200 dark:border-emerald-800/80">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-emerald-500/20 border border-emerald-500 flex items-center justify-center text-emerald-700 dark:text-emerald-300">
            <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <h3 className="font-display text-sm sm:text-base font-black text-emerald-950 dark:text-emerald-100 flex items-center gap-2">
              Transaction Confirmed
            </h3>
            <p className="text-[11px] font-mono text-emerald-800 dark:text-emerald-300/80">
              Verified &amp; settled on {networkName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-[11px] font-mono font-bold text-emerald-900 dark:text-emerald-200 bg-emerald-100 dark:bg-emerald-900/60 border border-emerald-300 dark:border-emerald-700 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            ON-CHAIN CONFIRMED
          </span>
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="text-[11px] font-mono text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200 px-2 py-0.5 rounded hover:bg-emerald-100/50 dark:hover:bg-emerald-900/40 transition-colors"
            >
              Dismiss
            </button>
          )}
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="bg-white dark:bg-zinc-900 rounded-xl border border-emerald-200 dark:border-emerald-900/70 p-4 space-y-3 font-mono text-xs">
        {/* Transaction Hash */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-zinc-500 text-[10px] uppercase font-bold tracking-wider">
            <span className="flex items-center gap-1">
              <Hash className="w-3 h-3 text-emerald-600" />
              Transaction Hash
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-[11px] text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700 transition-colors"
                title="Copy full transaction hash"
              >
                {copied ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
          <div
            className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-emerald-800 dark:text-emerald-300 break-all select-all font-bold"
            title={txHash}
          >
            {/* Show truncated preview on extra small mobile, full break-all on wider */}
            <span className="sm:hidden">{truncatedHash}</span>
            <span className="hidden sm:inline">{txHash}</span>
          </div>
        </div>

        {/* Metadata Row: Block Height, Network, Status */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-[11px]">
          <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] text-zinc-500 block uppercase font-bold">Consensus Block</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100">
              {blockHeight ? `#${blockHeight.toLocaleString()}` : 'Included in block'}
            </span>
          </div>

          <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] text-zinc-500 block uppercase font-bold">Target Network</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100 uppercase">{network}</span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800">
            <span className="text-[10px] text-zinc-500 block uppercase font-bold">Execution Time</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100">{timestamp}</span>
          </div>
        </div>

        {/* State Transition Delta if round / total provided */}
        {(round !== undefined && round !== null || totalValue !== undefined && totalValue !== null) && (
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {round !== undefined && round !== null && (
              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center">
                <span className="text-[10px] text-zinc-500 block uppercase font-bold">Disclosed Round</span>
                <span className="text-sm font-black text-black dark:text-white font-mono">#{round}</span>
              </div>
            )}
            {totalValue !== undefined && totalValue !== null && (
              <div className="p-2.5 rounded-lg bg-zinc-50 dark:bg-zinc-950 border border-zinc-200 dark:border-zinc-800 text-center">
                <span className="text-[10px] text-zinc-500 block uppercase font-bold">Disclosed Aid Total</span>
                <span className="text-sm font-black text-emerald-700 dark:text-emerald-400 font-mono">
                  {totalValue.toLocaleString()} tDUST
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Explorer Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        <div className="flex items-center gap-1.5 text-xs text-emerald-800 dark:text-emerald-300 font-medium">
          <ShieldCheck className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span>Private witness never disclosed. Only verified state committed.</span>
        </div>

        <a
          href={explorerTxUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-black text-[#FFD400] dark:bg-[#FFD400] dark:text-black font-bold font-mono text-xs hover:opacity-95 active:scale-95 transition-all shadow-sm"
        >
          <span>View on 1AM Explorer</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
};
