import { COLORS, FLAME_PATHS, CANADA_COLORS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'campaign-manifesto',
  name: 'Canada — Manifesto',
  category: 'campaign',
  description: 'Story 03: "We were born on the border..." — violet accents.',
  fields: [
    { name: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'OUR STORY', placeholder: 'Top label' },
    { name: 'block1', label: 'Block 1', type: 'text', default: 'We were born on the border —', placeholder: 'Opening line' },
    { name: 'block2', label: 'Block 2', type: 'text', default: "where hustle isn't a trend,", placeholder: 'Second line' },
    { name: 'accent1', label: 'Accent Line (violet)', type: 'text', default: "it's survival.", placeholder: 'Violet accent' },
    { name: 'block3', label: 'Block 3', type: 'text', default: 'We proved our craft in California.', placeholder: 'Third line' },
    { name: 'block4', label: 'Block 4', type: 'text', default: "Now we're bringing that same fire to Canada.", placeholder: 'Fourth line' },
    { name: 'closer', label: 'Closer', type: 'text', default: 'This is CaliDevs.', placeholder: 'Closing statement' },
    { name: 'accent2', label: 'Accent Closer (violet)', type: 'text', default: 'Built different. By design.', placeholder: 'Violet closer' },
  ],
  defaultSize: 'ig-story',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  const v = (name: string, i: number) => values[name] || config.fields[i].default;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: CANADA_COLORS.bg, padding: `${120 * scale}px ${80 * scale}px` }}>
      {/* Wordmark + eyebrow */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 60 * scale }}>
        <span style={{ display: 'flex', alignItems: 'flex-end', fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 22 * scale }}>
          <span style={{ color: COLORS.white }}>cali</span>
          <span style={{ color: CANADA_COLORS.violet }}>devs</span>
          <svg width={8 * scale} height={10 * scale} viewBox={FLAME_PATHS.viewBox} style={{ marginLeft: 1 * scale }}>
            <path d={FLAME_PATHS.outer} fill={CANADA_COLORS.violet} />
            <path d={FLAME_PATHS.inner} fill={COLORS.white} />
            <path d={FLAME_PATHS.core} fill={COLORS.white} />
          </svg>
        </span>
        <span style={{ fontSize: 14 * scale, color: '#666666', fontFamily: 'JetBrains Mono', letterSpacing: '0.15em' }}>
          {v('eyebrow', 0)}
        </span>
      </div>

      {/* Manifesto text */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 40 * scale }}>
        <span style={{ fontSize: 32 * scale, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.5 }}>
          {v('block1', 1)}
        </span>
        <span style={{ fontSize: 32 * scale, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.5 }}>
          {v('block2', 2)}
        </span>
        <span style={{ fontSize: 38 * scale, fontWeight: 700, color: CANADA_COLORS.violet, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.4 }}>
          {v('accent1', 3)}
        </span>
        <span style={{ fontSize: 32 * scale, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.5 }}>
          {v('block3', 4)}
        </span>
        <span style={{ fontSize: 32 * scale, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.5 }}>
          {v('block4', 5)}
        </span>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 * scale, marginTop: 20 * scale }}>
          <span style={{ fontSize: 32 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.4 }}>
            {v('closer', 6)}
          </span>
          <span style={{ fontSize: 38 * scale, fontWeight: 700, color: CANADA_COLORS.violet, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.4 }}>
            {v('accent2', 7)}
          </span>
        </div>
      </div>

      {/* Footer wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', alignItems: 'flex-end', fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 18 * scale }}>
          <span style={{ color: COLORS.white }}>cali</span>
          <span style={{ color: COLORS.ignite }}>devs</span>
          <svg width={6 * scale} height={8 * scale} viewBox={FLAME_PATHS.viewBox} style={{ marginLeft: 1 * scale }}>
            <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
            <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
            <path d={FLAME_PATHS.core} fill={COLORS.sand} />
          </svg>
        </span>
        <span style={{ fontSize: 14 * scale, color: '#555555', fontFamily: 'JetBrains Mono' }}>swipe →</span>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  const v = (name: string, i: number) => values[name] || config.fields[i].default;

  return (
    <div className="flex flex-col w-full aspect-auto h-full rounded-lg" style={{ backgroundColor: CANADA_COLORS.bg, padding: '2rem 1.5rem' }}>
      <div className="flex items-center justify-between mb-4">
        <span className="inline-flex items-end font-bold text-sm">
          <span className="text-white">cali</span>
          <span style={{ color: CANADA_COLORS.violet }}>devs</span>
          <svg width={5} height={7} viewBox={FLAME_PATHS.viewBox} style={{ marginLeft: 1 }}>
            <path d={FLAME_PATHS.outer} fill={CANADA_COLORS.violet} />
            <path d={FLAME_PATHS.inner} fill={COLORS.white} />
            <path d={FLAME_PATHS.core} fill={COLORS.white} />
          </svg>
        </span>
        <span className="text-[10px] font-mono tracking-widest" style={{ color: '#666666' }}>{v('eyebrow', 0)}</span>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-3">
        <span className="text-sm text-white leading-relaxed">{v('block1', 1)}</span>
        <span className="text-sm text-white leading-relaxed">{v('block2', 2)}</span>
        <span className="text-base font-bold leading-relaxed" style={{ color: CANADA_COLORS.violet }}>{v('accent1', 3)}</span>
        <span className="text-sm text-white leading-relaxed">{v('block3', 4)}</span>
        <span className="text-sm text-white leading-relaxed">{v('block4', 5)}</span>
        <div className="flex flex-col mt-2">
          <span className="text-sm font-bold text-white">{v('closer', 6)}</span>
          <span className="text-base font-bold" style={{ color: CANADA_COLORS.violet }}>{v('accent2', 7)}</span>
        </div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="inline-flex items-end font-bold text-[10px]">
          <span className="text-white">cali</span>
          <span style={{ color: COLORS.ignite }}>devs</span>
          <svg width={3} height={4} viewBox={FLAME_PATHS.viewBox} style={{ marginLeft: 1 }}>
            <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
            <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
            <path d={FLAME_PATHS.core} fill={COLORS.sand} />
          </svg>
        </span>
        <span className="text-[10px] font-mono" style={{ color: '#555555' }}>swipe →</span>
      </div>
    </div>
  );
}
