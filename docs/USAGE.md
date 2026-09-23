# How to Use PrivateAid

Welcome to **PrivateAid**, a privacy-preserving humanitarian aid platform built on the Midnight blockchain. PrivateAid allows beneficiaries to prove their eligibility for aid and donors to contribute funds without exposing personal financial details or identities to public ledgers.

---

## What You Need

Before interacting with PrivateAid on the Midnight Preprod testnet, make sure you have:

1. **A Supported Web3 Wallet**:
   - **1AM Wallet** (Chrome Extension from [1am.xyz](https://1am.xyz)) OR **Midnight Lace Wallet**.
   - Make sure your wallet is set to the **Midnight Preprod Testnet**.
2. **Testnet Tokens (tNIGHT & DUST)**:
   - Request testnet tokens from the official [Midnight Faucet](https://faucet.preprod.midnight.network/).
   - Ensure your wallet has sufficient **DUST** capacity for zero-knowledge transaction fees.
3. **A Modern Web Browser**:
   - Google Chrome, Brave, Chromium, or Microsoft Edge.
4. **Internet Connection**:
   - Needed to reach the Midnight Preprod GraphQL Indexer and RPC node.

---

## Step-by-Step Guide

Follow these simple steps to use PrivateAid:

### 1. Connect Your Wallet
1. Open the [PrivateAid Web App](https://privateaid-counterdapp.vercel.app/).
2. Click the **Connect Wallet** button in the header or in the 1AM Wallet card.
3. Select your installed wallet (**1AM Wallet** or **Lace**).
4. Approve the connection request in the wallet popup.
5. Your address, token balances, and network status will display immediately.

### 2. Verify Beneficiary Eligibility (Zero-Knowledge)
*If you are an aid applicant or beneficiary seeking relief qualification:*
1. Scroll to the **Humanitarian Verification Engine & Eligibility Simulator**.
2. Enter your annual household income (e.g. `$24,000`).
3. Click **Simulate ZK Qualification**.
4. The zero-knowledge circuit evaluates client-side whether your income meets the humanitarian threshold (`assert(income < $50,000)`).
5. A green verification badge confirms your qualification. **Notice:** Your exact income figure never leaves your browser and is never stored on the blockchain!

### 3. Make a Confidential Aid Contribution
*If you are a donor contributing relief funds to the pool:*
1. In the **Circuit Execution** panel, choose a contribution value.
2. Click **Execute Confidential Increment (ZK Circuit)**.
3. Your wallet will prompt you to authorize the zero-knowledge transaction:
   - The private witness synthesizes your confidential gift amount in local memory.
   - The Compact circuit computes the new aggregate pool total.
   - The extrinsic is submitted to the Midnight Preprod blockchain.
4. Once confirmed, the on-chain **Total Disclosed Relief Pool** updates and the **Round Counter** increments. Your individual donation amount remains 100% confidential.

### 4. Review On-Chain Activity & Verification Pipeline
1. View the **Interactive ZK Circuit Execution Pipeline** to see how off-chain private witnesses, WebAssembly provers, and selective disclosures interact.
2. View the **On-Chain Contribution & Transition Feed** to inspect verified on-chain extrinsics and block explorer links.
3. You can verify the smart contract state directly on the [1AM Preprod Explorer](https://explorer.1am.xyz/contract/02c01991a0f8bfd2d4846ef0e520c0c15f0e50859230cb5c512f51f5e89a3f21?network=preprod) to confirm cumulative pool updates without any private data exposure.

---

## What Gets Proved (and What Stays Private)

| Data Point | What Happens to It | Who Can See It |
|:---|:---|:---|
| **Aid Distribution Round** | Publicly incremented on the Midnight ledger | Everyone (On-chain) |
| **Total Disclosed Pool Balance** | Disclosed on-chain using `disclose()` | Everyone (On-chain) |
| **Your Secret Donation Amount** | Evaluated via private witness `secretIncrement()` | **Only You** (0 bytes on-chain) |
| **Your Household Income** | Proven via client-side inequality constraint | **Only You** (0 bytes on-chain) |
| **Your Personal Identity** | Shielded via Midnight ZK addresses | **Only You** (Confidential) |
| **Validity of the Transaction** | Validated via cryptographic ZK-SNARK proof | Verifiers & Nodes |

---

## Troubleshooting

### 1. "Wallet connection rejected or cancelled"
- **Solution:** Open your 1AM Wallet extension, verify that it is unlocked, and ensure that the network is set to **Preprod**. Refresh the page and click **Connect Wallet** again.

### 2. "Insufficient DUST balance or DUST cap exceeded"
- **Solution:** Midnight transactions require DUST for transaction fee capacity. Visit the Midnight Faucet or use your 1AM wallet's faucet feature to refill your DUST cap.

### 3. "Extrinsic submission failed or timeout"
- **Solution:** Check your internet connection and verify that the Midnight Preprod indexer is responsive. Switch networks to Preview and back to Preprod to reconnect the RPC endpoint.

### 4. "Circuit assertion failed"
- **Solution:** The contract enforces that aid amounts must be positive numbers (`assert(secret > 0)`). Make sure your contribution amount is greater than 0.

### 5. "Transaction stays pending"
- **Solution:** Block finalization on Midnight Preprod takes approximately 10-15 seconds. You can click on the extrinsic hash to monitor progress on the 1AM Preprod Explorer.

