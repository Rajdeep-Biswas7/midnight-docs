import React, { useState } from 'react';
import { QuantumLockIcon, CircuitCoreIcon, WitnessEyeIcon } from './CustomIcons';
import { Cpu, Send, CheckCircle2, AlertCircle, Copy, Check, Sparkles, ArrowRight, Hash, ExternalLink, ShieldAlert, Layers, ShieldCheck } from 'lucide-react';
import { type CircuitCallState, NETWORK_DETAILS, type NetworkType } from '../hooks/useMidnight';

interface CircuitCallProps {
  isConnected: boolean;
  circuitState: CircuitCallState;
  activeNetwork: NetworkType;
  onCallCircuit: (contractAddress?: string) => void;
}

export const CircuitCall: React.FC<CircuitCallProps> = ({
  isConnected,
  circuitState,
  activeNetwork,
  onCallCircuit,
}) => {
  const currentNetworkConfig = NETWORK_DETAILS[activeNetwork];
  const [contractAddress, setContractAddress] = useState(currentNetworkConfig.contractAddress);
  const [activeMode, setActiveMode] = useState<'beneficiary' | 'contribution'>('beneficiary');
  const [copiedContract, setCopiedContract] = useState(false);
  const [copiedTx, setCopiedTx] = useState(false);

  // Sync contractAddress if activeNetwork changes
  React.useEffect(() => {
    setContractAddress(NETWORK_DETAILS[activeNetwork].contractAddress);
  }, [activeNetwork]);

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

  const handleCopyTx = () => {
    if (txHash) {
      navigator.clipboard.writeText(txHash);
      setCopiedTx(true);
      setTimeout(() => setCopiedTx(false), 2000);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading && isConnected) {
      onCallCircuit(contractAddress);
    }
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
                Circuit Target: <span className="font-bold text-black dark:text-[#FFD400]">incrementWithSecret()</span>
                <span className="mx-1.5">•</span>
                <span>Prover: BLS12-381 WASM</span>
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-bold bg-emerald-50 text-emerald-800 border border-emerald-300 rounded-full">
            <QuantumLockIcon className="w-3.5 h-3.5 text-emerald-600" />
            ZERO-KNOWLEDGE SOUNDNESS
          </span>
        </div>

        {/* 3-Step Cryptographic Execution Pipeline Card (Cyphra Style) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 font-mono text-xs">
          {/* Step 1: Private Witness */}
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

          {/* Step 2: Compact Prover */}
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
                  <span className="font-bold">Groth16 SNARK</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Proof Size:</span>
                  <span className="font-bold text-emerald-600">~128 Bytes</span>
                </div>
              </div>
            </div>
            <div className="text-[10px] text-zinc-600 dark:text-zinc-400 font-sans leading-tight">
              *Synthesizes mathematical proof of correctness client-side.
            </div>
          </div>

          {/* Step 3: Public Settlement */}
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
              *Only verified public state committed to Midnight consensus.
            </div>
          </div>
        </div>

        {/* Action Mode Toggle */}
        <div className="space-y-2">
          <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">
            Operation Intent
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setActiveMode('beneficiary')}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                activeMode === 'beneficiary'
                  ? 'bg-black text-white dark:bg-white dark:text-black border-black dark:border-white shadow-xs'
                  : 'bg-zinc-50 dark:bg-zinc-950/70 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300'
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
                  : 'bg-zinc-50 dark:bg-zinc-950/70 border-zinc-200 dark:border-zinc-800 text-zinc-700 dark:text-zinc-300 hover:border-zinc-300'
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

        {/* Contract Address Selector */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold block">
              Contract Address ({activeNetwork.toUpperCase()})
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
              placeholder="02c01991a0..."
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

        {/* Action Button */}
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            disabled={!isConnected || isLoading}
            className="w-full py-4 px-6 rounded-xl font-bold text-sm text-black bg-[#FFD400] hover:bg-[#E5BE00] active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed transition-all border border-black/15 shadow-sm flex items-center justify-center gap-2.5 font-display"
          >
            {isProving ? (
              <>
                <div className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                <span>Synthesizing Client-Side ZK-SNARK Proof...</span>
              </>
            ) : isSubmitting ? (
              <>
                <Send className="w-4 h-4 animate-bounce" />
                <span>Broadcasting Sealed State Transition via 1AM...</span>
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

        {/* Proving HUD */}
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

        {/* Error Alert */}
        {error && (
          <div className="p-4 bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-900 rounded-xl flex items-start gap-3 text-rose-800 dark:text-rose-200 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-600 mt-0.5" />
            <div className="space-y-1">
              <p className="font-bold text-rose-900 dark:text-rose-100">Execution Notice</p>
              <p className="text-xs font-mono leading-relaxed">{error}</p>
            </div>
          </div>
        )}

        {/* Success Confirmation HUD */}
        {success && txHash && (
          <div className="p-5 bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-300 dark:border-emerald-800 rounded-2xl space-y-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-800 dark:text-emerald-300 font-bold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                <span className="font-display">Zero-Knowledge Circuit Verified &amp; Sealed On-Chain!</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-800 bg-emerald-100 border border-emerald-300 px-2.5 py-0.5 rounded-full">
                BLOCK CONFIRMED
              </span>
            </div>

            {/* Transaction Hash Box with Direct 1AM Explorer Link */}
            <div className="space-y-2 bg-white dark:bg-zinc-900 p-3.5 rounded-xl border border-emerald-200 dark:border-emerald-900">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-500 font-bold flex items-center gap-1">
                  <Hash className="w-3 h-3 text-emerald-600" />
                  Midnight Transaction Hash
                </span>
                <div className="flex items-center gap-2">
                  <a
                    href={`https://explorer.1am.xyz/contract/${contractAddress}?network=${activeNetwork}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] text-black dark:text-[#FFD400] font-mono font-bold hover:underline"
                  >
                    <span>1AM Explorer</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                  <button
                    type="button"
                    onClick={handleCopyTx}
                    className="inline-flex items-center gap-1 text-[11px] text-zinc-700 dark:text-zinc-300 font-mono bg-zinc-100 dark:bg-zinc-800 px-2 py-0.5 rounded border border-zinc-200 dark:border-zinc-700"
                  >
                    {copiedTx ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                    <span>{copiedTx ? 'Copied' : 'Copy'}</span>
                  </button>
                </div>
              </div>
              <div className="font-mono text-xs text-emerald-800 dark:text-emerald-300 break-all select-all font-bold">
                {txHash}
              </div>
            </div>

            {/* State Transition Cards */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">Disclosed Round</span>
                <span className="text-lg font-bold text-black dark:text-white font-mono">#{disclosedRound}</span>
              </div>
              <div className="p-3.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 text-center">
                <span className="text-[10px] font-mono uppercase text-zinc-500 block mb-1">
                  {activeMode === 'beneficiary' ? 'Total Claims Verified' : 'New Public Total'}
                </span>
                <span className="text-lg font-bold text-emerald-700 dark:text-emerald-400 font-mono">{disclosedTotal?.toLocaleString()}</span>
              </div>
            </div>

            <div className="text-center pt-1 flex items-center justify-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-bold font-mono">
              <QuantumLockIcon className="w-4 h-4 text-emerald-600" />
              <span>Zero knowledge was NOT leaked to the network or validators.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};