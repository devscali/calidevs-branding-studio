import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'social-quote',
  name: 'Quote Post',
  category: 'social',
  description: 'Share a powerful quote with brand styling.',
  fields: [
    { name: 'quote', label: 'Quote', type: 'textarea', default: 'The best time to ship was yesterday. The second best time is now.', placeholder: 'Your quote' },
    { name: 'author', label: 'Author', type: 'text', default: 'calidevs', placeholder: 'Attribution' },
    { name: 'tag', label: 'Tag', type: 'text', default: '#devlife', placeholder: '#hashtag' },
  ],
  defaultSize: 'ig-square',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: COLORS.charcoal, padding: 100 * scale }}>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 120 * scale, color: COLORS.ignite, fontFamily: 'DM Serif Display', lineHeight: 0.8, marginBottom: 20 * scale }}>&ldquo;</div>
        <div style={{ fontSize: 44 * scale, color: COLORS.white, fontFamily: 'DM Serif Display', lineHeight: 1.4 }}>
          {values.quote || config.fields[0].default}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 * scale, marginTop: 40 * scale }}>
          <div style={{ width: 40 * scale, height: 2, backgroundColor: COLORS.ignite }} />
          <span style={{ fontSize: 22 * scale, color: COLORS.amber, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>
            {values.author || config.fields[1].default}
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
          <span style={{ fontSize: 20 * scale, color: COLORS.muted, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>calidevs</span>
        </div>
        <span style={{ fontSize: 18 * scale, color: COLORS.muted, fontFamily: 'JetBrains Mono' }}>{values.tag || config.fields[2].default}</span>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  return (
    <div className="flex flex-col w-full aspect-square bg-charcoal p-8 rounded-lg">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-5xl text-ignite font-serif leading-none mb-2">&ldquo;</div>
        <div className="text-xl text-white font-serif leading-relaxed">{values.quote || config.fields[0].default}</div>
        <div className="flex items-center gap-2 mt-4">
          <div className="w-6 h-0.5 bg-ignite" />
          <span className="text-amber font-bold text-sm">{values.author || config.fields[1].default}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 text-muted text-xs">
        <span className="font-sans font-bold">calidevs</span>
        <span className="font-mono">{values.tag || config.fields[2].default}</span>
      </div>
    </div>
  );
}
