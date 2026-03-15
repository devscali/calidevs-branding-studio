import { readPsd } from 'ag-psd';
import sharp from 'sharp';

export interface ParsedLayer {
  name: string;
  type: 'text' | 'image' | 'shape' | 'group';
  visible: boolean;
  opacity: number;
  left: number;
  top: number;
  width: number;
  height: number;
  text?: string;
  fontName?: string;
  fontSize?: number;
  color?: string;
  imageData?: Buffer;
}

export interface ParsedPsd {
  width: number;
  height: number;
  layers: ParsedLayer[];
  composite: Buffer | null;
  layerCount: number;
}

export async function parsePsd(buffer: Buffer): Promise<ParsedPsd> {
  const psd = readPsd(buffer, {
    skipThumbnail: false,
    skipLayerImageData: false,
  });

  const layers: ParsedLayer[] = [];

  function processChildren(children: typeof psd.children) {
    if (!children) return;
    for (const child of children) {
      const layer: ParsedLayer = {
        name: child.name || 'Unnamed',
        type: 'image',
        visible: child.hidden !== true,
        opacity: (child.opacity ?? 255) / 255,
        left: child.left ?? 0,
        top: child.top ?? 0,
        width: (child.right ?? 0) - (child.left ?? 0),
        height: (child.bottom ?? 0) - (child.top ?? 0),
      };

      // Detect text layers
      if (child.text) {
        layer.type = 'text';
        layer.text = child.text.text || '';
        if (child.text.style) {
          layer.fontName = child.text.style.font?.name;
          layer.fontSize = child.text.style.fontSize;
          const fc = child.text.style.fillColor;
          if (fc && 'r' in fc) {
            layer.color = `rgb(${fc.r},${fc.g},${fc.b})`;
          }
        }
      }

      // Detect shape/vector layers
      if (child.vectorMask || child.vectorStroke) {
        layer.type = 'shape';
      }

      // Group layers
      if (child.children) {
        layer.type = 'group';
        processChildren(child.children);
      }

      layers.push(layer);
    }
  }

  processChildren(psd.children);

  // Extract composite image
  let composite: Buffer | null = null;
  if (psd.canvas) {
    const canvas = psd.canvas as unknown as { toBuffer?: (type: string) => Buffer; width: number; height: number };
    if (canvas.toBuffer) {
      composite = canvas.toBuffer('image/png');
    }
  }

  // If no canvas composite, try to create one from imageData
  if (!composite && psd.imageData) {
    const { width, height } = psd;
    const rgba = new Uint8Array(width * height * 4);
    for (let i = 0; i < width * height; i++) {
      rgba[i * 4] = psd.imageData.data[i];
      rgba[i * 4 + 1] = psd.imageData.data[width * height + i];
      rgba[i * 4 + 2] = psd.imageData.data[width * height * 2 + i];
      rgba[i * 4 + 3] = psd.imageData.data[width * height * 3 + i];
    }
    composite = await sharp(Buffer.from(rgba.buffer), {
      raw: { width, height, channels: 4 },
    }).png().toBuffer();
  }

  return {
    width: psd.width,
    height: psd.height,
    layers,
    composite,
    layerCount: layers.length,
  };
}

export async function extractComposite(buffer: Buffer): Promise<Buffer> {
  const parsed = await parsePsd(buffer);
  if (!parsed.composite) {
    throw new Error('Could not extract composite image from PSD');
  }
  return parsed.composite;
}

export async function generateThumbnail(imageBuffer: Buffer, maxWidth = 400): Promise<Buffer> {
  return sharp(imageBuffer)
    .resize(maxWidth, undefined, { withoutEnlargement: true })
    .png()
    .toBuffer();
}
