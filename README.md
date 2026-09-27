# PrivateAid

![CI](https://github.com/Rajdeep-Biswas7/midnight-docs/actions/workflows/ci.yml/badge.svg)
![Midnight](https://img.shields.io/badge/Midnight-Preprod%20%7C%20Preview-06b6d4?style=flat&logo=blockchain&logoColor=white)

**A privacy-preserving humanitarian aid dApp on the Midnight blockchain — beneficiaries prove eligibility and donors contribute confidentially, using Compact smart contracts and zero-knowledge proofs.**

[**Live Demo**](#live-demo) • [**Contract Address**](#contract-address) • [**Overview**](#what-this-product-does) • [**Privacy Model**](#privacy-model) • [**Tech Stack**](#tech-stack) • [**Local Setup**](#setup--run-locally) • [**Testing**](#run-tests) • [**CI/CD**](#cicd) • [**Usage Guide**](#usage-guide) • [**Level 5 — User Validation**](#level-5--user-validation) • [**Submission Checklist**](#submission-checklist)

---

## Live Demo

🚀 **Live DApp**: https://privateaid-counterdapp.vercel.app/

---

## Demo Video

🎬 **[ADD YOUR REAL DEMO VIDEO LINK HERE — record the actual connect → prove → confirm flow]**

---

## Contract Address

| Network | Address | Explorer |
|---------|---------|----------|
| **Preprod** | `0f63bb305f8934af2710eba04baea56d44a29329d8e7333d007c0127657bdc4b` | [View on 1AM Preprod Explorer ↗](https://explorer.1am.xyz/contract/0f63bb305f8934af2710eba04baea56d44a29329d8e7333d007c0127657bdc4b?network=preprod) |
| Preview | `[FILL IN ONCE CONFIRMED — see your CORS/proving fix thread]` | `[link once you have the real hex]` |

```
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 PrivateAid — Deployed Compact Contract on Midnight Testnet
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 Contract Source  : ./blockchain/contracts/privateaid.compact
 Managed Bindings : ./blockchain/managed/contract/index.js
 Preprod Contract : 0f63bb305f8934af2710eba04baea56d44a29329d8e7333d007c0127657bdc4b
 Preview Contract : [FILL IN ONCE CONFIRMED]
 Active Circuits  : incrementWithSecret (Beneficiary Aid Claim / Confidential Donation)
 Status           : DEPLOYED — see Level 5 section for real on-chain transaction evidence
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
```
*(zkDraw's README embeds deployment-confirmation screenshots here as images — do the same:
screenshot your own real deploy console output and drop it in `assets/`, then reference it
with `![Preprod Deployment](assets/preprod_deployment.png)`. Don't skip this — a real
screenshot of your own terminal is exactly the kind of independently-checkable evidence
that's been the theme of this whole project's fixes.)*

---

## What This Product Does

Traditional aid distribution and donation platforms require beneficiaries to expose sensitive
financial and personal eligibility details, and donors to reveal exactly how much they gave
and to whom — creating privacy risk, stigma, and potential discrimination against the people
the system is meant to help.

**PrivateAid** solves this using Midnight Network's dual-state architecture and Compact
zero-knowledge smart contracts. A beneficiary proves they meet eligibility criteria — without
revealing their actual income, documents, or personal circumstances — and a donor can
increment a confidential relief-pool tally without disclosing their individual contribution
amount. Only the resulting public ledger state (that a valid claim or donation occurred) is
recorded on-chain; the private details behind each proof never leave the prover's own
browser.

---

## Privacy Model

- **What is PUBLIC (on-chain, anyone can see)**:
  - That a valid aid claim or donation circuit call occurred.
  - The resulting public ledger state change (`round += 1` / disclosed running total).
  - The contract address and its full transaction history (hashes, block heights).

- **What is PRIVATE (private witness, never on-chain)**:
  - The beneficiary's actual eligibility inputs (e.g. income, personal circumstance data).
  - The `secretIncrement` witness value and any constraint inputs used to build the proof.
  - Individual donation amounts, where applicable to the Confidential Donation flow.

- **What the user PROVES without revealing**:
  - **At Aid Claim**: the beneficiary proves their private witness satisfies the contract's
    eligibility constraint (`assert(secret > 0)` in the current circuit) without revealing
    the underlying value.
  - **At Donation**: the donor proves a valid increment to the relief pool tally without
    disclosing their individual contribution.

*(Fill in more specific constraint language here once `blockchain/contracts/privateaid.compact`
reflects the full eligibility/authorization logic from your Level 4 fix work — keep this
section matched exactly to what the contract actually enforces, not aspirational language.)*

---

## Tech Stack

- **Smart Contracts**: Compact (`.compact`), Compact Runtime (`@midnight-ntwrk/compact-runtime`)
- **Zero-Knowledge Infrastructure**: Midnight Proof Server / wallet-delegated proving via DApp Connector API `getProvingProvider()`
- **Blockchain & Network**: Midnight Preprod, Midnight Indexer (GraphQL v4), Node RPC
- **Wallets & Connectors**: 1AM Wallet, `@midnight-ntwrk/dapp-connector-api`
- **Frontend dApp**: React, TypeScript, Vite, Tailwind CSS
- **CI/CD**: GitHub Actions (`.github/workflows/ci.yml`)

---

## Prerequisites

- **Node.js**: v22.x LTS
- **Docker Desktop**: for local development/testing of the proof server
- **Midnight Wallet**: 1AM Wallet (browser extension) with Preprod tNIGHT and DUST

---

## Setup & Run Locally

### 1. Clone & Install
```bash
git clone https://github.com/Rajdeep-Biswas7/midnight-docs.git
cd midnight-docs
npm install
```

### 2. Start the Proof Server (for local deploy/testing only — the live frontend uses wallet-delegated proving)
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

```bash
npm test
```
*(Add a real passing-tests screenshot here, same pattern as the deployment evidence above —
`![Tests Passing](assets/tests_passing.png)`.)*

---

## CI/CD

Continuous Integration runs via GitHub Actions
([`.github/workflows/ci.yml`](.github/workflows/ci.yml)). On every push to `main`:
1. Installs dependencies
2. Compiles the Compact contract
3. Runs the test suite
4. Builds the frontend (`npm run build`)

---

## Usage Guide

See [docs/USAGE.md](docs/USAGE.md) for a non-technical, step-by-step guide.

---

## Level 5 — User Validation

- Target: 50 Preprod users
- Verified on-chain: **see [USERS.md](USERS.md)** for the full list of wallet addresses and
  real transaction hashes, each independently checkable at
  `https://explorer.1am.xyz/tx/<hash>?network=preprod`
- Note: 1AM Explorer's homepage activity widget only shows a short rolling window of recent
  blocks and may show low/zero counts depending on when it's viewed — this does not reflect
  historical transaction counts. Each transaction below is individually verifiable by hash
  regardless of the homepage's current state.
- See [docs/FEEDBACK.md](docs/FEEDBACK.md) for the feedback log and resulting changes.

---

## Product X Profile

**[ADD YOUR REAL X PROFILE LINK HERE once created]**

---

## Submission Checklist

- [ ] Public GitHub repository with full documentation
- [x] Live demo deployed (https://privateaid-counterdapp.vercel.app/)
- [ ] Contract address verified on-chain (Preprod confirmed above; Preview pending)
- [ ] CI/CD pipeline green on latest commit
- [ ] Real, screen-recorded demo video showing an actual on-chain transaction
- [ ] Link to product X profile
- [ ] 50 users listed in USERS.md with real, independently verifiable transaction hashes
- [ ] Minimum required commits
