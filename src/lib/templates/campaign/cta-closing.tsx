import { COLORS, FLAME_PATHS, CANADA_COLORS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'campaign-cta',
  name: 'Canada — CTA Slide',
  category: 'campaign',
  description: 'Closing slide with CTA — book a call, link in bio.',
  fields: [
    { name: 'headline', label: 'Headline', type: 'text', default: 'Ready to scale your business?', placeholder: 'Main question' },
    { name: 'sub', label: 'Subtitle', type: 'text', default: 'Get your entire digital operation for one flat rate.', placeholder: 'Supporting line' },
    { name: 'price', label: 'Price', type: 'text', default: '$1,200 USD / month', placeholder: 'Price' },
    { name: 'cta', label: 'CTA Button', type: 'text', default: 'Book Your Free Strategy Call', placeholder: 'CTA text' },
    { name: 'footer', label: 'Footer', type: 'text', default: 'biz@calidevs.com · calidevs.com', placeholder: 'Contact info' },
  ],
  defaultSize: 'ig-story',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  const v = (name: string, i: number) => values[name] || config.fields[i].default;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: CANADA_COLORS.bg, padding: `${120 * scale}px ${80 * scale}px` }}>
      {/* Large flame centered */}
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <svg width={80 * scale} height={100 * scale} viewBox={FLAME_PATHS.viewBox} style={{ marginBottom: 60 * scale }}>
          <path d={FLAME_PATHS.outer} fill={CANADA_COLORS.violet} />
          <path d={FLAME_PATHS.inner} fill="#c4b5fd" />
          <path d={FLAME_PATHS.core} fill={COLORS.white} />
        </svg>

        {/* Wordmark large */}
        <div style={{ display: 'flex', alignItems: 'baseline', marginBottom: 60 * scale }}>
          <span style={{ display: 'flex', alignItems: 'baseline', fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 48 * scale }}>
            <span style={{ color: COLORS.white }}>cali</span>
            <span style={{ color: CANADA_COLORS.violet }}>de</span>
            <span style={{ display: 'flex', alignItems: 'baseline' }}>
              <svg width={30 * scale} height={38 * scale} viewBox={FLAME_PATHS.viewBox}>
                <path d={FLAME_PATHS.outer} fill={CANADA_COLORS.violet} />
                <path d={FLAME_PATHS.inner} fill={COLORS.white} />
                <path d={FLAME_PATHS.core} fill={COLORS.white} />
              </svg>
            </span>
            <span style={{ color: CANADA_COLORS.violet }}>s</span>
          </span>
        </div>

        <span style={{ fontSize: 40 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', textAlign: 'center', lineHeight: 1.3, marginBottom: 16 * scale }}>
          {v('headline', 0)}
        </span>
        <span style={{ fontSize: 22 * scale, color: '#999999', fontFamily: 'Plus Jakarta Sans', textAlign: 'center', marginBottom: 40 * scale }}>
          {v('sub', 1)}
        </span>

        {/* Price badge */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#1a1a1c', borderRadius: 16 * scale, padding: `${16 * scale}px ${40 * scale}px`, marginBottom: 32 * scale, border: `1px solid ${CANADA_COLORS.violet}33` }}>
          <span style={{ fontSize: 28 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans' }}>
            {v('price', 2)}
          </span>
        </div>

        {/* CTA button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: CANADA_COLORS.violet, borderRadius: 16 * scale, padding: `${20 * scale}px ${60 * scale}px` }}>
          <span style={{ fontSize: 24 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans' }}>
            {v('cta', 3)}
          </span>
        </div>
      </div>

      {/* Footer */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: 16 * scale, color: '#555555', fontFamily: 'JetBrains Mono' }}>
          {v('footer', 4)}
        </span>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  const v = (name: string, i: number) => values[name] || config.fields[i].default;

  return (
    <div className="flex flex-col w-full aspect-auto h-full rounded-lg items-center justify-center" style={{ backgroundColor: CANADA_COLORS.bg, padding: '2rem 1.5rem' }}>
      <div className="flex-1 flex flex-col justify-center items-center text-center">
        <svg width={40} height={50} viewBox={FLAME_PATHS.viewBox} className="mb-4">
          <path d={FLAME_PATHS.outer} fill={CANADA_COLORS.violet} />
          <path d={FLAME_PATHS.inner} fill="#c4b5fd" />
          <path d={FLAME_PATHS.core} fill={COLORS.white} />
        </svg>
        {/* Large wordmark */}
        <span className="inline-flex items-baseline font-bold text-2xl mb-6">
          <span className="text-white">cali</span>
          <span style={{ color: CANADA_COLORS.violet }}>de</span>
          <svg width={16} height={20} viewBox={FLAME_PATHS.viewBox}>
            <path d={FLAME_PATHS.outer} fill={CANADA_COLORS.violet} />
            <path d={FLAME_PATHS.inner} fill={COLORS.white} />
            <path d={FLAME_PATHS.core} fill={COLORS.white} />
          </svg>
          <span style={{ color: CANADA_COLORS.violet }}>s</span>
        </span>
        <span className="text-lg font-bold text-white leading-snug mb-1">{v('headline', 0)}</span>
        <span className="text-[10px] mb-4" style={{ color: '#999999' }}>{v('sub', 1)}</span>
        <div className="px-4 py-1.5 rounded-lg mb-2 border" style={{ backgroundColor: '#1a1a1c', borderColor: `${CANADA_COLORS.violet}33` }}>
          <span className="text-sm font-bold text-white">{v('price', 2)}</span>
        </div>
        <div className="w-full py-2 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: CANADA_COLORS.violet }}>
          {v('cta', 3)}
        </div>
      </div>
      <span className="text-[9px] font-mono mt-4" style={{ color: '#555555' }}>{v('footer', 4)}</span>
    </div>
  );
}
