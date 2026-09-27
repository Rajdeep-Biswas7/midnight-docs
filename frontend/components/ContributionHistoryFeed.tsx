import React from 'react';
import { Layers, CheckCircle2, ExternalLink, Clock } from 'lucide-react';
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
    <div className="rounded-xl border border-[#1f1f1f] bg-[#111111] shadow-xs overflow-hidden">
      <div className="p-6 sm:p-7 space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] flex items-center justify-center text-[#22c55e] shadow-xs">
              <Layers className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-mono text-base font-bold text-[#f5f5f5] tracking-tight flex items-center gap-2">
                On-Chain Contribution &amp; Transition Feed
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 font-bold">
                  Zero Identity Leak
                </span>
              </h3>
              <p className="text-xs text-[#8a8a8a] font-mono">
                Auditable state sequence on Midnight {networkId.toUpperCase()} without compromising participant confidentiality
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono text-[#8a8a8a] bg-[#161616] border border-[#1f1f1f] rounded-full">
            <QuantumLockIcon className="w-3.5 h-3.5 text-[#22c55e]" />
            <span>Unlinkable Preimages</span>
          </span>
        </div>

        {/* Feed List */}
        <div className="space-y-2.5">
          {history.map((item) => (
            <div
              key={item.id}
              className="p-4 bg-[#0a0a0a] hover:bg-[#141414] rounded-lg border border-[#1f1f1f] transition-all space-y-2.5"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
                <div className="flex items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded bg-[#161616] text-[#22c55e] font-mono font-bold text-[11px] border border-[#22c55e]/30">
                    Round #{item.round}
                  </span>
                  <span className="font-bold text-[#f5f5f5] font-mono">{item.type}</span>
                  <span className="text-[#8a8a8a] hidden sm:inline">•</span>
                  <span className="inline-flex items-center gap-1 text-[#22c55e] text-[11px] font-mono font-semibold">
                    <CheckCircle2 className="w-3 h-3 text-[#22c55e]" />
                    {item.status}
                  </span>
                </div>

                <div className="flex items-center gap-2 text-[11px] text-[#8a8a8a] font-mono">
                  <Clock className="w-3 h-3 text-[#8a8a8a]" />
                  <span>{item.time}</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 border-t border-[#1f1f1f] text-xs font-mono">
                <div className="flex items-center gap-3">
                  <span className="text-[#8a8a8a] text-[11px]">Cumulative Tally:</span>
                  <span className="font-bold text-[#22c55e]">{item.totalValue.toLocaleString()} tDUST</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[#8a8a8a] text-[11px] truncate max-w-[130px]">
                    {item.txHash.slice(0, 10)}...
                  </span>
                  <a
                    href={`https://explorer.1am.xyz/contract/${contractAddress}?network=${networkId}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-[#22c55e] hover:underline font-bold transition-colors flex items-center gap-1 text-[11px]"
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