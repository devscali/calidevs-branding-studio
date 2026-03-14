import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'terminal-deploy',
  name: 'Deploy Post',
  category: 'terminal',
  description: 'Celebrate a deployment or launch with terminal flair.',
  fields: [
    { name: 'project', label: 'Project Name', type: 'text', default: 'branding-studio', placeholder: 'project-name' },
    { name: 'version', label: 'Version', type: 'text', default: 'v1.0.0', placeholder: 'v1.0.0' },
    { name: 'message', label: 'Deploy Message', type: 'text', default: 'Successfully deployed to production 🚀', placeholder: 'Deploy message' },
    { name: 'tag', label: 'Tag', type: 'text', default: '#shipped', placeholder: '#hashtag' },
  ],
  defaultSize: 'ig-square',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: COLORS.charcoal, padding: 80 * scale, fontFamily: 'JetBrains Mono' }}>
      <div style={{ display: 'flex', gap: 8 * scale, marginBottom: 40 * scale }}>
        <div style={{ width: 14 * scale, height: 14 * scale, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
        <div style={{ width: 14 * scale, height: 14 * scale, borderRadius: '50%', backgroundColor: '#febc2e' }} />
        <div style={{ width: 14 * scale, height: 14 * scale, borderRadius: '50%', backgroundColor: '#28c840' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 16 * scale }}>
        <div style={{ fontSize: 22 * scale, color: COLORS.muted }}>
          $ vercel deploy --prod
        </div>
        <div style={{ fontSize: 22 * scale, color: '#28c840' }}>
          ✓ Deployed {values.project || config.fields[0].default}@{values.version || config.fields[1].default}
        </div>
        <div style={{ fontSize: 22 * scale, color: COLORS.muted, marginTop: 8 * scale }}>
          $ echo &quot;status&quot;
        </div>
        <div style={{ fontSize: 40 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', marginTop: 16 * scale }}>
          {values.message || config.fields[2].default}
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 * scale }}>
          <svg width={24 * scale} height={30 * scale} viewBox={FLAME_PATHS.viewBox}>
            <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
            <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
            <path d={FLAME_PATHS.core} fill={COLORS.sand} />
          </svg>
          <span style={{ fontSize: 20 * scale, color: COLORS.muted, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>calidevs</span>
        </div>
        <span style={{ fontSize: 18 * scale, color: COLORS.muted }}>{values.tag || config.fields[3].default}</span>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  return (
    <div className="flex flex-col w-full aspect-square bg-charcoal p-8 font-mono text-sm rounded-lg">
      <div className="flex gap-1.5 mb-4">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex-1 flex flex-col justify-center gap-2">
        <div className="text-muted">$ vercel deploy --prod</div>
        <div className="text-[#28c840]">✓ Deployed {values.project || config.fields[0].default}@{values.version || config.fields[1].default}</div>
        <div className="text-muted mt-2">$ echo &quot;status&quot;</div>
        <div className="text-xl font-bold text-white font-sans mt-2">{values.message || config.fields[2].default}</div>
      </div>
      <div className="flex items-center justify-between mt-4 text-muted text-xs">
        <span className="font-sans font-bold">calidevs</span>
        <span>{values.tag || config.fields[3].default}</span>
      </div>
    </div>
  );
}
