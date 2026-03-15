'use client';

import { useState, useCallback } from 'react';
import { EXPORT_SIZES, type ExportSize } from '@/lib/brand/constants';
import type { TemplateConfig, TemplateValues, TemplateModule } from '@/lib/templates/types';
import { ImageField } from './image-field';
import { useToast } from '@/components/ui/toast';

interface TemplateEditorProps {
  template: TemplateModule;
}

export function TemplateEditor({ template }: TemplateEditorProps) {
  const { config, PreviewTemplate } = template;
  const { error: showError, success: showSuccess } = useToast();

  const [values, setValues] = useState<TemplateValues>(() => {
    const initial: TemplateValues = {};
    config.fields.forEach((f) => {
      initial[f.name] = f.default;
    });
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
      const ext = format === 'jpeg' ? 'jpg' : format;
      a.download = `${config.id}-${size}.${ext}`;
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

  return (
    <div className="flex min-h-[calc(100vh-7rem)] flex-col lg:flex-row">
      {/* Left panel: Form */}
      <div className="w-full border-b border-border p-6 lg:w-96 lg:border-b-0 lg:border-r lg:overflow-y-auto">
        <h2 className="mb-6 text-lg font-bold">{config.name}</h2>

        <div className="space-y-4">
          {config.fields.map((field) => (
            <FieldInput
              key={field.name}
              field={field}
              value={values[field.name] || ''}
              onChange={(v) => updateField(field.name, v)}
            />
          ))}
        </div>

        {/* Size selector */}
        <div className="mt-8">
          <label className="mb-2 block text-sm font-medium text-muted">Export Size</label>
          <select
            value={size}
            onChange={(e) => setSize(e.target.value as ExportSize)}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground"
          >
            {Object.entries(EXPORT_SIZES).map(([key, s]) => (
              <option key={key} value={key}>
                {s.label} ({s.width}x{s.height})
              </option>
            ))}
          </select>
        </div>

        {/* Export buttons */}
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
          </p>
        </div>
      </div>
    </div>
  );
}

function FieldInput({
  field,
  value,
  onChange,
}: {
  field: TemplateConfig['fields'][number];
  value: string;
  onChange: (v: string) => void;
}) {
  const baseClasses = 'w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-ignite focus:outline-none focus:ring-1 focus:ring-ignite';

  if (field.type === 'image') {
    return (
      <ImageField
        label={field.label}
        value={value}
        onChange={onChange}
        accept={field.accept}
      />
    );
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-muted">{field.label}</label>
      {field.type === 'textarea' ? (
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          rows={3}
          className={baseClasses}
        />
      ) : field.type === 'select' ? (
        <select value={value} onChange={(e) => onChange(e.target.value)} className={baseClasses}>
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
      ) : (
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={baseClasses}
        />
      )}
    </div>
  );
}
