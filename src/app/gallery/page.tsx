'use client';

import Link from 'next/link';
import { GALLERY_ITEMS } from '@/lib/brand/gallery-items';

const CATEGORY_COLORS: Record<string, string> = {
  brand: 'text-ignite',
  logo: 'text-amber',
  collateral: 'text-muted',
};

export default function GalleryPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-2 font-serif text-3xl">Brand Gallery</h1>
      <p className="mb-10 text-muted">All brand identity files in one place.</p>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {GALLERY_ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <Link
              key={item.slug}
              href={`/gallery/${item.slug}`}
              className="group flex flex-col rounded-2xl border border-border bg-surface p-6 transition-all hover:border-ignite/30 hover:shadow-lg hover:shadow-ignite/5"
            >
              <div className={`mb-3 ${CATEGORY_COLORS[item.category]}`}>
                <Icon size={28} strokeWidth={1.5} />
              </div>
              <h2 className="mb-1 text-lg font-bold group-hover:text-ignite transition-colors">
                {item.title}
              </h2>
              <p className="mb-4 text-sm text-muted leading-relaxed">{item.description}</p>
              <span className="mt-auto inline-flex items-center text-xs font-medium uppercase tracking-wider text-muted">
                <span className="rounded-full bg-border px-2 py-0.5">{item.category}</span>
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
