import { NextRequest, NextResponse } from 'next/server';
import { renderToImage } from '@/lib/export/satori-renderer';
import { EXPORT_SIZES, type ExportSize } from '@/lib/brand/constants';
import { z } from 'zod';

const schema = z.object({
  templateId: z.string(),
  values: z.record(z.string(), z.string()),
  size: z.enum(Object.keys(EXPORT_SIZES) as [ExportSize, ...ExportSize[]]),
  format: z.enum(['png', 'jpeg']).default('jpeg'),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { templateId, values, size, format } = schema.parse(body);

    const buffer = await renderToImage(templateId, values, size, format);

    const contentType = format === 'png' ? 'image/png' : 'image/jpeg';
    const ext = format === 'png' ? 'png' : 'jpg';

    return new NextResponse(buffer as unknown as BodyInit, {
      headers: {
        'Content-Type': contentType,
        'Content-Disposition': `attachment; filename="${templateId}-${size}.${ext}"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Export failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
