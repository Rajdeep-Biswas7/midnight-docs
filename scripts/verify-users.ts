import * as fs from 'node:fs';

const INDEXER_URL = 'https://indexer.preprod.midnight.network/api/v4/graphql';

interface UserEntry {
  name: string;
  address: string;
  txHash: string;
}

// Load users from the parsed JSON file
const users: UserEntry[] = JSON.parse(fs.readFileSync('users.json', 'utf8'));

async function verifyTx(hash: string) {
  const query = `
    query($hash: HexEncoded!) {
      transactions(offset: { hash: $hash }) {
        hash
        block { height timestamp }
      }
    }
  `;
  const res = await fetch(INDEXER_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ query, variables: { hash } }),
  });
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  const json = await res.json();
  if (json.errors) {
    throw new Error(`GraphQL error: ${JSON.stringify(json.errors)}`);
  }
  return json;
}

async function main() {
  const results: any[] = [];
  console.log(`Starting verification for ${users.length} users...`);
  
  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    process.stdout.write(`[${i + 1}/${users.length}] Checking ${user.name}... `);
    try {
      const result = await verifyTx(user.txHash);
      const txs = result?.data?.transactions;
      const found = txs && txs.length > 0;
      console.log(found ? '✓ confirmed (Block: ' + txs[0].block.height + ')' : '✗ not found');
      results.push({ ...user, verified: found, raw: result });
    } catch (err: any) {
      console.log('✗ error: ' + err.message);
      results.push({ ...user, verified: false, error: String(err) });
    }
    // be gentle on the public indexer
    await new Promise((r) => setTimeout(r, 400)); 
  }
  
  fs.writeFileSync('verification-report.json', JSON.stringify(results, null, 2));
  const verifiedCount = results.filter((r) => r.verified).length;
  console.log(`\n${verifiedCount}/${users.length} confirmed on-chain.`);
  console.log('Report written to verification-report.json');
}

main().catch(console.error);
