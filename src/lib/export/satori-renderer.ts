import satori from 'satori';
import sharp from 'sharp';
import { getSatoriFonts } from '@/lib/brand/fonts';
import { EXPORT_SIZES, type ExportSize } from '@/lib/brand/constants';
import { getTemplate } from '@/lib/templates/registry';
import type { TemplateValues } from '@/lib/templates/types';
import type { ReactElement } from 'react';

/**
 * Pre-fetch image URLs and convert to base64 data URIs for Satori.
 * Satori requires images as base64 data URIs or local buffers.
 */
async function resolveImageUrls(values: TemplateValues): Promise<TemplateValues> {
  const resolved = { ...values };
  for (const [key, val] of Object.entries(resolved)) {
    if (val && (val.startsWith('http://') || val.startsWith('https://'))) {
      try {
        const res = await fetch(val);
        if (res.ok) {
          const buf = Buffer.from(await res.arrayBuffer());
          const contentType = res.headers.get('content-type') || 'image/png';
          resolved[key] = `data:${contentType};base64,${buf.toString('base64')}`;
        }
      } catch {
        // Keep original URL if fetch fails
      }
    }
  }
  return resolved;
}

export async function renderToSvg(
  templateId: string,
  values: TemplateValues,
  size: ExportSize
): Promise<string> {
  const template = getTemplate(templateId);
  if (!template) throw new Error(`Template "${templateId}" not found`);

  const { width, height } = EXPORT_SIZES[size];
  const fonts = await getSatoriFonts();

  // Resolve any image URLs to base64 for Satori
  const resolvedValues = await resolveImageUrls(values);

  const element = template.SatoriTemplate({ values: resolvedValues, width, height }) as ReactElement;

  const svg = await satori(element, { width, height, fonts });
  return svg;
}

export async function renderToImage(
  templateId: string,
  values: TemplateValues,
  size: ExportSize,
  format: 'png' | 'jpeg' = 'jpeg'
): Promise<Buffer> {
  const svg = await renderToSvg(templateId, values, size);
  const { width, height } = EXPORT_SIZES[size];

  let pipeline = sharp(Buffer.from(svg)).resize(width, height);

  if (format === 'jpeg') {
    pipeline = pipeline.jpeg({ quality: 95 });
  } else {
    pipeline = pipeline.png();
  }

  return pipeline.toBuffer();
}
