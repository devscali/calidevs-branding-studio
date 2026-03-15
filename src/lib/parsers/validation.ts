export const ALLOWED_EXTENSIONS = [
  '.psd', '.ai', '.svg', '.png', '.jpg', '.jpeg',
  '.indd', '.idml', '.aep', '.json',
] as const;

export const MIME_TYPES: Record<string, string> = {
  '.psd': 'image/vnd.adobe.photoshop',
  '.ai': 'application/postscript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.indd': 'application/x-indesign',
  '.idml': 'application/vnd.adobe.indesign-idml-package',
  '.aep': 'application/octet-stream',
  '.json': 'application/json',
};

export type SourceFormat = 'psd' | 'ai' | 'indd' | 'idml' | 'aep' | 'png' | 'svg' | 'jpeg' | 'lottie';

// 50MB for Creative Suite files, 10MB for raster
const MAX_SIZE_CREATIVE = 50 * 1024 * 1024;
const MAX_SIZE_RASTER = 10 * 1024 * 1024;

const CREATIVE_EXTENSIONS = new Set(['.psd', '.ai', '.indd', '.idml', '.aep']);

export function getExtension(filename: string): string {
  const dot = filename.lastIndexOf('.');
  return dot >= 0 ? filename.slice(dot).toLowerCase() : '';
}

export function getSourceFormat(ext: string): SourceFormat | null {
  const map: Record<string, SourceFormat> = {
    '.psd': 'psd',
    '.ai': 'ai',
    '.svg': 'svg',
    '.png': 'png',
    '.jpg': 'jpeg',
    '.jpeg': 'jpeg',
    '.indd': 'indd',
    '.idml': 'idml',
    '.aep': 'aep',
    '.json': 'lottie',
  };
  return map[ext] ?? null;
}

export function validateUpload(filename: string, size: number): { valid: boolean; error?: string } {
  const ext = getExtension(filename);

  if (!ALLOWED_EXTENSIONS.includes(ext as typeof ALLOWED_EXTENSIONS[number])) {
    return { valid: false, error: `Unsupported file type: ${ext}. Allowed: ${ALLOWED_EXTENSIONS.join(', ')}` };
  }

  const maxSize = CREATIVE_EXTENSIONS.has(ext) ? MAX_SIZE_CREATIVE : MAX_SIZE_RASTER;
  if (size > maxSize) {
    const limitMB = maxSize / (1024 * 1024);
    return { valid: false, error: `File too large (${(size / 1024 / 1024).toFixed(1)}MB). Max: ${limitMB}MB` };
  }

  return { valid: true };
}
