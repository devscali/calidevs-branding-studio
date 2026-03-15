import sharp from 'sharp';

export interface ParsedAep {
  width: number;
  height: number;
  preview: Buffer;
  format: 'aep' | 'lottie';
  projectName?: string;
  isLottie?: boolean;
  lottieData?: Record<string, unknown>;
}

/**
 * AEP files are binary After Effects projects.
 * We extract basic info and generate a placeholder thumbnail.
 *
 * For real integration, users should export as:
 * - Lottie JSON (via Bodymovin plugin) for web animations
 * - Video (MP4/GIF) for static renders
 */
export async function parseAep(buffer: Buffer): Promise<ParsedAep> {
  // AEP binary — extract project name from header if possible
  let projectName: string | undefined;
  const headerStr = buffer.subarray(0, Math.min(buffer.length, 1024)).toString('utf8', 0, 1024);
  const nameMatch = headerStr.match(/RIFX.{4}(.+?)(?:\0|$)/);
  if (nameMatch) {
    projectName = nameMatch[1].replace(/[^\x20-\x7E]/g, '').trim() || undefined;
  }

  const preview = await sharp({
    create: { width: 400, height: 225, channels: 4, background: { r: 20, g: 20, b: 40, alpha: 1 } },
  }).png().toBuffer();

  return {
    width: 1920,
    height: 1080,
    preview,
    format: 'aep',
    projectName,
  };
}

/**
 * Parse Lottie JSON file exported from After Effects (Bodymovin plugin).
 */
export async function parseLottie(buffer: Buffer): Promise<ParsedAep> {
  const json = JSON.parse(buffer.toString('utf8'));

  const width = json.w ?? 1080;
  const height = json.h ?? 1080;

  const preview = await sharp({
    create: { width: 400, height: Math.round(400 * (height / width)), channels: 4, background: { r: 20, g: 30, b: 50, alpha: 1 } },
  }).png().toBuffer();

  return {
    width,
    height,
    preview,
    format: 'lottie',
    isLottie: true,
    lottieData: json,
  };
}
