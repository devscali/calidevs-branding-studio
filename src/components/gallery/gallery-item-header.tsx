'use client';

import Link from 'next/link';
import { GALLERY_ITEMS } from '@/lib/brand/gallery-items';

interface Props {
  slug: string;
}

export function GalleryItemHeader({ slug }: Props) {
  const item = GALLERY_ITEMS.find((i) => i.slug === slug);
  if (!item) return null;

  const currentIndex = GALLERY_ITEMS.findIndex((i) => i.slug === slug);
  const prev = currentIndex > 0 ? GALLERY_ITEMS[currentIndex - 1] : null;
  const next = currentIndex < GALLERY_ITEMS.length - 1 ? GALLERY_ITEMS[currentIndex + 1] : null;
  const Icon = item.icon;

  return (
    <div className="flex items-center justify-between border-b border-border px-6 py-3">
      <div className="flex items-center gap-4">
        <Link href="/gallery" className="text-sm text-muted hover:text-foreground transition-colors">
          ← Gallery
        </Link>
        <span className="text-border">/</span>
        <div className="flex items-center gap-2">
          <Icon size={16} strokeWidth={1.5} className="text-ignite" />
          <h1 className="text-sm font-bold">{item.title}</h1>
        </div>
      </div>
      <div className="flex items-center gap-2">
        {prev && (
          <Link href={`/gallery/${prev.slug}`} className="rounded-lg border border-border px-3 py-1 text-xs text-muted hover:text-foreground transition-colors">
            ← {prev.title}
          </Link>
        )}
        {next && (
          <Link href={`/gallery/${next.slug}`} className="rounded-lg border border-border px-3 py-1 text-xs text-muted hover:text-foreground transition-colors">
            {next.title} →
          </Link>
        )}
      </div>
    </div>
  );
}
