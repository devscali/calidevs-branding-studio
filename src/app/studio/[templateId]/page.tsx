'use client';

import { notFound, useParams } from 'next/navigation';
import Link from 'next/link';
import { TEMPLATES } from '@/lib/templates/registry';
import { TemplateEditor } from '@/components/studio/template-editor';

export default function TemplateEditorPage() {
  const { templateId } = useParams<{ templateId: string }>();
  const template = TEMPLATES[templateId];
  if (!template) notFound();

  return (
    <div className="flex flex-col">
      {/* Header bar */}
      <div className="flex items-center gap-4 border-b border-border px-6 py-3">
        <Link href="/studio" className="text-sm text-muted hover:text-foreground transition-colors">
          ← Studio
        </Link>
        <span className="text-border">/</span>
        <h1 className="text-sm font-bold">{template.config.name}</h1>
        <span className="rounded-full bg-border px-2 py-0.5 text-xs uppercase tracking-wider text-muted">
          {template.config.category}
        </span>
      </div>

      <TemplateEditor template={template} />
    </div>
  );
}
