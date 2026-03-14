import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'dev-review',
  name: 'Code Review',
  category: 'dev',
  description: 'Share a client testimonial styled as a code review comment.',
  fields: [
    { name: 'reviewer', label: 'Reviewer Name', type: 'text', default: 'Ashley M.', placeholder: 'Client name' },
    { name: 'comment', label: 'Review Comment', type: 'textarea', default: 'Incredible work on the Shopify store. The load time went from 8s to under 2s. Highly recommend!', placeholder: 'Their words' },
    { name: 'status', label: 'Review Status', type: 'select', default: 'Approved', options: ['Approved', 'Changes Requested', 'Comment'] },
  ],
  defaultSize: 'ig-square',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  const status = values.status || config.fields[2].default;
  const statusColor = status === 'Approved' ? '#28c840' : status === 'Changes Requested' ? COLORS.amber : COLORS.muted;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: COLORS.charcoal, padding: 100 * scale }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 * scale, marginBottom: 60 * scale }}>
        <svg width={32 * scale} height={40 * scale} viewBox={FLAME_PATHS.viewBox}>
          <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
          <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
          <path d={FLAME_PATHS.core} fill={COLORS.sand} />
        </svg>
        <span style={{ fontSize: 20 * scale, color: COLORS.muted, fontFamily: 'JetBrains Mono' }}>Pull Request Review</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 * scale, marginBottom: 24 * scale }}>
          <div style={{ width: 48 * scale, height: 48 * scale, borderRadius: '50%', backgroundColor: COLORS.ignite, display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: 22 * scale, color: COLORS.white }}>
            {(values.reviewer || config.fields[0].default).charAt(0).toUpperCase()}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 26 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans' }}>
              {values.reviewer || config.fields[0].default}
            </span>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 * scale }}>
              <div style={{ width: 10 * scale, height: 10 * scale, borderRadius: '50%', backgroundColor: statusColor }} />
              <span style={{ fontSize: 16 * scale, color: statusColor, fontFamily: 'JetBrains Mono' }}>{status}</span>
            </div>
          </div>
        </div>

        <div style={{ backgroundColor: '#1a1a1c', borderRadius: 16 * scale, padding: 40 * scale, borderLeft: `4px solid ${statusColor}` }}>
          <div style={{ fontSize: 30 * scale, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.6 }}>
            &ldquo;{values.comment || config.fields[1].default}&rdquo;
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span style={{ fontSize: 20 * scale, color: COLORS.muted, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>calidevs</span>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  const status = values.status || config.fields[2].default;
  const statusColor = status === 'Approved' ? '#28c840' : status === 'Changes Requested' ? '#F5A623' : '#888888';

  return (
    <div className="flex flex-col w-full aspect-square bg-charcoal p-8 rounded-lg">
      <div className="font-mono text-xs text-muted mb-6">Pull Request Review</div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-ignite flex items-center justify-center text-white text-sm font-bold">
            {(values.reviewer || config.fields[0].default).charAt(0).toUpperCase()}
          </div>
          <div>
            <div className="text-white text-sm font-bold">{values.reviewer || config.fields[0].default}</div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full" style={{ backgroundColor: statusColor }} />
              <span className="font-mono text-xs" style={{ color: statusColor }}>{status}</span>
            </div>
          </div>
        </div>
        <div className="bg-surface rounded-lg p-4 border-l-2" style={{ borderColor: statusColor }}>
          <p className="text-white text-sm leading-relaxed">&ldquo;{values.comment || config.fields[1].default}&rdquo;</p>
        </div>
      </div>
      <div className="text-right text-muted text-xs font-bold mt-4">calidevs</div>
    </div>
  );
}
