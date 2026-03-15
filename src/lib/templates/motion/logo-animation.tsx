import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'motion-logo-animation',
  name: 'Logo Reveal',
  category: 'motion',
  description: 'Animated logo reveal frame — export as still or use with Remotion for video.',
  fields: [
    { name: 'brandName', label: 'Brand Name', type: 'text', default: 'calidevs', placeholder: 'Brand name' },
    { name: 'tagline', label: 'Tagline', type: 'text', default: 'Build fast, ship smart, sleep well.', placeholder: 'Tagline text' },
    { name: 'bgColor', label: 'Background', type: 'select', default: '#161618', options: ['#161618', '#0d0d0d', '#1a0a00', '#0a0a1a'] },
    { name: 'accentColor', label: 'Accent', type: 'select', default: '#E8501A', options: ['#E8501A', '#F5A623', '#a78bfa', '#5dcaa5'] },
  ],
  defaultSize: 'ig-square',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  const accent = values.accentColor || config.fields[3].default;
  const bg = values.bgColor || config.fields[2].default;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: bg, alignItems: 'center', justifyContent: 'center' }}>
      {/* Glow effect background */}
      <div style={{
        position: 'absolute',
        width: 400 * scale,
        height: 400 * scale,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${accent}15, transparent 70%)`,
        display: 'flex',
      }} />

      {/* Logo */}
      <svg width={120 * scale} height={152 * scale} viewBox={FLAME_PATHS.viewBox} style={{ marginBottom: 32 * scale }}>
        <path d={FLAME_PATHS.outer} fill={accent} />
        <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
        <path d={FLAME_PATHS.core} fill={COLORS.sand} />
      </svg>

      {/* Brand name */}
      <div style={{ fontSize: 48 * scale, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', fontWeight: 700, letterSpacing: -1 }}>
        {values.brandName || config.fields[0].default}
      </div>

      {/* Tagline */}
      <div style={{ fontSize: 18 * scale, color: COLORS.muted, fontFamily: 'DM Serif Display', marginTop: 12 * scale }}>
        {values.tagline || config.fields[1].default}
      </div>

      {/* Decorative line */}
      <div style={{ width: 60 * scale, height: 2, backgroundColor: accent, marginTop: 32 * scale, borderRadius: 1 }} />
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  const accent = values.accentColor || config.fields[3].default;
  const bg = values.bgColor || config.fields[2].default;

  return (
    <div className="flex flex-col items-center justify-center h-full rounded-lg p-8" style={{ backgroundColor: bg }}>
      <div className="relative">
        <div className="absolute inset-0 rounded-full blur-3xl opacity-10" style={{ backgroundColor: accent }} />
        <div className="w-16 h-20 mb-4 rounded-sm relative" style={{ backgroundColor: accent }} />
      </div>
      <h1 className="text-2xl text-white font-bold -tracking-wide">
        {values.brandName || config.fields[0].default}
      </h1>
      <p className="text-sm text-muted font-serif mt-1">
        {values.tagline || config.fields[1].default}
      </p>
      <div className="w-8 h-0.5 rounded mt-4" style={{ backgroundColor: accent }} />
    </div>
  );
}
