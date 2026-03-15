import { ImportWizard } from '@/components/studio/import-wizard';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function ImportPage() {
  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <Link href="/studio" className="mb-6 inline-flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors">
        <ChevronLeft size={14} /> Back to Studio
      </Link>
      <h1 className="mb-2 font-serif text-3xl">Import Template</h1>
      <p className="mb-8 text-muted">Convert a PSD file into an editable brand template.</p>
      <ImportWizard />
    </div>
  );
}
