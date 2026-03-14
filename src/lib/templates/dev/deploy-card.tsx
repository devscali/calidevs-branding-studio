import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'dev-deploy-card',
  name: 'Deploy Card',
  category: 'dev',
  description: 'Vercel-style deploy notification card.',
  fields: [
    { name: 'project', label: 'Project', type: 'text', default: 'branding.calidevs.com', placeholder: 'project.domain.com' },
    { name: 'env', label: 'Environment', type: 'select', default: 'Production', options: ['Production', 'Preview', 'Development'] },
    { name: 'commit', label: 'Commit Message', type: 'text', default: 'feat: add template editor', placeholder: 'Latest commit' },
    { name: 'duration', label: 'Build Duration', type: 'text', default: '32s', placeholder: 'Build time' },
  ],
  defaultSize: 'ig-square',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  const env = values.env || config.fields[1].default;
  const envColor = env === 'Production' ? '#28c840' : env === 'Preview' ? COLORS.amber : COLORS.muted;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: COLORS.charcoal, padding: 100 * scale }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 60 * scale }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 * scale }}>
          <svg width={32 * scale} height={40 * scale} viewBox={FLAME_PATHS.viewBox}>
            <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
            <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
            <path d={FLAME_PATHS.core} fill={COLORS.sand} />
          </svg>
          <span style={{ fontSize: 22 * scale, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>calidevs</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 * scale, backgroundColor: '#1a1a1c', padding: `${8 * scale}px ${16 * scale}px`, borderRadius: 20 * scale }}>
          <div style={{ width: 10 * scale, height: 10 * scale, borderRadius: '50%', backgroundColor: envColor }} />
          <span style={{ fontSize: 16 * scale, color: envColor, fontFamily: 'JetBrains Mono' }}>{env}</span>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', alignItems: 'center', gap: 32 * scale }}>
        <div style={{ fontSize: 28 * scale, color: '#28c840', fontFamily: 'JetBrains Mono' }}>
          ✓ Ready
        </div>
        <div style={{ fontSize: 48 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', textAlign: 'center' }}>
          {values.project || config.fields[0].default}
        </div>
        <div style={{ fontSize: 22 * scale, color: COLORS.muted, fontFamily: 'JetBrains Mono' }}>
          {values.commit || config.fields[2].default}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 32 * scale }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 * scale }}>
          <span style={{ fontSize: 16 * scale, color: COLORS.muted, fontFamily: 'JetBrains Mono' }}>Build:</span>
          <span style={{ fontSize: 16 * scale, color: COLORS.white, fontFamily: 'JetBrains Mono' }}>{values.duration || config.fields[3].default}</span>
        </div>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  const env = values.env || config.fields[1].default;
  const envColor = env === 'Production' ? '#28c840' : env === 'Preview' ? '#F5A623' : '#888888';

  return (
    <div className="flex flex-col w-full aspect-square bg-charcoal p-8 rounded-lg">
      <div className="flex items-center justify-between mb-6">
        <span className="text-white text-sm font-bold">calidevs</span>
        <div className="flex items-center gap-1 bg-surface px-2 py-0.5 rounded-full">
          <div className="w-2 h-2 rounded-full" style={{ backgroundColor: envColor }} />
          <span className="font-mono text-xs" style={{ color: envColor }}>{env}</span>
        </div>
      </div>
      <div className="flex-1 flex flex-col justify-center items-center gap-3 text-center">
        <div className="text-[#28c840] font-mono text-sm">✓ Ready</div>
        <div className="text-2xl font-bold text-white">{values.project || config.fields[0].default}</div>
        <div className="text-xs text-muted font-mono">{values.commit || config.fields[2].default}</div>
      </div>
      <div className="text-center text-muted text-xs font-mono mt-4">
        Build: {values.duration || config.fields[3].default}
      </div>
    </div>
  );
}
