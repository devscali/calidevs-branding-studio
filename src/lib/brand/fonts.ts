import { readFile } from 'fs/promises';
import { join } from 'path';

// Cache font buffers in memory (they don't change)
const fontCache = new Map<string, ArrayBuffer>();

async function loadFont(filename: string): Promise<ArrayBuffer> {
  const cached = fontCache.get(filename);
  if (cached) return cached;

  const fontPath = join(process.cwd(), 'public', 'fonts', filename);
  const buffer = await readFile(fontPath);
  const arrayBuffer = buffer.buffer.slice(buffer.byteOffset, buffer.byteOffset + buffer.byteLength);
  fontCache.set(filename, arrayBuffer);
  return arrayBuffer;
}

export async function getSatoriFonts() {
  const [jakartaRegular, jakartaBold, dmSerif, jetbrainsRegular, jetbrainsBold, kalam] = await Promise.all([
    loadFont('PlusJakartaSans-Regular.ttf'),
    loadFont('PlusJakartaSans-Bold.ttf'),
    loadFont('DMSerifDisplay-Regular.ttf'),
    loadFont('JetBrainsMono-Regular.ttf'),
    loadFont('JetBrainsMono-Bold.ttf'),
    loadFont('Kalam-Regular.ttf'),
  ]);

  return [
    { name: 'Plus Jakarta Sans', data: jakartaRegular, weight: 400 as const, style: 'normal' as const },
    { name: 'Plus Jakarta Sans', data: jakartaBold, weight: 700 as const, style: 'normal' as const },
    { name: 'DM Serif Display', data: dmSerif, weight: 400 as const, style: 'normal' as const },
    { name: 'JetBrains Mono', data: jetbrainsRegular, weight: 400 as const, style: 'normal' as const },
    { name: 'JetBrains Mono', data: jetbrainsBold, weight: 700 as const, style: 'normal' as const },
    { name: 'Kalam', data: kalam, weight: 400 as const, style: 'normal' as const },
  ];
}
