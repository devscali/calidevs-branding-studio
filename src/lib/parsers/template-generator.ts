import type { ParsedPsd, ParsedLayer } from './psd-parser';
import type { TemplateField } from '@/lib/templates/types';

export interface GeneratedLayer {
  id: string;
  name: string;
  type: 'text' | 'image' | 'shape';
  x: number;
  y: number;
  width: number;
  height: number;
  editable: boolean;
  // Text layer props
  text?: string;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
  // Image layer props
  imageUrl?: string;
  // Shape layer props
  backgroundColor?: string;
}

export interface GeneratedTemplateConfig {
  name: string;
  canvasWidth: number;
  canvasHeight: number;
  layers: GeneratedLayer[];
  fields: TemplateField[];
  category: string;
}

export function generateTemplateFromPsd(
  parsed: ParsedPsd,
  options: {
    name: string;
    editableLayers: string[]; // layer names to make editable
    fieldOverrides?: Record<string, Partial<TemplateField>>;
  }
): GeneratedTemplateConfig {
  const layers: GeneratedLayer[] = [];
  const fields: TemplateField[] = [];

  for (const layer of parsed.layers) {
    if (!layer.visible || layer.type === 'group') continue;

    const isEditable = options.editableLayers.includes(layer.name);
    const layerId = slugify(layer.name);

    const genLayer: GeneratedLayer = {
      id: layerId,
      name: layer.name,
      type: mapLayerType(layer),
      x: layer.left,
      y: layer.top,
      width: layer.width,
      height: layer.height,
      editable: isEditable,
    };

    if (layer.type === 'text') {
      genLayer.text = layer.text || '';
      genLayer.fontFamily = layer.fontName || 'Plus Jakarta Sans';
      genLayer.fontSize = layer.fontSize || 24;
      genLayer.color = layer.color || '#FFFFFF';

      if (isEditable) {
        const override = options.fieldOverrides?.[layer.name];
        fields.push({
          name: layerId,
          label: override?.label || layer.name,
          type: (layer.text?.length ?? 0) > 50 ? 'textarea' : 'text',
          default: layer.text || '',
          placeholder: override?.placeholder || `Enter ${layer.name.toLowerCase()}`,
          ...override,
        });
      }
    } else if (layer.type === 'image' || layer.type === 'shape') {
      if (isEditable) {
        const override = options.fieldOverrides?.[layer.name];
        fields.push({
          name: layerId,
          label: override?.label || layer.name,
          type: 'image',
          default: '',
          accept: '.png,.jpg,.jpeg,.svg,.psd',
          ...override,
        });
      }
    }

    layers.push(genLayer);
  }

  return {
    name: options.name,
    canvasWidth: parsed.width,
    canvasHeight: parsed.height,
    layers,
    fields,
    category: 'custom',
  };
}

function mapLayerType(layer: ParsedLayer): 'text' | 'image' | 'shape' {
  if (layer.type === 'text') return 'text';
  if (layer.type === 'shape') return 'shape';
  return 'image';
}

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}
