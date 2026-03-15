import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'presentation-brand-guidelines',
  name: 'Brand Guidelines',
  category: 'presentation',
  description: 'Present brand identity guidelines to clients.',
  fields: [
    { name: 'brandName', label: 'Brand Name', type: 'text', default: 'calidevs', placeholder: 'Brand name' },
    { name: 'tagline', label: 'Tagline', type: 'text', default: 'Build fast, ship smart, sleep well.', placeholder: 'Brand tagline' },
    { name: 'primaryColor', label: 'Primary Color', type: 'text', default: '#E8501A', placeholder: '#hex' },
    { name: 'secondaryColor', label: 'Secondary Color', type: 'text', default: '#F5A623', placeholder: '#hex' },
    { name: 'fontPrimary', label: 'Primary Font', type: 'text', default: 'Plus Jakarta Sans', placeholder: 'Font name' },
    { name: 'fontSecondary', label: 'Secondary Font', type: 'text', default: 'DM Serif Display', placeholder: 'Font name' },
  ],
  defaultSize: 'og',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1200;
  const primary = values.primaryColor || config.fields[2].default;
  const secondary = values.secondaryColor || config.fields[3].default;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: COLORS.charcoal, padding: 80 * scale }}>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        {/* Logo area */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 * scale, marginBottom: 48 * scale }}>
          <svg width={40 * scale} height={50 * scale} viewBox={FLAME_PATHS.viewBox}>
            <path d={FLAME_PATHS.outer} fill={primary} />
            <path d={FLAME_PATHS.inner} fill={secondary} />
            <path d={FLAME_PATHS.core} fill={COLORS.sand} />
          </svg>
          <span style={{ fontSize: 28 * scale, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>
            {values.brandName || config.fields[0].default}
          </span>
        </div>

        <div style={{ fontSize: 14 * scale, color: primary, fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: 4, marginBottom: 16 * scale }}>
          Brand Guidelines
        </div>

        <div style={{ fontSize: 36 * scale, color: COLORS.white, fontFamily: 'DM Serif Display', lineHeight: 1.3, marginBottom: 32 * scale }}>
          {values.tagline || config.fields[1].default}
        </div>

        {/* Color palette */}
        <div style={{ display: 'flex', gap: 16 * scale, marginBottom: 32 * scale }}>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 * scale }}>
            <div style={{ width: 60 * scale, height: 60 * scale, borderRadius: 12 * scale, backgroundColor: primary }} />
            <span style={{ fontSize: 10 * scale, color: COLORS.muted, fontFamily: 'JetBrains Mono' }}>{primary}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 * scale }}>
            <div style={{ width: 60 * scale, height: 60 * scale, borderRadius: 12 * scale, backgroundColor: secondary }} />
            <span style={{ fontSize: 10 * scale, color: COLORS.muted, fontFamily: 'JetBrains Mono' }}>{secondary}</span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 * scale }}>
            <div style={{ width: 60 * scale, height: 60 * scale, borderRadius: 12 * scale, backgroundColor: COLORS.charcoal, border: `2px solid ${COLORS.muted}` }} />
            <span style={{ fontSize: 10 * scale, color: COLORS.muted, fontFamily: 'JetBrains Mono' }}>{COLORS.charcoal}</span>
          </div>
        </div>

        {/* Typography */}
        <div style={{ display: 'flex', gap: 40 * scale }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 * scale }}>
            <span style={{ fontSize: 10 * scale, color: COLORS.muted, fontFamily: 'JetBrains Mono', textTransform: 'uppercase' }}>Primary Font</span>
            <span style={{ fontSize: 20 * scale, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>
              {values.fontPrimary || config.fields[4].default}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 * scale }}>
            <span style={{ fontSize: 10 * scale, color: COLORS.muted, fontFamily: 'JetBrains Mono', textTransform: 'uppercase' }}>Display Font</span>
            <span style={{ fontSize: 20 * scale, color: COLORS.white, fontFamily: 'DM Serif Display' }}>
              {values.fontSecondary || config.fields[5].default}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  const primary = values.primaryColor || config.fields[2].default;
  const secondary = values.secondaryColor || config.fields[3].default;

  return (
    <div className="flex flex-col h-full bg-charcoal rounded-lg p-8">
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-6">
          <div className="w-5 h-6 rounded-sm" style={{ backgroundColor: primary }} />
          <span className="text-lg text-white font-bold">{values.brandName || config.fields[0].default}</span>
        </div>
        <p className="text-[10px] font-mono uppercase tracking-widest mb-2" style={{ color: primary }}>Brand Guidelines</p>
        <h1 className="text-xl text-white font-serif leading-tight mb-4">
          {values.tagline || config.fields[1].default}
        </h1>
        <div className="flex gap-2 mb-4">
          <div className="w-8 h-8 rounded" style={{ backgroundColor: primary }} />
          <div className="w-8 h-8 rounded" style={{ backgroundColor: secondary }} />
          <div className="w-8 h-8 rounded bg-charcoal border border-muted" />
        </div>
        <div className="flex gap-6 text-xs">
          <div>
            <p className="text-muted font-mono text-[9px] uppercase">Primary</p>
            <p className="text-white font-bold">{values.fontPrimary || config.fields[4].default}</p>
          </div>
          <div>
            <p className="text-muted font-mono text-[9px] uppercase">Display</p>
            <p className="text-white font-serif">{values.fontSecondary || config.fields[5].default}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
