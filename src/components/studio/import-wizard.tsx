'use client';

import { useState, useCallback } from 'react';
import { Upload, ChevronRight, ChevronLeft, Check, Layers, Type, Image as ImageIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface ParsedLayerInfo {
  name: string;
  type: 'text' | 'image' | 'shape' | 'group';
  visible: boolean;
  text?: string;
}

interface FieldConfig {
  label: string;
  placeholder: string;
}

type WizardStep = 'upload' | 'layers' | 'config' | 'preview' | 'saving';

export function ImportWizard() {
  const router = useRouter();
  const [step, setStep] = useState<WizardStep>('upload');
  const [uploading, setUploading] = useState(false);
  const [assetId, setAssetId] = useState<number | null>(null);
  const [assetName, setAssetName] = useState('');
  const [layers, setLayers] = useState<ParsedLayerInfo[]>([]);
  const [selectedLayers, setSelectedLayers] = useState<Set<string>>(new Set());
  const [fieldConfigs, setFieldConfigs] = useState<Record<string, FieldConfig>>({});
  const [templateName, setTemplateName] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleUpload = useCallback(async (file: File) => {
    setError(null);
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/assets/upload', { method: 'POST', body: formData });
      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Upload failed');
      }
      const { asset } = await res.json();
      setAssetId(asset.id);
      setAssetName(asset.originalFilename);
      setTemplateName(asset.originalFilename.replace(/\.\w+$/, ''));

      // Extract layer info from metadata
      const meta = asset.metadata as { layers?: ParsedLayerInfo[] } | null;
      if (meta?.layers) {
        setLayers(meta.layers);
      }
      setStep('layers');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }, []);

  const toggleLayer = (name: string) => {
    setSelectedLayers(prev => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const handleGenerate = async () => {
    if (!assetId) return;
    setStep('saving');
    setError(null);

    try {
      const res = await fetch('/api/templates/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          assetId,
          name: templateName || 'Custom Template',
          editableLayers: Array.from(selectedLayers),
          fieldOverrides: fieldConfigs,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Generation failed');
      }

      router.push('/studio?category=custom');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Generation failed');
      setStep('config');
    }
  };

  const layerIcon = (type: string) => {
    switch (type) {
      case 'text': return <Type size={14} className="text-amber" />;
      case 'image': return <ImageIcon size={14} className="text-ignite" />;
      default: return <Layers size={14} className="text-muted" />;
    }
  };

  return (
    <div className="mx-auto max-w-2xl">
      {/* Step indicator */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {(['upload', 'layers', 'config'] as const).map((s, i) => (
          <div key={s} className="flex items-center gap-2">
            {i > 0 && <ChevronRight size={14} className="text-muted" />}
            <div className={`rounded-full px-3 py-1 text-xs font-medium ${
              step === s ? 'bg-ignite text-white' :
              (['upload', 'layers', 'config'].indexOf(step) > i) ? 'bg-ignite/20 text-ignite' :
              'bg-border text-muted'
            }`}>
              {s === 'upload' ? '1. Upload' : s === 'layers' ? '2. Layers' : '3. Configure'}
            </div>
          </div>
        ))}
      </div>

      {error && (
        <div className="mb-4 rounded-lg bg-red-500/10 border border-red-500/20 p-3 text-sm text-red-400">
          {error}
        </div>
      )}

      {/* Step 1: Upload */}
      {step === 'upload' && (
        <div className="rounded-2xl border border-border bg-surface p-8">
          <h2 className="mb-2 text-xl font-bold">Upload PSD File</h2>
          <p className="mb-6 text-sm text-muted">Upload a Photoshop file to convert into an editable template.</p>

          <label className={`flex flex-col items-center justify-center rounded-xl border-2 border-dashed p-12 cursor-pointer transition-colors ${
            uploading ? 'border-ignite bg-ignite/5' : 'border-border hover:border-ignite/40'
          }`}>
            {uploading ? (
              <div className="flex items-center gap-2 text-muted">
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-ignite border-t-transparent" />
                Parsing PSD...
              </div>
            ) : (
              <>
                <Upload size={32} className="mb-3 text-muted" />
                <p className="text-sm text-muted">Drop a .psd file or <span className="text-ignite">click to browse</span></p>
              </>
            )}
            <input
              type="file"
              accept=".psd"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }}
              className="hidden"
              disabled={uploading}
            />
          </label>
        </div>
      )}

      {/* Step 2: Layer selection */}
      {step === 'layers' && (
        <div className="rounded-2xl border border-border bg-surface p-8">
          <h2 className="mb-2 text-xl font-bold">Select Editable Layers</h2>
          <p className="mb-6 text-sm text-muted">
            From <span className="text-foreground font-medium">{assetName}</span> — check the layers you want users to edit.
          </p>

          <div className="space-y-1 max-h-80 overflow-y-auto">
            {layers.filter(l => l.type !== 'group').map((layer) => (
              <label
                key={layer.name}
                className={`flex items-center gap-3 rounded-lg px-3 py-2 cursor-pointer transition-colors ${
                  selectedLayers.has(layer.name) ? 'bg-ignite/10 border border-ignite/30' : 'hover:bg-border/50 border border-transparent'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedLayers.has(layer.name)}
                  onChange={() => toggleLayer(layer.name)}
                  className="rounded border-border"
                />
                {layerIcon(layer.type)}
                <span className="flex-1 text-sm">{layer.name}</span>
                <span className="text-xs text-muted capitalize">{layer.type}</span>
              </label>
            ))}
          </div>

          {layers.length === 0 && (
            <p className="py-8 text-center text-muted">No layers detected in this file.</p>
          )}

          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep('upload')} className="flex items-center gap-1 text-sm text-muted hover:text-foreground">
              <ChevronLeft size={14} /> Back
            </button>
            <button
              onClick={() => {
                // Initialize field configs for selected layers
                const configs: Record<string, FieldConfig> = {};
                selectedLayers.forEach(name => {
                  configs[name] = { label: name, placeholder: `Enter ${name.toLowerCase()}` };
                });
                setFieldConfigs(configs);
                setStep('config');
              }}
              className="rounded-lg bg-ignite px-4 py-2 text-sm font-medium text-white hover:bg-ignite/90 transition-colors"
            >
              Next: Configure Fields
            </button>
          </div>
        </div>
      )}

      {/* Step 3: Field configuration */}
      {step === 'config' && (
        <div className="rounded-2xl border border-border bg-surface p-8">
          <h2 className="mb-2 text-xl font-bold">Configure Template</h2>
          <p className="mb-6 text-sm text-muted">Set names and labels for the editable fields.</p>

          <div className="mb-6">
            <label className="mb-1 block text-sm font-medium text-muted">Template Name</label>
            <input
              type="text"
              value={templateName}
              onChange={(e) => setTemplateName(e.target.value)}
              className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-foreground focus:border-ignite focus:outline-none"
            />
          </div>

          {selectedLayers.size > 0 && (
            <div className="space-y-4">
              <h3 className="text-sm font-medium text-muted">Field Labels</h3>
              {Array.from(selectedLayers).map((name) => (
                <div key={name} className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="mb-1 block text-xs text-muted">Label for &quot;{name}&quot;</label>
                    <input
                      type="text"
                      value={fieldConfigs[name]?.label || name}
                      onChange={(e) => setFieldConfigs(prev => ({ ...prev, [name]: { ...prev[name], label: e.target.value } }))}
                      className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-ignite focus:outline-none"
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs text-muted">Placeholder</label>
                    <input
                      type="text"
                      value={fieldConfigs[name]?.placeholder || ''}
                      onChange={(e) => setFieldConfigs(prev => ({ ...prev, [name]: { ...prev[name], placeholder: e.target.value } }))}
                      className="w-full rounded-lg border border-border bg-background px-3 py-1.5 text-sm text-foreground focus:border-ignite focus:outline-none"
                    />
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="mt-6 flex justify-between">
            <button onClick={() => setStep('layers')} className="flex items-center gap-1 text-sm text-muted hover:text-foreground">
              <ChevronLeft size={14} /> Back
            </button>
            <button
              onClick={handleGenerate}
              className="flex items-center gap-2 rounded-lg bg-ignite px-4 py-2 text-sm font-medium text-white hover:bg-ignite/90 transition-colors"
            >
              <Check size={14} /> Generate Template
            </button>
          </div>
        </div>
      )}

      {/* Saving state */}
      {step === 'saving' && (
        <div className="flex flex-col items-center justify-center py-16">
          <div className="h-8 w-8 animate-spin rounded-full border-3 border-ignite border-t-transparent mb-4" />
          <p className="text-muted">Generating template...</p>
        </div>
      )}
    </div>
  );
}
