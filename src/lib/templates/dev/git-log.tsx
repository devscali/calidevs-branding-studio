import { COLORS, FLAME_PATHS } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues } from '../types';

export const config: TemplateConfig = {
  id: 'dev-git-log',
  name: 'Git Log',
  category: 'dev',
  description: 'Share progress as a stylized git log.',
  fields: [
    { name: 'commit1', label: 'Latest Commit', type: 'text', default: 'feat: launch branding studio', placeholder: 'Most recent' },
    { name: 'commit2', label: 'Previous Commit', type: 'text', default: 'fix: export pipeline optimized', placeholder: 'Second commit' },
    { name: 'commit3', label: 'Earlier Commit', type: 'text', default: 'chore: add 15 templates', placeholder: 'Third commit' },
    { name: 'branch', label: 'Branch', type: 'text', default: 'main', placeholder: 'Branch name' },
  ],
  defaultSize: 'ig-square',
};

export function SatoriTemplate({ values, width, height }: { values: TemplateValues; width: number; height: number }) {
  const scale = width / 1080;
  const commits = [
    values.commit1 || config.fields[0].default,
    values.commit2 || config.fields[1].default,
    values.commit3 || config.fields[2].default,
  ];
  const hashes = ['a3f9c2d', 'b7e1f0a', 'c4d8e3b'];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width, height, backgroundColor: COLORS.charcoal, padding: 80 * scale, fontFamily: 'JetBrains Mono' }}>
      <div style={{ display: 'flex', gap: 8 * scale, marginBottom: 40 * scale }}>
        <div style={{ width: 14 * scale, height: 14 * scale, borderRadius: '50%', backgroundColor: '#ff5f57' }} />
        <div style={{ width: 14 * scale, height: 14 * scale, borderRadius: '50%', backgroundColor: '#febc2e' }} />
        <div style={{ width: 14 * scale, height: 14 * scale, borderRadius: '50%', backgroundColor: '#28c840' }} />
      </div>

      <div style={{ display: 'flex', fontSize: 20 * scale, color: COLORS.muted, marginBottom: 40 * scale }}>
        $ git log --oneline {values.branch || config.fields[3].default}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', flex: 1, justifyContent: 'center', gap: 28 * scale }}>
        {commits.map((msg, i) => (
          <div key={i} style={{ display: 'flex', gap: 16 * scale, alignItems: 'flex-start' }}>
            <span style={{ color: COLORS.amber, fontSize: 22 * scale }}>{hashes[i]}</span>
            <span style={{ color: i === 0 ? COLORS.white : COLORS.muted, fontSize: 26 * scale, fontFamily: 'Plus Jakarta Sans' }}>{msg}</span>
          </div>
        ))}
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
  const commits = [
    values.commit1 || config.fields[0].default,
    values.commit2 || config.fields[1].default,
    values.commit3 || config.fields[2].default,
  ];
  const hashes = ['a3f9c2d', 'b7e1f0a', 'c4d8e3b'];

  return (
    <div className="flex flex-col w-full aspect-square bg-charcoal p-8 font-mono text-sm rounded-lg">
      <div className="flex gap-1.5 mb-4">
        <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
        <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
        <div className="w-3 h-3 rounded-full bg-[#28c840]" />
      </div>
      <div className="text-muted text-xs mb-4">$ git log --oneline {values.branch || config.fields[3].default}</div>
      <div className="flex-1 flex flex-col justify-center gap-3">
        {commits.map((msg, i) => (
          <div key={i} className="flex gap-2 items-start">
            <span className="text-amber text-xs">{hashes[i]}</span>
            <span className={`text-xs font-sans ${i === 0 ? 'text-white' : 'text-muted'}`}>{msg}</span>
          </div>
        ))}
      </div>
      <div className="text-muted text-xs font-sans font-bold mt-4">calidevs</div>
    </div>
  );
}
