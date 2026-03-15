'use client';

import { useState, useEffect, useCallback } from 'react';
import { Upload, Search, Trash2, Download, Copy, X } from 'lucide-react';

interface Asset {
  id: number;
  filename: string;
  originalFilename: string;
  mimeType: string;
  fileSize: number;
  blobUrl: string;
  thumbnailUrl: string | null;
  width: number | null;
  height: number | null;
  sourceFormat: string;
  layerCount: number | null;
  tags: string[] | null;
  createdAt: string;
}

const FORMAT_FILTERS = [
  { label: 'All', value: 'all' },
  { label: 'PSD', value: 'psd' },
  { label: 'AI', value: 'ai' },
  { label: 'InDesign', value: 'indd,idml' },
  { label: 'After Effects', value: 'aep' },
  { label: 'PNG', value: 'png' },
  { label: 'SVG', value: 'svg' },
  { label: 'JPEG', value: 'jpeg' },
  { label: 'Lottie', value: 'lottie' },
];

const FORMAT_COLORS: Record<string, string> = {
  psd: 'bg-blue-500/20 text-blue-400',
  ai: 'bg-orange-500/20 text-orange-400',
  indd: 'bg-pink-500/20 text-pink-400',
  idml: 'bg-pink-500/20 text-pink-400',
  aep: 'bg-purple-500/20 text-purple-400',
  png: 'bg-green-500/20 text-green-400',
  svg: 'bg-yellow-500/20 text-yellow-400',
  jpeg: 'bg-emerald-500/20 text-emerald-400',
  lottie: 'bg-cyan-500/20 text-cyan-400',
};

export default function AssetsPage() {
  const [assetList, setAssetList] = useState<Asset[]>([]);
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('newest');
  const [uploading, setUploading] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const fetchAssets = useCallback(async () => {
    const params = new URLSearchParams();
    if (filter !== 'all') params.set('format', filter);
    if (search) params.set('search', search);
    params.set('sort', sort);

    const res = await fetch(`/api/assets?${params}`);
    if (res.ok) {
      const data = await res.json();
      setAssetList(data.assets);
    }
  }, [filter, search, sort]);

  useEffect(() => { fetchAssets(); }, [fetchAssets]);

  const handleUpload = async (file: File) => {
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await fetch('/api/assets/upload', { method: 'POST', body: formData });
      if (res.ok) {
        fetchAssets();
      } else {
        const data = await res.json();
        alert(data.error || 'Upload failed');
      }
    } finally {
      setUploading(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleUpload(file);
  };

  const handleDelete = async (id: number) => {
    if (!confirm('Delete this asset?')) return;
    const res = await fetch('/api/assets', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    if (res.ok) fetchAssets();
  };

  const copyUrl = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const formatSize = (bytes: number) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="mx-auto max-w-6xl px-6 py-12">
      <h1 className="mb-2 font-serif text-3xl">Asset Library</h1>
      <p className="mb-8 text-muted">Upload and manage your creative files.</p>

      {/* Upload dropzone */}
      <div
        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
        onDragLeave={() => setDragOver(false)}
        onDrop={handleDrop}
        className={`mb-8 flex items-center justify-center rounded-2xl border-2 border-dashed p-8 transition-colors ${
          dragOver ? 'border-ignite bg-ignite/5' : 'border-border hover:border-ignite/40'
        }`}
      >
        {uploading ? (
          <div className="flex items-center gap-2 text-muted">
            <div className="h-5 w-5 animate-spin rounded-full border-2 border-ignite border-t-transparent" />
            Uploading...
          </div>
        ) : (
          <label className="flex cursor-pointer items-center gap-3 text-muted hover:text-foreground transition-colors">
            <Upload size={20} />
            <span>Drop files here or <span className="text-ignite">click to upload</span></span>
            <input
              type="file"
              accept=".psd,.ai,.svg,.png,.jpg,.jpeg,.indd,.idml,.aep,.json"
              onChange={(e) => { const f = e.target.files?.[0]; if (f) handleUpload(f); }}
              className="hidden"
            />
          </label>
        )}
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {FORMAT_FILTERS.map((f) => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`rounded-lg px-3 py-1.5 text-xs font-medium transition-colors ${
                filter === f.value
                  ? 'bg-ignite text-white'
                  : 'bg-surface border border-border text-muted hover:text-foreground'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-3">
          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
            <input
              type="text"
              placeholder="Search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="rounded-lg border border-border bg-surface pl-8 pr-3 py-1.5 text-sm text-foreground placeholder:text-muted/50 focus:border-ignite focus:outline-none"
            />
            {search && (
              <button onClick={() => setSearch('')} className="absolute right-2 top-1/2 -translate-y-1/2 text-muted hover:text-foreground">
                <X size={12} />
              </button>
            )}
          </div>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            className="rounded-lg border border-border bg-surface px-3 py-1.5 text-sm text-foreground"
          >
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
            <option value="name">Name</option>
          </select>
        </div>
      </div>

      {/* Asset grid */}
      {assetList.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted">
          <Upload size={40} strokeWidth={1} className="mb-4 opacity-30" />
          <p>No assets yet. Upload your first file above.</p>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {assetList.map((asset) => (
            <div
              key={asset.id}
              className="group rounded-2xl border border-border bg-surface overflow-hidden transition-all hover:border-ignite/30 hover:shadow-lg hover:shadow-ignite/5"
            >
              {/* Thumbnail */}
              <div className="relative aspect-video bg-charcoal/50 flex items-center justify-center">
                {asset.thumbnailUrl ? (
                  <img src={asset.thumbnailUrl} alt={asset.originalFilename} className="h-full w-full object-contain" />
                ) : (
                  <span className="text-2xl text-muted/30 font-mono uppercase">{asset.sourceFormat}</span>
                )}
                <span className={`absolute top-2 left-2 rounded px-1.5 py-0.5 text-[10px] font-bold uppercase ${FORMAT_COLORS[asset.sourceFormat] || 'bg-border text-muted'}`}>
                  {asset.sourceFormat}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="text-sm font-medium truncate" title={asset.originalFilename}>
                  {asset.originalFilename}
                </p>
                <div className="mt-1 flex items-center gap-2 text-xs text-muted">
                  <span>{formatSize(asset.fileSize)}</span>
                  {asset.width && asset.height && (
                    <span>{asset.width}x{asset.height}</span>
                  )}
                  {asset.layerCount && <span>{asset.layerCount} layers</span>}
                </div>

                {/* Actions */}
                <div className="mt-3 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => copyUrl(asset.blobUrl)}
                    className="rounded px-2 py-1 text-xs text-muted hover:bg-border hover:text-foreground transition-colors"
                    title="Copy URL"
                  >
                    <Copy size={12} />
                  </button>
                  <a
                    href={asset.blobUrl}
                    download={asset.originalFilename}
                    className="rounded px-2 py-1 text-xs text-muted hover:bg-border hover:text-foreground transition-colors"
                    title="Download"
                  >
                    <Download size={12} />
                  </a>
                  <button
                    onClick={() => handleDelete(asset.id)}
                    className="rounded px-2 py-1 text-xs text-muted hover:bg-red-500/20 hover:text-red-400 transition-colors"
                    title="Delete"
                  >
                    <Trash2 size={12} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
