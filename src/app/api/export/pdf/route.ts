import { NextRequest, NextResponse } from 'next/server';
import { renderToImage } from '@/lib/export/satori-renderer';
import { EXPORT_SIZES, type ExportSize } from '@/lib/brand/constants';
import { z } from 'zod';

const schema = z.object({
  templateId: z.string(),
  values: z.record(z.string(), z.string()),
  size: z.enum(Object.keys(EXPORT_SIZES) as [ExportSize, ...ExportSize[]]),
  pages: z.number().optional(), // number of pages for multi-page PDF
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { templateId, values, size, pages: pageCount } = schema.parse(body);

    const { width, height } = EXPORT_SIZES[size];

    if (pageCount && pageCount > 1) {
      // Multi-page PDF: render each page
      const pageBuffers: Buffer[] = [];
      for (let i = 0; i < pageCount; i++) {
        const pageValues = { ...values, _currentPage: String(i) };
        const pngBuffer = await renderToImage(templateId, pageValues, size, 'png');
        pageBuffers.push(pngBuffer);
      }
      const pdf = buildMultiPagePdf(pageBuffers, width, height);

      return new NextResponse(pdf as unknown as BodyInit, {
        headers: {
          'Content-Type': 'application/pdf',
          'Content-Disposition': `attachment; filename="${templateId}-${size}.pdf"`,
          'Cache-Control': 'no-store',
        },
      });
    }

    // Single page PDF
    const pngBuffer = await renderToImage(templateId, values, size, 'png');
    const pdf = buildMultiPagePdf([pngBuffer], width, height);

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

function buildMultiPagePdf(pngPages: Buffer[], pxWidth: number, pxHeight: number): Buffer {
  const ptW = Math.round(pxWidth * 0.75);
  const ptH = Math.round(pxHeight * 0.75);

  const parts: Buffer[] = [];
  const offsets: number[] = [];
  let pos = 0;
  let objNum = 0;

  function write(str: string) {
    const buf = Buffer.from(str, 'binary');
    parts.push(buf);
    pos += buf.length;
  }

  function writeRaw(buf: Buffer) {
    parts.push(buf);
    pos += buf.length;
  }

  function nextObj(): number {
    objNum++;
    offsets.push(pos);
    return objNum;
  }

  const pageCount = pngPages.length;

  // Header
  write('%PDF-1.4\n%\xFF\xFF\xFF\xFF\n');

  // 1: Catalog
  nextObj();
  write('1 0 obj\n<< /Type /Catalog /Pages 2 0 R >>\nendobj\n');

  // 2: Pages — we need to know page object IDs ahead of time
  // Each page needs: page obj, content stream obj, image xobject obj = 3 objs per page
  // Pages obj is #2, first page obj starts at #3
  const pageObjIds: number[] = [];
  for (let i = 0; i < pageCount; i++) {
    pageObjIds.push(3 + i * 3); // page obj
  }

  nextObj();
  const kidsStr = pageObjIds.map(id => `${id} 0 R`).join(' ');
  write(`2 0 obj\n<< /Type /Pages /Kids [${kidsStr}] /Count ${pageCount} >>\nendobj\n`);

  // Pages
  for (let i = 0; i < pageCount; i++) {
    const pageObj = nextObj();
    const contentObj = pageObj + 1;
    const imageObj = pageObj + 2;

    write(`${pageObj} 0 obj\n<< /Type /Page /Parent 2 0 R /MediaBox [0 0 ${ptW} ${ptH}] /Contents ${contentObj} 0 R /Resources << /XObject << /Im0 ${imageObj} 0 R >> >> >>\nendobj\n`);

    // Content stream
    const cs = `q ${ptW} 0 0 ${ptH} 0 0 cm /Im0 Do Q`;
    nextObj();
    write(`${contentObj} 0 obj\n<< /Length ${cs.length} >>\nstream\n${cs}\nendstream\nendobj\n`);

    // Image XObject
    const pngData = pngPages[i];
    nextObj();
    write(`${imageObj} 0 obj\n<< /Type /XObject /Subtype /Image /Width ${pxWidth} /Height ${pxHeight} /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /FlateDecode /Length ${pngData.length} >>\nstream\n`);
    writeRaw(pngData);
    write('\nendstream\nendobj\n');
  }

  // xref
  const xrefPos = pos;
  write(`xref\n0 ${offsets.length + 1}\n0000000000 65535 f \n`);
  for (const off of offsets) {
    write(`${String(off).padStart(10, '0')} 00000 n \n`);
  }
  write(`trailer\n<< /Size ${offsets.length + 1} /Root 1 0 R >>\nstartxref\n${xrefPos}\n%%EOF\n`);

  return Buffer.concat(parts);
}
