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
    // Strict wallet-gating: never allow execution if disconnected or loading
    if (!isConnected || isLoading) {
      return;
    }
    onCallCircuit(contractAddress);
  };

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm overflow-hidden">
      <div className="p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD400]/20 border border-[#FFD400] flex items-center justify-center text-black shadow-xs">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-display text-lg font-black text-black dark:text-white tracking-tight flex items-center gap-2">
                Execute Compact ZK Circuit
              </h2>
              <p className="text-xs text-zinc-500 font-mono">
                Target Circuit: <span className="font-bold text-black dark:text-[#FFD400]">incrementWithSecret()</span>
                <span className="mx-1.5">•</span>
                <span>Prover: BLS12-381 WASM</span>
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 rounded-full">
            <QuantumLockIcon className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            ZERO-KNOWLEDGE SOUNDNESS
          </span>
        </div>

        {/* Step 1: Operation Intent */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">
              Step 1: Choose Action Intent
            </label>
            <span className="text-[11px] font-mono text-zinc-400">Select circuit payload type</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setActiveMode('beneficiary')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                activeMode === 'beneficiary'
                  ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-xs'
                  : 'bg-zinc-50 dark:bg-zinc-950/70 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <div className="font-bold text-xs flex items-center gap-1.5 font-sans">
                <ShieldAlert className="w-3.5 h-3.5 text-[#FFD400]" />
                Beneficiary Aid Claim
              </div>
              <p className="text-[11px] mt-1 opacity-80 font-sans leading-snug">
                Prove eligibility criteria without exposing personal financial details.
              </p>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode('contribution')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                activeMode === 'contribution'
                  ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-xs'
                  : 'bg-zinc-50 dark:bg-zinc-950/70 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300 dark:hover:border-zinc-700'
              }`}
            >
              <div className="font-bold text-xs flex items-center gap-1.5 font-sans">
                <Layers className="w-3.5 h-3.5 text-emerald-500" />
                Confidential Donation
              </div>
              <p className="text-[11px] mt-1 opacity-80 font-sans leading-snug">
                Increment relief pool tally without revealing individual contribution.
              </p>
            </button>
          </div>
        </div>

        {/* Step 2: Contract Address Selector */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">
              Step 2: Target Contract ({activeNetwork.toUpperCase()})
            </label>
            <span className="text-[11px] font-mono text-zinc-500">32-Byte Hex Identifier</span>
          </div>

          <div className="relative flex items-center">
            <input
              type="text"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              disabled={isLoading}
              className="w-full bg-zinc-50 dark:bg-zinc-950/80 pl-3.5 pr-10 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 font-mono text-xs text-zinc-800 dark:text-zinc-200 focus:outline-none focus:border-black dark:focus:border-[#FFD400] transition-colors"
              placeholder="0f63bb305f89..."
            />
            <button
              type="button"
              onClick={handleCopyContract}
              title="Copy Contract Address"
              className="absolute right-2 p-1.5 text-zinc-500 hover:text-black dark:hover:text-white bg-white dark:bg-zinc-800 rounded-lg transition-colors border border-zinc-200 dark:border-zinc-700"
            >
              {copiedContract ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Step 3: Cryptographic Pipeline (Pedagogical Overview with Honest Illustrative Labels) */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">
            Step 3: Review Cryptographic Pipeline
          </label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
            {/* Step 3a: Private Witness */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase">1. Private Witness</span>
                  <WitnessEyeIcon className="w-3.5 h-3.5 text-purple-600" />
                </div>
                <h4 className="font-bold text-black dark:text-white font-sans text-xs">Off-Chain Input</h4>
                <div className="my-2.5 p-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-700 dark:text-zinc-300 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Witness:</span>
                    <span className="font-bold text-purple-700 dark:text-purple-300">secretIncrement()</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Constraint:</span>
                    <span className="font-bold text-emerald-600">assert(secret &gt; 0)</span>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-zinc-500 font-sans leading-tight">
                *Kept strictly in browser local memory. Never sent to network.
              </div>
            </div>

            {/* Step 3b: Compact Prover */}
            <div className="p-4 rounded-xl bg-[#FFD400]/10 dark:bg-[#FFD400]/5 border border-[#FFD400]/40 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-black dark:text-[#FFD400] uppercase">2. Compact Prover</span>
                  <span className="px-1.5 py-0.5 rounded bg-[#FFD400] text-black text-[9px] font-bold font-mono">
                    BLS12-381
                  </span>
                </div>
                <h4 className="font-bold text-black dark:text-white font-sans text-xs">ZK Proof Synthesis</h4>
                <div className="my-2.5 p-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-800 dark:text-zinc-200 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Engine:</span>
                    <span className="font-bold">Groth16 SNARK (Compact standard)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Proof Size:</span>
                    <span className="font-bold text-emerald-600">~128 Bytes (standard illustrative figure)</span>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-zinc-600 dark:text-zinc-400 font-sans leading-tight">
                *Synthesizes mathematical proof client-side via WebAssembly prover.
              </div>
            </div>

            {/* Step 3c: Public Settlement */}
            <div className="p-4 rounded-xl bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] font-bold text-zinc-500 uppercase">3. On-Chain Ledger</span>
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                </div>
                <h4 className="font-bold text-black dark:text-white font-sans text-xs">Public Settlement</h4>
                <div className="my-2.5 p-2 rounded bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] text-zinc-800 dark:text-zinc-200 space-y-1">
                  <div className="flex justify-between">
                    <span className="text-zinc-500">Disclosure:</span>
                    <span className="font-bold text-emerald-600">disclose(newTotal)</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-zinc-500">State:</span>
                    <span className="font-bold">round += 1</span>
                  </div>
                </div>
              </div>
              <div className="text-[10px] text-zinc-500 font-sans leading-tight">
                *Only verified public state delta committed to Midnight consensus.
              </div>
            </div>
          </div>
        </div>

        {/* Step 4: Wallet Gating & Execution Trigger */}
        <div className="space-y-3">
          <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">
            Step 4: Execute On-Chain State Transition
          </label>

          {/* Wallet Disconnected Warning */}
          {!isConnected && (
            <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5 text-amber-900 dark:text-amber-200">
                <Wallet className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                <span className="font-medium">
                  <strong>Wallet Required:</strong> You must connect your 1AM Wallet before executing ZK transactions.
                </span>
              </div>
              {onConnectWallet && (
                <button
                  type="button"
                  onClick={onConnectWallet}
                  className="px-3.5 py-1.5 rounded-lg bg-black text-[#FFD400] dark:bg-[#FFD400] dark:text-black font-mono font-bold text-xs hover:opacity-90 active:scale-95 transition-all self-start sm:self-auto"
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
              className={`w-full py-4 px-6 rounded-xl font-bold text-sm text-black transition-all border shadow-sm flex items-center justify-center gap-2.5 font-display ${
                !isConnected
                  ? 'bg-zinc-200 dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400 border-zinc-300 dark:border-zinc-700 cursor-not-allowed opacity-60'
                  : isLoading
                  ? 'bg-[#FFD400] opacity-80 cursor-wait border-black/15'
                  : 'bg-[#FFD400] hover:bg-[#E5BE00] active:scale-[0.99] border-black/15'
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
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950/80 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
            <div className="flex items-center justify-between text-xs font-mono font-bold">
              <span className="flex items-center gap-2 text-zinc-800 dark:text-zinc-200">
                <div className="w-3.5 h-3.5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                {isProving ? 'Executing Compact ZK circuit in browser WebAssembly...' : 'Broadcasting proof to Midnight consensus ledger...'}
              </span>
              <span className="text-black dark:text-[#FFD400]">
                {isProving ? 'PROVING [LOCAL]' : 'BROADCASTING [1AM]'}
              </span>
            </div>
            <div className="w-full bg-zinc-200 dark:bg-zinc-800 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full bg-[#FFD400] transition-all duration-700 ${
                  isProving ? 'w-1/2 animate-pulse' : 'w-11/12'
                }`}
              />
            </div>
          </div>
        )}

        {/* Error State Alert with Retry Affordance */}
        {error && (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-300 dark:border-rose-900 rounded-xl flex items-start justify-between gap-3 text-rose-800 dark:text-rose-200 text-sm">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600 mt-0.5" />
              <div className="space-y-1">
                <p className="font-bold text-rose-900 dark:text-rose-100">Execution Error</p>
                <p className="text-xs font-mono leading-relaxed">{error}</p>
              </div>
            </div>
            {isConnected && !isLoading && (
              <button
                type="button"
                onClick={() => onCallCircuit(contractAddress)}
                className="px-3 py-1 bg-rose-100 dark:bg-rose-900/60 hover:bg-rose-200 text-rose-900 dark:text-rose-100 text-xs font-mono font-bold rounded-lg transition-colors flex items-center gap-1"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Retry</span>
              </button>
            )}
          </div>
        )}

        {/* Step 5: Persistent Transaction Receipt Component (A1 Requirement) */}
        {success && txHash && !receiptDismissed && (
          <div className="space-y-2">
            <label className="text-xs font-mono uppercase tracking-wider text-emerald-700 dark:text-emerald-400 font-bold block">
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