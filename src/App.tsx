import React from 'react';
import { useMidnight } from './hooks/useMidnight';
import { WalletConnect } from './components/WalletConnect';
import { CircuitCall } from './components/CircuitCall';
import { Shield, Sparkles, ExternalLink, Database } from 'lucide-react';

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
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col justify-between selection:bg-indigo-500 selection:text-white">
      {/* Top Navigation / Header */}
      <header className="border-b border-slate-800/80 bg-slate-950/70 backdrop-blur-md sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl text-white shadow-md shadow-indigo-500/20">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h1 className="text-base sm:text-lg font-bold tracking-tight text-white flex items-center gap-2">
                PrivateAid Counter
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/30">
                  Level 2
                </span>
              </h1>
              <p className="text-xs text-slate-400 hidden sm:block">
                Zero-Knowledge Privacy-Preserving DApp on Midnight Network
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 sm:gap-3 text-xs">
            <span className="px-2.5 py-1 rounded-full bg-slate-900 border border-slate-800 text-slate-300 font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              Preprod
            </span>
            <a
              href="https://github.com/Rajdeep-Biswas7/midnight-docs"
              target="_blank"
              rel="noreferrer"
              className="p-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 transition-colors border border-slate-800"
              title="GitHub Repo"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 py-8 sm:py-12 w-full space-y-8 flex-1">
        {/* Intro banner */}
        <div className="text-center space-y-3 max-w-2xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" /> Midnight Builder Challenge — Level 2 Frontend
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white">
            Zero-Knowledge State Transitions
          </h2>
          <p className="text-sm text-slate-400 leading-relaxed">
            Execute private witness circuits from your browser using Lace or 1am Wallet. Witness inputs stay 100% confidential in your local environment.
          </p>
        </div>

        {/* Components Section */}
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
        </div>

        {/* Privacy Architecture Explainer Card */}
        <div className="p-6 bg-slate-900/60 border border-slate-800/80 rounded-2xl space-y-4">
          <h3 className="text-sm font-semibold text-slate-200 flex items-center gap-2">
            <Database className="w-4 h-4 text-indigo-400" />
            Midnight Privacy Architecture
          </h3>
          <div className="grid sm:grid-cols-3 gap-4 text-xs">
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-1">
              <span className="font-semibold text-slate-300 block">1. Off-Chain Witness</span>
              <p className="text-slate-400 leading-relaxed">
                The caller provides <code className="text-indigo-300 font-mono">secretIncrement()</code> locally. Never transmitted over the wire or stored on-chain.
              </p>
            </div>
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-1">
              <span className="font-semibold text-slate-300 block">2. Browser ZK Prover</span>
              <p className="text-slate-400 leading-relaxed">
                Compact circuit verifies that secret is positive and computes the new sum without leaking the input.
              </p>
            </div>
            <div className="p-3.5 bg-slate-950/60 rounded-xl border border-slate-800/80 space-y-1">
              <span className="font-semibold text-slate-300 block">3. On-Chain Disclosure</span>
              <p className="text-slate-400 leading-relaxed">
                Only the incremented round and resulting total are committed via <code className="text-emerald-400 font-mono">disclose()</code>.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-6xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© 2026 PrivateAid • Built for Midnight Builder Challenge on Rise In</p>
          <div className="flex items-center gap-4">
            <a
              href="https://docs.midnight.network"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              Docs <ExternalLink className="w-3 h-3" />
            </a>
            <a
              href="https://1am.xyz"
              target="_blank"
              rel="noreferrer"
              className="hover:text-slate-300 transition-colors flex items-center gap-1"
            >
              1am Wallet <ExternalLink className="w-3 h-3" />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default App;
