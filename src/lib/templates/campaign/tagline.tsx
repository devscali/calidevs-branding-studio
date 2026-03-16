import { COLORS, FLAME_PATHS, CANADA_COLORS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'campaign-tagline',
  name: 'Canada — Tagline',
  category: 'campaign',
  description: 'Hero tagline: "Mexican work ethic. California quality. Canadian ambition."',
  fields: [
    { name: 'line1', label: 'Line 1', type: 'text', default: 'Mexican work ethic.', placeholder: 'First line' },
    { name: 'line2', label: 'Line 2', type: 'text', default: 'California quality.', placeholder: 'Second line' },
    { name: 'line3', label: 'Line 3 (accent)', type: 'text', default: 'Canadian ambition.', placeholder: 'Third line — in violet' },
    { name: 'attribution', label: 'Attribution', type: 'text', default: '— CaliDevs', placeholder: 'Attribution line' },
  ],
  defaultSize: 'ig-story',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  const v = (name: string, i: number) => values[name] || config.fields[i].default;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: CANADA_COLORS.bg, padding: `${120 * scale}px ${80 * scale}px` }}>
      {/* Wordmark top-left */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 40 * scale }}>
        <span style={{ display: 'flex', alignItems: 'flex-end', fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 22 * scale }}>
          <span style={{ color: COLORS.white }}>cali</span>
          <span style={{ color: CANADA_COLORS.violet }}>devs</span>
          <svg width={8 * scale} height={10 * scale} viewBox={FLAME_PATHS.viewBox} style={{ marginLeft: 1 * scale }}>
            <path d={FLAME_PATHS.outer} fill={CANADA_COLORS.violet} />
            <path d={FLAME_PATHS.inner} fill={COLORS.white} />
            <path d={FLAME_PATHS.core} fill={COLORS.white} />
          </svg>
        </span>
      </div>

      {/* Center tagline */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        {/* Decorative flame */}
        <svg width={60 * scale} height={76 * scale} viewBox={FLAME_PATHS.viewBox} style={{ marginBottom: 60 * scale }}>
          <path d={FLAME_PATHS.outer} fill={CANADA_COLORS.violet} />
          <path d={FLAME_PATHS.inner} fill="#c4b5fd" />
          <path d={FLAME_PATHS.core} fill={COLORS.white} />
        </svg>

        <span style={{ fontSize: 48 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.3, textAlign: 'center' }}>
          {v('line1', 0)}
        </span>
        <span style={{ fontSize: 48 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.3, textAlign: 'center', marginTop: 16 * scale }}>
          {v('line2', 1)}
        </span>
        <span style={{ fontSize: 52 * scale, fontWeight: 700, color: CANADA_COLORS.violet, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.3, textAlign: 'center', marginTop: 16 * scale }}>
          {v('line3', 2)}
        </span>
        <span style={{ fontSize: 22 * scale, color: '#666666', fontFamily: 'JetBrains Mono', marginTop: 40 * scale }}>
          {v('attribution', 3)}
        </span>
      </div>

      {/* Footer wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ display: 'flex', alignItems: 'flex-end', fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 18 * scale }}>
          <span style={{ color: COLORS.white }}>cali</span>
          <span style={{ color: COLORS.ignite }}>devs</span>
          <svg width={6 * scale} height={8 * scale} viewBox={FLAME_PATHS.viewBox} style={{ marginLeft: 1 * scale }}>
            <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
            <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
            <path d={FLAME_PATHS.core} fill={COLORS.sand} />
          </svg>
        </span>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  const v = (name: string, i: number) => values[name] || config.fields[i].default;

  return (
    <div className="flex flex-col w-full aspect-auto h-full rounded-lg items-center" style={{ backgroundColor: CANADA_COLORS.bg, padding: '2rem 1.5rem' }}>
      <div className="self-start mb-4">
        <span className="inline-flex items-end font-bold text-sm">
          <span className="text-white">cali</span>
          <span style={{ color: CANADA_COLORS.violet }}>devs</span>
          <svg width={5} height={7} viewBox={FLAME_PATHS.viewBox} style={{ marginLeft: 1 }}>
            <path d={FLAME_PATHS.outer} fill={CANADA_COLORS.violet} />
            <path d={FLAME_PATHS.inner} fill={COLORS.white} />
            <path d={FLAME_PATHS.core} fill={COLORS.white} />
          </svg>
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <svg width={30} height={38} viewBox={FLAME_PATHS.viewBox} className="mb-4">
          <path d={FLAME_PATHS.outer} fill={CANADA_COLORS.violet} />
          <path d={FLAME_PATHS.inner} fill="#c4b5fd" />
          <path d={FLAME_PATHS.core} fill={COLORS.white} />
        </svg>
        <span className="text-xl font-bold text-white leading-tight">{v('line1', 0)}</span>
        <span className="text-xl font-bold text-white leading-tight mt-1">{v('line2', 1)}</span>
        <span className="text-2xl font-bold leading-tight mt-1" style={{ color: CANADA_COLORS.violet }}>{v('line3', 2)}</span>
        <span className="text-[10px] font-mono mt-4" style={{ color: '#666666' }}>{v('attribution', 3)}</span>
      </div>
      <span className="inline-flex items-end font-bold text-[10px] mt-4">
        <span className="text-white">cali</span>
        <span style={{ color: COLORS.ignite }}>devs</span>
        <svg width={3} height={4} viewBox={FLAME_PATHS.viewBox} style={{ marginLeft: 1 }}>
          <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
          <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
          <path d={FLAME_PATHS.core} fill={COLORS.sand} />
        </svg>
      </span>
    </div>
  );
}
