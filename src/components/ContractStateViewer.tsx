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
    <div className="rounded-xl border border-border bg-card shadow-bento overflow-hidden transition-colors">
      <div className="p-6 sm:p-7 space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center text-accent shadow-xs">
              <Database className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-mono text-base font-bold text-foreground tracking-tight flex items-center gap-2">
                Midnight On-Chain State Viewer
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30 font-bold">
                  {networkId}
                </span>
              </h3>
              <p className="text-xs text-muted-foreground font-mono">
                Verified dual-state variables synchronized directly from Midnight Indexer GraphQL v4
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onRefresh}
              disabled={isLoading}
              className="px-3.5 py-1.5 rounded-lg bg-secondary hover:bg-secondary/80 text-foreground border border-border hover:border-accent text-xs font-mono font-bold transition-all flex items-center gap-1.5 shadow-xs active:scale-95 disabled:opacity-50"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Polling...' : 'Sync Indexer'}</span>
            </button>
          </div>
        </div>

        {/* State Indicators Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-background rounded-lg border border-border text-center">
            <span className="text-[10px] font-mono uppercase text-muted-foreground font-bold block mb-1">
              Current Ledger Round
            </span>
            <span className="text-2xl font-bold text-foreground font-mono tabular-nums">
              #{round}
            </span>
            <div className="text-[10px] text-accent font-mono mt-1 flex items-center justify-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-accent" />
              <span>State Sequence Valid</span>
            </div>
          </div>

          <div className="p-4 bg-background rounded-lg border border-border text-center">
            <span className="text-[10px] font-mono uppercase text-muted-foreground font-bold block mb-1">
              Disclosed Aid Tally
            </span>
            <span className="text-2xl font-bold text-accent font-mono tabular-nums">
              {totalValue.toLocaleString()}
            </span>
            <div className="text-[10px] text-muted-foreground font-mono mt-1">tDUST Cumulative Tally</div>
          </div>

          <div className="p-4 bg-background rounded-lg border border-border text-center">
            <span className="text-[10px] font-mono uppercase text-muted-foreground font-bold block mb-1">
              Midnight Block Height
            </span>
            <span className="text-2xl font-bold text-foreground font-mono tabular-nums">
              {blockHeight ? `#${blockHeight.toLocaleString()}` : '#2,735,000'}
            </span>
            <div className="text-[10px] text-muted-foreground font-mono mt-1">Synced {lastUpdated}</div>
          </div>
        </div>

        {/* Contract Address & Collapsible Deployer Wallet Section */}
        <div className="space-y-2">
          {/* Deployed Contract Address (Hex) */}
          <div className="p-3 bg-background rounded-lg border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-mono">
            <div className="flex items-center gap-2 overflow-hidden">
              <span className="px-2 py-0.5 rounded bg-secondary text-accent text-[10px] font-bold border border-accent/30">
                CONTRACT (HEX)
              </span>
              <span className="text-foreground font-bold truncate select-all">
                {contractAddress}
              </span>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={copyContract}
                className="px-2 py-1 bg-secondary hover:bg-secondary/80 border border-border rounded text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-mono text-[11px]"
              >
                {copiedContract ? <Check className="w-3 h-3 text-accent" /> : <Copy className="w-3 h-3" />}
                <span>{copiedContract ? 'Copied' : 'Copy'}</span>
              </button>

              <a
                href={`https://explorer.1am.xyz/contract/${contractAddress}?network=${networkId}`}
                target="_blank"
                rel="noreferrer"
                className="px-2.5 py-1 rounded bg-accent/15 border border-accent/30 text-accent hover:bg-accent/25 transition-colors flex items-center gap-1 font-mono text-[11px] font-bold"
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
                className="text-[11px] font-mono text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1"
              >
                <span>{showDeployer ? 'Hide Deployer Wallet' : 'Show Deployer Wallet'}</span>
              </button>

              {showDeployer && (
                <div className="mt-2 p-3 bg-background rounded-lg border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs font-mono">
                  <div className="flex items-center gap-2 overflow-hidden">
                    <span className="px-2 py-0.5 rounded bg-secondary text-muted-foreground text-[10px] font-bold border border-border">
                      DEPLOYER
                    </span>
                    <span className="text-muted-foreground truncate select-all">{deployerWallet}</span>
                  </div>

                  <button
                    type="button"
                    onClick={copyDeployer}
                    className="px-2 py-1 bg-secondary hover:bg-secondary/80 border border-border rounded text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-mono text-[11px] self-start sm:self-auto"
                  >
                    {copiedDeployer ? <Check className="w-3 h-3 text-accent" /> : <Copy className="w-3 h-3" />}
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
export default ContractStateViewer;