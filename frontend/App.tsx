import React, { useState, useEffect } from 'react';
import { useMidnight, DEFAULT_PREPROD_DEPLOY_TX } from './hooks/useMidnight';
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
} from './components/CustomIcons';
import {
  ExternalLink,
  ShieldCheck,
  Activity,
  Terminal,
  Lock,
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
  Sun,
  Moon,
} from 'lucide-react';

export const App: React.FC = () => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [activeTab, setActiveTab] = useState<'all' | 'circuits' | 'aid' | 'ledger'>('all');
  const [copiedContract, setCopiedContract] = useState(false);

  // Full Headline Typing Animation that never clips
  const fullHeadline = 'Confidential State Machine';
  const [displayedHeadline, setDisplayedHeadline] = useState('');

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      index++;
      if (index <= fullHeadline.length) {
        setDisplayedHeadline(fullHeadline.slice(0, index));
      } else {
        clearInterval(interval);
      }
    }, 40); // 40ms * 26 chars = ~1.04s total duration
    return () => clearInterval(interval);
  }, []);

  // Synchronize documentElement dark mode class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
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
    <div className="relative min-h-screen text-foreground bg-background flex flex-col justify-between overflow-x-hidden selection:bg-accent selection:text-accent-foreground font-sans transition-colors duration-200">
      {/* Subtle Anchor Grid & Keppel Particle Engine */}
      <AnimatedBackground isDarkMode={isDarkMode} />

      {/* Foreground Main Container */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* ============================================================
            Top Developer Terminal HUD Navigation (Spanning Full Laptop Width)
            ============================================================ */}
        <header className="border-b border-border bg-background/80 backdrop-blur-xl sticky top-0 z-50 transition-colors">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-3.5 flex items-center justify-between gap-4">
            {/* Left: Brand Identity */}
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-card border border-border flex items-center justify-center text-accent shadow-bento">
                <ZkShieldBrandIcon className="w-5 h-5" />
              </div>
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-base font-bold tracking-tight text-foreground">
                    PrivateAid
                  </span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-accent/15 text-accent border border-accent/30 font-bold">
                    MIDNIGHT
                  </span>
                </div>
                <p className="text-[11px] text-muted-foreground font-mono hidden sm:block">
                  Confidential Humanitarian State Machine
                </p>
              </div>
            </div>

            {/* Center Navigation Links (Anchor Filter Pills) */}
            <div className="hidden md:flex items-center gap-1.5 p-1 bg-card border border-border rounded-xl text-xs font-mono shadow-bento">
              <button
                type="button"
                onClick={() => setActiveTab('all')}
                className={`px-3.5 py-1.5 rounded-lg transition-all font-bold ${
                  activeTab === 'all'
                    ? 'bg-secondary text-accent border border-accent/40 shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Dashboard
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('circuits')}
                className={`px-3.5 py-1.5 rounded-lg transition-all font-bold ${
                  activeTab === 'circuits'
                    ? 'bg-secondary text-accent border border-accent/40 shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                ZK Circuits
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('aid')}
                className={`px-3.5 py-1.5 rounded-lg transition-all font-bold ${
                  activeTab === 'aid'
                    ? 'bg-secondary text-accent border border-accent/40 shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Aid Engine
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('ledger')}
                className={`px-3.5 py-1.5 rounded-lg transition-all font-bold ${
                  activeTab === 'ledger'
                    ? 'bg-secondary text-accent border border-accent/40 shadow-xs'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                Audit Feed
              </button>
            </div>

            {/* Right: Network Toggle, Live Block, Theme Toggle & Wallet */}
            <div className="flex items-center gap-2.5 text-xs font-mono">
              {/* Network Toggle (Preprod / Preview) */}
              <div className="flex items-center p-0.5 bg-card border border-border rounded-lg">
                <button
                  type="button"
                  onClick={() => switchNetwork('preprod')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                    activeNetwork === 'preprod'
                      ? 'bg-accent text-accent-foreground font-bold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Preprod
                </button>
                <button
                  type="button"
                  onClick={() => switchNetwork('preview')}
                  className={`px-2.5 py-1 rounded-md text-[11px] font-bold transition-all ${
                    activeNetwork === 'preview'
                      ? 'bg-accent text-accent-foreground font-bold shadow-xs'
                      : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Preview
                </button>
              </div>

              {/* Live Indexer Block Height */}
              <div
                title="Midnight Consensus Block Height"
                className="hidden lg:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-card border border-border text-[11px] font-mono text-muted-foreground"
              >
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>{contractState.blockHeight ? `#${contractState.blockHeight.toLocaleString()}` : '#2,735,000'}</span>
              </div>

              {/* Theme Toggle (Dark / Light) */}
              <button
                type="button"
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 rounded-lg bg-card hover:bg-secondary text-foreground border border-border transition-colors shadow-xs"
                title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle Theme"
              >
                {isDarkMode ? <Sun className="w-4 h-4 text-accent" /> : <Moon className="w-4 h-4 text-foreground" />}
              </button>

              {/* Quick 1AM Wallet Trigger Button */}
              {isConnected ? (
                <div className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-accent/15 border border-accent/30 text-accent font-bold text-xs">
                  <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                  <span>{truncateAddress(unshieldedAddress)}</span>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => connectWallet('1am')}
                  disabled={isConnecting}
                  className="px-4 py-2 rounded-lg bg-accent hover:opacity-90 active:scale-95 text-accent-foreground font-bold text-xs transition-all shadow-xs border border-accent/40 flex items-center gap-2"
                >
                  <Wallet className="w-3.5 h-3.5" />
                  <span>{isConnecting ? 'Connecting...' : 'Connect 1AM'}</span>
                </button>
              )}

              {/* GitHub Link */}
              <a
                href="https://github.com/Rajdeep-Biswas7/midnight-docs"
                target="_blank"
                rel="noreferrer"
                className="p-2 rounded-lg bg-card hover:bg-secondary text-muted-foreground hover:text-foreground border border-border transition-colors"
                title="GitHub Repository"
              >
                <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
                </svg>
              </a>
            </div>
          </div>
        </header>

        {/* Live Midnight Consensus Telemetry Ribbon (Full Laptop Width) */}
        <div className="border-b border-border bg-background/80 backdrop-blur-md overflow-x-auto py-2.5 text-muted-foreground transition-colors">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex items-center justify-between gap-6 text-[11px] font-mono whitespace-nowrap">
            <div className="flex items-center gap-2">
              <Activity className="w-3.5 h-3.5 text-accent animate-pulse" />
              <span>CONSENSUS:</span>
              <span className="text-accent font-bold uppercase">{activeNetwork} ACTIVE</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock className="w-3.5 h-3.5 text-accent" />
              <span>OFF-CHAIN WITNESS:</span>
              <span className="text-foreground font-bold">STRICTLY LOCAL MEMORY</span>
            </div>
            <div className="flex items-center gap-2">
              <Terminal className="w-3.5 h-3.5 text-accent" />
              <span>PROVER:</span>
              <span className="text-foreground font-bold">CLIENT WASM (BLS12-381)</span>
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-accent" />
              <span>DAPP CONNECTOR:</span>
              <span className="text-foreground font-bold">CAIP-372 / API v4.0.1</span>
            </div>
          </div>
        </div>

        {/* Main Application Content (Spanning Full Laptop Width) */}
        <main className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 py-8 sm:py-12 space-y-8 flex-1">
          {/* Hero Banner with Complete, Unclipped Headline & Anchor Aesthetic */}
          <div className="text-center space-y-4 max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-card border border-border text-muted-foreground text-xs font-mono font-bold shadow-bento">
              <Sparkles className="w-3.5 h-3.5 text-accent" />
              <span>Midnight Network • CAIP-372 Verified ZK DApp</span>
            </div>

            <h1 className="font-mono text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-foreground leading-tight flex items-center justify-center flex-wrap">
              <span>{displayedHeadline}</span>
              <span className="inline-block w-2 sm:w-3.5 h-7 sm:h-11 bg-accent ml-1.5 align-middle animate-pulse" />
            </h1>

            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed font-sans max-w-2xl mx-auto">
              Synthesize zero-knowledge proofs directly in browser memory. Increment community aid tallies and verify relief claims on Midnight without disclosing beneficiary identities.
            </p>
          </div>

          {/* 4-Column Live Telemetry Cards across full laptop width */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs font-mono w-full">
            {/* Card 1: Verified Contract Hex */}
            <div className="p-4 rounded-xl border border-border bg-card shadow-bento space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="font-bold">VERIFIED CONTRACT</span>
                <Database className="w-3.5 h-3.5 text-accent" />
              </div>
              <div className="font-mono text-sm font-bold text-foreground truncate">
                {truncateAddress(contractState.contractAddress)}
              </div>
              <div className="flex items-center justify-between text-[11px] pt-1.5 border-t border-border">
                <button
                  type="button"
                  onClick={handleCopyContract}
                  className="text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1 font-bold"
                >
                  {copiedContract ? <Check className="w-3 h-3 text-accent" /> : <Copy className="w-3 h-3" />}
                  <span>{copiedContract ? 'Copied' : 'Copy Hex'}</span>
                </button>
                <div className="flex items-center gap-2">
                  {activeNetwork === 'preprod' && (
                    <a
                      href={`https://explorer.1am.xyz/tx/${DEFAULT_PREPROD_DEPLOY_TX}?network=preprod`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-accent hover:underline font-bold flex items-center gap-0.5 text-[10px]"
                      title="View Verified Contract Deployment Transaction"
                    >
                      <span>Deploy Tx</span>
                      <ExternalLink className="w-2.5 h-2.5" />
                    </a>
                  )}
                  <a
                    href={`https://explorer.1am.xyz/contract/${contractState.contractAddress}?network=${activeNetwork}`}
                    target="_blank"
                    rel="noreferrer"
                    className="text-foreground hover:text-accent font-bold flex items-center gap-0.5 transition-colors"
                  >
                    <span>1AM</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>
            </div>

            {/* Card 2: Current Ledger Round */}
            <div className="p-4 rounded-xl border border-border bg-card shadow-bento space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="font-bold">LEDGER ROUND</span>
                <Cpu className="w-3.5 h-3.5 text-accent" />
              </div>
              <div className="font-mono text-2xl font-bold text-foreground tabular-nums">
                #{contractState.round}
              </div>
              <div className="text-[11px] text-accent font-bold pt-1.5 border-t border-border flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3 text-accent" />
                <span>Sequence Verified</span>
              </div>
            </div>

            {/* Card 3: Disclosed Total */}
            <div className="p-4 rounded-xl border border-border bg-card shadow-bento space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="font-bold">DISCLOSED TOTAL</span>
                <HeartHandshake className="w-3.5 h-3.5 text-accent" />
              </div>
              <div className="font-mono text-2xl font-bold text-accent tabular-nums">
                {contractState.totalValue.toLocaleString()}
              </div>
              <div className="text-[11px] text-muted-foreground pt-1.5 border-t border-border">
                tDUST Disclosed Pool
              </div>
            </div>

            {/* Card 4: Midnight Consensus Block */}
            <div className="p-4 rounded-xl border border-border bg-card shadow-bento space-y-2">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="font-bold">BLOCK HEIGHT</span>
                <Layers className="w-3.5 h-3.5 text-accent" />
              </div>
              <div className="font-mono text-2xl font-bold text-foreground tabular-nums">
                {contractState.blockHeight ? `#${contractState.blockHeight.toLocaleString()}` : '#2,735,000'}
              </div>
              <div className="text-[11px] text-muted-foreground pt-1.5 border-t border-border flex items-center justify-between">
                <span className="uppercase">{activeNetwork}</span>
                <button
                  type="button"
                  onClick={refreshContractState}
                  className="hover:text-accent transition-colors"
                  title="Sync Indexer"
                >
                  <RefreshCw className="w-3 h-3" />
                </button>
              </div>
            </div>
          </div>

          {/* Conditional View Rendering based on activeTab (Full Laptop Coverage) */}
          {(activeTab === 'all' || activeTab === 'circuits') && (
            <div className="space-y-6 w-full">
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
                blockHeight={contractState.blockHeight}
                onCallCircuit={callCircuit}
                onConnectWallet={() => connectWallet('1am')}
              />

              {/* Step-by-Step ZK Execution Visualizer */}
              <ProofVisualizer />
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'aid') && (
            <div className="space-y-6 w-full">
              {/* Humanitarian Aid Verification Feed & Simulator */}
              <AidVerificationFeed
                contractAddress={contractState.contractAddress}
                networkId={networkId}
              />
            </div>
          )}

          {(activeTab === 'all' || activeTab === 'ledger') && (
            <div className="space-y-6 w-full">
              {/* On-Chain Contribution & Transition Feed */}
              <ContributionHistoryFeed
                history={contributionHistory}
                contractAddress={contractState.contractAddress}
                networkId={networkId}
              />
            </div>
          )}

          {/* Privacy Architecture Explainer Card (Full Laptop Coverage) */}
          <div className="rounded-xl border border-border bg-card shadow-bento overflow-hidden w-full">
            <div className="p-6 sm:p-7 space-y-4">
              <h3 className="font-mono text-base font-bold text-foreground flex items-center gap-2">
                <ZkShieldBrandIcon className="w-5 h-5 text-accent" />
                <span>Zero-Knowledge Soundness &amp; Security Architecture</span>
              </h3>

              <div className="grid sm:grid-cols-3 gap-4 text-xs font-mono">
                <div className="p-4 bg-background rounded-lg border border-border space-y-2">
                  <div className="flex items-center gap-2 text-foreground font-bold">
                    <WitnessEyeIcon className="w-4 h-4 text-accent" />
                    <span>1. Off-Chain Witness</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed font-sans">
                    The caller passes <code className="text-accent font-mono">secretIncrement()</code> in browser RAM. Zero bytes are transmitted across networks or leaked in transactions.
                  </p>
                </div>

                <div className="p-4 bg-background rounded-lg border border-border space-y-2">
                  <div className="flex items-center gap-2 text-foreground font-bold">
                    <CircuitCoreIcon className="w-4 h-4 text-accent" />
                    <span>2. Client Prover</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed font-sans">
                    Compact ZK circuit verifies that the secret is positive and computes the tally mathematically without disclosing the secret input.
                  </p>
                </div>

                <div className="p-4 bg-background rounded-lg border border-border space-y-2">
                  <div className="flex items-center gap-2 text-foreground font-bold">
                    <LedgerBlockIcon className="w-4 h-4 text-accent" />
                    <span>3. Ledger Seal</span>
                  </div>
                  <p className="text-muted-foreground leading-relaxed font-sans">
                    Only the updated round sequence and cumulative relief total are published on Midnight via <code className="text-accent font-mono">disclose()</code>.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer (Full Laptop Width) */}
        <footer className="border-t border-border bg-background py-6 text-xs text-muted-foreground backdrop-blur-md transition-colors">
          <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-10 flex flex-col sm:flex-row items-center justify-between gap-3">
            <p className="font-mono">
              © 2026 PrivateAid • Powered by Midnight Network &amp; Compact Smart Contracts
            </p>
            <div className="flex items-center gap-5 font-mono">
              <a
                href="https://docs.midnight.network"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent transition-colors flex items-center gap-1 font-bold"
              >
                Docs <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://1am.xyz"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent transition-colors flex items-center gap-1 font-bold"
              >
                1AM Wallet <ExternalLink className="w-3 h-3" />
              </a>
              <a
                href="https://midnight-tmnight-preprod.nethermind.dev"
                target="_blank"
                rel="noreferrer"
                className="hover:text-accent transition-colors flex items-center gap-1 font-bold"
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