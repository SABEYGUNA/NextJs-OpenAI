import OpenAI from 'openai';
import { NextApiRequest, NextApiResponse } from 'next';

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { code } = req.body;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'Generate documentation for the following code:' },
        { role: 'user', content: code },
      ],
    });

    const documentation = response.choices?.[0]?.message?.content?.trim() || 'No documentation generated';
    res.status(200).json({ documentation });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Failed to generate documentation' });
  }
}
