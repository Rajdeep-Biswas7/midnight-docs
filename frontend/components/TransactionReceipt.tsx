import React, { useState } from 'react';
import { CheckCircle2, Copy, Check, ExternalLink, Hash, ArrowUpRight } from 'lucide-react';
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

  const truncatedHash = `${txHash.slice(0, 14)}...${txHash.slice(-10)}`;

  return (
    <div
      role="region"
      aria-label="Transaction Receipt"
      className="p-5 sm:p-6 bg-[#0e1711] border border-[#22c55e]/40 rounded-xl space-y-4 shadow-xs transition-all"
    >
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#1f1f1f]">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-lg bg-[#111111] border border-[#22c55e]/40 flex items-center justify-center text-[#22c55e]">
            <CheckCircle2 className="w-4 h-4 text-[#22c55e]" />
          </div>
          <div>
            <h3 className="font-mono text-sm sm:text-base font-bold text-[#f5f5f5] flex items-center gap-2">
              Transaction Confirmed
            </h3>
            <p className="text-[11px] font-mono text-[#8a8a8a]">
              Verified &amp; settled on {networkName}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-center">
          <span className="text-[11px] font-mono font-bold text-[#22c55e] bg-[#22c55e]/10 border border-[#22c55e]/30 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#22c55e] animate-pulse" />
            ON-CHAIN CONFIRMED
          </span>
          {onDismiss && (
            <button
              type="button"
              onClick={onDismiss}
              className="text-[11px] font-mono text-[#8a8a8a] hover:text-[#f5f5f5] px-2 py-0.5 rounded hover:bg-[#161616] transition-colors"
            >
              Dismiss
            </button>
          )}
        </div>
      </div>

      {/* Main Details Grid */}
      <div className="bg-[#111111] rounded-lg border border-[#1f1f1f] p-4 space-y-3 font-mono text-xs">
        {/* Transaction Hash */}
        <div className="space-y-1">
          <div className="flex items-center justify-between text-[#8a8a8a] text-[10px] uppercase font-bold tracking-wider">
            <span className="flex items-center gap-1">
              <Hash className="w-3 h-3 text-[#22c55e]" />
              Transaction Hash
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 text-[11px] text-[#8a8a8a] hover:text-[#f5f5f5] bg-[#161616] px-2 py-0.5 rounded border border-[#1f1f1f] transition-colors"
                title="Copy full transaction hash"
              >
                {copied ? <Check className="w-3 h-3 text-[#22c55e]" /> : <Copy className="w-3 h-3" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>
          <div
            className="p-2.5 rounded bg-[#0a0a0a] border border-[#1f1f1f] font-mono text-xs text-[#22c55e] break-all select-all font-bold"
            title={txHash}
          >
            <span className="sm:hidden">{truncatedHash}</span>
            <span className="hidden sm:inline">{txHash}</span>
          </div>
        </div>

        {/* Metadata Row: Block Height, Network, Status */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 pt-1 text-[11px]">
          <div className="p-2.5 rounded bg-[#0a0a0a] border border-[#1f1f1f]">
            <span className="text-[10px] text-[#8a8a8a] block uppercase font-bold">Consensus Block</span>
            <span className="font-bold text-[#f5f5f5]">
              {blockHeight ? `#${blockHeight.toLocaleString()}` : 'Included in block'}
            </span>
          </div>

          <div className="p-2.5 rounded bg-[#0a0a0a] border border-[#1f1f1f]">
            <span className="text-[10px] text-[#8a8a8a] block uppercase font-bold">Target Network</span>
            <span className="font-bold text-[#f5f5f5] uppercase">{network}</span>
          </div>

          <div className="col-span-2 sm:col-span-1 p-2.5 rounded bg-[#0a0a0a] border border-[#1f1f1f]">
            <span className="text-[10px] text-[#8a8a8a] block uppercase font-bold">Execution Time</span>
            <span className="font-bold text-[#f5f5f5]">{timestamp}</span>
          </div>
        </div>

        {/* State Transition Delta if round / total provided */}
        {(round !== undefined && round !== null || totalValue !== undefined && totalValue !== null) && (
          <div className="grid grid-cols-2 gap-2.5 pt-1">
            {round !== undefined && round !== null && (
              <div className="p-2.5 rounded bg-[#0a0a0a] border border-[#1f1f1f] text-center">
                <span className="text-[10px] text-[#8a8a8a] block uppercase font-bold">Disclosed Round</span>
                <span className="text-sm font-bold text-[#f5f5f5] font-mono">#{round}</span>
              </div>
            )}
            {totalValue !== undefined && totalValue !== null && (
              <div className="p-2.5 rounded bg-[#0a0a0a] border border-[#1f1f1f] text-center">
                <span className="text-[10px] text-[#8a8a8a] block uppercase font-bold">Disclosed Aid Total</span>
                <span className="text-sm font-bold text-[#22c55e] font-mono">
                  {totalValue.toLocaleString()} tDUST
                </span>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Explorer Action Footer */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-1">
        <a
          href={explorerTxUrl}
          target="_blank"
          rel="noreferrer"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg bg-[#22c55e] text-black font-mono font-bold text-xs hover:bg-[#16a34a] transition-colors border border-[#22c55e]/50"
        >
          <span>View On 1AM Explorer</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>

        <div className="text-[11px] font-mono text-[#8a8a8a] flex items-center gap-1">
          <span>Indexer sync confirmed</span>
          <ExternalLink className="w-3 h-3" />
        </div>
      </div>
    </div>
  );
};
export default TransactionReceipt;
