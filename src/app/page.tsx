import Link from 'next/link';
import { Images, Wand2, FolderOpen } from 'lucide-react';
import { Wordmark } from '@/lib/brand/wordmark';
import { BoldBlaze } from '@/lib/brand/flame';
import { TAGLINE } from '@/lib/brand/constants';

export default function Home() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-6">
      {/* Hero */}
      <div className="flex flex-col items-center gap-6 text-center">
        <BoldBlaze size={80} />
        <Wordmark variant="on-dark" size={48} />
        <p className="font-serif text-xl text-muted">{TAGLINE}</p>
      </div>

      {/* Cards */}
      <div className="mt-16 grid w-full max-w-3xl gap-6 sm:grid-cols-3">
        <Link
          href="/gallery"
          className="group rounded-2xl border border-border bg-surface p-8 transition-all hover:border-ignite/40 hover:shadow-lg hover:shadow-ignite/5"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-ignite/10 text-ignite transition-colors group-hover:bg-ignite/20">
            <Images size={24} strokeWidth={1.5} />
          </div>
          <h2 className="mb-2 text-xl font-bold">Gallery</h2>
          <p className="text-sm text-muted">
            Browse brand guidelines, sales deck, stationery, and all brand files.
          </p>
          <span className="mt-4 inline-block text-sm text-ignite opacity-0 transition-opacity group-hover:opacity-100">
            Explore →
          </span>
        </Link>

        <Link
          href="/studio"
          className="group rounded-2xl border border-border bg-surface p-8 transition-all hover:border-amber/40 hover:shadow-lg hover:shadow-amber/5"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-amber/10 text-amber transition-colors group-hover:bg-amber/20">
            <Wand2 size={24} strokeWidth={1.5} />
          </div>
          <h2 className="mb-2 text-xl font-bold">Studio</h2>
          <p className="text-sm text-muted">
            Create Instagram posts, social cards, and dev content from brand templates.
          </p>
          <span className="mt-4 inline-block text-sm text-amber opacity-0 transition-opacity group-hover:opacity-100">
            Create →
          </span>
        </Link>

        <Link
          href="/assets"
          className="group rounded-2xl border border-border bg-surface p-8 transition-all hover:border-[#a78bfa]/40 hover:shadow-lg hover:shadow-[#a78bfa]/5"
        >
          <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-[#a78bfa]/10 text-[#a78bfa] transition-colors group-hover:bg-[#a78bfa]/20">
            <FolderOpen size={24} strokeWidth={1.5} />
          </div>
          <h2 className="mb-2 text-xl font-bold">Assets</h2>
          <p className="text-sm text-muted">
            Upload and manage PSD, AI, InDesign, and image assets for your brand.
          </p>
          <span className="mt-4 inline-block text-sm text-[#a78bfa] opacity-0 transition-opacity group-hover:opacity-100">
            Manage →
          </span>
        </Link>
      </div>

      {/* Footer */}
      <footer className="mt-auto pb-8 pt-16 text-center text-xs text-muted">
        <p>© {new Date().getFullYear()} calidevs. {TAGLINE}</p>
      </footer>
    </div>
  );
}
