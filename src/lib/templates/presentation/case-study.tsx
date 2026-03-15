import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'presentation-case-study',
  name: 'Case Study',
  category: 'presentation',
  description: 'Showcase a client project with results and testimonials.',
  fields: [
    { name: 'clientName', label: 'Client Name', type: 'text', default: 'TechFlow', placeholder: 'Client name' },
    { name: 'industry', label: 'Industry', type: 'text', default: 'SaaS', placeholder: 'Client industry' },
    { name: 'challenge', label: 'Challenge', type: 'textarea', default: 'Needed a complete brand identity that would stand out in the competitive SaaS market.', placeholder: 'Describe the challenge' },
    { name: 'solution', label: 'Solution', type: 'textarea', default: 'Designed a modern, bold brand system with custom illustrations and a comprehensive style guide.', placeholder: 'Describe the solution' },
    { name: 'result', label: 'Key Result', type: 'text', default: '340% increase in brand recognition', placeholder: 'Primary metric' },
    { name: 'testimonial', label: 'Testimonial', type: 'textarea', default: 'calidevs transformed our brand. The attention to detail was extraordinary.', placeholder: 'Client quote' },
  ],
  defaultSize: 'og',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1200;
  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: COLORS.charcoal, padding: 80 * scale }}>
      <div style={{ display: 'flex', flex: 1, flexDirection: 'column' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 48 * scale }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12 * scale }}>
            <svg width={24 * scale} height={30 * scale} viewBox={FLAME_PATHS.viewBox}>
              <path d={FLAME_PATHS.outer} fill={COLORS.ignite} />
              <path d={FLAME_PATHS.inner} fill={COLORS.amber} />
              <path d={FLAME_PATHS.core} fill={COLORS.sand} />
            </svg>
            <span style={{ fontSize: 16 * scale, color: COLORS.muted, fontFamily: 'Plus Jakarta Sans', fontWeight: 700 }}>calidevs</span>
          </div>
          <span style={{ fontSize: 12 * scale, color: COLORS.ignite, fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: 3 }}>Case Study</span>
        </div>

        {/* Client + result */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 36 * scale }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <span style={{ fontSize: 40 * scale, color: COLORS.white, fontFamily: 'DM Serif Display', lineHeight: 1.1 }}>
              {values.clientName || config.fields[0].default}
            </span>
            <span style={{ fontSize: 16 * scale, color: COLORS.muted, fontFamily: 'JetBrains Mono', marginTop: 8 * scale }}>
              {values.industry || config.fields[1].default}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
            <span style={{ fontSize: 10 * scale, color: COLORS.muted, fontFamily: 'JetBrains Mono', textTransform: 'uppercase' }}>Key Result</span>
            <span style={{ fontSize: 22 * scale, color: COLORS.amber, fontFamily: 'Plus Jakarta Sans', fontWeight: 700, marginTop: 4 * scale }}>
              {values.result || config.fields[4].default}
            </span>
          </div>
        </div>

        {/* Challenge + Solution */}
        <div style={{ display: 'flex', gap: 40 * scale, flex: 1 }}>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ width: 40 * scale, height: 3, backgroundColor: COLORS.ignite, marginBottom: 12 * scale }} />
            <span style={{ fontSize: 11 * scale, color: COLORS.ignite, fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 * scale }}>Challenge</span>
            <span style={{ fontSize: 15 * scale, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.6 }}>
              {values.challenge || config.fields[2].default}
            </span>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', flex: 1 }}>
            <div style={{ width: 40 * scale, height: 3, backgroundColor: COLORS.amber, marginBottom: 12 * scale }} />
            <span style={{ fontSize: 11 * scale, color: COLORS.amber, fontFamily: 'JetBrains Mono', textTransform: 'uppercase', letterSpacing: 2, marginBottom: 8 * scale }}>Solution</span>
            <span style={{ fontSize: 15 * scale, color: COLORS.white, fontFamily: 'Plus Jakarta Sans', lineHeight: 1.6 }}>
              {values.solution || config.fields[3].default}
            </span>
          </div>
        </div>

        {/* Testimonial */}
        <div style={{ display: 'flex', marginTop: 36 * scale, padding: 20 * scale, backgroundColor: 'rgba(255,255,255,0.03)', borderRadius: 12 * scale }}>
          <span style={{ fontSize: 28 * scale, color: COLORS.ignite, fontFamily: 'DM Serif Display', marginRight: 12 * scale }}>&ldquo;</span>
          <span style={{ fontSize: 14 * scale, color: COLORS.muted, fontFamily: 'DM Serif Display', lineHeight: 1.5, fontStyle: 'italic' }}>
            {values.testimonial || config.fields[5].default}
          </span>
        </div>
      </div>
    </div>
  );
}

export function PreviewTemplate({ values }: { values: TemplateValues }) {
  return (
    <div className="flex flex-col h-full bg-charcoal rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-muted font-bold">calidevs</span>
        <span className="text-[9px] text-ignite font-mono uppercase tracking-widest">Case Study</span>
      </div>
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl text-white font-serif leading-tight">{values.clientName || config.fields[0].default}</h1>
          <p className="text-xs text-muted font-mono">{values.industry || config.fields[1].default}</p>
        </div>
        <div className="text-right">
          <p className="text-[8px] text-muted font-mono uppercase">Result</p>
          <p className="text-sm text-amber font-bold">{values.result || config.fields[4].default}</p>
        </div>
      </div>
      <div className="flex gap-4 flex-1">
        <div className="flex-1">
          <div className="w-6 h-0.5 bg-ignite mb-1" />
          <p className="text-[8px] text-ignite font-mono uppercase mb-1">Challenge</p>
          <p className="text-[10px] text-white leading-relaxed">{values.challenge || config.fields[2].default}</p>
        </div>
        <div className="flex-1">
          <div className="w-6 h-0.5 bg-amber mb-1" />
          <p className="text-[8px] text-amber font-mono uppercase mb-1">Solution</p>
          <p className="text-[10px] text-white leading-relaxed">{values.solution || config.fields[3].default}</p>
        </div>
      </div>
      <div className="mt-3 bg-white/[0.03] rounded-lg p-3">
        <p className="text-[10px] text-muted font-serif italic">
          &ldquo;{values.testimonial || config.fields[5].default}&rdquo;
        </p>
      </div>
    </div>
  );
}
