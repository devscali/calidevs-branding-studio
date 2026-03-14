import { notFound } from 'next/navigation';
import Link from 'next/link';
import { GALLERY_ITEMS } from '@/lib/brand/gallery-items';
import { SlideViewer } from '@/components/gallery/slide-viewer';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return GALLERY_ITEMS.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const item = GALLERY_ITEMS.find((i) => i.slug === slug);
  if (!item) return {};
  return { title: `${item.title} — calidevs Branding Studio` };
}

export default async function GalleryItemPage({ params }: Props) {
  const { slug } = await params;
  const item = GALLERY_ITEMS.find((i) => i.slug === slug);
  if (!item) notFound();

  const currentIndex = GALLERY_ITEMS.findIndex((i) => i.slug === slug);
  const prev = currentIndex > 0 ? GALLERY_ITEMS[currentIndex - 1] : null;
  const next = currentIndex < GALLERY_ITEMS.length - 1 ? GALLERY_ITEMS[currentIndex + 1] : null;

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-border px-6 py-3">
        <div className="flex items-center gap-4">
          <Link href="/gallery" className="text-sm text-muted hover:text-foreground transition-colors">
            ← Gallery
          </Link>
          <span className="text-border">/</span>
          <h1 className="text-sm font-bold">{item.icon} {item.title}</h1>
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

      {/* Viewer */}
      <SlideViewer file={item.file} title={item.title} />
    </div>
  );
}
