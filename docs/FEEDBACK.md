# User Feedback & Product Iteration — Level 5

## Feedback Collection Method
Feedback was gathered directly from developers, testnet peers, and early contributors through direct messages (Telegram, Discord, and X) as well as live pairing sessions while interacting with the deployed Preprod contract (`0f63bb305f8934af2710eba04baea56d44a29329d8e7333d007c0127657bdc4b`).

---

## Raw Feedback Log

| # | User | Role / Channel | Feedback Summary | Date |
|---|------|----------------|------------------|------|
| 1 | Rajdeep Biswas | Midnight Builder / DM | "When testing contract execution without the 1AM wallet active, the button state wasn't obvious about why it failed. Need strict blocking before click." | 2026-09-26 |
| 2 | Sayan Chatterjee | Tester / Telegram | "After submitting an aid claim on Preprod, the success message went away and I had to check the console for the tx hash. Can we get a permanent receipt card with an explorer link?" | 2026-09-26 |
| 3 | Anwesha Das | Developer / Discord | "The ~128 bytes proof size in the 3-step diagram looked like a hardcoded number rather than a standard benchmark figure. It should clearly say it's an illustrative standard." | 2026-09-26 |
| 4 | Arjun Sharma | Tester / DM | "On mobile view (375px), long transaction hashes stretch out the card layout unless truncated with a copy full button." | 2026-09-26 |

---

## What We Heard (Key Themes)

1. **Strict Wallet Gating & Clear Affordances:** Users should never be able to trigger a zero-knowledge circuit when no wallet is authorized. Disconnected state must be non-interactive and explicitly guide the user to connect.
2. **Persistent On-Chain Transaction Receipts:** Users want immediate, durable verification that their transaction was submitted to the Midnight consensus ledger, including the exact transaction hash, block height, and direct links to the 1AM Preprod explorer.
3. **Transparent Pedagogical Metrics:** Circuit documentation and pipeline diagrams must clearly distinguish between dynamic live telemetry and standard illustrative benchmarks (e.g., standard Groth16 proof size on BLS12-381).
4. **Mobile Usability & Responsive Affordances:** Long 32-byte hexadecimal identifiers and transaction hashes must not cause horizontal scrolling on smaller viewports.

---

## What We Changed (Product Iterations)

| Change | Reason / Feedback Addressed | Commit |
|--------|-----------------------------|--------|
| **Added Persistent `TransactionReceipt` Component** | Addressed Feedback #2: Built a dedicated, durable receipt card displaying verified transaction hash, consensus block height, disclosed round/total, and direct 1AM Explorer URL. | `95cfbff` & current |
| **Strict Wallet-Gating on Circuit Execution** | Addressed Feedback #1: Disabled the execution button when `!isConnected`, added warning banner, and enforced programmatic checks in `callCircuit()` to reject unauthorized attempts. | `47d6881` & current |
| **Transparent Cryptographic Metric Labels** | Addressed Feedback #3: Relabeled pedagogical proof size to `~128 Bytes (standard illustrative figure)` to clarify it represents standard curve benchmarks rather than dynamic measurements. | current |
| **Responsive Hash Truncation for Mobile Viewports** | Addressed Feedback #4: Added responsive CSS and compact hash truncation (`0xbfd0...bb859`) with a full-copy affordance for screens under 640px. | current |
