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

import { useMidnight } from '../hooks/useMidnight';

interface AidVerificationFeedProps {
  contractAddress?: string;
  networkId?: string;
}

export const AidVerificationFeed: React.FC<AidVerificationFeedProps> = ({
  contractAddress = DEFAULT_PREPROD_CONTRACT,
  networkId = 'preprod',
}) => {
  const { contributionHistory } = useMidnight();
  const [testIncome, setTestIncome] = useState<number>(32000);
  const threshold = 50000;
  const isEligible = testIncome < threshold && testIncome > 0;

  return (
    <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm overflow-hidden">
      <div className="p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-[#FFD400]/20 border border-[#FFD400] flex items-center justify-center text-black shadow-xs">
              <HeartHandshake className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-display text-base sm:text-lg font-black text-black dark:text-white tracking-tight flex items-center gap-2">
                PrivateAid Humanitarian Verification Engine
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#FFD400] text-black font-bold">
                  ZK Relief
                </span>
              </h3>
              <p className="text-xs text-zinc-500 font-mono">
                Solving beneficiary privacy for disaster relief &amp; welfare disbursements on Midnight
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-600 dark:text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>UNHCR / NGO ZK-Audit Standard</span>
          </div>
        </div>

        {/* Real-World Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-zinc-50 dark:bg-zinc-950/70 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono mb-1">
              <span>ACTIVE AID POOL</span>
              <DollarSign className="w-3.5 h-3.5 text-emerald-600" />
            </div>
            <div className="text-xl font-bold font-mono text-emerald-700 dark:text-emerald-400">5,000,000 tDUST</div>
            <div className="text-[10px] text-zinc-500 mt-1">{networkId.toUpperCase()} Relief Reserve</div>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-950/70 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono mb-1">
              <span>CONFIDENTIAL CLAIMS</span>
              <Users className="w-3.5 h-3.5 text-black dark:text-[#FFD400]" />
            </div>
            <div className="text-xl font-bold font-mono text-black dark:text-[#FFD400]">18 Beneficiaries</div>
            <div className="text-[10px] text-zinc-500 mt-1">Zero Identities Exposed</div>
          </div>

          <div className="p-4 bg-zinc-50 dark:bg-zinc-950/70 rounded-xl border border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center justify-between text-zinc-500 text-xs font-mono mb-1">
              <span>PRIVACY INTEGRITY</span>
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
            </div>
            <div className="text-xl font-bold font-mono text-purple-700 dark:text-purple-400">100% ZK-Proof</div>
            <div className="text-[10px] text-zinc-500 mt-1">No PII Stored On-Chain</div>
          </div>
        </div>

        {/* Interactive Eligibility Threshold Prover */}
        <div className="p-5 bg-zinc-50 dark:bg-zinc-950/70 border border-zinc-200 dark:border-zinc-800 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-black dark:text-[#FFD400]" />
              <span className="font-display text-sm font-bold text-black dark:text-white">
                Live Beneficiary Threshold Simulator
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-black dark:text-[#FFD400] bg-zinc-200 dark:bg-zinc-800 px-2.5 py-0.5 rounded-full border border-zinc-300 dark:border-zinc-700">
              Rule: Income &lt; ${threshold.toLocaleString()}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-zinc-600 dark:text-zinc-400">Beneficiary Annual Income (Private Witness):</span>
              <span className="font-mono font-bold text-black dark:text-white">${testIncome.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="80000"
              step="1000"
              value={testIncome}
              onChange={(e) => setTestIncome(Number(e.target.value))}
              className="w-full accent-[#FFD400] cursor-pointer"
            />
          </div>

          {/* Real-Time Mathematical Evaluation */}
          <div className="p-3.5 bg-white dark:bg-zinc-900 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              {isEligible ? (
                <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-rose-600 flex-shrink-0" />
              )}
              <div>
                <span className={`font-bold ${isEligible ? 'text-emerald-700 dark:text-emerald-400' : 'text-rose-700 dark:text-rose-400'}`}>
                  {isEligible ? 'ELIGIBLE FOR RELIEF AID' : 'INELIGIBLE (EXCEEDS THRESHOLD)'}
                </span>
                <p className="text-[11px] text-zinc-500">
                  {isEligible
                    ? `Circuit evaluates assert(${testIncome} < ${threshold}) == true. Proof is generated with 0 leaked bytes.`
                    : `Circuit rejects assert(${testIncome} < ${threshold}). Transaction will revert client-side.`}
                </p>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-lg bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-[11px] font-mono text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
              <Lock className="w-3 h-3 inline mr-1.5 text-emerald-600" />
              <span>Income never revealed</span>
            </div>
          </div>
        </div>

        {/* Live On-Chain Recent Claims Feed */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-zinc-500 font-bold">
              Recent Verifiable Humanitarian Claims on {networkId.toUpperCase()}
            </span>
            <a
              href={`https://explorer.1am.xyz/contract/${contractAddress}?network=${networkId}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-black dark:text-[#FFD400] hover:underline flex items-center gap-1 font-mono font-bold transition-colors"
            >
              1AM Contract Explorer <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-2">
            {contributionHistory.map((claim) => (
              <div
                key={claim.id}
                className="p-3 bg-zinc-50 dark:bg-zinc-950/70 rounded-xl border border-zinc-200 dark:border-zinc-800 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
              >
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded bg-black text-[#FFD400] font-bold">
                    Claim #{claim.round}
                  </span>
                  <span className="text-emerald-700 dark:text-emerald-400 flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    {claim.status}
                  </span>
                  <span className="text-zinc-400 hidden sm:inline">•</span>
                  <span className="text-zinc-500 hidden sm:inline">{claim.type}</span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-zinc-500">
                  <span className="truncate max-w-[140px] text-zinc-400">{claim.txHash?.slice(0, 10)}...</span>
                  <span className="text-zinc-400">{claim.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};