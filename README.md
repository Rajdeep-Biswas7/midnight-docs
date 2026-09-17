# PrivateAid Counter — Privacy-Preserving DApp

> A zero-knowledge decentralized counter dApp on Midnight Network with confidential state transitions and browser proof generation.

## Live Demo

[PASTE LIVE URL AFTER DEPLOYING FRONTEND]

*(Deploy via Vercel or Netlify using the CLI commands detailed in the Run Locally section below)*

## Contract Address

| Network  | Address                                                              |
|----------|----------------------------------------------------------------------|
| Preprod  | `mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne` |
| Preview  | `e648cb51d165b7050f6bfd2d4846ef0e520c0c15f0e50859230cb5c512f51f5e` |

## What This Does

PrivateAid Counter allows users to interact with a smart contract on the Midnight Network to increment a shared counter and advance state rounds without disclosing their secret increment values. When a user submits an increment, a zero-knowledge proof is generated locally in the browser. The smart contract verifies the proof and updates the on-chain public tally, ensuring that state transitions are valid and tamper-proof while maintaining complete input confidentiality.

## Privacy Model

- **What is PUBLIC (on-chain, visible to everyone):**
  - `round`: The sequential index of increment transactions completed on the contract.
  - `totalValue`: The current cumulative sum of all disclosed increments committed to the public ledger.
  - Contract bytecode and verification keys.

- **What is PRIVATE (client-side only, never on-chain):**
  - `secretIncrement`: The off-chain witness value provided by the caller (`witness secretIncrement(): Uint<64>`).
  - The caller's local private state and execution inputs.
  - Witness computation traces during zero-knowledge proof generation.

- **What the user PROVES without revealing:**
  - The user proves that their secret increment is strictly positive (`assert(secret > 0)`).
  - The user proves that the state update calculation `newTotal = totalValue + secret` was computed correctly.
  - Using Compact's `disclose()`, the caller commits only the resulting state transition without leaking the secret value itself.

## Privacy Claim

An on-chain observer or validator sees:
- The transaction timestamp, public transaction hash, and gas/dust fees paid.
- The previous public `round` and `totalValue`, and the updated `round` and `totalValue`.
- The validity of the zero-knowledge proof verifying that all circuit constraints were satisfied.

An on-chain observer **CANNOT** see:
- The private witness input (`secretIncrement`) used for the calculation.
- Any identifying metadata or secret parameters belonging to the caller.

## Tech Stack

- **Blockchain**: Midnight Network (Preprod & Preview Testnets)
- **Smart Contract Language**: Compact (v0.23+ language version / compiler 0.31.1)
- **SDK & Framework**: Midnight.js SDK (`@midnight-ntwrk/midnight-js-contracts`, `@midnight-ntwrk/dapp-connector-api`)
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **Supported Wallets**: Midnight Lace Wallet, 1am Wallet (`1am.xyz`)

## Prerequisites

- **Midnight Wallet**: Midnight Lace Wallet or [1am Wallet](https://1am.xyz) installed in your browser.
- **Node.js**: v22.0.0 or higher (`node -v`).
- **Network Setting**: Ensure your wallet network is set to **Midnight Preprod**.

## Run Locally

1. **Clone the repository:**
   ```bash
   git clone https://github.com/Rajdeep-Biswas7/midnight-docs.git
   cd midnight-docs
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Compile Compact contracts (optional if using pre-compiled artifacts in `managed/`):**
   ```bash
   npm run compile
   ```

4. **Run tests:**
   ```bash
   npm test
   ```

5. **Start the local Vite development server:**
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

6. **Build for production:**
   ```bash
   npm run build
   ```

## Deploying Frontend

### Option A: Deploy to Vercel
```bash
# Install Vercel CLI (if not already installed)
npm install -g vercel

# Deploy to production
vercel --prod
```

### Option B: Deploy to Netlify
```bash
# Install Netlify CLI (if not already installed)
npm install -g netlify-cli

# Deploy to production
netlify deploy --prod --dir=dist
```

## Demo Video

[PLACEHOLDER — I will add the link after recording]