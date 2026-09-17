# PrivateAid Counter

> A privacy-preserving counter smart contract on Midnight Network using zero-knowledge proofs and selective disclosure.

## Contract Address

| Network  | Address                                                          |
|----------|------------------------------------------------------------------|
| Preview  | `e648cb51d165b7050f6bfd2d4846ef0e520c0c15f0e50859230cb5c512f51f5e` |
| Preprod  | [PASTE ADDRESS AFTER DEPLOY]                                     |

## What This Does

The PrivateAid Counter contract demonstrates decentralized privacy-preserving state management on the Midnight blockchain. It maintains an on-chain public tally and increment round counter that users can update by providing private witness inputs. The contract validates through zero-knowledge circuits that the private increment input satisfies all domain rules (such as being strictly positive) and computes the updated total value without exposing the private witness itself on the ledger.

## Privacy Model

- **What is PUBLIC (on-chain, visible to anyone):**
  - `round`: The total number of successful increment rounds performed on the contract.
  - `totalValue`: The current cumulative disclosed total committed to the public ledger.

- **What is PRIVATE (private witness, never on-chain):**
  - `secretIncrement`: The off-chain witness function providing the caller's private increment amount. This value never leaves the client's local execution environment and is never broadcast or stored on-chain.

- **What the user PROVES without revealing:**
  - The user proves they possess a valid, strictly positive secret increment (`assert(secret > 0)`).
  - Using Compact's `disclose()`, the user proves that the new `totalValue` equals the prior `totalValue` plus their private increment, committing only the resulting state transition without leaking the secret increment value itself.

## Tech Stack

- Midnight Network
- Compact Language (v0.23+ / 0.34 compiler)
- Node.js v22+
- Docker (Proof Server `midnightnetwork/proof-server:latest`)
- TypeScript & Node.js Test Runner

## Prerequisites

- **Node.js**: v22.0.0 or higher (`node -v`)
- **Docker Desktop**: Running locally with proof server container listening on port 6300
- **Compact Compiler**: Installed (`compact --version` showing `compact 0.5.2`)
- **Midnight Proof Server**: Running via `docker run -d -p 6300:6300 --name proof-server midnightnetwork/proof-server`

## Setup

1. Clone or open the repository:
   ```bash
   cd D:\privateaid\my-project
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Compile the Compact contract:
   ```bash
   npm run compile
   ```
   *This compiles `contracts/counter.compact` and outputs circuits, keys, and TypeScript bindings to `managed/`.*

## Run Tests

Run the comprehensive unit test suite:
```bash
npm test
```

Expected output:
```text
▶ Midnight Counter Compact Contract Tests
  ✔ 1. Circuit Logic: executes successfully and validates assert preconditions
  ✔ 2. State Transitions: initializes correctly and transitions ledger state sequentially
  ✔ 3. Privacy Model: private witness inputs are never exposed on the public ledger
✔ Midnight Counter Compact Contract Tests
ℹ tests 3
ℹ suites 1
ℹ pass 3
ℹ fail 0
```

## Initial Idea

[LEAVE PLACEHOLDER — I will fill this in manually]

## Screenshots

[LEAVE PLACEHOLDER — I will add compile output and contract address screenshots]
