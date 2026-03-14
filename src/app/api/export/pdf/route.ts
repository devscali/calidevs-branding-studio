import { NextRequest, NextResponse } from 'next/server';
import { renderToImage } from '@/lib/export/satori-renderer';
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

    // Render to high-quality PNG first
    const pngBuffer = await renderToImage(templateId, values, size, 'png');
    const { width, height } = EXPORT_SIZES[size];

    // Build a minimal but valid PDF with the PNG embedded
    const pdf = buildPdfWithPng(pngBuffer, width, height);

    return new NextResponse(pdf as unknown as BodyInit, {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="${templateId}-${size}.pdf"`,
        'Cache-Control': 'no-store',
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'PDF export failed';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}

function buildPdfWithPng(pngData: Buffer, pxWidth: number, pxHeight: number): Buffer {
  const ptW = Math.round(pxWidth * 0.75);
  const ptH = Math.round(pxHeight * 0.75);

  const parts: Buffer[] = [];
  const offsets: number[] = [];
  let pos = 0;

  function write(str: string) {
    const buf = Buffer.from(str, 'binary');
    parts.push(buf);
    pos += buf.length;
  }

  function writeRaw(buf: Buffer) {
    parts.push(buf);
    pos += buf.length;
  }

  function markObj() {
    offsets.push(pos);
  }

  // Header
  write('%PDF-1.4\n%\xFF\xFF\xFF\xFF\n');

  // 1: Catalog
  markObj();
  write('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');

  // 2: Pages
  markObj();
  write('2 0 obj\n<< /Type /Pages /Kids [3 0 R] /Count 1 >>\nendobj\n');

  // 3: Page
  markObj();
  write(`3 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${ptW} ${ptH}] /Contents 4 0 R /Resources << /XObject << /Im0 5 0 R >> >> >>\nendobj\n`);

  // 4: Content stream
  const cs = `q ${ptW} 0 0 ${ptH} 0 0 cm /Im0 Do Q`;
  markObj();
  write(`4 0 obj\n<< /Length ${cs.length} >>\nstream\n${cs}\nendstream\nendobj\n`);

  // 5: PNG Image XObject
  markObj();
  write(`5 0 obj\n<< /Type /XObject /Subtype /Image /Width ${pxWidth} /Height ${pxHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode /Length ${pngData.length} >>\nstream\n`);
  writeRaw(pngData);
  write('\nendstream\nendobj\n');

  // xref
  const xrefPos = pos;
  write(`xref\n0 ${offsets.length + 1}\n0000000000 65535 f \n`);
  for (const off of offsets) {
    write(`${String(off).padStart(10, '0')} 00000 n \n`);
  }
  write(`trailer\n<< /Size ${offsets.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`);

  return Buffer.concat(parts);
}
