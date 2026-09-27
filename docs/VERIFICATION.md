# PrivateAid — Independent Transaction Verification

## Why this is needed

1AM Explorer's homepage only keeps a rolling window of recent blocks (its own "Scan Depth" stat). **It is NOT a historical record of everything on-chain.** It is simply a short-lived live feed. Relying on that homepage screen as evidence risks showing 0 activity purely because transactions occurred outside that ~30-minute rolling window. 

The transactions have been permanently recorded on the Midnight Preprod blockchain. 

To independently verify this, we have provided a script that queries the official Preprod indexer GraphQL API directly for each of the 50 transaction hashes. This produces a report that stays true regardless of what the 1AM homepage happens to show at the moment someone checks.

## How to Verify

You can independently reproduce the verification report by running the script yourself:

```bash
npx tsx scripts/verify-users.ts
```

This script will query the indexer and generate a `verification-report.json` file. You can see our generated output committed directly in the root of the repository.

## Results

**50 / 50 users successfully transacted and have been confirmed on-chain.**

See the `USERS.md` file for the exact block numbers and transaction hashes for all 50 users.
