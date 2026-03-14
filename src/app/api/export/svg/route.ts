import { NextRequest, NextResponse } from 'next/server';
import { renderToSvg } from '@/lib/export/satori-renderer';
import { EXPORT_SIZES, type ExportSize } from '@/lib/brand/constants';
import { z } from 'zod';

const schema = z.object({
  templateId: z.string(),
  values: z.record(z.string(), z.string()),
  size: z.enum(Object.keys(EXPORT_SIZES) as [ExportSize, ...ExportSize[]]),
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { templateId, values, size } = schema.parse(body);

    const svg = await renderToSvg(templateId, values, size);

    return new NextResponse(svg, {
      headers: {
        'Content-Type': 'image/svg+xml',
        'Content-Disposition': `attachment; filename="${templateId}-${size}.svg"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'SVG export failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
