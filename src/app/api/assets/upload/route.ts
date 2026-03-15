import { NextRequest, NextResponse } from 'next/server';
import { put } from '@vercel/blob';
import sharp from 'sharp';
import { db } from '@/lib/db';
import { assets } from '@/lib/db/schema';
import { validateUpload, getExtension, getSourceFormat } from '@/lib/parsers/validation';
import { parsePsd } from '@/lib/parsers/psd-parser';
import { parseAi } from '@/lib/parsers/ai-parser';
import { parseIndd, parseIdml } from '@/lib/parsers/indd-parser';
import { parseAep, parseLottie } from '@/lib/parsers/aep-parser';

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const { valid, error } = validateUpload(file.name, file.size);
    if (!valid) {
      return NextResponse.json({ error }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = getExtension(file.name);
    const sourceFormat = getSourceFormat(ext)!;

    let previewBuffer: Buffer;
    let width: number | undefined;
    let height: number | undefined;
    let layerCount: number | undefined;
    let metadata: Record<string, unknown> = {};

    // Parse based on format
    switch (sourceFormat) {
      case 'psd': {
        const parsed = await parsePsd(buffer);
        previewBuffer = parsed.composite ?? await createPlaceholder();
        width = parsed.width;
        height = parsed.height;
        layerCount = parsed.layerCount;
        metadata = { layers: parsed.layers.map(l => ({ name: l.name, type: l.type, visible: l.visible })) };
        break;
      }
      case 'ai': {
        const parsed = await parseAi(buffer);
        previewBuffer = parsed.preview;
        width = parsed.width;
        height = parsed.height;
        break;
      }
      case 'indd': {
        const parsed = await parseIndd(buffer);
        previewBuffer = parsed.preview ?? await createPlaceholder();
        width = parsed.width;
        height = parsed.height;
        break;
      }
      case 'idml': {
        const parsed = await parseIdml(buffer);
        previewBuffer = parsed.preview ?? await createPlaceholder();
        width = parsed.width;
        height = parsed.height;
        if (parsed.textContent?.length) metadata = { textContent: parsed.textContent };
        break;
      }
      case 'aep': {
        const parsed = await parseAep(buffer);
        previewBuffer = parsed.preview;
        width = parsed.width;
        height = parsed.height;
        if (parsed.projectName) metadata = { projectName: parsed.projectName };
        break;
      }
      case 'lottie': {
        const parsed = await parseLottie(buffer);
        previewBuffer = parsed.preview;
        width = parsed.width;
        height = parsed.height;
        metadata = { isLottie: true };
        break;
      }
      case 'svg': {
        const meta = await sharp(buffer).metadata();
        width = meta.width;
        height = meta.height;
        previewBuffer = await sharp(buffer).png().toBuffer();
        break;
      }
      default: {
        // PNG, JPEG — pass through
        const meta = await sharp(buffer).metadata();
        width = meta.width;
        height = meta.height;
        previewBuffer = buffer;
        break;
      }
    }

    // Generate thumbnail (400px wide)
    const thumbnail = await sharp(previewBuffer)
      .resize(400, undefined, { withoutEnlargement: true })
      .png()
      .toBuffer();

    // Upload original file and thumbnail to Vercel Blob
    const timestamp = Date.now();
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, '_');

    const [blobResult, thumbResult] = await Promise.all([
      put(`assets/${timestamp}-${safeName}`, buffer, { access: 'public' }),
      put(`assets/thumbs/${timestamp}-${safeName}.thumb.png`, thumbnail, { access: 'public' }),
    ]);

    // Store in database
    const [asset] = await db.insert(assets).values({
      filename: `${timestamp}-${safeName}`,
      originalFilename: file.name,
      mimeType: file.type || 'application/octet-stream',
      fileSize: file.size,
      blobUrl: blobResult.url,
      thumbnailUrl: thumbResult.url,
      width,
      height,
      sourceFormat,
      layerCount,
      metadata,
      tags: [],
    }).returning();

    return NextResponse.json({ asset }, { status: 201 });
  } catch (err) {
    console.error('Upload error:', err);
    const message = err instanceof Error ? err.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

async function createPlaceholder(): Promise<Buffer> {
  return sharp({
    create: { width: 400, height: 400, channels: 4, background: { r: 30, g: 30, b: 30, alpha: 1 } },
  }).png().toBuffer();
}
