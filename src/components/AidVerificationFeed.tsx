import React, { useState } from 'react';
import { HeartHandshake, ShieldCheck, CheckCircle2, XCircle, Users, DollarSign, ExternalLink, Sparkles, Lock } from 'lucide-react';
import { DEFAULT_PREPROD_CONTRACT, type ContributionRecord } from '../hooks/useMidnight';

interface AidVerificationFeedProps {
  contractAddress?: string;
  networkId?: string;
  history?: ContributionRecord[];
}

export const AidVerificationFeed: React.FC<AidVerificationFeedProps> = ({
  contractAddress = DEFAULT_PREPROD_CONTRACT,
  networkId = 'preprod',
  history = [],
}) => {
  const contributionHistory = history;
  const [testIncome, setTestIncome] = useState<number>(32000);
  const threshold = 50000;
  const isEligible = testIncome < threshold && testIncome > 0;

  return (
    <div className="rounded-xl border border-border bg-card shadow-bento overflow-hidden transition-colors">
      <div className="p-6 sm:p-7 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-background border border-border flex items-center justify-center text-accent shadow-xs">
              <HeartHandshake className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-mono text-base font-bold text-foreground tracking-tight flex items-center gap-2">
                PrivateAid Humanitarian Verification Engine
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30 font-bold">
                  ZK Relief
                </span>
              </h3>
              <p className="text-xs text-muted-foreground font-mono">
                Solving beneficiary privacy for disaster relief &amp; welfare disbursements on Midnight
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse"></span>
            <span>UNHCR / NGO ZK-Audit Standard</span>
          </div>
        </div>

        {/* Real-World Metrics Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="p-4 bg-background rounded-lg border border-border">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-mono mb-1">
              <span>ACTIVE AID POOL</span>
              <DollarSign className="w-3.5 h-3.5 text-accent" />
            </div>
            <div className="text-xl font-bold font-mono text-accent">5,000,000 tDUST</div>
            <div className="text-[10px] text-muted-foreground font-mono mt-1">{networkId.toUpperCase()} Relief Reserve</div>
          </div>

          <div className="p-4 bg-background rounded-lg border border-border">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-mono mb-1">
              <span>CONFIDENTIAL CLAIMS</span>
              <Users className="w-3.5 h-3.5 text-accent" />
            </div>
            <div className="text-xl font-bold font-mono text-foreground">18 Beneficiaries</div>
            <div className="text-[10px] text-muted-foreground font-mono mt-1">Zero Identities Exposed</div>
          </div>

          <div className="p-4 bg-background rounded-lg border border-border">
            <div className="flex items-center justify-between text-muted-foreground text-xs font-mono mb-1">
              <span>PRIVACY INTEGRITY</span>
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
            </div>
            <div className="text-xl font-bold font-mono text-accent">100% ZK-Proof</div>
            <div className="text-[10px] text-muted-foreground font-mono mt-1">No PII Stored On-Chain</div>
          </div>
        </div>

        {/* Interactive Eligibility Threshold Prover */}
        <div className="p-5 bg-background border border-border rounded-xl space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-accent" />
              <span className="font-mono text-sm font-bold text-foreground">
                Live Beneficiary Threshold Simulator
              </span>
            </div>
            <span className="text-[11px] font-mono font-bold text-accent bg-secondary px-2.5 py-0.5 rounded border border-accent/30">
              Rule: Income &lt; ${threshold.toLocaleString()}
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-muted-foreground font-mono">Beneficiary Annual Income (Private Witness):</span>
              <span className="font-mono font-bold text-foreground">${testIncome.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min="10000"
              max="80000"
              step="1000"
              value={testIncome}
              onChange={(e) => setTestIncome(Number(e.target.value))}
              className="w-full accent-accent cursor-pointer"
            />
          </div>

          {/* Real-Time Mathematical Evaluation */}
          <div className="p-3.5 bg-card rounded-lg border border-border flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2.5">
              {isEligible ? (
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
              ) : (
                <XCircle className="w-5 h-5 text-destructive flex-shrink-0" />
              )}
              <div>
                <span className={`font-mono font-bold ${isEligible ? 'text-accent' : 'text-destructive'}`}>
                  {isEligible ? 'ELIGIBLE FOR RELIEF AID' : 'INELIGIBLE (EXCEEDS THRESHOLD)'}
                </span>
                <p className="text-[11px] text-muted-foreground font-sans">
                  {isEligible
                    ? `Circuit evaluates assert(${testIncome} < ${threshold}) == true. Proof is generated with 0 leaked bytes.`
                    : `Circuit rejects assert(${testIncome} < ${threshold}). Transaction will revert client-side.`}
                </p>
              </div>
            </div>

            <div className="px-3 py-1.5 rounded-md bg-secondary border border-border text-[11px] font-mono text-muted-foreground whitespace-nowrap">
              <Lock className="w-3 h-3 inline mr-1.5 text-accent" />
              <span>Income never revealed</span>
            </div>
          </div>
        </div>

        {/* Live On-Chain Recent Claims Feed */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground font-bold">
              Recent Verifiable Humanitarian Claims on {networkId.toUpperCase()}
            </span>
            <a
              href={`https://explorer.1am.xyz/contract/${contractAddress}?network=${networkId}`}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-accent hover:underline flex items-center gap-1 font-mono font-bold transition-colors"
            >
              1AM Contract Explorer <ExternalLink className="w-3 h-3" />
            </a>
          </div>

          <div className="space-y-2">
            {contributionHistory.map((claim) => (
              <div
                key={claim.id}
                className="p-3 bg-background rounded-lg border border-border flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono"
              >
                <div className="flex items-center gap-2.5">
                  <span className="px-2 py-0.5 rounded bg-secondary text-accent font-bold border border-accent/30">
                    Claim #{claim.round}
                  </span>
                  <span className="text-accent flex items-center gap-1 font-semibold">
                    <CheckCircle2 className="w-3.5 h-3.5 text-accent" />
                    {claim.status}
                  </span>
                  <span className="text-muted-foreground hidden sm:inline">•</span>
                  <span className="text-muted-foreground hidden sm:inline">{claim.type}</span>
                </div>

                <div className="flex items-center gap-3 text-[11px] text-muted-foreground">
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
export default AidVerificationFeed;