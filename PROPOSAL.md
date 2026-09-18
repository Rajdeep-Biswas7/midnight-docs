# Product Proposal — PrivateAid Counter

## What is the product, and who uses it?

**PrivateAid Counter** is a privacy-preserving decentralized application that enables users to contribute to a shared public counter or tally on the Midnight blockchain without revealing their individual contribution amount.

**Primary users:**
- **DAO participants** voting or contributing funds without exposing individual amounts to other voters, preventing front-running and collusion.
- **Anonymous aid contributors** who want to support causes (charity pools, public goods funding) without disclosing their personal contribution size on a transparent ledger.
- **ZK application developers** learning how Midnight's dual-state architecture and Compact circuits can be used to build real confidential smart contracts.

## Why Midnight specifically?

Traditional EVM-compatible chains (Ethereum, Solana, Polygon) expose every transaction input publicly. If a DAO contributor submits a vote of `500 tokens`, every observer can see that exact amount — enabling bribery, vote manipulation, and surveillance.

Midnight is uniquely suited for PrivateAid because:

1. **Dual-state architecture**: Midnight natively separates *public ledger state* (what everyone sees) from *private witness state* (what only the caller knows), enforced at the protocol level — not as an application-layer workaround.
2. **Compact ZK circuits**: The `secretIncrement` witness is processed locally in the browser. A zero-knowledge proof guarantees validity (`assert(secret > 0)`) without any witness data crossing the network boundary.
3. **`disclose()` primitive**: Compact's selective disclosure primitive lets the contract deliberately commit only the cumulative total to the ledger, while the individual contribution remains cryptographically invisible to all observers, validators, and the contract itself.

No transparent chain could achieve this without a trusted intermediary or centralized off-chain mixer, both of which introduce trust assumptions that Midnight eliminates at the protocol level.

## Data Model

| Data Point         | Type             | Disclosed To              |
|--------------------|------------------|---------------------------|
| `round`            | Public ledger    | Everyone (on-chain)       |
| `totalValue`       | Public ledger    | Everyone (on-chain)       |
| `secretIncrement`  | Private witness  | No one (off-chain only)   |
| Transaction hash   | Public metadata  | Everyone (on-chain)       |
| ZK proof validity  | Public metadata  | Everyone (verifiable)     |
| Caller identity    | Shielded address | No one (ZK-protected)     |

## Mainnet Feasibility

Yes — PrivateAid Counter is designed with a clear path to Midnight Mainnet:

- The Compact contract (`counter.compact`) is already compiled and deployed to both **Preprod** and **Preview** testnets with live addresses.
- The frontend DApp is deployed to Vercel with SPA routing and production security headers.
- The core cryptographic primitives (`witness`, `assert`, `disclose`) are stable Compact language features, not experimental.
- For Level 6 Mainnet, the primary extension would be adding multi-party sessions (multiple contributors per round), a proposal system for DAO use-cases, and a shielded balance redemption mechanism — all buildable on the existing dual-state model.