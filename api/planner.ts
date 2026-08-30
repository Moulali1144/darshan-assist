import type { VercelRequest, VercelResponse } from '@vercel/node';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS for Chrome Extension requests
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  // Handle OPTIONS preflight request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed. Use POST.' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: 'GEMINI_API_KEY is missing in server environment variables.',
    });
  }

  try {
    const { form } = req.body || {};
    if (!form || !form.startingCity) {
      return res.status(400).json({ error: 'Invalid trip request payload.' });
    }

    const prompt = `You are an expert Tirumala Tirupati pilgrim trip planner. Create a highly detailed, realistic, day-by-day itinerary based on these details:
- Starting City: ${form.startingCity}
- Trip Duration: ${form.duration}
- Group Type: ${form.groupType}
- Group Size: ${form.groupSize}
- Preferred Darshan Type: ${form.darshanType}
- Budget Level: ${form.budgetLevel}
- Travel Mode: ${form.travelMode}
${form.specialNeeds ? `- Special Needs / Preferences: ${form.specialNeeds}` : ''}

Include:
1. Exact timeline for Darshan, reporting times, and travel.
2. Mandatory rules (dress code, ID proof, mobile ban inside sanctum).
3. Nearby temples to visit (Padmavathi Ammavari, Kapileswara, Govindarajaswamy, Srikalahasti, etc.).
4. Estimated Budget Breakdown Table with columns: Category | Estimated Cost | Notes.
5. Travel and Stay recommendations.

Format cleanly using Markdown headings, bullet points, and markdown tables.`;

    // Try current stable models
    const modelsToTry = [
      'gemini-2.0-flash',
      'gemini-1.5-flash',
      'gemini-2.5-flash',
    ];

    let lastError = '';
    for (const model of modelsToTry) {
      const geminiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey.trim()}`;
      
      const response = await fetch(geminiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
        }),
      });

      const data = await response.json();

      if (response.ok && data.candidates?.[0]?.content?.parts?.[0]?.text) {
        return res.status(200).json({
          text: data.candidates[0].content.parts[0].text,
          modelUsed: model,
        });
      }

      if (data.error?.message) {
        lastError = data.error.message;
      }
    }

    return res.status(502).json({
      error: `Gemini API call failed: ${lastError || 'No response candidate returned.'}`,
    });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Internal Server Error';
    return res.status(500).json({ error: message });
  }
}
