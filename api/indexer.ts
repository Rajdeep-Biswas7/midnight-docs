export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method not allowed' });
    return;
  }
  try {
    const upstream = await fetch('https://indexer.preprod.midnight.network/api/v4/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Optional: impersonate a standard browser fetch if WAF blocks standard Node/Vercel fetch
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
      },
      body: JSON.stringify(req.body),
    });
    const data = await upstream.text();
    res.status(upstream.status).setHeader('Content-Type', 'application/json').send(data);
  } catch (err) {
    res.status(502).json({ error: 'Upstream indexer request failed', detail: String(err) });
  }
}
