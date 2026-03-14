// ═══════════════════════════════════════════════════════════════
// BOLD BLAZE (Proposal D) — ALWAYS 3 layers, NEVER a dot "."
// NON-NEGOTIABLE: This is the only flame component
// ═══════════════════════════════════════════════════════════════

import { FLAME_PATHS, COLORS } from './constants';

interface BoldBlazeProps {
  size?: number;
  outerColor?: string;
  innerColor?: string;
  coreColor?: string;
  className?: string;
}

export function BoldBlaze({
  size = 76,
  outerColor = COLORS.ignite,
  innerColor = COLORS.amber,
  coreColor = COLORS.sand,
  className = '',
}: BoldBlazeProps) {
  const scale = size / 76;
  const width = 60 * scale;

  return (
    <svg
      width={width}
      height={size}
      viewBox={FLAME_PATHS.viewBox}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="calidevs flame"
    >
      <path d={FLAME_PATHS.outer} fill={outerColor} />
      <path d={FLAME_PATHS.inner} fill={innerColor} />
      <path d={FLAME_PATHS.core} fill={coreColor} />
    </svg>
  );
}

// Satori-compatible version (uses style objects, no className)
export function BoldBlazeSatori({
  size = 76,
  outerColor = COLORS.ignite,
  innerColor = COLORS.amber,
  coreColor = COLORS.sand,
}: Omit<BoldBlazeProps, 'className'>) {
  const scale = size / 76;
  const width = 60 * scale;

  return (
    <svg
      width={width}
      height={size}
      viewBox={FLAME_PATHS.viewBox}
      style={{ display: 'flex' }}
    >
      <path d={FLAME_PATHS.outer} fill={outerColor} />
      <path d={FLAME_PATHS.inner} fill={innerColor} />
      <path d={FLAME_PATHS.core} fill={coreColor} />
    </svg>
  );
}
