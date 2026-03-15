import sharp from 'sharp';

export interface ParsedIndd {
  width: number;
  height: number;
  preview: Buffer | null;
  format: 'indd' | 'idml';
  pageCount?: number;
  textContent?: string[];
}

/**
 * INDD files contain an embedded JPEG preview (XMP thumbnail).
 * We search for the JPEG SOI/EOI markers in the binary data.
 *
 * For full editing support, IDML (XML-based) is preferred.
 */
export async function parseIndd(buffer: Buffer): Promise<ParsedIndd> {
  let preview: Buffer | null = null;

  // Search for embedded JPEG preview in INDD binary
  // JPEG starts with FF D8 FF and ends with FF D9
  const jpegStart = findJpegStart(buffer);
  if (jpegStart >= 0) {
    const jpegEnd = findJpegEnd(buffer, jpegStart);
    if (jpegEnd > jpegStart) {
      const jpegData = buffer.subarray(jpegStart, jpegEnd + 2);
      try {
        const metadata = await sharp(jpegData).metadata();
        preview = await sharp(jpegData).png().toBuffer();
        return {
          width: metadata.width ?? 800,
          height: metadata.height ?? 600,
          preview,
          format: 'indd',
        };
      } catch {
        // JPEG extraction failed, continue to placeholder
      }
    }
  }

  // Fallback: create placeholder
  preview = await sharp({
    create: { width: 400, height: 300, channels: 4, background: { r: 40, g: 20, b: 40, alpha: 1 } },
  }).png().toBuffer();

  return {
    width: 400,
    height: 300,
    preview,
    format: 'indd',
  };
}

/**
 * Parse IDML file (ZIP containing XML).
 * IDML is the preferred format for extracting text and layout from InDesign.
 */
export async function parseIdml(buffer: Buffer): Promise<ParsedIndd> {
  // IDML files are ZIP archives — for now, store and show placeholder.
  // Full IDML parsing (unzip + XML) can be added when needed.
  const preview = await sharp({
    create: { width: 400, height: 300, channels: 4, background: { r: 40, g: 20, b: 40, alpha: 1 } },
  }).png().toBuffer();

  return {
    width: 800,
    height: 600,
    preview,
    format: 'idml',
    textContent: [],
  };
}

function findJpegStart(buf: Buffer): number {
  for (let i = 0; i < buf.length - 2; i++) {
    if (buf[i] === 0xFF && buf[i + 1] === 0xD8 && buf[i + 2] === 0xFF) {
      return i;
    }
  }
  return -1;
}

function findJpegEnd(buf: Buffer, startFrom: number): number {
  for (let i = buf.length - 2; i > startFrom; i--) {
    if (buf[i] === 0xFF && buf[i + 1] === 0xD9) {
      return i;
    }
  }
  return -1;
}
