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
    <div className="rounded-xl border border-[#1f1f1f] bg-[#111111] shadow-xs overflow-hidden">
      <div className="p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] flex items-center justify-center text-[#22c55e] shadow-xs">
              <CircuitCoreIcon className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-mono text-base font-bold text-[#f5f5f5] tracking-tight flex items-center gap-2">
                ZK Circuit Execution Pipeline
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 font-bold">
                  Interactive Simulator
                </span>
              </h3>
              <p className="text-xs text-[#8a8a8a] font-mono">
                How zero-knowledge proofs preserve complete input confidentiality on Midnight
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowSecretInSimulator(!showSecretInSimulator)}
              className="px-3 py-1.5 rounded-lg bg-[#161616] hover:bg-[#1f1f1f] border border-[#1f1f1f] hover:border-[#333333] text-xs font-mono text-[#f5f5f5] transition-colors flex items-center gap-1.5"
            >
              {showSecretInSimulator ? (
                <>
                  <EyeOff className="w-3.5 h-3.5 text-[#ef4444]" />
                  <span>Hide Witness Trace</span>
                </>
              ) : (
                <>
                  <Eye className="w-3.5 h-3.5 text-[#22c55e]" />
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
            className={`cursor-pointer p-4 rounded-lg transition-all border ${
              activeStep === 1
                ? 'bg-[#161616] border-[#22c55e] shadow-xs'
                : 'bg-[#0a0a0a] border-[#1f1f1f] hover:border-[#333333]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#22c55e] font-bold">Step 01</span>
              <WitnessEyeIcon className="w-4 h-4 text-[#22c55e]" />
            </div>
            <h4 className="text-xs font-mono font-bold text-[#f5f5f5] mb-1">Off-Chain Witness</h4>
            <div className="p-2 bg-[#111111] rounded border border-[#1f1f1f] text-[11px] font-mono text-[#f5f5f5]">
              {showSecretInSimulator ? (
                <span>secret = {demoSecret}</span>
              ) : (
                <span className="text-[#8a8a8a] italic">●●●● (Confidential)</span>
              )}
            </div>
            <p className="text-[10px] text-[#8a8a8a] mt-2 leading-tight font-sans">
              Held strictly in browser memory. Never leaves your device.
            </p>
          </div>

          {/* Step 2: Circuit Constraint */}
          <div
            onClick={() => setActiveStep(2)}
            className={`cursor-pointer p-4 rounded-lg transition-all border ${
              activeStep === 2
                ? 'bg-[#161616] border-[#22c55e] shadow-xs'
                : 'bg-[#0a0a0a] border-[#1f1f1f] hover:border-[#333333]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#22c55e] font-bold">Step 02</span>
              <QuantumLockIcon className="w-4 h-4 text-[#22c55e]" />
            </div>
            <h4 className="text-xs font-mono font-bold text-[#f5f5f5] mb-1">Compact Constraint</h4>
            <div className="p-2 bg-[#111111] rounded border border-[#1f1f1f] text-[11px] font-mono text-[#22c55e]">
              <span>assert(secret &gt; 0)</span>
            </div>
            <p className="text-[10px] text-[#8a8a8a] mt-2 leading-tight font-sans">
              Compact circuit verifies positive increment rule without revealing value.
            </p>
          </div>

          {/* Step 3: Local Proof Generation */}
          <div
            onClick={() => setActiveStep(3)}
            className={`cursor-pointer p-4 rounded-lg transition-all border ${
              activeStep === 3
                ? 'bg-[#161616] border-[#22c55e] shadow-xs'
                : 'bg-[#0a0a0a] border-[#1f1f1f] hover:border-[#333333]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#22c55e] font-bold">Step 03</span>
              <EnergySparkIcon className="w-4 h-4 text-[#22c55e]" />
            </div>
            <h4 className="text-xs font-mono font-bold text-[#f5f5f5] mb-1">Client-Side ZKP</h4>
            <div className="p-2 bg-[#111111] rounded border border-[#1f1f1f] text-[11px] font-mono text-[#22c55e] truncate">
              <span>π: 0x7f2c...9e4a</span>
            </div>
            <p className="text-[10px] text-[#8a8a8a] mt-2 leading-tight font-sans">
              Zero-knowledge proof synthesized client-side via WebAssembly prover.
            </p>
          </div>

          {/* Step 4: Public Ledger Disclosure */}
          <div
            onClick={() => setActiveStep(4)}
            className={`cursor-pointer p-4 rounded-lg transition-all border ${
              activeStep === 4
                ? 'bg-[#161616] border-[#22c55e] shadow-xs'
                : 'bg-[#0a0a0a] border-[#1f1f1f] hover:border-[#333333]'
            }`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono uppercase tracking-wider text-[#22c55e] font-bold">Step 04</span>
              <LedgerBlockIcon className="w-4 h-4 text-[#22c55e]" />
            </div>
            <h4 className="text-xs font-mono font-bold text-[#f5f5f5] mb-1">On-Chain Commit</h4>
            <div className="p-2 bg-[#111111] rounded border border-[#1f1f1f] text-[11px] font-mono text-[#f5f5f5]">
              <span>disclose(total)</span>
            </div>
            <p className="text-[10px] text-[#8a8a8a] mt-2 leading-tight font-sans">
              Ledger commits verified state update. Observers see validity, zero secrets.
            </p>
          </div>
        </div>

        {/* Live Interactive Simulator Slider */}
        <div className="p-4 bg-[#0a0a0a] rounded-lg border border-[#1f1f1f] space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <span className="text-xs font-mono font-bold text-[#f5f5f5] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse" />
              Interactive Secret Witness Value:
            </span>
            <div className="flex items-center gap-3">
              <input
                type="range"
                min="1"
                max="50"
                value={demoSecret}
                onChange={(e) => setDemoSecret(Number(e.target.value))}
                className="w-32 accent-[#22c55e] cursor-pointer"
              />
              <span className="font-mono text-xs font-bold text-black bg-[#22c55e] px-2 py-0.5 rounded">
                +{demoSecret}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 text-center text-xs">
            <div className="p-2.5 rounded bg-[#111111] border border-[#1f1f1f]">
              <span className="text-[10px] text-[#8a8a8a] block uppercase font-mono">Client Secret</span>
              <span className="font-mono font-bold text-[#22c55e]">
                {showSecretInSimulator ? `+${demoSecret}` : 'PROTECTED'}
              </span>
            </div>
            <div className="p-2.5 rounded bg-[#111111] border border-[#1f1f1f]">
              <span className="text-[10px] text-[#8a8a8a] block uppercase font-mono">Constraint Check</span>
              <span className="font-mono font-bold text-[#22c55e] flex items-center justify-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" /> PASSED
              </span>
            </div>
            <div className="p-2.5 rounded bg-[#111111] border border-[#1f1f1f]">
              <span className="text-[10px] text-[#8a8a8a] block uppercase font-mono">Projected Round</span>
              <span className="font-mono font-bold text-[#f5f5f5]">#{nextRound}</span>
            </div>
            <div className="p-2.5 rounded bg-[#111111] border border-[#1f1f1f]">
              <span className="text-[10px] text-[#8a8a8a] block uppercase font-mono">Projected New Total</span>
              <span className="font-mono font-bold text-[#22c55e]">{nextTotal}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
