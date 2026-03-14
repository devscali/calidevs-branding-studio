import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'terminal-diff',
  name: 'Diff Post',
  category: 'terminal',
  description: 'Before/after code diff — show what you changed and why.',
  fields: [
    { name: 'title', label: 'Title', type: 'text', default: 'Clean code tip:', placeholder: 'What changed' },
    { name: 'removed', label: 'Removed (red line)', type: 'text', default: 'const data = fetchData().then(r => r.json())', placeholder: 'Old code' },
    { name: 'added', label: 'Added (green line)', type: 'text', default: 'const data = await fetchData()', placeholder: 'New code' },
    { name: 'tag', label: 'Tag', type: 'text', default: '#cleancode', placeholder: '#hashtag' },
  ],
  defaultSize: 'ig-square',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: COLORS.charcoal, padding: 80 * scale, fontFamily: 'JetBrains Mono' }}>
      <div style={{ display: 'flex', gap: 8 * scale, marginBottom: 40 * scale }}>
        <div style={{ width: 14 * scale, height: 14 * scale, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
        <div style={{ width: 14 * scale, height: 14 * scale, borderRadius: '50%', backgroundColor: '#febc2e' }} />
        <div style={{ width: 14 * scale, height: 14 * scale, borderRadius: '50%', backgroundColor: '#28c840' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 24 * scale }}>
        <div style={{ fontSize: 44 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans' }}>
          {values.title || config.fields[0].default}
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 * scale, marginTop: 24 * scale }}>
          <div style={{ display: 'flex', backgroundColor: '#3c1618', padding: `${16 * scale}px ${20 * scale}px`, borderRadius: 8 * scale, fontSize: 22 * scale, color: '#f87171' }}>
            <span style={{ marginRight: 12 * scale, opacity: 0.5 }}>-</span>
            {values.removed || config.fields[1].default}
          </div>
          <div style={{ display: 'flex', backgroundColor: '#16301c', padding: `${16 * scale}px ${20 * scale}px`, borderRadius: 8 * scale, fontSize: 22 * scale, color: '#4ade80' }}>
            <span style={{ marginRight: 12 * scale, opacity: 0.5 }}>+</span>
            {values.added || config.fields[2].default}
          </div>
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
        <span style={{ fontSize: 18 * scale, color: COLORS.muted }}>{values.tag || config.fields[3].default}</span>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  return (
    <div className="flex flex-col w-full aspect-auto h-full bg-charcoal p-8 font-mono text-sm rounded-lg">
      <div className="flex gap-1.5 mb-4">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex-1 flex flex-col justify-center gap-3">
        <div className="text-xl font-bold text-white font-sans">{values.title || config.fields[0].default}</div>
        <div className="mt-3 space-y-1">
          <div className="bg-[#3c1618] text-[#f87171] p-2 rounded text-xs">
            <span className="opacity-50 mr-2">-</span>{values.removed || config.fields[1].default}
          </div>
          <div className="bg-[#16301c] text-[#4ade80] p-2 rounded text-xs">
            <span className="opacity-50 mr-2">+</span>{values.added || config.fields[2].default}
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4 text-muted text-xs">
        <span className="font-sans font-bold">calidevs</span>
        <span>{values.tag || config.fields[3].default}</span>
      </div>
    </div>
  );
}
