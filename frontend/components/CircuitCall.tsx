import React, { useState } from 'react';
import { QuantumLockIcon, WitnessEyeIcon } from './CustomIcons';
import { Cpu, Send, AlertCircle, Copy, Check, Sparkles, ArrowRight, ShieldAlert, Layers, ShieldCheck, RefreshCw, Wallet } from 'lucide-react';
import { type CircuitCallState, NETWORK_DETAILS, type NetworkType } from '../hooks/useMidnight';
import { TransactionReceipt } from './TransactionReceipt';

interface CircuitCallProps {
  isConnected: boolean;
  circuitState: CircuitCallState;
  activeNetwork: NetworkType;
  blockHeight?: number | null;
  onCallCircuit: (contractAddress?: string) => void;
  onConnectWallet?: () => void;
}

export const CircuitCall: React.FC<CircuitCallProps> = ({
  isConnected,
  circuitState,
  activeNetwork,
  blockHeight,
  onCallCircuit,
  onConnectWallet,
}) => {
  const currentNetworkConfig = NETWORK_DETAILS[activeNetwork];
  const [contractAddress, setContractAddress] = useState(currentNetworkConfig.contractAddress);
  const [activeMode, setActiveMode] = useState<'beneficiary' | 'contribution'>('beneficiary');
  const [copiedContract, setCopiedContract] = useState(false);
  const [receiptDismissed, setReceiptDismissed] = useState(false);

  // Sync contractAddress if activeNetwork changes
  React.useEffect(() => {
    setContractAddress(NETWORK_DETAILS[activeNetwork].contractAddress);
  }, [activeNetwork]);

  // Reset receipt dismiss state when a new transaction is made
  React.useEffect(() => {
    if (circuitState.txHash) {
      setReceiptDismissed(false);
    }
  }, [circuitState.txHash]);

  const {
    isProving,
    isSubmitting,
    txHash,
    error,
    success,
    disclosedRound,
    disclosedTotal,
  } = circuitState;

  const isLoading = isProving || isSubmitting;

  const handleCopyContract = () => {
    if (contractAddress) {
      navigator.clipboard.writeText(contractAddress);
      setCopiedContract(true);
      setTimeout(() => setCopiedContract(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isConnected || isLoading) {
      return;
    }
    onCallCircuit(contractAddress);
  };

  return (
    <div className="rounded-xl border border-[#1f1f1f] bg-[#111111] shadow-xs overflow-hidden">
      <div className="p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] flex items-center justify-center text-[#22c55e] shadow-xs">
              <Cpu className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-mono text-base font-bold text-[#f5f5f5] tracking-tight flex items-center gap-2">
                Execute Compact ZK Circuit
              </h2>
              <p className="text-xs text-[#8a8a8a] font-mono">
                Target Circuit: <span className="font-bold text-[#22c55e]">incrementWithSecret()</span>
                <span className="mx-1.5">•</span>
                <span>Prover: BLS12-381 WASM</span>
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 rounded-full">
            <QuantumLockIcon className="w-3.5 h-3.5 text-[#22c55e]" />
            ZERO-KNOWLEDGE SOUNDNESS
          </span>
        </div>

        {/* Step 1: Operation Intent */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-[#8a8a8a] font-bold block">
              Step 1: Choose Action Intent
            </label>
            <span className="text-[11px] font-mono text-[#8a8a8a]">Select circuit payload type</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setActiveMode('beneficiary')}
              className={`p-3.5 rounded-lg border text-left transition-all ${
                activeMode === 'beneficiary'
                  ? 'bg-[#161616] text-[#f5f5f5] border-[#22c55e] shadow-xs'
                  : 'bg-[#0a0a0a] border-[#1f1f1f] text-[#8a8a8a] hover:border-[#333333] hover:text-[#f5f5f5]'
              }`}
            >
              <div className="font-bold text-xs flex items-center gap-1.5 font-mono text-[#f5f5f5]">
                <ShieldAlert className="w-3.5 h-3.5 text-[#22c55e]" />
                Beneficiary Aid Claim
              </div>
              <p className="text-[11px] mt-1 opacity-80 font-sans leading-snug text-[#8a8a8a]">
                Prove eligibility criteria without exposing personal financial details.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode('contribution')}
              className={`p-3.5 rounded-lg border text-left transition-all ${
                activeMode === 'contribution'
                  ? 'bg-[#161616] text-[#f5f5f5] border-[#22c55e] shadow-xs'
                  : 'bg-[#0a0a0a] border-[#1f1f1f] text-[#8a8a8a] hover:border-[#333333] hover:text-[#f5f5f5]'
              }`}
            >
              <div className="font-bold text-xs flex items-center gap-1.5 font-mono text-[#f5f5f5]">
                <Layers className="w-3.5 h-3.5 text-[#22c55e]" />
                Confidential Donation
              </div>
              <p className="text-[11px] mt-1 opacity-80 font-sans leading-snug text-[#8a8a8a]">
                Increment relief pool tally without revealing individual contribution.
              </p>
            </button>
          </div>
        </div>

        {/* Step 2: Contract Address Selector */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-[#8a8a8a] font-bold block">
              Step 2: Target Contract ({activeNetwork.toUpperCase()})
            </label>
            <span className="text-[11px] font-mono text-[#8a8a8a]">32-Byte Hex Identifier</span>
          </div>

          <div className="relative flex items-center">
            <input
              type="text"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              disabled={isLoading}
              className="w-full bg-[#0a0a0a] pl-3.5 pr-10 py-2.5 rounded-lg border border-[#1f1f1f] font-mono text-xs text-[#f5f5f5] focus:outline-none focus:border-[#22c55e] transition-colors"
              placeholder="0f63bb305f89..."
            />
            <button
              type="button"
              onClick={handleCopyContract}
              title="Copy Contract Address"
              className="absolute right-2 p-1.5 text-[#8a8a8a] hover:text-[#f5f5f5] bg-[#161616] rounded transition-colors border border-[#1f1f1f]"
            >
              {copiedContract ? <Check className="w-3.5 h-3.5 text-[#22c55e]" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Step 3: Cryptographic Pipeline */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-[#8a8a8a] font-bold block">
            Step 3: Review Cryptographic Pipeline
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            {/* Step 3a: Private Witness */}
            <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-[#8a8a8a] uppercase">1. Private Witness</span>
                  <WitnessEyeIcon className="w-3.5 h-3.5 text-[#22c55e]" />
                </div>
                <h4 className="font-bold text-[#f5f5f5] font-mono text-xs">Off-Chain Input</h4>
                <div className="my-2.5 p-2 rounded bg-[#111111] border border-[#1f1f1f] text-[11px] text-[#8a8a8a] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#8a8a8a]">Witness:</span>
                    <span className="font-bold text-[#f5f5f5]">secretIncrement()</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8a8a8a]">Constraint:</span>
                    <span className="font-bold text-[#22c55e]">assert(secret &gt; 0)</span>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-[#8a8a8a] font-sans leading-tight">
                *Kept strictly in browser local memory. Never sent to network.
              </div>
            </div>

            {/* Step 3b: Compact Prover */}
            <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-[#22c55e] uppercase">2. Compact Prover</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 text-[9px] font-bold font-mono">
                    BLS12-381
                  </span>
                </div>
                <h4 className="font-bold text-[#f5f5f5] font-mono text-xs">ZK Proof Synthesis</h4>
                <div className="my-2.5 p-2 rounded bg-[#111111] border border-[#1f1f1f] text-[11px] text-[#8a8a8a] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#8a8a8a]">Engine:</span>
                    <span className="font-bold text-[#f5f5f5]">Groth16 SNARK</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8a8a8a]">Proof Size:</span>
                    <span className="font-bold text-[#22c55e]">~128 Bytes (standard)</span>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-[#8a8a8a] font-sans leading-tight">
                *Synthesizes mathematical proof client-side via WebAssembly prover.
              </div>
            </div>

            {/* Step 3c: Public Settlement */}
            <div className="p-4 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-[#8a8a8a] uppercase">3. On-Chain Ledger</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
                </div>
                <h4 className="font-bold text-[#f5f5f5] font-mono text-xs">Public Settlement</h4>
                <div className="my-2.5 p-2 rounded bg-[#111111] border border-[#1f1f1f] text-[11px] text-[#8a8a8a] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[#8a8a8a]">Disclosure:</span>
                    <span className="font-bold text-[#22c55e]">disclose(newTotal)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[#8a8a8a]">State:</span>
                    <span className="font-bold text-[#f5f5f5]">round += 1</span>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-[#8a8a8a] font-sans leading-tight">
                *Only verified public state delta committed to Midnight consensus.
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Wallet Gating & Execution Trigger */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-[#8a8a8a] font-bold block">
            Step 4: Execute On-Chain State Transition
          </label>

          {/* Wallet Disconnected Warning */}
          {!isConnected && (
            <div className="p-4 rounded-lg bg-[#18140c] border border-[#f59e0b]/30 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-[#fde68a]">
                <Wallet className="w-4 h-4 text-[#f59e0b] flex-shrink-0" />
                <span className="font-medium font-sans">
                  <strong className="font-mono text-[#fde68a]">Wallet Required:</strong> You must connect your 1AM Wallet before executing ZK transactions.
                </span>
              </div>
              {onConnectWallet && (
                <button
                  type="button"
                  onClick={onConnectWallet}
                  className="px-3.5 py-1.5 rounded bg-[#f59e0b] text-black font-mono font-bold text-xs hover:bg-[#d97706] active:scale-95 transition-all self-start sm:self-auto"
                >
                  Connect 1AM Now
                </button>
              )}
            </div>
          )}

          {/* Action Button */}
          <form onSubmit={handleSubmit}>
            <button
              type="submit"
              disabled={!isConnected || isLoading}
              className={`w-full py-4 px-6 rounded-lg font-bold text-sm text-black transition-all border shadow-xs flex items-center justify-center gap-2.5 font-mono ${
                !isConnected
                  ? 'bg-[#161616] text-[#8a8a8a] border-[#1f1f1f] cursor-not-allowed opacity-60'
                  : isLoading
                  ? 'bg-[#22c55e]/70 opacity-90 cursor-wait border-[#22c55e]/50'
                  : 'bg-[#22c55e] hover:bg-[#16a34a] active:scale-[0.99] border-[#22c55e]/60'
              }`}
            >
              {isProving ? (
                <>
                  <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                  <span>Synthesizing Client-Side ZK-SNARK Proof (WASM)...</span>
                </>
              ) : isSubmitting ? (
                <>
                  <Send className="w-4 h-4 animate-bounce" />
                  <span>Broadcasting Sealed State Transition via 1AM...</span>
                </>
              ) : !isConnected ? (
                <>
                  <Wallet className="w-4 h-4" />
                  <span>Connect Wallet to Execute Circuit</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 text-black" />
                  <span>
                    {activeMode === 'beneficiary'
                      ? 'Prove Eligibility & Execute Aid Claim'
                      : 'Synthesize Proof & Commit Confidential Increment'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>
        </div>

        {/* Loading / Proving Progress HUD */}
        {isLoading && (
          <div className="p-4 bg-[#0a0a0a] rounded-lg border border-[#1f1f1f] space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="flex items-center gap-2 text-[#f5f5f5]">
                <div className="w-3.5 h-3.5 border-2 border-[#22c55e]/30 border-t-[#22c55e] rounded-full animate-spin" />
                {isProving ? 'Executing Compact ZK circuit in browser WebAssembly...' : 'Broadcasting proof to Midnight consensus ledger...'}
              </span>
              <span className="text-[#22c55e]">
                {isProving ? 'PROVING [LOCAL]' : 'BROADCASTING [1AM]'}
              </span>
            </div>
            <div className="w-full bg-[#161616] h-1.5 rounded-full overflow-hidden">
              <div
                className={`h-full bg-[#22c55e] transition-all duration-700 ${
                  isProving ? 'w-1/2 animate-pulse' : 'w-11/12'
                }`}
              />
            </div>
          </div>
        )}

        {/* Error State Alert with Retry Affordance */}
        {error && (
          <div className="p-4 bg-[#180d0e] border border-[#ef4444]/40 rounded-lg flex items-start justify-between gap-3 text-[#fca5a5] text-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-[#ef4444] mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-[#fca5a5] font-mono text-xs uppercase tracking-wider">Execution Error</p>
                <p className="text-xs font-mono leading-relaxed">{error}</p>
              </div>
            </div>
            {isConnected && !isLoading && (
              <button
                type="button"
                onClick={() => onCallCircuit(contractAddress)}
                className="px-3 py-1 bg-[#ef4444]/20 hover:bg-[#ef4444]/30 text-[#fca5a5] border border-[#ef4444]/40 text-xs font-mono font-bold rounded transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Retry</span>
              </button>
            )}
          </div>
        )}

        {/* Step 5: Persistent Transaction Receipt Component */}
        {success && txHash && !receiptDismissed && (
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-[#22c55e] font-bold block">
              Step 5: Verified Transaction Receipt
            </label>
            <TransactionReceipt
              txHash={txHash}
              network={activeNetwork}
              blockHeight={blockHeight}
              round={disclosedRound}
              totalValue={disclosedTotal}
              onDismiss={() => setReceiptDismissed(true)}
            />
          </div>
        )}
      </div>
    </div>
  );
};