import React from 'react';
import { Layers, CheckCircle2, ExternalLink, ShieldCheck, Hash, Clock } from 'lucide-react';
import { QuantumLockIcon } from './CustomIcons';
import type { ContributionRecord } from '../hooks/useMidnight';

interface ContributionHistoryFeedProps {
  history: ContributionRecord[];
  contractAddress: string;
  networkId?: string;
}

export const ContributionHistoryFeed: React.FC<ContributionHistoryFeedProps> = ({
  history,
  contractAddress,
  networkId = 'preprod',
}) => {
  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm overflow-hidden">
      <div className="p-6 sm:p-7 space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD400]/20 border border-[#FFD400] flex items-center justify-center text-black shadow-xs">
              <Layers className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-black text-black dark:text-white tracking-tight flex items-center gap-2">
                On-Chain Contribution &amp; Transition Feed
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-400 font-bold border border-emerald-300 dark:border-emerald-800">
                  Zero Identity Leak
                </span>
              </h3>
              <p className="text-xs text-zinc-500 font-mono">
                Auditable state sequence on Midnight {networkId.toUpperCase()} without compromising participant confidentiality
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-full">
            <QuantumLockIcon className="w-3.5 h-3.5 text-emerald-600" />
            <span>Unlinkable Preimages</span>
          </span>
        </div>

        {/* Feed List */}
        <div className="space-y-2.5">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-zinc-50 dark:bg-zinc-950/70 hover:bg-zinc-100/80 dark:hover:bg-zinc-900/80 rounded-xl border border-zinc-200 dark:border-zinc-800 transition-all space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-black text-[#FFD400] font-mono font-bold text-[11px]">
                    Round #{item.round}
                  </span>
                  <span className="font-bold text-zinc-900 dark:text-zinc-100">{item.type}</span>
                  <span className="text-zinc-400 hidden sm:inline">•</span>
                  <span className="inline-flex items-center gap-1 text-emerald-700 dark:text-emerald-400 text-[11px] font-mono font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-zinc-500 font-mono">
                  <Clock className="w-3 h-3 text-zinc-400" />
                  <span>{item.time}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-zinc-200 dark:border-zinc-800/80 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-zinc-500 text-[11px]">Cumulative Tally:</span>
                  <span className="font-bold text-black dark:text-[#FFD400]">{item.totalValue.toLocaleString()} tDUST</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-zinc-500 text-[11px] truncate max-w-[130px]">
                    {item.txHash.slice(0, 10)}...
                  </span>
                  <a
                    href={`https://explorer.1am.xyz/contract/${contractAddress}?network=${networkId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-black dark:text-[#FFD400] hover:underline font-bold transition-colors flex items-center gap-1 text-[11px]"
                  >
                    <span>Explorer</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};