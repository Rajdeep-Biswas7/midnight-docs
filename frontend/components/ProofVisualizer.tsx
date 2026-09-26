import React, { useState } from 'react';
import { WitnessEyeIcon, QuantumLockIcon, CircuitCoreIcon, LedgerBlockIcon, EnergySparkIcon } from './CustomIcons';
import { EyeOff, Eye, CheckCircle2 } from 'lucide-react';
import { useMidnight } from '../hooks/useMidnight';

export const ProofVisualizer: React.FC = () => {
  const { contractState } = useMidnight();
  const [demoSecret, setDemoSecret] = useState<number>(5);
  const [showSecretInSimulator, setShowSecretInSimulator] = useState<boolean>(false);
  const [activeStep, setActiveStep] = useState<number>(2);

  const initialTotal = contractState.totalValue || 42;
  const initialRound = contractState.round || 12;
  const nextTotal = initialTotal + demoSecret;
  const nextRound = initialRound + 1;

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm overflow-hidden">
      <div className="p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD400]/20 border border-[#FFD400] flex items-center justify-center text-black shadow-xs">
              <CircuitCoreIcon className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-black text-black dark:text-white tracking-tight flex items-center gap-2">
                ZK Circuit Execution Pipeline
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#FFD400] text-black font-bold">
                  Interactive Simulator
                </span>
              </h3>
              <p className="text-xs text-zinc-500 font-mono">
                How zero-knowledge proofs preserve complete input confidentiality on Midnight
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSecretInSimulator(!showSecretInSimulator)}
              className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 hover:bg-zinc-200 dark:hover:bg-zinc-700 border border-zinc-200 dark:border-zinc-700 text-xs font-mono text-zinc-800 dark:text-zinc-200 transition-colors flex items-center gap-1.5"
            >
              {showSecretInSimulator ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-rose-600" />
                  <span>Hide Witness Trace</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-black dark:text-[#FFD400]" />
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
                ? 'bg-zinc-100 dark:bg-zinc-800/90 border-black dark:border-[#FFD400] shadow-sm'
                : 'bg-zinc-50 dark:bg-zinc-950/70 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-black dark:text-[#FFD400] font-bold">Step 01</span>
              <WitnessEyeIcon className="w-4 h-4 text-purple-600" />
            </div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-1">Off-Chain Witness</h4>
            <div className="p-2 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-purple-700 dark:text-purple-400">
              {showSecretInSimulator ? (
                <span>secret = {demoSecret}</span>
              ) : (
                <span className="text-zinc-400 font-sans italic">●●●● (Confidential)</span>
              )}
            </div>
            <p className="text-[10px] text-zinc-500 mt-2 leading-tight">
              Held strictly in browser memory. Never leaves your device.
            </p>
          </div>

          {/* Step 2: Circuit Constraint */}
          <div
            onClick={() => setActiveStep(2)}
            className={`cursor-pointer p-4 rounded-xl transition-all border ${
              activeStep === 2
                ? 'bg-zinc-100 dark:bg-zinc-800/90 border-black dark:border-[#FFD400] shadow-sm'
                : 'bg-zinc-50 dark:bg-zinc-950/70 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-black dark:text-[#FFD400] font-bold">Step 02</span>
              <QuantumLockIcon className="w-4 h-4 text-cyan-600" />
            </div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-1">Compact Constraint</h4>
            <div className="p-2 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-cyan-700 dark:text-cyan-400">
              <span>assert(secret &gt; 0)</span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-2 leading-tight">
              Compact circuit verifies positive increment rule without revealing value.
            </p>
          </div>

          {/* Step 3: Local Proof Generation */}
          <div
            onClick={() => setActiveStep(3)}
            className={`cursor-pointer p-4 rounded-xl transition-all border ${
              activeStep === 3
                ? 'bg-zinc-100 dark:bg-zinc-800/90 border-black dark:border-[#FFD400] shadow-sm'
                : 'bg-zinc-50 dark:bg-zinc-950/70 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-black dark:text-[#FFD400] font-bold">Step 03</span>
              <EnergySparkIcon className="w-4 h-4 text-amber-500" />
            </div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-1">Client-Side ZKP</h4>
            <div className="p-2 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-amber-600 dark:text-amber-400 truncate">
              <span>π: 0x7f2c...9e4a</span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-2 leading-tight">
              Zero-knowledge proof synthesized client-side via WebAssembly prover.
            </p>
          </div>

          {/* Step 4: Public Ledger Disclosure */}
          <div
            onClick={() => setActiveStep(4)}
            className={`cursor-pointer p-4 rounded-xl transition-all border ${
              activeStep === 4
                ? 'bg-zinc-100 dark:bg-zinc-800/90 border-black dark:border-[#FFD400] shadow-sm'
                : 'bg-zinc-50 dark:bg-zinc-950/70 border-zinc-200 dark:border-zinc-800 hover:border-zinc-400'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-black dark:text-[#FFD400] font-bold">Step 04</span>
              <LedgerBlockIcon className="w-4 h-4 text-emerald-600" />
            </div>
            <h4 className="text-xs font-bold text-zinc-900 dark:text-zinc-100 mb-1">On-Chain Commit</h4>
            <div className="p-2 bg-white dark:bg-zinc-900 rounded-lg border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-emerald-700 dark:text-emerald-400">
              <span>disclose(total)</span>
            </div>
            <p className="text-[10px] text-zinc-500 mt-2 leading-tight">
              Ledger commits verified state update. Observers see validity, zero secrets.
            </p>
          </div>
        </div>

        {/* Live Interactive Simulator Slider */}
        <div className="p-4 bg-zinc-50 dark:bg-zinc-950/70 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-bold text-zinc-800 dark:text-zinc-200 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Interactive Secret Witness Value:
            </span>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="50"
                value={demoSecret}
                onChange={(e) => setDemoSecret(Number(e.target.value))}
                className="w-32 accent-[#FFD400] cursor-pointer"
              />
              <span className="font-mono text-xs font-bold text-black dark:text-white bg-[#FFD400] px-2 py-0.5 rounded">
                +{demoSecret}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
            <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] text-zinc-500 block uppercase font-mono">Client Secret</span>
              <span className="font-mono font-bold text-purple-700 dark:text-purple-400">
                {showSecretInSimulator ? `+${demoSecret}` : 'PROTECTED'}
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] text-zinc-500 block uppercase font-mono">Constraint Check</span>
              <span className="font-mono font-bold text-cyan-700 dark:text-cyan-400 flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-cyan-600" /> PASSED
              </span>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] text-zinc-500 block uppercase font-mono">Projected Round</span>
              <span className="font-mono font-bold text-zinc-900 dark:text-zinc-100">#{nextRound}</span>
            </div>
            <div className="p-2.5 rounded-lg bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800">
              <span className="text-[10px] text-zinc-500 block uppercase font-mono">Projected New Total</span>
              <span className="font-mono font-bold text-emerald-700 dark:text-emerald-400">{nextTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
