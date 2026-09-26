# PrivateAid — Privacy-Preserving Humanitarian Aid DApp

[![CI](https://github.com/Rajdeep-Biswas7/midnight-docs/actions/workflows/ci.yml/badge.svg)](https://github.com/Rajdeep-Biswas7/midnight-docs/actions/workflows/ci.yml)
[![Network: Midnight Preprod](https://img.shields.io/badge/Network-Midnight_Preprod-6366f1?style=flat&logo=blockchain&logoColor=white)](https://explorer.1am.xyz/contract/0f63bb305f8934af2710eba04baea56d44a29329d8e7333d007c0127657bdc4b?network=preprod)
[![Network: Midnight Preview](https://img.shields.io/badge/Network-Midnight_Preview-8b5cf6?style=flat&logo=blockchain&logoColor=white)](https://explorer.1am.xyz/contract/e648cb51d165b7050f6bfd2d4846ef0e520c0c15f0e50859230cb5c512f51f5e?network=preview)
[![Live DApp: Vercel](https://img.shields.io/badge/Deployment-Vercel_Live-10b981?style=flat&logo=vercel&logoColor=white)](https://privateaid-counterdapp.vercel.app/)
[![Smart Contract: Compact](https://img.shields.io/badge/Language-Compact_0.31.1-purple?style=flat)](https://docs.midnight.network)
[![DApp Connector: CAIP-372](https://img.shields.io/badge/DApp_Connector-CAIP--372_v4-yellow?style=flat)](https://1am.xyz)
[![X Profile: @PrivateAid0](https://img.shields.io/badge/X-@PrivateAid0-black?style=flat&logo=x&logoColor=white)](https://x.com/PrivateAid0)
[![License: Apache-2.0](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](LICENSE)

> PrivateAid is a decentralized, privacy-preserving humanitarian aid application built on the Midnight blockchain. It combines Compact smart contracts, client-side zero-knowledge proofs, and the official 1AM Wallet CAIP-372 connector to verify aid eligibility and confidential contributions without exposing sensitive user data.

<p align="center">
  <a href="https://privateaid-counterdapp.vercel.app/" target="_blank" rel="noreferrer">
    <img src="docs/images/hero-dark.png" alt="PrivateAid DApp Preview - Confidential State Transitions" width="100%" />
  </a>
</p>

[🚀 Live DApp](#live-demo) • [📜 Verified Contracts](#smart-contract-addresses--deployments) • [💼 1AM Wallet Integration](#1am-wallet--dapp-connector-integration) • [📸 Screenshots](#application-previews) • [🎬 Video Walkthrough](#demo-video) • [💡 Architecture](#what-this-does) • [🔒 Privacy Model](#privacy-model) • [🛠️ Tech Stack](#tech-stack) • [💻 Local Setup](#setup--run-locally) • [🧪 Test Suite](#run-tests) • [⚙️ CI/CD Pipeline](#cicd) • [✅ Submission Checklist](#submission-checklist)

---

## Live Demo

- 🌐 **Production Web DApp:** [https://privateaid-counterdapp.vercel.app/](https://privateaid-counterdapp.vercel.app/)
- 🎬 **Video Walkthrough:** [https://www.youtube.com/watch?v=lAUVTL0EaUM](https://www.youtube.com/watch?v=lAUVTL0EaUM)
- 📸 **Visual Showcase:** [Application screenshots and walkthrough](#application-previews)

---

## Contract Address

| Network | Address | Status |
|:---|:---|:---:|
| **Preprod** | `0f63bb305f8934af2710eba04baea56d44a29329d8e7333d007c0127657bdc4b` | 🟢 Verified Live |
| **Preview** | *(pending — redeploy in progress)* | 🟡 Redeploying |

### 🔗 Verifiable On-Chain Evidence
- **Preprod Contract on 1AM Explorer:** [`0f63bb305f8934af2710eba04baea56d44a29329d8e7333d007c0127657bdc4b`](https://explorer.1am.xyz/contract/0f63bb305f8934af2710eba04baea56d44a29329d8e7333d007c0127657bdc4b?network=preprod)
- **Deployment Transaction Hash:** [`bfd00a8ac48f72c3d16cc1cd0dbf509e1bec72c612dcbde9dccd608eeebbb859`](https://explorer.1am.xyz/tx/bfd00a8ac48f72c3d16cc1cd0dbf509e1bec72c612dcbde9dccd608eeebbb859?network=preprod)

---

## Level 5 — User Validation

- **Target:** 50 Preprod users
- **Current Status:** **1 / 50 on-chain transacted** (49 invited/queued)
- **See `USERS.md`** for wallet addresses, transaction evidence, and active onboarding logs
- **See `docs/FEEDBACK.md`** for user feedback log, theme analysis, and resulting product iterations

---

## 1AM Wallet & DApp Connector Integration

PrivateAid uses the official **Midnight DApp Connector API** (`@midnight-ntwrk/dapp-connector-api`) with the **CAIP-372** standard for secure wallet connections and network-aware contract interactions.

1. **Multi-Wallet Discovery (`window.midnight`)**
   - Detects registered providers such as `1am` and `mnLace`.
   - Supports the 1AM Wallet extension and Midnight Lace Wallet.
2. **Official CAIP-372 Authorization Flow**
   - Calls `wallet.enable()` to establish a secure connection.
   - Queries `api.getUnshieldedAddress()` and `api.getShieldedAddresses()`.
   - Reads live balances via `api.getDustBalance()` and `api.getUnshieldedBalances()`.
3. **Dynamic Network ID Switching**
   - Uses `setNetworkId('preprod')` and `setNetworkId('preview')` from `@midnight-ntwrk/midnight-js-network-id`.
   - Keeps network configuration synchronized across contract calls and indexer requests.
4. **Live Midnight Indexer Telemetry**
   - Polls the Preprod and Preview GraphQL endpoints for consensus block height values (`block { height hash timestamp }`).
   - Avoids fake `Math.random()`-based simulation hashes and relies on real Midnight blockchain state.

---

## Demo Video

🎬 **Watch the MVP walkthrough on YouTube:**

[![Watch Demo Video](https://img.youtube.com/vi/lAUVTL0EaUM/hqdefault.jpg)](https://www.youtube.com/watch?v=lAUVTL0EaUM)

*The video demonstrates wallet connection, browser-side ZK proof generation, confidential state transitions, and the successful GitHub CI/CD pipeline.*

---

## Application Previews

### 🌌 1. Confidential State Machine & Dual-Theme UI
A sleek, cyber-inspired interface with dark and light themes, animated background particles, live consensus block height, and network toggles for a polished user experience.

| Dark Cyber Theme (Default) | High-Contrast Light Theme |
|:---:|:---:|
| <img src="docs/images/hero-dark.png" alt="Dark Cyber Theme" width="100%" /> |

---

### 🛡️ 2. Humanitarian Verification Engine & Eligibility Simulator
Interactive zero-knowledge threshold logic models aid qualification rules such as `assert(income < $50,000)`, allowing beneficiaries to prove eligibility without revealing sensitive financial data.

<p align="center">
  <img src="docs/images/humanitarian-engine.png" alt="PrivateAid Humanitarian Verification Engine" width="100%" />
</p>

---

### ⚡ 3. Interactive ZK Circuit Execution Pipeline
A visual walkthrough of how private witnesses are kept in browser memory, evaluated against Compact constraints, proven client-side with WebAssembly ZK-SNARK tooling, and selectively disclosed to the public ledger.

<p align="center">
  <img src="docs/images/zk-pipeline.png" alt="ZK Circuit Execution Pipeline" width="100%" />
</p>

---

### 💼 4. 1AM Wallet Integration & Multi-Token Balances
A seamless wallet connection experience showing unshielded addresses, shielded zero-knowledge addresses, native `tNIGHT` balances, and DUST capacity in a practical humanitarian financing flow.

<p align="center">
  <img src="docs/images/wallet-circuit-execution.png" alt="Midnight Wallet & ZK Circuit Execution" width="100%" />
</p>

---

## What This Does

Traditional on-chain counters, donation pools, and social welfare distribution systems often expose personal contributions, income thresholds, or voting choices on public ledgers. In humanitarian contexts, this can reveal sensitive information about vulnerable beneficiaries and create privacy risks.

PrivateAid addresses this by combining **Midnight's dual-state architecture** with **Compact zero-knowledge smart contracts**:

1. **Confidential Beneficiary Qualification**
   - Beneficiaries prove they satisfy eligibility requirements without revealing personal financial details.
2. **Anonymous Aid Contributions**
   - Donors contribute to humanitarian funds without exposing individual gift amounts.
3. **Client-Side ZK Proving**
   - Proofs are generated in the browser's WebAssembly environment before any data is sent to the network.
4. **Selective On-Chain Disclosure**
   - Using `disclose()`, only validated public state updates are committed to the ledger while private inputs remain hidden.

---

## Privacy Model

| Element | Type | Where It Lives | Who Can See It |
|:---|:---|:---|:---|
| **`round`** | Public Ledger | On-Chain State | Everyone |
| **`totalValue`** | Public Ledger | On-Chain State | Everyone |
| **`secretIncrement`** | Private Witness | Browser Local Memory | Only the Caller |
| **Beneficiary Income / Salt** | Private Witness | Browser Local Memory | Only the Caller |
| **ZK-SNARK Proof** | Cryptographic Proof | Extrinsic Payload | Verifiers / Nodes |

### What the user proves without revealing

- **Valid Input Constraint:** The private input is proven to be strictly positive (`assert(secret > 0)`) or below a threshold.
- **Arithmetic Integrity:** The circuit proves that `newTotal == totalValue + secret` without exposing the secret value.
- **Selective Disclosure:** Only the verified result is committed on-chain, preserving confidentiality for the contributor and beneficiary.

---

## Technical Architecture & Data Flow

```mermaid
flowchart TD
    U[User in Browser] -->|1. Connect| WC[DApp Connector API<br/>Lace / 1am.xyz wallet]
    WC -->|2. Approve connection| U
    U -->|3. Choose action + private input| FE[PrivateAid Frontend<br/>React + Vite]
    FE -->|4. Build unproven tx| WP[Wallet Provider<br/>balanceTx / submitTx]
    FE -->|5. Request proof| PS[Local Proof Server<br/>Docker :6300]
    PS -->|6. Groth16 proof| FE
    FE -->|7. Submit signed tx| NODE[Midnight Node RPC<br/>rpc.preprod.midnight.network]
    NODE -->|8. Included in block| IDX[Indexer<br/>indexer.preprod.midnight.network]
    IDX -->|9. Public ledger state + tx data| FE
    FE -->|10. Render receipt| U

    subgraph Private ["Stays local — never leaves the browser"]
        WITNESS[Private Witness<br/>secretIncrement, income, etc.]
    end
    WITNESS -.->|used only inside proof generation| PS
```

### Architecture Narrative
1. **Wallet Authentication:** The 1AM Wallet connector authenticates the user and exposes real addresses and balances (`api.getUnshieldedAddress`, `api.getDustBalance`) via official CAIP-372 methods — zero mocks or synthetic fallbacks.
2. **Local Witness & Proving:** Private inputs (the witness `secretIncrement` or income data) stay strictly inside local memory and are proven via client-side WebAssembly / local proof server — never transmitted to the public indexer or node.
3. **Selective Disclosure & Consensus:** Only the resulting cryptographic zero-knowledge proof and the public ledger delta (`disclose(newTotal)`, `round += 1`) are committed on-chain. What is provable-but-hidden vs. what is public maps directly to the Compact smart contract's public state vs. private witnesses.

---

## Tech Stack

- **Smart Contracts:** Compact (`.compact`), Compact Pure Circuits, Compact Runtime (`@midnight-ntwrk/compact-runtime`)
- **Zero-Knowledge Infrastructure:** Midnight Proof Server (`midnightnetwork/proof-server:latest`), proving and verification keys (`.zkir`, `.bzkir`, `.prover`, `.verifier`)
- **Blockchain & Network:** Midnight Preprod and Preview testnets, Substrate extrinsics, Midnight Indexer (GraphQL v4)
- **Supported Wallets:** 1AM Wallet (`1am.xyz`), Midnight Lace Wallet, `@midnight-ntwrk/dapp-connector-api`
- **SDK & Protocol:** `@midnight-ntwrk/midnight-js-network-id`, `@midnight-ntwrk/midnight-js-contracts`
- **Frontend DApp:** React 19, TypeScript, Vite, Tailwind CSS, Lucide icons, HTML5 Canvas particle engine
- **Deployment:** Vercel SPA hosting (`vercel.json`)
- **CI/CD Pipeline:** GitHub Actions (`.github/workflows/ci.yml`)

---

## Setup & Run Locally

### 1. Clone & install dependencies

```bash
git clone https://github.com/Rajdeep-Biswas7/midnight-docs.git
cd midnight-docs
npm install
```

### 2. Start the Midnight Proof Server (Docker)

```bash
docker run -d -p 6300:6300 --name proof-server midnightnetwork/proof-server:latest
```

### 3. Compile the Compact contract

```bash
npm run compile
```

This generates the circuit artifacts and TypeScript bindings in `managed/`.

### 4. Run the unit tests

```bash
npm test
```

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### 6. Build for production

```bash
npm run build
```

---

## Run Tests

Run the test suite covering circuit logic, sequential state transitions, and privacy guarantees:

```bash
npm test
```

**Passing test output:**

```text
▶ Midnight Counter Compact Contract Tests
  ✔ 1. Circuit Logic: executes successfully and validates assert preconditions
  ✔ 2. State Transitions: initializes correctly and transitions ledger state sequentially
  ✔ 3. Privacy Model: private witness inputs are never exposed on the public ledger
✔ Midnight Counter Compact Contract Tests
▶ PrivateAid Compact Smart Contract Tests (Level 4)
  ✔ 1. Circuit Logic: executes successfully and validates assert preconditions
  ✔ 2. State Transitions: initializes correctly and transitions ledger state sequentially
  ✔ 3. Privacy Model: private witness inputs are never exposed on the public ledger
  ✔ 4. Address & Network Validation: verifies 32-byte hex and network display names
  ✔ 5. Large Values & Precision: verifies multi-round accumulation with high-value contributions
✔ PrivateAid Compact Smart Contract Tests (Level 4)
ℹ tests 8
ℹ suites 2
ℹ pass 8
ℹ fail 0
```

---

## CI/CD Pipeline

Continuous integration is configured via GitHub Actions in [`.github/workflows/ci.yml`](.github/workflows/ci.yml). On every push and pull request to `main`, the workflow automatically:

1. Provisions a clean Ubuntu environment with Node.js v22.
2. Installs dependencies using `npm install`.
3. Verifies the generated Compact contract bindings in `managed/`.
4. Executes the automated test suite (`npm test`).
5. Validates production frontend bundling (`npm run build`).

---

## Usage Guide

See [docs/USAGE.md](docs/USAGE.md) for a comprehensive walkthrough covering prerequisites, wallet connection, zero-knowledge qualification proofs, confidential donor contributions, and troubleshooting.

---

## Product X Profile

[https://x.com/PrivateAid0](https://x.com/PrivateAid0) — official product profile for PrivateAid on X/Twitter.

---

## Submission Checklist

- [✓] **Public GitHub Repository:** Open-source repository with documentation, architecture notes, and setup instructions ([https://github.com/Rajdeep-Biswas7/midnight-docs](https://github.com/Rajdeep-Biswas7/midnight-docs)).
- [✓] **Verified Contract Hex Addresses:** Deployed and verified contract on Midnight Preprod (`0f63bb305f8934af2710eba04baea56d44a29329d8e7333d007c0127657bdc4b`) with verifiable on-chain deployment transaction [`bfd00a8a...`](https://explorer.1am.xyz/tx/bfd00a8ac48f72c3d16cc1cd0dbf509e1bec72c612dcbde9dccd608eeebbb859?network=preprod); Preview redeployment in progress.
- [✓] **Genuine DApp Connector API:** Official CAIP-372 integration with 1AM Wallet, `setNetworkId('preprod')`, and live GraphQL indexer polling.
- [✓] **Live Demo Link:** Production DApp deployed on Vercel ([https://privateaid-counterdapp.vercel.app/](https://privateaid-counterdapp.vercel.app/)).
- [✓] **Demo Video of the MVP:** [Watch the PrivateAid MVP demo on YouTube](https://www.youtube.com/watch?v=lAUVTL0EaUM).
- [✓] **CI/CD Pipeline:** Automated GitHub Actions workflow ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)) with passing checks.
- [✓] **Product X Profile:** Active public product profile on X/Twitter ([https://x.com/PrivateAid0](https://x.com/PrivateAid0)).
- [✓] **Meaningful Commits:** Structured semantic commits covering contracts, tests, cryptographic circuits, and frontend development.
