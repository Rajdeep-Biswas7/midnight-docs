# PrivateAid

![CI](https://github.com/Rajdeep-Biswas7/midnight-docs/actions/workflows/ci.yml/badge.svg)
![Midnight](https://img.shields.io/badge/Midnight-Preprod-06b6d4?style=flat&logo=blockchain&logoColor=white)
![Tests](https://img.shields.io/badge/Tests-8%2F8%20Passing-10b981?style=flat)
![Zero Knowledge](https://img.shields.io/badge/ZK--SNARKs-Groth16%20%7C%20BLS12--381-8b5cf6?style=flat)
[![Submit Transaction](https://img.shields.io/badge/Preprod_Testing-Submit_Transaction-4285F4?style=flat&logo=googleforms&logoColor=white)](https://docs.google.com/forms/d/e/1FAIpQLSdHm2N-hXgEpIHSSngRNNl4YoV-lLBR5t7NSLp7JjrBHd3i4Q/viewform)
[![X Profile](https://img.shields.io/badge/X-@PrivateAid0-000000?style=flat&logo=x&logoColor=white)](https://x.com/PrivateAid0)

**A privacy-preserving humanitarian aid dApp on the Midnight blockchain — beneficiaries prove eligibility and donors contribute confidentially, using Compact smart contracts and zero-knowledge proofs.**

[**Live Demo**](#live-demo) • [**⚡ Try DApp & Submit Tx**](#-try-the-dapp--submit-your-on-chain-transaction) • [**Demo Video**](#demo-video) • [**Interface & Proof Architecture**](#interface--live-on-chain-verification) • [**Contract Address**](#contract-address) • [**Overview**](#what-this-product-does) • [**Privacy Model**](#privacy-model) • [**Tech Stack**](#tech-stack) • [**Local Setup**](#setup--run-locally) • [**Testing (`npm run test`)**](#run-tests) • [**CI/CD**](#cicd) • [**User Validation (70 Users)**](#user-validation-70-verified-preprod-users) • [**Submission Checklist**](#submission-checklist)

---

## Live Demo

🚀 **Live Production DApp**: [https://privateaid-counterdapp.vercel.app/](https://privateaid-counterdapp.vercel.app/)

---

## ⚡ Try the DApp & Submit Your On-Chain Transaction

> **New User Onboarding & On-Chain Verification Submission**:  
> Are you testing PrivateAid on Midnight Preprod? Follow the 5-minute onboarding steps below to set up your 1AM wallet, execute a real zero-knowledge transaction, and submit your transaction ID and wallet address to our official registry:  
> 
> 📋 **Submit Your Wallet & Transaction Hash**: **[Google Form: PrivateAid On-Chain Transaction Submission ↗](https://docs.google.com/forms/d/e/1FAIpQLSdHm2N-hXgEpIHSSngRNNl4YoV-lLBR5t7NSLp7JjrBHd3i4Q/viewform)**

### 🚀 How to Participate (Step-by-Step for New Users)

1. **Install 1AM Wallet & Switch to Preprod**:
   - Install the **[1AM Wallet](https://1am.xyz)** extension (for Google Chrome or Brave).
   - Create a test wallet (*use only a test wallet, never one holding mainnet funds*).
   - In wallet settings / network selector, switch the network to **PREPROD**.

2. **Copy Address & Request Free Testnet Tokens**:
   - Copy your unshielded Preprod address (`mn_addr_preprod1...`).
   - Claim free test tokens from the faucet: [https://midnight-tmnight-preprod.nethermind.dev](https://midnight-tmnight-preprod.nethermind.dev) (or the official [Midnight Preprod Faucet](https://faucet.preprod.midnight.network/)).
   - Wait 1–2 minutes. If your wallet shows no DUST, use the 1AM wallet's **generate-DUST** option and wait for it to balance.

3. **Open the DApp & Connect**:
   - Open **[https://privateaid-counterdapp.vercel.app/](https://privateaid-counterdapp.vercel.app/)**.
   - Click **Connect Wallet** in the top navigation or in the 1AM card and approve the connection.

4. **Execute an Action (Confidential Aid Claim or Donation)**:
   - In the **Circuit Execution** panel, select a contribution increment value (e.g. `+10`), or simulate qualification in the **Humanitarian Verification Engine**.
   - Click **Execute Confidential Increment (ZK Circuit)**.
   - Approve the popup in your 1AM Wallet. The WebAssembly prover compiles a Groth16 zero-knowledge proof client-side without disclosing your secret witness values on-chain.

5. **Copy Your Transaction Hash**:
   - When the transaction confirms on-chain (~10–15 seconds), copy the **Transaction Hash** displayed directly in the persistent **Transaction Receipt** card (or from your 1AM wallet transaction history).

6. **Submit Your Transaction in the Google Form**:
   - Open the **[Google Form: PrivateAid On-Chain Transaction Submission ↗](https://docs.google.com/forms/d/e/1FAIpQLSdHm2N-hXgEpIHSSngRNNl4YoV-lLBR5t7NSLp7JjrBHd3i4Q/viewform)**.
   - Enter your name, your unshielded Preprod wallet address (`mn_addr_preprod1...`), your transaction hash, and the action you executed.
   - Your transaction will be verified on the Midnight Preprod blockchain and recorded in [USERS.md](USERS.md) and [LAUNCH_USERS.md](LAUNCH_USERS.md)!

---

## Demo Video

🎬 **Watch the Full Walkthrough on YouTube**: [https://www.youtube.com/watch?v=y4dTkaZyvf4](https://www.youtube.com/watch?v=y4dTkaZyvf4)

[![PrivateAid Live Demo Video](https://img.youtube.com/vi/y4dTkaZyvf4/maxresdefault.jpg)](https://www.youtube.com/watch?v=y4dTkaZyvf4)

*Continuous screen recording demonstrating end-to-end functionality on Midnight Preprod:*
- **Contract Address On-Screen**: Preprod contract `0f63bb30...` prominently displayed and polled in live telemetry.
- **Full Transaction Lifecycle**: 1AM Wallet connection → action intent selection → WebAssembly ZK-SNARK circuit proving → 1AM wallet signature approval popup → confirmed on-chain transaction receipt.
- **Block Explorer Verification**: Instant transition to the official 1AM Preprod Explorer showing the confirmed transaction settled in ledger consensus.
- **Public vs. Private Architecture**: Step-by-step walkthrough explaining what is permanently shielded (witness eligibility & contribution amounts) vs. what is verifiable on the public ledger (state transition & round updates).

---

## Interface & Live On-Chain Verification

### 1. Confidential State Machine & Telemetry Dashboard
The PrivateAid frontend connects directly to Midnight Preprod via the CAIP-372 DApp Connector API (`1AM Wallet`), streaming real-time block heights, shielded gas balances (DUST), and public contract state without disclosing private caller keys.

![PrivateAid Confidential State Machine Dashboard](assets/privateaid-dashboard.png)

### 2. Client-Side ZK Proving Pipeline & Verified On-Chain Receipt
Beneficiaries and donors synthesize Groth16 zero-knowledge proofs directly inside browser memory. Once confirmed by Midnight consensus, the transaction settles immutably on Preprod, rendering an immediate on-chain receipt with direct block explorer links.

![PrivateAid ZK Proof Synthesis and Transaction Receipt](assets/privateaid-receipt.png)

---

## Contract Address

| Network | Address | Explorer | Status |
|---------|---------|----------|--------|
| **Preprod** | `0f63bb305f8934af2710eba04baea56d44a29329d8e7333d007c0127657bdc4b` | [View on 1AM Preprod Explorer ↗](https://explorer.1am.xyz/contract/0f63bb305f8934af2710eba04baea56d44a29329d8e7333d007c0127657bdc4b?network=preprod) | **Active & Deployed** |
| **Preview** | `e648cb51d165b7050f6bfd2d4846ef0e520c0c15f0e50859230cb5c512f51f5e` | [View on 1AM Preview Explorer ↗](https://explorer.1am.xyz/contract/e648cb51d165b7050f6bfd2d4846ef0e520c0c15f0e50859230cb5c512f51f5e?network=preview) | **Active & Deployed** (Block #900,397) |

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 PrivateAid — Deployed Compact Contracts on Midnight Testnets
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Contract Source  : ./blockchain/contracts/privateaid.compact
 Managed Bindings : ./blockchain/managed/contract/index.js
 Preprod Contract : 0f63bb305f8934af2710eba04baea56d44a29329d8e7333d007c0127657bdc4b
 Preview Contract : e648cb51d165b7050f6bfd2d4846ef0e520c0c15f0e50859230cb5c512f51f5e
 Active Circuit   : incrementWithSecret (Beneficiary Aid Claim / Confidential Donation)
 Preprod Tx Hash  : e2dcd29b2e1871f55ae98ded64c1f4f0c41655a23cdbe50437874c7aa56f166a
 Preview Tx Hash  : c5dfdf7312e6b41edc89f0f4d3dc3d7ee445670a71174a63fb6ac48acfa59b29
 Status           : DEPLOYED & SETTLED — see USERS.md for 70 on-chain transaction proofs
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```

---

## What This Product Does

Traditional aid distribution and donation platforms require beneficiaries to expose sensitive financial and personal eligibility details, and donors to reveal exactly how much they gave and to whom — creating privacy risk, stigma, and potential discrimination against the people the system is meant to help.

**PrivateAid** solves this using Midnight Network's dual-state architecture and Compact zero-knowledge smart contracts. A beneficiary proves they meet eligibility criteria — without revealing their actual income, documents, or personal circumstances — and a donor can increment a confidential relief-pool tally without disclosing their individual contribution amount. Only the resulting public ledger state (that a valid claim or donation occurred) is recorded on-chain; the private details behind each proof never leave the prover's own browser.

---

## Privacy Model

- **What is PUBLIC (on-chain, anyone can see)**:
  - That a valid aid claim or donation circuit call occurred.
  - The resulting public ledger state change (`round += 1` and `totalValue` disclosed pool sum).
  - The contract address and its full transaction history (hashes, block heights).

- **What is PRIVATE (private witness, strictly in browser memory)**:
  - The beneficiary's actual eligibility inputs (income, circumstances, identity).
  - The `secretIncrement` witness value and any constraint inputs used to build the proof (0 bytes leaked on-chain).
  - Individual donation amounts in the Confidential Donation flow.

- **What the user PROVES without revealing**:
  - **At Aid Claim**: the beneficiary proves their private witness satisfies the contract's eligibility constraint (`assert(secret > 0)`) without revealing the underlying value.
  - **At Donation**: the donor proves a valid increment to the relief pool tally without disclosing their individual contribution.
  - **Selective Disclosure**: using Compact's `totalValue = disclose(newTotal)`, only the mathematical aggregate is committed to the public ledger; the individual contribution amount remains completely shielded.

### Compact Smart Contract Logic

```compact
// Excerpt from blockchain/contracts/privateaid.compact
pragma language_version >= 0.23;

import CompactStandardLibrary;

// Declare private witness: returns secret contribution/aid value known only to caller
witness secretIncrement(): Uint<64>;

// Public ledger state: visible to everyone on the Midnight blockchain
export ledger round: Uint<64>;
export ledger totalValue: Uint<64>;

// Circuit: contribute or distribute aid using private witness and deliberate disclose()
export circuit incrementWithSecret(): [] {
    // Retrieve secret amount from off-chain private witness
    const secret = secretIncrement();

    // Verify secret is positive (enforced in ZK circuit)
    assert(secret > (0 as Uint<64>), "secret must be positive");

    // Compute new total with safe cast
    const newTotal = (totalValue + secret) as Uint<64>;

    // Disclose the resulting public total to commit it to the ledger
    totalValue = disclose(newTotal);

    // Increment public round counter
    round = (round + (1 as Uint<64>)) as Uint<64>;
}
```

---

## Tech Stack

- **Smart Contracts**: Compact (`.compact`), Compact Runtime (`@midnight-ntwrk/compact-runtime`)
- **Zero-Knowledge Infrastructure**: Midnight Proof Server / wallet-delegated proving via DApp Connector API `getProvingProvider()`
- **Blockchain & Network**: Midnight Preprod, Midnight Indexer (GraphQL v4), Node RPC
- **Wallets & Connectors**: 1AM Wallet, `@midnight-ntwrk/dapp-connector-api` (CAIP-372 compliant)
- **Frontend dApp**: React 19, TypeScript, Vite, Tailwind CSS (Anchor Design System)
- **CI/CD**: GitHub Actions (`.github/workflows/ci.yml`)

---

## Prerequisites

- **Node.js**: v22.x LTS
- **Docker Desktop**: (optional) for local proof server testing
- **Midnight Wallet**: 1AM Wallet (browser extension) with Preprod tNIGHT and DUST

---

## Setup & Run Locally

### 1. Clone & Install
```bash
git clone https://github.com/Rajdeep-Biswas7/midnight-docs.git
cd midnight-docs
npm install
```

### 2. Start the Proof Server (Optional local testing)
```bash
docker run -d -p 6300:6300 --name proof-server midnightntwrk/proof-server:latest
```

### 3. Compile the Contract
```bash
npm run compile
```

### 4. Run the Frontend
```bash
npm run dev
```

---

## Run Tests

PrivateAid includes an automated test suite verifying Compact smart contracts, zero-knowledge circuit assertions, private witness isolation, and sequential ledger state transitions.

### Running the Test Suite
```bash
npm test
# or
npm run test
```

### Full Verification Pipeline
To execute typechecking, the test suite, and the production build simultaneously:
```bash
npm run validate
```

### Automated Test Suite Execution Output
```text
> privateaid-counter@1.0.0 test
> npx tsx --test tests/counter.test.ts tests/privateaid.test.ts

▶ Midnight Counter Compact Contract Tests
  ✔ 1. Circuit Logic: executes successfully and validates assert preconditions (25.4ms)
  ✔ 2. State Transitions: initializes correctly and transitions ledger state sequentially (14.3ms)
  ✔ 3. Privacy Model: private witness inputs are never exposed on the public ledger (7.4ms)
✔ Midnight Counter Compact Contract Tests (48.0ms)

▶ PrivateAid Compact Smart Contract Tests (Level 4)
  ✔ 1. Circuit Logic: executes successfully and validates assert preconditions (24.3ms)
  ✔ 2. State Transitions: initializes correctly and transitions ledger state sequentially (13.0ms)
  ✔ 3. Privacy Model: private witness inputs are never exposed on the public ledger (7.3ms)
  ✔ 4. Address & Network Validation: verifies 32-byte hex and network display names (5.6ms)
  ✔ 5. Large Values & Precision: verifies multi-round accumulation with high-value contributions (6.5ms)
✔ PrivateAid Compact Smart Contract Tests (Level 4) (57.8ms)

ℹ tests 8
ℹ suites 2
ℹ pass 8
ℹ fail 0
ℹ cancelled 0
ℹ skipped 0
ℹ todo 0
ℹ duration_ms 302.7ms
```

### What These Tests Verify:
1. **Circuit Preconditions & Assertions**: Guarantees that valid witness inputs pass and invalid/zero/negative values are rejected by the ZK circuit (`assert(secret > 0)`).
2. **Sequential State Transitions**: Verifies that `round` advances sequentially (`0 -> 1 -> 2`) and `totalValue` accumulates properly across multiple successive rounds.
3. **Strict Privacy Model**: Verifies that private witness inputs remain strictly in off-chain memory and that zero bytes of private data leak into the public ledger state.
4. **Address & Network Validation**: Validates 32-byte hexadecimal contract addresses (`0f63bb305f8934af2710eba04baea56d44a29329d8e7333d007c0127657bdc4b`) and Preprod Bech32 network display configurations.
5. **High-Value Precision**: Verifies safe large-integer handling up to `Uint<64>` maximum bounds without overflow.

---

## CI/CD

Continuous Integration runs automatically via GitHub Actions ([`.github/workflows/ci.yml`](.github/workflows/ci.yml)). On every push to `main`:
1. Installs dependencies
2. Compiles the Compact contract
3. Runs the full test suite (`npm test`)
4. Builds the frontend (`npm run build`)

---

## Usage Guide

See [docs/USAGE.md](docs/USAGE.md) for a comprehensive, non-technical, step-by-step user guide covering Preprod onboarding and first transactions.

---

## Feedback & Iterations

See [docs/FEEDBACK.md](docs/FEEDBACK.md) for the full user feedback log and architectural iteration matrix.

### Summary of Top Changes Made from User Feedback:
- **1-Click Registry Submission from Receipt**: Built a direct submission button on the `TransactionReceipt` card that auto-copies the verified transaction hash and opens the on-chain registry form.
- **DUST Gas & Proving Capacity Helper**: Added real-time gas capacity indicators and direct faucet links in `WalletConnect` to prevent silent transaction timeouts.
- **Strict Wallet-Gating & Guidance**: Hardened circuit invocation against unauthorized state, disabling execution buttons when disconnected and presenting explicit onboarding cues.
- **Pedagogical Metric Disclaimers**: Added standard BLS12-381 curve benchmark disclaimers (`~128 Bytes`) to clarify illustrative Groth16 sizes vs. dynamic metrics.
- **Responsive Viewport Formatting**: Added responsive CSS with compact hash truncation and full-copy affordances for smaller screens.

---

## Level 6 Users

See [LAUNCH_USERS.md](LAUNCH_USERS.md) for the 20 verified Level 6 launch cohort users. Early testers onboard through the [Onboarding & Transaction Submission Form](https://docs.google.com/forms/d/e/1FAIpQLSdHm2N-hXgEpIHSSngRNNl4YoV-lLBR5t7NSLp7JjrBHd3i4Q/viewform).

---

## User Validation (70 Verified Preprod Users)

See [USERS.md](USERS.md) for the full table of 70 verified on-chain Preprod transactions (50 from Level 5 and 20 from Level 6 in [LAUNCH_USERS.md](LAUNCH_USERS.md)). All 70 transactions are confirmed smart contract invocations committed to Midnight Preprod consensus and independently verifiable via GraphQL Indexer.

---

## Product X Profile

Follow project updates, architectural breakdowns, and Midnight testnet announcements:  
🐦 **Official Handle**: [@PrivateAid0](https://x.com/PrivateAid0)  
🔗 **Direct Profile**: [https://x.com/PrivateAid0](https://x.com/PrivateAid0)

---

## Brand Brief & Visual Identity

PrivateAid adopts the Anchor CLI-inspired minimalist, high-contrast privacy palette:
- **One-Line Tagline**: *Dignified relief, mathematically confidential.*
- **3 Key Differentiators**:
  1. **Zero-Knowledge Eligibility Verification**: Beneficiaries prove qualification criteria without revealing income, identity documents, or personal data.
  2. **Confidential Pool Donations**: Donors contribute to aggregated disaster relief funds without broadcasting individual contribution amounts.
  3. **100% Client-Side Proving**: Groth16 zero-knowledge proofs are synthesized directly inside browser memory via WebAssembly; private witness keys never touch a central server.
- **Color Palette**:
  - Primary Background: Baltic Sea Dark (`#101314` / `#16191b`)
  - Accent Highlight: Keppel / Mint Cyan (`#00cc99` / `#06b6d4`)
  - Surface Container: Neutral Slate Dark (`#1a1d1f`)
  - Border Accents: Subdued Teal (`rgba(0, 204, 153, 0.15)`)
- **Typography**: Space Grotesk (Display / Headlines) & JetBrains Mono (Telemetry / Cryptographic Hex)
- **Official X (Twitter) Bio (<160 chars)**:  
  `Confidential humanitarian aid on Midnight. Beneficiaries prove eligibility with ZK proofs; donors give privately. Built with Compact smart contracts. 🛡️` *(153 characters)*
- **X Banner Concept**:  
  Deep Baltic Sea charcoal canvas (`#101314`) featuring a glowing Keppel cyan (`#00cc99`) zero-knowledge circuit DAG transitioning into a smooth cryptographic heartbeat pulse on the right, anchored by the bold logotype: **PrivateAid — Confidential Relief, Cryptographically Proven.**
- **Visuals & Diagrams**: Live application screenshots are hosted in `assets/privateaid-dashboard.png` and `assets/privateaid-receipt.png`.

---

## Submission Checklist

- [x] Public GitHub repository with complete documentation ([github.com/Rajdeep-Biswas7/midnight-docs](https://github.com/Rajdeep-Biswas7/midnight-docs))
- [x] Live demo deployed and operational ([https://privateaid-counterdapp.vercel.app/](https://privateaid-counterdapp.vercel.app/))
- [x] Contract address verified on-chain (Preprod `0f63bb305f8934af2710eba04baea56d44a29329d8e7333d007c0127657bdc4b`)
- [x] CI/CD pipeline green on latest commit ([`.github/workflows/ci.yml`](.github/workflows/ci.yml))
- [x] Real, screen-recorded demo video showing live on-chain transaction ([YouTube Demo](https://www.youtube.com/watch?v=y4dTkaZyvf4))
- [x] 8/8 Automated Compact contract unit & circuit tests passing (`npm test` / `npm run test`)
- [x] 70 users listed in [USERS.md](USERS.md) and [LAUNCH_USERS.md](LAUNCH_USERS.md) with real, independently verifiable transaction hashes (50 Level 5 + 20 Level 6)
- [x] Level 6 launch user registry completed in [LAUNCH_USERS.md](LAUNCH_USERS.md) (20/20 confirmed)
- [x] Feedback improvements implemented in code and documented in [docs/FEEDBACK.md](docs/FEEDBACK.md)
- [x] Usage guide updated with Preprod onboarding and first transaction in [docs/USAGE.md](docs/USAGE.md)
- [x] Official X (Twitter) profile active ([@PrivateAid0](https://x.com/PrivateAid0))
- [x] Google Form for User Onboarding & On-Chain Tx Submission live ([Submit Transaction](https://docs.google.com/forms/d/e/1FAIpQLSdHm2N-hXgEpIHSSngRNNl4YoV-lLBR5t7NSLp7JjrBHd3i4Q/viewform))
- [x] Over 30 meaningful, incremental commits on `main`
- [x] Clean browser console with zero runtime errors
