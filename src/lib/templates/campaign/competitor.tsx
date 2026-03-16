import { COLORS, FLAME_PATHS, CANADA_COLORS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'campaign-competitor',
  name: 'Canada — Competitor Hook',
  category: 'campaign',
  description: 'Ad-style hook: "Your competitors just hired a tech team."',
  fields: [
    { name: 'hook', label: 'Hook Line', type: 'text', default: 'Your competitors just hired a tech team.', placeholder: 'Opening hook' },
    { name: 'response', label: 'Response (accent)', type: 'text', default: "You don't have to.", placeholder: 'Contrasting response' },
    { name: 'benefit1', label: 'Benefit 1', type: 'text', default: 'Professional website', placeholder: 'Benefit' },
    { name: 'benefit2', label: 'Benefit 2', type: 'text', default: 'AI chatbot — 24/7 support', placeholder: 'Benefit' },
    { name: 'benefit3', label: 'Benefit 3', type: 'text', default: 'CRM to manage every lead', placeholder: 'Benefit' },
    { name: 'benefit4', label: 'Benefit 4', type: 'text', default: 'SEO to rank on Google', placeholder: 'Benefit' },
    { name: 'benefit5', label: 'Benefit 5', type: 'text', default: 'Custom software for your workflow', placeholder: 'Benefit' },
    { name: 'price', label: 'Price Line', type: 'text', default: 'All for $1,200/month.', placeholder: 'Closing price' },
    { name: 'cta', label: 'CTA', type: 'text', default: 'Book a Free Strategy Call', placeholder: 'Call to action' },
  ],
  defaultSize: 'ig-story',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  const v = (name: string, i: number) => values[name] || config.fields[i].default;
  const benefits = [v('benefit1', 2), v('benefit2', 3), v('benefit3', 4), v('benefit4', 5), v('benefit5', 6)];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: CANADA_COLORS.bg, padding: `${120 * scale}px ${80 * scale}px` }}>
      {/* Wordmark top */}
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: 60 * scale }}>
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

      {/* Hook */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
        <span style={{ fontSize: 44 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.3, marginBottom: 16 * scale }}>
          {v('hook', 0)}
        </span>
        <span style={{ fontSize: 44 * scale, fontWeight: 700, color: CANADA_COLORS.violet, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.3, marginBottom: 60 * scale }}>
          {v('response', 1)}
        </span>

        {/* Benefits */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 * scale, marginBottom: 60 * scale }}>
          {benefits.map((b, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12 * scale }}>
              <span style={{ color: CANADA_COLORS.violet, fontSize: 24 * scale, fontFamily: 'JetBrains Mono' }}>+</span>
              <span style={{ color: COLORS.white, fontSize: 24 * scale, fontFamily: 'Plus Jakarta Sans' }}>{b}</span>
            </div>
          ))}
        </div>

        {/* Price */}
        <span style={{ fontSize: 32 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', marginBottom: 16 * scale }}>
          {v('price', 7)}
        </span>
      </div>

      {/* CTA + Footer */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 * scale }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: CANADA_COLORS.violet, borderRadius: 12 * scale, padding: `${16 * scale}px ${32 * scale}px` }}>
          <span style={{ fontSize: 22 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans' }}>
            {v('cta', 8)}
          </span>
        </div>
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
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  const v = (name: string, i: number) => values[name] || config.fields[i].default;
  const benefits = [v('benefit1', 2), v('benefit2', 3), v('benefit3', 4), v('benefit4', 5), v('benefit5', 6)];

  return (
    <div className="flex flex-col w-full aspect-auto h-full rounded-lg" style={{ backgroundColor: CANADA_COLORS.bg, padding: '2rem 1.5rem' }}>
      <div className="flex items-baseline mb-4">
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
      <div className="flex-1 flex flex-col justify-center">
        <span className="text-lg font-bold text-white leading-snug">{v('hook', 0)}</span>
        <span className="text-lg font-bold leading-snug mb-4" style={{ color: CANADA_COLORS.violet }}>{v('response', 1)}</span>
        <div className="flex flex-col gap-1.5 mb-4">
          {benefits.map((b, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <span className="text-xs font-mono" style={{ color: CANADA_COLORS.violet }}>+</span>
              <span className="text-xs text-white">{b}</span>
            </div>
          ))}
        </div>
        <span className="text-sm font-bold text-white">{v('price', 7)}</span>
      </div>
      <div className="flex flex-col items-center gap-2 mt-4">
        <div className="w-full text-center py-2 rounded-lg text-xs font-bold text-white" style={{ backgroundColor: CANADA_COLORS.violet }}>
          {v('cta', 8)}
        </div>
        <span className="inline-flex items-end font-bold text-[10px]">
          <span className="text-white">cali</span>
          <span style={{ color: COLORS.ignite }}>devs</span>
          <svg width={3} height={4} viewBox={FLAME_PATHS.viewBox} style={{ marginLeft: 1 }}>
            <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
            <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
            <path d={FLAME_PATHS.core} fill={COLORS.sand} />
          </svg>
        </span>
      </div>
    </div>
  );
}
