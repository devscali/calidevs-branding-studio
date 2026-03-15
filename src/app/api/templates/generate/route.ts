import { NextRequest, NextResponse } from 'next/server';
import { db } from '@/lib/db';
import { assets, generatedTemplates } from '@/lib/db/schema';
import { eq } from 'drizzle-orm';
import { parsePsd } from '@/lib/parsers/psd-parser';
import { generateTemplateFromPsd } from '@/lib/parsers/template-generator';
import { z } from 'zod';

const schema = z.object({
  assetId: z.number(),
  name: z.string().min(1),
  editableLayers: z.array(z.string()),
  fieldOverrides: z.record(z.string(), z.object({
    label: z.string().optional(),
    placeholder: z.string().optional(),
  })).optional(),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { assetId, name, editableLayers, fieldOverrides } = schema.parse(body);

    // Get asset from database
    const [asset] = await db.select().from(assets).where(eq(assets.id, assetId)).limit(1);
    if (!asset) {
      return NextResponse.json({ error: 'Asset not found' }, { status: 404 });
    }

    if (asset.sourceFormat !== 'psd') {
      return NextResponse.json({ error: 'Only PSD files can be converted to templates (for now)' }, { status: 400 });
    }

    // Fetch the file from Blob storage
    const fileRes = await fetch(asset.blobUrl);
    if (!fileRes.ok) {
      return NextResponse.json({ error: 'Failed to fetch asset file' }, { status: 500 });
    }

    const buffer = Buffer.from(await fileRes.arrayBuffer());
    const parsed = await parsePsd(buffer);

    const templateConfig = generateTemplateFromPsd(parsed, {
      name,
      editableLayers,
      fieldOverrides,
    });

    // Store in database
    const [generated] = await db.insert(generatedTemplates).values({
      name: templateConfig.name,
      sourceAssetId: assetId,
      config: {
        id: `custom-${Date.now()}`,
        name: templateConfig.name,
        category: 'custom',
        description: `Generated from ${asset.originalFilename}`,
        fields: templateConfig.fields,
        defaultSize: 'ig-square' as const,
      },
      layers: templateConfig.layers,
      canvasWidth: templateConfig.canvasWidth,
      canvasHeight: templateConfig.canvasHeight,
      category: 'custom',
    }).returning();

    return NextResponse.json({ template: generated }, { status: 201 });
  } catch (err) {
    console.error('Template generation error:', err);
    const message = err instanceof Error ? err.message : 'Template generation failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
