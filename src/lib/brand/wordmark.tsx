import { WORDMARK_COLORS, type WordmarkVariant } from './constants';
import { BoldBlaze, BoldBlazeSatori } from './flame';

interface WordmarkProps {
  variant?: WordmarkVariant;
  size?: number;
  className?: string;
}

export function Wordmark({ variant = 'on-dark', size = 32, className = '' }: WordmarkProps) {
  const colors = WORDMARK_COLORS[variant];
  const flameSize = size * 0.75;

  return (
    <span className={`inline-flex items-baseline font-sans font-bold ${className}`} style={{ fontSize: size }}>
      <span style={{ color: colors.cali }}>cali</span>
      <span style={{ color: colors.devs }}>de</span>
      <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
        <BoldBlaze
          size={flameSize}
          outerColor={colors.flame.outer}
          innerColor={colors.flame.inner}
          coreColor={colors.flame.core}
          className="relative"
        />
      </span>
      <span style={{ color: colors.devs }}>s</span>
    </span>
  );
}

// Satori-compatible wordmark (no className, uses style objects only)
export function WordmarkSatori({ variant = 'on-dark', size = 32 }: Omit<WordmarkProps, 'className'>) {
  const colors = WORDMARK_COLORS[variant];
  const flameSize = size * 0.75;

  return (
    <span style={{ display: 'flex', alignItems: 'baseline', fontFamily: 'Plus Jakarta Sans', fontWeight: 700, fontSize: size }}>
      <span style={{ color: colors.cali }}>cali</span>
      <span style={{ color: colors.devs }}>de</span>
      <span style={{ display: 'flex', alignItems: 'baseline' }}>
        <BoldBlazeSatori
          size={flameSize}
          outerColor={colors.flame.outer}
          innerColor={colors.flame.inner}
          coreColor={colors.flame.core}
        />
      </span>
      <span style={{ color: colors.devs }}>s</span>
    </span>
  );
}
