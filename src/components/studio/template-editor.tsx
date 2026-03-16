'use client';

import { useState, useCallback } from 'react';
import { Sparkles } from 'lucide-react';
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
  const [generating, setGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState('');
  const [showAiPanel, setShowAiPanel] = useState(false);

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

  const handleAiGenerate = useCallback(async () => {
    setGenerating(true);
    try {
      const textFields = config.fields
        .filter(f => f.type !== 'image' && f.type !== 'color')
        .map(f => ({
          name: f.name,
          label: f.label,
          type: f.type,
          placeholder: f.placeholder,
          options: f.options,
        }));

      if (textFields.length === 0) {
        showError('No text fields to generate');
        return;
      }

      const res = await fetch('/api/ai/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          templateName: config.name,
          templateCategory: config.category,
          templateDescription: config.description,
          fields: textFields,
          currentValues: values,
          userPrompt: aiPrompt || undefined,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.error || 'Generation failed');
      }

      const { values: generated } = await res.json();
      setValues(prev => ({ ...prev, ...generated }));
      showSuccess('Content generated');
      setAiPrompt('');
      setShowAiPanel(false);
    } catch (err) {
      console.error('AI generation error:', err);
      showError(err instanceof Error ? err.message : 'Generation failed');
    } finally {
      setGenerating(false);
    }
  }, [config, values, aiPrompt]);

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

        {/* AI Generate */}
        <div className="mt-6 border-t border-border pt-6">
          <div className="flex items-center justify-between mb-3">
            <span className="text-sm font-medium text-muted">AI Content</span>
            <button
              onClick={() => setShowAiPanel(!showAiPanel)}
              className="text-xs text-muted hover:text-foreground transition-colors"
            >
              {showAiPanel ? 'Hide prompt' : 'Add prompt'}
            </button>
          </div>

          {showAiPanel && (
            <textarea
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
              placeholder="Optional: describe the vibe, topic, or audience..."
              rows={2}
              className="mb-3 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-foreground placeholder:text-muted/50 focus:border-ignite focus:outline-none focus:ring-1 focus:ring-ignite"
            />
          )}

          <button
            onClick={handleAiGenerate}
            disabled={generating || exporting !== null}
            className="flex w-full items-center justify-center gap-2 rounded-lg border border-ignite/30 bg-ignite/10 px-4 py-2.5 text-sm font-medium text-ignite transition-colors hover:bg-ignite hover:text-white disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Sparkles size={16} className={generating ? 'animate-spin' : ''} />
            {generating ? 'Generating...' : 'Generate with AI'}
          </button>
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
              disabled={exporting !== null || generating}
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
