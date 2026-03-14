import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'social-service',
  name: 'Service Spotlight',
  category: 'social',
  description: 'Highlight a service you offer with clean branding.',
  fields: [
    { name: 'service', label: 'Service Name', type: 'text', default: 'Shopify Development', placeholder: 'Service name' },
    { name: 'description', label: 'Description', type: 'textarea', default: 'Custom themes, headless commerce, and checkout optimization that converts.', placeholder: 'What you deliver' },
    { name: 'price', label: 'Starting At', type: 'text', default: 'From $2,500', placeholder: 'Price or CTA' },
  ],
  defaultSize: 'ig-square',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: COLORS.charcoal, padding: 100 * scale }}>
      <div style={{ display: 'flex', marginBottom: 40 * scale }}>
        <svg width={40 * scale} height={50 * scale} viewBox={FLAME_PATHS.viewBox}>
          <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
          <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
          <path d={FLAME_PATHS.core} fill={COLORS.sand} />
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
        <div style={{ fontSize: 24 * scale, color: COLORS.ignite, fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: 4, marginBottom: 20 * scale }}>
          Service
        </div>
        <div style={{ fontSize: 56 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.2, marginBottom: 24 * scale }}>
          {values.service || config.fields[0].default}
        </div>
        <div style={{ fontSize: 28 * scale, color: COLORS.muted, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.6 }}>
          {values.description || config.fields[1].default}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: `1px solid ${COLORS.muted}33`, paddingTop: 30 * scale }}>
        <span style={{ fontSize: 28 * scale, fontWeight: 700, color: COLORS.amber, fontFamily: 'Plus Jakarta Sans' }}>
          {values.price || config.fields[2].default}
        </span>
        <span style={{ fontSize: 20 * scale, color: COLORS.muted, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>calidevs</span>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  return (
    <div className="flex flex-col w-full aspect-square bg-charcoal p-8 rounded-lg">
      <div className="font-mono text-xs text-ignite uppercase tracking-widest mb-4">Service</div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-2xl font-bold text-white font-sans mb-3">{values.service || config.fields[0].default}</div>
        <div className="text-sm text-muted leading-relaxed">{values.description || config.fields[1].default}</div>
      </div>
      <div className="flex items-center justify-between border-t border-border pt-4 mt-4">
        <span className="text-amber font-bold">{values.price || config.fields[2].default}</span>
        <span className="text-muted text-xs font-bold">calidevs</span>
      </div>
    </div>
  );
}
