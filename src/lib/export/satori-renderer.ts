import satori from 'satori';
import sharp from 'sharp';
import { getSatoriFonts } from '@/lib/brand/fonts';
import { EXPORT_SIZES, type ExportSize } from '@/lib/brand/constants';
import { getTemplate } from '@/lib/templates/registry';
import type { TemplateValues } from '@/lib/templates/types';
import type { ReactElement } from 'react';

export async function renderToSvg(
  templateId: string,
  values: TemplateValues,
  size: ExportSize
): Promise<string> {
  const template = getTemplate(templateId);
  if (!template) throw new Error(`Template "${templateId}" not found`);

  const { width, height } = EXPORT_SIZES[size];
  const fonts = await getSatoriFonts();

  const element = template.SatoriTemplate({ values, width, height }) as ReactElement;

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
