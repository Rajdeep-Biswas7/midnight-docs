import React, { useState, useEffect } from 'react';
import { useMidnight } from './hooks/useMidnight';
import { WalletConnect } from './components/WalletConnect';
import { CircuitCall } from './components/CircuitCall';
import { ProofVisualizer } from './components/ProofVisualizer';
import { AidVerificationFeed } from './components/AidVerificationFeed';
import { ContractStateViewer } from './components/ContractStateViewer';
import { ContributionHistoryFeed } from './components/ContributionHistoryFeed';
import { AnimatedBackground } from './components/AnimatedBackground';
import {
  ZkShieldBrandIcon,
  CircuitCoreIcon,
  WitnessEyeIcon,
  LedgerBlockIcon,
  EnergySparkIcon,
  QuantumLockIcon,
} from './components/CustomIcons';
import {
  ExternalLink,
  ShieldCheck,
  Activity,
  Terminal,
  Lock,
  Sun,
  Moon,
  Wallet,
  CheckCircle2,
  Copy,
  Check,
  Database,
  Cpu,
  HeartHandshake,
  Layers,
  Sparkles,
  RefreshCw,
} from 'lucide-react';

export const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'all' | 'circuits' | 'aid' | 'ledger'>('all');
  const [copiedContract, setCopiedContract] = useState(false);

  // Synchronize documentElement dark mode class for Tailwind
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  const {
    isConnected,
    isConnecting,
    walletName,
    unshieldedAddress,
    shieldedAddress,
    balances,
    error,
    networkId,
    activeNetwork,
    switchNetwork,
    availableWallets,
    connectWallet,
    disconnectWallet,
    callCircuit,
    circuitState,
    contractState,
    contributionHistory,
    refreshContractState,
  } = useMidnight();

  const handleCopyContract = () => {
    if (contractState.contractAddress) {
      navigator.clipboard.writeText(contractState.contractAddress);
      setCopiedContract(true);
      setTimeout(() => setCopiedContract(false), 2000);
    }
  };

  const truncateAddress = (addr: string | null) => {
    if (!addr) return '';
    return `${addr.slice(0, 10)}...${addr.slice(-6)}`;
  };

  return (
    <div
      className={`relative min-h-screen ${
        isDarkMode ? 'text-zinc-100 bg-[#030712]' : 'light-theme text-zinc-900 bg-[#FAFAFA]'
      } flex flex-col justify-between overflow-x-hidden selection:bg-[#FFD400] selection:text-black transition-colors duration-200`}
    >
      {/* Animated Interactive Particle Canvas Background */}
      <AnimatedBackground isDarkMode={isDarkMode} />

      {/* Foreground Main Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* ============================================================
            Top Cyber HUD Navigation (Cyphra Minimalist Aesthetic)
            ============================================================ */}
        <header
          className={`border-b ${
            isDarkMode ? 'border-zinc-800/80 bg-[#030712]/85' : 'border-zinc-200/90 bg-white/90'
          } backdrop-blur-xl sticky top-0 z-50 transition-colors`}
        >
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between gap-3">
            {/* Left: Brand Identity */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[#FFD400] flex items-center justify-center text-black shadow-xs font-black">
                <ZkShieldBrandIcon className="w-6 h-6 text-black" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-display text-lg font-black tracking-tight text-black dark:text-white">
                    PrivateAid
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-[#FFD400] text-black font-extrabold shadow-2xs">
                    MIDNIGHT
                  </span>
                </div>
                <p className="text-[11px] text-zinc-500 font-mono hidden sm:block">
                  Confidential Humanitarian State Machine
                </p>
              </div>
            </div>

            {/* Center Navigation Links (Cyphra Filter Pills) */}
            <div className="hidden md:flex items-center gap-1 p-1 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl text-xs font-mono">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3 py-1 rounded-lg transition-all font-bold ${
                  activeTab === 'all'
                    ? 'bg-black text-[#FFD400] dark:bg-white dark:text-black shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
              >
                Dashboard
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('circuits')}
                className={`px-3 py-1 rounded-lg transition-all font-bold ${
                  activeTab === 'circuits'
                    ? 'bg-black text-[#FFD400] dark:bg-white dark:text-black shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
              >
                ZK Circuits
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('aid')}
                className={`px-3 py-1 rounded-lg transition-all font-bold ${
                  activeTab === 'aid'
                    ? 'bg-black text-[#FFD400] dark:bg-white dark:text-black shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
              >
                Aid Engine
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ledger')}
                className={`px-3 py-1 rounded-lg transition-all font-bold ${
                  activeTab === 'ledger'
                    ? 'bg-black text-[#FFD400] dark:bg-white dark:text-black shadow-xs'
                    : 'text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white'
                }`}
              >
                Audit Feed
              </button>
            </div>

            {/* Right: Network Toggle, Live Block, Theme & Wallet */}
            <div className="flex items-center gap-2 text-xs font-mono">
              {/* Network Toggle (Preprod / Preview) */}
              <div className="flex items-center p-0.5 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg">
                <button
                  type="button"
                  onClick={() => switchNetwork('preprod')}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all ${
                    activeNetwork === 'preprod'
                      ? 'bg-black text-[#FFD400] dark:bg-zinc-800 dark:text-[#FFD400]'
                      : 'text-zinc-500 hover:text-black dark:hover:text-white'
                  }`}
                >
                  Preprod
                </button>
                <button
                  type="button"
                  onClick={() => switchNetwork('preview')}
                  className={`px-2 py-1 rounded-md text-[11px] font-bold transition-all ${
                    activeNetwork === 'preview'
                      ? 'bg-black text-[#FFD400] dark:bg-zinc-800 dark:text-[#FFD400]'
                      : 'text-zinc-500 hover:text-black dark:hover:text-white'
                  }`}
                >
                  Preview
                </button>
              </div>

              {/* Live Indexer Block Height */}
              <div
                title="Midnight Consensus Block Height"
                className="hidden lg:flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 text-[11px] font-mono text-zinc-600 dark:text-zinc-300"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{contractState.blockHeight ? `#${contractState.blockHeight.toLocaleString()}` : '#2,677,185'}</span>
              </div>

              {/* Theme Toggle (Dark / Light) */}
              <button
                type="button"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-zinc-800 transition-colors shadow-2xs"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-[#FFD400]" /> : <Moon className="w-4 h-4 text-zinc-800" />}
              </button>

              {/* Quick 1AM Wallet Trigger Button */}
              {isConnected ? (
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-300 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300 font-bold text-xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{truncateAddress(unshieldedAddress)}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => connectWallet('1am')}
                  disabled={isConnecting}
                  className="px-3.5 py-1.5 rounded-lg bg-[#FFD400] hover:bg-[#E5BE00] active:scale-95 text-black font-extrabold text-xs transition-all shadow-xs border border-black/10 flex items-center gap-1.5"
                >
                  <Wallet className="w-3.5 h-3.5 text-black" />
                  <span>{isConnecting ? 'Connecting...' : 'Connect 1AM'}</span>
                </button>
              )}

              {/* GitHub Link */}
              <a
                href="https://github.com/Rajdeep-Biswas7/midnight-docs"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-zinc-100 dark:bg-zinc-900 hover:bg-zinc-200 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-black dark:hover:text-white border border-zinc-200 dark:border-zinc-800 transition-colors"
                title="GitHub Repository"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </header>

        {/* Live Midnight Consensus Telemetry Ribbon */}
        <div
          className={`border-b ${
            isDarkMode ? 'border-zinc-800/60 bg-zinc-950/60 text-zinc-400' : 'border-zinc-200 bg-zinc-100 text-zinc-600'
          } backdrop-blur-md overflow-x-auto py-2`}
        >
          <div className="max-w-6xl mx-auto px-4 flex items-center justify-between gap-6 text-[11px] font-mono whitespace-nowrap">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-black dark:text-[#FFD400] animate-pulse" />
              <span>CONSENSUS:</span>
              <span className="text-black dark:text-[#FFD400] font-bold uppercase">{activeNetwork} ACTIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-emerald-600" />
              <span>OFF-CHAIN WITNESS:</span>
              <span className="text-emerald-700 dark:text-emerald-400 font-bold">STRICTLY LOCAL MEMORY</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-cyan-600" />
              <span>PROVER:</span>
              <span className="text-cyan-700 dark:text-cyan-400 font-bold">CLIENT WASM (BLS12-381)</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>DAPP CONNECTOR:</span>
              <span className="text-purple-700 dark:text-purple-400 font-bold">CAIP-372 / API v4.0.1</span>
            </div>
          </div>
        </div>

        {/* Main Application Content */}
        <main className="max-w-4xl mx-auto px-4 py-8 sm:py-10 w-full space-y-7 flex-1">
          {/* Hero Banner with Cyphra Minimalist Aesthetic */}
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-100 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 text-zinc-800 dark:text-zinc-200 text-xs font-mono font-bold shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-black dark:text-[#FFD400]" />
              <span>Midnight Network • CAIP-372 Verified ZK DApp</span>
            </div>

            <h1 className="font-display text-3xl sm:text-5xl font-black tracking-tight text-black dark:text-white leading-tight">
              Confidential State Machine
            </h1>

            <p className="text-sm sm:text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans max-w-xl mx-auto">
              Synthesize zero-knowledge proofs directly in browser memory. Increment community aid tallies and verify relief claims on Midnight without disclosing beneficiary identities.
            </p>
          </div>

          {/* 4-Column Live Telemetry Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 text-xs font-mono">
            {/* Card 1: Verified Contract Hex */}
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-zinc-500">
                <span className="font-bold">VERIFIED CONTRACT</span>
                <Database className="w-3.5 h-3.5 text-black dark:text-[#FFD400]" />
              </div>
              <div className="font-mono text-sm font-bold text-black dark:text-white truncate">
                {truncateAddress(contractState.contractAddress)}
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
                <button
                  type="button"
                  onClick={handleCopyContract}
                  className="text-zinc-500 hover:text-black dark:hover:text-white transition-colors flex items-center gap-1 font-bold"
                >
                  {copiedContract ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedContract ? 'Copied' : 'Copy Hex'}</span>
                </button>
                <a
                  href={`https://explorer.1am.xyz/contract/${contractState.contractAddress}?network=${activeNetwork}`}
                  target="_blank"
                  rel="noreferrer"
                  className="text-black dark:text-[#FFD400] hover:underline font-bold flex items-center gap-0.5"
                >
                  <span>1AM</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>

            {/* Card 2: Current Ledger Round */}
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-zinc-500">
                <span className="font-bold">LEDGER ROUND</span>
                <Cpu className="w-3.5 h-3.5 text-emerald-600" />
              </div>
              <div className="font-mono text-2xl font-black text-black dark:text-white tabular-nums">
                #{contractState.round}
              </div>
              <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-bold pt-1 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                <span>Sequence Verified</span>
              </div>
            </div>

            {/* Card 3: Disclosed Total */}
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-zinc-500">
                <span className="font-bold">DISCLOSED TOTAL</span>
                <HeartHandshake className="w-3.5 h-3.5 text-purple-600" />
              </div>
              <div className="font-mono text-2xl font-black text-black dark:text-[#FFD400] tabular-nums">
                {contractState.totalValue.toLocaleString()}
              </div>
              <div className="text-[11px] text-zinc-500 pt-1 border-t border-zinc-100 dark:border-zinc-800/80">
                tDUST Disclosed Pool
              </div>
            </div>

            {/* Card 4: Midnight Consensus Block */}
            <div className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-2xs space-y-2">
              <div className="flex items-center justify-between text-zinc-500">
                <span className="font-bold">BLOCK HEIGHT</span>
                <Layers className="w-3.5 h-3.5 text-cyan-600" />
              </div>
              <div className="font-mono text-2xl font-black text-emerald-700 dark:text-emerald-400 tabular-nums">
                {contractState.blockHeight ? `#${contractState.blockHeight.toLocaleString()}` : '#2,677,185'}
              </div>
              <div className="text-[11px] text-zinc-500 pt-1 border-t border-zinc-100 dark:border-zinc-800/80 flex items-center justify-between">
                <span>{activeNetwork.toUpperCase()}</span>
                <button
                  type="button"
                  onClick={refreshContractState}
                  className="hover:text-black dark:hover:text-white transition-colors"
                  title="Sync Indexer"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Conditional View Rendering based on activeTab */}
          {(activeTab === 'all' || activeTab === 'circuits') && (
            <div className="space-y-6">
              {/* 1AM Wallet Connection Panel */}
              <WalletConnect
                isConnected={isConnected}
                isConnecting={isConnecting}
                walletName={walletName}
                unshieldedAddress={unshieldedAddress}
                shieldedAddress={shieldedAddress}
                balances={balances}
                error={error}
                networkId={networkId}
                availableWallets={availableWallets}
                onConnect={connectWallet}
                onDisconnect={disconnectWallet}
              />

              {/* On-Chain State Viewer */}
              <ContractStateViewer
                contractState={contractState}
                networkId={networkId}
                onRefresh={refreshContractState}
              />

              {/* Interactive ZK Circuit Prover */}
              <CircuitCall
                isConnected={isConnected}
                circuitState={circuitState}
                activeNetwork={activeNetwork}
                onCallCircuit={callCircuit}
              />

              {/* Step-by-Step ZK Execution Visualizer */}
              <ProofVisualizer />
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'aid') && (
            <div className="space-y-6">
              {/* Humanitarian Aid Verification Feed & Simulator */}
              <AidVerificationFeed
                contractAddress={contractState.contractAddress}
                networkId={networkId}
              />
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'ledger') && (
            <div className="space-y-6">
              {/* On-Chain Contribution & Transition Feed */}
              <ContributionHistoryFeed
                history={contributionHistory}
                contractAddress={contractState.contractAddress}
                networkId={networkId}
              />
            </div>
          )}

          {/* Privacy Architecture Explainer Card */}
          <div className="rounded-2xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900/90 shadow-sm overflow-hidden">
            <div className="p-6 sm:p-7 space-y-4">
              <h3 className="font-display text-base font-black text-black dark:text-white flex items-center gap-2">
                <ZkShieldBrandIcon className="w-5 h-5 text-black dark:text-[#FFD400]" />
                <span>Zero-Knowledge Soundness &amp; Security Architecture</span>
              </h3>

              <div className="grid sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 bg-zinc-50 dark:bg-zinc-950/70 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2 text-purple-700 dark:text-purple-400 font-bold">
                    <WitnessEyeIcon className="w-4 h-4" />
                    <span>1. Off-Chain Witness</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                    The caller passes <code className="text-purple-700 dark:text-purple-400 font-mono">secretIncrement()</code> in browser RAM. Zero bytes are transmitted across networks or leaked in transactions.
                  </p>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-950/70 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2 text-cyan-700 dark:text-cyan-400 font-bold">
                    <CircuitCoreIcon className="w-4 h-4" />
                    <span>2. Client Prover</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                    Compact ZK circuit verifies that the secret is positive and computes the tally mathematically without disclosing the secret input.
                  </p>
                </div>

                <div className="p-4 bg-zinc-50 dark:bg-zinc-950/70 rounded-xl border border-zinc-200 dark:border-zinc-800 space-y-2">
                  <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold">
                    <LedgerBlockIcon className="w-4 h-4" />
                    <span>3. Ledger Seal</span>
                  </div>
                  <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed font-sans">
                    Only the updated round sequence and cumulative relief total are published on Midnight via <code className="text-emerald-700 dark:text-emerald-400 font-mono">disclose()</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer (Cyphra Minimalist & Razor-Sharp) */}
        <footer
          className={`border-t ${
            isDarkMode ? 'border-zinc-800/80 bg-[#030712]/90 text-zinc-500' : 'border-zinc-200 bg-white text-zinc-600'
          } py-6 text-xs backdrop-blur-md`}
        >
          <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-mono">
              © 2026 PrivateAid • Powered by Midnight Network &amp; Compact Smart Contracts
            </p>
            <div className="flex items-center gap-5 font-mono">
              <a
                href="https://docs.midnight.network"
                target="_blank"
                rel="noreferrer"
                className="hover:text-black dark:hover:text-[#FFD400] transition-colors flex items-center gap-1 font-bold"
              >
                Docs <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://1am.xyz"
                target="_blank"
                rel="noreferrer"
                className="hover:text-black dark:hover:text-[#FFD400] transition-colors flex items-center gap-1 font-bold"
              >
                1AM Wallet <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://midnight-tmnight-preprod.nethermind.dev"
                target="_blank"
                rel="noreferrer"
                className="hover:text-emerald-600 transition-colors flex items-center gap-1 font-bold"
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