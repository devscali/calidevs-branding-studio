import sharp from 'sharp';

export interface ParsedAi {
  width: number;
  height: number;
  preview: Buffer;
  format: 'ai';
}

/**
 * AI files are PDF-based. Sharp can rasterize the first page.
 * For best results, users should export from Illustrator as SVG.
 */
export async function parseAi(buffer: Buffer): Promise<ParsedAi> {
  // AI files contain a PDF stream — Sharp can handle PDF rasterization
  // via libvips. If it fails, we return a placeholder.
  try {
    const image = sharp(buffer, { density: 150 });
    const metadata = await image.metadata();
    const preview = await image.png().toBuffer();

    return {
      width: metadata.width ?? 1080,
      height: metadata.height ?? 1080,
      preview,
      format: 'ai',
    };
  } catch {
    // If Sharp can't parse it (missing PDF support), create a placeholder
    const placeholder = await sharp({
      create: { width: 400, height: 400, channels: 4, background: { r: 30, g: 30, b: 30, alpha: 1 } },
    }).png().toBuffer();

    return {
      width: 400,
      height: 400,
      preview: placeholder,
      format: 'ai',
    };
  }
}

export async function generateAiThumbnail(buffer: Buffer, maxWidth = 400): Promise<Buffer> {
  const parsed = await parseAi(buffer);
  return sharp(parsed.preview)
    .resize(maxWidth, undefined, { withoutEnlargement: true })
    .png()
    .toBuffer();
}
