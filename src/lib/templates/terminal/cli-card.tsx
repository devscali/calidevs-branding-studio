import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'terminal-cli-card',
  name: 'CLI Card',
  category: 'terminal',
  description: 'Personal dev card with command-line interface aesthetic.',
  fields: [
    { name: 'name', label: 'Name', type: 'text', default: 'calidevs', placeholder: 'Your name' },
    { name: 'role', label: 'Role', type: 'text', default: 'Full-Stack Developer', placeholder: 'Your role' },
    { name: 'stack', label: 'Stack', type: 'text', default: 'Next.js · Shopify · WordPress', placeholder: 'Your stack' },
    { name: 'tagline', label: 'Tagline', type: 'text', default: 'Build fast, ship smart, sleep well.', placeholder: 'Your tagline' },
  ],
  defaultSize: 'ig-square',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: COLORS.charcoal, padding: 80 * scale, fontFamily: 'JetBrains Mono' }}>
      <div style={{ display: 'flex', gap: 8 * scale, marginBottom: 60 * scale }}>
        <div style={{ width: 14 * scale, height: 14 * scale, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
        <div style={{ width: 14 * scale, height: 14 * scale, borderRadius: '50%', backgroundColor: '#febc2e' }} />
        <div style={{ width: 14 * scale, height: 14 * scale, borderRadius: '50%', backgroundColor: '#28c840' }} />
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 20 * scale }}>
        <div style={{ display: 'flex', fontSize: 20 * scale, color: COLORS.muted }}>$ npx {values.name || config.fields[0].default}</div>
        <div style={{ display: 'flex', marginTop: 20 * scale, marginBottom: 8 * scale }}>
          <svg width={48 * scale} height={60 * scale} viewBox={FLAME_PATHS.viewBox}>
            <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
            <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
            <path d={FLAME_PATHS.core} fill={COLORS.sand} />
          </svg>
        </div>
        <div style={{ fontSize: 52 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans' }}>
          {values.name || config.fields[0].default}
        </div>
        <div style={{ fontSize: 28 * scale, color: COLORS.ignite, fontFamily: 'Plus Jakarta Sans' }}>
          {values.role || config.fields[1].default}
        </div>
        <div style={{ fontSize: 22 * scale, color: COLORS.muted, marginTop: 16 * scale }}>
          {values.stack || config.fields[2].default}
        </div>
        <div style={{ fontSize: 24 * scale, color: COLORS.amber, fontFamily: 'Kalam', marginTop: 20 * scale }}>
          &quot;{values.tagline || config.fields[3].default}&quot;
        </div>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  return (
    <div className="flex flex-col w-full aspect-square bg-charcoal p-8 font-mono text-sm rounded-lg">
      <div className="flex gap-1.5 mb-6">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="flex-1 flex flex-col justify-center gap-2">
        <div className="text-muted text-xs">$ npx {values.name || config.fields[0].default}</div>
        <div className="text-2xl font-bold text-white font-sans mt-3">{values.name || config.fields[0].default}</div>
        <div className="text-ignite font-sans">{values.role || config.fields[1].default}</div>
        <div className="text-muted text-xs mt-2">{values.stack || config.fields[2].default}</div>
        <div className="text-amber text-sm mt-3 italic">&quot;{values.tagline || config.fields[3].default}&quot;</div>
      </div>
    </div>
  );
}
