import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'social-quote-bg',
  name: 'Quote + Background',
  category: 'social',
  description: 'Quote post with a customizable background image.',
  fields: [
    { name: 'backgroundImage', label: 'Background Image', type: 'image', default: '', accept: '.png,.jpg,.jpeg,.psd,.ai,.svg', placeholder: 'Upload a background image' },
    { name: 'quote', label: 'Quote', type: 'textarea', default: 'Design is not just what it looks like. Design is how it works.', placeholder: 'Your quote' },
    { name: 'author', label: 'Author', type: 'text', default: 'Steve Jobs', placeholder: 'Attribution' },
    { name: 'overlayOpacity', label: 'Overlay Darkness', type: 'select', default: '0.6', options: ['0.3', '0.4', '0.5', '0.6', '0.7', '0.8', '0.9'] },
  ],
  defaultSize: 'ig-square',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  const opacity = parseFloat(values.overlayOpacity || '0.6');
  const hasBg = !!values.backgroundImage;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, position: 'relative', backgroundColor: COLORS.charcoal }}>
      {/* Background image */}
      {hasBg && (
        <img
          src={values.backgroundImage}
          alt=""
          style={{ position: 'absolute', top: 0, left: 0, width, height, objectFit: 'cover' }}
        />
      )}
      {/* Dark overlay */}
      <div style={{ position: 'absolute', top: 0, left: 0, width, height, backgroundColor: `rgba(0,0,0,${opacity})`, display: 'flex' }} />

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, padding: 100 * scale, position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ fontSize: 120 * scale, color: COLORS.ignite, fontFamily: 'DM Serif Display', lineHeight: 0.8, marginBottom: 20 * scale }}>&ldquo;</div>
          <div style={{ fontSize: 44 * scale, color: COLORS.white, fontFamily: 'DM Serif Display', lineHeight: 1.4 }}>
            {values.quote || config.fields[1].default}
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 * scale, marginTop: 40 * scale }}>
            <div style={{ width: 40 * scale, height: 2, backgroundColor: COLORS.ignite }} />
            <span style={{ fontSize: 22 * scale, color: COLORS.amber, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>
              {values.author || config.fields[2].default}
            </span>
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 * scale }}>
            <svg width={24 * scale} height={30 * scale} viewBox={FLAME_PATHS.viewBox}>
              <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
              <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
              <path d={FLAME_PATHS.core} fill={COLORS.sand} />
            </svg>
            <span style={{ fontSize: 20 * scale, color: 'rgba(255,255,255,0.7)', fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>calidevs</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  const opacity = parseFloat(values.overlayOpacity || '0.6');
  const hasBg = !!values.backgroundImage;

  return (
    <div className="relative flex flex-col w-full h-full bg-charcoal rounded-lg overflow-hidden">
      {hasBg && (
        <img src={values.backgroundImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
      )}
      <div className="absolute inset-0" style={{ backgroundColor: `rgba(0,0,0,${opacity})` }} />

      <div className="relative z-10 flex flex-col flex-1 p-8">
        <div className="flex-1 flex flex-col justify-center">
          <div className="text-5xl text-ignite font-serif leading-none mb-2">&ldquo;</div>
          <div className="text-xl text-white font-serif leading-relaxed">{values.quote || config.fields[1].default}</div>
          <div className="flex items-center gap-2 mt-4">
            <div className="w-6 h-0.5 bg-ignite" />
            <span className="text-amber font-bold text-sm">{values.author || config.fields[2].default}</span>
          </div>
        </div>
        <div className="flex items-center mt-4">
          <span className="font-sans font-bold text-white/70 text-xs">calidevs</span>
        </div>
      </div>
    </div>
  );
}
