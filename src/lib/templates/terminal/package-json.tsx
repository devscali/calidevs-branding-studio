import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'terminal-package',
  name: 'Package.json',
  category: 'terminal',
  description: 'Share your project as a stylized package.json card.',
  fields: [
    { name: 'name', label: 'Package Name', type: 'text', default: '@calidevs/studio', placeholder: '@scope/package' },
    { name: 'description', label: 'Description', type: 'text', default: 'Build fast, ship smart, sleep well.', placeholder: 'What it does' },
    { name: 'version', label: 'Version', type: 'text', default: '1.0.0', placeholder: '1.0.0' },
    { name: 'keywords', label: 'Keywords', type: 'text', default: 'nextjs, shopify, wordpress, branding', placeholder: 'comma, separated' },
  ],
  defaultSize: 'ig-square',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  const keywords = (values.keywords || config.fields[3].default).split(',').map(k => k.trim());

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: COLORS.charcoal, padding: 80 * scale, fontFamily: 'JetBrains Mono' }}>
      <div style={{ display: 'flex', gap: 8 * scale, marginBottom: 40 * scale }}>
        <div style={{ width: 14 * scale, height: 14 * scale, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
        <div style={{ width: 14 * scale, height: 14 * scale, borderRadius: '50%', backgroundColor: '#febc2e' }} />
        <div style={{ width: 14 * scale, height: 14 * scale, borderRadius: '50%', backgroundColor: '#28c840' }} />
      </div>

      <div style={{ display: 'flex', fontSize: 18 * scale, color: COLORS.muted, marginBottom: 24 * scale }}>package.json</div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 8 * scale, fontSize: 24 * scale }}>
        <div style={{ display: 'flex', color: COLORS.muted }}>{'{'}</div>
        <div style={{ display: 'flex', paddingLeft: 40 * scale }}>
          <span style={{ color: COLORS.ignite }}>&quot;name&quot;</span>
          <span style={{ color: COLORS.muted }}>: </span>
          <span style={{ color: '#4ade80' }}>&quot;{values.name || config.fields[0].default}&quot;</span>
          <span style={{ color: COLORS.muted }}>,</span>
        </div>
        <div style={{ display: 'flex', paddingLeft: 40 * scale }}>
          <span style={{ color: COLORS.ignite }}>&quot;version&quot;</span>
          <span style={{ color: COLORS.muted }}>: </span>
          <span style={{ color: '#4ade80' }}>&quot;{values.version || config.fields[2].default}&quot;</span>
          <span style={{ color: COLORS.muted }}>,</span>
        </div>
        <div style={{ display: 'flex', paddingLeft: 40 * scale, flexWrap: 'wrap' }}>
          <span style={{ color: COLORS.ignite }}>&quot;description&quot;</span>
          <span style={{ color: COLORS.muted }}>: </span>
          <span style={{ color: '#4ade80' }}>&quot;{values.description || config.fields[1].default}&quot;</span>
          <span style={{ color: COLORS.muted }}>,</span>
        </div>
        <div style={{ display: 'flex', paddingLeft: 40 * scale }}>
          <span style={{ color: COLORS.ignite }}>&quot;keywords&quot;</span>
          <span style={{ color: COLORS.muted }}>: [</span>
        </div>
        {keywords.map((kw, i) => (
          <div key={i} style={{ display: 'flex', paddingLeft: 80 * scale }}>
            <span style={{ color: COLORS.amber }}>&quot;{kw}&quot;</span>
            {i < keywords.length - 1 && <span style={{ color: COLORS.muted }}>,</span>}
          </div>
        ))}
        <div style={{ display: 'flex', paddingLeft: 40 * scale, color: COLORS.muted }}>]</div>
        <div style={{ display: 'flex', color: COLORS.muted }}>{'}'}</div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12 * scale }}>
        <svg width={24 * scale} height={30 * scale} viewBox={FLAME_PATHS.viewBox}>
          <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
          <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
          <path d={FLAME_PATHS.core} fill={COLORS.sand} />
        </svg>
        <span style={{ fontSize: 20 * scale, color: COLORS.muted, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>calidevs</span>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  const keywords = (values.keywords || config.fields[3].default).split(',').map(k => k.trim());
  return (
    <div className="flex flex-col w-full aspect-auto h-full bg-charcoal p-8 font-mono text-xs rounded-lg">
      <div className="flex gap-1.5 mb-4">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="text-muted mb-3">package.json</div>
      <div className="flex-1 flex flex-col justify-center leading-relaxed">
        <div className="text-muted">{'{'}</div>
        <div className="pl-4"><span className="text-ignite">&quot;name&quot;</span>: <span className="text-[#4ade80]">&quot;{values.name || config.fields[0].default}&quot;</span>,</div>
        <div className="pl-4"><span className="text-ignite">&quot;version&quot;</span>: <span className="text-[#4ade80]">&quot;{values.version || config.fields[2].default}&quot;</span>,</div>
        <div className="pl-4"><span className="text-ignite">&quot;description&quot;</span>: <span className="text-[#4ade80]">&quot;{values.description || config.fields[1].default}&quot;</span>,</div>
        <div className="pl-4"><span className="text-ignite">&quot;keywords&quot;</span>: [</div>
        {keywords.map((kw, i) => (
          <div key={i} className="pl-8"><span className="text-amber">&quot;{kw}&quot;</span>{i < keywords.length - 1 ? ',' : ''}</div>
        ))}
        <div className="pl-4 text-muted">]</div>
        <div className="text-muted">{'}'}</div>
      </div>
      <div className="text-muted text-xs font-sans font-bold mt-4">calidevs</div>
    </div>
  );
}
