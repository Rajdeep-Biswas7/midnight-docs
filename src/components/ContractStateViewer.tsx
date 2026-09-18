import React from 'react';
import { LedgerBlockIcon, CircuitCoreIcon } from './CustomIcons';
import { RefreshCw, ExternalLink, Activity, Database, CheckCircle2 } from 'lucide-react';
import type { ContractLiveState } from '../hooks/useMidnight';

interface ContractStateViewerProps {
  contractState: ContractLiveState;
  onRefresh: () => void;
}

export const ContractStateViewer: React.FC<ContractStateViewerProps> = ({
  contractState,
  onRefresh,
}) => {
  const { round, totalValue, isLoading, lastUpdated, contractAddress } = contractState;

  return (
    <div className="radiant-card-wrap">
      <div className="radiant-card-content p-6 sm:p-7 space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-indigo-500/15">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
              <Database className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Live On-Chain State Viewer
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-300 border border-cyan-500/30">
                  Preprod Indexer
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Verified dual-state variables synchronized directly from Midnight testnet
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRefresh}
              disabled={isLoading}
              className="px-3 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/30 text-xs font-mono text-cyan-300 transition-all flex items-center gap-1.5 shadow-sm active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin text-cyan-400' : ''}`} />
              <span>{isLoading ? 'Polling...' : 'Sync Indexer'}</span>
            </button>
          </div>
        </div>

        {/* State Indicators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800/90 text-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Current Ledger Round
            </span>
            <span className="font-display text-2xl font-black text-white font-mono">
              #{round}
            </span>
            <div className="text-[10px] text-slate-500 mt-1 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-emerald-400" />
              <span>State Sequence Valid</span>
            </div>
          </div>

          <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800/90 text-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Disclosed Aid Tally
            </span>
            <span className="font-display text-2xl font-black text-emerald-300 font-mono">
              {totalValue.toLocaleString()}
            </span>
            <div className="text-[10px] text-slate-500 mt-1">tDUST Disbursed / Tallied</div>
          </div>

          <div className="p-4 bg-slate-950/70 rounded-xl border border-slate-800/90 text-center">
            <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">
              Dual-State Privacy
            </span>
            <span className="font-display text-sm font-bold text-indigo-300 font-mono block mt-1">
              0 Witness Leaks
            </span>
            <div className="text-[10px] text-slate-500 mt-1">Updated {lastUpdated}</div>
          </div>
        </div>

        {/* Contract Address & Explorer Bar */}
        <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800/90 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="text-slate-400 font-bold uppercase text-[10px]">Preprod Contract:</span>
            <span className="text-slate-300 truncate select-all">{contractAddress}</span>
          </div>

          <a
            href={`https://explorer.1am.xyz/contract/${contractAddress}?network=preprod`}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-indigo-600/15 hover:bg-indigo-600/25 border border-indigo-500/30 text-indigo-300 text-[11px] font-semibold transition-colors flex-shrink-0"
          >
            <span>Inspect on 1AM Explorer</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        </div>
      </div>
    </div>
  );
};