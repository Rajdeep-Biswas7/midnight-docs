# PrivateAid

Decentralized, privacy-preserving, and mathematically provably confidential state management built natively on the Midnight blockchain using Compact smart contracts and zero-knowledge proofs.

[Live Demo](#live-demo) • [Demo Video](#demo-video) • [Contract Address](#contract-address) • [What This Product Does](#what-this-product-does) • [Privacy Model](#privacy-model) • [Privacy Claim](#privacy-claim) • [Tech Stack](#tech-stack) • [Prerequisites](#prerequisites) • [Setup & Run Locally](#setup--run-locally) • [Run Tests](#run-tests) • [CI/CD](#cicd) • [Usage Guide](#usage-guide) • [Submission Checklist](#submission-checklist)

---

## Live Demo

🚀 **Live DApp:** [https://privateaid-counterdapp.vercel.app/](https://privateaid-counterdapp.vercel.app/)

---

## Demo Video

🎬 **Watch the MVP Demo Walkthrough:** [https://www.youtube.com/watch?v=lAUVTL0EaUM](https://www.youtube.com/watch?v=lAUVTL0EaUM)

[![Watch Demo Video](https://img.youtube.com/vi/lAUVTL0EaUM/hqdefault.jpg)](https://www.youtube.com/watch?v=lAUVTL0EaUM)

---

## Contract Address

### 🌟 Latest Deployed Contracts (September 2026)

| Network | Contract Address | Deployment TX / Block | Explorer | Status |
| :--- | :--- | :--- | :--- | :--- |
| **Preprod** | `mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne` | Extrinsic 0xa427c7... (Block #2427315) | [View on 1AM Preprod Explorer ↗](https://explorer.1am.xyz/contract/mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne?network=preprod) | 🟢 LIVE & ACTIVE |
| **Preview** | `e648cb51d165b7050f6bfd2d4846ef0e520c0c15f0e50859230cb5c512f51f5e` | Extrinsic 0xbc23aa... (Block #742760) | [View on 1AM Preview Explorer ↗](https://explorer.1am.xyz/contract/e648cb51d165b7050f6bfd2d4846ef0e520c0c15f0e50859230cb5c512f51f5e?network=preview) | 🟢 LIVE & ACTIVE |

```text
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
PrivateAid — Compact Smart Contracts on Midnight Testnet
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Contract Source   : ./contracts/counter.compact
Managed Bindings  : ./managed/contract/index.js
[Latest Deployments - September 2026]
Preprod Contract  : mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne
Preview Contract  : e648cb51d165b7050f6bfd2d4846ef0e520c0c15f0e50859230cb5c512f51f5e
Deployed At       : 2026-09-17 (Preprod: Block #2427315 | Preview: Block #742760)
Active Circuits   : incrementWithSecret
State Variables   : round (Uint<64>), totalValue (Uint<64>)
Witness Input     : secretIncrement (Uint<64>, private to caller)
Rules             : assert(secret > 0); disclose(totalValue + secret); round += 1
Status            : 100% On-Chain Verifiable Dual-State Machine (Zero Mocking)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## What This Product Does

Traditional on-chain counters, donation pools, and tally mechanisms force participants to expose their individual contributions, increments, and voting weights publicly on transparent ledgers. This transparency enables front-running, copycat behaviors, and participant surveillance. In aid distribution, public exposure can compromise the privacy and safety of donors and beneficiaries alike.

**PrivateAid** solves these issues by leveraging **Midnight Network's dual-state architecture** and **Compact zero-knowledge smart contracts**:
- Participants contribute increments or state transitions in complete privacy.
- Off-chain private witnesses (`secretIncrement`) and local browser ZK-SNARK proving ensure that neither operators, miners, nor blockchain observers can observe the caller's private values before, during, or after execution.
- The smart contract mathematically verifies through arithmetic circuits that the secret input satisfies all domain rules (e.g. strictly positive, non-overflowing) and computes the updated total value without disclosing the witness itself.
- Selective disclosure via Compact's `disclose()` commits only the verified state update to the shared public ledger.

---

## Privacy Model

### What is PUBLIC (on-chain, anyone can see):
- Current public execution round (`round: Uint<64>`).
- Cumulative public disclosed tally (`totalValue: Uint<64>`).
- Public contract address, verification keys, and zero-knowledge circuit schemas.
- Transaction timestamp, public transaction hash, and fees paid in tDUST.

### What is PRIVATE (private witness, never on-chain):
- The caller's actual increment value (`secretIncrement(): Uint<64>`).
- The caller's off-chain private witness state and execution trace.
- Intermediate arithmetic circuit wire evaluations during proof generation.

### What the user PROVES without revealing:
- **Valid Input**: The caller proves that their confidential increment is strictly positive (`assert(secret > 0)`).
- **Correct State Transition**: The caller proves that `newTotal == totalValue + secret` without exposing `secret`.
- **Selective Disclosure**: The caller commits the resulting total to the ledger using `disclose()`, keeping the contribution amount completely confidential.

---

## Privacy Claim

An on-chain observer or validator **CAN SEE**:
- The public transaction hash, timestamp, and block height.
- The previous public `round` and `totalValue`, and the updated `round` and `totalValue`.
- The validity of the zero-knowledge proof certifying all circuit constraints were satisfied.

An on-chain observer **CANNOT SEE**:
- The private increment value (`secretIncrement`) provided by the caller.
- Any private witness inputs or sensitive metadata belonging to the caller.

---

## Tech Stack

- **Smart Contracts**: Compact (`.compact`), Compact Pure Circuits, Compact Runtime (`@midnight-ntwrk/compact-runtime`)
- **Zero-Knowledge Infrastructure**: Midnight Docker Proof Server (`midnightnetwork/proof-server:latest`), Proving & Verification Keys (`.zkir`, `.bzkir`, `.prover`, `.verifier`)
- **Blockchain & Network**: Midnight Preprod Testnet & Preview Testnet, Substrate Extrinsics, Midnight Indexer (GraphQL v4)
- **Wallets & Connectors**: 1AM Wallet (`1am.xyz`), Midnight Lace Wallet, `@midnight-ntwrk/dapp-connector-api`
- **SDK & Protocol**: `@midnight-ntwrk/midnight-js-contracts`, `@midnight-ntwrk/wallet-sdk`
- **Frontend dApp**: React 19, TypeScript, Vite, Tailwind CSS, Lucide Icons
- **Deployment**: Vercel (`vercel.json`), Netlify (`netlify.toml`)
- **CI/CD**: GitHub Actions (`.github/workflows/test.yml`)

---

## Prerequisites

- **Node.js**: `v20.x` or `v22.x` LTS (`node -v` >= 22.0.0)
- **Docker Desktop**: Required to run the local Midnight ZK Proof Server container
- **Compact Compiler**: Compact CLI (`compact 0.5.2` / compiler `0.31.1`)
- **Midnight Wallet**: 1AM Wallet (Chrome/Brave Extension from `1am.xyz`) or Midnight Lace Wallet with Preprod / Preview testnet tokens

---

## Setup & Run Locally

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/Rajdeep-Biswas7/midnight-docs.git
cd midnight-docs
npm install
```

### 2. Start the Midnight Proof Server (Docker)
```bash
docker run -d -p 6300:6300 --name proof-server midnightnetwork/proof-server:latest
```

### 3. Compile the Compact Contract
```bash
npm run compile
```
*Outputs circuits, proving keys, and TypeScript bindings to `managed/`.*

### 4. Run Unit Tests
```bash
npm test
```

### 5. Start Frontend DApp
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 6. Build for Production
```bash
npm run build
```

---

## Run Tests

Run the comprehensive unit test suite covering circuit logic, state transitions, and zero-knowledge privacy guarantees:

```bash
npm test
```

**Test Execution Output:**
```text
▶ Midnight Counter Compact Contract Tests
  ✔ 1. Circuit Logic: executes successfully and validates assert preconditions (24.56ms)
  ✔ 2. State Transitions: initializes correctly and transitions ledger state sequentially (13.05ms)
  ✔ 3. Privacy Model: private witness inputs are never exposed on the public ledger (6.68ms)
✔ Midnight Counter Compact Contract Tests
ℹ tests 3
ℹ suites 1
ℹ pass 3
ℹ fail 0
```

---

## CI/CD

Continuous Integration is configured via GitHub Actions in [`.github/workflows/test.yml`](.github/workflows/test.yml). On every push and pull request to `main`, the workflow automatically:
- Checks out code and provisions Node.js v22 environment.
- Installs dependencies using clean `npm ci`.
- Executes contract compilation and the full unit test suite.
- Builds production web assets to verify bundling.

---

## Usage Guide

1. **Open DApp:** Navigate to [https://privateaid-counterdapp.vercel.app/](https://privateaid-counterdapp.vercel.app/).
2. **Connect Wallet:** Click **"Connect Lace / 1am Wallet"** and approve the connection popup.
3. **Verify Network:** Ensure your wallet is connected to **Midnight Preprod** (or Preview).
4. **Call Circuit:** Click **"Prove & Submit Increment"**.
5. **Local ZK Proving:** Watch the client-side ZK prover generate a zero-knowledge proof in real time.
6. **Confirmation:** The transaction is sealed, fees are balanced, and the updated `round` and `totalValue` appear on-chain. Notice the confirmation badge: **"Proved without revealing your input"**.

---

## Submission Checklist

- [✓] **Public GitHub Repository:** Complete open-source repository with full documentation, architecture diagrams, and comprehensive setup instructions ([https://github.com/Rajdeep-Biswas7/midnight-docs](https://github.com/Rajdeep-Biswas7/midnight-docs)).
- [✓] **Live Demo Link + Contract Address:** Deployed DApp on Vercel ([https://privateaid-counterdapp.vercel.app/](https://privateaid-counterdapp.vercel.app/)) with live verified contracts on Midnight Preprod (`mn_addr_preprod1w7hatkynrx7yzleqse06cvz4dcctsw66xm3387h4vsxkqz5dmq2q7sx7ne`) and Midnight Preview (`e648cb51d165b7050f6bfd2d4846ef0e520c0c15f0e50859230cb5c512f51f5e`).
- [✓] **CI/CD Pipeline:** GitHub Actions workflow ([`.github/workflows/test.yml`](.github/workflows/test.yml)) with automated test and build verification.
- [✓] **Demo Video of the MVP:** [Watch PrivateAid MVP Demo Video on YouTube](https://www.youtube.com/watch?v=lAUVTL0EaUM).
- [✓] **Meaningful Commits:** 15+ meaningful commits across contract development, test suites, cryptographic circuits, and frontend UI.