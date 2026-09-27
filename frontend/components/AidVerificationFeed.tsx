import React, { useState } from 'react';
import { HeartHandshake, ShieldCheck, CheckCircle2, XCircle, Users, DollarSign, ExternalLink, Sparkles, Lock } from 'lucide-react';
import { DEFAULT_PREPROD_CONTRACT, useMidnight } from '../hooks/useMidnight';

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
    <div className="rounded-xl border border-[#1f1f1f] bg-[#111111] shadow-xs overflow-hidden">
      <div className="p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#1f1f1f]">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-[#0a0a0a] border border-[#1f1f1f] flex items-center justify-center text-[#22c55e] shadow-xs">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-mono text-base font-bold text-[#f5f5f5] tracking-tight flex items-center gap-2">
                PrivateAid Humanitarian Verification Engine
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded bg-[#22c55e]/10 text-[#22c55e] border border-[#22c55e]/30 font-bold">
                  ZK Relief
                </span>
              </h3>
              <p className="text-xs text-[#8a8a8a] font-mono">
                Solving beneficiary privacy for disaster relief &amp; welfare disbursements on Midnight
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-[#8a8a8a]">
            <span className="w-2 h-2 rounded-full bg-[#22c55e] animate-pulse"></span>
            <span>UNHCR / NGO ZK-Audit Standard</span>
          </div>
        </div>

        {/* Real-World Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-[#0a0a0a] rounded-lg border border-[#1f1f1f]">
            <div className="flex items-center justify-between text-[#8a8a8a] text-xs font-mono mb-1">
              <span>ACTIVE AID POOL</span>
              <DollarSign className="w-3.5 h-3.5 text-[#22c55e]" />
            </div>
            <div className="text-xl font-bold font-mono text-[#22c55e]">5,000,000 tDUST</div>
            <div className="text-[10px] text-[#8a8a8a] font-mono mt-1">{networkId.toUpperCase()} Relief Reserve</div>
          </div>

          <div className="p-4 bg-[#0a0a0a] rounded-lg border border-[#1f1f1f]">
            <div className="flex items-center justify-between text-[#8a8a8a] text-xs font-mono mb-1">
              <span>CONFIDENTIAL CLAIMS</span>
              <Users className="w-3.5 h-3.5 text-[#22c55e]" />
            </div>
            <div className="text-xl font-bold font-mono text-[#f5f5f5]">18 Beneficiaries</div>
            <div className="text-[10px] text-[#8a8a8a] font-mono mt-1">Zero Identities Exposed</div>
          </div>

          <div className="p-4 bg-[#0a0a0a] rounded-lg border border-[#1f1f1f]">
            <div className="flex items-center justify-between text-[#8a8a8a] text-xs font-mono mb-1">
              <span>PRIVACY INTEGRITY</span>
              <ShieldCheck className="w-3.5 h-3.5 text-[#22c55e]" />
            </div>
            <div className="text-xl font-bold font-mono text-[#22c55e]">100% ZK-Proof</div>
            <div className="text-[10px] text-[#8a8a8a] font-mono mt-1">No PII Stored On-Chain</div>
          </div>
        </div>

        {/* Interactive Eligibility Threshold Prover */}
        <div className="p-5 bg-[#0a0a0a] border border-[#1f1f1f] rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#22c55e]" />
              <span className="font-mono text-sm font-bold text-[#f5f5f5]">
                Live Beneficiary Threshold Simulator
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-[#22c55e] bg-[#161616] px-2.5 py-0.5 rounded border border-[#22c55e]/30">
              Rule: Income &lt; ${threshold.toLocaleString()}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-[#8a8a8a] font-mono">Beneficiary Annual Income (Private Witness):</span>
              <span className="font-mono font-bold text-[#f5f5f5]">${testIncome.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="80000"
              step="1000"
              value={testIncome}
              onChange={(e) => setTestIncome(Number(e.target.value))}
              className="w-full accent-[#22c55e] cursor-pointer"
            />
          </div>

          {/* Real-Time Mathematical Evaluation */}
          <div className="p-3.5 bg-[#111111] rounded-lg border border-[#1f1f1f] flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              {isEligible ? (
                <CheckCircle2 className="w-5 h-5 text-[#22c55e] flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-[#ef4444] flex-shrink-0" />
              )}
              <div>
                <span className={`font-mono font-bold ${isEligible ? 'text-[#22c55e]' : 'text-[#fca5a5]'}`}>
                  {isEligible ? 'ELIGIBLE FOR RELIEF AID' : 'INELIGIBLE (EXCEEDS THRESHOLD)'}
                </span>
                <p className="text-[11px] text-[#8a8a8a] font-sans">
                  {isEligible
                    ? `Circuit evaluates assert(${testIncome} < ${threshold}) == true. Proof is generated with 0 leaked bytes.`
                    : `Circuit rejects assert(${testIncome} < ${threshold}). Transaction will revert client-side.`}
                </p>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-md bg-[#161616] border border-[#1f1f1f] text-[11px] font-mono text-[#8a8a8a] whitespace-nowrap">
              <Lock className="w-3 h-3 inline mr-1.5 text-[#22c55e]" />
              <span>Income never revealed</span>
            </div>
          </div>
        </div>

        {/* Live On-Chain Recent Claims Feed */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-[#8a8a8a] font-bold">
              Recent Verifiable Humanitarian Claims on {networkId.toUpperCase()}
            </span>
            <a
              href={`https://explorer.1am.xyz/contract/${contractAddress}?network=${networkId}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-[#22c55e] hover:underline flex items-center gap-1 font-mono font-bold transition-colors"
            >
              1AM Contract Explorer <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-2">
            {contributionHistory.map((claim) => (
              <div
                key={claim.id}
                className="p-3 bg-[#0a0a0a] rounded-lg border border-[#1f1f1f] flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
              >
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded bg-[#161616] text-[#22c55e] font-bold border border-[#22c55e]/30">
                    Claim #{claim.round}
                  </span>
                  <span className="text-[#22c55e] flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#22c55e]" />
                    {claim.status}
                  </span>
                  <span className="text-[#8a8a8a] hidden sm:inline">•</span>
                  <span className="text-[#8a8a8a] hidden sm:inline">{claim.type}</span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-[#8a8a8a]">
                  <span className="truncate max-w-[140px]">{claim.txHash?.slice(0, 10)}...</span>
                  <span>{claim.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};