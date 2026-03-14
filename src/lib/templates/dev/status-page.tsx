import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'dev-status',
  name: 'Status Page',
  category: 'dev',
  description: 'Show system status — all operational or incident update.',
  fields: [
    { name: 'status', label: 'Status', type: 'select', default: 'All Systems Operational', options: ['All Systems Operational', 'Partial Outage', 'Major Incident', 'Maintenance'] },
    { name: 'service1', label: 'Service 1', type: 'text', default: 'API', placeholder: 'Service name' },
    { name: 'service2', label: 'Service 2', type: 'text', default: 'Dashboard', placeholder: 'Service name' },
    { name: 'service3', label: 'Service 3', type: 'text', default: 'CDN', placeholder: 'Service name' },
  ],
  defaultSize: 'ig-square',
};

const STATUS_COLORS: Record<string, string> = {
  'All Systems Operational': '#28c840',
  'Partial Outage': COLORS.amber,
  'Major Incident': '#ff5f57',
  'Maintenance': COLORS.muted,
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  const status = values.status || config.fields[0].default;
  const statusColor = STATUS_COLORS[status] || '#28c840';
  const services = [
    values.service1 || config.fields[1].default,
    values.service2 || config.fields[2].default,
    values.service3 || config.fields[3].default,
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: COLORS.charcoal, padding: 100 * scale }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 * scale, marginBottom: 60 * scale }}>
        <svg width={32 * scale} height={40 * scale} viewBox={FLAME_PATHS.viewBox}>
          <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
          <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
          <path d={FLAME_PATHS.core} fill={COLORS.sand} />
        </svg>
        <span style={{ fontSize: 20 * scale, color: COLORS.muted, fontFamily: 'JetBrains Mono' }}>status.calidevs.com</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 40 * scale }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 * scale }}>
          <div style={{ width: 16 * scale, height: 16 * scale, borderRadius: '50%', backgroundColor: statusColor }} />
          <span style={{ fontSize: 40 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans' }}>
            {status}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 * scale, marginTop: 20 * scale }}>
          {services.map((svc, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: `${20 * scale}px ${24 * scale}px`, backgroundColor: '#1a1a1c', borderRadius: 12 * scale }}>
              <span style={{ fontSize: 24 * scale, color: COLORS.white, fontFamily: 'Plus Jakarta Sans' }}>{svc}</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 * scale }}>
                <div style={{ width: 10 * scale, height: 10 * scale, borderRadius: '50%', backgroundColor: statusColor }} />
                <span style={{ fontSize: 18 * scale, color: statusColor, fontFamily: 'JetBrains Mono' }}>
                  {status === 'All Systems Operational' ? 'up' : 'check'}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: 20 * scale, color: COLORS.muted, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>calidevs</span>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  const status = values.status || config.fields[0].default;
  const statusColor = STATUS_COLORS[status] || '#28c840';
  const services = [
    values.service1 || config.fields[1].default,
    values.service2 || config.fields[2].default,
    values.service3 || config.fields[3].default,
  ];

  return (
    <div className="flex flex-col w-full aspect-auto h-full bg-charcoal p-8 rounded-lg">
      <div className="font-mono text-xs text-muted mb-6">status.calidevs.com</div>
      <div className="flex-1 flex flex-col justify-center gap-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-3 h-3 rounded-full" style={{ backgroundColor: statusColor }} />
          <span className="text-xl font-bold text-white">{status}</span>
        </div>
        {services.map((svc, i) => (
          <div key={i} className="flex items-center justify-between bg-surface p-3 rounded-lg">
            <span className="text-white text-sm">{svc}</span>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor }} />
              <span className="font-mono text-xs" style={{ color: statusColor }}>
                {status === 'All Systems Operational' ? 'up' : 'check'}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="text-right text-muted text-xs font-bold mt-4">calidevs</div>
    </div>
  );
}
