import React, { useState } from 'react';
import { Shield, Cpu, Send, CheckCircle2, AlertCircle, Lock, ArrowRight, ExternalLink } from 'lucide-react';
import { DEFAULT_PREPROD_CONTRACT, type CircuitCallState } from '../hooks/useMidnight';

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoading && isConnected) {
      onCallCircuit(contractAddress);
    }
  };

  return (
    <div className="w-full max-w-xl mx-auto p-6 bg-slate-900/90 border border-slate-800 rounded-2xl shadow-xl backdrop-blur-sm space-y-6">
      <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-emerald-400">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-slate-100">Execute ZK Circuit</h2>
            <p className="text-xs text-slate-400">Circuit: <span className="font-mono text-emerald-400">incrementWithSecret()</span></p>
          </div>
        </div>

        <span className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-semibold bg-emerald-500/15 text-emerald-300 border border-emerald-500/30 rounded-full">
          <Lock className="w-3 h-3 text-emerald-400" /> Proved without revealing your input
        </span>
      </div>

      {/* Target Preprod Contract */}
      <div className="space-y-2">
        <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
          Preprod Contract Address
        </label>
        <div className="relative">
          <input
            type="text"
            value={contractAddress}
            onChange={(e) => setContractAddress(e.target.value)}
            disabled={isLoading}
            className="w-full bg-slate-950 px-3 py-2.5 rounded-xl border border-slate-800 font-mono text-xs text-slate-300 focus:outline-none focus:border-indigo-500/60 transition-colors"
          />
        </div>
        <p className="text-[11px] text-slate-500">
          Target Midnight Preprod contract configured for Level 2 verification.
        </p>
      </div>

      {/* Privacy Guarantee Box */}
      <div className="p-4 rounded-xl bg-indigo-950/20 border border-indigo-500/20 space-y-2">
        <div className="flex items-center gap-2 text-indigo-300 text-xs font-semibold">
          <Lock className="w-4 h-4 text-indigo-400" />
          <span>Strict Zero-Knowledge Guarantee</span>
        </div>
        <p className="text-xs text-indigo-200/80 leading-relaxed">
          The secret increment amount is treated as an off-chain private witness (<code className="text-indigo-300">witness secretIncrement(): Uint&lt;64&gt;</code>). It is processed only inside the local zero-knowledge proof circuit. Neither this website nor the public blockchain ledger ever sees or records the private input.
        </p>
      </div>

      {/* Action Button */}
      <form onSubmit={handleSubmit}>
        <button
          type="submit"
          disabled={!isConnected || isLoading}
          className="w-full py-3 px-4 rounded-xl font-medium text-sm text-white bg-gradient-to-r from-indigo-600 to-emerald-600 hover:from-indigo-500 hover:to-emerald-500 active:from-indigo-700 active:to-emerald-700 disabled:opacity-40 disabled:cursor-not-allowed transition-all shadow-lg shadow-indigo-600/20 flex items-center justify-center gap-2"
        >
          {isProving ? (
            <>
              <Cpu className="w-4 h-4 animate-pulse text-indigo-200" />
              <span>Generating Zero-Knowledge Proof Locally...</span>
            </>
          ) : isSubmitting ? (
            <>
              <Send className="w-4 h-4 animate-bounce text-emerald-200" />
              <span>Submitting Sealed Transaction On-Chain...</span>
            </>
          ) : (
            <>
              <span>Prove &amp; Submit Increment</span>
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </button>
      </form>

      {/* Proof/Submitting Status Indicator */}
      {isLoading && (
        <div className="p-4 bg-slate-950/80 rounded-xl border border-slate-800 space-y-3">
          <div className="flex items-center justify-between text-xs font-medium">
            <span className="flex items-center gap-2 text-slate-300">
              <div className="w-3.5 h-3.5 border-2 border-indigo-400/30 border-t-indigo-400 rounded-full animate-spin" />
              {isProving ? 'Executing Compact ZK Circuit in browser...' : 'Broadcasting proof to Midnight Preprod...'}
            </span>
            <span className="text-indigo-400 font-mono text-[11px]">{isProving ? 'PROVING' : 'SUBMITTING'}</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div
              className={`h-full bg-gradient-to-r from-indigo-500 to-emerald-500 transition-all duration-500 ${
                isProving ? 'w-1/2 animate-pulse' : 'w-5/6'
              }`}
            />
          </div>
        </div>
      )}

      {/* Error State */}
      {error && (
        <div className="p-4 bg-rose-500/10 border border-rose-500/20 rounded-xl flex items-start gap-3 text-rose-300 text-sm">
          <AlertCircle className="w-5 h-5 flex-shrink-0 text-rose-400 mt-0.5" />
          <div className="space-y-1">
            <p className="font-medium text-rose-200">Execution Error</p>
            <p className="text-xs text-rose-300/90 leading-relaxed">{error}</p>
          </div>
        </div>
      )}

      {/* Success & Transaction Output */}
      {success && txHash && (
        <div className="p-5 bg-emerald-950/30 border border-emerald-500/30 rounded-xl space-y-4">
          <div className="flex items-center gap-2 text-emerald-300 font-semibold text-sm">
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
            <span>Circuit Executed &amp; Verified Successfully!</span>
          </div>

          <div className="space-y-2 bg-slate-950/70 p-3.5 rounded-lg border border-emerald-900/40">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold block">
              Preprod Transaction Hash
            </span>
            <div className="flex items-center justify-between gap-2">
              <span className="font-mono text-xs text-emerald-300 break-all select-all">
                {txHash}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-1">
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">Disclosed Round</span>
              <span className="text-sm font-bold text-slate-100 font-mono">#{disclosedRound}</span>
            </div>
            <div className="p-3 bg-slate-950/60 rounded-lg border border-slate-800/80">
              <span className="text-[11px] text-slate-400 block">New Public Total</span>
              <span className="text-sm font-bold text-indigo-300 font-mono">{disclosedTotal}</span>
            </div>
          </div>

          <div className="text-center pt-1">
            <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-medium">
              <Lock className="w-3.5 h-3.5" /> Proved without revealing your input
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
