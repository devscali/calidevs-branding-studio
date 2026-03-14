import { COLORS, FLAME_PATHS, CANADA_COLORS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'campaign-brand-hook',
  name: 'Canada — Brand Hook',
  category: 'campaign',
  description: 'Story 01: Bold intro — "Born in Tijuana. Conquering Canada."',
  fields: [
    { name: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'CALIDEVS.COM', placeholder: 'Top line' },
    { name: 'line1', label: 'Headline Line 1', type: 'text', default: 'Born in', placeholder: 'First line' },
    { name: 'line2', label: 'Headline Line 2', type: 'text', default: 'Tijuana.', placeholder: 'Second line' },
    { name: 'line3', label: 'Headline Line 3', type: 'text', default: 'Conquering', placeholder: 'Third line' },
    { name: 'line4', label: 'Headline Line 4', type: 'text', default: 'Canada.', placeholder: 'Fourth line' },
    { name: 'sub1', label: 'Subtext Line 1', type: 'text', default: 'Mexican hustle.', placeholder: 'Subtexto' },
    { name: 'sub2', label: 'Subtext Line 2', type: 'text', default: 'California proven.', placeholder: 'Subtexto' },
    { name: 'sub3', label: 'Subtext Line 3', type: 'text', default: 'North America ready.', placeholder: 'Subtexto' },
  ],
  defaultSize: 'ig-story',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  const v = (name: string, i: number) => values[name] || config.fields[i].default;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: CANADA_COLORS.bg, padding: `${120 * scale}px ${80 * scale}px` }}>
      {/* Eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 * scale, marginBottom: 60 * scale }}>
        <svg width={20 * scale} height={25 * scale} viewBox={FLAME_PATHS.viewBox}>
          <path d={FLAME_PATHS.outer} fill={CANADA_COLORS.violet} />
          <path d={FLAME_PATHS.inner} fill={COLORS.white} />
          <path d={FLAME_PATHS.core} fill={COLORS.white} />
        </svg>
        <span style={{ fontSize: 16 * scale, color: '#666666', fontFamily: 'JetBrains Mono', letterSpacing: '0.15em', textTransform: 'uppercase' as const }}>
          {v('eyebrow', 0)}
        </span>
      </div>

      {/* Headline */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 4 * scale, marginBottom: 60 * scale }}>
          <span style={{ fontSize: 72 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.1 }}>{v('line1', 1)}</span>
          <span style={{ fontSize: 72 * scale, fontWeight: 700, color: CANADA_COLORS.violet, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.1 }}>{v('line2', 2)}</span>
          <span style={{ fontSize: 72 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.1 }}>{v('line3', 3)}</span>
          <span style={{ fontSize: 72 * scale, fontWeight: 700, color: CANADA_COLORS.violet, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.1 }}>{v('line4', 4)}</span>
        </div>

        {/* Subtexto */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 * scale }}>
          <span style={{ fontSize: 24 * scale, color: '#999999', fontFamily: 'Plus Jakarta Sans', lineHeight: 1.6 }}>{v('sub1', 5)}</span>
          <span style={{ fontSize: 24 * scale, color: '#999999', fontFamily: 'Plus Jakarta Sans', lineHeight: 1.6 }}>{v('sub2', 6)}</span>
          <span style={{ fontSize: 24 * scale, color: '#999999', fontFamily: 'Plus Jakarta Sans', lineHeight: 1.6 }}>{v('sub3', 7)}</span>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 * scale }}>
          <svg width={18 * scale} height={22 * scale} viewBox={FLAME_PATHS.viewBox}>
            <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
            <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
            <path d={FLAME_PATHS.core} fill={COLORS.sand} />
          </svg>
          <span style={{ fontSize: 16 * scale, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', fontWeight: 700, letterSpacing: '0.05em' }}>CALIDEVS</span>
        </div>
        <span style={{ fontSize: 14 * scale, color: '#555555', fontFamily: 'JetBrains Mono' }}>swipe →</span>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  const v = (name: string, i: number) => values[name] || config.fields[i].default;

  return (
    <div className="flex flex-col w-full aspect-auto h-full rounded-lg" style={{ backgroundColor: CANADA_COLORS.bg, padding: '2rem 1.5rem' }}>
      <div className="flex items-center gap-2 mb-6">
        <span className="text-[10px] font-mono tracking-widest" style={{ color: '#666666' }}>{v('eyebrow', 0)}</span>
      </div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex flex-col mb-6">
          <span className="text-2xl font-bold text-white leading-tight">{v('line1', 1)}</span>
          <span className="text-2xl font-bold leading-tight" style={{ color: CANADA_COLORS.violet }}>{v('line2', 2)}</span>
          <span className="text-2xl font-bold text-white leading-tight">{v('line3', 3)}</span>
          <span className="text-2xl font-bold leading-tight" style={{ color: CANADA_COLORS.violet }}>{v('line4', 4)}</span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="text-xs" style={{ color: '#999999' }}>{v('sub1', 5)}</span>
          <span className="text-xs" style={{ color: '#999999' }}>{v('sub2', 6)}</span>
          <span className="text-xs" style={{ color: '#999999' }}>{v('sub3', 7)}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="text-[10px] text-white font-bold tracking-wider">CALIDEVS</span>
        <span className="text-[10px] font-mono" style={{ color: '#555555' }}>swipe →</span>
      </div>
    </div>
  );
}
