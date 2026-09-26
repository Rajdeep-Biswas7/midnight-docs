import { useState, useEffect, useCallback, useRef } from 'react';
import type { ConnectedAPI, InitialAPI } from '@midnight-ntwrk/dapp-connector-api';
import { setNetworkId as setSdkNetworkId } from '@midnight-ntwrk/midnight-js-network-id';
import {
  ContractState,
  createCircuitContext,
  emptyZswapLocalState,
  proofDataIntoSerializedPreimage,
} from '@midnight-ntwrk/compact-runtime';
import {
  ContractOperation,
  ContractState as LedgerContractState,
  CostModel,
  LedgerParameters,
  PrePartitionContractCall,
  PreTranscript,
  QueryContext as LedgerQueryContext,
  Transaction,
  communicationCommitmentRandomness,
} from '@midnight-ntwrk/ledger-v8';
import { Contract } from '../../blockchain/managed/contract/index.js';

// Ã¢â€â‚¬Ã¢â€â‚¬ KeyMaterialProvider Ã¢â‚¬â€ serves ZK keys from /managed/ static files Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
// This is what wallet.getProvingProvider(keyMaterialProvider) expects.
// The wallet's proof server needs binary ZKIR (.bzkir) Ã¢â‚¬â€ NOT JSON (.zkir).
function makeKeyMaterialProvider() {
  const base = '/managed';
  function circuitName(loc: string): string {
    const b = loc.split('/').pop() ?? loc;
    return b.replace(/\.(zkir|bzkir|prover|verifier)$/, '');
  }
  return {
    async getZKIR(loc: string): Promise<Uint8Array> {
      const name = circuitName(loc);
      const r = await fetch(`${base}/zkir/${name}.bzkir`);
      if (!r.ok) throw new Error(`ZKIR fetch failed for ${name}: HTTP ${r.status}`);
      return new Uint8Array(await r.arrayBuffer());
    },
    async getProverKey(loc: string): Promise<Uint8Array> {
      const name = circuitName(loc);
      const r = await fetch(`${base}/keys/${name}.prover`);
      if (!r.ok) throw new Error(`Prover key fetch failed for ${name}: HTTP ${r.status}`);
      return new Uint8Array(await r.arrayBuffer());
    },
    async getVerifierKey(loc: string): Promise<Uint8Array> {
      const name = circuitName(loc);
      const r = await fetch(`${base}/keys/${name}.verifier`);
      if (!r.ok) throw new Error(`Verifier key fetch failed for ${name}: HTTP ${r.status}`);
      return new Uint8Array(await r.arrayBuffer());
    },
  };
}

// Helper: convert bytes to lowercase hex string
function toHex(bytes: Uint8Array): string {
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('');
}
function fromHex(hex: string): Uint8Array {
  const clean = hex.startsWith('0x') ? hex.slice(2) : hex;
  const out = new Uint8Array(clean.length / 2);
  for (let i = 0; i < clean.length; i += 2) out[i / 2] = parseInt(clean.substring(i, i + 2), 16);
  return out;
}

// Helper: fetch on-chain contract state hex from Midnight GraphQL indexer
async function fetchContractStateHex(indexerUrl: string, contractAddress: string): Promise<string | null> {
  const query = `query GetContractState($address: HexEncoded!) {
    contractAction(address: $address) { address state }
  }`;
  const res = await fetch(indexerUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { address: contractAddress.replace(/^0x/, '') } }),
  });
  if (!res.ok) throw new Error(`Indexer HTTP ${res.status}`);
  const json = await res.json() as { data?: { contractAction?: { state?: string } | null }; errors?: { message: string }[] };
  if (json.errors?.length) throw new Error('Indexer: ' + json.errors.map((e) => e.message).join(', '));
  return json.data?.contractAction?.state ?? null;
}

// Helper: extract txHash from balanced tx bytes or submit result
async function extractTxHash(balancedTxHex: string, submitResult?: unknown): Promise<string> {
  const parseHex64 = (v: unknown): string | null => {
    if (typeof v === 'string') { const m = v.match(/[0-9a-fA-F]{64}/); if (m) return m[0].toLowerCase(); }
    return null;
  };
  const direct = parseHex64(submitResult);
  if (direct) return direct;
  if (submitResult && typeof submitResult === 'object') {
    for (const key of ['txHash', 'hash', 'txId', 'transactionId', 'id']) {
      const c = parseHex64((submitResult as any)[key]); if (c) return c;
    }
  }
  // Deserialize balanced tx and compute transactionHash via ledger-v8
  const combos = [
    ['signature', 'proof', 'binding'],
    ['signature', 'no-proof', 'no-binding'],
    ['signature', 'proof', 'no-binding'],
    ['signature-erased', 'proof', 'binding'],
  ] as const;
  const rawBytes = fromHex(balancedTxHex);
  for (const [s, p, b] of combos) {
    try {
      const tx = Transaction.deserialize(s as any, p as any, b as any, rawBytes);
      try { const h = tx?.transactionHash?.(); if (h && typeof h === 'string') return h.replace(/^0x/, '').toLowerCase(); } catch {}
      try {
        const ids = tx?.identifiers?.() as any[];
        if (Array.isArray(ids)) for (const id of ids) { const c = parseHex64(typeof id === 'string' ? id : String(id)); if (c) return c; }
      } catch {}
    } catch {}
  }
  // SHA-256 fallback
  const hashBuf = await crypto.subtle.digest('SHA-256', rawBytes.buffer as ArrayBuffer);
  return toHex(new Uint8Array(hashBuf));
}


export interface WalletServiceConfig {
  indexerUri?: string;
  indexerWsUri?: string;
  nodeUri?: string;
  substrateNodeUri?: string;
  proofServerUri?: string;
  proverServerUri?: string;
}

export type NetworkType = 'preprod' | 'preview';

export interface WalletInfo {
  name: string;
  rdns: string;
  icon?: string;
  apiVersion?: string;
}

export interface WalletBalances {
  tNight: string;
  tDust: string;
  dustCap: string;
}

export interface ContractLiveState {
  round: number;
  totalValue: number;
  isLoading: boolean;
  lastUpdated: string;
  contractAddress: string;
  deployerWallet: string;
  blockHeight: number | null;
  blockHash: string | null;
}

export interface ContributionRecord {
  id: string;
  round: number;
  totalValue: number;
  txHash: string;
  time: string;
  type: 'Relief Aid Claim' | 'Confidential Donation';
  status: 'Verified (ZK-SNARK)' | 'Confirmed on-chain';
}

export interface MidnightState {
  isConnecting: boolean;
  isConnected: boolean;
  walletName: string | null;
  unshieldedAddress: string | null;
  shieldedAddress: string | null;
  networkId: NetworkType;
  error: string | null;
  availableWallets: WalletInfo[];
  balances: WalletBalances;
  blockHeight: number | null;
}

export interface CircuitCallState {
  isProving: boolean;
  isSubmitting: boolean;
  txHash: string | null;
  error: string | null;
  success: boolean;
  disclosedRound: number | null;
  disclosedTotal: number | null;
}

// Ã¢â€â‚¬Ã¢â€â‚¬ Verified Contract & Network Definitions Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬Ã¢â€â‚¬
export const DEFAULT_PREPROD_CONTRACT = '0f63bb305f8934af2710eba04baea56d44a29329d8e7333d007c0127657bdc4b';
export const DEFAULT_PREPROD_DEPLOY_TX = 'bfd00a8ac48f72c3d16cc1cd0dbf509e1bec72c612dcbde9dccd608eeebbb859';
export const DEFAULT_PREVIEW_CONTRACT = '';

export const NETWORK_DETAILS: Record<NetworkType, {
  name: string;
  contractAddress: string;
  deployerWallet: string;
  deployTxHash?: string;
  indexerUrl: string;
  indexerWsUrl: string;
  nodeUrl: string;
  explorerUrl: string;
}> = {
  preprod: {
    name: 'Midnight Preprod',
    contractAddress: '0f63bb305f8934af2710eba04baea56d44a29329d8e7333d007c0127657bdc4b',
    deployerWallet: 'mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne',
    deployTxHash: 'bfd00a8ac48f72c3d16cc1cd0dbf509e1bec72c612dcbde9dccd608eeebbb859',
    indexerUrl: 'https://indexer.preprod.midnight.network/api/v4/graphql',
    indexerWsUrl: 'wss://indexer.preprod.midnight.network/api/v4/graphql/ws',
    nodeUrl: 'https://rpc.preprod.midnight.network',
    explorerUrl: 'https://explorer.1am.xyz',
  },
  preview: {
    name: 'Midnight Preview',
    contractAddress: '',
    deployerWallet: '',
    indexerUrl: 'https://indexer.preview.midnight.network/api/v4/graphql',
    indexerWsUrl: 'wss://indexer.preview.midnight.network/api/v4/graphql/ws',
    nodeUrl: 'https://rpc.preview.midnight.network',
    explorerUrl: 'https://explorer.1am.xyz',
  },
};

export function useMidnight() {
  const [activeNetwork, setActiveNetwork] = useState<NetworkType>('preprod');
  const [walletState, setWalletState] = useState<MidnightState>({
    isConnecting: false,
    isConnected: false,
    walletName: null,
    unshieldedAddress: null,
    shieldedAddress: null,
    networkId: 'preprod',
    error: null,
    availableWallets: [],
    balances: {
      tNight: '0.00 NIGHT',
      tDust: '0.00 DUST',
      dustCap: '0.00 DUST',
    },
    blockHeight: null,
  });

  const [connectedApi, setConnectedApi] = useState<ConnectedAPI | null>(null);
  const connectedApiRef = useRef<ConnectedAPI | null>(null);
  const serviceConfigRef = useRef<WalletServiceConfig | null>(null);

  const [contractState, setContractState] = useState<ContractLiveState>({
    round: 0,
    totalValue: 0,
    isLoading: true,
    lastUpdated: 'Loading...',
    contractAddress: NETWORK_DETAILS.preprod.contractAddress,
    deployerWallet: NETWORK_DETAILS.preprod.deployerWallet,
    blockHeight: null,
    blockHash: null,
  });

  const [contributionHistory, setContributionHistory] = useState<ContributionRecord[]>([]);

  const [circuitState, setCircuitState] = useState<CircuitCallState>({
    isProving: false,
    isSubmitting: false,
    txHash: null,
    error: null,
    success: false,
    disclosedRound: null,
    disclosedTotal: null,
  });

  // Set SDK global network identifier whenever activeNetwork changes
  useEffect(() => {
    try {
      setSdkNetworkId(activeNetwork);
    } catch (err) {
      console.warn('setNetworkId error:', err);
    }
    setWalletState((prev) => ({ ...prev, networkId: activeNetwork }));
    setContractState((prev) => ({
      ...prev,
      contractAddress: NETWORK_DETAILS[activeNetwork].contractAddress,
      deployerWallet: NETWORK_DETAILS[activeNetwork].deployerWallet,
    }));
  }, [activeNetwork]);

  // Fetch real-time block telemetry from Midnight GraphQL Indexer
  const fetchLiveTelemetry = useCallback(async (net: NetworkType) => {
    const netConfig = NETWORK_DETAILS[net];
    try {
      const response = await fetch(netConfig.indexerUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query: '{ block { height hash timestamp } }',
        }),
      });

      if (response.ok) {
        const json = await response.json();
        if (json?.data?.block?.height) {
          const height = json.data.block.height;
          const hash = json.data.block.hash;
          setWalletState((prev) => ({ ...prev, blockHeight: height }));
          setContractState((prev) => ({
            ...prev,
            blockHeight: height,
            blockHash: hash,
            lastUpdated: new Date().toLocaleTimeString(),
          }));
        }
      }
    } catch (err) {
      console.debug('Failed to poll indexer telemetry:', err);
    }
  }, []);

  // Poll live telemetry periodically
  useEffect(() => {
    fetchLiveTelemetry(activeNetwork);
    const interval = setInterval(() => {
      fetchLiveTelemetry(activeNetwork);
    }, 12000);
    return () => clearInterval(interval);
  }, [activeNetwork, fetchLiveTelemetry]);

  // Scan available wallets adhering to CAIP-372 / Midnight DApp Connector
  const detectWallets = useCallback((): WalletInfo[] => {
    if (typeof window === 'undefined' || !window.midnight) {
      return [];
    }
    const detected: WalletInfo[] = [];
    for (const [key, api] of Object.entries(window.midnight)) {
      if (api && typeof api === 'object') {
        const item = api as unknown as InitialAPI;
        detected.push({
          name: item.name || (key === 'mnLace' ? 'Midnight Lace' : key === '1am' ? '1AM Wallet' : key),
          rdns: item.rdns || key,
          icon: item.icon,
          apiVersion: item.apiVersion || '4.0.1',
        });
      }
    }
    return detected;
  }, []);

  useEffect(() => {
    const list = detectWallets();
    setWalletState((prev) => ({ ...prev, availableWallets: list }));

    const timer = setTimeout(() => {
      setWalletState((prev) => ({ ...prev, availableWallets: detectWallets() }));
    }, 1200);

    return () => clearTimeout(timer);
  }, [detectWallets]);

  // Change network (preprod / preview)
  const switchNetwork = useCallback((newNetwork: NetworkType) => {
    setActiveNetwork(newNetwork);
  }, []);

  // Connect 1AM Wallet or Lace using official DApp connector
  const connectWallet = useCallback(async (preferredKey?: string) => {
    setWalletState((prev) => ({ ...prev, isConnecting: true, error: null }));

    try {
      if (typeof window === 'undefined' || !window.midnight || Object.keys(window.midnight).length === 0) {
        throw new Error(
          '1AM Wallet or Midnight Lace extension not detected. Please install 1AM Wallet from https://1am.xyz to interact directly with Midnight testnet.'
        );
      }

      let targetApi: InitialAPI | null = null;
      let selectedName = '1AM Wallet';

      // Prioritize 1am wallet or preferred key
      if (preferredKey && window.midnight[preferredKey]) {
        targetApi = window.midnight[preferredKey] as unknown as InitialAPI;
        selectedName = targetApi.name || preferredKey;
      } else if ((window.midnight as any)['1am']) {
        targetApi = (window.midnight as any)['1am'] as unknown as InitialAPI;
        selectedName = '1AM Wallet';
      } else if ((window.midnight as any)['oneAm']) {
        targetApi = (window.midnight as any)['oneAm'] as unknown as InitialAPI;
        selectedName = '1AM Wallet';
      } else if (window.midnight.mnLace) {
        targetApi = window.midnight.mnLace as unknown as InitialAPI;
        selectedName = 'Midnight Lace';
      } else {
        const firstKey = Object.keys(window.midnight)[0];
        targetApi = window.midnight[firstKey] as unknown as InitialAPI;
        selectedName = targetApi.name || firstKey;
      }

      if (!targetApi || typeof targetApi.connect !== 'function') {
        throw new Error('Selected extension does not implement the Midnight DApp Connector API.');
      }

      // 1. Establish genuine DApp connection with network id hint
      const api = await targetApi.connect(activeNetwork);

      // 1b. Pull service URIs directly from connected wallet (serviceUriConfig / getConfiguration)
      let serviceConfig: WalletServiceConfig | null = null;
      try {
        if (typeof (api as any).serviceUriConfig === 'function') {
          serviceConfig = await (api as any).serviceUriConfig();
        } else if (typeof (api as any).getConfiguration === 'function') {
          serviceConfig = await (api as any).getConfiguration();
        }
      } catch (cfgErr) {
        console.warn('Could not fetch wallet service config:', cfgErr);
      }
      serviceConfigRef.current = serviceConfig;

      // 2. Hint usage of necessary methods
      try {
        if (typeof api.hintUsage === 'function') {
          await api.hintUsage([
            'getShieldedAddresses',
            'getUnshieldedAddress',
            'getDustBalance',
            'getUnshieldedBalances',
            'submitTransaction',
            'balanceUnsealedTransaction',
            'getProvingProvider',
          ]);
        }
      } catch (err) {
        console.warn('hintUsage failed (non-fatal):', err);
      }

      // 3. Query unshielded address
      let unshielded = '';
      try {
        const resp = await api.getUnshieldedAddress();
        unshielded = resp.unshieldedAddress;
      } catch (addrErr) {
        console.warn('getUnshieldedAddress failed:', addrErr);
        unshielded = '';
      }

      // 4. Query shielded addresses
      let shielded = '';
      try {
        const resp = await api.getShieldedAddresses();
        shielded = resp.shieldedAddress;
      } catch {
        shielded = '';
      }

      // 5. Query DUST balance
      let dustBalStr = '0.00 DUST';
      let dustCapStr = '0.00 DUST';
      try {
        const dust = await api.getDustBalance();
        if (dust) {
          const bal = typeof dust.balance === 'bigint' ? Number(dust.balance) : Number(dust.balance || 0);
          const cap = typeof dust.cap === 'bigint' ? Number(dust.cap) : Number(dust.cap || 0);
          dustBalStr = `${bal.toLocaleString()} DUST`;
          dustCapStr = `${cap.toLocaleString()} DUST`;
        }
      } catch (dustErr) {
        console.warn('getDustBalance failed:', dustErr);
        dustBalStr = '0.00 DUST';
        dustCapStr = '0.00 DUST';
      }

      // 6. Query unshielded token balances
      let nightBalStr = '0.00 NIGHT';
      try {
        const unshieldedBals = await api.getUnshieldedBalances();
        if (unshieldedBals && Object.keys(unshieldedBals).length > 0) {
          const firstVal = Object.values(unshieldedBals)[0];
          const num = typeof firstVal === 'bigint' ? Number(firstVal) : Number(firstVal || 0);
          nightBalStr = `${num.toLocaleString()} NIGHT`;
        }
      } catch (nightErr) {
        console.warn('getUnshieldedBalances failed:', nightErr);
        nightBalStr = '0.00 NIGHT';
      }

      setConnectedApi(api);
      connectedApiRef.current = api;

      setWalletState((prev) => ({
        ...prev,
        isConnecting: false,
        isConnected: true,
        walletName: selectedName,
        unshieldedAddress: unshielded,
        shieldedAddress: shielded,
        balances: {
          tNight: nightBalStr,
          tDust: dustBalStr,
          dustCap: dustCapStr,
        },
        error: null,
      }));
    } catch (err: any) {
      console.error('Wallet connection error:', err);
      let errorMsg = err?.message || 'Failed to connect wallet.';
      if (errorMsg.includes('User rejected') || errorMsg.includes('declined')) {
        errorMsg = 'Connection request was cancelled by the user in 1AM Wallet.';
      } else if (errorMsg.includes('network')) {
        errorMsg = `Network mismatch. Please ensure 1AM Wallet is configured for ${NETWORK_DETAILS[activeNetwork].name}.`;
      }
      setWalletState((prev) => ({
        ...prev,
        isConnecting: false,
        isConnected: false,
        error: errorMsg,
      }));
    }
  }, [activeNetwork]);

  const disconnectWallet = useCallback(() => {
    setConnectedApi(null);
    connectedApiRef.current = null;
    setWalletState((prev) => ({
      ...prev,
      isConnecting: false,
      isConnected: false,
      walletName: null,
      unshieldedAddress: null,
      shieldedAddress: null,
      balances: {
        tNight: '0.00 NIGHT',
        tDust: '0.00 DUST',
        dustCap: '0.00 DUST',
      },
      error: null,
    }));
    setCircuitState({
      isProving: false,
      isSubmitting: false,
      txHash: null,
      error: null,
      success: false,
      disclosedRound: null,
      disclosedTotal: null,
    });
  }, []);

  // Execute ZK Circuit â€” real 1AM wallet popup flow
  // Uses compact-runtime's proofDataIntoSerializedPreimage + provingProvider.prove
  // to avoid WASM type mismatch between compact-runtime and ledger-v8 objects.
  //   POPUP 1: getProvingProvider + provingProvider.prove  (ZK proof approval)
  //   POPUP 2: balanceUnsealedTransaction                  (gas/dust approval)
  //   POPUP 3: submitTransaction                           (broadcast)
  const callCircuit = useCallback(
    async (targetContractAddress?: string) => {
      const contractAddr = targetContractAddress || NETWORK_DETAILS[activeNetwork].contractAddress;
      const api = connectedApiRef.current;

      if (!api) {
        setCircuitState({
          isProving: false, isSubmitting: false, txHash: null,
          error: 'Wallet not connected. Please connect your 1AM Wallet before submitting a circuit call.',
          success: false, disclosedRound: null, disclosedTotal: null,
        });
        return;
      }

      setCircuitState({
        isProving: true, isSubmitting: false, txHash: null,
        error: null, success: false, disclosedRound: null, disclosedTotal: null,
      });

      try {
        // hint (non-fatal)
        try {
          if (typeof api.hintUsage === 'function')
            await api.hintUsage(['getProvingProvider', 'balanceUnsealedTransaction', 'submitTransaction']);
        } catch {}

        // 1. Resolve indexer URL from wallet config
        let indexerUrl = NETWORK_DETAILS[activeNetwork].indexerUrl;
        try {
          const cfg = await (api as any).getConfiguration?.() ?? await (api as any).serviceUriConfig?.() ?? null;
          if (cfg?.indexerUri) indexerUrl = cfg.indexerUri;
        } catch {}

        // 2. Fetch live on-chain contract state from Midnight GraphQL indexer
        const stateHex = await fetchContractStateHex(indexerUrl, contractAddr);
        if (!stateHex) throw new Error(
          `Contract ${contractAddr.slice(0, 10)}... not found on ${activeNetwork}.`
        );
        const contractStateObj = ContractState.deserialize(fromHex(stateHex));

        // 3. Coin public key (must be pure hex, not bech32)
        let coinPublicKey = '00'.repeat(32);
        try {
          const shielded = await api.getShieldedAddresses();
          const rawKey = shielded?.shieldedCoinPublicKey ?? '';
          if (/^[0-9a-fA-F]+$/.test(rawKey)) {
            coinPublicKey = rawKey;
          } else if (rawKey) {
            const hb = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(rawKey));
            coinPublicKey = toHex(new Uint8Array(hb));
          }
        } catch {}

        // 4. Build circuit context and run circuit locally (no popup)
        const witnesses = { secretIncrement: (ctx: any): [any, bigint] => [ctx.privateState, 1n] };
        const contract = new Contract(witnesses as any);
        const circuitContext = createCircuitContext(
          contractAddr,
          emptyZswapLocalState(coinPublicKey),
          contractStateObj,
          {},
        );
        const circuitResults = contract.circuits.incrementWithSecret(circuitContext as any);
        const proofData = circuitResults.proofData;
        // 5. Serialize proof data using compact-runtime (same WASM module â€” no type mismatch)
        const serializedPreimage = proofDataIntoSerializedPreimage(
          proofData.input,
          proofData.output,
          proofData.publicTranscript,
          proofData.privateTranscriptOutputs,
          'incrementWithSecret',
        );

        // 6. POPUP 1 â€” getProvingProvider + prove (1AM Wallet approval)
        const keyMaterial = makeKeyMaterialProvider();
        const provingProvider = await (api as any).getProvingProvider(keyMaterial);
        const unsealedBytes = await provingProvider.prove(serializedPreimage, 'incrementWithSecret');
        const unsealedTxHex = toHex(unsealedBytes instanceof Uint8Array ? unsealedBytes : new Uint8Array(unsealedBytes));

        setCircuitState((prev) => ({ ...prev, isProving: false, isSubmitting: true }));

        // 7. POPUP 2 â€” balanceUnsealedTransaction (dust/gas approval)
        let balancedTxHex: string | undefined;
        for (let attempt = 1; attempt <= 3; attempt++) {
          try {
            const bal = await api.balanceUnsealedTransaction(unsealedTxHex as any);
            balancedTxHex = typeof bal === 'string' ? bal : (bal as any)?.tx;
            if (balancedTxHex && typeof balancedTxHex !== 'string')
              balancedTxHex = toHex(balancedTxHex as unknown as Uint8Array);
            break;
          } catch (e: any) {
            const m = (e?.message ?? '').toLowerCase();
            if (!m.includes('duplicate') && (m.includes('pending') || m.includes('wait')) && attempt < 3)
              await new Promise((r) => setTimeout(r, 8000));
            else throw e;
          }
        }
        if (!balancedTxHex) throw new Error('balanceUnsealedTransaction returned no result.');

        // 8. POPUP 3 â€” submitTransaction (broadcast)
        const submitResult = await api.submitTransaction(balancedTxHex as any);
        const txId = await extractTxHash(balancedTxHex, submitResult);

        const confirmedRound = contractState.round + 1;
        const confirmedTotal = contractState.totalValue + 1;

        setCircuitState({
          isProving: false, isSubmitting: false,
          txHash: txId, error: null, success: true,
          disclosedRound: confirmedRound, disclosedTotal: confirmedTotal,
        });
        setContractState((prev) => ({
          ...prev, round: confirmedRound, totalValue: confirmedTotal,
          isLoading: false, lastUpdated: new Date().toLocaleTimeString(), contractAddress: contractAddr,
        }));
        setContributionHistory((prev) => [{
          id: `tx-${txId.slice(0, 8)}`, round: confirmedRound, totalValue: confirmedTotal,
          txHash: txId, time: 'Just now', type: 'Relief Aid Claim', status: 'Confirmed on-chain',
        }, ...prev]);
      } catch (err: any) {
        console.error('Circuit execution error:', err);
        setCircuitState({
          isProving: false, isSubmitting: false, txHash: null,
          error: err?.message || 'Transaction failed.',
          success: false, disclosedRound: null, disclosedTotal: null,
        });
      }
    },
    [activeNetwork, contractState]
  );

  return {
    ...walletState,
    activeNetwork,
    switchNetwork,
    connectWallet,
    disconnectWallet,
    callCircuit,
    circuitState,
    contractState,
    contributionHistory,
    refreshContractState: () => fetchLiveTelemetry(activeNetwork),
  };
}
