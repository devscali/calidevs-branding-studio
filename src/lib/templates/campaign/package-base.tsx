import { COLORS, FLAME_PATHS, CANADA_COLORS, SERVICE_DOTS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

const SERVICES_5 = SERVICE_DOTS.slice(0, 5);

export const config: TemplateConfig = {
  id: 'campaign-package-base',
  name: 'Canada — Package',
  category: 'campaign',
  description: 'Story 02: 5 services with price — $1,200/mo.',
  fields: [
    { name: 'eyebrow', label: 'Eyebrow', type: 'text', default: 'FULL PACKAGE · $1,200 / MO', placeholder: 'Package label' },
    { name: 'svc1', label: 'Service 1', type: 'text', default: 'Website — Modern, fast & built to convert', placeholder: 'Service' },
    { name: 'svc2', label: 'Service 2', type: 'text', default: 'SEO — Rank on Google Canada monthly', placeholder: 'Service' },
    { name: 'svc3', label: 'Service 3', type: 'text', default: 'AI Chatbot — 24/7 leads, support & bookings', placeholder: 'Service' },
    { name: 'svc4', label: 'Service 4', type: 'text', default: 'CRM — Every lead & deal in one place', placeholder: 'Service' },
    { name: 'svc5', label: 'Service 5', type: 'text', default: 'Custom Software — Built for how you actually work', placeholder: 'Service' },
    { name: 'price', label: 'Price', type: 'text', default: '$1,200 USD / month', placeholder: 'Price line' },
    { name: 'closing', label: 'Closing Line', type: 'text', default: 'One team. One invoice. No surprises.', placeholder: 'Closing' },
  ],
  defaultSize: 'ig-story',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  const services = [
    values.svc1 || config.fields[1].default,
    values.svc2 || config.fields[2].default,
    values.svc3 || config.fields[3].default,
    values.svc4 || config.fields[4].default,
    values.svc5 || config.fields[5].default,
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: CANADA_COLORS.bg, padding: `${120 * scale}px ${80 * scale}px` }}>
      {/* Wordmark top */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 60 * scale }}>
        <span style={{ display: 'flex', alignItems: 'baseline', fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 22 * scale }}>
          <span style={{ color: COLORS.white }}>cali</span>
          <span style={{ color: CANADA_COLORS.violet }}>de</span>
          <span style={{ display: 'flex', alignItems: 'baseline' }}>
            <svg width={14 * scale} height={17 * scale} viewBox={FLAME_PATHS.viewBox}>
              <path d={FLAME_PATHS.outer} fill={CANADA_COLORS.violet} />
              <path d={FLAME_PATHS.inner} fill={COLORS.white} />
              <path d={FLAME_PATHS.core} fill={COLORS.white} />
            </svg>
          </span>
          <span style={{ color: CANADA_COLORS.violet }}>s</span>
        </span>
        <span style={{ fontSize: 14 * scale, color: CANADA_COLORS.violet, fontFamily: 'JetBrains Mono', letterSpacing: '0.05em' }}>
          {values.eyebrow || config.fields[0].default}
        </span>
      </div>

      {/* Services */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 36 * scale }}>
        {services.map((svc, i) => {
          const [name, desc] = svc.includes(' — ') ? svc.split(' — ') : [svc, ''];
          return (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 * scale }}>
              <div style={{ width: 12 * scale, height: 12 * scale, borderRadius: '50%', backgroundColor: SERVICES_5[i]?.color || COLORS.white, marginTop: 8 * scale, flexShrink: 0 }} />
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 * scale }}>
                <span style={{ fontSize: 28 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans' }}>{name}</span>
                {desc && <span style={{ fontSize: 20 * scale, color: '#888888', fontFamily: 'Plus Jakarta Sans' }}>{desc}</span>}
              </div>
            </div>
          );
        })}
      </div>

      {/* Price */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 * scale, marginTop: 60 * scale, marginBottom: 40 * scale }}>
        <span style={{ fontSize: 40 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans' }}>
          {values.price || config.fields[6].default}
        </span>
        <span style={{ fontSize: 18 * scale, color: '#888888', fontFamily: 'Plus Jakarta Sans' }}>
          {values.closing || config.fields[7].default}
        </span>
      </div>

      {/* Footer wordmark */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <span style={{ display: 'flex', alignItems: 'baseline', fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 18 * scale }}>
          <span style={{ color: COLORS.white }}>cali</span>
          <span style={{ color: COLORS.ignite }}>de</span>
          <span style={{ display: 'flex', alignItems: 'baseline' }}>
            <svg width={11 * scale} height={14 * scale} viewBox={FLAME_PATHS.viewBox}>
              <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
              <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
              <path d={FLAME_PATHS.core} fill={COLORS.sand} />
            </svg>
          </span>
          <span style={{ color: COLORS.ignite }}>s</span>
        </span>
        <span style={{ fontSize: 14 * scale, color: '#555555', fontFamily: 'JetBrains Mono' }}>calidevs.com</span>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  const services = [
    values.svc1 || config.fields[1].default,
    values.svc2 || config.fields[2].default,
    values.svc3 || config.fields[3].default,
    values.svc4 || config.fields[4].default,
    values.svc5 || config.fields[5].default,
  ];

  return (
    <div className="flex flex-col w-full aspect-auto h-full rounded-lg" style={{ backgroundColor: CANADA_COLORS.bg, padding: '2rem 1.5rem' }}>
      <div className="flex items-center justify-between mb-6">
        <span className="inline-flex items-baseline font-bold text-sm">
          <span className="text-white">cali</span>
          <span style={{ color: CANADA_COLORS.violet }}>de</span>
          <svg width={9} height={11} viewBox={FLAME_PATHS.viewBox}>
            <path d={FLAME_PATHS.outer} fill={CANADA_COLORS.violet} />
            <path d={FLAME_PATHS.inner} fill={COLORS.white} />
            <path d={FLAME_PATHS.core} fill={COLORS.white} />
          </svg>
          <span style={{ color: CANADA_COLORS.violet }}>s</span>
        </span>
        <span className="text-[8px] font-mono" style={{ color: CANADA_COLORS.violet }}>
          {values.eyebrow || config.fields[0].default}
        </span>
      </div>
      <div className="flex-1 flex flex-col justify-center gap-4">
        {services.map((svc, i) => {
          const [name, desc] = svc.includes(' — ') ? svc.split(' — ') : [svc, ''];
          return (
            <div key={i} className="flex items-start gap-2">
              <div className="w-2 h-2 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: SERVICES_5[i]?.color || COLORS.white }} />
              <div className="flex flex-col">
                <span className="text-sm font-bold text-white">{name}</span>
                {desc && <span className="text-[10px]" style={{ color: '#888888' }}>{desc}</span>}
              </div>
            </div>
          );
        })}
      </div>
      <div className="text-center mt-4">
        <div className="text-xl font-bold text-white">{values.price || config.fields[6].default}</div>
        <div className="text-[10px] mt-1" style={{ color: '#888888' }}>{values.closing || config.fields[7].default}</div>
      </div>
      <div className="flex items-center justify-between mt-4">
        <span className="inline-flex items-baseline font-bold text-[10px]">
          <span className="text-white">cali</span>
          <span style={{ color: COLORS.ignite }}>de</span>
          <svg width={6} height={8} viewBox={FLAME_PATHS.viewBox}>
            <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
            <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
            <path d={FLAME_PATHS.core} fill={COLORS.sand} />
          </svg>
          <span style={{ color: COLORS.ignite }}>s</span>
        </span>
        <span className="text-[10px] font-mono" style={{ color: '#555555' }}>calidevs.com</span>
      </div>
    </div>
  );
}
