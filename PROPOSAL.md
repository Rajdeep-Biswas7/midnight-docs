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

## Mainnet Feasibility
Yes, this product is highly realistic to reach Midnight Mainnet by Level 6. The core privacy circuits involve simple arithmetic threshold comparisons (income < limit) and nullifier-based double-claim prevention, which have low proving overhead and run efficiently inside browser wallet extensions (Lace / 1am). The on-chain state footprint is minimal (a few Uint<64> counters and Bytes<32> commitment hashes). The architecture scales horizontally by deploying separate contract instances per aid program or campaign, keeping gas costs predictable and manageable.