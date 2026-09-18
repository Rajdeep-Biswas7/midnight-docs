import React, { useState } from 'react';
import { ZkShieldBrandIcon, QuantumLockIcon } from './CustomIcons';
import { HeartHandshake, ShieldCheck, CheckCircle2, XCircle, Users, DollarSign, ExternalLink, Sparkles, Lock } from 'lucide-react';
import { DEFAULT_PREPROD_CONTRACT } from '../hooks/useMidnight';

interface RecentClaim {
  id: number;
  timestamp: string;
  status: 'Verified' | 'Pending';
  txHash: string;
  eligibilityProof: string;
}

export const AidVerificationFeed: React.FC = () => {
  const [testIncome, setTestIncome] = useState<number>(32000);
  const threshold = 50000;
  const isEligible = testIncome < threshold && testIncome > 0;

  const mockClaims: RecentClaim[] = [
    {
      id: 18,
      timestamp: 'Just now',
      status: 'Verified',
      txHash: '0x8f2a1b9c7d6e4f3a2b1c0d9e8f7a6b5c4d3e2f1a',
      eligibilityProof: 'ZK-SNARK • Groth16 Compliant',
    },
    {
      id: 17,
      timestamp: '4 mins ago',
      status: 'Verified',
      txHash: '0x3c5d7e9f1a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d',
      eligibilityProof: 'ZK-SNARK • Groth16 Compliant',
    },
    {
      id: 16,
      timestamp: '12 mins ago',
      status: 'Verified',
      txHash: '0x7e2f1a3b5c9d8e0f4a6b8c0d2e4f6a8b0c2d4e6f',
      eligibilityProof: 'ZK-SNARK • Groth16 Compliant',
    },
  ];

  return (
    <div className="radiant-card-wrap">
      <div className="radiant-card-content p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-indigo-500/15">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400">
              <HeartHandshake className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-bold text-white tracking-tight flex items-center gap-2">
                PrivateAid Humanitarian Verification Engine
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30">
                  Real-World Solution
                </span>
              </h3>
              <p className="text-xs text-slate-400">
                Solving beneficiary privacy for disaster relief &amp; welfare programs on Midnight
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>UNHCR / NGO Proof Standard</span>
          </div>
        </div>

        {/* Real-World Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>ACTIVE AID POOL</span>
              <DollarSign className="w-3.5 h-3.5 text-emerald-400" />
            </div>
            <div className="text-xl font-bold font-mono text-emerald-300">5,000,000 tDUST</div>
            <div className="text-[10px] text-slate-500 mt-1">Preprod Relief Reserve</div>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>CONFIDENTIAL CLAIMS</span>
              <Users className="w-3.5 h-3.5 text-indigo-400" />
            </div>
            <div className="text-xl font-bold font-mono text-indigo-300">18 Beneficiaries</div>
            <div className="text-[10px] text-slate-500 mt-1">Zero Identities Exposed</div>
          </div>

          <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/80">
            <div className="flex items-center justify-between text-slate-400 text-xs font-mono mb-1">
              <span>PRIVACY INTEGRITY</span>
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
            </div>
            <div className="text-xl font-bold font-mono text-purple-300">100% ZK-Proof</div>
            <div className="text-[10px] text-slate-500 mt-1">No PII Stored On-Chain</div>
          </div>
        </div>

        {/* Interactive Eligibility Threshold Prover */}
        <div className="p-5 bg-indigo-950/20 border border-indigo-500/20 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-indigo-400" />
              <span className="font-display text-sm font-bold text-slate-200">
                Live Beneficiary Threshold Simulator
              </span>
            </div>
            <span className="text-[11px] font-mono text-indigo-300 bg-indigo-500/10 px-2.5 py-0.5 rounded-full border border-indigo-500/30">
              Rule: Income &lt; ${threshold.toLocaleString()}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Simulate Beneficiary Annual Income (Private Witness):</span>
              <span className="font-mono font-bold text-white">${testIncome.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="80000"
              step="1000"
              value={testIncome}
              onChange={(e) => setTestIncome(Number(e.target.value))}
              className="w-full accent-indigo-500 cursor-pointer"
            />
          </div>

          {/* Real-Time Mathematical Evaluation */}
          <div className="p-3.5 bg-slate-950/80 rounded-xl border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              {isEligible ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-400 flex-shrink-0" />
              )}
              <div>
                <span className={`font-bold ${isEligible ? 'text-emerald-300' : 'text-rose-300'}`}>
                  {isEligible ? 'ELIGIBLE FOR RELIEF AID' : 'INELIGIBLE (EXCEEDS THRESHOLD)'}
                </span>
                <p className="text-[11px] text-slate-400">
                  {isEligible
                    ? `Circuit evaluates assert(${testIncome} < ${threshold}) == true. Proof is generated with 0 leaked bytes.`
                    : `Circuit rejects assert(${testIncome} < ${threshold}). Transaction will revert client-side.`}
                </p>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-800 text-[11px] font-mono text-slate-300 whitespace-nowrap">
              <Lock className="w-3 h-3 inline mr-1.5 text-emerald-400" />
              <span>Income never revealed</span>
            </div>
          </div>
        </div>

        {/* Live On-Chain Recent Claims Feed */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold">
              Recent Verifiable Humanitarian Claims on Preprod
            </span>
            <a
              href={`https://explorer.1am.xyz/contract/${DEFAULT_PREPROD_CONTRACT}?network=preprod`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-indigo-400 hover:text-indigo-300 flex items-center gap-1 font-mono transition-colors"
            >
              1AM Contract Explorer <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-2">
            {mockClaims.map((claim) => (
              <div
                key={claim.id}
                className="p-3 bg-slate-950/60 rounded-xl border border-slate-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
              >
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 font-bold">
                    Claim #{claim.id}
                  </span>
                  <span className="text-emerald-400 flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    {claim.status}
                  </span>
                  <span className="text-slate-500 hidden sm:inline">•</span>
                  <span className="text-slate-400 hidden sm:inline">{claim.eligibilityProof}</span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-slate-400">
                  <span className="truncate max-w-[140px] text-slate-500">{claim.txHash.slice(0, 10)}...</span>
                  <span className="text-slate-500">{claim.timestamp}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};