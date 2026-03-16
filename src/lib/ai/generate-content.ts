import Anthropic from '@anthropic-ai/sdk';

interface FieldDef {
  name: string;
  label: string;
  type: string;
  placeholder?: string;
  options?: string[];
}

export interface GenerateContentInput {
  templateName: string;
  templateCategory: string;
  templateDescription: string;
  fields: FieldDef[];
  currentValues: Record<string, string>;
  userPrompt?: string;
}

export interface GenerateContentOutput {
  values: Record<string, string>;
}

const TONE_MAP: Record<string, string> = {
  social: 'Casual, engaging, hashtag-friendly. Short punchy lines.',
  terminal: 'Technical, witty, developer humor. Use code metaphors.',
  dev: 'Professional but approachable, technically accurate.',
  campaign: 'Bold, aspirational, brand-forward. Sell the vision.',
  presentation: 'Authoritative, structured, clear. Business-ready.',
  motion: 'Dynamic, action-oriented, very brief.',
  custom: 'Versatile, professional.',
};

export async function generateContent(input: GenerateContentInput): Promise<GenerateContentOutput> {
  if (!process.env.ANTHROPIC_API_KEY) {
    throw new Error('ANTHROPIC_API_KEY environment variable is not configured.');
  }

  const textFields = input.fields.filter(f => f.type !== 'image' && f.type !== 'color');

  if (textFields.length === 0) {
    return { values: {} };
  }

  const tone = TONE_MAP[input.templateCategory] || TONE_MAP.custom;

  const fieldDescriptions = textFields.map(f => {
    const parts = [`- "${f.name}" (label: "${f.label}")`];
    if (f.placeholder) parts.push(`  hint: ${f.placeholder}`);
    if (f.options?.length) parts.push(`  MUST be one of: ${f.options.join(', ')}`);
    const current = input.currentValues[f.name];
    if (current) parts.push(`  current value: "${current}"`);
    return parts.join('\n');
  }).join('\n');

  const systemPrompt = `You are a creative copywriter for CaliDevs, a dev agency from Tijuana/California expanding to Canada. Generate compelling content for branding templates.

Rules:
- Return ONLY a valid JSON object mapping field names to string values
- Keep content concise and punchy — this is for social media and branding visuals
- Tone: ${tone}
- For select fields, use ONLY the provided options
- Do not wrap in markdown code blocks, return raw JSON only
- Generate fresh, creative content — don't just repeat the current values`;

  const userMessage = `Generate content for a ${input.templateCategory} template called "${input.templateName}".
Purpose: ${input.templateDescription}

Fields to fill:
${fieldDescriptions}
${input.userPrompt ? `\nAdditional instructions: ${input.userPrompt}` : ''}

Return a JSON object with these exact field names as keys and generated content as string values.`;

  const client = new Anthropic();

  const message = await client.messages.create({
    model: 'claude-haiku-4-5-20241022',
    max_tokens: 1024,
    system: systemPrompt,
    messages: [{ role: 'user', content: userMessage }],
  });

  const text = message.content[0].type === 'text' ? message.content[0].text : '';

  let parsed: Record<string, string>;
  try {
    parsed = JSON.parse(text);
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      parsed = JSON.parse(match[0]);
    } else {
      throw new Error('Failed to parse AI response.');
    }
  }

  const validFieldNames = new Set(textFields.map(f => f.name));
  const values: Record<string, string> = {};

  for (const [key, val] of Object.entries(parsed)) {
    if (!validFieldNames.has(key)) continue;
    if (typeof val !== 'string') continue;

    const field = textFields.find(f => f.name === key);
    if (field?.options?.length && !field.options.includes(val)) {
      values[key] = field.options[0];
    } else {
      values[key] = val;
    }
  }

  return { values };
}
