'use client';

import { useState, useCallback, useRef } from 'react';
import { Upload, X, Image as ImageIcon, FolderOpen } from 'lucide-react';

interface ImageFieldProps {
  value: string;
  onChange: (url: string) => void;
  accept?: string;
  label: string;
  onBrowseLibrary?: () => void;
}

export function ImageField({ value, onChange, accept, label, onBrowseLibrary }: ImageFieldProps) {
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFile = useCallback(async (file: File) => {
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
      onChange(asset.blobUrl);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Upload failed');
    } finally {
      setUploading(false);
    }
  }, [onChange]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  }, [handleFile]);

  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  }, [handleFile]);

  if (value) {
    return (
      <div>
        <label className="mb-1 block text-sm font-medium text-muted">{label}</label>
        <div className="relative rounded-lg border border-border overflow-hidden bg-surface">
          <img src={value} alt="Uploaded" className="w-full h-32 object-cover" />
          <button
            onClick={() => onChange('')}
            className="absolute top-2 right-2 rounded-full bg-charcoal/80 p-1 text-white hover:bg-ignite transition-colors"
          >
            <X size={14} />
          </button>
        </div>
        {onBrowseLibrary && (
          <button
            onClick={onBrowseLibrary}
            className="mt-2 flex items-center gap-1 text-xs text-muted hover:text-ignite transition-colors"
          >
            <FolderOpen size={12} /> Change from Library
          </button>
        )}
      </div>
    );
  }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-muted">{label}</label>
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        onClick={() => inputRef.current?.click()}
        className={`flex flex-col items-center justify-center rounded-lg border-2 border-dashed px-4 py-6 cursor-pointer transition-colors ${
          dragOver
            ? 'border-ignite bg-ignite/5'
            : 'border-border hover:border-ignite/40 bg-surface'
        }`}
      >
        {uploading ? (
          <div className="flex items-center gap-2 text-sm text-muted">
            <div className="h-4 w-4 animate-spin rounded-full border-2 border-ignite border-t-transparent" />
            Uploading...
          </div>
        ) : (
          <>
            <div className="mb-2 rounded-lg bg-border p-2">
              {dragOver ? <ImageIcon size={20} className="text-ignite" /> : <Upload size={20} className="text-muted" />}
            </div>
            <p className="text-xs text-muted text-center">
              Drag & drop or <span className="text-ignite">click to browse</span>
            </p>
            <p className="text-[10px] text-muted/50 mt-1">PSD, AI, PNG, JPG, SVG</p>
          </>
        )}
        <input
          ref={inputRef}
          type="file"
          accept={accept || '.psd,.ai,.svg,.png,.jpg,.jpeg'}
          onChange={handleInputChange}
          className="hidden"
        />
      </div>
      {error && <p className="mt-1 text-xs text-red-400">{error}</p>}
      {onBrowseLibrary && (
        <button
          onClick={(e) => { e.stopPropagation(); onBrowseLibrary(); }}
          className="mt-2 flex items-center gap-1 text-xs text-muted hover:text-ignite transition-colors"
        >
          <FolderOpen size={12} /> Browse Library
        </button>
      )}
    </div>
  );
}
