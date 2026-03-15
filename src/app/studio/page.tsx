'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Terminal, Share2, Wrench, Megaphone, Puzzle, Presentation, Clapperboard, FileUp } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { TEMPLATE_LIST, CATEGORIES, getTemplatesByCategory, type Category } from '@/lib/templates/registry';

const CATEGORY_LABELS: Record<Category, string> = {
  all: 'All',
  terminal: 'Terminal',
  social: 'Social',
  dev: 'Dev',
  campaign: 'Campaign',
  custom: 'Custom',
  presentation: 'Presentation',
  motion: 'Motion',
};

const CATEGORY_ICONS: Record<string, LucideIcon> = {
  terminal: Terminal,
  social: Share2,
  dev: Wrench,
  campaign: Megaphone,
  custom: Puzzle,
  presentation: Presentation,
  motion: Clapperboard,
};

const CATEGORY_COLORS: Record<string, string> = {
  terminal: 'text-ignite',
  social: 'text-amber',
  dev: 'text-muted',
  campaign: 'text-[#a78bfa]',
  custom: 'text-[#5dcaa5]',
  presentation: 'text-[#85b7eb]',
  motion: 'text-[#f0997b]',
};

export default function StudioPage() {
  const [category, setCategory] = useState<Category>('all');
  const templates = getTemplatesByCategory(category);

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-2 font-serif text-3xl">Studio</h1>
      <p className="mb-8 text-muted">Choose a template to start creating.</p>

      {/* Category filter */}
      <div className="mb-8 flex gap-2">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              category === cat
                ? 'bg-ignite text-white'
                : 'bg-surface border border-border text-muted hover:text-foreground'
            }`}
          >
            {CATEGORY_LABELS[cat]}
            {cat !== 'all' && (
              <span className="ml-1 text-xs opacity-70">
                ({TEMPLATE_LIST.filter((t) => t.category === cat).length})
              </span>
            )}
          </button>
        ))}
      </div>

      {/* Import CTA */}
      <Link
        href="/studio/import"
        className="mb-6 flex items-center gap-3 rounded-2xl border border-dashed border-border p-4 transition-all hover:border-ignite/40 hover:bg-ignite/5"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-ignite/10 text-ignite">
          <FileUp size={20} strokeWidth={1.5} />
        </div>
        <div>
          <p className="text-sm font-bold">Import PSD/AI</p>
          <p className="text-xs text-muted">Convert a Photoshop or Illustrator file into an editable template</p>
        </div>
      </Link>

      {/* Template grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {templates.map((template) => {
          const Icon = CATEGORY_ICONS[template.category];
          const colorClass = CATEGORY_COLORS[template.category];
          return (
            <Link
              key={template.id}
              href={`/studio/${template.id}`}
              className="group rounded-2xl border border-border bg-surface p-6 transition-all hover:border-ignite/30 hover:shadow-lg hover:shadow-ignite/5"
            >
              <div className="mb-3 flex items-center gap-2">
                {Icon && <Icon size={16} strokeWidth={1.5} className={colorClass} />}
                <span className="rounded-full bg-border px-2 py-0.5 text-xs uppercase tracking-wider text-muted">
                  {template.category}
                </span>
              </div>
              <h2 className="mb-1 text-lg font-bold group-hover:text-ignite transition-colors">
                {template.name}
              </h2>
              <p className="text-sm text-muted">{template.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
