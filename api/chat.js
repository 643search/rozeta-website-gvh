export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const body = typeof req.body === 'string' ? JSON.parse(req.body || '{}') : (req.body || {});
    const question = typeof body.question === 'string' ? body.question.trim() : '';
    const history = typeof body.history === 'string' ? body.history : JSON.stringify(body.history || []);

    if (!question) {
      return res.status(400).json({ error: 'Missing question' });
    }

    const apiHost = process.env.RL_CHAT_API_HOST || 'https://docsgpt-production.up.railway.app';
    const apiKey = process.env.RL_CHAT_API_KEY;
    const promptId = process.env.RL_CHAT_PROMPT_ID || '69991ea3f93308f6a295758e';

    if (!apiKey) {
      return res.status(500).json({ error: 'Chat API key is not configured' });
    }

    const upstream = await fetch(apiHost + '/stream', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + apiKey
      },
      body: JSON.stringify({
        question: question,
        history: history,
        prompt_id: promptId
      })
    });

    if (!upstream.ok || !upstream.body) {
      const errText = await upstream.text().catch(() => '');
      return res.status(upstream.status || 502).json({
        error: 'Upstream chat request failed',
        details: errText || 'No details returned by upstream'
      });
    }

    res.statusCode = upstream.status;
    res.setHeader('Content-Type', upstream.headers.get('content-type') || 'text/event-stream; charset=utf-8');
    res.setHeader('Cache-Control', 'no-store');
    res.setHeader('X-Accel-Buffering', 'no');

    const reader = upstream.body.getReader();
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      res.write(Buffer.from(value));
    }
    res.end();
  } catch (error) {
    return res.status(500).json({
      error: 'Internal server error',
      details: error && error.message ? error.message : String(error)
    });
  }
}
