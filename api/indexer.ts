// api/indexer.ts — Vercel serverless proxy for Midnight Indexer GraphQL
// Proxies browser requests server-side to avoid CORS preflight rejections.

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req: any, res: any) {
  // Allow CORS from any origin (this is our own proxy, safe to do)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  try {
    const upstream = await fetch('https://indexer.preprod.midnight.network/api/v4/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: typeof req.body === 'string' ? req.body : JSON.stringify(req.body),
    });
    const data = await upstream.text();
    res.status(upstream.status)
      .setHeader('Content-Type', 'application/json')
      .send(data);
  } catch (err: any) {
    res.status(502).json({ error: 'Upstream indexer request failed', detail: String(err) });
  }
}
