import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'presentation-pitch-deck',
  name: 'Sales Pitch Deck',
  category: 'presentation',
  description: 'Multi-page sales pitch presentation for client proposals.',
  fields: [
    { name: 'clientName', label: 'Client Name', type: 'text', default: 'Acme Corp', placeholder: 'Client company name' },
    { name: 'projectTitle', label: 'Project Title', type: 'text', default: 'Brand Identity Package', placeholder: 'Project name' },
    { name: 'subtitle', label: 'Subtitle', type: 'text', default: 'A comprehensive branding solution', placeholder: 'Subtitle' },
    { name: 'services', label: 'Services', type: 'textarea', default: 'Logo Design\nBrand Guidelines\nSocial Media Kit\nStationery Design', placeholder: 'One per line' },
    { name: 'price', label: 'Starting Price', type: 'text', default: '$2,500 CAD', placeholder: 'Price' },
    { name: 'timeline', label: 'Timeline', type: 'text', default: '4-6 weeks', placeholder: 'Delivery timeline' },
  ],
  defaultSize: 'og',
  pages: [
    // Page 1: Cover
    [
      { name: 'clientName', label: 'Client', type: 'text', default: 'Acme Corp' },
      { name: 'projectTitle', label: 'Project', type: 'text', default: 'Brand Identity Package' },
    ],
    // Page 2: Services
    [
      { name: 'services', label: 'Services', type: 'textarea', default: 'Logo Design\nBrand Guidelines\nSocial Media Kit' },
    ],
    // Page 3: Pricing
    [
      { name: 'price', label: 'Price', type: 'text', default: '$2,500 CAD' },
      { name: 'timeline', label: 'Timeline', type: 'text', default: '4-6 weeks' },
    ],
  ],
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1200;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: COLORS.charcoal, padding: 80 * scale }}>
      {/* Cover slide */}
      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 * scale, marginBottom: 40 * scale }}>
          <svg width={32 * scale} height={40 * scale} viewBox={FLAME_PATHS.viewBox}>
            <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
            <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
            <path d={FLAME_PATHS.core} fill={COLORS.sand} />
          </svg>
          <span style={{ fontSize: 18 * scale, color: COLORS.muted, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>calidevs</span>
        </div>
        <div style={{ fontSize: 14 * scale, color: COLORS.ignite, fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: 3, marginBottom: 12 * scale }}>
          Proposal for {values.clientName || config.fields[0].default}
        </div>
        <div style={{ fontSize: 48 * scale, color: COLORS.white, fontFamily: 'DM Serif Display', lineHeight: 1.2, marginBottom: 16 * scale }}>
          {values.projectTitle || config.fields[1].default}
        </div>
        <div style={{ fontSize: 20 * scale, color: COLORS.muted, fontFamily: 'Plus Jakarta Sans' }}>
          {values.subtitle || config.fields[2].default}
        </div>

        <div style={{ display: 'flex', gap: 24 * scale, marginTop: 60 * scale }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 * scale }}>
            <span style={{ fontSize: 11 * scale, color: COLORS.muted, fontFamily: 'JetBrains Mono', textTransform: 'uppercase' }}>Investment</span>
            <span style={{ fontSize: 24 * scale, color: COLORS.amber, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>
              {values.price || config.fields[4].default}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4 * scale }}>
            <span style={{ fontSize: 11 * scale, color: COLORS.muted, fontFamily: 'JetBrains Mono', textTransform: 'uppercase' }}>Timeline</span>
            <span style={{ fontSize: 24 * scale, color: COLORS.amber, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>
              {values.timeline || config.fields[5].default}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  return (
    <div className="flex flex-col h-full bg-charcoal rounded-lg p-8">
      <div className="flex-1 flex flex-col justify-center">
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xs text-muted font-bold">calidevs</span>
        </div>
        <p className="text-[10px] text-ignite font-mono uppercase tracking-widest mb-1">
          Proposal for {values.clientName || config.fields[0].default}
        </p>
        <h1 className="text-2xl text-white font-serif leading-tight mb-2">
          {values.projectTitle || config.fields[1].default}
        </h1>
        <p className="text-sm text-muted">
          {values.subtitle || config.fields[2].default}
        </p>
        <div className="flex gap-6 mt-6">
          <div>
            <p className="text-[9px] text-muted font-mono uppercase">Investment</p>
            <p className="text-lg text-amber font-bold">{values.price || config.fields[4].default}</p>
          </div>
          <div>
            <p className="text-[9px] text-muted font-mono uppercase">Timeline</p>
            <p className="text-lg text-amber font-bold">{values.timeline || config.fields[5].default}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
