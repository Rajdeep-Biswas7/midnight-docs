import React, { useState } from 'react';
import { WitnessEyeIcon, QuantumLockIcon, CircuitCoreIcon, LedgerBlockIcon, EnergySparkIcon } from './CustomIcons';
import { EyeOff, Eye, CheckCircle2, ArrowRight } from 'lucide-react';

export const ProofVisualizer: React.FC = () => {
  const [demoSecret, setDemoSecret] = useState<number>(5);
  const [showSecretInSimulator, setShowSecretInSimulator] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(2);

  const initialTotal = 42;
  const initialRound = 12;
  const simulatedNewTotal = initialTotal + demoSecret;
  const simulatedNewRound = initialRound + 1;

  return (
    <div className="radiant-card-wrap">
      <div className="radiant-card-content p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-indigo-500/15">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/30 text-indigo-400">
              <CircuitCoreIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                ZK Circuit Execution Pipeline
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30">
                  Interactive
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                How zero-knowledge proofs preserve complete input confidentiality on Midnight
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSecretInSimulator(!showSecretInSimulator)}
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 border border-slate-700/80 text-xs font-mono text-indigo-300 transition-colors flex items-center gap-1.5"
            >
              {showSecretInSimulator ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-rose-400" />
                  <span>Hide Witness Trace</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-indigo-400" />
                  <span>Inspect Witness Trace</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* 4-Step Interactive Flow Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
          {/* Step 1: Private Witness */}
          <div
            onClick={() => setActiveStep(1)}
            className={`cursor-pointer p-4 rounded-xl transition-all border ${
              activeStep === 1
                ? 'bg-indigo-950/40 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-indigo-400 font-bold">Step 01</span>
              <WitnessEyeIcon className="w-4 h-4 text-purple-400" />
            </div>
            <h4 className="text-xs font-semibold text-slate-200 mb-1">Off-Chain Witness</h4>
            <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800 text-[11px] font-mono text-purple-300">
              {showSecretInSimulator ? (
                <span>secret = {demoSecret}</span>
              ) : (
                <span className="text-slate-500 font-sans italic">●●●● (Confidential)</span>
              )}
            </div>
            <p className="text-[10px] text-slate-400 mt-2 leading-tight">
              Held strictly in browser memory. Never leaves your device.
            </p>
          </div>

          {/* Step 2: Circuit Constraint */}
          <div
            onClick={() => setActiveStep(2)}
            className={`cursor-pointer p-4 rounded-xl transition-all border ${
              activeStep === 2
                ? 'bg-indigo-950/40 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-cyan-400 font-bold">Step 02</span>
              <QuantumLockIcon className="w-4 h-4 text-cyan-400" />
            </div>
            <h4 className="text-xs font-semibold text-slate-200 mb-1">Compact Constraint</h4>
            <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800 text-[11px] font-mono text-cyan-300">
              <span>assert(secret &gt; 0)</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 leading-tight">
              Compact circuit verifies positive increment rule without revealing value.
            </p>
          </div>

          {/* Step 3: Local Proof Generation */}
          <div
            onClick={() => setActiveStep(3)}
            className={`cursor-pointer p-4 rounded-xl transition-all border ${
              activeStep === 3
                ? 'bg-indigo-950/40 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-amber-400 font-bold">Step 03</span>
              <EnergySparkIcon className="w-4 h-4 text-amber-400" />
            </div>
            <h4 className="text-xs font-semibold text-slate-200 mb-1">Client-Side ZKP</h4>
            <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800 text-[11px] font-mono text-amber-300 truncate">
              <span>π: 0x7f2c...9e4a</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 leading-tight">
              Zero-knowledge proof synthesized client-side via WebAssembly prover.
            </p>
          </div>

          {/* Step 4: Public Ledger Disclosure */}
          <div
            onClick={() => setActiveStep(4)}
            className={`cursor-pointer p-4 rounded-xl transition-all border ${
              activeStep === 4
                ? 'bg-indigo-950/40 border-indigo-500/50 shadow-lg shadow-indigo-500/10'
                : 'bg-slate-950/50 border-slate-800/80 hover:border-slate-700'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-emerald-400 font-bold">Step 04</span>
              <LedgerBlockIcon className="w-4 h-4 text-emerald-400" />
            </div>
            <h4 className="text-xs font-semibold text-slate-200 mb-1">On-Chain Commit</h4>
            <div className="p-2 bg-slate-900/90 rounded-lg border border-slate-800 text-[11px] font-mono text-emerald-300">
              <span>disclose(total)</span>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 leading-tight">
              Ledger commits verified state update. Observers see validity, zero secrets.
            </p>
          </div>
        </div>

        {/* Live Interactive Simulator Slider */}
        <div className="p-4 bg-slate-950/70 rounded-xl border border-indigo-500/20 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-semibold text-slate-300 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-pulse" />
              Simulate Secret Witness Value:
            </span>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="50"
                value={demoSecret}
                onChange={(e) => setDemoSecret(Number(e.target.value))}
                className="w-32 accent-indigo-500 cursor-pointer"
              />
              <span className="font-mono text-xs font-bold text-indigo-300 bg-indigo-500/10 px-2 py-0.5 rounded border border-indigo-500/30">
                +{demoSecret}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Client Secret</span>
              <span className="font-mono font-bold text-purple-300">
                {showSecretInSimulator ? `+${demoSecret}` : 'PROTECTED'}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Constraint Check</span>
              <span className="font-mono font-bold text-cyan-300 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-400" /> PASSED
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Simulated Round</span>
              <span className="font-mono font-bold text-slate-200">#{simulatedNewRound}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-slate-900/80 border border-slate-800">
              <span className="text-[10px] text-slate-400 block uppercase">Public New Total</span>
              <span className="font-mono font-bold text-emerald-300">{simulatedNewTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
