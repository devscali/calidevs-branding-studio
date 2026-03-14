import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'social-stat',
  name: 'Stat Highlight',
  category: 'social',
  description: 'Feature a big number or metric with impact.',
  fields: [
    { name: 'stat', label: 'Big Number', type: 'text', default: '2.1s', placeholder: '99.9%' },
    { name: 'label', label: 'Metric Label', type: 'text', default: 'Average load time', placeholder: 'What it measures' },
    { name: 'context', label: 'Context', type: 'text', default: 'Down from 8.3s — 74% improvement', placeholder: 'Extra context' },
  ],
  defaultSize: 'ig-square',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: COLORS.charcoal, padding: 100 * scale }}>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <div style={{ fontSize: 160 * scale, fontWeight: 700, color: COLORS.ignite, fontFamily: 'Plus Jakarta Sans', lineHeight: 1 }}>
          {values.stat || config.fields[0].default}
        </div>
        <div style={{ fontSize: 32 * scale, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', marginTop: 24 * scale, textAlign: 'center' }}>
          {values.label || config.fields[1].default}
        </div>
        <div style={{ fontSize: 22 * scale, color: COLORS.muted, fontFamily: 'JetBrains Mono', marginTop: 16 * scale, textAlign: 'center' }}>
          {values.context || config.fields[2].default}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 * scale }}>
        <svg width={24 * scale} height={30 * scale} viewBox={FLAME_PATHS.viewBox}>
          <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
          <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
          <path d={FLAME_PATHS.core} fill={COLORS.sand} />
        </svg>
        <span style={{ fontSize: 20 * scale, color: COLORS.muted, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>calidevs</span>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  return (
    <div className="flex flex-col w-full aspect-square bg-charcoal p-8 rounded-lg items-center justify-center text-center">
      <div className="flex-1 flex flex-col justify-center items-center">
        <div className="text-5xl font-bold text-ignite">{values.stat || config.fields[0].default}</div>
        <div className="text-lg text-white mt-3">{values.label || config.fields[1].default}</div>
        <div className="text-xs text-muted font-mono mt-2">{values.context || config.fields[2].default}</div>
      </div>
      <div className="text-muted text-xs font-bold mt-4">calidevs</div>
    </div>
  );
}
