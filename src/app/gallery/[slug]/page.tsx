import { notFound } from 'next/navigation';
import { GALLERY_ITEMS } from '@/lib/brand/gallery-items';
import { SlideViewer } from '@/components/gallery/slide-viewer';
import { GalleryItemHeader } from '@/components/gallery/gallery-item-header';

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

  return (
    <div className="flex min-h-[calc(100vh-4rem)] flex-col">
      <GalleryItemHeader slug={slug} />
      <SlideViewer file={item.file} title={item.title} />
    </div>
  );
}
