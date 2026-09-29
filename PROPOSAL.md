# Product Proposal

## What is the product, and who uses it?
PrivateAid is a privacy-preserving humanitarian aid verification and distribution platform built on the Midnight blockchain. It enables beneficiaries of disaster relief, refugee programs, and social welfare schemes to prove they meet eligibility criteria (such as income below a threshold, family size, or displacement status) without revealing the underlying sensitive data. Aid organizations, NGOs (such as UNHCR, Red Cross, WFP), and government welfare departments use PrivateAid to distribute funds fairly and verifiably while protecting beneficiary dignity and safety. Donors use it to contribute anonymously, free from social pressure or solicitation.

## Why Midnight specifically?
On transparent blockchains (Ethereum, Cardano L1, Solana), every transaction amount, wallet address, and interaction is publicly visible. For humanitarian aid, this means a beneficiary's income level, claim history, and identity can be tracked, profiled, and exploited by bad actors. Midnight's dual-state architecture solves this by separating public ledger state (total claims, pool balance) from private witness inputs (individual income, identity, eligibility data). Compact's zero-knowledge circuits allow beneficiaries to mathematically prove eligibility without disclosing anything beyond a binary yes/no result. No transparent chain can achieve this without off-chain trusted intermediaries.

## Data Model
| Data Point              | Type            | Disclosed To         |
|-------------------------|-----------------|----------------------|
| Total Aid Pool Balance  | Public ledger   | Everyone             |
| Total Claims Count      | Public ledger   | Everyone             |
| Execution Round         | Public ledger   | Everyone             |
| Claim Status (Open/Closed) | Public ledger | Everyone             |
| Beneficiary Income      | Private witness | No one (client only) |
| Beneficiary Identity    | Private witness | No one (client only) |
| Eligibility Threshold   | Public ledger   | Everyone             |
| Increment/Contribution Amount | Private witness | No one (client only) |
| ZK Proof of Eligibility | Public ledger   | Verifiers only       |

## Mainnet Feasibility & Launch Readiness
Yes, this product has successfully proven mainnet readiness throughout Level 5 and Level 6, backed by 70 verified on-chain Preprod transactions, automated client-side Groth16 ZK proof generation, and live dual-testnet deployments (Preprod and Preview). The core privacy circuits execute lightweight arithmetic threshold comparisons (`income < limit`) and confidential pool increments with minimal proving overhead, running smoothly within browser WebAssembly and 1AM wallet extensions. The on-chain state footprint is deterministic and compact (public counters and 32-byte commitments). The architecture scales horizontally by deploying dedicated contract instances per humanitarian relief campaign while preserving complete beneficiary confidentiality.