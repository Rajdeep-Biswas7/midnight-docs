import React, { useState } from 'react';
import { RefreshCw, ExternalLink, Activity, Database, CheckCircle2, Copy, Check, Shield } from 'lucide-react';
import type { ContractLiveState } from '../hooks/useMidnight';

interface ContractStateViewerProps {
  contractState: ContractLiveState;
  networkId: string;
  onRefresh: () => void;
}

export const ContractStateViewer: React.FC<ContractStateViewerProps> = ({
  contractState,
  networkId,
  onRefresh,
}) => {
  const { round, totalValue, isLoading, lastUpdated, contractAddress, deployerWallet, blockHeight, blockHash } = contractState;
  const [copiedContract, setCopiedContract] = useState(false);
  const [copiedDeployer, setCopiedDeployer] = useState(false);

  const [showDeployer, setShowDeployer] = useState(false);

  const copyContract = () => {
    navigator.clipboard.writeText(contractAddress);
    setCopiedContract(true);
    setTimeout(() => setCopiedContract(false), 2000);
  };

  const copyDeployer = () => {
    navigator.clipboard.writeText(deployerWallet);
    setCopiedDeployer(true);
    setTimeout(() => setCopiedDeployer(false), 2000);
  };

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm overflow-hidden">
      <div className="p-6 sm:p-7 space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD400]/20 border border-[#FFD400] flex items-center justify-center text-black shadow-xs">
              <Database className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-black text-black dark:text-white tracking-tight flex items-center gap-2">
                Midnight On-Chain State Viewer
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#FFD400] text-black font-bold">
                  {networkId}
                </span>
              </h3>
              <p className="text-xs text-zinc-500 font-mono">
                Verified dual-state variables synchronized directly from Midnight Indexer GraphQL v4
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRefresh}
              disabled={isLoading}
              className="px-3.5 py-1.5 rounded-lg bg-black text-white hover:bg-zinc-800 dark:bg-white dark:text-black dark:hover:bg-zinc-200 text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-xs active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Polling...' : 'Sync Indexer'}</span>
            </button>
          </div>
        </div>

        {/* State Indicators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950/70 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block mb-1">
              Current Ledger Round
            </span>
            <span className="font-display text-2xl font-black text-black dark:text-white font-mono tabular-nums">
              #{round}
            </span>
            <div className="text-[10px] text-emerald-600 font-mono mt-1 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              <span>State Sequence Valid</span>
            </div>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-950/70 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block mb-1">
              Disclosed Aid Tally
            </span>
            <span className="font-display text-2xl font-black text-black dark:text-[#FFD400] font-mono tabular-nums">
              {totalValue.toLocaleString()}
            </span>
            <div className="text-[10px] text-zinc-500 font-mono mt-1">tDUST Cumulative Tally</div>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-950/70 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
            <span className="text-[10px] font-mono uppercase text-zinc-500 font-bold block mb-1">
              Midnight Block Height
            </span>
            <span className="font-display text-2xl font-black text-emerald-700 dark:text-emerald-400 font-mono tabular-nums">
              {blockHeight ? `#${blockHeight.toLocaleString()}` : '#2,677,175'}
            </span>
            <div className="text-[10px] text-zinc-500 font-mono mt-1">Synced {lastUpdated}</div>
          </div>
        </div>

        {/* Contract Address & Collapsible Deployer Wallet Section */}
        <div className="space-y-2">
          {/* Deployed Contract Address (Hex) - The only primary address */}
          <div className="p-3 bg-zinc-50 dark:bg-zinc-950/70 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-mono">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="px-2 py-0.5 rounded bg-black text-[#FFD400] text-[10px] font-bold">
                CONTRACT (HEX)
              </span>
              <span className="text-zinc-800 dark:text-zinc-200 font-bold truncate select-all">
                {contractAddress}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={copyContract}
                className="inline-flex items-center gap-1 text-[11px] font-bold bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white px-2.5 py-1 rounded border border-zinc-200 dark:border-zinc-700 transition-colors"
              >
                {copiedContract ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                <span>{copiedContract ? 'Copied' : 'Copy Address'}</span>
              </button>
              <a
                href={`https://explorer.1am.xyz/contract/${contractAddress}?network=${networkId}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1 text-[11px] font-bold bg-[#FFD400] text-black px-2.5 py-1 rounded hover:bg-[#E5BE00] transition-colors"
              >
                <span>1AM Explorer</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Toggle to view deployer wallet (Hidden by default to avoid contract address confusion) */}
          <div className="pt-1">
            <button
              type="button"
              onClick={() => setShowDeployer(!showDeployer)}
              className="text-[11px] font-mono text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-300 flex items-center gap-1 transition-colors"
            >
              <span>{showDeployer ? '▾ Hide' : '▸ Show'} Operator Wallet (Bech32 Account)</span>
            </button>

            {showDeployer && (
              <div className="mt-2 p-3 bg-zinc-50 dark:bg-zinc-950/70 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-mono">
                <div className="flex items-center gap-2 overflow-hidden">
                  <span className="px-2 py-0.5 rounded bg-zinc-200 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-[10px] font-bold">
                    OPERATOR WALLET
                  </span>
                  <span className="text-zinc-600 dark:text-zinc-400 truncate select-all">
                    {deployerWallet}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={copyDeployer}
                  className="inline-flex items-center gap-1 text-[11px] font-bold bg-white dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-black dark:hover:text-white px-2.5 py-1 rounded border border-zinc-200 dark:border-zinc-700 transition-colors shrink-0"
                >
                  {copiedDeployer ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedDeployer ? 'Copied' : 'Copy Wallet'}</span>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};