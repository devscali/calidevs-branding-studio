import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'terminal-insight',
  name: 'Insight Post',
  category: 'terminal',
  description: 'Terminal-style insight with command prompt aesthetic.',
  fields: [
    { name: 'title', label: 'Title', type: 'text', default: 'Hot take:', placeholder: 'Hook line' },
    { name: 'body', label: 'Body', type: 'textarea', default: 'The best code is the code you don\'t write.', placeholder: 'Your insight...' },
    { name: 'tag', label: 'Tag', type: 'text', default: '#webdev', placeholder: '#hashtag' },
  ],
  defaultSize: 'ig-square',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: COLORS.charcoal, padding: 80 * scale, fontFamily: 'JetBrains Mono' }}>
      {/* Terminal header */}
      <div style={{ display: 'flex', gap: 8 * scale, marginBottom: 40 * scale }}>
        <div style={{ width: 14 * scale, height: 14 * scale, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
        <div style={{ width: 14 * scale, height: 14 * scale, borderRadius: '50%', backgroundColor: '#febc2e' }} />
        <div style={{ width: 14 * scale, height: 14 * scale, borderRadius: '50%', backgroundColor: '#28c840' }} />
      </div>

      {/* Prompt */}
      <div style={{ display: 'flex', fontSize: 24 * scale, color: COLORS.muted, marginBottom: 20 * scale }}>
        <span style={{ color: COLORS.ignite }}>~/calidevs</span>
        <span style={{ marginLeft: 8 }}>$</span>
        <span style={{ marginLeft: 8, color: COLORS.amber }}>echo</span>
      </div>

      {/* Content */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
        <div style={{ fontSize: 48 * scale, fontWeight: 700, color: COLORS.ignite, marginBottom: 24 * scale, fontFamily: 'Plus Jakarta Sans' }}>
          {values.title || config.fields[0].default}
        </div>
        <div style={{ fontSize: 36 * scale, color: COLORS.white, lineHeight: 1.5, fontFamily: 'Plus Jakarta Sans' }}>
          {values.body || config.fields[1].default}
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 40 * scale }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 * scale }}>
          <svg width={24 * scale} height={30 * scale} viewBox={FLAME_PATHS.viewBox}>
            <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
            <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
            <path d={FLAME_PATHS.core} fill={COLORS.sand} />
          </svg>
          <span style={{ fontSize: 20 * scale, color: COLORS.muted, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>calidevs</span>
        </div>
        <span style={{ fontSize: 18 * scale, color: COLORS.muted }}>{values.tag || config.fields[2].default}</span>
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
      <div className="text-muted mb-2">
        <span className="text-ignite">~/calidevs</span> $ <span className="text-amber">echo</span>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="text-2xl font-bold text-ignite font-sans mb-2">{values.title || config.fields[0].default}</div>
        <div className="text-lg text-white font-sans">{values.body || config.fields[1].default}</div>
      </div>
      <div className="flex items-center justify-between mt-4 text-muted text-xs">
        <span className="font-sans font-bold">calidevs</span>
        <span>{values.tag || config.fields[2].default}</span>
      </div>
    </div>
  );
}
