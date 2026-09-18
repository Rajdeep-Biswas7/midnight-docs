import React from 'react';
import { Layers, CheckCircle2, ExternalLink, ShieldCheck, Hash, Clock } from 'lucide-react';
import { QuantumLockIcon } from './CustomIcons';
import type { ContributionRecord } from '../hooks/useMidnight';

interface ContributionHistoryFeedProps {
  history: ContributionRecord[];
  contractAddress: string;
}

export const ContributionHistoryFeed: React.FC<ContributionHistoryFeedProps> = ({
  history,
  contractAddress,
}) => {
  return (
    <div className="radiant-card-wrap">
      <div className="radiant-card-content p-6 sm:p-7 space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-indigo-500/15">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <Layers className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                On-Chain Contribution &amp; Transition Feed
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  Zero Identity Leak
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Auditable state sequence on Midnight Preprod without compromising participant confidentiality
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-slate-400 bg-slate-900 border border-slate-800 rounded-full">
            <QuantumLockIcon className="w-3.5 h-3.5 text-emerald-400" />
            <span>Unlinkable Preimages</span>
          </span>
        </div>

        {/* Feed List */}
        <div className="space-y-2.5">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-slate-950/70 hover:bg-slate-900/60 rounded-xl border border-slate-800/80 transition-all space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-indigo-500/15 text-indigo-300 font-mono font-bold text-[11px] border border-indigo-500/30">
                    Round #{item.round}
                  </span>
                  <span className="font-semibold text-slate-200">{item.type}</span>
                  <span className="text-slate-600 hidden sm:inline">•</span>
                  <span className="inline-flex items-center gap-1 text-emerald-400 text-[11px] font-mono">
                    <CheckCircle2 className="w-3 h-3" />
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-slate-400 font-mono">
                  <Clock className="w-3 h-3 text-slate-500" />
                  <span>{item.time}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-slate-900 text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-slate-400 text-[11px]">Cumulative Tally:</span>
                  <span className="font-bold text-emerald-300">{item.totalValue.toLocaleString()} tDUST</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-slate-500 text-[11px] truncate max-w-[130px]">
                    {item.txHash.slice(0, 10)}...
                  </span>
                  <a
                    href={`https://explorer.1am.xyz/contract/${contractAddress}?network=preprod`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-indigo-400 hover:text-indigo-300 transition-colors flex items-center gap-1 text-[11px]"
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