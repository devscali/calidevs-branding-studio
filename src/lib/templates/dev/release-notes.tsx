import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'dev-release',
  name: 'Release Notes',
  category: 'dev',
  description: 'Announce a new version with changelog highlights.',
  fields: [
    { name: 'version', label: 'Version', type: 'text', default: 'v2.0.0', placeholder: 'v1.0.0' },
    { name: 'title', label: 'Release Name', type: 'text', default: 'Studio Edition', placeholder: 'Release name' },
    { name: 'features', label: 'Features (one per line)', type: 'textarea', default: 'Template editor with live preview\nExport to JPG, PNG, PDF\n15 brand-consistent templates', placeholder: 'Feature 1\nFeature 2\nFeature 3' },
  ],
  defaultSize: 'ig-square',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  const features = (values.features || config.fields[2].default).split('\n').filter(Boolean);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: COLORS.charcoal, padding: 100 * scale }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16 * scale, marginBottom: 60 * scale }}>
        <svg width={32 * scale} height={40 * scale} viewBox={FLAME_PATHS.viewBox}>
          <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
          <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
          <path d={FLAME_PATHS.core} fill={COLORS.sand} />
        </svg>
        <span style={{ fontSize: 20 * scale, color: COLORS.muted, fontFamily: 'JetBrains Mono' }}>Release Notes</span>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16 * scale, marginBottom: 16 * scale }}>
          <span style={{ fontSize: 56 * scale, fontWeight: 700, color: COLORS.white, fontFamily: 'Plus Jakarta Sans' }}>
            {values.version || config.fields[0].default}
          </span>
          <span style={{ fontSize: 28 * scale, color: COLORS.amber, fontFamily: 'Plus Jakarta Sans' }}>
            {values.title || config.fields[1].default}
          </span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 * scale, marginTop: 32 * scale }}>
          {features.map((feat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 16 * scale }}>
              <span style={{ color: COLORS.ignite, fontSize: 24 * scale, fontFamily: 'JetBrains Mono' }}>+</span>
              <span style={{ color: COLORS.white, fontSize: 26 * scale, fontFamily: 'Plus Jakarta Sans' }}>{feat}</span>
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
  const features = (values.features || config.fields[2].default).split('\n').filter(Boolean);

  return (
    <div className="flex flex-col w-full aspect-auto h-full bg-charcoal p-8 rounded-lg">
      <div className="font-mono text-xs text-muted mb-6">Release Notes</div>
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-baseline gap-2 mb-4">
          <span className="text-2xl font-bold text-white">{values.version || config.fields[0].default}</span>
          <span className="text-amber text-sm">{values.title || config.fields[1].default}</span>
        </div>
        <div className="space-y-2 mt-4">
          {features.map((feat, i) => (
            <div key={i} className="flex items-start gap-2">
              <span className="text-ignite font-mono text-xs">+</span>
              <span className="text-white text-sm">{feat}</span>
            </div>
          ))}
        </div>
      </div>
      <div className="text-right text-muted text-xs font-bold mt-4">calidevs</div>
    </div>
  );
}
