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
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, x-midnight-network');

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }

  const network = (req.headers['x-midnight-network'] || req.query?.network || 'preprod')
    .toString()
    .toLowerCase();
  const upstreamUrl =
    network === 'preview'
      ? 'https://indexer.preview.midnight.network/api/v4/graphql'
      : 'https://indexer.preprod.midnight.network/api/v4/graphql';

  try {
    const upstream = await fetch(upstreamUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: typeof req.body === 'string' ? req.body : JSON.stringify(req.body),
      signal: AbortSignal.timeout(10000), // 10-second upstream timeout
    });

    if (upstream.status >= 500) {
      res.status(200)
        .setHeader('Content-Type', 'application/json')
        .json({
          data: null,
          errors: [{ message: 'indexer unavailable' }],
        });
      return;
    }

    const data = await upstream.text();
    res
      .status(upstream.status)
      .setHeader('Content-Type', 'application/json')
      .send(data);
  } catch (err: any) {
    res.status(200)
      .setHeader('Content-Type', 'application/json')
      .json({
        data: null,
        errors: [{ message: 'indexer unavailable' }],
      });
  }
}
