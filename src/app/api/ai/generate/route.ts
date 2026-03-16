import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { generateContent } from '@/lib/ai/generate-content';

const schema = z.object({
  templateName: z.string(),
  templateCategory: z.string(),
  templateDescription: z.string(),
  fields: z.array(z.object({
    name: z.string(),
    label: z.string(),
    type: z.string(),
    placeholder: z.string().optional(),
    options: z.array(z.string()).optional(),
  })),
  currentValues: z.record(z.string(), z.string()),
  userPrompt: z.string().optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const input = schema.parse(body);
    const result = await generateContent(input);
    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: 'Invalid request', details: error.issues }, { status: 400 });
    }
    const message = error instanceof Error ? error.message : 'Content generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
