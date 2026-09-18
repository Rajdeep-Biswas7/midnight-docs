import React, { useState } from 'react';
import { QuantumLockIcon, CircuitCoreIcon, WitnessEyeIcon } from './CustomIcons';
import { Cpu, Send, CheckCircle2, AlertCircle, Copy, Check, Sparkles, ArrowRight, Hash } from 'lucide-react';
import { DEFAULT_PREPROD_CONTRACT, DEFAULT_PREVIEW_CONTRACT, type CircuitCallState } from '../hooks/useMidnight';

interface CircuitCallProps {
  isConnected: boolean;
  circuitState: CircuitCallState;
  onCallCircuit: (contractAddress: string) => void;
}

export const CircuitCall: React.FC<CircuitCallProps> = ({
  isConnected,
  circuitState,
  onCallCircuit,
}) => {
  const [contractAddress, setContractAddress] = useState(DEFAULT_PREPROD_CONTRACT);
  const [copiedContract, setCopiedContract] = useState(false);
  const [copiedTx, setCopiedTx] = useState(false);

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
    <div className="radiant-card-wrap">
      <div className="radiant-card-content p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-indigo-500/15">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400">
              <CircuitCoreIcon className="w-6 h-6" />
            </div>
            <div>
              <h2 className="font-display text-lg font-bold text-white tracking-tight flex items-center gap-2">
                Execute ZK Circuit
              </h2>
              <p className="text-xs text-slate-400 flex items-center gap-1.5">
                Circuit: <span className="font-mono text-emerald-400 font-semibold">incrementWithSecret()</span>
              </p>
            </div>
          </div>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-mono font-semibold bg-emerald-500/10 text-emerald-300 border border-emerald-500/30 rounded-full">
            <QuantumLockIcon className="w-3.5 h-3.5 text-emerald-400" />
            ZERO LEAK
          </span>
        </div>

        {/* Target Contract Address Selector */}
        <div className="space-y-2.5">
          <div className="flex items-center justify-between">
            <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
              Contract Target
            </label>
            <div className="flex items-center gap-1.5 text-xs">
              <button
                type="button"
                onClick={() => setContractAddress(DEFAULT_PREPROD_CONTRACT)}
                className={`px-2.5 py-1 rounded-md transition-all font-mono text-[11px] ${
                  contractAddress === DEFAULT_PREPROD_CONTRACT
                    ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                Preprod (Recommended)
              </button>
              <button
                type="button"
                onClick={() => setContractAddress(DEFAULT_PREVIEW_CONTRACT)}
                className={`px-2.5 py-1 rounded-md transition-all font-mono text-[11px] ${
                  contractAddress === DEFAULT_PREVIEW_CONTRACT
                    ? 'bg-indigo-600 text-white font-bold shadow-md shadow-indigo-600/30'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-400 border border-slate-800'
                }`}
              >
                Preview
              </button>
            </div>
          </div>

          <div className="relative flex items-center">
            <input
              type="text"
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              disabled={isLoading}
              className="w-full bg-slate-950/80 pl-3 pr-10 py-2.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 focus:outline-none focus:border-indigo-500/60 transition-colors shadow-inner"
              placeholder="mn_addr_preprod..."
            />
            <button
              type="button"
              onClick={handleCopyContract}
              title="Copy Contract Address"
              className="absolute right-2 p-1.5 text-slate-400 hover:text-slate-200 bg-slate-900/80 hover:bg-slate-800 rounded-lg transition-colors border border-slate-800"
            >
              {copiedContract ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            </button>
          </div>
        </div>

        {/* Cryptographic Privacy Guarantee Banner */}
        <div className="p-4 rounded-xl bg-gradient-to-r from-indigo-950/40 via-purple-950/20 to-emerald-950/30 border border-indigo-500/25 space-y-2">
          <div className="flex items-center gap-2 text-indigo-300 text-xs font-bold font-display">
            <WitnessEyeIcon className="w-4 h-4 text-purple-400" />
            <span>Off-Chain Witness Privacy Guarantee</span>
          </div>
          <p className="text-xs text-slate-300/90 leading-relaxed">
            The secret increment is an off-chain witness (<code className="text-indigo-300 font-mono">witness secretIncrement(): Uint&lt;64&gt;</code>). It is processed only inside your local browser zero-knowledge proof circuit. Neither this dApp, network relayers, nor the public blockchain ledger ever see or store the secret amount.
          </p>
        </div>

        {/* Action Button */}
        <form onSubmit={handleSubmit}>
          <button
            type="submit"
            disabled={!isConnected || isLoading}
            className="w-full py-3.5 px-5 rounded-xl font-display font-bold text-sm text-white bg-gradient-to-r from-indigo-600 via-emerald-600 to-indigo-600 hover:from-indigo-500 hover:to-emerald-500 active:scale-[0.99] disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-xl shadow-indigo-600/25 flex items-center justify-center gap-2.5 tracking-wide"
          >
            {isProving ? (
              <>
                <Cpu className="w-4 h-4 animate-pulse text-indigo-200" />
                <span>Synthesizing Client-Side ZK-SNARK Proof...</span>
              </>
            ) : isSubmitting ? (
              <>
                <Send className="w-4 h-4 animate-bounce text-emerald-200" />
                <span>Broadcasting Sealed State Transition...</span>
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 text-emerald-300" />
                <span>Prove &amp; Commit Confidential Increment</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {/* Live Proving Progress HUD */}
        {isLoading && (
          <div className="p-4 bg-slate-950/90 rounded-xl border border-indigo-500/30 space-y-3 shadow-inner">
            <div className="flex items-center justify-between text-xs font-medium">
              <span className="flex items-center gap-2 text-slate-200">
                <div className="w-3.5 h-3.5 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin" />
                {isProving ? 'Executing Compact ZK circuit in browser WebAssembly...' : 'Broadcasting proof to Midnight Preprod ledger...'}
              </span>
              <span className="text-indigo-400 font-mono font-bold text-[11px]">
                {isProving ? 'PROVING [LOCAL]' : 'BROADCASTING'}
              </span>
            </div>
            <div className="w-full bg-slate-800 h-2 rounded-full overflow-hidden p-0.5">
              <div
                className={`h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-700 ${
                  isProving ? 'w-1/2 animate-pulse' : 'w-11/12'
                }`}
              />
            </div>
          </div>
        )}

        {/* Execution Error Alert */}
        {error && (
          <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-3 text-rose-300 text-sm">
            <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400 mt-0.5" />
            <div className="space-y-1">
              <p className="font-medium text-rose-200">Execution Error</p>
              <p className="text-xs text-rose-300/90 leading-relaxed font-mono">{error}</p>
            </div>
          </div>
        )}

        {/* Success Confirmation HUD */}
        {success && txHash && (
          <div className="p-5 bg-emerald-950/40 border border-emerald-500/40 rounded-2xl space-y-4 shadow-xl">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
                <span className="font-display font-bold">ZK Circuit Verified &amp; Sealed On-Chain!</span>
              </div>
              <span className="text-[11px] font-mono font-bold text-emerald-400 bg-emerald-500/15 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
                BLOCK CONFIRMED
              </span>
            </div>

            {/* Transaction Hash Box */}
            <div className="space-y-1.5 bg-slate-950/80 p-3.5 rounded-xl border border-emerald-900/50">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold flex items-center gap-1">
                  <Hash className="w-3 h-3 text-emerald-400" />
                  Preprod Transaction Hash
                </span>
                <button
                  type="button"
                  onClick={handleCopyTx}
                  className="inline-flex items-center gap-1 text-[11px] text-slate-300 hover:text-white font-mono bg-slate-900 px-2 py-0.5 rounded border border-slate-800 transition-colors"
                >
                  {copiedTx ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedTx ? 'Copied' : 'Copy'}</span>
                </button>
              </div>
              <div className="font-mono text-xs text-emerald-300 break-all select-all">
                {txHash}
              </div>
            </div>

            {/* State Transition Cards */}
            <div className="grid grid-cols-2 gap-3 pt-1">
              <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">Disclosed Round</span>
                <span className="text-base font-bold text-white font-mono">#{disclosedRound}</span>
              </div>
              <div className="p-3.5 bg-slate-950/70 rounded-xl border border-slate-800 text-center">
                <span className="text-[10px] font-mono uppercase text-slate-400 block mb-1">New Public Total</span>
                <span className="text-base font-bold text-emerald-300 font-mono">{disclosedTotal}</span>
              </div>
            </div>

            <div className="text-center pt-1 flex items-center justify-center gap-2 text-xs text-emerald-400 font-medium">
              <QuantumLockIcon className="w-4 h-4 text-emerald-400" />
              <span>Zero knowledge was NOT leaked to the network.</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
