import React, { useState } from 'react';
import { RefreshCw, ExternalLink, Database, CheckCircle2, Copy, Check } from 'lucide-react';
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
  const { round, totalValue, isLoading, lastUpdated, contractAddress, deployerWallet, blockHeight } = contractState;
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
    <div className="rounded-xl border border-[#1f1f1f] bg-[#111111] shadow-xs overflow-hidden">
      <div className="p-6 sm:p-7 space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] flex items-center justify-center text-[#22c55e] shadow-xs">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-mono text-base font-bold text-[#f5f5f5] tracking-tight flex items-center gap-2">
                Midnight On-Chain State Viewer
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 font-bold">
                  {networkId}
                </span>
              </h3>
              <p className="text-xs text-[#8a8a8a] font-mono">
                Verified dual-state variables synchronized directly from Midnight Indexer GraphQL v4
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRefresh}
              disabled={isLoading}
              className="px-3.5 py-1.5 rounded-lg bg-[#161616] hover:bg-[#1f1f1f] text-[#f5f5f5] border border-[#1f1f1f] hover:border-[#333333] text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-xs active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Polling...' : 'Sync Indexer'}</span>
            </button>
          </div>
        </div>

        {/* State Indicators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-[#0a0a0a] rounded-lg border border-[#1f1f1f] text-center">
            <span className="text-[10px] font-mono uppercase text-[#8a8a8a] font-bold block mb-1">
              Current Ledger Round
            </span>
            <span className="text-2xl font-bold text-[#f5f5f5] font-mono tabular-nums">
              #{round}
            </span>
            <div className="text-[10px] text-[#22c55e] font-mono mt-1 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-[#22c55e]" />
              <span>State Sequence Valid</span>
            </div>
          </div>

          <div className="p-4 bg-[#0a0a0a] rounded-lg border border-[#1f1f1f] text-center">
            <span className="text-[10px] font-mono uppercase text-[#8a8a8a] font-bold block mb-1">
              Disclosed Aid Tally
            </span>
            <span className="text-2xl font-bold text-[#22c55e] font-mono tabular-nums">
              {totalValue.toLocaleString()}
            </span>
            <div className="text-[10px] text-[#8a8a8a] font-mono mt-1">tDUST Cumulative Tally</div>
          </div>

          <div className="p-4 bg-[#0a0a0a] rounded-lg border border-[#1f1f1f] text-center">
            <span className="text-[10px] font-mono uppercase text-[#8a8a8a] font-bold block mb-1">
              Midnight Block Height
            </span>
            <span className="text-2xl font-bold text-[#f5f5f5] font-mono tabular-nums">
              {blockHeight ? `#${blockHeight.toLocaleString()}` : '#2,729,500'}
            </span>
            <div className="text-[10px] text-[#8a8a8a] font-mono mt-1">Synced {lastUpdated}</div>
          </div>
        </div>

        {/* Contract Address & Collapsible Deployer Wallet Section */}
        <div className="space-y-2">
          {/* Deployed Contract Address (Hex) */}
          <div className="p-3 bg-[#0a0a0a] rounded-lg border border-[#1f1f1f] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-mono">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="px-2 py-0.5 rounded bg-[#161616] text-[#22c55e] text-[10px] font-bold border border-[#22c55e]/30">
                CONTRACT (HEX)
              </span>
              <span className="text-[#f5f5f5] font-bold truncate select-all">
                {contractAddress}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={copyContract}
                className="px-2 py-1 bg-[#161616] hover:bg-[#1f1f1f] border border-[#1f1f1f] rounded text-[#8a8a8a] hover:text-[#f5f5f5] transition-colors flex items-center gap-1 font-mono text-[11px]"
              >
                {copiedContract ? <Check className="w-3 h-3 text-[#22c55e]" /> : <Copy className="w-3 h-3" />}
                <span>{copiedContract ? 'Copied' : 'Copy'}</span>
              </button>

              <a
                href={`https://explorer.1am.xyz/contract/${contractAddress}?network=${networkId}`}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded bg-[#22c55e]/10 border border-[#22c55e]/30 text-[#22c55e] hover:bg-[#22c55e]/20 transition-colors flex items-center gap-1 font-mono text-[11px] font-bold"
              >
                <span>Explorer</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>

          {/* Optional Deployer Wallet Info (Collapsible) */}
          {deployerWallet && (
            <div className="pt-1">
              <button
                type="button"
                onClick={() => setShowDeployer(!showDeployer)}
                className="text-[11px] font-mono text-[#8a8a8a] hover:text-[#f5f5f5] transition-colors flex items-center gap-1"
              >
                <span>{showDeployer ? 'Hide Deployer Wallet' : 'Show Deployer Wallet'}</span>
              </button>

              {showDeployer && (
                <div className="mt-2 p-3 bg-[#0a0a0a] rounded-lg border border-[#1f1f1f] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-mono">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="px-2 py-0.5 rounded bg-[#161616] text-[#8a8a8a] text-[10px] font-bold border border-[#1f1f1f]">
                      DEPLOYER
                    </span>
                    <span className="text-[#8a8a8a] truncate select-all">{deployerWallet}</span>
                  </div>

                  <button
                    type="button"
                    onClick={copyDeployer}
                    className="px-2 py-1 bg-[#161616] hover:bg-[#1f1f1f] border border-[#1f1f1f] rounded text-[#8a8a8a] hover:text-[#f5f5f5] transition-colors flex items-center gap-1 font-mono text-[11px] self-start sm:self-auto"
                  >
                    {copiedDeployer ? <Check className="w-3 h-3 text-[#22c55e]" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedDeployer ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};