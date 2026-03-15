'use client';

import { useState, useCallback } from 'react';
import { EXPORT_SIZES, type ExportSize } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues, TemplateModule } from '@/lib/templates/types';
import { ImageField } from './image-field';
import { useToast } from '@/components/ui/toast';

interface PresentationEditorProps {
  template: TemplateModule;
}

/**
 * Multi-page presentation editor.
 * Shows slide navigator + per-slide fields.
 * For now, exports single pages (multi-page PDF is handled by the API).
 */
export function PresentationEditor({ template }: PresentationEditorProps) {
  const { config, PreviewTemplate } = template;
  const { error: showError, success: showSuccess } = useToast();
  const pages = config.pages || [config.fields];
  const [currentPage, setCurrentPage] = useState(0);

  const [values, setValues] = useState<TemplateValues>(() => {
    const initial: TemplateValues = {};
    config.fields.forEach((f) => { initial[f.name] = f.default; });
    return initial;
  });

  const [size, setSize] = useState<ExportSize>(config.defaultSize as ExportSize);
  const [exporting, setExporting] = useState<string | null>(null);

  const updateField = useCallback((name: string, value: string) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  }, []);

  const handleExport = useCallback(async (format: 'jpeg' | 'png' | 'svg' | 'pdf') => {
    setExporting(format);
    try {
      const endpoint = format === 'svg' ? '/api/export/svg' : format === 'pdf' ? '/api/export/pdf' : '/api/export/image';
      const body = { templateId: config.id, values, size, ...(format !== 'svg' && format !== 'pdf' ? { format } : {}) };

      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Export failed');
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${config.id}-${size}.${format === 'jpeg' ? 'jpg' : format}`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      showSuccess(`Exported ${format.toUpperCase()} successfully`);
    } catch (err) {
      console.error('Export error:', err);
      showError(err instanceof Error ? err.message : 'Export failed');
    } finally {
      setExporting(null);
    }
  }, [config.id, values, size]);

  const currentFields = pages[currentPage] || config.fields;
  const baseClasses = 'w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-ignite focus:outline-none focus:ring-1 focus:ring-ignite';

  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-col lg:flex-row">
      {/* Left panel */}
      <div className="w-full border-b border-border p-6 lg:w-96 lg:border-b-0 lg:border-r lg:overflow-y-auto">
        <h2 className="mb-4 text-lg font-bold">{config.name}</h2>

        {/* Slide navigator */}
        {pages.length > 1 && (
          <div className="mb-6">
            <label className="mb-2 block text-sm font-medium text-muted">Slides</label>
            <div className="flex gap-2 overflow-x-auto pb-2">
              {pages.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i)}
                  className={`flex-shrink-0 rounded-lg border px-3 py-1.5 text-xs font-medium transition-colors ${
                    currentPage === i
                      ? 'border-ignite bg-ignite/10 text-ignite'
                      : 'border-border text-muted hover:text-foreground'
                  }`}
                >
                  Slide {i + 1}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Fields for current slide */}
        <div className="space-y-4">
          {currentFields.map((field) => (
            <div key={field.name}>
              {field.type === 'image' ? (
                <ImageField
                  label={field.label}
                  value={values[field.name] || ''}
                  onChange={(v) => updateField(field.name, v)}
                  accept={field.accept}
                />
              ) : (
                <div>
                  <label className="mb-1 block text-sm font-medium text-muted">{field.label}</label>
                  {field.type === 'textarea' ? (
                    <textarea
                      value={values[field.name] || ''}
                      onChange={(e) => updateField(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      rows={3}
                      className={baseClasses}
                    />
                  ) : field.type === 'select' ? (
                    <select value={values[field.name] || ''} onChange={(e) => updateField(field.name, e.target.value)} className={baseClasses}>
                      {field.options?.map((opt) => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type="text"
                      value={values[field.name] || ''}
                      onChange={(e) => updateField(field.name, e.target.value)}
                      placeholder={field.placeholder}
                      className={baseClasses}
                    />
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Size selector + export */}
        <div className="mt-8">
          <label className="mb-2 block text-sm font-medium text-muted">Export Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as ExportSize)}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground"
          >
            {Object.entries(EXPORT_SIZES).map(([key, s]) => (
              <option key={key} value={key}>{s.label} ({s.width}x{s.height})</option>
            ))}
          </select>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2">
          {(['jpeg', 'png', 'svg', 'pdf'] as const).map((format) => (
            <button
              key={format}
              onClick={() => handleExport(format)}
              disabled={exporting !== null}
              className="rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium transition-colors hover:bg-ignite hover:text-white hover:border-ignite disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {exporting === format ? 'Exporting...' : format.toUpperCase()}
            </button>
          ))}
        </div>
      </div>

      {/* Right panel: Preview */}
      <div className="flex flex-1 items-center justify-center bg-charcoal/30 p-8">
        <div className="w-full max-w-lg">
          <div
            className="overflow-hidden rounded-lg transition-all duration-300"
            style={{ aspectRatio: `${EXPORT_SIZES[size].width} / ${EXPORT_SIZES[size].height}` }}
          >
            <PreviewTemplate values={values} />
          </div>
          <p className="mt-3 text-center text-xs text-muted">
            {EXPORT_SIZES[size].label} — {EXPORT_SIZES[size].width}x{EXPORT_SIZES[size].height}
            {pages.length > 1 && ` — Slide ${currentPage + 1}/${pages.length}`}
          </p>
        </div>
      </div>
    </div>
  );
}
