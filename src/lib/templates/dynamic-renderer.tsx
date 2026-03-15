import type { TemplateValues } from './types';
import type { GeneratedLayer } from '@/lib/parsers/template-generator';
import { COLORS } from '@/lib/brand/constants';

interface DynamicTemplateProps {
  values: TemplateValues;
  layers: GeneratedLayer[];
  canvasWidth: number;
  canvasHeight: number;
  width: number;
  height: number;
}

/**
 * Runtime Satori template that renders JSON layer definitions.
 * Used for templates generated from PSD/AI imports.
 */
export function DynamicSatoriTemplate({ values, layers, canvasWidth, canvasHeight, width, height }: DynamicTemplateProps) {
  const scaleX = width / canvasWidth;
  const scaleY = height / canvasHeight;

  return (
    <div style={{ display: 'flex', position: 'relative', width, height, backgroundColor: COLORS.charcoal, overflow: 'hidden' }}>
      {layers.map((layer) => {
        const x = Math.round(layer.x * scaleX);
        const y = Math.round(layer.y * scaleY);
        const w = Math.round(layer.width * scaleX);
        const h = Math.round(layer.height * scaleY);

        if (layer.type === 'text') {
          const text = layer.editable ? (values[layer.id] || layer.text || '') : (layer.text || '');
          const fontSize = Math.round((layer.fontSize || 24) * scaleX);

          return (
            <div
              key={layer.id}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: w,
                display: 'flex',
                fontFamily: layer.fontFamily || 'Plus Jakarta Sans',
                fontSize,
                color: layer.color || COLORS.white,
                lineHeight: 1.3,
              }}
            >
              {text}
            </div>
          );
        }

        if (layer.type === 'image') {
          const imageUrl = layer.editable ? (values[layer.id] || layer.imageUrl || '') : (layer.imageUrl || '');
          if (!imageUrl) return null;

          return (
            <img
              key={layer.id}
              src={imageUrl}
              alt={layer.name}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: w,
                height: h,
                objectFit: 'cover',
              }}
            />
          );
        }

        if (layer.type === 'shape') {
          return (
            <div
              key={layer.id}
              style={{
                position: 'absolute',
                left: x,
                top: y,
                width: w,
                height: h,
                backgroundColor: layer.backgroundColor || COLORS.charcoal,
              }}
            />
          );
        }

        return null;
      })}
    </div>
  );
}

/**
 * Browser preview version of the dynamic template.
 */
export function DynamicPreviewTemplate({
  values,
  layers,
  canvasWidth,
  canvasHeight,
}: Omit<DynamicTemplateProps, 'width' | 'height'>) {
  return (
    <div
      className="relative w-full h-full bg-charcoal rounded-lg overflow-hidden"
      style={{ aspectRatio: `${canvasWidth}/${canvasHeight}` }}
    >
      {layers.map((layer) => {
        const xPct = (layer.x / canvasWidth) * 100;
        const yPct = (layer.y / canvasHeight) * 100;
        const wPct = (layer.width / canvasWidth) * 100;
        const hPct = (layer.height / canvasHeight) * 100;

        if (layer.type === 'text') {
          const text = layer.editable ? (values[layer.id] || layer.text || '') : (layer.text || '');
          const fontSizeVw = ((layer.fontSize || 24) / canvasWidth) * 100;

          return (
            <div
              key={layer.id}
              className="absolute"
              style={{
                left: `${xPct}%`,
                top: `${yPct}%`,
                width: `${wPct}%`,
                fontFamily: layer.fontFamily,
                fontSize: `${fontSizeVw}vw`,
                color: layer.color || '#fff',
                lineHeight: 1.3,
              }}
            >
              {text}
            </div>
          );
        }

        if (layer.type === 'image') {
          const imageUrl = layer.editable ? (values[layer.id] || layer.imageUrl || '') : (layer.imageUrl || '');
          if (!imageUrl) return null;

          return (
            <img
              key={layer.id}
              src={imageUrl}
              alt={layer.name}
              className="absolute object-cover"
              style={{
                left: `${xPct}%`,
                top: `${yPct}%`,
                width: `${wPct}%`,
                height: `${hPct}%`,
              }}
            />
          );
        }

        if (layer.type === 'shape') {
          return (
            <div
              key={layer.id}
              className="absolute"
              style={{
                left: `${xPct}%`,
                top: `${yPct}%`,
                width: `${wPct}%`,
                height: `${hPct}%`,
                backgroundColor: layer.backgroundColor || '#161618',
              }}
            />
          );
        }

        return null;
      })}
    </div>
  );
}
