import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'motion-social-animation',
  name: 'Animated Social Post',
  category: 'motion',
  description: 'Social media post frame designed for animation — text reveal with accent bars.',
  fields: [
    { name: 'headline', label: 'Headline', type: 'text', default: 'We just shipped something big.', placeholder: 'Main text' },
    { name: 'subtext', label: 'Subtext', type: 'text', default: 'Swipe to see the details →', placeholder: 'Secondary text' },
    { name: 'handle', label: 'Handle', type: 'text', default: '@calidevs', placeholder: '@handle' },
    { name: 'theme', label: 'Theme', type: 'select', default: 'dark', options: ['dark', 'ignite', 'violet'] },
  ],
  defaultSize: 'ig-square',
};

const THEMES: Record<string, { bg: string; accent: string; text: string; sub: string }> = {
  dark: { bg: COLORS.charcoal, accent: COLORS.ignite, text: COLORS.white, sub: COLORS.muted },
  ignite: { bg: COLORS.ignite, accent: COLORS.amber, text: COLORS.white, sub: 'rgba(255,255,255,0.7)' },
  violet: { bg: '#0d0d0d', accent: '#a78bfa', text: COLORS.white, sub: COLORS.muted },
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  const theme = THEMES[values.theme || 'dark'] || THEMES.dark;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: theme.bg, padding: 100 * scale }}>
      {/* Top accent bars */}
      <div style={{ display: 'flex', gap: 8 * scale, marginBottom: 80 * scale }}>
        <div style={{ width: 60 * scale, height: 4, backgroundColor: theme.accent, borderRadius: 2 }} />
        <div style={{ width: 30 * scale, height: 4, backgroundColor: theme.accent, opacity: 0.5, borderRadius: 2 }} />
        <div style={{ width: 15 * scale, height: 4, backgroundColor: theme.accent, opacity: 0.25, borderRadius: 2 }} />
      </div>

      {/* Main content */}
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center' }}>
        <div style={{ fontSize: 56 * scale, color: theme.text, fontFamily: 'DM Serif Display', lineHeight: 1.2, marginBottom: 24 * scale }}>
          {values.headline || config.fields[0].default}
        </div>
        <div style={{ fontSize: 22 * scale, color: theme.sub, fontFamily: 'Plus Jakarta Sans' }}>
          {values.subtext || config.fields[1].default}
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 * scale }}>
          <svg width={24 * scale} height={30 * scale} viewBox={FLAME_PATHS.viewBox}>
            <path d={FLAME_PATHS.outer} fill={theme.accent} />
            <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
            <path d={FLAME_PATHS.core} fill={COLORS.sand} />
          </svg>
          <span style={{ fontSize: 18 * scale, color: theme.sub, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>calidevs</span>
        </div>
        <span style={{ fontSize: 16 * scale, color: theme.sub, fontFamily: 'JetBrains Mono' }}>
          {values.handle || config.fields[2].default}
        </span>
      </div>

      {/* Bottom accent bars */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8 * scale, marginTop: 40 * scale }}>
        <div style={{ width: 15 * scale, height: 4, backgroundColor: theme.accent, opacity: 0.25, borderRadius: 2 }} />
        <div style={{ width: 30 * scale, height: 4, backgroundColor: theme.accent, opacity: 0.5, borderRadius: 2 }} />
        <div style={{ width: 60 * scale, height: 4, backgroundColor: theme.accent, borderRadius: 2 }} />
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  const theme = THEMES[values.theme || 'dark'] || THEMES.dark;

  return (
    <div className="flex flex-col h-full rounded-lg p-8" style={{ backgroundColor: theme.bg }}>
      <div className="flex gap-1 mb-8">
        <div className="w-8 h-0.5 rounded" style={{ backgroundColor: theme.accent }} />
        <div className="w-4 h-0.5 rounded opacity-50" style={{ backgroundColor: theme.accent }} />
        <div className="w-2 h-0.5 rounded opacity-25" style={{ backgroundColor: theme.accent }} />
      </div>

      <div className="flex-1 flex flex-col justify-center">
        <h1 className="text-2xl font-serif leading-tight mb-3" style={{ color: theme.text }}>
          {values.headline || config.fields[0].default}
        </h1>
        <p className="text-sm" style={{ color: theme.sub }}>
          {values.subtext || config.fields[1].default}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-xs font-bold" style={{ color: theme.sub }}>calidevs</span>
        <span className="text-xs font-mono" style={{ color: theme.sub }}>
          {values.handle || config.fields[2].default}
        </span>
      </div>

      <div className="flex justify-end gap-1 mt-4">
        <div className="w-2 h-0.5 rounded opacity-25" style={{ backgroundColor: theme.accent }} />
        <div className="w-4 h-0.5 rounded opacity-50" style={{ backgroundColor: theme.accent }} />
        <div className="w-8 h-0.5 rounded" style={{ backgroundColor: theme.accent }} />
      </div>
    </div>
  );
}
