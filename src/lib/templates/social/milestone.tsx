import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'social-milestone',
  name: 'Milestone',
  category: 'social',
  description: 'Celebrate a milestone or achievement.',
  fields: [
    { name: 'milestone', label: 'Milestone', type: 'text', default: '100 Projects Shipped', placeholder: 'What you achieved' },
    { name: 'detail', label: 'Detail', type: 'textarea', default: 'From small fixes to full rebuilds. Every project taught us something new.', placeholder: 'Context' },
    { name: 'date', label: 'Date', type: 'text', default: 'March 2026', placeholder: 'When' },
  ],
  defaultSize: 'ig-square',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: COLORS.ignite, padding: 100 * scale }}>
      <div style={{ display: 'flex', marginBottom: 40 * scale }}>
        <svg width={48 * scale} height={60 * scale} viewBox={FLAME_PATHS.viewBox}>
          <path d={FLAME_PATHS.outer} fill={COLORS.white} />
          <path d={FLAME_PATHS.inner} fill={COLORS.sand} />
          <path d={FLAME_PATHS.core} fill="#FFF5E6" />
        </svg>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
        <div style={{ fontSize: 56 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.2, marginBottom: 24 * scale }}>
          {values.milestone || config.fields[0].default}
        </div>
        <div style={{ fontSize: 28 * scale, color: COLORS.sand, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.6 }}>
          {values.detail || config.fields[1].default}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ fontSize: 22 * scale, color: COLORS.sand, fontFamily: 'JetBrains Mono' }}>
          {values.date || config.fields[2].default}
        </span>
        <span style={{ fontSize: 20 * scale, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>calidevs</span>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  return (
    <div className="flex flex-col w-full aspect-square bg-ignite p-8 rounded-lg">
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-2xl font-bold text-white font-sans mb-3">{values.milestone || config.fields[0].default}</div>
        <div className="text-sm text-sand leading-relaxed">{values.detail || config.fields[1].default}</div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-sand text-xs font-mono">{values.date || config.fields[2].default}</span>
        <span className="text-white text-xs font-bold">calidevs</span>
      </div>
    </div>
  );
}
