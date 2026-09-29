# How to Use PrivateAid — User Guide

Welcome to **PrivateAid**, a privacy-preserving humanitarian aid platform built on the Midnight blockchain. 

PrivateAid protects beneficiaries and donors alike:
- **Beneficiaries** can mathematically prove their qualification for aid without handing over sensitive personal financial documents or publicizing their identity.
- **Donors** can contribute funds to an aggregated relief pool without broadcasting how much they personally gave.

Everything is proven in your own web browser using zero-knowledge cryptography (ZK-SNARKs) powered by Midnight's Compact smart contracts.

---

## Getting Started on Preprod

Setting up takes under 3 minutes:

### 1. Install a Midnight Web3 Wallet
You need a browser extension wallet that supports Midnight Preprod:
* **[1AM Wallet](https://1am.xyz)** (Recommended, available for Google Chrome and Brave).
* **Midnight Lace Wallet** (Alternate option).

### 2. Switch Your Wallet Network to Preprod
1. Open your wallet extension.
2. Open the network selector menu (usually in settings or the top header).
3. Select **Midnight Preprod** (Network ID: `preprod`).

### 3. Claim Free Testnet Tokens
Transactions on Midnight use two testnet resources:
* **tNIGHT**: The native network token used for basic network operations.
* **DUST**: Shielded gas capacity required to process zero-knowledge proofs.

To get free tokens:
1. Copy your unshielded address (starts with `mn_addr_preprod1...`).
2. Visit the [Midnight Nethermind Faucet](https://midnight-tmnight-preprod.nethermind.dev) or the official [Midnight Faucet](https://faucet.preprod.midnight.network/).
3. Paste your address and request tokens.
4. Wait 1–2 minutes. If your 1AM wallet shows 0 DUST, open the 1AM extension and use the **Generate DUST** option.

---

## Your First Transaction

Once your wallet has test tokens, you are ready to interact with PrivateAid:

### Step 1: Connect Your Wallet
1. Visit the live dApp: [https://privateaid-counterdapp.vercel.app/](https://privateaid-counterdapp.vercel.app/)
2. Click **Connect Wallet** in the top navigation or in the 1AM Wallet card.
3. Approve the connection popup in your wallet.
4. Your shielded address, public address, and real-time DUST capacity balance will appear in the dashboard.

### Step 2: Try the Zero-Knowledge Eligibility Simulator
1. Scroll to the **Humanitarian Verification Engine & Eligibility Simulator**.
2. Enter an illustrative annual income (e.g. `$24,000`).
3. Click **Simulate ZK Qualification**.
4. The simulator evaluates the inequality constraint (`income < $50,000`) locally in your browser.
5. A green verification badge confirms qualification. **Your exact income figure never leaves your browser and is never committed to the blockchain.**

### Step 3: Execute a Confidential Aid Action on Preprod
1. In the **Circuit Execution** panel, choose your action intent:
   * **Beneficiary Aid Claim**: Proves eligibility constraint.
   * **Confidential Donation**: Increments the relief pool tally confidentially.
2. Select your contribution increment (e.g., `+10`).
3. Click **Execute Confidential Increment (ZK Circuit)**.
4. Your wallet will prompt you to approve the transaction:
   * Your browser calculates your private witness (`secretIncrement()`).
   * A WebAssembly prover builds a mathematical Groth16 zero-knowledge proof.
   * The transaction is signed and broadcast to Midnight Preprod.

### Step 4: Inspect Your Persistent Receipt & Explorer
1. Once confirmed on-chain (~10–15 seconds), a **Persistent Transaction Receipt** card will display:
   * **Transaction Hash**: Unique 64-character identifier.
   * **Consensus Block**: The exact block height where your proof was finalized.
   * **Disclosed Total**: The updated public relief pool sum.
2. Click **View On 1AM Explorer** to inspect the live transaction on the block explorer.
3. Click **Submit Tx to Registry 📋** to automatically copy your transaction hash and submit your address to the official testnet registry.

---

## What Gets Proved vs. What Stays Private

| Data Point | What Happens to It | Who Can See It |
|:---|:---|:---|
| **Aid Distribution Round** | Publicly incremented on the Midnight ledger | Everyone (On-chain) |
| **Total Disclosed Pool Balance** | Disclosed on-chain using `disclose()` | Everyone (On-chain) |
| **Your Secret Donation Amount** | Evaluated via private witness `secretIncrement()` | **Only You** (0 bytes leaked on-chain) |
| **Your Household Income** | Proven via client-side inequality constraint | **Only You** (0 bytes on-chain) |
| **Your Personal Identity** | Shielded via Midnight ZK addresses | **Only You** (Confidential) |
| **Transaction Cryptographic Validity** | Validated via Groth16 ZK-SNARK proof | Verifiers, Nodes, and Consensus |

---

## Troubleshooting & FAQs

### 1. "Wallet connection rejected or cancelled"
* **Fix:** Open your 1AM Wallet, enter your password to unlock it, ensure the network is set to **Preprod**, and refresh the webpage.

### 2. "Insufficient DUST balance"
* **Fix:** Zero-knowledge transactions require DUST capacity. Open your 1AM wallet, click the DUST icon to generate DUST, or request tokens from the [Nethermind Preprod Faucet](https://midnight-tmnight-preprod.nethermind.dev).

### 3. "Circuit assertion failed: secret must be positive"
* **Fix:** Compact contracts enforce valid witness boundaries (`assert(secret > 0)`). Ensure your contribution or claim amount is greater than 0.

### 4. "Transaction remains pending"
* **Fix:** Block generation on Midnight Preprod takes approximately 10 to 15 seconds. You can click on the transaction hash in your receipt to watch the transaction status settle in real-time.
