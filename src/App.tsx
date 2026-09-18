import React from 'react';
import { useMidnight } from './hooks/useMidnight';
import { WalletConnect } from './components/WalletConnect';
import { CircuitCall } from './components/CircuitCall';
import { ProofVisualizer } from './components/ProofVisualizer';
import { AidVerificationFeed } from './components/AidVerificationFeed';
import { AnimatedBackground } from './components/AnimatedBackground';
import {
  ZkShieldBrandIcon,
  CircuitCoreIcon,
  WitnessEyeIcon,
  LedgerBlockIcon,
  EnergySparkIcon,
} from './components/CustomIcons';
import { ExternalLink, ShieldCheck, Activity, Terminal, Lock } from 'lucide-react';

export const App: React.FC = () => {
  const {
    isConnected,
    isConnecting,
    walletName,
    unshieldedAddress,
    shieldedAddress,
    error,
    networkId,
    availableWallets,
    connectWallet,
    disconnectWallet,
    callCircuit,
    circuitState,
  } = useMidnight();

  return (
    <div className="relative min-h-screen text-slate-100 flex flex-col justify-between overflow-x-hidden selection:bg-indigo-500 selection:text-white">
      {/* Animated Interactive Particle & Nebula Canvas Background */}
      <AnimatedBackground />

      {/* Foreground Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Top Header / Cyber HUD Navigation */}
        <header className="border-b border-indigo-500/15 bg-slate-950/75 backdrop-blur-xl sticky top-0 z-50">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex items-center justify-between">
            {/* Brand Title & Custom Logo */}
            <div className="flex items-center gap-3">
              <div className="p-1.5 rounded-xl bg-indigo-500/10 border border-indigo-500/25 shadow-lg shadow-indigo-500/20">
                <ZkShieldBrandIcon className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-base sm:text-lg font-extrabold tracking-tight text-white glow-text-indigo">
                    PrivateAid
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/15 text-indigo-300 border border-indigo-500/30 font-semibold">
                    ZK-Counter
                  </span>
                </div>
                <p className="text-[11px] text-slate-400 hidden sm:flex items-center gap-1.5 font-sans">
                  Zero-Knowledge Privacy DApp on Midnight Network
                </p>
              </div>
            </div>

            {/* Network & Live Status Indicators */}
            <div className="flex items-center gap-2 sm:gap-3 text-xs">
              <div className="px-3 py-1 rounded-full bg-slate-900/90 border border-indigo-500/30 text-slate-300 font-mono flex items-center gap-2 shadow-inner">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                <span className="text-emerald-400 font-bold uppercase tracking-wider text-[11px]">
                  {networkId}
                </span>
              </div>

              <a
                href="https://github.com/Rajdeep-Biswas7/midnight-docs"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-400 hover:text-white transition-all border border-slate-800 hover:border-indigo-500/40 shadow-sm"
                title="GitHub Repository"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </header>

        {/* Live Cyber Telemetry Ribbon */}
        <div className="border-b border-indigo-500/10 bg-slate-950/40 backdrop-blur-md overflow-x-auto py-2">
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-6 text-[11px] font-mono text-slate-400 whitespace-nowrap">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-indigo-400 animate-pulse" />
              <span>ZKP ENGINE:</span>
              <span className="text-indigo-300 font-bold">COMPACT 0.31.1</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-400" />
              <span>OFF-CHAIN WITNESS:</span>
              <span className="text-emerald-300 font-bold">STRICTLY CONFIDENTIAL</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <span>PROVER:</span>
              <span className="text-cyan-300 font-bold">BROWSER WASM</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-400" />
              <span>PROTOCOL:</span>
              <span className="text-purple-300 font-bold">LEVEL 2 SPEC</span>
            </div>
          </div>
        </div>

        {/* Main Application Content */}
        <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 w-full space-y-8 flex-1">
          {/* Hero Banner with Futuristic Glow */}
          <div className="text-center space-y-4 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-emerald-500/10 border border-indigo-500/30 text-indigo-300 text-xs font-mono font-medium shadow-md shadow-indigo-500/10">
              <EnergySparkIcon className="w-3.5 h-3.5 text-indigo-400" />
              <span>Midnight Builder Challenge • Level 2 Verified</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-extrabold tracking-tight text-white leading-tight">
              Confidential State Transitions
            </h1>

            <p className="text-sm sm:text-base text-slate-300/90 leading-relaxed font-sans max-w-xl mx-auto">
              Synthesize zero-knowledge proofs client-side directly in your browser. Increment the contract tally without disclosing your secret witness input.
            </p>
          </div>

          {/* Interactive Flow Stepper & Simulator */}
          <ProofVisualizer />

          {/* Core Interactive DApp Cards */}
          <div className="space-y-6">
            <WalletConnect
              isConnected={isConnected}
              isConnecting={isConnecting}
              walletName={walletName}
              unshieldedAddress={unshieldedAddress}
              shieldedAddress={shieldedAddress}
              error={error}
              networkId={networkId}
              availableWallets={availableWallets}
              onConnect={connectWallet}
              onDisconnect={disconnectWallet}
            />

            <CircuitCall
              isConnected={isConnected}
              circuitState={circuitState}
              onCallCircuit={callCircuit}
            />

            {/* Real-World Humanitarian Aid Verification & Preprod Claims Feed */}
            <AidVerificationFeed />
          </div>

          {/* Privacy Architecture Explainer Card with Bespoke Icons */}
          <div className="radiant-card-wrap">
            <div className="radiant-card-content p-6 sm:p-7 space-y-4">
              <h3 className="font-display text-base font-bold text-white flex items-center gap-2">
                <ZkShieldBrandIcon className="w-5 h-5 text-indigo-400" />
                <span>Zero-Knowledge Security Architecture</span>
              </h3>

              <div className="grid sm:grid-cols-3 gap-4 text-xs">
                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/90 space-y-2">
                  <div className="flex items-center gap-2 text-indigo-400 font-bold font-display">
                    <WitnessEyeIcon className="w-4 h-4 text-purple-400" />
                    <span>1. Off-Chain Witness</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    The caller provides <code className="text-indigo-300 font-mono">secretIncrement()</code> in browser memory. Never transmitted across the network or committed to storage.
                  </p>
                </div>

                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/90 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-400 font-bold font-display">
                    <CircuitCoreIcon className="w-4 h-4 text-cyan-400" />
                    <span>2. Client-Side Prover</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Compact ZK circuit verifies that the secret is positive and computes the tally mathematically without revealing the secret value.
                  </p>
                </div>

                <div className="p-4 bg-slate-950/60 rounded-xl border border-slate-800/90 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-400 font-bold font-display">
                    <LedgerBlockIcon className="w-4 h-4 text-emerald-400" />
                    <span>3. Ledger Disclosure</span>
                  </div>
                  <p className="text-slate-400 leading-relaxed">
                    Only the validated round index and cumulative total are sealed on-chain via <code className="text-emerald-400 font-mono">disclose()</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t border-indigo-500/15 py-6 text-xs text-slate-500 bg-slate-950/80 backdrop-blur-md">
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-mono text-slate-400">
              © 2026 PrivateAid • Powered by Midnight Network &amp; Compact
            </p>
            <div className="flex items-center gap-5">
              <a
                href="https://docs.midnight.network"
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-300 transition-colors flex items-center gap-1 font-medium"
              >
                Docs <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://1am.xyz"
                target="_blank"
                rel="noreferrer"
                className="hover:text-indigo-300 transition-colors flex items-center gap-1 font-medium"
              >
                1am Wallet <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://midnight-tmnight-preprod.nethermind.dev"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-400 transition-colors flex items-center gap-1 font-medium"
              >
                Preprod Faucet <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
