import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'social-shipped',
  name: 'Shipped This Week',
  category: 'social',
  description: 'Weekly roundup of what you shipped.',
  fields: [
    { name: 'item1', label: 'Item 1', type: 'text', default: 'Branding Studio launched', placeholder: 'First thing shipped' },
    { name: 'item2', label: 'Item 2', type: 'text', default: 'Export pipeline (JPG, PNG, PDF)', placeholder: 'Second thing' },
    { name: 'item3', label: 'Item 3', type: 'text', default: '15 Instagram templates', placeholder: 'Third thing' },
    { name: 'week', label: 'Week Label', type: 'text', default: 'Week 11 · 2026', placeholder: 'Week X · Year' },
  ],
  defaultSize: 'ig-square',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  const items = [
    values.item1 || config.fields[0].default,
    values.item2 || config.fields[1].default,
    values.item3 || config.fields[2].default,
  ].filter(Boolean);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: COLORS.charcoal, padding: 100 * scale }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 * scale, marginBottom: 60 * scale }}>
        <svg width={32 * scale} height={40 * scale} viewBox={FLAME_PATHS.viewBox}>
          <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
          <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
          <path d={FLAME_PATHS.core} fill={COLORS.sand} />
        </svg>
        <span style={{ fontSize: 18 * scale, color: COLORS.muted, fontFamily: 'JetBrains Mono' }}>
          {values.week || config.fields[3].default}
        </span>
      </div>

      <div style={{ fontSize: 44 * scale, fontWeight: 700, color: COLORS.ignite, fontFamily: 'Plus Jakarta Sans', marginBottom: 48 * scale }}>
        Shipped this week
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 32 * scale }}>
        {items.map((item, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 20 * scale }}>
            <div style={{ fontSize: 28 * scale, color: COLORS.ignite, fontWeight: 700, fontFamily: 'JetBrains Mono', minWidth: 40 * scale }}>
              0{i + 1}
            </div>
            <div style={{ fontSize: 32 * scale, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.4 }}>
              {item}
            </div>
          </div>
        ))}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: 20 * scale, color: COLORS.muted, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>calidevs</span>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  const items = [
    values.item1 || config.fields[0].default,
    values.item2 || config.fields[1].default,
    values.item3 || config.fields[2].default,
  ].filter(Boolean);

  return (
    <div className="flex flex-col w-full aspect-square bg-charcoal p-8 rounded-lg">
      <div className="font-mono text-xs text-muted mb-4">{values.week || config.fields[3].default}</div>
      <div className="text-xl font-bold text-ignite mb-6">Shipped this week</div>
      <div className="flex-1 flex flex-col justify-center gap-4">
        {items.map((item, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-ignite font-mono font-bold text-sm">0{i + 1}</span>
            <span className="text-white text-sm">{item}</span>
          </div>
        ))}
      </div>
      <div className="text-right text-muted text-xs font-bold mt-4">calidevs</div>
    </div>
  );
}
